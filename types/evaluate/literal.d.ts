import * as estree from 'estree';
import Scope from '../scope';
export declare function Literal(node: estree.Literal, scope: Scope): IterableIterator<string | number | boolean | RegExp>;
