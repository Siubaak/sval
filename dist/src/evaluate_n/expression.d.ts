import { default as Scope } from '../scope/index.ts';
import * as acorn from 'acorn';
export declare function ThisExpression(node: acorn.ThisExpression, scope: Scope): any;
export declare function ArrayExpression(node: acorn.ArrayExpression, scope: Scope): any[];
export declare function ObjectExpression(node: acorn.ObjectExpression, scope: Scope): {
    [key: string]: any;
};
export declare function FunctionExpression(node: acorn.FunctionExpression, scope: Scope): any;
export declare function UnaryExpression(node: acorn.UnaryExpression, scope: Scope): number | boolean | "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
export declare function UpdateExpression(node: acorn.UpdateExpression, scope: Scope): any;
export declare function BinaryExpression(node: acorn.BinaryExpression, scope: Scope): any;
export declare function AssignmentExpression(node: acorn.AssignmentExpression, scope: Scope): any;
export declare function LogicalExpression(node: acorn.LogicalExpression, scope: Scope): any;
export interface MemberExpressionOptions {
    getObj?: boolean;
    getVar?: boolean;
}
export declare function MemberExpression(node: acorn.MemberExpression, scope: Scope, options?: MemberExpressionOptions): any;
export declare function ConditionalExpression(node: acorn.ConditionalExpression, scope: Scope): any;
export declare function CallExpression(node: acorn.CallExpression, scope: Scope): any;
export declare function NewExpression(node: acorn.NewExpression, scope: Scope): any;
export declare function MetaProperty(node: acorn.MetaProperty, scope: Scope): any;
export declare function SequenceExpression(node: acorn.SequenceExpression, scope: Scope): any;
export declare function ArrowFunctionExpression(node: acorn.ArrowFunctionExpression, scope: Scope): any;
export declare function TemplateLiteral(node: acorn.TemplateLiteral, scope: Scope): string;
export declare function TaggedTemplateExpression(node: acorn.TaggedTemplateExpression, scope: Scope): any;
export declare function TemplateElement(node: acorn.TemplateElement, scope: Scope): string;
export declare function ClassExpression(node: acorn.ClassExpression, scope: Scope): () => any;
export interface SuperOptions {
    getProto?: boolean;
}
export declare function Super(node: acorn.Super, scope: Scope, options?: SuperOptions): any;
export interface SpreadOptions {
    spreadProps?: boolean;
}
export declare function SpreadElement(node: acorn.SpreadElement, scope: Scope, options?: SpreadOptions): any;
export declare function ChainExpression(node: acorn.ChainExpression, scope: Scope): any;
export declare function ImportExpression(node: acorn.ImportExpression, scope: Scope): Promise<any>;
