import * as estree from 'estree';
import Scope from '../scope';
import { VarKind } from '../scope/variable';
export interface PatternOptions {
    kind?: VarKind;
    hoist?: boolean;
    feed?: any;
}
export declare function ObjectPattern(node: estree.ObjectPattern, scope: Scope, options?: PatternOptions): IterableIterator<any>;
export declare function AssignmentProperty(node: estree.AssignmentProperty, scope: Scope, options?: PatternOptions): IterableIterator<any>;
export declare function ArrayPattern(node: estree.ArrayPattern, scope: Scope, options?: PatternOptions): IterableIterator<any>;
export declare function RestElement(node: estree.RestElement, scope: Scope, options?: PatternOptions): IterableIterator<any>;
export declare function AssignmentPattern(node: estree.AssignmentPattern, scope: Scope): IterableIterator<any>;
