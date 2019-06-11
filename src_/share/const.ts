export enum OP {
  LOADK, // push literal into stack (val: literal cooked value)
  LOADV, // push variable value into stack (val: context pointer)
  MOVE,  // move data from stack to context (val: context pointer)
  BIOP,  // binary operation (val: operator)
  UNOP,  // unary operation (val: operator)
  JMP,   // jump to specified position (val: jumped pc)
  IF,    // jump to specified position if true (val: jumped pc)
  IFNOT, // jump to specified position if true (val: jumped pc)
  ARR,   // create array (val: number of items)
  OBJ,   // create object (val: array of property kinds)
  MGET,  // get member of object (no val)
  MSET,  // set member of object (no val)
  FUNC,  // declare a function (val: end pc of its op codes)
  CALL,  // invoke functions or methods (val: number of parameters)
  BRK,   // break (val: label)
  CONTI, // continue (val: label)
  RET,   // return (no val)
  YIELD, // yield (val: delegate or not)
  AWAIT, // await (no val)
  COPY,  // copy the top of stack and push into stack (no val)
  DBG,   // debug (node val)
}

export enum SIGNAL {
  NONE,  // null
  BRK,   // break signal
  CONTI, // continue signal
  RET,   // return signal
  YIELD, // yield signal
  AWAIT, // await signal
}

export interface OpCode {
  op: OP
  val?: any
  [more: string]: any
}