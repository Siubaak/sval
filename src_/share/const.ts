export enum OP {
  LOADK, // push literal into stack (val: literal cooked value)
  LOADV, // push variable value into stack (val: context pointer)
  MOVE,  // move data from stack to context (val: context pointer)
  BIOP,  // binary operation (val: operator)
  UNOP,  // unary operation (val: operator)
  JMP,   // jump to specified position (val: jumped pc)
  IFJMP, // jump to specified position if true (val: jumped pc)
  MEMB,  // get member of object (no val)
  FUNC,  // declare a function (val: end pc of its op codes)
  CALL,  // invoke functions or methods (val: number of parameters)
  RET,   // return (no val)
  YIELD, // yield (no val)
  COPY,  // copy the top of stack and push into stack (no val)
}

export enum SIGNAL {
  NONE,  // null
  RET,   // return signal
  YIELD, // yield signal
}

export interface OpCode {
  op: OP
  val?: any
}