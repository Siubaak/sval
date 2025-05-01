import { default as Scope } from '../scope/index.ts';
import * as acorn from 'acorn';
export declare function ExpressionStatement(node: acorn.ExpressionStatement, scope: Scope): Generator<any, void, any>;
export interface LabelOptions {
    label?: string;
}
export interface BlockOptions {
    invasived?: boolean;
    hoisted?: boolean;
}
export declare function BlockStatement(block: acorn.BlockStatement | acorn.StaticBlock, scope: Scope, options?: BlockOptions & LabelOptions): Generator<any, any, any>;
export declare function EmptyStatement(): IterableIterator<any>;
export declare function DebuggerStatement(): IterableIterator<any>;
export declare function ReturnStatement(node: acorn.ReturnStatement, scope: Scope): Generator<any, {
    RES: any;
}, any>;
export declare function BreakStatement(node: acorn.BreakStatement): Generator<never, {
    LABEL: string;
}, unknown>;
export declare function ContinueStatement(node: acorn.ContinueStatement): Generator<never, {
    LABEL: string;
}, unknown>;
export declare function LabeledStatement(node: acorn.LabeledStatement, scope: Scope): Generator<any, any, any>;
export declare function WithStatement(node: acorn.WithStatement, scope: Scope, options?: LabelOptions): Generator<any, any, any>;
export declare function IfStatement(node: acorn.IfStatement, scope: Scope, options?: LabelOptions): Generator<any, any, any>;
export declare function SwitchStatement(node: acorn.SwitchStatement, scope: Scope, options?: LabelOptions): Generator<any, any, any>;
export declare function SwitchCase(node: acorn.SwitchCase, scope: Scope): Generator<any, any, any>;
export declare function ThrowStatement(node: acorn.ThrowStatement, scope: Scope): Generator<any, void, any>;
export declare function TryStatement(node: acorn.TryStatement, scope: Scope, options?: LabelOptions): Generator<any, any, any>;
export declare function CatchClause(node: acorn.CatchClause, scope: Scope): Generator<any, any, any>;
export declare function WhileStatement(node: acorn.WhileStatement, scope: Scope, options?: LabelOptions): Generator<any, any, any>;
export declare function DoWhileStatement(node: acorn.DoWhileStatement, scope: Scope, options?: LabelOptions): Generator<any, any, any>;
export declare function ForStatement(node: acorn.ForStatement, scope: Scope, options?: LabelOptions): Generator<any, any, any>;
export declare function ForInStatement(node: acorn.ForInStatement, scope: Scope, options?: LabelOptions): Generator<any, any, any>;
export declare function ForOfStatement(node: acorn.ForOfStatement, scope: Scope, options?: LabelOptions): any;
