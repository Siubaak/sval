import { Variable } from './variable';
export default class Scope {
    private readonly parent;
    readonly isolated: boolean;
    private readonly context;
    constructor(parent?: Scope, isolated?: boolean);
    global(): Scope;
    clone(): Scope;
    find(name: string): Variable;
    var(name: string, value: any): boolean;
    let(name: string, value: any): boolean;
    const(name: string, value: any): boolean;
}
