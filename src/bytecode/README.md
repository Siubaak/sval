# Stack-Based Bytecode Interpreter

This directory contains the new stack-based interpreter implementation for Sval, replacing the previous tree-walking interpreter.

## Architecture

### Components

1. **opcodes.ts** - Defines the bytecode instruction set and data structures
   - 60+ opcodes covering literals, operators, control flow, functions, etc.
   - `BytecodeChunk` structure for compiled code
   - Helper functions for instruction and constant management

2. **compiler.ts** - Compiles AST nodes to bytecode instructions
   - Converts Acorn AST to bytecode instructions
   - Handles expressions, statements, declarations
   - Manages jump labels for control flow
   - Constant pool for literals and function nodes

3. **vm.ts** - Virtual Machine that executes bytecode
   - Stack-based execution model
   - Operand stack for values
   - Call stack for function frames
   - Scope stack for lexical scoping
   - Both sync (`execute`) and async (`executeAsync`) execution modes

## Execution Flow

```
JavaScript Code
      ↓
  Acorn Parser
      ↓
   AST Nodes
      ↓
   Compiler
      ↓
 Bytecode Chunk
      ↓
 Virtual Machine
      ↓
    Result
```

## Key Features

### Instruction-Based Execution
Instead of recursively walking the AST, the interpreter compiles code to bytecode instructions and executes them iteratively. This provides:
- Better performance through reduced function call overhead
- Clearer separation between compilation and execution
- Easier optimization opportunities

### Stack-Based Architecture
The VM uses multiple stacks:
- **Operand Stack**: Holds intermediate values during computation
- **Call Stack**: Manages function call frames
- **Scope Stack**: Maintains lexical scope chain

### Unified Async/Sync Execution
Single codebase handles both synchronous and asynchronous execution:
- `execute()` - Synchronous execution (throws on AWAIT instruction)
- `executeAsync()` - Asynchronous execution (supports await/async)

## Example Bytecode

For the code:
```javascript
var a = 1 + 2
exports.a = a
```

The compiler generates (simplified):
```
PUSH 1              // Push constant 1
PUSH 2              // Push constant 2
ADD                 // Pop 2 values, add, push result
DECLARE_VAR 'a'     // Pop value, declare var a
LOAD_VAR 'exports'  // Load exports object
PUSH 'a'            // Push property name
LOAD_VAR 'a'        // Load variable a
SET_MEMBER          // obj[prop] = value
POP                 // Discard result
HALT                // End execution
```

## Implementation Status

### ✅ Implemented
- Core instruction set (opcodes.ts)
- Bytecode compiler with major node types:
  - Literals, identifiers, template literals
  - Binary/unary/logical operations
  - Assignments and updates
  - Member access and function calls
  - Control flow (if/while/for/do-while)
  - Variable declarations (var/let/const)
  - Functions (regular, arrow)
  - Arrays and objects
  - Try/catch/throw
  - Switch statements
- Stack-based VM with dual execution modes
- Integration with existing Scope system
- Backward-compatible API

### 🚧 In Progress / TODO
- [ ] Complete hoisting support (var/function hoisting, TDZ for let/const)
- [ ] Full class support (constructors, methods, inheritance, super)
- [ ] Generator functions (yield/yield*)
- [ ] For-in and for-of loops
- [ ] Destructuring patterns (comprehensive)
- [ ] Spread operator (complete implementation)
- [ ] Optional chaining (?.)
- [ ] Dynamic import()
- [ ] Proper exception handling with try/catch/finally
- [ ] Labeled statements and break/continue with labels
- [ ] With statement
- [ ] Debugger statement
- [ ] Full compliance with all existing tests

### ⚠️ Known Limitations
- Many tests currently failing due to incomplete node type coverage
- Generators not fully implemented
- Class creation is simplified
- Exception handling is incomplete
- Some edge cases not handled

## Benefits Over Tree-Walking

1. **Performance**: Reduced recursive call overhead
2. **Clarity**: Clear separation of compilation and execution phases
3. **Optimization**: Easier to add peephole optimizations, JIT compilation, etc.
4. **Debugging**: Easier to add breakpoints, step execution, etc.
5. **Simplicity**: Single unified codebase instead of dual async/sync versions

## Migration Notes

The old tree-walking interpreter is still present in:
- `src/evaluate/` - Async/generator version
- `src/evaluate_n/` - Sync version (auto-generated)

These can be removed once the bytecode interpreter is feature-complete.

## Future Enhancements

- JIT compilation for hot code paths
- Bytecode optimization passes
- Better error messages with source maps
- Bytecode serialization/deserialization
- Profiling and performance monitoring
