import * as estree from 'estree';
import Scope from '../scope';
import { varKind } from '../scope/variable';
export declare function FunctionDeclaration(node: estree.FunctionDeclaration, scope: Scope): void;
export interface VariableDeclarationOptions {
    hoist?: boolean;
    feed?: any;
}
export declare function VariableDeclaration(node: estree.VariableDeclaration, scope: Scope, options?: VariableDeclarationOptions): void;
export interface VariableDeclaratorOptions {
    kind?: varKind;
}
export declare function VariableDeclarator(node: estree.VariableDeclarator, scope: Scope, options?: VariableDeclaratorOptions & VariableDeclarationOptions): void;
export declare function ClassDeclaration(node: estree.ClassDeclaration, scope: Scope): void;
export interface ClassOptions {
    klass?: (...args: any[]) => any;
}
export declare function ClassBody(node: estree.ClassBody, scope: Scope, options?: ClassOptions): void;
export declare function MethodDefinition(node: estree.MethodDefinition, scope: Scope, options?: ClassOptions): void;
