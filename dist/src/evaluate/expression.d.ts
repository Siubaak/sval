import { default as Scope } from '../scope/index.ts';
import * as acorn from 'acorn';
export declare function ThisExpression(node: acorn.ThisExpression, scope: Scope): Generator<never, any, unknown>;
export declare function ArrayExpression(node: acorn.ArrayExpression, scope: Scope): Generator<any, any[], any>;
export declare function ObjectExpression(node: acorn.ObjectExpression, scope: Scope): Generator<any, {
    [key: string]: any;
}, any>;
export declare function FunctionExpression(node: acorn.FunctionExpression, scope: Scope): Generator<never, any, unknown>;
export declare function UnaryExpression(node: acorn.UnaryExpression, scope: Scope): Generator<any, number | boolean | "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function", any>;
export declare function UpdateExpression(node: acorn.UpdateExpression, scope: Scope): Generator<any, any, any>;
export declare function BinaryExpression(node: acorn.BinaryExpression, scope: Scope): Generator<any, any, any>;
export declare function AssignmentExpression(node: acorn.AssignmentExpression, scope: Scope): Generator<any, any, any>;
export declare function LogicalExpression(node: acorn.LogicalExpression, scope: Scope): Generator<any, any, any>;
export interface MemberExpressionOptions {
    getObj?: boolean;
    getVar?: boolean;
}
export declare function MemberExpression(node: acorn.MemberExpression, scope: Scope, options?: MemberExpressionOptions): Generator<any, any, any>;
export declare function ConditionalExpression(node: acorn.ConditionalExpression, scope: Scope): Generator<any, any, any>;
export declare function CallExpression(node: acorn.CallExpression, scope: Scope): Generator<any, any, any>;
export declare function NewExpression(node: acorn.NewExpression, scope: Scope): Generator<any, any, any>;
export declare function MetaProperty(node: acorn.MetaProperty, scope: Scope): Generator<never, any, unknown>;
export declare function SequenceExpression(node: acorn.SequenceExpression, scope: Scope): Generator<any, any, any>;
export declare function ArrowFunctionExpression(node: acorn.ArrowFunctionExpression, scope: Scope): Generator<never, any, unknown>;
export declare function TemplateLiteral(node: acorn.TemplateLiteral, scope: Scope): Generator<any, string, any>;
export declare function TaggedTemplateExpression(node: acorn.TaggedTemplateExpression, scope: Scope): Generator<any, any, any>;
export declare function TemplateElement(node: acorn.TemplateElement, scope: Scope): Generator<never, string, unknown>;
export declare function ClassExpression(node: acorn.ClassExpression, scope: Scope): Generator<any, () => Generator<any, any, any>, any>;
export interface SuperOptions {
    getProto?: boolean;
}
export declare function Super(node: acorn.Super, scope: Scope, options?: SuperOptions): Generator<never, any, unknown>;
export interface SpreadOptions {
    spreadProps?: boolean;
}
export declare function SpreadElement(node: acorn.SpreadElement, scope: Scope, options?: SpreadOptions): Generator<any, any, any>;
export declare function ChainExpression(node: acorn.ChainExpression, scope: Scope): Generator<any, any, any>;
export declare function ImportExpression(node: acorn.ImportExpression, scope: Scope): Generator<any, Promise<any>, any>;
export declare function YieldExpression(node: acorn.YieldExpression, scope: Scope): any;
export declare function AwaitExpression(node: acorn.AwaitExpression, scope: Scope): any;
