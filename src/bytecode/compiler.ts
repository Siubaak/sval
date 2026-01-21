/**
 * Bytecode compiler - converts AST to bytecode instructions
 */

import type { Node } from 'acorn'
import type Scope from '../scope'
import { NEWTARGET, NOINIT, DEADZONE } from '../share/const'
import {
  OpCode,
  createChunk,
  addInstruction,
  addConstant,
  createInstruction,
  type BytecodeChunk,
} from './opcodes'

export class Compiler {
  private chunk: BytecodeChunk
  private loopStack: Array<{ breakLabel: number[]; continueLabel: number[] }> = []
  private labelMap: Map<string, number> = new Map()
  private currentScope!: Scope

  constructor() {
    this.chunk = createChunk()
  }

  compile(node: Node, scope: Scope): BytecodeChunk {
    this.currentScope = scope

    // Perform hoisting before compilation
    this.hoist(node, scope)

    this.compileNode(node, scope)
    this.emit(OpCode.HALT)
    return this.chunk
  }

  /**
   * Hoist function declarations and var declarations to the top of their scope
   */
  private hoist(node: any, scope: Scope): void {
    if (node.type === 'Program' || node.type === 'BlockStatement') {
      this.hoistInBlock(node.body, scope)
    }
  }

  private hoistInBlock(body: any[], scope: Scope): void {
    // First pass: hoist function declarations
    // Note: We just declare them here; they'll be defined when the declaration is executed
    for (const stmt of body) {
      if (stmt.type === 'FunctionDeclaration' && stmt.id) {
        // Just declare the variable; the function will be assigned when we execute the declaration
        scope.var(stmt.id.name, NOINIT)
      }
    }

    // Actually, for proper hoisting, we need to move function declarations to the front
    // Sort the body to put function declarations first
    const funcDecls: any[] = []
    const otherStmts: any[] = []
    for (const stmt of body) {
      if (stmt.type === 'FunctionDeclaration') {
        funcDecls.push(stmt)
      } else {
        otherStmts.push(stmt)
      }
    }
    // Modify the body array in place
    body.length = 0
    body.push(...funcDecls, ...otherStmts)

    // Second pass: hoist var declarations (not let/const)
    for (const stmt of body) {
      this.hoistVarsInStatement(stmt, scope)
    }

    // Third pass: create temporal dead zone for let/const
    for (const stmt of body) {
      if (stmt.type === 'VariableDeclaration' && (stmt.kind === 'let' || stmt.kind === 'const')) {
        for (const decl of stmt.declarations) {
          if (decl.id.type === 'Identifier') {
            // Create dead zone marker
            try {
              scope.let(decl.id.name, DEADZONE)
            } catch (e) {
              // Already declared, that's fine
            }
          }
        }
      }
    }
  }

  private hoistVarsInStatement(stmt: any, scope: Scope): void {
    switch (stmt.type) {
      case 'VariableDeclaration':
        if (stmt.kind === 'var') {
          for (const decl of stmt.declarations) {
            if (decl.id.type === 'Identifier') {
              // Var declarations are hoisted but not initialized
              scope.var(decl.id.name, NOINIT)
            }
          }
        }
        break

      case 'ForStatement':
        if (stmt.init && stmt.init.type === 'VariableDeclaration') {
          this.hoistVarsInStatement(stmt.init, scope)
        }
        this.hoistVarsInStatement(stmt.body, scope)
        break

      case 'ForInStatement':
      case 'ForOfStatement':
        if (stmt.left && stmt.left.type === 'VariableDeclaration') {
          this.hoistVarsInStatement(stmt.left, scope)
        }
        this.hoistVarsInStatement(stmt.body, scope)
        break

      case 'WhileStatement':
      case 'DoWhileStatement':
        this.hoistVarsInStatement(stmt.body, scope)
        break

      case 'IfStatement':
        this.hoistVarsInStatement(stmt.consequent, scope)
        if (stmt.alternate) {
          this.hoistVarsInStatement(stmt.alternate, scope)
        }
        break

      case 'BlockStatement':
        // Don't hoist out of blocks for let/const, but do for var
        for (const s of stmt.body) {
          this.hoistVarsInStatement(s, scope)
        }
        break

      case 'SwitchStatement':
        for (const c of stmt.cases) {
          for (const s of c.consequent) {
            this.hoistVarsInStatement(s, scope)
          }
        }
        break

      case 'TryStatement':
        for (const s of stmt.block.body) {
          this.hoistVarsInStatement(s, scope)
        }
        if (stmt.handler) {
          // Don't hoist from catch block to outer scope
        }
        if (stmt.finalizer) {
          for (const s of stmt.finalizer.body) {
            this.hoistVarsInStatement(s, scope)
          }
        }
        break

      case 'LabeledStatement':
        this.hoistVarsInStatement(stmt.body, scope)
        break
    }
  }

  private compileNode(node: Node, scope: Scope): void {
    // Update current scope as we traverse
    this.currentScope = scope

    const handler = (this as any)[`compile${node.type}`]
    if (!handler) {
      throw new Error(`Unknown node type: ${node.type}`)
    }
    handler.call(this, node, scope)
  }

  // ===== Program =====
  private compileProgram(node: any, scope: Scope): void {
    for (const stmt of node.body) {
      this.compileNode(stmt, scope)
    }
  }

  // ===== Literals =====
  private compileLiteral(node: any, scope: Scope): void {
    if (node.regex) {
      const regex = new RegExp(node.regex.pattern, node.regex.flags)
      const idx = addConstant(this.chunk, regex)
      this.emit(OpCode.PUSH, idx)
    } else {
      const idx = addConstant(this.chunk, node.value)
      this.emit(OpCode.PUSH, idx)
    }
  }

  private compileTemplateLiteral(node: any, scope: Scope): void {
    const { quasis, expressions } = node
    for (let i = 0; i < quasis.length; i++) {
      // Always push the quasi, even if it's an empty string
      const cookedValue = quasis[i].value.cooked !== undefined ? quasis[i].value.cooked : ''
      const idx = addConstant(this.chunk, cookedValue)
      this.emit(OpCode.PUSH, idx)

      if (i < expressions.length) {
        this.compileNode(expressions[i], scope)
        this.emit(OpCode.ADD) // String concatenation
      }
    }
    // If multiple parts, concatenate them all
    for (let i = 1; i < quasis.length + expressions.length - 1; i++) {
      this.emit(OpCode.ADD)
    }
  }

  private compileIdentifier(node: any, scope: Scope): void {
    this.emit(OpCode.LOAD_VAR, node.name)
  }

  private compileThisExpression(node: any, scope: Scope): void {
    this.emit(OpCode.LOAD_THIS)
  }

  private compileSuper(node: any, scope: Scope): void {
    // Load the super binding from scope
    this.emit(OpCode.LOAD_VAR, 'super')
  }

