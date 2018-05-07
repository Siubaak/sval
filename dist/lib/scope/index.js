"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var variable_1 = require("./variable");
var Scope = (function () {
    function Scope(type, parent, label) {
        if (parent === void 0) { parent = null; }
        this.context = {};
        this.invasived = false;
        this.type = type;
        this.parent = parent;
    }
    Scope.prototype.invasive = function () {
        this.invasived = true;
    };
    Scope.prototype.global = function () {
        var scope = this;
        while (scope.parent) {
            scope = scope.parent;
        }
        return scope;
    };
    Scope.prototype.find = function (name) {
        if (this.context.hasOwnProperty(name)) {
            return this.context[name];
        }
        else if (this.parent) {
            return this.parent.find(name);
        }
        else {
            return null;
        }
    };
    Scope.prototype.var = function (name, value) {
        var scope = this;
        while (scope.parent && scope.type !== 'function') {
            scope = scope.parent;
        }
        scope.context[name] = new variable_1.Var('var', value);
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