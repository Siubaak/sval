export enum OP {
  LOADK, // push constant into stack
  LOADV, // push variable value into stack
  CONST, // declare a const variable
  LET,   // declare a let variable
  VAR,   // declare a var variable
  FUNC,  // declare a function
  MOVE,  // move data from stack to context (assignment)
  JMP,   // jump to specified position
  BIOP,  // binary operation
  UNOP,  // unary operation
  IFJMP, // jump to specified position if true
  CALL,  // invoke functions or methods
  MEMB,  // get member of object
}

export interface OpCode {
  op: OP
  val?: any
  [more: string]: any
}