  // ===== Binary Operations =====
  private compileBinaryExpression(node: any, scope: Scope): void {
    this.compileNode(node.left, scope)
    this.compileNode(node.right, scope)

    const opMap: Record<string, OpCode> = {
      '+': OpCode.ADD,
      '-': OpCode.SUB,
      '*': OpCode.MUL,
      '/': OpCode.DIV,
      '%': OpCode.MOD,
      '**': OpCode.EXP,
      '==': OpCode.EQ,
      '!=': OpCode.NEQ,
      '===': OpCode.SEQ,
      '!==': OpCode.SNEQ,
      '<': OpCode.LT,
      '<=': OpCode.LTE,
      '>': OpCode.GT,
      '>=': OpCode.GTE,
      '&': OpCode.BITWISE_AND,
      '|': OpCode.BITWISE_OR,
      '^': OpCode.BITWISE_XOR,
      '<<': OpCode.LEFT_SHIFT,
      '>>': OpCode.RIGHT_SHIFT,
      '>>>': OpCode.UNSIGNED_RIGHT_SHIFT,
      'in': OpCode.IN,
      'instanceof': OpCode.INSTANCEOF,
    }

    const opcode = opMap[node.operator]
    if (opcode === undefined) {
      throw new Error(`Unknown binary operator: ${node.operator}`)
    }
    this.emit(opcode)
  }

  private compileLogicalExpression(node: any, scope: Scope): void {
    this.compileNode(node.left, scope)

    if (node.operator === '&&') {
      this.emit(OpCode.DUP)
      const jumpIndex = this.emit(OpCode.JUMP_IF_FALSE, 0)
      this.emit(OpCode.POP)
      this.compileNode(node.right, scope)
      this.patchJump(jumpIndex)
    } else if (node.operator === '||') {
      this.emit(OpCode.DUP)
      const jumpIndex = this.emit(OpCode.JUMP_IF_TRUE, 0)
      this.emit(OpCode.POP)
      this.compileNode(node.right, scope)
      this.patchJump(jumpIndex)
    } else if (node.operator === '??') {
      // Nullish coalescing
      this.emit(OpCode.DUP)
      this.emit(OpCode.LOAD_NULL)
      this.emit(OpCode.SEQ)
      const jumpIfNull = this.emit(OpCode.JUMP_IF_TRUE, 0)
      this.emit(OpCode.DUP)
      this.emit(OpCode.LOAD_UNDEFINED)
      this.emit(OpCode.SEQ)
      const jumpIfUndefined = this.emit(OpCode.JUMP_IF_TRUE, 0)
      const skipRight = this.emit(OpCode.JUMP, 0)
      this.patchJump(jumpIfNull)
      this.patchJump(jumpIfUndefined)
      this.emit(OpCode.POP)
      this.compileNode(node.right, scope)
      this.patchJump(skipRight)
    }
  }

  private compileUnaryExpression(node: any, scope: Scope): void {
    this.compileNode(node.argument, scope)

    const opMap: Record<string, OpCode> = {
      '!': OpCode.NOT,
      '~': OpCode.BITWISE_NOT,
      'typeof': OpCode.TYPEOF,
      'void': OpCode.VOID,
      'delete': OpCode.DELETE,
      '+': OpCode.PLUS,
      '-': OpCode.MINUS,
    }

    const opcode = opMap[node.operator]
    if (opcode === undefined) {
      throw new Error(`Unknown unary operator: ${node.operator}`)
    }
    this.emit(opcode)
  }

  private compileUpdateExpression(node: any, scope: Scope): void {
    // For ++/-- we need to handle both prefix and postfix
    if (node.argument.type === 'Identifier') {
      this.emit(OpCode.LOAD_VAR, node.argument.name)
      if (!node.prefix) {
        this.emit(OpCode.DUP) // Keep original value for postfix
      }
      this.emit(node.operator === '++' ? OpCode.INC : OpCode.DEC)
      if (node.prefix) {
        this.emit(OpCode.DUP) // Keep new value for prefix
      }
      this.emit(OpCode.STORE_VAR, node.argument.name)
    } else if (node.argument.type === 'MemberExpression') {
      // obj.prop++ or obj[prop]++
      this.compileNode(node.argument.object, scope)
      if (node.argument.computed) {
        this.compileNode(node.argument.property, scope)
      } else {
        const idx = addConstant(this.chunk, node.argument.property.name)
        this.emit(OpCode.PUSH, idx)
      }
      this.emit(OpCode.DUP) // Duplicate obj and prop for later SET_MEMBER
      this.emit(OpCode.DUP)
      this.emit(OpCode.GET_MEMBER)
      if (!node.prefix) {
        this.emit(OpCode.DUP)
      }
      this.emit(node.operator === '++' ? OpCode.INC : OpCode.DEC)
      if (node.prefix) {
        this.emit(OpCode.DUP)
      }
      this.emit(OpCode.SET_MEMBER)
    }
  }

