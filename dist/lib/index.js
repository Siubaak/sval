"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var acorn_1 = require("acorn");
var scope_1 = require("./scope");
var module_1 = require("./share/module");
var evaluate_1 = require("./evaluate");
var Sval = (function () {
    function Sval(options) {
        if (options === void 0) { options = {}; }
        this.runOptions = {};
        this.scope = new scope_1.default('function');
        var _a = options.ecmaVer, ecmaVer = _a === void 0 ? 5 : _a, _b = options.sandBox, sandBox = _b === void 0 ? true : _b;
        this.runOptions.ecmaVersion = ecmaVer;
        this.scope.invasive();
        if (sandBox) {
            this.scope.let('window', module_1.defModules);
            this.scope.let('this', module_1.defModules);
        }
        else {
            this.scope.let('window', window);
            this.scope.let('this', window);
        }
    }
    Sval.prototype.addModules = function (modules) {
        var win = this.scope.global().find('window').get();
        var names = Object.getOwnPropertyNames(modules);
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name_1 = names_1[_i];
            win[name_1] = modules[name_1];
        }
    };
    Sval.prototype.run = function (input) {
        var ast = acorn_1.parse(input, this.runOptions);
        evaluate_1.default(ast, this.scope);
    };
    return Sval;
}());
if (window) {
    ;
    window.Sval = Sval;
}
exports.default = Sval;
//# sourceMappingURL=index.js.map