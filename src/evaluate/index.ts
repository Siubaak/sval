import { Node } from 'estree'
import Scope from '../scope'
import { is } from '../share/util'

import { Identifier } from './identifier'
import { Literal } from './literal'
import { Program } from './program'
import {
  // Basis
  ExpressionStatement,
  BlockStatement,
  EmptyStatement,
  DebuggerStatement,
  WithStatement,
  // Control flow
  ReturnStatement,
  LabeledStatement,
  BreakStatement,
  ContinueStatement,
  // Choice
  IfStatement,
  SwitchStatement,
  SwitchCase,
  // Exceptions
  ThrowStatement,
  TryStatement,
  CatchClause,
  // Loops
  WhileStatement,
  DoWhileStatement,
  ForStatement,
  ForInStatement,
} from './statement'
import {
  FunctionDeclaration,
  VariableDeclaration,
  VariableDeclarator,
} from './declaration'
import {
  // Basis
  ThisExpression,
  ArrayExpression,
  ObjectExpression,
  FunctionExpression,
  // Unary operations
  UnaryExpression,
  UpdateExpression,
  // Binary operations
  BinaryExpression,
  AssignmentExpression,
  LogicalExpression,
  MemberExpression,
  // Others
  ConditionalExpression,
  CallExpression,
  NewExpression,
  SequenceExpression,
} from './expression'

const evaluateOps = {
  // Identifier
  Identifier,
  // Literal
  Literal,
  // Program
  Program,
  // Statement
  ExpressionStatement,
  BlockStatement,
  EmptyStatement,
  DebuggerStatement,
  WithStatement,
  ReturnStatement,
  LabeledStatement,
  BreakStatement,
  ContinueStatement,
  IfStatement,
  SwitchStatement,
  SwitchCase,
  ThrowStatement,
  TryStatement,
  CatchClause,
  WhileStatement,
  DoWhileStatement,
  ForStatement,
  ForInStatement,
  // Declaration
  FunctionDeclaration,
  VariableDeclaration,
  VariableDeclarator,
  // Expression
  ThisExpression,
  ArrayExpression,
  ObjectExpression,
  FunctionExpression,
  UnaryExpression,
  UpdateExpression,
  BinaryExpression,
  AssignmentExpression,
  LogicalExpression,
  MemberExpression,
  ConditionalExpression,
  CallExpression,
  NewExpression,
  SequenceExpression,
}

export default function evaluate(node: Node, scope: Scope): any {
  const handle = (evaluateOps as any)[node.type]
  return handle(node, scope)
}
