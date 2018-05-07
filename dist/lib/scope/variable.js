"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Var = (function () {
    function Var(kind, value) {
        this.kind = kind;
        this.value = value;
    }
    Var.prototype.get = function () {
        return this.value;
    };
    Var.prototype.set = function (value) {
        if (this.kind === 'const') {
            return false;
        }
        else {
            this.value = value;
            return true;
        }
    };
    return Var;
}());
exports.Var = Var;
var Prop = (function () {
    function Prop(object, property) {
        this.object = object;
        this.property = property;
    }
    Prop.prototype.get = function () {
        return this.object[this.property];
    };
    Prop.prototype.set = function (value) {
        this.object[this.property] = value;
        return true;
    };
    Prop.prototype.del = function () {
        return delete this.object[this.property];
    };
    return Prop;
}());
exports.Prop = Prop;
//# sourceMappingURL=variable.js.map