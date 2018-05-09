export declare type varKind = 'var' | 'let' | 'const';
export interface Variable {
    get(): any;
    set(value: any): boolean;
}
export declare class Var implements Variable {
    readonly kind: varKind;
    private value;
    constructor(kind: varKind, value: any);
    get(): any;
    set(value: any): boolean;
}
export declare class Prop implements Variable {
    private readonly object;
    private readonly property;
    constructor(object: any, property: string);
    get(): any;
    set(value: any): boolean;
    del(): boolean;
}
