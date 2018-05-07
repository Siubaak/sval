import { Var } from './variable';
export declare type scopeType = 'block' | 'switch' | 'loop' | 'function';
export default class Scope {
    readonly type: scopeType;
    private readonly parent;
    private readonly context;
    invasived: boolean;
    constructor(type: scopeType, parent?: Scope, label?: string);
    invasive(): void;
    global(): Scope;
    find(name: string): Var | null;
    var(name: string, value: any): boolean;
    let(name: string, value: any): boolean;
    const(name: string, value: any): boolean;
}
