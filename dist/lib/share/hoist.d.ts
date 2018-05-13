import * as estree from 'estree';
import Scope from '../scope';
export declare function hoist(node: estree.Program | estree.BlockStatement, scope: Scope): void;
export declare function hoistFunc(node: estree.BlockStatement, scope: Scope): void;
