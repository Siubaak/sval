import { default as Scope } from '../scope';
import { BytecodeChunk } from './opcodes';
export declare class VM {
    private rootScope;
    private stack;
    private callStack;
    private currentFrame;
    private scopeStack;
    private currentScope;
    private halted;
    private isAsync;
    constructor(rootScope: Scope, isAsync?: boolean);
    execute(chunk: BytecodeChunk): any;
    executeAsync(chunk: BytecodeChunk): Promise<any>;
    private executeInstruction;
    private executeInstructionAsync;
    private createFunction;
    private createArrowFunction;
    private createClass;
    private push;
    private pop;
    private peek;
}
