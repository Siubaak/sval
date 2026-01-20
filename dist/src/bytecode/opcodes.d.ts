export declare enum OpCode {
    PUSH = 0,
    POP = 1,
    DUP = 2,
    LOAD_VAR = 3,
    STORE_VAR = 4,
    DECLARE_VAR = 5,
    DECLARE_CONST = 6,
    DECLARE_LET = 7,
    LOAD_UNDEFINED = 8,
    LOAD_NULL = 9,
    LOAD_TRUE = 10,
    LOAD_FALSE = 11,
    LOAD_THIS = 12,
    ADD = 13,
    SUB = 14,
    MUL = 15,
    DIV = 16,
    MOD = 17,
    EXP = 18,
    EQ = 19,
    NEQ = 20,
    SEQ = 21,
    SNEQ = 22,
    LT = 23,
    LTE = 24,
    GT = 25,
    GTE = 26,
    LOGICAL_AND = 27,
    LOGICAL_OR = 28,
    BITWISE_AND = 29,
    BITWISE_OR = 30,
    BITWISE_XOR = 31,
    LEFT_SHIFT = 32,
    RIGHT_SHIFT = 33,
    UNSIGNED_RIGHT_SHIFT = 34,
    IN = 35,
    INSTANCEOF = 36,
    NOT = 37,
    BITWISE_NOT = 38,
    TYPEOF = 39,
    VOID = 40,
    DELETE = 41,
    PLUS = 42,
    MINUS = 43,
    INC = 44,
    DEC = 45,
    GET_MEMBER = 46,
    SET_MEMBER = 47,
    CALL = 48,
    NEW = 49,
    RETURN = 50,
    YIELD = 51,
    AWAIT = 52,
    NEW_OBJECT = 53,
    NEW_ARRAY = 54,
    SPREAD = 55,
    JUMP = 56,
    JUMP_IF_FALSE = 57,
    JUMP_IF_TRUE = 58,
    PUSH_SCOPE = 59,
    POP_SCOPE = 60,
    CREATE_FUNCTION = 61,
    CREATE_ARROW_FUNCTION = 62,
    CREATE_CLASS = 63,
    CREATE_SUPER = 64,
    THROW = 65,
    TRY_START = 66,
    TRY_END = 67,
    CATCH_START = 68,
    CATCH_END = 69,
    FINALLY_START = 70,
    FINALLY_END = 71,
    BREAK = 72,
    CONTINUE = 73,
    NOP = 74,
    HALT = 75
}
export interface Instruction {
    opcode: OpCode;
    operand?: any;
    line?: number;
    column?: number;
}
export interface BytecodeChunk {
    instructions: Instruction[];
    constants: any[];
    sourceMap?: Map<number, {
        line: number;
        column: number;
    }>;
}
export declare function createInstruction(opcode: OpCode, operand?: any, line?: number, column?: number): Instruction;
export declare function createChunk(): BytecodeChunk;
export declare function addInstruction(chunk: BytecodeChunk, instruction: Instruction): number;
export declare function addConstant(chunk: BytecodeChunk, value: any): number;
