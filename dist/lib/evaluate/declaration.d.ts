import * as estree from 'estree';
import Scope from '../scope';
export declare function FunctionDeclaration(node: estree.FunctionDeclaration, scope: Scope): void;
export declare function VariableDeclaration(node: estree.VariableDeclaration, scope: Scope): void;
export declare function VariableDeclarator(node: estree.VariableDeclarator, scope: Scope): void;
