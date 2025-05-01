export type VarKind = 'var' | 'let' | 'const';
export interface Variable {
    get(): any;
    set(value: any): boolean;
}
export declare class Var implements Variable {
    readonly kind: VarKind;
    private value;
    constructor(kind: VarKind, value: any);
    get(): any;
    set(value: any): any;
}
export declare class Prop implements Variable {
    private readonly object;
    private readonly property;
    constructor(object: any, property: string);
    get(): any;
    set(value: any): boolean;
    del(): boolean;
}
