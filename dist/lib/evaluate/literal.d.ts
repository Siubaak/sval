import * as estree from 'estree';
import Scope from '../scope';
export declare function Literal(node: estree.Literal, scope: Scope): string | number | boolean | RegExp;