  // ===== Assignment =====
  private compileAssignmentExpression(node: any, scope: Scope): void {
    if (node.operator === '=') {
      // For member expressions, we need to push object and property first
      if (node.left.type === 'MemberExpression') {
        this.compileNode(node.left.object, scope)
        if (node.left.computed) {
          this.compileNode(node.left.property, scope)
        } else {
          const idx = addConstant(this.chunk, node.left.property.name)
          this.emit(OpCode.PUSH, idx)
        }
        this.compileNode(node.right, scope)
        this.emit(OpCode.SET_MEMBER)
      } else {
        // For identifiers and patterns, compile value first
        this.compileNode(node.right, scope)
        this.compileAssignmentTarget(node.left, scope)
      }
    } else if (node.operator === '??=' || node.operator === '||=' || node.operator === '&&=') {
      // Logical assignment operators
      if (node.left.type === 'Identifier') {
        this.emit(OpCode.LOAD_VAR, node.left.name)

        if (node.operator === '??=') {
          // a ??= b -> assign only if a is null or undefined
          this.emit(OpCode.DUP)
          this.emit(OpCode.LOAD_NULL)
          this.emit(OpCode.SEQ)
          const jumpIfNull = this.emit(OpCode.JUMP_IF_TRUE, 0)
          this.emit(OpCode.DUP)
          this.emit(OpCode.LOAD_UNDEFINED)
          this.emit(OpCode.SEQ)
          const jumpIfUndefined = this.emit(OpCode.JUMP_IF_TRUE, 0)
          const skipAssignment = this.emit(OpCode.JUMP, 0)

          // Assign
          this.patchJump(jumpIfNull)
          this.patchJump(jumpIfUndefined)
          this.emit(OpCode.POP)
          this.compileNode(node.right, scope)
          this.emit(OpCode.DUP)
          this.emit(OpCode.STORE_VAR, node.left.name)

          this.patchJump(skipAssignment)
        } else if (node.operator === '||=') {
          // a ||= b -> assign only if a is falsy
          this.emit(OpCode.DUP)
          const jumpIfTruthy = this.emit(OpCode.JUMP_IF_TRUE, 0)
          this.emit(OpCode.POP)
          this.compileNode(node.right, scope)
          this.emit(OpCode.DUP)
          this.emit(OpCode.STORE_VAR, node.left.name)
          this.patchJump(jumpIfTruthy)
        } else if (node.operator === '&&=') {
          // a &&= b -> assign only if a is truthy
          this.emit(OpCode.DUP)
          const jumpIfFalsy = this.emit(OpCode.JUMP_IF_FALSE, 0)
          this.emit(OpCode.POP)
          this.compileNode(node.right, scope)
          this.emit(OpCode.DUP)
          this.emit(OpCode.STORE_VAR, node.left.name)
          this.patchJump(jumpIfFalsy)
        }
      } else if (node.left.type === 'MemberExpression') {
        // Similar logic for member expressions
        this.compileNode(node.left.object, scope)
        if (node.left.computed) {
          this.compileNode(node.left.property, scope)
        } else {
          const idx = addConstant(this.chunk, node.left.property.name)
          this.emit(OpCode.PUSH, idx)
        }
        this.emit(OpCode.DUP)
        this.emit(OpCode.DUP)
        this.emit(OpCode.GET_MEMBER)

        if (node.operator === '??=') {
          this.emit(OpCode.DUP)
          this.emit(OpCode.LOAD_NULL)
          this.emit(OpCode.SEQ)
          const jumpIfNull = this.emit(OpCode.JUMP_IF_TRUE, 0)
          this.emit(OpCode.DUP)
          this.emit(OpCode.LOAD_UNDEFINED)
          this.emit(OpCode.SEQ)
          const jumpIfUndefined = this.emit(OpCode.JUMP_IF_TRUE, 0)
          const skipAssignment = this.emit(OpCode.JUMP, 0)

          this.patchJump(jumpIfNull)
          this.patchJump(jumpIfUndefined)
          this.emit(OpCode.POP)
          this.compileNode(node.right, scope)
          this.emit(OpCode.DUP)
          this.emit(OpCode.SET_MEMBER)

          this.patchJump(skipAssignment)
        } else if (node.operator === '||=') {
          this.emit(OpCode.DUP)
          const jumpIfTruthy = this.emit(OpCode.JUMP_IF_TRUE, 0)
          this.emit(OpCode.POP)
          this.compileNode(node.right, scope)
          this.emit(OpCode.DUP)
          this.emit(OpCode.SET_MEMBER)
          this.patchJump(jumpIfTruthy)
        } else if (node.operator === '&&=') {
          this.emit(OpCode.DUP)
          const jumpIfFalsy = this.emit(OpCode.JUMP_IF_FALSE, 0)
          this.emit(OpCode.POP)
          this.compileNode(node.right, scope)
          this.emit(OpCode.DUP)
          this.emit(OpCode.SET_MEMBER)
          this.patchJump(jumpIfFalsy)
        }
      }
    } else {
      // Compound assignment: +=, -=, etc.
      const baseOp = node.operator.slice(0, -1) // Remove '='

      if (node.left.type === 'Identifier') {
        this.emit(OpCode.LOAD_VAR, node.left.name)
        this.compileNode(node.right, scope)
        this.emitBinaryOp(baseOp)
        this.emit(OpCode.DUP)
        this.emit(OpCode.STORE_VAR, node.left.name)
      } else if (node.left.type === 'MemberExpression') {
        this.compileNode(node.left.object, scope)
        if (node.left.computed) {
          this.compileNode(node.left.property, scope)
        } else {
          const idx = addConstant(this.chunk, node.left.property.name)
          this.emit(OpCode.PUSH, idx)
        }
        this.emit(OpCode.DUP)
        this.emit(OpCode.DUP)
        this.emit(OpCode.GET_MEMBER)
        this.compileNode(node.right, scope)
        this.emitBinaryOp(baseOp)
        this.emit(OpCode.DUP)
        this.emit(OpCode.SET_MEMBER)
      }
    }
  }

  private compileAssignmentTarget(target: any, scope: Scope): void {
    if (target.type === 'Identifier') {
      this.emit(OpCode.DUP)
      this.emit(OpCode.STORE_VAR, target.name)
    } else if (target.type === 'MemberExpression') {
      this.compileNode(target.object, scope)
      if (target.computed) {
        this.compileNode(target.property, scope)
      } else {
        const idx = addConstant(this.chunk, target.property.name)
        this.emit(OpCode.PUSH, idx)
      }
      this.emit(OpCode.SET_MEMBER)
    } else if (target.type === 'ArrayPattern' || target.type === 'ObjectPattern') {
      // Destructuring assignment - complex case
      this.compilePattern(target, scope)
    }
  }

  private emitBinaryOp(operator: string): void {
    const opMap: Record<string, OpCode> = {
      '+': OpCode.ADD,
      '-': OpCode.SUB,
      '*': OpCode.MUL,
      '/': OpCode.DIV,
      '%': OpCode.MOD,
      '**': OpCode.EXP,
      '&': OpCode.BITWISE_AND,
      '|': OpCode.BITWISE_OR,
      '^': OpCode.BITWISE_XOR,
      '<<': OpCode.LEFT_SHIFT,
      '>>': OpCode.RIGHT_SHIFT,
      '>>>': OpCode.UNSIGNED_RIGHT_SHIFT,
    }
    const opcode = opMap[operator]
    if (opcode === undefined) {
      throw new Error(`Unknown binary operator in compound assignment: ${operator}`)
    }
    this.emit(opcode)
  }

  // ===== Member & Call Expressions =====
  private compileMemberExpression(node: any, scope: Scope): void {
    this.compileNode(node.object, scope)

    // Handle optional chaining (?.)
    if (node.optional) {
      // Check if object is null or undefined
      this.emit(OpCode.DUP)

      // Check for null
      this.emit(OpCode.DUP)
      this.emit(OpCode.LOAD_NULL)
      this.emit(OpCode.SEQ)
      const jumpIfNull = this.emit(OpCode.JUMP_IF_TRUE, 0)

      // Check for undefined
      this.emit(OpCode.DUP)
      this.emit(OpCode.LOAD_UNDEFINED)
      this.emit(OpCode.SEQ)
      const jumpIfUndefined = this.emit(OpCode.JUMP_IF_TRUE, 0)

      // Not null/undefined, access property
      if (node.computed) {
        this.compileNode(node.property, scope)
      } else {
        const idx = addConstant(this.chunk, node.property.name)
        this.emit(OpCode.PUSH, idx)
      }
      this.emit(OpCode.GET_MEMBER)
      const skipUndefined = this.emit(OpCode.JUMP, 0)

      // If null or undefined, pop the duplicates and push undefined
      this.patchJump(jumpIfNull)
      this.patchJump(jumpIfUndefined)
      this.emit(OpCode.POP)  // Pop the duplicate
      this.emit(OpCode.POP)  // Pop the original value
      this.emit(OpCode.LOAD_UNDEFINED)

      this.patchJump(skipUndefined)
    } else {
      // Normal member access
      if (node.computed) {
        this.compileNode(node.property, scope)
      } else {
        const idx = addConstant(this.chunk, node.property.name)
        this.emit(OpCode.PUSH, idx)
      }
      this.emit(OpCode.GET_MEMBER)
    }
  }

