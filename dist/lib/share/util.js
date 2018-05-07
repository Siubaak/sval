"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toString(val) {
    return Object.prototype.toString.call(val);
}
exports.is = {
    undefined: function (val) { return toString(val) === '[object Undefined]'; },
    null: function (val) { return toString(val) === '[object Null]'; },
    number: function (val) { return toString(val) === '[object Number]'; },
    string: function (val) { return toString(val) === '[object String]'; },
    boolean: function (val) { return toString(val) === '[object Boolean]'; },
    symbol: function (val) { return toString(val) === '[object Symbol]'; },
    object: function (val) { return toString(val) === '[object Object]'; },
    array: function (val) { return toString(val) === '[object Array]'; },
    function: function (val) { return toString(val) === '[object Function]'; },
};
//# sourceMappingURL=util.js.map