"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Identifier(node, scope, options) {
    var _a = options || {}, _b = _a.getName, getName = _b === void 0 ? false : _b, _c = _a.getVar, getVar = _c === void 0 ? false : _c, _d = _a.throwErr, throwErr = _d === void 0 ? true : _d;
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