  private compileCallExpression(node: any, scope: Scope): void {
    const hasSpread = node.arguments.some((arg: any) => arg && arg.type === 'SpreadElement')

    // Check if this is a super() call
    if (node.callee.type === 'Super') {
      // Compile arguments for super call
      for (const arg of node.arguments) {
        this.compileNode(arg, scope)
      }
      // Emit super call opcode
      this.emit(OpCode.SUPER_CALL, node.arguments.length)
    }
    // Check if this is a method call (callee is a MemberExpression)
    else if (node.callee.type === 'MemberExpression') {
      if (hasSpread) {
        // Build arguments array with spread support
        this.emit(OpCode.NEW_ARRAY, 0)
        for (const arg of node.arguments) {
          if (arg.type === 'SpreadElement') {
            this.compileNode(arg.argument, scope)
            this.emit(OpCode.ARRAY_CONCAT)
          } else {
            this.compileNode(arg, scope)
            this.emit(OpCode.ARRAY_PUSH)
          }
        }

        // Compile the object (receiver)
        this.compileNode(node.callee.object, scope)

        // Duplicate the receiver so we have it for method call
        this.emit(OpCode.DUP)

        // Get the method
        if (node.callee.computed) {
          this.compileNode(node.callee.property, scope)
        } else {
          const idx = addConstant(this.chunk, node.callee.property.name)
          this.emit(OpCode.PUSH, idx)
        }
        this.emit(OpCode.GET_MEMBER)

        // Stack: argsArray, receiver, method
        this.emit(OpCode.CALL_WITH_SPREAD)
      } else {
        // Compile arguments
        for (const arg of node.arguments) {
          this.compileNode(arg, scope)
        }

        // Compile the object (receiver)
        this.compileNode(node.callee.object, scope)

        // Duplicate the receiver so we have it for method call
        this.emit(OpCode.DUP)

        // Get the method
        if (node.callee.computed) {
          this.compileNode(node.callee.property, scope)
        } else {
          const idx = addConstant(this.chunk, node.callee.property.name)
          this.emit(OpCode.PUSH, idx)
        }
        this.emit(OpCode.GET_MEMBER)

        // Call method with receiver binding
        // Stack: args..., receiver, method
        this.emit(OpCode.CALL_METHOD, node.arguments.length)
      }
    } else {
      // Regular function call
      if (hasSpread) {
        // Build arguments array with spread support
        this.emit(OpCode.NEW_ARRAY, 0)
        for (const arg of node.arguments) {
          if (arg.type === 'SpreadElement') {
            this.compileNode(arg.argument, scope)
            this.emit(OpCode.ARRAY_CONCAT)
          } else {
            this.compileNode(arg, scope)
            this.emit(OpCode.ARRAY_PUSH)
          }
        }

        // For regular function calls, push undefined as receiver
        this.emit(OpCode.LOAD_UNDEFINED)

        // Compile callee
        this.compileNode(node.callee, scope)

        // Call with spread
        // Stack: argsArray, undefined (receiver), function
        this.emit(OpCode.CALL_WITH_SPREAD)
      } else {
        // Compile arguments
        for (const arg of node.arguments) {
          this.compileNode(arg, scope)
        }
        // Compile callee
        this.compileNode(node.callee, scope)
        // Call with argument count
        this.emit(OpCode.CALL, node.arguments.length)
      }
    }
  }

  private compileNewExpression(node: any, scope: Scope): void {
    // Compile arguments
    for (const arg of node.arguments) {
      this.compileNode(arg, scope)
    }
    // Compile constructor
    this.compileNode(node.callee, scope)
    // New with argument count
    this.emit(OpCode.NEW, node.arguments.length)
  }

  // ===== Statements =====
  private compileExpressionStatement(node: any, scope: Scope): void {
    this.compileNode(node.expression, scope)
    this.emit(OpCode.POP) // Expression statement result is discarded
  }

  private compileBlockStatement(node: any, scope: Scope): void {
    this.emit(OpCode.PUSH_SCOPE)
    for (const stmt of node.body) {
      this.compileNode(stmt, scope)
    }
    this.emit(OpCode.POP_SCOPE)
  }

  private compileReturnStatement(node: any, scope: Scope): void {
    if (node.argument) {
      this.compileNode(node.argument, scope)
    } else {
      this.emit(OpCode.LOAD_UNDEFINED)
    }
    this.emit(OpCode.RETURN)
  }

  private compileIfStatement(node: any, scope: Scope): void {
    this.compileNode(node.test, scope)
    const jumpIfFalse = this.emit(OpCode.JUMP_IF_FALSE, 0)

    this.compileNode(node.consequent, scope)

    if (node.alternate) {
      const jumpEnd = this.emit(OpCode.JUMP, 0)
      this.patchJump(jumpIfFalse)
      this.compileNode(node.alternate, scope)
      this.patchJump(jumpEnd)
    } else {
      this.patchJump(jumpIfFalse)
    }
  }

  private compileWhileStatement(node: any, scope: Scope): void {
    const loopStart = this.chunk.instructions.length
    const breakLabels: number[] = []
    const continueLabels: number[] = []

    this.loopStack.push({ breakLabel: breakLabels, continueLabel: continueLabels })

    this.compileNode(node.test, scope)
    const jumpIfFalse = this.emit(OpCode.JUMP_IF_FALSE, 0)

    this.compileNode(node.body, scope)

    this.emit(OpCode.JUMP, loopStart)
    this.patchJump(jumpIfFalse)

    // Patch break/continue jumps
    const loopEnd = this.chunk.instructions.length
    for (const label of breakLabels) {
      this.chunk.instructions[label].operand = loopEnd
    }
    for (const label of continueLabels) {
      this.chunk.instructions[label].operand = loopStart
    }

    this.loopStack.pop()
  }

