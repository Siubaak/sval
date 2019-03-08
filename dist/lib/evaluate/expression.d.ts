import * as estree from 'estree';
import Scope from '../scope';
export declare function ThisExpression(node: estree.ThisExpression, scope: Scope): IterableIterator<any>;
export declare function ArrayExpression(node: estree.ArrayExpression, scope: Scope): IterableIterator<any>;
export declare function ObjectExpression(node: estree.ObjectExpression, scope: Scope): IterableIterator<any>;
export declare function FunctionExpression(node: estree.FunctionExpression, scope: Scope): IterableIterator<IterableIterator<any>>;
export declare function UnaryExpression(node: estree.UnaryExpression, scope: Scope): IterableIterator<any>;
export declare function UpdateExpression(node: estree.UpdateExpression, scope: Scope): IterableIterator<any>;
export declare function BinaryExpression(node: estree.BinaryExpression, scope: Scope): IterableIterator<any>;
export declare function AssignmentExpression(node: estree.AssignmentExpression, scope: Scope): IterableIterator<any>;
export declare function LogicalExpression(node: estree.LogicalExpression, scope: Scope): IterableIterator<any>;
export interface MemberExpressionOptions {
    getObj?: boolean;
    getVar?: boolean;
}
export declare function MemberExpression(node: estree.MemberExpression, scope: Scope, options?: MemberExpressionOptions): IterableIterator<any>;
export declare function ConditionalExpression(node: estree.ConditionalExpression, scope: Scope): IterableIterator<any>;
export declare function CallExpression(node: estree.CallExpression, scope: Scope): IterableIterator<any>;
export declare function NewExpression(node: estree.NewExpression, scope: Scope): IterableIterator<any>;
export declare function SequenceExpression(node: estree.SequenceExpression, scope: Scope): IterableIterator<any>;
export declare function ArrowFunctionExpression(node: estree.ArrowFunctionExpression, scope: Scope): IterableIterator<any>;
export declare function YieldExpression(node: estree.YieldExpression, scope: Scope): IterableIterator<any>;
export declare function AwaitExpression(node: estree.AwaitExpression, scope: Scope): IterableIterator<any>;
export declare function TemplateLiteral(node: estree.TemplateLiteral, scope: Scope): IterableIterator<any>;
export declare function TaggedTemplateExpression(node: estree.TaggedTemplateExpression, scope: Scope): IterableIterator<any>;
export declare function TemplateElement(node: estree.TemplateElement, scope: Scope): IterableIterator<string>;
export declare function ClassExpression(node: estree.ClassExpression, scope: Scope): IterableIterator<any>;
export interface SuperOptions {
    getProto?: boolean;
}
export declare function Super(node: estree.Super, scope: Scope, options?: SuperOptions): IterableIterator<any>;
