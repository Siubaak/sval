export declare const enum Op {
    PUSH = 0,
    POP = 1,
    DUP = 2,
    SWAP = 3,
    LOAD = 4,
    LOAD_SAFE = 5,
    STORE = 6,
    DECL_VAR = 7,
    DECL_VAR_INIT = 8,
    DECL_LET_TDZ = 9,
    DECL_LET = 10,
    DECL_CONST = 11,
    DECL_FUNC = 12,
    SCOPE_PUSH = 13,
    SCOPE_POP = 14,
    ADD = 15,
    SUB = 16,
    MUL = 17,
    DIV = 18,
    MOD = 19,
    POW = 20,
    EQ = 21,
    NEQ = 22,
    SEQ = 23,
    SNEQ = 24,
    LT = 25,
    LTE = 26,
    GT = 27,
    GTE = 28,
    BIT_AND = 29,
    BIT_OR = 30,
    BIT_XOR = 31,
    LSHIFT = 32,
    RSHIFT = 33,
    URSHIFT = 34,
    IN_OP = 35,
    INSTANCEOF_OP = 36,
    NEG = 37,
    POS = 38,
    NOT = 39,
    BIT_NOT = 40,
    VOID_OP = 41,
    TYPEOF_VAR = 42,
    TYPEOF_EXPR = 43,
    JUMP = 44,
    JUMP_TRUE = 45,
    JUMP_FALSE = 46,
    JUMP_PEEK_TRUE = 47,
    JUMP_PEEK_FALSE = 48,
    JUMP_PEEK_NULLISH = 49,
    GET_PROP = 50,
    GET_PROP_DYN = 51,
    SET_PROP = 52,
    SET_PROP_DYN = 53,
    DEL_PROP = 54,
    DEL_PROP_DYN = 55,
    GET_SUPER_PROP = 56,
    SET_SUPER_PROP = 57,
    GET_SUPER_PROTO = 58,
    GET_PRIVATE = 59,
    SET_PRIVATE = 60,
    CHECK_PRIVATE_IN = 61,
    MAKE_ARRAY = 62,
    MAKE_OBJECT = 63,
    SPREAD_ARRAY = 64,
    SPREAD_OBJECT = 65,
    MAKE_FUNC = 66,
    CALL = 67,
    CALL_METHOD = 68,
    CALL_METHOD_DYN = 69,
    CALL_SUPER = 70,
    NEW_CALL = 71,
    RETURN = 72,
    YIELD_VAL = 73,
    YIELD_DELEGATE = 74,
    AWAIT_VAL = 75,
    THROW_VAL = 76,
    TRY_PUSH = 77,
    TRY_POP = 78,
    GET_ITER = 79,
    ITER_NEXT = 80,
    GET_KEYS = 81,
    TEMPLATE_LIT = 82,
    DEBUGGER_STMT = 83,
    LOAD_THIS = 84,
    LOAD_NEW_TARGET = 85,
    IMPORT_DYN = 86,
    BUILD_CLASS = 87,
    SEQUENCE = 88,
    WITH_PUSH = 89,
    WITH_POP = 90,
    DEL_IDENTIFIER = 91,
    RETHROW = 92,
    LOAD_ARG = 93,
    LOAD_REST = 94
}
export interface Instr {
    op: Op;
    arg?: any;
}
export interface FuncDesc {
    code: Instr[];
    name: string;
    paramCount: number;
    isGenerator: boolean;
    isAsync: boolean;
    isArrow: boolean;
    hasRest: boolean;
    params: any[];
    source?: string;
    start?: number;
    end?: number;
}
export interface MethodDesc {
    keyName: string | null;
    keyCode: Instr[] | null;
    kind: 'method' | 'get' | 'set' | 'constructor';
    funcDescIdx: number;
    isStatic: boolean;
    isPrivate: boolean;
}
export interface PropDefDesc {
    keyName: string | null;
    keyCode: Instr[] | null;
    valueCode: Instr[] | null;
    funcDescIdx: number | null;
    isStatic: boolean;
    isPrivate: boolean;
}
export interface StaticBlockDesc {
    code: Instr[];
}
export interface ClassDesc {
    superCode: Instr[] | null;
    ctorDescIdx: number | null;
    methods: MethodDesc[];
    propDefs: PropDefDesc[];
    staticBlocks: StaticBlockDesc[];
    name: string;
}
export interface Module {
    code: Instr[];
    funcs: FuncDesc[];
    classes: ClassDesc[];
}
