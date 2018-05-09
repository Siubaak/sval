import * as estree from 'estree';
import Scope from '../scope';
export default function hoisting(node: estree.Program | estree.BlockStatement, scope: Scope): void;
