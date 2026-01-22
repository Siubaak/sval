/**
 * Bytecode instruction opcodes for the stack-based interpreter
 */

export enum OpCode {
  // Stack operations
  PUSH,           // Push constant onto stack
  POP,            // Pop value from stack
  DUP,            // Duplicate top of stack
  SWAP,           // Swap top two stack items
  ROT3,           // Rotate top 3 items: [a,b,c] -> [b,c,a]
  ROT4,           // Rotate top 4 items: [a,b,c,d] -> [b,c,d,a]

  // Variable operations
  LOAD_VAR,       // Load variable onto stack
  STORE_VAR,      // Store top of stack to variable (peek, don't pop)
  ASSIGN_VAR,     // Assign (pop) top of stack to variable
  DECLARE_VAR,    // Declare variable
  DECLARE_CONST,  // Declare const
  DECLARE_LET,    // Declare let

  // Literal operations
  LOAD_UNDEFINED,
  LOAD_NULL,
  LOAD_TRUE,
  LOAD_FALSE,
  LOAD_THIS,
  LOAD_NOINIT,    // Load NOINIT symbol for var hoisting

  // Binary operations
  ADD,
  SUB,
  MUL,
  DIV,
  MOD,
  EXP,            // **
  EQ,             // ==
  NEQ,            // !=
  SEQ,            // ===
  SNEQ,           // !==
  LT,             // <
  LTE,            // <=
  GT,             // >
  GTE,            // >=
  LOGICAL_AND,    // &&
  LOGICAL_OR,     // ||
  NULLISH_COALESCING, // ??
  BITWISE_AND,    // &
  BITWISE_OR,     // |
  BITWISE_XOR,    // ^
  LEFT_SHIFT,     // <<
  RIGHT_SHIFT,    // >>
  UNSIGNED_RIGHT_SHIFT, // >>>
  IN,             // in operator
  INSTANCEOF,     // instanceof operator

  // Unary operations
  NOT,            // !
  BITWISE_NOT,    // ~
  TYPEOF,         // typeof
  VOID,           // void
  DELETE,         // delete
  PLUS,           // +x
  MINUS,          // -x

  // Update operations
  INC,            // ++
  DEC,            // --

  // Property access
  GET_MEMBER,     // obj.prop or obj[prop]
  SET_MEMBER,     // obj.prop = value or obj[prop] = value

  // Function operations
  CALL,           // Function call
  CALL_METHOD,    // Method call with this binding
  CALL_WITH_SPREAD, // Function call with spread arguments
  NEW,            // new Constructor()
  NEW_WITH_SPREAD, // new Constructor(...args)
  RETURN,         // return statement
  YIELD,          // yield expression
  AWAIT,          // await expression

  // Object/Array operations
  NEW_OBJECT,     // Create new object
  NEW_ARRAY,      // Create new array
  SPREAD,         // Spread operator
  ARRAY_PUSH,     // Push element to array on stack
  ARRAY_CONCAT,   // Concat iterable to array on stack
  OBJECT_ASSIGN,  // Assign properties to object on stack
  OBJECT_SET_PROP, // Set property on object on stack
  OBJECT_DEFINE_GETTER, // Define getter on object
  OBJECT_DEFINE_SETTER, // Define setter on object
  OBJECT_REST,    // Create rest object from source object excluding keys
  ARRAY_REST,     // Create rest array from source array starting at index

  // Control flow
  JUMP,           // Unconditional jump
  JUMP_IF_FALSE,  // Jump if top of stack is false
  JUMP_IF_TRUE,   // Jump if top of stack is true

  // Scope operations
  PUSH_SCOPE,     // Create new scope
  POP_SCOPE,      // Exit scope

  // Function/Class creation
  CREATE_FUNCTION,
  CREATE_ARROW_FUNCTION,
  CREATE_CLASS,
  SUPER_CALL,     // super() constructor call

  // Exception handling
  THROW,
  TRY_START,
  TRY_END,
  CATCH_START,
  CATCH_END,
  FINALLY_START,
  FINALLY_END,

  // Loop control
  BREAK,
  CONTINUE,

  // Iterator operations
  GET_KEYS,         // Get Object.keys() for for-in
  GET_ITERATOR,     // Get iterator for for-of
  ITERATOR_NEXT,    // Get next value from iterator
  ITERATOR_DONE,    // Check if iterator is done

  // Special
  NOP,            // No operation
  HALT,           // Stop execution
}

/**
 * Instruction interface
 */
export interface Instruction {
  opcode: OpCode
  operand?: any
  line?: number
  column?: number
}

/**
 * Bytecode chunk - a compiled block of code
 */
export interface BytecodeChunk {
  instructions: Instruction[]
  constants: any[]
  sourceMap?: Map<number, { line: number; column: number }>
}

/**
 * Create an instruction
 */
export function createInstruction(
  opcode: OpCode,
  operand?: any,
  line?: number,
  column?: number
): Instruction {
  return { opcode, operand, line, column }
}

/**
 * Create a bytecode chunk
 */
export function createChunk(): BytecodeChunk {
  return {
    instructions: [],
    constants: [],
    sourceMap: new Map(),
  }
}

/**
 * Add an instruction to a chunk
 */
export function addInstruction(
  chunk: BytecodeChunk,
  instruction: Instruction
): number {
  const index = chunk.instructions.length
  chunk.instructions.push(instruction)
  if (instruction.line !== undefined && instruction.column !== undefined) {
    chunk.sourceMap!.set(index, {
      line: instruction.line,
      column: instruction.column,
    })
  }
  return index
}

/**
 * Add a constant to the constant pool
 */
export function addConstant(chunk: BytecodeChunk, value: any): number {
  const index = chunk.constants.indexOf(value)
  if (index !== -1) {
    return index
  }
  chunk.constants.push(value)
  return chunk.constants.length - 1
}
