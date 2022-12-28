import * as acorn from 'acorn';
import { Options } from 'acorn';
import * as estree from 'estree';
import { Node, Program } from 'estree';

interface SvalOptions {
    ecmaVer?: 3 | 5 | 6 | 7 | 8 | 9 | 10 | 2015 | 2016 | 2017 | 2018 | 2019;
    sandBox?: boolean;
}
declare class Sval {
    static version: string;
    private options;
    private scope;
    exports: {
        [name: string]: any;
    };
    constructor(options?: SvalOptions);
    import(nameOrModules: string | {
        [name: string]: any;
    }, mod?: any): void;
    parse(code: string, parser?: (code: string, options: Options) => Node): estree.Property | estree.CatchClause | estree.ClassDeclaration | estree.ClassExpression | estree.ClassBody | estree.Identifier | estree.SimpleLiteral | estree.RegExpLiteral | estree.BigIntLiteral | estree.ArrayExpression | estree.ArrowFunctionExpression | estree.AssignmentExpression | estree.AwaitExpression | estree.BinaryExpression | estree.SimpleCallExpression | estree.NewExpression | estree.ChainExpression | estree.ConditionalExpression | estree.FunctionExpression | estree.ImportExpression | estree.LogicalExpression | estree.MemberExpression | estree.MetaProperty | estree.ObjectExpression | estree.SequenceExpression | estree.TaggedTemplateExpression | estree.TemplateLiteral | estree.ThisExpression | estree.UnaryExpression | estree.UpdateExpression | estree.YieldExpression | estree.FunctionDeclaration | estree.MethodDefinition | estree.ImportDeclaration | estree.ExportNamedDeclaration | estree.ExportDefaultDeclaration | estree.ExportAllDeclaration | estree.ImportSpecifier | estree.ImportDefaultSpecifier | estree.ImportNamespaceSpecifier | estree.ExportSpecifier | estree.ObjectPattern | estree.ArrayPattern | estree.RestElement | estree.AssignmentPattern | estree.PrivateIdentifier | Program | estree.PropertyDefinition | estree.SpreadElement | estree.ExpressionStatement | estree.BlockStatement | estree.StaticBlock | estree.EmptyStatement | estree.DebuggerStatement | estree.WithStatement | estree.ReturnStatement | estree.LabeledStatement | estree.BreakStatement | estree.ContinueStatement | estree.IfStatement | estree.SwitchStatement | estree.ThrowStatement | estree.TryStatement | estree.WhileStatement | estree.DoWhileStatement | estree.ForStatement | estree.ForInStatement | estree.ForOfStatement | estree.VariableDeclaration | estree.Super | estree.SwitchCase | estree.TemplateElement | estree.VariableDeclarator | acorn.Node;
    run(code: string | Node): void;
}

export { SvalOptions, Sval as default };
