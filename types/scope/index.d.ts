import { Variable } from './variable';
export default class Scope {
    private readonly parent;
    readonly isolated: boolean;
    private readonly context;
    constructor(parent?: Scope, isolated?: boolean);
    global(): Scope;
    clone(): Scope;
    find(name: symbol | string): Variable;
    var(name: symbol | string, value: any): boolean;
    let(name: symbol | string, value: any): boolean;
    const(name: symbol | string, value: any): boolean;
}
