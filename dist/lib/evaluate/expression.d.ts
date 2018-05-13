import * as estree from 'estree';
import Scope from '../scope';
export declare function ThisExpression(node: estree.ThisExpression, scope: Scope): any;
export declare function ArrayExpression(node: estree.ArrayExpression, scope: Scope): any[];
export declare function ObjectExpression(node: estree.ObjectExpression, scope: Scope): {
    [key: string]: any;
};
export declare function FunctionExpression(node: estree.FunctionExpression, scope: Scope): (...args: any[]) => any;
export declare function UnaryExpression(node: estree.UnaryExpression, scope: Scope): any;
export declare function UpdateExpression(node: estree.UpdateExpression, scope: Scope): any;
export declare function BinaryExpression(node: estree.BinaryExpression, scope: Scope): any;
export declare function AssignmentExpression(node: estree.AssignmentExpression, scope: Scope): any;
export declare function LogicalExpression(node: estree.LogicalExpression, scope: Scope): any;
export interface MemberExpressionOptions {
    getObj?: boolean;
    getVar?: boolean;
}
export declare function MemberExpression(node: estree.MemberExpression, scope: Scope, options?: MemberExpressionOptions): any;
export declare function ConditionalExpression(node: estree.ConditionalExpression, scope: Scope): any;
export declare function CallExpression(node: estree.CallExpression, scope: Scope): any;
export declare function NewExpression(node: estree.NewExpression, scope: Scope): any;
export declare function SequenceExpression(node: estree.SequenceExpression, scope: Scope): any;
export declare function ArrowFunctionExpression(node: estree.ArrowFunctionExpression, scope: Scope): (...args: any[]) => any;
