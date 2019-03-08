import * as estree from 'estree';
import Scope from '../scope';
import { PatternOptions } from '../evaluate/pattern';
export declare function hoist(block: estree.Program | estree.BlockStatement, scope: Scope): IterableIterator<any>;
export declare function hoistFunc(block: estree.BlockStatement, scope: Scope): IterableIterator<any>;
export declare function pattern(node: estree.Pattern, scope: Scope, options?: PatternOptions): IterableIterator<any>;
export interface CtorOptions {
    superClass?: (...args: any[]) => any;
}
export declare function createFunc(node: estree.FunctionDeclaration | estree.FunctionExpression | estree.ArrowFunctionExpression, scope: Scope, options?: CtorOptions): IterableIterator<any>;
export declare function createClass(node: estree.ClassDeclaration | estree.ClassExpression, scope: Scope): IterableIterator<any>;
