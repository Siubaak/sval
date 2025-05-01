import { VarKind } from '../scope/variable.ts';
import { default as Scope } from '../scope/index.ts';
import * as acorn from 'acorn';
export interface PatternOptions {
    kind?: VarKind;
    hoist?: boolean;
    onlyBlock?: boolean;
    feed?: any;
}
export declare function ObjectPattern(node: acorn.ObjectPattern, scope: Scope, options?: PatternOptions): void;
export declare function ArrayPattern(node: acorn.ArrayPattern, scope: Scope, options?: PatternOptions): any[];
export declare function RestElement(node: acorn.RestElement, scope: Scope, options?: PatternOptions): void;
export declare function AssignmentPattern(node: acorn.AssignmentPattern, scope: Scope, options?: PatternOptions): void;
