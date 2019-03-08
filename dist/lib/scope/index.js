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
var variable_1 = require("./variable");
var util_1 = require("../share/util");
var Scope = (function () {
    function Scope(parent, isolated) {
        if (parent === void 0) { parent = null; }
        if (isolated === void 0) { isolated = false; }
        this.context = {};
        this.parent = parent;
        this.isolated = isolated;
    }
    Scope.prototype.global = function () {
        var scope = this;
        while (scope.parent) {
            scope = scope.parent;
        }
        return scope;
    };
    Scope.prototype.clone = function () {
        var e_1, _a;
        var cloneScope = new Scope(this.parent, this.isolated);
        var names = util_1.getOwnNames(this.context);
        try {
            for (var names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
                var name_1 = names_1_1.value;
                var variable = this.context[name_1];
                cloneScope[variable.kind](name_1, variable.get());
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return cloneScope;
    };
    Scope.prototype.find = function (name) {
        if (util_1.hasOwn(this.context, name)) {
            return this.context[name];
        }
        else if (this.parent) {
            return this.parent.find(name);
        }
        else {
            var win = this.global().find('window').get();
            if (util_1.hasOwn(win, name)) {
                return new variable_1.Prop(win, name);
            }
            else {
                return null;
            }
        }
    };
    Scope.prototype.var = function (name, value) {
        var scope = this;
        while (scope.parent && !scope.isolated) {
            scope = scope.parent;
        }
        scope.context[name] = new variable_1.Var('var', value);
        if (!scope.parent) {
            var win = scope.find('window').get();
            win[name] = value;
        }
        return true;
    };
    Scope.prototype.let = function (name, value) {
        var variable = this.context[name];
        if (!variable) {
            this.context[name] = new variable_1.Var('let', value);
            return true;
        }
        else {
            return false;
        }
    };
    Scope.prototype.const = function (name, value) {
        var variable = this.context[name];
        if (!variable) {
            this.context[name] = new variable_1.Var('const', value);
            return true;
        }
        else {
            return false;
        }
    };
    return Scope;
}());
exports.default = Scope;
//# sourceMappingURL=index.js.map