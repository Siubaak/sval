import { default as Scope } from '../scope/index.ts';
import * as acorn from 'acorn';
export declare function ExpressionStatement(node: acorn.ExpressionStatement, scope: Scope): void;
export interface LabelOptions {
    label?: string;
}
export interface BlockOptions {
    invasived?: boolean;
    hoisted?: boolean;
}
export declare function BlockStatement(block: acorn.BlockStatement | acorn.StaticBlock, scope: Scope, options?: BlockOptions & LabelOptions): any;
export declare function EmptyStatement(): any;
export declare function DebuggerStatement(): any;
export declare function ReturnStatement(node: acorn.ReturnStatement, scope: Scope): {
    RES: any;
};
export declare function BreakStatement(node: acorn.BreakStatement): {
    LABEL: string;
};
export declare function ContinueStatement(node: acorn.ContinueStatement): {
    LABEL: string;
};
export declare function LabeledStatement(node: acorn.LabeledStatement, scope: Scope): any;
export declare function WithStatement(node: acorn.WithStatement, scope: Scope, options?: LabelOptions): any;
export declare function IfStatement(node: acorn.IfStatement, scope: Scope, options?: LabelOptions): any;
export declare function SwitchStatement(node: acorn.SwitchStatement, scope: Scope, options?: LabelOptions): any;
export declare function SwitchCase(node: acorn.SwitchCase, scope: Scope): any;
export declare function ThrowStatement(node: acorn.ThrowStatement, scope: Scope): void;
export declare function TryStatement(node: acorn.TryStatement, scope: Scope, options?: LabelOptions): any;
export declare function CatchClause(node: acorn.CatchClause, scope: Scope): any;
export declare function WhileStatement(node: acorn.WhileStatement, scope: Scope, options?: LabelOptions): any;
export declare function DoWhileStatement(node: acorn.DoWhileStatement, scope: Scope, options?: LabelOptions): any;
export declare function ForStatement(node: acorn.ForStatement, scope: Scope, options?: LabelOptions): any;
export declare function ForInStatement(node: acorn.ForInStatement, scope: Scope, options?: LabelOptions): any;
export declare function ForOfStatement(node: acorn.ForOfStatement, scope: Scope, options?: LabelOptions): any;
