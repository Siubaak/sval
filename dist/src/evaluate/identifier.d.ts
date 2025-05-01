import { default as Scope } from '../scope/index.ts';
import * as acorn from 'acorn';
export interface IdentifierOptions {
    getVar?: boolean;
    throwErr?: boolean;
}
export declare function Identifier(node: acorn.Identifier, scope: Scope, options?: IdentifierOptions): Generator<never, any, unknown>;
