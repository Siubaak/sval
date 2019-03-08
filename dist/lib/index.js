"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
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
        this.exports = {};
        var ecmaVer = options.ecmaVer, _a = options.sandBox, sandBox = _a === void 0 ? true : _a;
        if ([3, 5, 6, 7, 8, 2015, 2016, 2017].indexOf(ecmaVer) === -1) {
            ecmaVer = 7;
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
        console.warn('Use import instead. addModules is deprecated and will be removed soon.');
        this.import(modules);
    };
    Sval.prototype.import = function (nameOrModules, mod) {
        var e_1, _a;
        var win = this.scope.find('window').get();
        if (typeof nameOrModules === 'string') {
            nameOrModules = { nameOrModules: mod };
        }
        if (typeof nameOrModules !== 'object')
            return;
        var names = util_1.getOwnNames(nameOrModules);
        try {
            for (var names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
                var name_1 = names_1_1.value;
                win[name_1] = nameOrModules[name_1];
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Sval.prototype.run = function (input) {
        this.scope.let('exports', this.exports = {});
        var ast = acorn_1.parse(input, this.options);
        util_1.runGenerator(helper_1.hoist, ast, this.scope);
        util_1.runGenerator(program_1.Program, ast, this.scope);
    };
    return Sval;
}());
try {
    window.Sval = Sval;
}
catch (err) {
}
exports.default = Sval;
//# sourceMappingURL=index.js.map