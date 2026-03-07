// Opcode definitions for the stack-based Sval interpreter
export const enum Op {
  // Stack manipulation
  PUSH,            // arg = value; push literal value
  POP,             // discard top of stack
  DUP,             // duplicate top of stack
  SWAP,            // swap top two items

  // Variable access
  LOAD,            // arg = name; load variable value (checks TDZ)
  LOAD_SAFE,       // arg = name; load variable, returns undefined if not found or TDZ
  STORE,           // arg = name; pop value, store in variable, push value back

  // Variable declarations (pop value from stack)
  DECL_VAR,        // arg = name; declare var (NOINIT semantics)
  DECL_VAR_INIT,   // arg = name; declare var and pop initializer from stack
  DECL_LET_TDZ,    // arg = name; declare let with DEADZONE (temporal dead zone)
  DECL_LET,        // arg = name; pop value and declare let (replaces DEADZONE if present)
  DECL_CONST,      // arg = name; pop value and declare const (replaces DEADZONE if present)
  DECL_FUNC,       // arg = name; pop function and declare (hoisted function declaration)

  // Scope management
  SCOPE_PUSH,      // push new block scope
  SCOPE_POP,       // pop block scope

  // Arithmetic binary operations (pop 2, push 1)
  ADD,
  SUB,
  MUL,
  DIV,
  MOD,
  POW,

  // Comparison (pop 2, push 1)
  EQ,
  NEQ,
  SEQ,
  SNEQ,
  LT,
  LTE,
  GT,
  GTE,

  // Bitwise (pop 2, push 1)
  BIT_AND,
  BIT_OR,
  BIT_XOR,
  LSHIFT,
  RSHIFT,
  URSHIFT,

  // Other binary
  IN_OP,           // left in right
  INSTANCEOF_OP,   // left instanceof right

  // Unary (pop 1, push 1)
  NEG,             // -x
  POS,             // +x
  NOT,             // !x
  BIT_NOT,         // ~x
  VOID_OP,         // void x

  // Special unary
  TYPEOF_VAR,      // arg = name; typeof safe lookup (no ReferenceError)
  TYPEOF_EXPR,     // typeof already-evaluated expression

  // Control flow
  JUMP,            // arg = target PC; unconditional jump
  JUMP_TRUE,       // arg = target PC; pop and jump if truthy
  JUMP_FALSE,      // arg = target PC; pop and jump if falsy
  JUMP_PEEK_TRUE,  // arg = target PC; peek and jump if truthy (keep on stack)
  JUMP_PEEK_FALSE, // arg = target PC; peek and jump if falsy (keep on stack)
  JUMP_PEEK_NULLISH, // arg = target PC; peek and jump if null/undefined (keep on stack)

  // Property access
  GET_PROP,        // arg = key; pop obj, push obj[key]
  GET_PROP_DYN,    // pop key, pop obj, push obj[key]
  SET_PROP,        // arg = key; pop val, pop obj, set obj[key]=val, push val
  SET_PROP_DYN,    // pop val, pop key, pop obj, set obj[key]=val, push val
  DEL_PROP,        // arg = key; pop obj, delete obj[key], push result
  DEL_PROP_DYN,    // pop key, pop obj, delete, push result

  // Super property access
  GET_SUPER_PROP,  // arg = key; get super.key (this-bound getter)
  SET_SUPER_PROP,  // arg = key; set super.key = val (this-bound setter)
  GET_SUPER_PROTO, // push super.prototype (for super method calls)

  // Private fields
  GET_PRIVATE,     // arg = key; pop obj, push obj[PRIVATE][key]
  SET_PRIVATE,     // arg = key; pop val, pop obj, set obj[PRIVATE][key]=val, push val
  CHECK_PRIVATE_IN,// arg = key; pop obj, push (#key in obj)

  // Array and object creation
  MAKE_ARRAY,      // arg = count; pop count items, create array, push
  MAKE_OBJECT,     // arg = count; pop count {key,val} pairs from stack, create object, push
  SPREAD_ARRAY,    // pop iterable, spread into array below it on stack
  SPREAD_OBJECT,   // pop object, spread its properties into object below

  // Function creation
  MAKE_FUNC,       // arg = funcDescIdx; create function from descriptor

  // Function calls
  // Stack layout for CALL: [..., func, arg0, arg1, ..., argN]
  CALL,            // arg = argc; pop argc args + func; call func with frame.thisVal as this; push result
  // Stack layout for CALL_METHOD: [..., obj, arg0, ..., argN]
  CALL_METHOD,     // arg = {key, argc}; pop argc args + obj; call obj[key] with obj as this; push result
  CALL_METHOD_DYN, // arg = argc; pop argc args + key + obj; call obj[key]; push result
  CALL_SUPER,      // arg = argc; super() call; pop argc args; push result
  NEW_CALL,        // arg = argc; pop argc args + ctor; new ctor(...args); push result
  RETURN,          // pop return value, return from function

  // Generator / Async
  YIELD_VAL,       // pop value, yield it, push sent value
  YIELD_DELEGATE,  // pop iterable, yield* it, push final return value
  AWAIT_VAL,       // pop promise, await it, push resolved value

  // Exception handling
  THROW_VAL,       // pop value and throw it
  TRY_PUSH,        // arg = {catchPC, finallyPC}; push try handler
  TRY_POP,         // arg = kind ('try'|'catch'|'finally'); exit try block normally

  // Iterator operations
  GET_ITER,        // pop iterable, push iterator
  ITER_NEXT,       // peek iterator on stack, call next(), push {value, done}
  GET_KEYS,        // pop obj, push array of enumerable keys (for for-in)

  // Template literal
  TEMPLATE_LIT,    // arg = count; pop count parts (alternating quasis/exprs), concat, push

  // Special
  DEBUGGER_STMT,
  LOAD_THIS,       // push scope.find('this').get()
  LOAD_NEW_TARGET, // push new.target from scope
  IMPORT_DYN,      // pop source string, push Promise from dynamic import

  // Class building
  BUILD_CLASS,     // arg = classDescIdx; pop superClass (or null), build class, push

  // Sequence expression
  SEQUENCE,        // arg = count; discard top count-1 values, keep top (last evaluated)

  // With statement
  WITH_PUSH,       // pop obj, create new with-scope
  WITH_POP,        // restore scope after with

  // Delete identifier
  DEL_IDENTIFIER,  // arg = name; delete identifier (throws SyntaxError always for identifiers)

  // Rethrow after finally
  RETHROW,         // pop err and isException flag; if isException, rethrow err; else push err (as return value)

  // Function argument access (only valid inside compiled function bodies)
  LOAD_ARG,        // arg = index; push arguments[index] or undefined
  LOAD_REST,       // arg = startIndex; push Array.from(arguments).slice(startIndex)
}

