import * as estree from 'estree';
import Scope from '../scope';
import { VarKind } from '../scope/variable';
export declare function FunctionDeclaration(node: estree.FunctionDeclaration, scope: Scope): IterableIterator<any>;
export interface VariableDeclarationOptions {
    hoist?: boolean;
    feed?: any;
}
export declare function VariableDeclaration(node: estree.VariableDeclaration, scope: Scope, options?: VariableDeclarationOptions): IterableIterator<any>;
export interface VariableDeclaratorOptions {
    kind?: VarKind;
}
export declare function VariableDeclarator(node: estree.VariableDeclarator, scope: Scope, options?: VariableDeclaratorOptions & VariableDeclarationOptions): IterableIterator<any>;
export declare function ClassDeclaration(node: estree.ClassDeclaration, scope: Scope): IterableIterator<any>;
export interface ClassOptions {
    klass?: (...args: any[]) => any;
}
export declare function ClassBody(node: estree.ClassBody, scope: Scope, options?: ClassOptions): IterableIterator<any>;
export declare function MethodDefinition(node: estree.MethodDefinition, scope: Scope, options?: ClassOptions): IterableIterator<any>;
