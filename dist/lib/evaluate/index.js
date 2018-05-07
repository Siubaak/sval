"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../share/util");
var identifier_1 = require("./identifier");
var literal_1 = require("./literal");
var program_1 = require("./program");
var statement_1 = require("./statement");
var declaration_1 = require("./declaration");
var expression_1 = require("./expression");
var evaluateOps = {
    Identifier: identifier_1.Identifier,
    Literal: literal_1.Literal,
    Program: program_1.Program,
    ExpressionStatement: statement_1.ExpressionStatement,
    BlockStatement: statement_1.BlockStatement,
    EmptyStatement: statement_1.EmptyStatement,
    DebuggerStatement: statement_1.DebuggerStatement,
    WithStatement: statement_1.WithStatement,
    ReturnStatement: statement_1.ReturnStatement,
    LabeledStatement: statement_1.LabeledStatement,
    BreakStatement: statement_1.BreakStatement,
    ContinueStatement: statement_1.ContinueStatement,
    IfStatement: statement_1.IfStatement,
    SwitchStatement: statement_1.SwitchStatement,
    SwitchCase: statement_1.SwitchCase,
    ThrowStatement: statement_1.ThrowStatement,
    TryStatement: statement_1.TryStatement,
    CatchClause: statement_1.CatchClause,
    WhileStatement: statement_1.WhileStatement,
    DoWhileStatement: statement_1.DoWhileStatement,
    ForStatement: statement_1.ForStatement,
    ForInStatement: statement_1.ForInStatement,
    FunctionDeclaration: declaration_1.FunctionDeclaration,
    VariableDeclaration: declaration_1.VariableDeclaration,
    VariableDeclarator: declaration_1.VariableDeclarator,
    ThisExpression: expression_1.ThisExpression,
    ArrayExpression: expression_1.ArrayExpression,
    ObjectExpression: expression_1.ObjectExpression,
    FunctionExpression: expression_1.FunctionExpression,
    UnaryExpression: expression_1.UnaryExpression,
    UpdateExpression: expression_1.UpdateExpression,
    BinaryExpression: expression_1.BinaryExpression,
    AssignmentExpression: expression_1.AssignmentExpression,
    LogicalExpression: expression_1.LogicalExpression,
    MemberExpression: expression_1.MemberExpression,
    ConditionalExpression: expression_1.ConditionalExpression,
    CallExpression: expression_1.CallExpression,
    NewExpression: expression_1.NewExpression,
    SequenceExpression: expression_1.SequenceExpression,
};
function evaluate(node, scope) {
    if (util_1.is.null(node)) {
        return;
    }
    var handle = evaluateOps[node.type];
    return handle(node, scope);
}
exports.default = evaluate;
//# sourceMappingURL=index.js.map