  private compileDoWhileStatement(node: any, scope: Scope): void {
    const loopStart = this.chunk.instructions.length
    const breakLabels: number[] = []
    const continueLabels: number[] = []

    this.loopStack.push({ breakLabel: breakLabels, continueLabel: continueLabels })

    this.compileNode(node.body, scope)

    const testStart = this.chunk.instructions.length
    this.compileNode(node.test, scope)
    this.emit(OpCode.JUMP_IF_TRUE, loopStart)

    const loopEnd = this.chunk.instructions.length
    for (const label of breakLabels) {
      this.chunk.instructions[label].operand = loopEnd
    }
    for (const label of continueLabels) {
      this.chunk.instructions[label].operand = testStart
    }

    this.loopStack.pop()
  }

  private compileForStatement(node: any, scope: Scope): void {
    this.emit(OpCode.PUSH_SCOPE)

    if (node.init) {
      this.compileNode(node.init, scope)
      if (node.init.type !== 'VariableDeclaration') {
        this.emit(OpCode.POP)
      }
    }

    const loopStart = this.chunk.instructions.length
    const breakLabels: number[] = []
    const continueLabels: number[] = []

    this.loopStack.push({ breakLabel: breakLabels, continueLabel: continueLabels })

    let jumpIfFalse: number | null = null
    if (node.test) {
      this.compileNode(node.test, scope)
      jumpIfFalse = this.emit(OpCode.JUMP_IF_FALSE, 0)
    }

    this.compileNode(node.body, scope)

    const updateStart = this.chunk.instructions.length
    if (node.update) {
      this.compileNode(node.update, scope)
      this.emit(OpCode.POP)
    }

    this.emit(OpCode.JUMP, loopStart)

    const loopEnd = this.chunk.instructions.length
    if (jumpIfFalse !== null) {
      this.patchJump(jumpIfFalse)
    }

    for (const label of breakLabels) {
      this.chunk.instructions[label].operand = loopEnd
    }
    for (const label of continueLabels) {
      this.chunk.instructions[label].operand = updateStart
    }

    this.loopStack.pop()
    this.emit(OpCode.POP_SCOPE)
  }

  private compileBreakStatement(node: any, scope: Scope): void {
    if (this.loopStack.length === 0) {
      throw new Error('Break statement outside of loop')
    }
    const breakIndex = this.emit(OpCode.JUMP, 0)
    this.loopStack[this.loopStack.length - 1].breakLabel.push(breakIndex)
  }

  private compileContinueStatement(node: any, scope: Scope): void {
    if (this.loopStack.length === 0) {
      throw new Error('Continue statement outside of loop')
    }
    const continueIndex = this.emit(OpCode.JUMP, 0)
    this.loopStack[this.loopStack.length - 1].continueLabel.push(continueIndex)
  }

  // ===== Declarations =====
  private compileVariableDeclaration(node: any, scope: Scope): void {
    for (const declarator of node.declarations) {
      if (declarator.init) {
        this.compileNode(declarator.init, scope)
      } else {
        // For var without initializer, use NOINIT to prevent overwriting existing value
        // For let/const without initializer, use undefined
        if (node.kind === 'var') {
          this.emit(OpCode.LOAD_NOINIT)
        } else {
          this.emit(OpCode.LOAD_UNDEFINED)
        }
      }

      if (declarator.id.type === 'Identifier') {
        if (node.kind === 'const') {
          this.emit(OpCode.DECLARE_CONST, declarator.id.name)
        } else if (node.kind === 'let') {
          this.emit(OpCode.DECLARE_LET, declarator.id.name)
        } else {
          this.emit(OpCode.DECLARE_VAR, declarator.id.name)
        }
      } else {
        // Destructuring
        this.compilePattern(declarator.id, scope, node.kind)
      }
    }
  }

  private compileFunctionDeclaration(node: any, scope: Scope): void {
    const funcIdx = addConstant(this.chunk, node)
    this.emit(OpCode.CREATE_FUNCTION, funcIdx)
    this.emit(OpCode.DECLARE_VAR, node.id.name)
  }

  // ===== Special =====
  private compileConditionalExpression(node: any, scope: Scope): void {
    this.compileNode(node.test, scope)
    const jumpIfFalse = this.emit(OpCode.JUMP_IF_FALSE, 0)
    this.compileNode(node.consequent, scope)
    const jumpEnd = this.emit(OpCode.JUMP, 0)
    this.patchJump(jumpIfFalse)
    this.compileNode(node.alternate, scope)
    this.patchJump(jumpEnd)
  }

  private compileSequenceExpression(node: any, scope: Scope): void {
    for (let i = 0; i < node.expressions.length; i++) {
      this.compileNode(node.expressions[i], scope)
      if (i < node.expressions.length - 1) {
        this.emit(OpCode.POP)
      }
    }
  }

  private compileArrayExpression(node: any, scope: Scope): void {
    // Check if there are any spread elements
    const hasSpread = node.elements.some((el: any) => el && el.type === 'SpreadElement')

    if (hasSpread) {
      // Create array progressively with spreads
      this.emit(OpCode.NEW_ARRAY, 0) // Start with empty array

      for (const element of node.elements) {
        if (element) {
          if (element.type === 'SpreadElement') {
            // Compile the spread source
            this.compileNode(element.argument, scope)
            // Spread and concat to array
            this.emit(OpCode.ARRAY_CONCAT)
          } else {
            // Push single element
            this.compileNode(element, scope)
            this.emit(OpCode.ARRAY_PUSH)
          }
        } else {
          this.emit(OpCode.LOAD_UNDEFINED)
          this.emit(OpCode.ARRAY_PUSH)
        }
      }
    } else {
      // No spreads, use simple array creation
      for (const element of node.elements) {
        if (element) {
          this.compileNode(element, scope)
        } else {
          this.emit(OpCode.LOAD_UNDEFINED)
        }
      }
      this.emit(OpCode.NEW_ARRAY, node.elements.length)
    }
  }

  private compileObjectExpression(node: any, scope: Scope): void {
    // Check if there are any spread elements
    const hasSpread = node.properties.some((prop: any) => prop.type === 'SpreadElement')

    if (hasSpread) {
      // Create object progressively with spreads
      this.emit(OpCode.NEW_OBJECT, 0) // Start with empty object

      for (const prop of node.properties) {
        if (prop.type === 'SpreadElement') {
          // Compile the spread source
          this.compileNode(prop.argument, scope)
          // Spread and assign to object
          this.emit(OpCode.OBJECT_ASSIGN)
        } else {
          // Add single property
          // Key
          if (prop.computed) {
            this.compileNode(prop.key, scope)
          } else {
            const key = prop.key.type === 'Identifier' ? prop.key.name : prop.key.value
            const idx = addConstant(this.chunk, key)
            this.emit(OpCode.PUSH, idx)
          }
          // Value
          this.compileNode(prop.value, scope)
          // Set property
          this.emit(OpCode.OBJECT_SET_PROP)
        }
      }
    } else {
      // No spreads, use simple object creation
      let propCount = 0
      for (const prop of node.properties) {
        // Key
        if (prop.computed) {
          this.compileNode(prop.key, scope)
        } else {
          const key = prop.key.type === 'Identifier' ? prop.key.name : prop.key.value
          const idx = addConstant(this.chunk, key)
          this.emit(OpCode.PUSH, idx)
        }
        // Value
        this.compileNode(prop.value, scope)
        propCount++
      }
      this.emit(OpCode.NEW_OBJECT, propCount)
    }
  }

