import * as estree from 'estree';
import Scope from '../scope';
import { varKind } from '../scope/variable';
export interface PatternOptions {
    kind?: varKind;
    hoist?: boolean;
    feed?: any;
}
export declare function ObjectPattern(node: estree.ObjectPattern, scope: Scope, options?: PatternOptions): void;
export declare function AssignmentProperty(node: estree.AssignmentProperty, scope: Scope, options?: PatternOptions): void;
export declare function ArrayPattern(node: estree.ArrayPattern, scope: Scope, options?: PatternOptions): any[];
export declare function RestElement(node: estree.RestElement, scope: Scope, options?: PatternOptions): void;
export declare function AssignmentPattern(node: estree.AssignmentPattern, scope: Scope): void;
