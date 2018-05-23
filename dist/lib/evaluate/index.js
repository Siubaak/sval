"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../share/util");
var declaration = require("./declaration");
var expression = require("./expression");
var identifier = require("./identifier");
var literal = require("./literal");
var pattern = require("./pattern");
var program = require("./program");
var statement = require("./statement");
var evaluateOps = util_1.assign({}, declaration, expression, identifier, literal, pattern, program, statement);
function evaluate(node, scope) {
    if (!node) {
        return;
    }
    var handler = evaluateOps[node.type];
    return handler(node, scope);
}
exports.default = evaluate;
//# sourceMappingURL=index.js.map