  private compileArrowFunctionExpression(node: any, scope: Scope): void {
    const funcIdx = addConstant(this.chunk, node)
    this.emit(OpCode.CREATE_ARROW_FUNCTION, funcIdx)
  }

  private compileFunctionExpression(node: any, scope: Scope): void {
    const funcIdx = addConstant(this.chunk, node)
    this.emit(OpCode.CREATE_FUNCTION, funcIdx)
  }

  private compileAwaitExpression(node: any, scope: Scope): void {
    this.compileNode(node.argument, scope)
    this.emit(OpCode.AWAIT)
  }

  private compileYieldExpression(node: any, scope: Scope): void {
    if (node.argument) {
      this.compileNode(node.argument, scope)
    } else {
      this.emit(OpCode.LOAD_UNDEFINED)
    }
    this.emit(OpCode.YIELD, node.delegate ? 1 : 0)
  }

  private compileThrowStatement(node: any, scope: Scope): void {
    this.compileNode(node.argument, scope)
    this.emit(OpCode.THROW)
  }

  private compileTryStatement(node: any, scope: Scope): void {
    // Try/catch/finally control flow:
    // TRY_START <catchJump> <finallyJump>
    // ... try block ...
    // TRY_END
    // JUMP <afterCatch>
    // <catchJump>:
    // ... catch block ...
    // <afterCatch>:
    // <finallyJump>:
    // ... finally block ...
    // TRY_CLEANUP

    const hasCatch = node.handler !== null
    const hasFinally = node.finalizer !== null

    // Emit TRY_START with placeholders for catch and finally jumps
    const tryStartIdx = this.emit(OpCode.TRY_START, {
      hasCatch,
      hasFinally,
      catchJump: 0,
      finallyJump: 0
    })

    // Compile try block
    this.compileNode(node.block, scope)
    this.emit(OpCode.TRY_END)

    // Jump over catch block if no exception
    const jumpOverCatch = hasCatch ? this.emit(OpCode.JUMP, 0) : -1

    // Catch block
    const catchStart = this.chunk.instructions.length
    if (hasCatch) {
      this.emit(OpCode.CATCH_START, node.handler.param?.name)
      this.compileNode(node.handler.body, scope)
      this.emit(OpCode.CATCH_END)
    }

    // Patch jump over catch
    if (jumpOverCatch >= 0) {
      this.patchJump(jumpOverCatch)
    }

    // Finally block
    const finallyStart = this.chunk.instructions.length
    if (hasFinally) {
      this.emit(OpCode.FINALLY_START)
      this.compileNode(node.finalizer, scope)
      this.emit(OpCode.FINALLY_END)
    }

    // Patch TRY_START with actual jump addresses
    this.chunk.instructions[tryStartIdx].operand = {
      hasCatch,
      hasFinally,
      catchJump: catchStart,
      finallyJump: finallyStart
    }
  }

  private compileSwitchStatement(node: any, scope: Scope): void {
    this.compileNode(node.discriminant, scope)

    const caseJumps: number[] = []
    const breakLabels: number[] = []

    this.loopStack.push({ breakLabel: breakLabels, continueLabel: [] })

    // Generate case tests
    for (const switchCase of node.cases) {
      if (switchCase.test) {
        this.emit(OpCode.DUP)
        this.compileNode(switchCase.test, scope)
        this.emit(OpCode.SEQ)
        caseJumps.push(this.emit(OpCode.JUMP_IF_TRUE, 0))
      }
    }

    // Default case or end
    const defaultJump = this.emit(OpCode.JUMP, 0)

    // Patch case jumps and compile case bodies
    let caseIndex = 0
    for (let i = 0; i < node.cases.length; i++) {
      const switchCase = node.cases[i]
      if (switchCase.test) {
        this.patchJump(caseJumps[caseIndex++])
      }
      for (const stmt of switchCase.consequent) {
        this.compileNode(stmt, scope)
      }
    }

    const endLabel = this.chunk.instructions.length
    this.patchJump(defaultJump)

    for (const label of breakLabels) {
      this.chunk.instructions[label].operand = endLabel
    }

    this.loopStack.pop()
    this.emit(OpCode.POP) // Pop discriminant
  }

  // ===== Pattern compilation (destructuring) =====
  private compilePattern(pattern: any, scope: Scope, kind?: string): void {
    // Simplified pattern handling - full implementation would be more complex
    if (pattern.type === 'Identifier') {
      // Use appropriate declaration or assignment based on kind
      if (kind === 'const') {
        this.emit(OpCode.DECLARE_CONST, pattern.name)
      } else if (kind === 'let') {
        this.emit(OpCode.DECLARE_LET, pattern.name)
      } else if (kind === 'var') {
        this.emit(OpCode.DECLARE_VAR, pattern.name)
      } else {
        // Assignment pattern (no declaration) - value is on stack, consume it
        this.emit(OpCode.ASSIGN_VAR, pattern.name)
      }
    } else if (pattern.type === 'AssignmentPattern') {
      // Default value in destructuring: [a = 10] or { x = 5 }
      // Stack has the value (or undefined if not present)
      this.emit(OpCode.DUP)
      this.emit(OpCode.LOAD_UNDEFINED)
      this.emit(OpCode.SEQ) // Check if value === undefined
      const jumpIfDefined = this.emit(OpCode.JUMP_IF_FALSE, 0)

      // Value is undefined, use default
      this.emit(OpCode.POP) // Pop the undefined value
      this.compileNode(pattern.right, scope) // Compile default value

      // Patch jump
      this.patchJump(jumpIfDefined)

      // Now assign to the left side (which is the actual pattern)
      this.compilePattern(pattern.left, scope, kind)
    } else if (pattern.type === 'ArrayPattern') {
      // Array destructuring
      for (let i = 0; i < pattern.elements.length; i++) {
        const element = pattern.elements[i]
        if (element) {
          if (element.type === 'RestElement') {
            // Rest element in array pattern: [...rest]
            this.emit(OpCode.DUP)
            const idx = addConstant(this.chunk, i) // Start index
            this.emit(OpCode.PUSH, idx)
            this.emit(OpCode.ARRAY_REST)
            this.compilePattern(element.argument, scope, kind)
            break // Rest element must be last
          } else {
            this.emit(OpCode.DUP)
            const idx = addConstant(this.chunk, i)
            this.emit(OpCode.PUSH, idx)
            this.emit(OpCode.GET_MEMBER)
            this.compilePattern(element, scope, kind)
          }
        }
      }
      this.emit(OpCode.POP)
    } else if (pattern.type === 'ObjectPattern') {
      // Object destructuring
      const extractedKeys: string[] = []

      for (const property of pattern.properties) {
        if (property.type === 'RestElement') {
          // Rest property - collect remaining properties
          this.emit(OpCode.DUP) // Duplicate the source object
          // Push array of extracted keys
          const keysIdx = addConstant(this.chunk, extractedKeys)
          this.emit(OpCode.PUSH, keysIdx)
          // Call helper to create rest object (we'll need a new opcode)
          this.emit(OpCode.OBJECT_REST)
          this.compilePattern(property.argument, scope, kind)
        } else {
          // Regular property
          this.emit(OpCode.DUP)

          // Handle computed vs non-computed keys
          if (property.computed) {
            // Computed property: { [expr]: name }
            this.compileNode(property.key, scope)
            // We can't track computed keys for rest operator
          } else {
            const key = property.key.name || property.key.value
            extractedKeys.push(key)
            const idx = addConstant(this.chunk, key)
            this.emit(OpCode.PUSH, idx)
          }

          this.emit(OpCode.GET_MEMBER)
          this.compilePattern(property.value, scope, kind)
        }
      }
      this.emit(OpCode.POP)
    }
  }

