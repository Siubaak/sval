import { Variable } from './variable.ts';
export default class Scope {
    private readonly parent;
    private readonly isolated;
    private readonly context;
    private withContext;
    constructor(parent?: Scope, isolated?: boolean);
    global(): Scope;
    find(name: string): Variable;
    var(name: string, value?: any): void;
    let(name: string, value: any): void;
    const(name: string, value: any): void;
    func(name: string, value: any): void;
    with(value: any): void;
}
