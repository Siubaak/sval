"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var acorn_1 = require("acorn");
var program_1 = require("./evaluate/program");
var scope_1 = require("./scope");
var helper_1 = require("./share/helper");
var util_1 = require("./share/util");
var Sval = (function () {
    function Sval(options) {
        if (options === void 0) { options = {}; }
        this.options = {};
        this.scope = new scope_1.default(null, true);
        var ecmaVer = options.ecmaVer, _a = options.sandBox, sandBox = _a === void 0 ? true : _a;
        if (ecmaVer !== 5
            && ecmaVer !== 6
            && ecmaVer !== 2015) {
            ecmaVer = 5;
        }
        this.options.ecmaVersion = ecmaVer;
        if (sandBox) {
            var win = util_1.createSandBox();
            this.scope.let('window', win);
            this.scope.let('this', win);
        }
        else {
            this.scope.let('window', window);
            this.scope.let('this', window);
        }
    }
    Sval.prototype.addModules = function (modules) {
        var win = this.scope.find('window').get();
        var names = util_1.getOwnNames(modules);
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name_1 = names_1[_i];
            win[name_1] = modules[name_1];
        }
    };
    Sval.prototype.run = function (input) {
        var ast = acorn_1.parse(input, this.options);
        helper_1.hoist(ast, this.scope);
        program_1.Program(ast, this.scope);
    };
    return Sval;
}());
if (window) {
    ;
    window.Sval = Sval;
}
exports.default = Sval;
//# sourceMappingURL=index.js.map