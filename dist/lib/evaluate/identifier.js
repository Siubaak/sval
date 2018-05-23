"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Identifier(node, scope, options) {
    if (options === void 0) { options = {}; }
    var _a = options.getName, getName = _a === void 0 ? false : _a, _b = options.getVar, getVar = _b === void 0 ? false : _b, _c = options.throwErr, throwErr = _c === void 0 ? true : _c;
    if (getName) {
        return node.name;
    }
    if (node.name === 'undefined') {
        return undefined;
    }
    var variable = scope.find(node.name);
    if (variable) {
        return getVar ? variable : variable.get();
    }
    else if (throwErr) {
        throw new ReferenceError(node.name + " is not defined");
    }
    else {
        return undefined;
    }
}
exports.Identifier = Identifier;
//# sourceMappingURL=identifier.js.map