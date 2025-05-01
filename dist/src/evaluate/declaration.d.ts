import { VarKind } from '../scope/variable.ts';
import { default as Scope } from '../scope/index.ts';
import * as acorn from 'acorn';
export declare function FunctionDeclaration(node: acorn.FunctionDeclaration, scope: Scope): IterableIterator<any>;
export interface VariableDeclarationOptions {
    hoist?: boolean;
    onlyBlock?: boolean;
    feed?: any;
}
export declare function VariableDeclaration(node: acorn.VariableDeclaration, scope: Scope, options?: VariableDeclarationOptions): Generator<any, void, any>;
export interface VariableDeclaratorOptions {
    kind?: VarKind;
}
export declare function VariableDeclarator(node: acorn.VariableDeclarator, scope: Scope, options?: VariableDeclaratorOptions & VariableDeclarationOptions): Generator<any, void, any>;
export declare function ClassDeclaration(node: acorn.ClassDeclaration, scope: Scope): IterableIterator<any>;
export interface ClassOptions {
    klass?: any;
    superClass?: (...args: any[]) => void;
}
export declare function ClassBody(node: acorn.ClassBody, scope: Scope, options?: ClassOptions): Generator<any, void, any>;
export declare function MethodDefinition(node: acorn.MethodDefinition, scope: Scope, options?: ClassOptions): Generator<any, void, any>;
export declare function PropertyDefinition(node: acorn.PropertyDefinition, scope: Scope, options?: ClassOptions): Generator<any, void, any>;
export declare function StaticBlock(node: acorn.StaticBlock, scope: Scope, options?: ClassOptions): Generator<any, any, any>;
export declare function ImportDeclaration(node: acorn.ImportDeclaration, scope: Scope): Generator<never, void, unknown>;
export declare function ExportDefaultDeclaration(node: acorn.ExportDefaultDeclaration, scope: Scope): Generator<any, void, any>;
export declare function ExportNamedDeclaration(node: acorn.ExportNamedDeclaration, scope: Scope): Generator<any, void, any>;
export declare function ExportAllDeclaration(node: acorn.ExportAllDeclaration, scope: Scope): Generator<never, void, unknown>;
