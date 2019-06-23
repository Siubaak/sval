export enum OP {
  LOADK, // push literal into stack (val: literal cooked value)
  LOADV, // push variable value into stack (val: context pointer)
  ALLOC, // allocate a context item and move data from stack into it, like declaration (val: context pointer)
  STORE, // move data from stack to context, like assignment (val: context pointer)
  BIOP,  // binary operation (val: operator)
  UNOP,  // unary operation (val: operator)
  JMP,   // jump to specified position (val: jumped pc)
  IF,    // jump to specified position if true (val: jumped pc)
  IFNOT, // jump to specified position if false (val: jumped pc)
  CSNE,  // jump to next case position if don't match the case (val: next case pc)
  ARR,   // create array (val: number of items)
  OBJ,   // create object (val: array of property kinds)
  MGET,  // get member of object (no val)
  MSET,  // set member of object (no val)
  CLS,   // declare a class
         //   (val: class name,
         //    constructor: has constructor or not,
         //    inherit: has super class or not)
  FUNC,  // declare a function
         //   (val: function name,
         //    end: end pc of its op codes,
         //    arrow: arrow function or not,
         //    async: async function or not,
         //    generator: generator or not)
  CALL,  // invoke functions or methods
         // (val: number of parameters,
         //  catch: { pc: catch statement pc })
  NEW,   // create an object by constructor
         // (val: number of parameters,
         //  catch: { pc: catch statement pc })
  BRK,   // break (val: label)
  CONTI, // continue (val: label)
  RET,   // return (no val)
  YIELD, // yield (val: delegate or not)
  AWAIT, // await (no val)
  COPY,  // copy the top of stack and push into stack (no val)
  DBG,   // debug (no val)
  THROW, // throw (val: { pc: catch statement pc })
}

export enum SIGNAL {
  NONE,  // null
  RET,   // return signal
  YIELD, // yield signal
  AWAIT, // await signal
}

export interface OpCode {
  op: OP
  val?: any
  [more: string]: any
}