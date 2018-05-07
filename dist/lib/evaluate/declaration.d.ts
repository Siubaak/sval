import * as estree from 'estree';
import Scope from '../scope';
import { varKind } from '../scope/variable';
export declare function FunctionDeclaration(node: estree.FunctionDeclaration, scope: Scope): void;
export declare function VariableDeclaration(node: estree.VariableDeclaration, scope: Scope): void;
export interface VariableDeclaratorOptions {
    kind?: varKind;
}
export declare function VariableDeclarator(node: estree.VariableDeclarator, scope: Scope, options?: VariableDeclaratorOptions): void;