// An instruction in the bytecode
export interface Instr {
  op: Op
  arg?: any
}

// Descriptor for a compiled function
export interface FuncDesc {
  code: Instr[]
  name: string
  paramCount: number
  isGenerator: boolean
  isAsync: boolean
  isArrow: boolean
  hasRest: boolean
  params: any[]       // acorn Pattern nodes for parameter binding at runtime
  source?: string     // source text for toString()
  start?: number
  end?: number
}

// Descriptor for a class method/property
export interface MethodDesc {
  keyName: string | null   // static key name
  keyCode: Instr[] | null  // compiled code for computed key
  kind: 'method' | 'get' | 'set' | 'constructor'
  funcDescIdx: number      // index into funcs array
  isStatic: boolean
  isPrivate: boolean
}

// Descriptor for a property definition (field)
export interface PropDefDesc {
  keyName: string | null
  keyCode: Instr[] | null
  valueCode: Instr[] | null  // null means undefined
  funcDescIdx: number | null  // if it's a function/arrow
  isStatic: boolean
  isPrivate: boolean
}

// Descriptor for a static block
export interface StaticBlockDesc {
  code: Instr[]
}

// Descriptor for a compiled class
export interface ClassDesc {
  superCode: Instr[] | null  // compiled code for super class expression (null if no super)
  ctorDescIdx: number | null // constructor func desc index (null = default)
  methods: MethodDesc[]
  propDefs: PropDefDesc[]    // instance and static property definitions
  staticBlocks: StaticBlockDesc[]
  name: string
}

// A complete compilation result
export interface Module {
  code: Instr[]        // top-level code
  funcs: FuncDesc[]    // all function descriptors
  classes: ClassDesc[] // all class descriptors
}
