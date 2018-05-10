import * as estree from 'estree';
import Scope from '../scope';
export declare function hoisting(node: estree.Program | estree.BlockStatement, scope: Scope): void;
export declare function hoistingFunc(node: estree.BlockStatement, scope: Scope): void;
