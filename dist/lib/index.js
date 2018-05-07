"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var acorn_1 = require("acorn");
var scope_1 = require("./scope");
var module_1 = require("./module");
var evaluate_1 = require("./evaluate");
var option_1 = require("./share/option");
var Sval = (function () {
    function Sval(options) {
        this.runOptions = {};
        this.scope = new scope_1.default('block');
        var _a = options.ecmaVer, ecmaVer = _a === void 0 ? 6 : _a, _b = options.sandBox, sandBox = _b === void 0 ? true : _b;
        option_1.default.ecmaVer = ecmaVer;
        option_1.default.sandBox = sandBox;
        this.runOptions.ecmaVersion = ecmaVer;
        if (sandBox) {
            this.scope.let('window', module_1.defModules);
            this.scope.let('this', module_1.defModules);
        }
        else {
            this.scope.let('window', window);
            this.scope.let('this', window);
        }
        var names = Object.getOwnPropertyNames(module_1.defModules);
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name_1 = names_1[_i];
            this.scope.let(name_1, module_1.defModules[name_1]);
        }
    }
    Sval.prototype.addModules = function (modules) {
        var names = Object.getOwnPropertyNames(modules);
        for (var _i = 0, names_2 = names; _i < names_2.length; _i++) {
            var name_2 = names_2[_i];
            this.scope.let(name_2, modules[name_2]);
        }
    };
    Sval.prototype.run = function (input) {
        var ast = acorn_1.parse(input, this.runOptions);
        evaluate_1.default(ast, this.scope);
    };
    return Sval;
}());
exports.default = Sval;
//# sourceMappingURL=index.js.map