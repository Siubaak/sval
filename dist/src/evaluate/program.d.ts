import { default as Scope } from '../scope/index.ts';
import * as acorn from 'acorn';
export declare function Program(program: acorn.Program, scope: Scope): Generator<any, void, any>;