  // ===== Additional statement types =====
  private compileEmptyStatement(node: any, scope: Scope): void {
    // Empty statement - no code generation needed
  }

  private compileDebuggerStatement(node: any, scope: Scope): void {
    // Debugger statement - in a real implementation this would set a breakpoint
    this.emit(OpCode.NOP)
  }

  private compileLabeledStatement(node: any, scope: Scope): void {
    // Store label position for break/continue
    const labelStart = this.chunk.instructions.length
    this.labelMap.set(node.label.name, labelStart)
    this.compileNode(node.body, scope)
    this.labelMap.delete(node.label.name)
  }

  private compileWithStatement(node: any, scope: Scope): void {
    // With statement - simplified implementation
    // In a full implementation, this would modify scope chain
    this.compileNode(node.object, scope)
    this.emit(OpCode.POP)
    this.compileNode(node.body, scope)
  }

  // ===== For-in and For-of loops =====
  private compileForInStatement(node: any, scope: Scope): void {
    this.emit(OpCode.PUSH_SCOPE)

    // Get the object and its keys
    this.compileNode(node.right, scope)
    this.emit(OpCode.GET_KEYS) // Converts object to array of keys
    this.emit(OpCode.DECLARE_VAR, '__keys__')

    // Initialize index
    const idx = addConstant(this.chunk, 0)
    this.emit(OpCode.PUSH, idx)
    this.emit(OpCode.DECLARE_VAR, '__index__')

    const loopStart = this.chunk.instructions.length
    const breakLabels: number[] = []
    const continueLabels: number[] = []
    this.loopStack.push({ breakLabel: breakLabels, continueLabel: continueLabels })

    // Check if index < keys.length
    this.emit(OpCode.LOAD_VAR, '__index__')
    this.emit(OpCode.LOAD_VAR, '__keys__')
    const lengthIdx = addConstant(this.chunk, 'length')
    this.emit(OpCode.PUSH, lengthIdx)
    this.emit(OpCode.GET_MEMBER)
    this.emit(OpCode.LT)
    const jumpToEnd = this.emit(OpCode.JUMP_IF_FALSE, 0)

    // Get current key: keys[index]
    this.emit(OpCode.LOAD_VAR, '__keys__')
    this.emit(OpCode.LOAD_VAR, '__index__')
    this.emit(OpCode.GET_MEMBER)

    // Assign to loop variable
    if (node.left.type === 'VariableDeclaration') {
      const decl = node.left.declarations[0]
      if (decl.id.type === 'Identifier') {
        if (node.left.kind === 'const') {
          this.emit(OpCode.DECLARE_CONST, decl.id.name)
        } else if (node.left.kind === 'let') {
          this.emit(OpCode.DECLARE_LET, decl.id.name)
        } else {
          this.emit(OpCode.DECLARE_VAR, decl.id.name)
        }
      }
    } else if (node.left.type === 'Identifier') {
      this.emit(OpCode.STORE_VAR, node.left.name)
      this.emit(OpCode.POP)
    }

    // Compile loop body
    this.compileNode(node.body, scope)

    // Increment index
    const continueTarget = this.chunk.instructions.length
    this.emit(OpCode.LOAD_VAR, '__index__')
    this.emit(OpCode.INC)
    this.emit(OpCode.STORE_VAR, '__index__')
    this.emit(OpCode.POP)

    // Jump back to loop start
    this.emit(OpCode.JUMP, loopStart)

    // Loop end
    const loopEnd = this.chunk.instructions.length
    this.patchJump(jumpToEnd)

    // Patch break/continue
    for (const label of breakLabels) {
      this.chunk.instructions[label].operand = loopEnd
    }
    for (const label of continueLabels) {
      this.chunk.instructions[label].operand = continueTarget
    }

    this.loopStack.pop()
    this.emit(OpCode.POP_SCOPE)
  }

  private compileForAwaitStatement(node: any, scope: Scope): void {
    // For-await-of is similar to for-of but awaits the iterator
    // We'll just compile it like for-of for now - the async execution will handle it
    this.compileForOfStatement(node, scope)
  }

