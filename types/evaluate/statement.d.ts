import * as estree from 'estree';
import Scope from '../scope';
export declare function ExpressionStatement(node: estree.ExpressionStatement, scope: Scope): IterableIterator<any>;
export interface BlockOptions {
    invasived?: boolean;
    hoisted?: boolean;
}
export declare function BlockStatement(block: estree.BlockStatement, scope: Scope, options?: BlockOptions): IterableIterator<any>;
export declare function EmptyStatement(): IterableIterator<any>;
export declare function DebuggerStatement(): IterableIterator<any>;
export declare function ReturnStatement(node: estree.ReturnStatement, scope: Scope): IterableIterator<any>;
export declare function BreakStatement(): IterableIterator<{}>;
export declare function ContinueStatement(): IterableIterator<{}>;
export declare function IfStatement(node: estree.IfStatement, scope: Scope): IterableIterator<any>;
export declare function SwitchStatement(node: estree.SwitchStatement, scope: Scope): IterableIterator<any>;
export declare function SwitchCase(node: estree.SwitchCase, scope: Scope): IterableIterator<any>;
export declare function ThrowStatement(node: estree.ThrowStatement, scope: Scope): IterableIterator<any>;
export declare function TryStatement(node: estree.TryStatement, scope: Scope): IterableIterator<any>;
export declare function CatchClause(node: estree.CatchClause, scope: Scope): IterableIterator<any>;
export declare function WhileStatement(node: estree.WhileStatement, scope: Scope): IterableIterator<any>;
export declare function DoWhileStatement(node: estree.DoWhileStatement, scope: Scope): IterableIterator<any>;
export declare function ForStatement(node: estree.ForStatement, scope: Scope): IterableIterator<any>;
export declare function ForInStatement(node: estree.ForInStatement, scope: Scope): IterableIterator<any>;
export declare function ForOfStatement(node: estree.ForOfStatement, scope: Scope): IterableIterator<any>;
