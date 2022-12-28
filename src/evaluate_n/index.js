import { assign } from '../share/util';
import * as declaration from './declaration';
import * as expression from './expression';
import * as identifier from './identifier';
import * as statement from './statement';
import * as literal from './literal';
import * as pattern from './pattern';
import * as program from './program';
let evaluateOps;
export default function evaluate(node, scope) {
    if (!node)
        return;
    if (!evaluateOps) {
        evaluateOps = assign({}, declaration, expression, identifier, statement, literal, pattern, program);
    }
    const handler = evaluateOps[node.type];
    if (handler) {
        return handler(node, scope);
    }
    else {
        throw new Error(`${node.type} isn't implemented`);
    }
}
