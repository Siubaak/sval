import { Instr, Module, FuncDesc, ClassDesc } from './opcode.ts';
import { default as Scope } from '../scope/index.ts';
export declare function vmExec(code: Instr[], scopeStack: Scope[], module: Module, thisVal: any, newTarget: any, args?: any[]): Generator<any, any, any>;
export declare function createVMFunc(desc: FuncDesc, capturedScope: Scope, module: Module): any;
export declare function buildClass(desc: ClassDesc, capturedScope: Scope, module: Module, superClass?: any): any;
export declare function runModule(module: Module, scope: Scope): any;
export declare function runModuleAsync(module: Module, scope: Scope): Promise<any>;
