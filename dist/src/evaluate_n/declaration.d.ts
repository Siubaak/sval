import { VarKind } from '../scope/variable.ts';
import { default as Scope } from '../scope/index.ts';
import * as acorn from 'acorn';
export declare function FunctionDeclaration(node: acorn.FunctionDeclaration, scope: Scope): any;
export interface VariableDeclarationOptions {
    hoist?: boolean;
    onlyBlock?: boolean;
    feed?: any;
}
export declare function VariableDeclaration(node: acorn.VariableDeclaration, scope: Scope, options?: VariableDeclarationOptions): void;
export interface VariableDeclaratorOptions {
    kind?: VarKind;
}
export declare function VariableDeclarator(node: acorn.VariableDeclarator, scope: Scope, options?: VariableDeclaratorOptions & VariableDeclarationOptions): void;
export declare function ClassDeclaration(node: acorn.ClassDeclaration, scope: Scope): any;
export interface ClassOptions {
    klass?: any;
    superClass?: (...args: any[]) => void;
}
export declare function ClassBody(node: acorn.ClassBody, scope: Scope, options?: ClassOptions): void;
export declare function MethodDefinition(node: acorn.MethodDefinition, scope: Scope, options?: ClassOptions): void;
export declare function PropertyDefinition(node: acorn.PropertyDefinition, scope: Scope, options?: ClassOptions): void;
export declare function StaticBlock(node: acorn.StaticBlock, scope: Scope, options?: ClassOptions): any;
export declare function ImportDeclaration(node: acorn.ImportDeclaration, scope: Scope): void;
export declare function ExportDefaultDeclaration(node: acorn.ExportDefaultDeclaration, scope: Scope): void;
export declare function ExportNamedDeclaration(node: acorn.ExportNamedDeclaration, scope: Scope): void;
export declare function ExportAllDeclaration(node: acorn.ExportAllDeclaration, scope: Scope): void;
