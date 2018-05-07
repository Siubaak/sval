import * as estree from 'estree';
import Scope from '../scope';
export interface IdentifierOptions {
    getName?: boolean;
    getVar?: boolean;
    throwErr?: boolean;
}
export declare function Identifier(node: estree.Identifier, scope: Scope, options?: IdentifierOptions): any;
