"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
function Program(program, scope) {
    for (var _i = 0, _a = program.body; _i < _a.length; _i++) {
        var node = _a[_i];
        index_1.default(node, scope);
    }
}
exports.Program = Program;
//# sourceMappingURL=program.js.map