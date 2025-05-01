import { default as Scope } from '../scope/index.ts';
import * as acorn from 'acorn';
export declare function Literal(node: acorn.Literal, scope: Scope): string | number | bigint | boolean | RegExp;