  private compileForOfStatement(node: any, scope: Scope): void {
    this.emit(OpCode.PUSH_SCOPE)

    // Get the iterable and create iterator
    this.compileNode(node.right, scope)
    this.emit(OpCode.GET_ITERATOR) // Gets iterator from iterable
    this.emit(OpCode.DECLARE_VAR, '__iterator__')

    const loopStart = this.chunk.instructions.length
    const breakLabels: number[] = []
    const continueLabels: number[] = []
    this.loopStack.push({ breakLabel: breakLabels, continueLabel: continueLabels })

    // Get next value from iterator
    this.emit(OpCode.LOAD_VAR, '__iterator__')
    this.emit(OpCode.ITERATOR_NEXT) // Pushes {value, done}
    this.emit(OpCode.DUP)
    this.emit(OpCode.DECLARE_VAR, '__iterResult__')

    // Check if done
    this.emit(OpCode.LOAD_VAR, '__iterResult__')
    this.emit(OpCode.ITERATOR_DONE)
    const jumpToEnd = this.emit(OpCode.JUMP_IF_TRUE, 0)

    // Get value from result
    this.emit(OpCode.LOAD_VAR, '__iterResult__')
    const valueIdx = addConstant(this.chunk, 'value')
    this.emit(OpCode.PUSH, valueIdx)
    this.emit(OpCode.GET_MEMBER)

    // Assign to loop variable
    if (node.left.type === 'VariableDeclaration') {
      const decl = node.left.declarations[0]
      if (decl.id.type === 'Identifier') {
        if (node.left.kind === 'const') {
          this.emit(OpCode.DECLARE_CONST, decl.id.name)
        } else if (node.left.kind === 'let') {
          this.emit(OpCode.DECLARE_LET, decl.id.name)
        } else {
          this.emit(OpCode.DECLARE_VAR, decl.id.name)
        }
      }
    } else if (node.left.type === 'Identifier') {
      this.emit(OpCode.STORE_VAR, node.left.name)
      this.emit(OpCode.POP)
    }

    // Compile loop body
    this.compileNode(node.body, scope)

    // Jump back to loop start
    const continueTarget = this.chunk.instructions.length
    this.emit(OpCode.JUMP, loopStart)

    // Loop end
    const loopEnd = this.chunk.instructions.length
    this.patchJump(jumpToEnd)

    // Patch break/continue
    for (const label of breakLabels) {
      this.chunk.instructions[label].operand = loopEnd
    }
    for (const label of continueLabels) {
      this.chunk.instructions[label].operand = continueTarget
    }

    this.loopStack.pop()
    this.emit(OpCode.POP_SCOPE)
  }

  // ===== Class declarations =====
  private compileClassDeclaration(node: any, scope: Scope): void {
    const classIdx = addConstant(this.chunk, node)
    this.emit(OpCode.CREATE_CLASS, classIdx)
    this.emit(OpCode.DECLARE_VAR, node.id.name)
  }

  private compileClassExpression(node: any, scope: Scope): void {
    const classIdx = addConstant(this.chunk, node)
    this.emit(OpCode.CREATE_CLASS, classIdx)
  }

  // ===== Import/Export =====
  private compileImportDeclaration(node: any, scope: Scope): void {
    // Import declarations are handled at parse time by Sval.import()
    // No runtime code generation needed
  }

  private compileExportNamedDeclaration(node: any, scope: Scope): void {
    if (node.declaration) {
      this.compileNode(node.declaration, scope)
    }
    // Exports are handled via the exports object
  }

  private compileExportDefaultDeclaration(node: any, scope: Scope): void {
    this.compileNode(node.declaration, scope)
    // Store to exports.default
    this.emit(OpCode.LOAD_VAR, 'exports')
    const idx = addConstant(this.chunk, 'default')
    this.emit(OpCode.PUSH, idx)
    this.emit(OpCode.SET_MEMBER)
    this.emit(OpCode.POP)
  }

  private compileExportAllDeclaration(node: any, scope: Scope): void {
    // Export all - simplified
  }

  // ===== Special expressions =====
  private compileChainExpression(node: any, scope: Scope): void {
    // Optional chaining - simplified
    this.compileNode(node.expression, scope)
  }

  private compileMetaProperty(node: any, scope: Scope): void {
    // new.target or import.meta
    if (node.meta.name === 'new' && node.property.name === 'target') {
      // Load new.target from scope
      const variable = this.currentScope.$find(NEWTARGET)
      if (variable) {
        this.emit(OpCode.LOAD_VAR, NEWTARGET)
      } else {
        this.emit(OpCode.LOAD_UNDEFINED)
      }
    } else if (node.meta.name === 'import' && node.property.name === 'meta') {
      // import.meta - would need module context
      this.emit(OpCode.LOAD_UNDEFINED)
    }
  }

  private compileSpreadElement(node: any, scope: Scope): void {
    this.compileNode(node.argument, scope)
    this.emit(OpCode.SPREAD)
  }

  private compileRestElement(node: any, scope: Scope): void {
    // Rest element in destructuring - simplified
    this.compilePattern(node.argument, scope)
  }

  private compileAssignmentPattern(node: any, scope: Scope): void {
    // Assignment pattern in destructuring (default values)
    // value = value ?? default
    this.emit(OpCode.DUP)
    this.emit(OpCode.LOAD_UNDEFINED)
    this.emit(OpCode.SEQ)
    const jumpIfDefined = this.emit(OpCode.JUMP_IF_FALSE, 0)
    this.emit(OpCode.POP)
    this.compileNode(node.right, scope)
    this.patchJump(jumpIfDefined)
    this.compilePattern(node.left, scope)
  }

  private compileProperty(node: any, scope: Scope): void {
    // Property in object expression - handled by parent
    if (node.kind === 'init') {
      if (node.method) {
        // Method
        const funcIdx = addConstant(this.chunk, node.value)
        this.emit(OpCode.CREATE_FUNCTION, funcIdx)
      } else {
        this.compileNode(node.value, scope)
      }
    } else if (node.kind === 'get' || node.kind === 'set') {
      // Getter/setter - simplified
      const funcIdx = addConstant(this.chunk, node.value)
      this.emit(OpCode.CREATE_FUNCTION, funcIdx)
    }
  }

  private compileMethodDefinition(node: any, scope: Scope): void {
    // Method definition in class - handled by class compilation
  }

  private compilePropertyDefinition(node: any, scope: Scope): void {
    // Class field - handled by class compilation
  }

  private compileImportExpression(node: any, scope: Scope): void {
    // Dynamic import() - would need async support
    this.compileNode(node.source, scope)
    // Simplified - would need actual import logic
    this.emit(OpCode.LOAD_UNDEFINED)
  }

  private compileTaggedTemplateExpression(node: any, scope: Scope): void {
    // Tagged template literal
    // tag`template`
    // Stack layout for CALL: [arg0, arg1, ..., argN, function]

    // Create the template strings array (first argument)
    const strings = node.quasi.quasis.map((q: any) => q.value.cooked)
    const stringsIdx = addConstant(this.chunk, strings)
    this.emit(OpCode.PUSH, stringsIdx)

    // Compile the expressions (remaining arguments)
    for (const expr of node.quasi.expressions) {
      this.compileNode(expr, scope)
    }

    // Compile the tag function (pushed last for CALL)
    this.compileNode(node.tag, scope)

    // Call the tag function
    this.emit(OpCode.CALL, 1 + node.quasi.expressions.length)
  }

  // ===== Helper methods =====
  private emit(opcode: OpCode, operand?: any): number {
    const instruction = createInstruction(opcode, operand)
    return addInstruction(this.chunk, instruction)
  }

  private patchJump(instructionIndex: number): void {
    const jump = this.chunk.instructions.length
    this.chunk.instructions[instructionIndex].operand = jump
  }

  getChunk(): BytecodeChunk {
    return this.chunk
  }
}
