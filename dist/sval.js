const wr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get BlockStatement() {
    return ce;
  },
  get BreakStatement() {
    return Za;
  },
  get CatchClause() {
    return Wi;
  },
  get ContinueStatement() {
    return Ja;
  },
  get DebuggerStatement() {
    return Xa;
  },
  get DoWhileStatement() {
    return Gi;
  },
  get EmptyStatement() {
    return Qa;
  },
  get ExpressionStatement() {
    return Ka;
  },
  get ForInStatement() {
    return Ki;
  },
  get ForOfStatement() {
    return Qi;
  },
  get ForStatement() {
    return Hi;
  },
  get IfStatement() {
    return Ui;
  },
  get LabeledStatement() {
    return es;
  },
  get ReturnStatement() {
    return Ya;
  },
  get SwitchCase() {
    return wt;
  },
  get SwitchStatement() {
    return $i;
  },
  get ThrowStatement() {
    return ts;
  },
  get TryStatement() {
    return qi;
  },
  get WhileStatement() {
    return zi;
  },
  get WithStatement() {
    return ji;
  }
}, Symbol.toStringTag, { value: "Module" })), kr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ClassBody() {
    return Yi;
  },
  get ClassDeclaration() {
    return rs;
  },
  get ExportAllDeclaration() {
    return os;
  },
  get ExportDefaultDeclaration() {
    return ss;
  },
  get ExportNamedDeclaration() {
    return ns;
  },
  get FunctionDeclaration() {
    return is;
  },
  get ImportDeclaration() {
    return as;
  },
  get MethodDefinition() {
    return Zi;
  },
  get PropertyDefinition() {
    return Rt;
  },
  get StaticBlock() {
    return Ji;
  },
  get VariableDeclaration() {
    return Se;
  },
  get VariableDeclarator() {
    return Xi;
  }
}, Symbol.toStringTag, { value: "Module" })), Er = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get BlockStatement() {
    return fe;
  },
  get BreakStatement() {
    return Fs;
  },
  get CatchClause() {
    return cr;
  },
  get ContinueStatement() {
    return Ms;
  },
  get DebuggerStatement() {
    return Os;
  },
  get DoWhileStatement() {
    return hr;
  },
  get EmptyStatement() {
    return Bs;
  },
  get ExpressionStatement() {
    return Rs;
  },
  get ForInStatement() {
    return dr;
  },
  get ForOfStatement() {
    return yr;
  },
  get ForStatement() {
    return pr;
  },
  get IfStatement() {
    return or;
  },
  get LabeledStatement() {
    return js;
  },
  get ReturnStatement() {
    return Ds;
  },
  get SwitchCase() {
    return kt;
  },
  get SwitchStatement() {
    return ur;
  },
  get ThrowStatement() {
    return Us;
  },
  get TryStatement() {
    return lr;
  },
  get WhileStatement() {
    return fr;
  },
  get WithStatement() {
    return nr;
  }
}, Symbol.toStringTag, { value: "Module" })), Cr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ClassBody() {
    return gr;
  },
  get ClassDeclaration() {
    return qs;
  },
  get ExportAllDeclaration() {
    return Hs;
  },
  get ExportDefaultDeclaration() {
    return zs;
  },
  get ExportNamedDeclaration() {
    return Gs;
  },
  get FunctionDeclaration() {
    return $s;
  },
  get ImportDeclaration() {
    return Ws;
  },
  get MethodDefinition() {
    return xr;
  },
  get PropertyDefinition() {
    return Bt;
  },
  get StaticBlock() {
    return br;
  },
  get VariableDeclaration() {
    return we;
  },
  get VariableDeclarator() {
    return mr;
  }
}, Symbol.toStringTag, { value: "Module" })), Qe = Object.freeze, w = Object.defineProperty, de = Object.getOwnPropertyDescriptor, _r = Object.prototype.hasOwnProperty;
function Ct(e, t) {
  return _r.call(e, t);
}
const _t = Object.getOwnPropertyNames, Mt = Object.setPrototypeOf;
function Ir(e, t) {
  Mt ? Mt(e, t) : e.__proto__ = t;
}
const jt = Object.getPrototypeOf;
function Ht(e) {
  return jt ? jt(e) : e.__proto__;
}
const Ar = Object.getOwnPropertyDescriptor;
function Kt(e, t, r) {
  for (; t; ) {
    const i = Ar(t, r), a = typeof i < "u" && typeof i.writable > "u" && typeof i[e] == "function" && i[e];
    if (a)
      return a;
    t = Ht(t);
  }
}
function Qt(e, t) {
  return Kt("get", e, t);
}
function Xt(e, t) {
  return Kt("set", e, t);
}
const Ce = Object.create;
function Yt(e, t) {
  Ir(e, t), e.prototype = Ce(t.prototype, {
    constructor: {
      value: e,
      writable: !0
    }
  });
}
function tt(e, t, r = []) {
  let i = !1;
  try {
    i = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function() {
      })
    );
  } catch {
  }
  return i ? Reflect.construct(t, r, Ht(e).constructor) : t.apply(e, r);
}
function Pr(e) {
  for (let t = 1; t < arguments.length; ++t) {
    const r = arguments[t];
    for (const i in r)
      Ct(r, i) && (e[i] = r[i]);
  }
  return e;
}
const z = Object.assign || Pr;
let Xe = [], h = Ce(null);
const He = (e) => {
  if (!e.Object) throw 0;
  Xe = _t(h = e).filter((t) => ["webkitStorageInfo", "GLOBAL", "root"].indexOf(t) === -1);
};
try {
  He(window);
} catch {
  try {
    He(self);
  } catch {
    try {
      He(global);
    } catch {
      try {
        He(globalThis);
      } catch {
        try {
          h.Object = Object;
        } catch {
        }
        try {
          h.Function = Function;
        } catch {
        }
        try {
          h.Array = Array;
        } catch {
        }
        try {
          h.Number = Number;
        } catch {
        }
        try {
          h.parseFloat = parseFloat;
        } catch {
        }
        try {
          h.parseInt = parseInt;
        } catch {
        }
        try {
          h.Infinity = 1 / 0;
        } catch {
        }
        try {
          h.NaN = NaN;
        } catch {
        }
        try {
          h.undefined = void 0;
        } catch {
        }
        try {
          h.Boolean = Boolean;
        } catch {
        }
        try {
          h.String = String;
        } catch {
        }
        try {
          h.Symbol = Symbol;
        } catch {
        }
        try {
          h.Date = Date;
        } catch {
        }
        try {
          h.Promise = Promise;
        } catch {
        }
        try {
          h.RegExp = RegExp;
        } catch {
        }
        try {
          h.Error = Error;
        } catch {
        }
        try {
          h.EvalError = EvalError;
        } catch {
        }
        try {
          h.RangeError = RangeError;
        } catch {
        }
        try {
          h.ReferenceError = ReferenceError;
        } catch {
        }
        try {
          h.SyntaxError = SyntaxError;
        } catch {
        }
        try {
          h.TypeError = TypeError;
        } catch {
        }
        try {
          h.URIError = URIError;
        } catch {
        }
        try {
          h.JSON = JSON;
        } catch {
        }
        try {
          h.Math = Math;
        } catch {
        }
        try {
          h.console = console;
        } catch {
        }
        try {
          h.Intl = Intl;
        } catch {
        }
        try {
          h.ArrayBuffer = ArrayBuffer;
        } catch {
        }
        try {
          h.Uint8Array = Uint8Array;
        } catch {
        }
        try {
          h.Int8Array = Int8Array;
        } catch {
        }
        try {
          h.Uint16Array = Uint16Array;
        } catch {
        }
        try {
          h.Int16Array = Int16Array;
        } catch {
        }
        try {
          h.Uint32Array = Uint32Array;
        } catch {
        }
        try {
          h.Int32Array = Int32Array;
        } catch {
        }
        try {
          h.Float32Array = Float32Array;
        } catch {
        }
        try {
          h.Float64Array = Float64Array;
        } catch {
        }
        try {
          h.Uint8ClampedArray = Uint8ClampedArray;
        } catch {
        }
        try {
          h.DataView = DataView;
        } catch {
        }
        try {
          h.Map = Map;
        } catch {
        }
        try {
          h.Set = Set;
        } catch {
        }
        try {
          h.WeakMap = WeakMap;
        } catch {
        }
        try {
          h.WeakSet = WeakSet;
        } catch {
        }
        try {
          h.Proxy = Proxy;
        } catch {
        }
        try {
          h.Reflect = Reflect;
        } catch {
        }
        try {
          h.BigInt = BigInt;
        } catch {
        }
        try {
          h.decodeURI = decodeURI;
        } catch {
        }
        try {
          h.decodeURIComponent = decodeURIComponent;
        } catch {
        }
        try {
          h.encodeURI = encodeURI;
        } catch {
        }
        try {
          h.encodeURIComponent = encodeURIComponent;
        } catch {
        }
        try {
          h.escape = escape;
        } catch {
        }
        try {
          h.unescape = unescape;
        } catch {
        }
        try {
          h.eval = eval;
        } catch {
        }
        try {
          h.isFinite = isFinite;
        } catch {
        }
        try {
          h.isNaN = isNaN;
        } catch {
        }
        try {
          h.SharedArrayBuffer = SharedArrayBuffer;
        } catch {
        }
        try {
          h.Atomics = Atomics;
        } catch {
        }
        try {
          h.WebAssembly = WebAssembly;
        } catch {
        }
        try {
          h.clearInterval = clearInterval;
        } catch {
        }
        try {
          h.clearTimeout = clearTimeout;
        } catch {
        }
        try {
          h.setInterval = setInterval;
        } catch {
        }
        try {
          h.setTimeout = setTimeout;
        } catch {
        }
        try {
          h.crypto = crypto;
        } catch {
        }
        try {
          h.URL = URL;
        } catch {
        }
        Xe = _t(h);
      }
    }
  }
}
h.Symbol && (!h.Symbol.iterator && (h.Symbol.iterator = B("iterator")), !h.Symbol.asyncIterator && (h.Symbol.asyncIterator = B("asynciterator")));
const Zt = Ce({});
for (let e = 0; e < Xe.length; e++) {
  const t = Xe[e];
  try {
    Zt[t] = h[t];
  } catch {
  }
}
const Oe = B("window");
function Lr() {
  return z(Ce({ [Oe]: h }), Zt);
}
function B(e) {
  return e + Math.random().toString(36).substring(2);
}
function Tr(e) {
  let t;
  if (typeof Symbol == "function" && (t = e[Symbol.asyncIterator], !t && (t = e[Symbol.iterator])), t)
    return t.call(e);
  if (typeof e.next == "function")
    return e;
  {
    let r = 0;
    return {
      next() {
        return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
      }
    };
  }
}
var Vr = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 80, 3, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 343, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 245, 1, 2, 9, 726, 6, 110, 6, 6, 9, 4759, 9, 787719, 239], Jt = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51, 13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7, 1, 17, 2, 60, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 433, 44, 212, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 42, 9, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 496, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191], Nr = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࢗ-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･", ei = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲊᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟍꟐꟑꟓꟕ-Ƛꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", ht = {
  3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
  5: "class enum extends super const export import",
  6: "enum",
  strict: "implements interface let package private protected public static yield",
  strictBind: "eval arguments"
}, pt = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this", Rr = {
  5: pt,
  "5module": pt + " export import",
  6: pt + " const class extends export import super"
}, Br = /^in(stanceof)?$/, Or = new RegExp("[" + ei + "]"), Dr = new RegExp("[" + ei + Nr + "]");
function gt(e, t) {
  for (var r = 65536, i = 0; i < t.length; i += 2) {
    if (r += t[i], r > e)
      return !1;
    if (r += t[i + 1], r >= e)
      return !0;
  }
  return !1;
}
function oe(e, t) {
  return e < 65 ? e === 36 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && Or.test(String.fromCharCode(e)) : t === !1 ? !1 : gt(e, Jt);
}
function _e(e, t) {
  return e < 48 ? e === 36 : e < 58 ? !0 : e < 65 ? !1 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && Dr.test(String.fromCharCode(e)) : t === !1 ? !1 : gt(e, Jt) || gt(e, Vr);
}
var E = function(t, r) {
  r === void 0 && (r = {}), this.label = t, this.keyword = r.keyword, this.beforeExpr = !!r.beforeExpr, this.startsExpr = !!r.startsExpr, this.isLoop = !!r.isLoop, this.isAssign = !!r.isAssign, this.prefix = !!r.prefix, this.postfix = !!r.postfix, this.binop = r.binop || null, this.updateContext = null;
};
function K(e, t) {
  return new E(e, { beforeExpr: !0, binop: t });
}
var Q = { beforeExpr: !0 }, U = { startsExpr: !0 }, It = {};
function S(e, t) {
  return t === void 0 && (t = {}), t.keyword = e, It[e] = new E(e, t);
}
var o = {
  num: new E("num", U),
  regexp: new E("regexp", U),
  string: new E("string", U),
  name: new E("name", U),
  privateId: new E("privateId", U),
  eof: new E("eof"),
  // Punctuation token types.
  bracketL: new E("[", { beforeExpr: !0, startsExpr: !0 }),
  bracketR: new E("]"),
  braceL: new E("{", { beforeExpr: !0, startsExpr: !0 }),
  braceR: new E("}"),
  parenL: new E("(", { beforeExpr: !0, startsExpr: !0 }),
  parenR: new E(")"),
  comma: new E(",", Q),
  semi: new E(";", Q),
  colon: new E(":", Q),
  dot: new E("."),
  question: new E("?", Q),
  questionDot: new E("?."),
  arrow: new E("=>", Q),
  template: new E("template"),
  invalidTemplate: new E("invalidTemplate"),
  ellipsis: new E("...", Q),
  backQuote: new E("`", U),
  dollarBraceL: new E("${", { beforeExpr: !0, startsExpr: !0 }),
  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `binop`, when present, specifies that this operator is a binary
  // operator, and will refer to its precedence.
  //
  // `prefix` and `postfix` mark the operator as a prefix or postfix
  // unary operator.
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.
  eq: new E("=", { beforeExpr: !0, isAssign: !0 }),
  assign: new E("_=", { beforeExpr: !0, isAssign: !0 }),
  incDec: new E("++/--", { prefix: !0, postfix: !0, startsExpr: !0 }),
  prefix: new E("!/~", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  logicalOR: K("||", 1),
  logicalAND: K("&&", 2),
  bitwiseOR: K("|", 3),
  bitwiseXOR: K("^", 4),
  bitwiseAND: K("&", 5),
  equality: K("==/!=/===/!==", 6),
  relational: K("</>/<=/>=", 7),
  bitShift: K("<</>>/>>>", 8),
  plusMin: new E("+/-", { beforeExpr: !0, binop: 9, prefix: !0, startsExpr: !0 }),
  modulo: K("%", 10),
  star: K("*", 10),
  slash: K("/", 10),
  starstar: new E("**", { beforeExpr: !0 }),
  coalesce: K("??", 1),
  // Keyword token types.
  _break: S("break"),
  _case: S("case", Q),
  _catch: S("catch"),
  _continue: S("continue"),
  _debugger: S("debugger"),
  _default: S("default", Q),
  _do: S("do", { isLoop: !0, beforeExpr: !0 }),
  _else: S("else", Q),
  _finally: S("finally"),
  _for: S("for", { isLoop: !0 }),
  _function: S("function", U),
  _if: S("if"),
  _return: S("return", Q),
  _switch: S("switch"),
  _throw: S("throw", Q),
  _try: S("try"),
  _var: S("var"),
  _const: S("const"),
  _while: S("while", { isLoop: !0 }),
  _with: S("with"),
  _new: S("new", { beforeExpr: !0, startsExpr: !0 }),
  _this: S("this", U),
  _super: S("super", U),
  _class: S("class", U),
  _extends: S("extends", Q),
  _export: S("export"),
  _import: S("import", U),
  _null: S("null", U),
  _true: S("true", U),
  _false: S("false", U),
  _in: S("in", { beforeExpr: !0, binop: 7 }),
  _instanceof: S("instanceof", { beforeExpr: !0, binop: 7 }),
  _typeof: S("typeof", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  _void: S("void", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  _delete: S("delete", { beforeExpr: !0, prefix: !0, startsExpr: !0 })
}, Z = /\r\n?|\n|\u2028|\u2029/, Fr = new RegExp(Z.source, "g");
function Le(e) {
  return e === 10 || e === 13 || e === 8232 || e === 8233;
}
function ti(e, t, r) {
  r === void 0 && (r = e.length);
  for (var i = t; i < r; i++) {
    var a = e.charCodeAt(i);
    if (Le(a))
      return i < r - 1 && a === 13 && e.charCodeAt(i + 1) === 10 ? i + 2 : i + 1;
  }
  return -1;
}
var ii = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/, X = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, ri = Object.prototype, Mr = ri.hasOwnProperty, jr = ri.toString, Te = Object.hasOwn || function(e, t) {
  return Mr.call(e, t);
}, Ut = Array.isArray || function(e) {
  return jr.call(e) === "[object Array]";
}, $t = /* @__PURE__ */ Object.create(null);
function pe(e) {
  return $t[e] || ($t[e] = new RegExp("^(?:" + e.replace(/ /g, "|") + ")$"));
}
function ue(e) {
  return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320));
}
var Ur = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/, De = function(t, r) {
  this.line = t, this.column = r;
};
De.prototype.offset = function(t) {
  return new De(this.line, this.column + t);
};
var it = function(t, r, i) {
  this.start = r, this.end = i, t.sourceFile !== null && (this.source = t.sourceFile);
};
function ai(e, t) {
  for (var r = 1, i = 0; ; ) {
    var a = ti(e, i, t);
    if (a < 0)
      return new De(r, t - i);
    ++r, i = a;
  }
}
var xt = {
  // `ecmaVersion` indicates the ECMAScript version to parse. Must be
  // either 3, 5, 6 (or 2015), 7 (2016), 8 (2017), 9 (2018), 10
  // (2019), 11 (2020), 12 (2021), 13 (2022), 14 (2023), or `"latest"`
  // (the latest version the library supports). This influences
  // support for strict mode, the set of reserved words, and support
  // for new syntax features.
  ecmaVersion: null,
  // `sourceType` indicates the mode the code should be parsed in.
  // Can be either `"script"` or `"module"`. This influences global
  // strict mode and parsing of `import` and `export` declarations.
  sourceType: "script",
  // `onInsertedSemicolon` can be a callback that will be called when
  // a semicolon is automatically inserted. It will be passed the
  // position of the inserted semicolon as an offset, and if
  // `locations` is enabled, it is given the location as a `{line,
  // column}` object as second argument.
  onInsertedSemicolon: null,
  // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
  // trailing commas.
  onTrailingComma: null,
  // By default, reserved words are only enforced if ecmaVersion >= 5.
  // Set `allowReserved` to a boolean value to explicitly turn this on
  // an off. When this option has the value "never", reserved words
  // and keywords can also not be used as property names.
  allowReserved: null,
  // When enabled, a return at the top level is not considered an
  // error.
  allowReturnOutsideFunction: !1,
  // When enabled, import/export statements are not constrained to
  // appearing at the top of the program, and an import.meta expression
  // in a script isn't considered an error.
  allowImportExportEverywhere: !1,
  // By default, await identifiers are allowed to appear at the top-level scope only if ecmaVersion >= 2022.
  // When enabled, await identifiers are allowed to appear at the top-level scope,
  // but they are still not allowed in non-async functions.
  allowAwaitOutsideFunction: null,
  // When enabled, super identifiers are not constrained to
  // appearing in methods and do not raise an error when they appear elsewhere.
  allowSuperOutsideMethod: null,
  // When enabled, hashbang directive in the beginning of file is
  // allowed and treated as a line comment. Enabled by default when
  // `ecmaVersion` >= 2023.
  allowHashBang: !1,
  // By default, the parser will verify that private properties are
  // only used in places where they are valid and have been declared.
  // Set this to false to turn such checks off.
  checkPrivateFields: !0,
  // When `locations` is on, `loc` properties holding objects with
  // `start` and `end` properties in `{line, column}` form (with
  // line being 1-based and column 0-based) will be attached to the
  // nodes.
  locations: !1,
  // A function can be passed as `onToken` option, which will
  // cause Acorn to call that function with object in the same
  // format as tokens returned from `tokenizer().getToken()`. Note
  // that you are not allowed to call the parser from the
  // callback—that will corrupt its internal state.
  onToken: null,
  // A function can be passed as `onComment` option, which will
  // cause Acorn to call that function with `(block, text, start,
  // end)` parameters whenever a comment is skipped. `block` is a
  // boolean indicating whether this is a block (`/* */`) comment,
  // `text` is the content of the comment, and `start` and `end` are
  // character offsets that denote the start and end of the comment.
  // When the `locations` option is on, two more parameters are
  // passed, the full `{line, column}` locations of the start and
  // end of the comments. Note that you are not allowed to call the
  // parser from the callback—that will corrupt its internal state.
  // When this option has an array as value, objects representing the
  // comments are pushed to it.
  onComment: null,
  // Nodes have their start and end characters offsets recorded in
  // `start` and `end` properties (directly on the node, rather than
  // the `loc` object, which holds line/column data. To also add a
  // [semi-standardized][range] `range` property holding a `[start,
  // end]` array with the same numbers, set the `ranges` option to
  // `true`.
  //
  // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
  ranges: !1,
  // It is possible to parse multiple files into a single AST by
  // passing the tree produced by parsing the first file as
  // `program` option in subsequent parses. This will add the
  // toplevel forms of the parsed file to the `Program` (top) node
  // of an existing parse tree.
  program: null,
  // When `locations` is on, you can pass this to record the source
  // file in every node's `loc` object.
  sourceFile: null,
  // This value, if given, is stored in every node, whether
  // `locations` is on or off.
  directSourceFile: null,
  // When enabled, parenthesized expressions are represented by
  // (non-standard) ParenthesizedExpression nodes
  preserveParens: !1
}, qt = !1;
function $r(e) {
  var t = {};
  for (var r in xt)
    t[r] = e && Te(e, r) ? e[r] : xt[r];
  if (t.ecmaVersion === "latest" ? t.ecmaVersion = 1e8 : t.ecmaVersion == null ? (!qt && typeof console == "object" && console.warn && (qt = !0, console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)), t.ecmaVersion = 11) : t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009), t.allowReserved == null && (t.allowReserved = t.ecmaVersion < 5), (!e || e.allowHashBang == null) && (t.allowHashBang = t.ecmaVersion >= 14), Ut(t.onToken)) {
    var i = t.onToken;
    t.onToken = function(a) {
      return i.push(a);
    };
  }
  return Ut(t.onComment) && (t.onComment = qr(t, t.onComment)), t;
}
function qr(e, t) {
  return function(r, i, a, s, n, u) {
    var l = {
      type: r ? "Block" : "Line",
      value: i,
      start: a,
      end: s
    };
    e.locations && (l.loc = new it(this, n, u)), e.ranges && (l.range = [a, s]), t.push(l);
  };
}
var Fe = 1, Ve = 2, At = 4, si = 8, Pt = 16, ni = 32, rt = 64, oi = 128, ke = 256, Ue = 512, at = Fe | Ve | ke;
function Lt(e, t) {
  return Ve | (e ? At : 0) | (t ? si : 0);
}
var Ye = 0, Tt = 1, he = 2, ui = 3, li = 4, ci = 5, N = function(t, r, i) {
  this.options = t = $r(t), this.sourceFile = t.sourceFile, this.keywords = pe(Rr[t.ecmaVersion >= 6 ? 6 : t.sourceType === "module" ? "5module" : 5]);
  var a = "";
  t.allowReserved !== !0 && (a = ht[t.ecmaVersion >= 6 ? 6 : t.ecmaVersion === 5 ? 5 : 3], t.sourceType === "module" && (a += " await")), this.reservedWords = pe(a);
  var s = (a ? a + " " : "") + ht.strict;
  this.reservedWordsStrict = pe(s), this.reservedWordsStrictBind = pe(s + " " + ht.strictBind), this.input = String(r), this.containsEsc = !1, i ? (this.pos = i, this.lineStart = this.input.lastIndexOf(`
`, i - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(Z).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = o.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = t.sourceType === "module", this.strict = this.inModule || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.potentialArrowInForAwait = !1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = /* @__PURE__ */ Object.create(null), this.pos === 0 && t.allowHashBang && this.input.slice(0, 2) === "#!" && this.skipLineComment(2), this.scopeStack = [], this.enterScope(Fe), this.regexpState = null, this.privateNameStack = [];
}, re = { inFunction: { configurable: !0 }, inGenerator: { configurable: !0 }, inAsync: { configurable: !0 }, canAwait: { configurable: !0 }, allowSuper: { configurable: !0 }, allowDirectSuper: { configurable: !0 }, treatFunctionsAsVar: { configurable: !0 }, allowNewDotTarget: { configurable: !0 }, inClassStaticBlock: { configurable: !0 } };
N.prototype.parse = function() {
  var t = this.options.program || this.startNode();
  return this.nextToken(), this.parseTopLevel(t);
};
re.inFunction.get = function() {
  return (this.currentVarScope().flags & Ve) > 0;
};
re.inGenerator.get = function() {
  return (this.currentVarScope().flags & si) > 0;
};
re.inAsync.get = function() {
  return (this.currentVarScope().flags & At) > 0;
};
re.canAwait.get = function() {
  for (var e = this.scopeStack.length - 1; e >= 0; e--) {
    var t = this.scopeStack[e], r = t.flags;
    if (r & (ke | Ue))
      return !1;
    if (r & Ve)
      return (r & At) > 0;
  }
  return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
};
re.allowSuper.get = function() {
  var e = this.currentThisScope(), t = e.flags;
  return (t & rt) > 0 || this.options.allowSuperOutsideMethod;
};
re.allowDirectSuper.get = function() {
  return (this.currentThisScope().flags & oi) > 0;
};
re.treatFunctionsAsVar.get = function() {
  return this.treatFunctionsAsVarInScope(this.currentScope());
};
re.allowNewDotTarget.get = function() {
  for (var e = this.scopeStack.length - 1; e >= 0; e--) {
    var t = this.scopeStack[e], r = t.flags;
    if (r & (ke | Ue) || r & Ve && !(r & Pt))
      return !0;
  }
  return !1;
};
re.inClassStaticBlock.get = function() {
  return (this.currentVarScope().flags & ke) > 0;
};
N.extend = function() {
  for (var t = [], r = arguments.length; r--; ) t[r] = arguments[r];
  for (var i = this, a = 0; a < t.length; a++)
    i = t[a](i);
  return i;
};
N.parse = function(t, r) {
  return new this(r, t).parse();
};
N.parseExpressionAt = function(t, r, i) {
  var a = new this(i, t, r);
  return a.nextToken(), a.parseExpression();
};
N.tokenizer = function(t, r) {
  return new this(r, t);
};
Object.defineProperties(N.prototype, re);
var M = N.prototype, Wr = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
M.strictDirective = function(e) {
  if (this.options.ecmaVersion < 5)
    return !1;
  for (; ; ) {
    X.lastIndex = e, e += X.exec(this.input)[0].length;
    var t = Wr.exec(this.input.slice(e));
    if (!t)
      return !1;
    if ((t[1] || t[2]) === "use strict") {
      X.lastIndex = e + t[0].length;
      var r = X.exec(this.input), i = r.index + r[0].length, a = this.input.charAt(i);
      return a === ";" || a === "}" || Z.test(r[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(a) || a === "!" && this.input.charAt(i + 1) === "=");
    }
    e += t[0].length, X.lastIndex = e, e += X.exec(this.input)[0].length, this.input[e] === ";" && e++;
  }
};
M.eat = function(e) {
  return this.type === e ? (this.next(), !0) : !1;
};
M.isContextual = function(e) {
  return this.type === o.name && this.value === e && !this.containsEsc;
};
M.eatContextual = function(e) {
  return this.isContextual(e) ? (this.next(), !0) : !1;
};
M.expectContextual = function(e) {
  this.eatContextual(e) || this.unexpected();
};
M.canInsertSemicolon = function() {
  return this.type === o.eof || this.type === o.braceR || Z.test(this.input.slice(this.lastTokEnd, this.start));
};
M.insertSemicolon = function() {
  if (this.canInsertSemicolon())
    return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), !0;
};
M.semicolon = function() {
  !this.eat(o.semi) && !this.insertSemicolon() && this.unexpected();
};
M.afterTrailingComma = function(e, t) {
  if (this.type === e)
    return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), t || this.next(), !0;
};
M.expect = function(e) {
  this.eat(e) || this.unexpected();
};
M.unexpected = function(e) {
  this.raise(e ?? this.start, "Unexpected token");
};
var st = function() {
  this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
};
M.checkPatternErrors = function(e, t) {
  if (e) {
    e.trailingComma > -1 && this.raiseRecoverable(e.trailingComma, "Comma is not permitted after the rest element");
    var r = t ? e.parenthesizedAssign : e.parenthesizedBind;
    r > -1 && this.raiseRecoverable(r, t ? "Assigning to rvalue" : "Parenthesized pattern");
  }
};
M.checkExpressionErrors = function(e, t) {
  if (!e)
    return !1;
  var r = e.shorthandAssign, i = e.doubleProto;
  if (!t)
    return r >= 0 || i >= 0;
  r >= 0 && this.raise(r, "Shorthand property assignments are valid only in destructuring patterns"), i >= 0 && this.raiseRecoverable(i, "Redefinition of __proto__ property");
};
M.checkYieldAwaitInDefaultParams = function() {
  this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"), this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value");
};
M.isSimpleAssignTarget = function(e) {
  return e.type === "ParenthesizedExpression" ? this.isSimpleAssignTarget(e.expression) : e.type === "Identifier" || e.type === "MemberExpression";
};
var m = N.prototype;
m.parseTopLevel = function(e) {
  var t = /* @__PURE__ */ Object.create(null);
  for (e.body || (e.body = []); this.type !== o.eof; ) {
    var r = this.parseStatement(null, !0, t);
    e.body.push(r);
  }
  if (this.inModule)
    for (var i = 0, a = Object.keys(this.undefinedExports); i < a.length; i += 1) {
      var s = a[i];
      this.raiseRecoverable(this.undefinedExports[s].start, "Export '" + s + "' is not defined");
    }
  return this.adaptDirectivePrologue(e.body), this.next(), e.sourceType = this.options.sourceType, this.finishNode(e, "Program");
};
var Vt = { kind: "loop" }, zr = { kind: "switch" };
m.isLet = function(e) {
  if (this.options.ecmaVersion < 6 || !this.isContextual("let"))
    return !1;
  X.lastIndex = this.pos;
  var t = X.exec(this.input), r = this.pos + t[0].length, i = this.input.charCodeAt(r);
  if (i === 91 || i === 92)
    return !0;
  if (e)
    return !1;
  if (i === 123 || i > 55295 && i < 56320)
    return !0;
  if (oe(i, !0)) {
    for (var a = r + 1; _e(i = this.input.charCodeAt(a), !0); )
      ++a;
    if (i === 92 || i > 55295 && i < 56320)
      return !0;
    var s = this.input.slice(r, a);
    if (!Br.test(s))
      return !0;
  }
  return !1;
};
m.isAsyncFunction = function() {
  if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
    return !1;
  X.lastIndex = this.pos;
  var e = X.exec(this.input), t = this.pos + e[0].length, r;
  return !Z.test(this.input.slice(this.pos, t)) && this.input.slice(t, t + 8) === "function" && (t + 8 === this.input.length || !(_e(r = this.input.charCodeAt(t + 8)) || r > 55295 && r < 56320));
};
m.parseStatement = function(e, t, r) {
  var i = this.type, a = this.startNode(), s;
  switch (this.isLet(e) && (i = o._var, s = "let"), i) {
    case o._break:
    case o._continue:
      return this.parseBreakContinueStatement(a, i.keyword);
    case o._debugger:
      return this.parseDebuggerStatement(a);
    case o._do:
      return this.parseDoStatement(a);
    case o._for:
      return this.parseForStatement(a);
    case o._function:
      return e && (this.strict || e !== "if" && e !== "label") && this.options.ecmaVersion >= 6 && this.unexpected(), this.parseFunctionStatement(a, !1, !e);
    case o._class:
      return e && this.unexpected(), this.parseClass(a, !0);
    case o._if:
      return this.parseIfStatement(a);
    case o._return:
      return this.parseReturnStatement(a);
    case o._switch:
      return this.parseSwitchStatement(a);
    case o._throw:
      return this.parseThrowStatement(a);
    case o._try:
      return this.parseTryStatement(a);
    case o._const:
    case o._var:
      return s = s || this.value, e && s !== "var" && this.unexpected(), this.parseVarStatement(a, s);
    case o._while:
      return this.parseWhileStatement(a);
    case o._with:
      return this.parseWithStatement(a);
    case o.braceL:
      return this.parseBlock(!0, a);
    case o.semi:
      return this.parseEmptyStatement(a);
    case o._export:
    case o._import:
      if (this.options.ecmaVersion > 10 && i === o._import) {
        X.lastIndex = this.pos;
        var n = X.exec(this.input), u = this.pos + n[0].length, l = this.input.charCodeAt(u);
        if (l === 40 || l === 46)
          return this.parseExpressionStatement(a, this.parseExpression());
      }
      return this.options.allowImportExportEverywhere || (t || this.raise(this.start, "'import' and 'export' may only appear at the top level"), this.inModule || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")), i === o._import ? this.parseImport(a) : this.parseExport(a, r);
    // If the statement does not start with a statement keyword or a
    // brace, it's an ExpressionStatement or LabeledStatement. We
    // simply start parsing an expression, and afterwards, if the
    // next token is a colon and the expression was a simple
    // Identifier node, we switch to interpreting it as a label.
    default:
      if (this.isAsyncFunction())
        return e && this.unexpected(), this.next(), this.parseFunctionStatement(a, !0, !e);
      var c = this.value, f = this.parseExpression();
      return i === o.name && f.type === "Identifier" && this.eat(o.colon) ? this.parseLabeledStatement(a, c, f, e) : this.parseExpressionStatement(a, f);
  }
};
m.parseBreakContinueStatement = function(e, t) {
  var r = t === "break";
  this.next(), this.eat(o.semi) || this.insertSemicolon() ? e.label = null : this.type !== o.name ? this.unexpected() : (e.label = this.parseIdent(), this.semicolon());
  for (var i = 0; i < this.labels.length; ++i) {
    var a = this.labels[i];
    if ((e.label == null || a.name === e.label.name) && (a.kind != null && (r || a.kind === "loop") || e.label && r))
      break;
  }
  return i === this.labels.length && this.raise(e.start, "Unsyntactic " + t), this.finishNode(e, r ? "BreakStatement" : "ContinueStatement");
};
m.parseDebuggerStatement = function(e) {
  return this.next(), this.semicolon(), this.finishNode(e, "DebuggerStatement");
};
m.parseDoStatement = function(e) {
  return this.next(), this.labels.push(Vt), e.body = this.parseStatement("do"), this.labels.pop(), this.expect(o._while), e.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(o.semi) : this.semicolon(), this.finishNode(e, "DoWhileStatement");
};
m.parseForStatement = function(e) {
  this.next();
  var t = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
  if (this.labels.push(Vt), this.enterScope(0), this.expect(o.parenL), this.type === o.semi)
    return t > -1 && this.unexpected(t), this.parseFor(e, null);
  var r = this.isLet();
  if (this.type === o._var || this.type === o._const || r) {
    var i = this.startNode(), a = r ? "let" : this.value;
    return this.next(), this.parseVar(i, !0, a), this.finishNode(i, "VariableDeclaration"), (this.type === o._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && i.declarations.length === 1 ? (this.options.ecmaVersion >= 9 && (this.type === o._in ? t > -1 && this.unexpected(t) : e.await = t > -1), this.parseForIn(e, i)) : (t > -1 && this.unexpected(t), this.parseFor(e, i));
  }
  var s = this.isContextual("let"), n = !1, u = this.containsEsc, l = new st(), c = this.start, f = t > -1 ? this.parseExprSubscripts(l, "await") : this.parseExpression(!0, l);
  return this.type === o._in || (n = this.options.ecmaVersion >= 6 && this.isContextual("of")) ? (t > -1 ? (this.type === o._in && this.unexpected(t), e.await = !0) : n && this.options.ecmaVersion >= 8 && (f.start === c && !u && f.type === "Identifier" && f.name === "async" ? this.unexpected() : this.options.ecmaVersion >= 9 && (e.await = !1)), s && n && this.raise(f.start, "The left-hand side of a for-of loop may not start with 'let'."), this.toAssignable(f, !1, l), this.checkLValPattern(f), this.parseForIn(e, f)) : (this.checkExpressionErrors(l, !0), t > -1 && this.unexpected(t), this.parseFor(e, f));
};
m.parseFunctionStatement = function(e, t, r) {
  return this.next(), this.parseFunction(e, Be | (r ? 0 : bt), !1, t);
};
m.parseIfStatement = function(e) {
  return this.next(), e.test = this.parseParenExpression(), e.consequent = this.parseStatement("if"), e.alternate = this.eat(o._else) ? this.parseStatement("if") : null, this.finishNode(e, "IfStatement");
};
m.parseReturnStatement = function(e) {
  return !this.inFunction && !this.options.allowReturnOutsideFunction && this.raise(this.start, "'return' outside of function"), this.next(), this.eat(o.semi) || this.insertSemicolon() ? e.argument = null : (e.argument = this.parseExpression(), this.semicolon()), this.finishNode(e, "ReturnStatement");
};
m.parseSwitchStatement = function(e) {
  this.next(), e.discriminant = this.parseParenExpression(), e.cases = [], this.expect(o.braceL), this.labels.push(zr), this.enterScope(0);
  for (var t, r = !1; this.type !== o.braceR; )
    if (this.type === o._case || this.type === o._default) {
      var i = this.type === o._case;
      t && this.finishNode(t, "SwitchCase"), e.cases.push(t = this.startNode()), t.consequent = [], this.next(), i ? t.test = this.parseExpression() : (r && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"), r = !0, t.test = null), this.expect(o.colon);
    } else
      t || this.unexpected(), t.consequent.push(this.parseStatement(null));
  return this.exitScope(), t && this.finishNode(t, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(e, "SwitchStatement");
};
m.parseThrowStatement = function(e) {
  return this.next(), Z.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"), e.argument = this.parseExpression(), this.semicolon(), this.finishNode(e, "ThrowStatement");
};
var Gr = [];
m.parseCatchClauseParam = function() {
  var e = this.parseBindingAtom(), t = e.type === "Identifier";
  return this.enterScope(t ? ni : 0), this.checkLValPattern(e, t ? li : he), this.expect(o.parenR), e;
};
m.parseTryStatement = function(e) {
  if (this.next(), e.block = this.parseBlock(), e.handler = null, this.type === o._catch) {
    var t = this.startNode();
    this.next(), this.eat(o.parenL) ? t.param = this.parseCatchClauseParam() : (this.options.ecmaVersion < 10 && this.unexpected(), t.param = null, this.enterScope(0)), t.body = this.parseBlock(!1), this.exitScope(), e.handler = this.finishNode(t, "CatchClause");
  }
  return e.finalizer = this.eat(o._finally) ? this.parseBlock() : null, !e.handler && !e.finalizer && this.raise(e.start, "Missing catch or finally clause"), this.finishNode(e, "TryStatement");
};
m.parseVarStatement = function(e, t, r) {
  return this.next(), this.parseVar(e, !1, t, r), this.semicolon(), this.finishNode(e, "VariableDeclaration");
};
m.parseWhileStatement = function(e) {
  return this.next(), e.test = this.parseParenExpression(), this.labels.push(Vt), e.body = this.parseStatement("while"), this.labels.pop(), this.finishNode(e, "WhileStatement");
};
m.parseWithStatement = function(e) {
  return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), e.object = this.parseParenExpression(), e.body = this.parseStatement("with"), this.finishNode(e, "WithStatement");
};
m.parseEmptyStatement = function(e) {
  return this.next(), this.finishNode(e, "EmptyStatement");
};
m.parseLabeledStatement = function(e, t, r, i) {
  for (var a = 0, s = this.labels; a < s.length; a += 1) {
    var n = s[a];
    n.name === t && this.raise(r.start, "Label '" + t + "' is already declared");
  }
  for (var u = this.type.isLoop ? "loop" : this.type === o._switch ? "switch" : null, l = this.labels.length - 1; l >= 0; l--) {
    var c = this.labels[l];
    if (c.statementStart === e.start)
      c.statementStart = this.start, c.kind = u;
    else
      break;
  }
  return this.labels.push({ name: t, kind: u, statementStart: this.start }), e.body = this.parseStatement(i ? i.indexOf("label") === -1 ? i + "label" : i : "label"), this.labels.pop(), e.label = r, this.finishNode(e, "LabeledStatement");
};
m.parseExpressionStatement = function(e, t) {
  return e.expression = t, this.semicolon(), this.finishNode(e, "ExpressionStatement");
};
m.parseBlock = function(e, t, r) {
  for (e === void 0 && (e = !0), t === void 0 && (t = this.startNode()), t.body = [], this.expect(o.braceL), e && this.enterScope(0); this.type !== o.braceR; ) {
    var i = this.parseStatement(null);
    t.body.push(i);
  }
  return r && (this.strict = !1), this.next(), e && this.exitScope(), this.finishNode(t, "BlockStatement");
};
m.parseFor = function(e, t) {
  return e.init = t, this.expect(o.semi), e.test = this.type === o.semi ? null : this.parseExpression(), this.expect(o.semi), e.update = this.type === o.parenR ? null : this.parseExpression(), this.expect(o.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, "ForStatement");
};
m.parseForIn = function(e, t) {
  var r = this.type === o._in;
  return this.next(), t.type === "VariableDeclaration" && t.declarations[0].init != null && (!r || this.options.ecmaVersion < 8 || this.strict || t.kind !== "var" || t.declarations[0].id.type !== "Identifier") && this.raise(
    t.start,
    (r ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"
  ), e.left = t, e.right = r ? this.parseExpression() : this.parseMaybeAssign(), this.expect(o.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, r ? "ForInStatement" : "ForOfStatement");
};
m.parseVar = function(e, t, r, i) {
  for (e.declarations = [], e.kind = r; ; ) {
    var a = this.startNode();
    if (this.parseVarId(a, r), this.eat(o.eq) ? a.init = this.parseMaybeAssign(t) : !i && r === "const" && !(this.type === o._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) ? this.unexpected() : !i && a.id.type !== "Identifier" && !(t && (this.type === o._in || this.isContextual("of"))) ? this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : a.init = null, e.declarations.push(this.finishNode(a, "VariableDeclarator")), !this.eat(o.comma))
      break;
  }
  return e;
};
m.parseVarId = function(e, t) {
  e.id = this.parseBindingAtom(), this.checkLValPattern(e.id, t === "var" ? Tt : he, !1);
};
var Be = 1, bt = 2, fi = 4;
m.parseFunction = function(e, t, r, i, a) {
  this.initFunction(e), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !i) && (this.type === o.star && t & bt && this.unexpected(), e.generator = this.eat(o.star)), this.options.ecmaVersion >= 8 && (e.async = !!i), t & Be && (e.id = t & fi && this.type !== o.name ? null : this.parseIdent(), e.id && !(t & bt) && this.checkLValSimple(e.id, this.strict || e.generator || e.async ? this.treatFunctionsAsVar ? Tt : he : ui));
  var s = this.yieldPos, n = this.awaitPos, u = this.awaitIdentPos;
  return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(Lt(e.async, e.generator)), t & Be || (e.id = this.type === o.name ? this.parseIdent() : null), this.parseFunctionParams(e), this.parseFunctionBody(e, r, !1, a), this.yieldPos = s, this.awaitPos = n, this.awaitIdentPos = u, this.finishNode(e, t & Be ? "FunctionDeclaration" : "FunctionExpression");
};
m.parseFunctionParams = function(e) {
  this.expect(o.parenL), e.params = this.parseBindingList(o.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
};
m.parseClass = function(e, t) {
  this.next();
  var r = this.strict;
  this.strict = !0, this.parseClassId(e, t), this.parseClassSuper(e);
  var i = this.enterClassBody(), a = this.startNode(), s = !1;
  for (a.body = [], this.expect(o.braceL); this.type !== o.braceR; ) {
    var n = this.parseClassElement(e.superClass !== null);
    n && (a.body.push(n), n.type === "MethodDefinition" && n.kind === "constructor" ? (s && this.raiseRecoverable(n.start, "Duplicate constructor in the same class"), s = !0) : n.key && n.key.type === "PrivateIdentifier" && Hr(i, n) && this.raiseRecoverable(n.key.start, "Identifier '#" + n.key.name + "' has already been declared"));
  }
  return this.strict = r, this.next(), e.body = this.finishNode(a, "ClassBody"), this.exitClassBody(), this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression");
};
m.parseClassElement = function(e) {
  if (this.eat(o.semi))
    return null;
  var t = this.options.ecmaVersion, r = this.startNode(), i = "", a = !1, s = !1, n = "method", u = !1;
  if (this.eatContextual("static")) {
    if (t >= 13 && this.eat(o.braceL))
      return this.parseClassStaticBlock(r), r;
    this.isClassElementNameStart() || this.type === o.star ? u = !0 : i = "static";
  }
  if (r.static = u, !i && t >= 8 && this.eatContextual("async") && ((this.isClassElementNameStart() || this.type === o.star) && !this.canInsertSemicolon() ? s = !0 : i = "async"), !i && (t >= 9 || !s) && this.eat(o.star) && (a = !0), !i && !s && !a) {
    var l = this.value;
    (this.eatContextual("get") || this.eatContextual("set")) && (this.isClassElementNameStart() ? n = l : i = l);
  }
  if (i ? (r.computed = !1, r.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc), r.key.name = i, this.finishNode(r.key, "Identifier")) : this.parseClassElementName(r), t < 13 || this.type === o.parenL || n !== "method" || a || s) {
    var c = !r.static && Ze(r, "constructor"), f = c && e;
    c && n !== "method" && this.raise(r.key.start, "Constructor can't have get/set modifier"), r.kind = c ? "constructor" : n, this.parseClassMethod(r, a, s, f);
  } else
    this.parseClassField(r);
  return r;
};
m.isClassElementNameStart = function() {
  return this.type === o.name || this.type === o.privateId || this.type === o.num || this.type === o.string || this.type === o.bracketL || this.type.keyword;
};
m.parseClassElementName = function(e) {
  this.type === o.privateId ? (this.value === "constructor" && this.raise(this.start, "Classes can't have an element named '#constructor'"), e.computed = !1, e.key = this.parsePrivateIdent()) : this.parsePropertyName(e);
};
m.parseClassMethod = function(e, t, r, i) {
  var a = e.key;
  e.kind === "constructor" ? (t && this.raise(a.start, "Constructor can't be a generator"), r && this.raise(a.start, "Constructor can't be an async method")) : e.static && Ze(e, "prototype") && this.raise(a.start, "Classes may not have a static property named prototype");
  var s = e.value = this.parseMethod(t, r, i);
  return e.kind === "get" && s.params.length !== 0 && this.raiseRecoverable(s.start, "getter should have no params"), e.kind === "set" && s.params.length !== 1 && this.raiseRecoverable(s.start, "setter should have exactly one param"), e.kind === "set" && s.params[0].type === "RestElement" && this.raiseRecoverable(s.params[0].start, "Setter cannot use rest params"), this.finishNode(e, "MethodDefinition");
};
m.parseClassField = function(e) {
  return Ze(e, "constructor") ? this.raise(e.key.start, "Classes can't have a field named 'constructor'") : e.static && Ze(e, "prototype") && this.raise(e.key.start, "Classes can't have a static field named 'prototype'"), this.eat(o.eq) ? (this.enterScope(Ue | rt), e.value = this.parseMaybeAssign(), this.exitScope()) : e.value = null, this.semicolon(), this.finishNode(e, "PropertyDefinition");
};
m.parseClassStaticBlock = function(e) {
  e.body = [];
  var t = this.labels;
  for (this.labels = [], this.enterScope(ke | rt); this.type !== o.braceR; ) {
    var r = this.parseStatement(null);
    e.body.push(r);
  }
  return this.next(), this.exitScope(), this.labels = t, this.finishNode(e, "StaticBlock");
};
m.parseClassId = function(e, t) {
  this.type === o.name ? (e.id = this.parseIdent(), t && this.checkLValSimple(e.id, he, !1)) : (t === !0 && this.unexpected(), e.id = null);
};
m.parseClassSuper = function(e) {
  e.superClass = this.eat(o._extends) ? this.parseExprSubscripts(null, !1) : null;
};
m.enterClassBody = function() {
  var e = { declared: /* @__PURE__ */ Object.create(null), used: [] };
  return this.privateNameStack.push(e), e.declared;
};
m.exitClassBody = function() {
  var e = this.privateNameStack.pop(), t = e.declared, r = e.used;
  if (this.options.checkPrivateFields)
    for (var i = this.privateNameStack.length, a = i === 0 ? null : this.privateNameStack[i - 1], s = 0; s < r.length; ++s) {
      var n = r[s];
      Te(t, n.name) || (a ? a.used.push(n) : this.raiseRecoverable(n.start, "Private field '#" + n.name + "' must be declared in an enclosing class"));
    }
};
function Hr(e, t) {
  var r = t.key.name, i = e[r], a = "true";
  return t.type === "MethodDefinition" && (t.kind === "get" || t.kind === "set") && (a = (t.static ? "s" : "i") + t.kind), i === "iget" && a === "iset" || i === "iset" && a === "iget" || i === "sget" && a === "sset" || i === "sset" && a === "sget" ? (e[r] = "true", !1) : i ? !0 : (e[r] = a, !1);
}
function Ze(e, t) {
  var r = e.computed, i = e.key;
  return !r && (i.type === "Identifier" && i.name === t || i.type === "Literal" && i.value === t);
}
m.parseExportAllDeclaration = function(e, t) {
  return this.options.ecmaVersion >= 11 && (this.eatContextual("as") ? (e.exported = this.parseModuleExportName(), this.checkExport(t, e.exported, this.lastTokStart)) : e.exported = null), this.expectContextual("from"), this.type !== o.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, "ExportAllDeclaration");
};
m.parseExport = function(e, t) {
  if (this.next(), this.eat(o.star))
    return this.parseExportAllDeclaration(e, t);
  if (this.eat(o._default))
    return this.checkExport(t, "default", this.lastTokStart), e.declaration = this.parseExportDefaultDeclaration(), this.finishNode(e, "ExportDefaultDeclaration");
  if (this.shouldParseExportStatement())
    e.declaration = this.parseExportDeclaration(e), e.declaration.type === "VariableDeclaration" ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id, e.declaration.id.start), e.specifiers = [], e.source = null, this.options.ecmaVersion >= 16 && (e.attributes = []);
  else {
    if (e.declaration = null, e.specifiers = this.parseExportSpecifiers(t), this.eatContextual("from"))
      this.type !== o.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause());
    else {
      for (var r = 0, i = e.specifiers; r < i.length; r += 1) {
        var a = i[r];
        this.checkUnreserved(a.local), this.checkLocalExport(a.local), a.local.type === "Literal" && this.raise(a.local.start, "A string literal cannot be used as an exported binding without `from`.");
      }
      e.source = null, this.options.ecmaVersion >= 16 && (e.attributes = []);
    }
    this.semicolon();
  }
  return this.finishNode(e, "ExportNamedDeclaration");
};
m.parseExportDeclaration = function(e) {
  return this.parseStatement(null);
};
m.parseExportDefaultDeclaration = function() {
  var e;
  if (this.type === o._function || (e = this.isAsyncFunction())) {
    var t = this.startNode();
    return this.next(), e && this.next(), this.parseFunction(t, Be | fi, !1, e);
  } else if (this.type === o._class) {
    var r = this.startNode();
    return this.parseClass(r, "nullableID");
  } else {
    var i = this.parseMaybeAssign();
    return this.semicolon(), i;
  }
};
m.checkExport = function(e, t, r) {
  e && (typeof t != "string" && (t = t.type === "Identifier" ? t.name : t.value), Te(e, t) && this.raiseRecoverable(r, "Duplicate export '" + t + "'"), e[t] = !0);
};
m.checkPatternExport = function(e, t) {
  var r = t.type;
  if (r === "Identifier")
    this.checkExport(e, t, t.start);
  else if (r === "ObjectPattern")
    for (var i = 0, a = t.properties; i < a.length; i += 1) {
      var s = a[i];
      this.checkPatternExport(e, s);
    }
  else if (r === "ArrayPattern")
    for (var n = 0, u = t.elements; n < u.length; n += 1) {
      var l = u[n];
      l && this.checkPatternExport(e, l);
    }
  else r === "Property" ? this.checkPatternExport(e, t.value) : r === "AssignmentPattern" ? this.checkPatternExport(e, t.left) : r === "RestElement" && this.checkPatternExport(e, t.argument);
};
m.checkVariableExport = function(e, t) {
  if (e)
    for (var r = 0, i = t; r < i.length; r += 1) {
      var a = i[r];
      this.checkPatternExport(e, a.id);
    }
};
m.shouldParseExportStatement = function() {
  return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
};
m.parseExportSpecifier = function(e) {
  var t = this.startNode();
  return t.local = this.parseModuleExportName(), t.exported = this.eatContextual("as") ? this.parseModuleExportName() : t.local, this.checkExport(
    e,
    t.exported,
    t.exported.start
  ), this.finishNode(t, "ExportSpecifier");
};
m.parseExportSpecifiers = function(e) {
  var t = [], r = !0;
  for (this.expect(o.braceL); !this.eat(o.braceR); ) {
    if (r)
      r = !1;
    else if (this.expect(o.comma), this.afterTrailingComma(o.braceR))
      break;
    t.push(this.parseExportSpecifier(e));
  }
  return t;
};
m.parseImport = function(e) {
  return this.next(), this.type === o.string ? (e.specifiers = Gr, e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), e.source = this.type === o.string ? this.parseExprAtom() : this.unexpected()), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, "ImportDeclaration");
};
m.parseImportSpecifier = function() {
  var e = this.startNode();
  return e.imported = this.parseModuleExportName(), this.eatContextual("as") ? e.local = this.parseIdent() : (this.checkUnreserved(e.imported), e.local = e.imported), this.checkLValSimple(e.local, he), this.finishNode(e, "ImportSpecifier");
};
m.parseImportDefaultSpecifier = function() {
  var e = this.startNode();
  return e.local = this.parseIdent(), this.checkLValSimple(e.local, he), this.finishNode(e, "ImportDefaultSpecifier");
};
m.parseImportNamespaceSpecifier = function() {
  var e = this.startNode();
  return this.next(), this.expectContextual("as"), e.local = this.parseIdent(), this.checkLValSimple(e.local, he), this.finishNode(e, "ImportNamespaceSpecifier");
};
m.parseImportSpecifiers = function() {
  var e = [], t = !0;
  if (this.type === o.name && (e.push(this.parseImportDefaultSpecifier()), !this.eat(o.comma)))
    return e;
  if (this.type === o.star)
    return e.push(this.parseImportNamespaceSpecifier()), e;
  for (this.expect(o.braceL); !this.eat(o.braceR); ) {
    if (t)
      t = !1;
    else if (this.expect(o.comma), this.afterTrailingComma(o.braceR))
      break;
    e.push(this.parseImportSpecifier());
  }
  return e;
};
m.parseWithClause = function() {
  var e = [];
  if (!this.eat(o._with))
    return e;
  this.expect(o.braceL);
  for (var t = {}, r = !0; !this.eat(o.braceR); ) {
    if (r)
      r = !1;
    else if (this.expect(o.comma), this.afterTrailingComma(o.braceR))
      break;
    var i = this.parseImportAttribute(), a = i.key.type === "Identifier" ? i.key.name : i.key.value;
    Te(t, a) && this.raiseRecoverable(i.key.start, "Duplicate attribute key '" + a + "'"), t[a] = !0, e.push(i);
  }
  return e;
};
m.parseImportAttribute = function() {
  var e = this.startNode();
  return e.key = this.type === o.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never"), this.expect(o.colon), this.type !== o.string && this.unexpected(), e.value = this.parseExprAtom(), this.finishNode(e, "ImportAttribute");
};
m.parseModuleExportName = function() {
  if (this.options.ecmaVersion >= 13 && this.type === o.string) {
    var e = this.parseLiteral(this.value);
    return Ur.test(e.value) && this.raise(e.start, "An export name cannot include a lone surrogate."), e;
  }
  return this.parseIdent(!0);
};
m.adaptDirectivePrologue = function(e) {
  for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t)
    e[t].directive = e[t].expression.raw.slice(1, -1);
};
m.isDirectiveCandidate = function(e) {
  return this.options.ecmaVersion >= 5 && e.type === "ExpressionStatement" && e.expression.type === "Literal" && typeof e.expression.value == "string" && // Reject parenthesized strings.
  (this.input[e.start] === '"' || this.input[e.start] === "'");
};
var J = N.prototype;
J.toAssignable = function(e, t, r) {
  if (this.options.ecmaVersion >= 6 && e)
    switch (e.type) {
      case "Identifier":
        this.inAsync && e.name === "await" && this.raise(e.start, "Cannot use 'await' as identifier inside an async function");
        break;
      case "ObjectPattern":
      case "ArrayPattern":
      case "AssignmentPattern":
      case "RestElement":
        break;
      case "ObjectExpression":
        e.type = "ObjectPattern", r && this.checkPatternErrors(r, !0);
        for (var i = 0, a = e.properties; i < a.length; i += 1) {
          var s = a[i];
          this.toAssignable(s, t), s.type === "RestElement" && (s.argument.type === "ArrayPattern" || s.argument.type === "ObjectPattern") && this.raise(s.argument.start, "Unexpected token");
        }
        break;
      case "Property":
        e.kind !== "init" && this.raise(e.key.start, "Object pattern can't contain getter or setter"), this.toAssignable(e.value, t);
        break;
      case "ArrayExpression":
        e.type = "ArrayPattern", r && this.checkPatternErrors(r, !0), this.toAssignableList(e.elements, t);
        break;
      case "SpreadElement":
        e.type = "RestElement", this.toAssignable(e.argument, t), e.argument.type === "AssignmentPattern" && this.raise(e.argument.start, "Rest elements cannot have a default value");
        break;
      case "AssignmentExpression":
        e.operator !== "=" && this.raise(e.left.end, "Only '=' operator can be used for specifying default value."), e.type = "AssignmentPattern", delete e.operator, this.toAssignable(e.left, t);
        break;
      case "ParenthesizedExpression":
        this.toAssignable(e.expression, t, r);
        break;
      case "ChainExpression":
        this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
        break;
      case "MemberExpression":
        if (!t)
          break;
      default:
        this.raise(e.start, "Assigning to rvalue");
    }
  else r && this.checkPatternErrors(r, !0);
  return e;
};
J.toAssignableList = function(e, t) {
  for (var r = e.length, i = 0; i < r; i++) {
    var a = e[i];
    a && this.toAssignable(a, t);
  }
  if (r) {
    var s = e[r - 1];
    this.options.ecmaVersion === 6 && t && s && s.type === "RestElement" && s.argument.type !== "Identifier" && this.unexpected(s.argument.start);
  }
  return e;
};
J.parseSpread = function(e) {
  var t = this.startNode();
  return this.next(), t.argument = this.parseMaybeAssign(!1, e), this.finishNode(t, "SpreadElement");
};
J.parseRestBinding = function() {
  var e = this.startNode();
  return this.next(), this.options.ecmaVersion === 6 && this.type !== o.name && this.unexpected(), e.argument = this.parseBindingAtom(), this.finishNode(e, "RestElement");
};
J.parseBindingAtom = function() {
  if (this.options.ecmaVersion >= 6)
    switch (this.type) {
      case o.bracketL:
        var e = this.startNode();
        return this.next(), e.elements = this.parseBindingList(o.bracketR, !0, !0), this.finishNode(e, "ArrayPattern");
      case o.braceL:
        return this.parseObj(!0);
    }
  return this.parseIdent();
};
J.parseBindingList = function(e, t, r, i) {
  for (var a = [], s = !0; !this.eat(e); )
    if (s ? s = !1 : this.expect(o.comma), t && this.type === o.comma)
      a.push(null);
    else {
      if (r && this.afterTrailingComma(e))
        break;
      if (this.type === o.ellipsis) {
        var n = this.parseRestBinding();
        this.parseBindingListItem(n), a.push(n), this.type === o.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.expect(e);
        break;
      } else
        a.push(this.parseAssignableListItem(i));
    }
  return a;
};
J.parseAssignableListItem = function(e) {
  var t = this.parseMaybeDefault(this.start, this.startLoc);
  return this.parseBindingListItem(t), t;
};
J.parseBindingListItem = function(e) {
  return e;
};
J.parseMaybeDefault = function(e, t, r) {
  if (r = r || this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(o.eq))
    return r;
  var i = this.startNodeAt(e, t);
  return i.left = r, i.right = this.parseMaybeAssign(), this.finishNode(i, "AssignmentPattern");
};
J.checkLValSimple = function(e, t, r) {
  t === void 0 && (t = Ye);
  var i = t !== Ye;
  switch (e.type) {
    case "Identifier":
      this.strict && this.reservedWordsStrictBind.test(e.name) && this.raiseRecoverable(e.start, (i ? "Binding " : "Assigning to ") + e.name + " in strict mode"), i && (t === he && e.name === "let" && this.raiseRecoverable(e.start, "let is disallowed as a lexically bound name"), r && (Te(r, e.name) && this.raiseRecoverable(e.start, "Argument name clash"), r[e.name] = !0), t !== ci && this.declareName(e.name, t, e.start));
      break;
    case "ChainExpression":
      this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
      break;
    case "MemberExpression":
      i && this.raiseRecoverable(e.start, "Binding member expression");
      break;
    case "ParenthesizedExpression":
      return i && this.raiseRecoverable(e.start, "Binding parenthesized expression"), this.checkLValSimple(e.expression, t, r);
    default:
      this.raise(e.start, (i ? "Binding" : "Assigning to") + " rvalue");
  }
};
J.checkLValPattern = function(e, t, r) {
  switch (t === void 0 && (t = Ye), e.type) {
    case "ObjectPattern":
      for (var i = 0, a = e.properties; i < a.length; i += 1) {
        var s = a[i];
        this.checkLValInnerPattern(s, t, r);
      }
      break;
    case "ArrayPattern":
      for (var n = 0, u = e.elements; n < u.length; n += 1) {
        var l = u[n];
        l && this.checkLValInnerPattern(l, t, r);
      }
      break;
    default:
      this.checkLValSimple(e, t, r);
  }
};
J.checkLValInnerPattern = function(e, t, r) {
  switch (t === void 0 && (t = Ye), e.type) {
    case "Property":
      this.checkLValInnerPattern(e.value, t, r);
      break;
    case "AssignmentPattern":
      this.checkLValPattern(e.left, t, r);
      break;
    case "RestElement":
      this.checkLValPattern(e.argument, t, r);
      break;
    default:
      this.checkLValPattern(e, t, r);
  }
};
var ee = function(t, r, i, a, s) {
  this.token = t, this.isExpr = !!r, this.preserveSpace = !!i, this.override = a, this.generator = !!s;
}, L = {
  b_stat: new ee("{", !1),
  b_expr: new ee("{", !0),
  b_tmpl: new ee("${", !1),
  p_stat: new ee("(", !1),
  p_expr: new ee("(", !0),
  q_tmpl: new ee("`", !0, !0, function(e) {
    return e.tryReadTemplateToken();
  }),
  f_stat: new ee("function", !1),
  f_expr: new ee("function", !0),
  f_expr_gen: new ee("function", !0, !1, null, !0),
  f_gen: new ee("function", !1, !1, null, !0)
}, Ne = N.prototype;
Ne.initialContext = function() {
  return [L.b_stat];
};
Ne.curContext = function() {
  return this.context[this.context.length - 1];
};
Ne.braceIsBlock = function(e) {
  var t = this.curContext();
  return t === L.f_expr || t === L.f_stat ? !0 : e === o.colon && (t === L.b_stat || t === L.b_expr) ? !t.isExpr : e === o._return || e === o.name && this.exprAllowed ? Z.test(this.input.slice(this.lastTokEnd, this.start)) : e === o._else || e === o.semi || e === o.eof || e === o.parenR || e === o.arrow ? !0 : e === o.braceL ? t === L.b_stat : e === o._var || e === o._const || e === o.name ? !1 : !this.exprAllowed;
};
Ne.inGeneratorContext = function() {
  for (var e = this.context.length - 1; e >= 1; e--) {
    var t = this.context[e];
    if (t.token === "function")
      return t.generator;
  }
  return !1;
};
Ne.updateContext = function(e) {
  var t, r = this.type;
  r.keyword && e === o.dot ? this.exprAllowed = !1 : (t = r.updateContext) ? t.call(this, e) : this.exprAllowed = r.beforeExpr;
};
Ne.overrideContext = function(e) {
  this.curContext() !== e && (this.context[this.context.length - 1] = e);
};
o.parenR.updateContext = o.braceR.updateContext = function() {
  if (this.context.length === 1) {
    this.exprAllowed = !0;
    return;
  }
  var e = this.context.pop();
  e === L.b_stat && this.curContext().token === "function" && (e = this.context.pop()), this.exprAllowed = !e.isExpr;
};
o.braceL.updateContext = function(e) {
  this.context.push(this.braceIsBlock(e) ? L.b_stat : L.b_expr), this.exprAllowed = !0;
};
o.dollarBraceL.updateContext = function() {
  this.context.push(L.b_tmpl), this.exprAllowed = !0;
};
o.parenL.updateContext = function(e) {
  var t = e === o._if || e === o._for || e === o._with || e === o._while;
  this.context.push(t ? L.p_stat : L.p_expr), this.exprAllowed = !0;
};
o.incDec.updateContext = function() {
};
o._function.updateContext = o._class.updateContext = function(e) {
  e.beforeExpr && e !== o._else && !(e === o.semi && this.curContext() !== L.p_stat) && !(e === o._return && Z.test(this.input.slice(this.lastTokEnd, this.start))) && !((e === o.colon || e === o.braceL) && this.curContext() === L.b_stat) ? this.context.push(L.f_expr) : this.context.push(L.f_stat), this.exprAllowed = !1;
};
o.colon.updateContext = function() {
  this.curContext().token === "function" && this.context.pop(), this.exprAllowed = !0;
};
o.backQuote.updateContext = function() {
  this.curContext() === L.q_tmpl ? this.context.pop() : this.context.push(L.q_tmpl), this.exprAllowed = !1;
};
o.star.updateContext = function(e) {
  if (e === o._function) {
    var t = this.context.length - 1;
    this.context[t] === L.f_expr ? this.context[t] = L.f_expr_gen : this.context[t] = L.f_gen;
  }
  this.exprAllowed = !0;
};
o.name.updateContext = function(e) {
  var t = !1;
  this.options.ecmaVersion >= 6 && e !== o.dot && (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) && (t = !0), this.exprAllowed = t;
};
var x = N.prototype;
x.checkPropClash = function(e, t, r) {
  if (!(this.options.ecmaVersion >= 9 && e.type === "SpreadElement") && !(this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))) {
    var i = e.key, a;
    switch (i.type) {
      case "Identifier":
        a = i.name;
        break;
      case "Literal":
        a = String(i.value);
        break;
      default:
        return;
    }
    var s = e.kind;
    if (this.options.ecmaVersion >= 6) {
      a === "__proto__" && s === "init" && (t.proto && (r ? r.doubleProto < 0 && (r.doubleProto = i.start) : this.raiseRecoverable(i.start, "Redefinition of __proto__ property")), t.proto = !0);
      return;
    }
    a = "$" + a;
    var n = t[a];
    if (n) {
      var u;
      s === "init" ? u = this.strict && n.init || n.get || n.set : u = n.init || n[s], u && this.raiseRecoverable(i.start, "Redefinition of property");
    } else
      n = t[a] = {
        init: !1,
        get: !1,
        set: !1
      };
    n[s] = !0;
  }
};
x.parseExpression = function(e, t) {
  var r = this.start, i = this.startLoc, a = this.parseMaybeAssign(e, t);
  if (this.type === o.comma) {
    var s = this.startNodeAt(r, i);
    for (s.expressions = [a]; this.eat(o.comma); )
      s.expressions.push(this.parseMaybeAssign(e, t));
    return this.finishNode(s, "SequenceExpression");
  }
  return a;
};
x.parseMaybeAssign = function(e, t, r) {
  if (this.isContextual("yield")) {
    if (this.inGenerator)
      return this.parseYield(e);
    this.exprAllowed = !1;
  }
  var i = !1, a = -1, s = -1, n = -1;
  t ? (a = t.parenthesizedAssign, s = t.trailingComma, n = t.doubleProto, t.parenthesizedAssign = t.trailingComma = -1) : (t = new st(), i = !0);
  var u = this.start, l = this.startLoc;
  (this.type === o.parenL || this.type === o.name) && (this.potentialArrowAt = this.start, this.potentialArrowInForAwait = e === "await");
  var c = this.parseMaybeConditional(e, t);
  if (r && (c = r.call(this, c, u, l)), this.type.isAssign) {
    var f = this.startNodeAt(u, l);
    return f.operator = this.value, this.type === o.eq && (c = this.toAssignable(c, !1, t)), i || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1), t.shorthandAssign >= c.start && (t.shorthandAssign = -1), this.type === o.eq ? this.checkLValPattern(c) : this.checkLValSimple(c), f.left = c, this.next(), f.right = this.parseMaybeAssign(e), n > -1 && (t.doubleProto = n), this.finishNode(f, "AssignmentExpression");
  } else
    i && this.checkExpressionErrors(t, !0);
  return a > -1 && (t.parenthesizedAssign = a), s > -1 && (t.trailingComma = s), c;
};
x.parseMaybeConditional = function(e, t) {
  var r = this.start, i = this.startLoc, a = this.parseExprOps(e, t);
  if (this.checkExpressionErrors(t))
    return a;
  if (this.eat(o.question)) {
    var s = this.startNodeAt(r, i);
    return s.test = a, s.consequent = this.parseMaybeAssign(), this.expect(o.colon), s.alternate = this.parseMaybeAssign(e), this.finishNode(s, "ConditionalExpression");
  }
  return a;
};
x.parseExprOps = function(e, t) {
  var r = this.start, i = this.startLoc, a = this.parseMaybeUnary(t, !1, !1, e);
  return this.checkExpressionErrors(t) || a.start === r && a.type === "ArrowFunctionExpression" ? a : this.parseExprOp(a, r, i, -1, e);
};
x.parseExprOp = function(e, t, r, i, a) {
  var s = this.type.binop;
  if (s != null && (!a || this.type !== o._in) && s > i) {
    var n = this.type === o.logicalOR || this.type === o.logicalAND, u = this.type === o.coalesce;
    u && (s = o.logicalAND.binop);
    var l = this.value;
    this.next();
    var c = this.start, f = this.startLoc, g = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, a), c, f, s, a), I = this.buildBinary(t, r, e, g, l, n || u);
    return (n && this.type === o.coalesce || u && (this.type === o.logicalOR || this.type === o.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"), this.parseExprOp(I, t, r, i, a);
  }
  return e;
};
x.buildBinary = function(e, t, r, i, a, s) {
  i.type === "PrivateIdentifier" && this.raise(i.start, "Private identifier can only be left side of binary expression");
  var n = this.startNodeAt(e, t);
  return n.left = r, n.operator = a, n.right = i, this.finishNode(n, s ? "LogicalExpression" : "BinaryExpression");
};
x.parseMaybeUnary = function(e, t, r, i) {
  var a = this.start, s = this.startLoc, n;
  if (this.isContextual("await") && this.canAwait)
    n = this.parseAwait(i), t = !0;
  else if (this.type.prefix) {
    var u = this.startNode(), l = this.type === o.incDec;
    u.operator = this.value, u.prefix = !0, this.next(), u.argument = this.parseMaybeUnary(null, !0, l, i), this.checkExpressionErrors(e, !0), l ? this.checkLValSimple(u.argument) : this.strict && u.operator === "delete" && hi(u.argument) ? this.raiseRecoverable(u.start, "Deleting local variable in strict mode") : u.operator === "delete" && vt(u.argument) ? this.raiseRecoverable(u.start, "Private fields can not be deleted") : t = !0, n = this.finishNode(u, l ? "UpdateExpression" : "UnaryExpression");
  } else if (!t && this.type === o.privateId)
    (i || this.privateNameStack.length === 0) && this.options.checkPrivateFields && this.unexpected(), n = this.parsePrivateIdent(), this.type !== o._in && this.unexpected();
  else {
    if (n = this.parseExprSubscripts(e, i), this.checkExpressionErrors(e))
      return n;
    for (; this.type.postfix && !this.canInsertSemicolon(); ) {
      var c = this.startNodeAt(a, s);
      c.operator = this.value, c.prefix = !1, c.argument = n, this.checkLValSimple(n), this.next(), n = this.finishNode(c, "UpdateExpression");
    }
  }
  if (!r && this.eat(o.starstar))
    if (t)
      this.unexpected(this.lastTokStart);
    else
      return this.buildBinary(a, s, n, this.parseMaybeUnary(null, !1, !1, i), "**", !1);
  else
    return n;
};
function hi(e) {
  return e.type === "Identifier" || e.type === "ParenthesizedExpression" && hi(e.expression);
}
function vt(e) {
  return e.type === "MemberExpression" && e.property.type === "PrivateIdentifier" || e.type === "ChainExpression" && vt(e.expression) || e.type === "ParenthesizedExpression" && vt(e.expression);
}
x.parseExprSubscripts = function(e, t) {
  var r = this.start, i = this.startLoc, a = this.parseExprAtom(e, t);
  if (a.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")")
    return a;
  var s = this.parseSubscripts(a, r, i, !1, t);
  return e && s.type === "MemberExpression" && (e.parenthesizedAssign >= s.start && (e.parenthesizedAssign = -1), e.parenthesizedBind >= s.start && (e.parenthesizedBind = -1), e.trailingComma >= s.start && (e.trailingComma = -1)), s;
};
x.parseSubscripts = function(e, t, r, i, a) {
  for (var s = this.options.ecmaVersion >= 8 && e.type === "Identifier" && e.name === "async" && this.lastTokEnd === e.end && !this.canInsertSemicolon() && e.end - e.start === 5 && this.potentialArrowAt === e.start, n = !1; ; ) {
    var u = this.parseSubscript(e, t, r, i, s, n, a);
    if (u.optional && (n = !0), u === e || u.type === "ArrowFunctionExpression") {
      if (n) {
        var l = this.startNodeAt(t, r);
        l.expression = u, u = this.finishNode(l, "ChainExpression");
      }
      return u;
    }
    e = u;
  }
};
x.shouldParseAsyncArrow = function() {
  return !this.canInsertSemicolon() && this.eat(o.arrow);
};
x.parseSubscriptAsyncArrow = function(e, t, r, i) {
  return this.parseArrowExpression(this.startNodeAt(e, t), r, !0, i);
};
x.parseSubscript = function(e, t, r, i, a, s, n) {
  var u = this.options.ecmaVersion >= 11, l = u && this.eat(o.questionDot);
  i && l && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
  var c = this.eat(o.bracketL);
  if (c || l && this.type !== o.parenL && this.type !== o.backQuote || this.eat(o.dot)) {
    var f = this.startNodeAt(t, r);
    f.object = e, c ? (f.property = this.parseExpression(), this.expect(o.bracketR)) : this.type === o.privateId && e.type !== "Super" ? f.property = this.parsePrivateIdent() : f.property = this.parseIdent(this.options.allowReserved !== "never"), f.computed = !!c, u && (f.optional = l), e = this.finishNode(f, "MemberExpression");
  } else if (!i && this.eat(o.parenL)) {
    var g = new st(), I = this.yieldPos, O = this.awaitPos, D = this.awaitIdentPos;
    this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
    var v = this.parseExprList(o.parenR, this.options.ecmaVersion >= 8, !1, g);
    if (a && !l && this.shouldParseAsyncArrow())
      return this.checkPatternErrors(g, !1), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = I, this.awaitPos = O, this.awaitIdentPos = D, this.parseSubscriptAsyncArrow(t, r, v, n);
    this.checkExpressionErrors(g, !0), this.yieldPos = I || this.yieldPos, this.awaitPos = O || this.awaitPos, this.awaitIdentPos = D || this.awaitIdentPos;
    var T = this.startNodeAt(t, r);
    T.callee = e, T.arguments = v, u && (T.optional = l), e = this.finishNode(T, "CallExpression");
  } else if (this.type === o.backQuote) {
    (l || s) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
    var A = this.startNodeAt(t, r);
    A.tag = e, A.quasi = this.parseTemplate({ isTagged: !0 }), e = this.finishNode(A, "TaggedTemplateExpression");
  }
  return e;
};
x.parseExprAtom = function(e, t, r) {
  this.type === o.slash && this.readRegexp();
  var i, a = this.potentialArrowAt === this.start;
  switch (this.type) {
    case o._super:
      return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), i = this.startNode(), this.next(), this.type === o.parenL && !this.allowDirectSuper && this.raise(i.start, "super() call outside constructor of a subclass"), this.type !== o.dot && this.type !== o.bracketL && this.type !== o.parenL && this.unexpected(), this.finishNode(i, "Super");
    case o._this:
      return i = this.startNode(), this.next(), this.finishNode(i, "ThisExpression");
    case o.name:
      var s = this.start, n = this.startLoc, u = this.containsEsc, l = this.parseIdent(!1);
      if (this.options.ecmaVersion >= 8 && !u && l.name === "async" && !this.canInsertSemicolon() && this.eat(o._function))
        return this.overrideContext(L.f_expr), this.parseFunction(this.startNodeAt(s, n), 0, !1, !0, t);
      if (a && !this.canInsertSemicolon()) {
        if (this.eat(o.arrow))
          return this.parseArrowExpression(this.startNodeAt(s, n), [l], !1, t);
        if (this.options.ecmaVersion >= 8 && l.name === "async" && this.type === o.name && !u && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc))
          return l = this.parseIdent(!1), (this.canInsertSemicolon() || !this.eat(o.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAt(s, n), [l], !0, t);
      }
      return l;
    case o.regexp:
      var c = this.value;
      return i = this.parseLiteral(c.value), i.regex = { pattern: c.pattern, flags: c.flags }, i;
    case o.num:
    case o.string:
      return this.parseLiteral(this.value);
    case o._null:
    case o._true:
    case o._false:
      return i = this.startNode(), i.value = this.type === o._null ? null : this.type === o._true, i.raw = this.type.keyword, this.next(), this.finishNode(i, "Literal");
    case o.parenL:
      var f = this.start, g = this.parseParenAndDistinguishExpression(a, t);
      return e && (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(g) && (e.parenthesizedAssign = f), e.parenthesizedBind < 0 && (e.parenthesizedBind = f)), g;
    case o.bracketL:
      return i = this.startNode(), this.next(), i.elements = this.parseExprList(o.bracketR, !0, !0, e), this.finishNode(i, "ArrayExpression");
    case o.braceL:
      return this.overrideContext(L.b_expr), this.parseObj(!1, e);
    case o._function:
      return i = this.startNode(), this.next(), this.parseFunction(i, 0);
    case o._class:
      return this.parseClass(this.startNode(), !1);
    case o._new:
      return this.parseNew();
    case o.backQuote:
      return this.parseTemplate();
    case o._import:
      return this.options.ecmaVersion >= 11 ? this.parseExprImport(r) : this.unexpected();
    default:
      return this.parseExprAtomDefault();
  }
};
x.parseExprAtomDefault = function() {
  this.unexpected();
};
x.parseExprImport = function(e) {
  var t = this.startNode();
  if (this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword import"), this.next(), this.type === o.parenL && !e)
    return this.parseDynamicImport(t);
  if (this.type === o.dot) {
    var r = this.startNodeAt(t.start, t.loc && t.loc.start);
    return r.name = "import", t.meta = this.finishNode(r, "Identifier"), this.parseImportMeta(t);
  } else
    this.unexpected();
};
x.parseDynamicImport = function(e) {
  if (this.next(), e.source = this.parseMaybeAssign(), this.options.ecmaVersion >= 16)
    this.eat(o.parenR) ? e.options = null : (this.expect(o.comma), this.afterTrailingComma(o.parenR) ? e.options = null : (e.options = this.parseMaybeAssign(), this.eat(o.parenR) || (this.expect(o.comma), this.afterTrailingComma(o.parenR) || this.unexpected())));
  else if (!this.eat(o.parenR)) {
    var t = this.start;
    this.eat(o.comma) && this.eat(o.parenR) ? this.raiseRecoverable(t, "Trailing comma is not allowed in import()") : this.unexpected(t);
  }
  return this.finishNode(e, "ImportExpression");
};
x.parseImportMeta = function(e) {
  this.next();
  var t = this.containsEsc;
  return e.property = this.parseIdent(!0), e.property.name !== "meta" && this.raiseRecoverable(e.property.start, "The only valid meta property for import is 'import.meta'"), t && this.raiseRecoverable(e.start, "'import.meta' must not contain escaped characters"), this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere && this.raiseRecoverable(e.start, "Cannot use 'import.meta' outside a module"), this.finishNode(e, "MetaProperty");
};
x.parseLiteral = function(e) {
  var t = this.startNode();
  return t.value = e, t.raw = this.input.slice(this.start, this.end), t.raw.charCodeAt(t.raw.length - 1) === 110 && (t.bigint = t.raw.slice(0, -1).replace(/_/g, "")), this.next(), this.finishNode(t, "Literal");
};
x.parseParenExpression = function() {
  this.expect(o.parenL);
  var e = this.parseExpression();
  return this.expect(o.parenR), e;
};
x.shouldParseArrow = function(e) {
  return !this.canInsertSemicolon();
};
x.parseParenAndDistinguishExpression = function(e, t) {
  var r = this.start, i = this.startLoc, a, s = this.options.ecmaVersion >= 8;
  if (this.options.ecmaVersion >= 6) {
    this.next();
    var n = this.start, u = this.startLoc, l = [], c = !0, f = !1, g = new st(), I = this.yieldPos, O = this.awaitPos, D;
    for (this.yieldPos = 0, this.awaitPos = 0; this.type !== o.parenR; )
      if (c ? c = !1 : this.expect(o.comma), s && this.afterTrailingComma(o.parenR, !0)) {
        f = !0;
        break;
      } else if (this.type === o.ellipsis) {
        D = this.start, l.push(this.parseParenItem(this.parseRestBinding())), this.type === o.comma && this.raiseRecoverable(
          this.start,
          "Comma is not permitted after the rest element"
        );
        break;
      } else
        l.push(this.parseMaybeAssign(!1, g, this.parseParenItem));
    var v = this.lastTokEnd, T = this.lastTokEndLoc;
    if (this.expect(o.parenR), e && this.shouldParseArrow(l) && this.eat(o.arrow))
      return this.checkPatternErrors(g, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = I, this.awaitPos = O, this.parseParenArrowList(r, i, l, t);
    (!l.length || f) && this.unexpected(this.lastTokStart), D && this.unexpected(D), this.checkExpressionErrors(g, !0), this.yieldPos = I || this.yieldPos, this.awaitPos = O || this.awaitPos, l.length > 1 ? (a = this.startNodeAt(n, u), a.expressions = l, this.finishNodeAt(a, "SequenceExpression", v, T)) : a = l[0];
  } else
    a = this.parseParenExpression();
  if (this.options.preserveParens) {
    var A = this.startNodeAt(r, i);
    return A.expression = a, this.finishNode(A, "ParenthesizedExpression");
  } else
    return a;
};
x.parseParenItem = function(e) {
  return e;
};
x.parseParenArrowList = function(e, t, r, i) {
  return this.parseArrowExpression(this.startNodeAt(e, t), r, !1, i);
};
var Kr = [];
x.parseNew = function() {
  this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
  var e = this.startNode();
  if (this.next(), this.options.ecmaVersion >= 6 && this.type === o.dot) {
    var t = this.startNodeAt(e.start, e.loc && e.loc.start);
    t.name = "new", e.meta = this.finishNode(t, "Identifier"), this.next();
    var r = this.containsEsc;
    return e.property = this.parseIdent(!0), e.property.name !== "target" && this.raiseRecoverable(e.property.start, "The only valid meta property for new is 'new.target'"), r && this.raiseRecoverable(e.start, "'new.target' must not contain escaped characters"), this.allowNewDotTarget || this.raiseRecoverable(e.start, "'new.target' can only be used in functions and class static block"), this.finishNode(e, "MetaProperty");
  }
  var i = this.start, a = this.startLoc;
  return e.callee = this.parseSubscripts(this.parseExprAtom(null, !1, !0), i, a, !0, !1), this.eat(o.parenL) ? e.arguments = this.parseExprList(o.parenR, this.options.ecmaVersion >= 8, !1) : e.arguments = Kr, this.finishNode(e, "NewExpression");
};
x.parseTemplateElement = function(e) {
  var t = e.isTagged, r = this.startNode();
  return this.type === o.invalidTemplate ? (t || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"), r.value = {
    raw: this.value.replace(/\r\n?/g, `
`),
    cooked: null
  }) : r.value = {
    raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, `
`),
    cooked: this.value
  }, this.next(), r.tail = this.type === o.backQuote, this.finishNode(r, "TemplateElement");
};
x.parseTemplate = function(e) {
  e === void 0 && (e = {});
  var t = e.isTagged;
  t === void 0 && (t = !1);
  var r = this.startNode();
  this.next(), r.expressions = [];
  var i = this.parseTemplateElement({ isTagged: t });
  for (r.quasis = [i]; !i.tail; )
    this.type === o.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(o.dollarBraceL), r.expressions.push(this.parseExpression()), this.expect(o.braceR), r.quasis.push(i = this.parseTemplateElement({ isTagged: t }));
  return this.next(), this.finishNode(r, "TemplateLiteral");
};
x.isAsyncProp = function(e) {
  return !e.computed && e.key.type === "Identifier" && e.key.name === "async" && (this.type === o.name || this.type === o.num || this.type === o.string || this.type === o.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === o.star) && !Z.test(this.input.slice(this.lastTokEnd, this.start));
};
x.parseObj = function(e, t) {
  var r = this.startNode(), i = !0, a = {};
  for (r.properties = [], this.next(); !this.eat(o.braceR); ) {
    if (i)
      i = !1;
    else if (this.expect(o.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(o.braceR))
      break;
    var s = this.parseProperty(e, t);
    e || this.checkPropClash(s, a, t), r.properties.push(s);
  }
  return this.finishNode(r, e ? "ObjectPattern" : "ObjectExpression");
};
x.parseProperty = function(e, t) {
  var r = this.startNode(), i, a, s, n;
  if (this.options.ecmaVersion >= 9 && this.eat(o.ellipsis))
    return e ? (r.argument = this.parseIdent(!1), this.type === o.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.finishNode(r, "RestElement")) : (r.argument = this.parseMaybeAssign(!1, t), this.type === o.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start), this.finishNode(r, "SpreadElement"));
  this.options.ecmaVersion >= 6 && (r.method = !1, r.shorthand = !1, (e || t) && (s = this.start, n = this.startLoc), e || (i = this.eat(o.star)));
  var u = this.containsEsc;
  return this.parsePropertyName(r), !e && !u && this.options.ecmaVersion >= 8 && !i && this.isAsyncProp(r) ? (a = !0, i = this.options.ecmaVersion >= 9 && this.eat(o.star), this.parsePropertyName(r)) : a = !1, this.parsePropertyValue(r, e, i, a, s, n, t, u), this.finishNode(r, "Property");
};
x.parseGetterSetter = function(e) {
  var t = e.key.name;
  this.parsePropertyName(e), e.value = this.parseMethod(!1), e.kind = t;
  var r = e.kind === "get" ? 0 : 1;
  if (e.value.params.length !== r) {
    var i = e.value.start;
    e.kind === "get" ? this.raiseRecoverable(i, "getter should have no params") : this.raiseRecoverable(i, "setter should have exactly one param");
  } else
    e.kind === "set" && e.value.params[0].type === "RestElement" && this.raiseRecoverable(e.value.params[0].start, "Setter cannot use rest params");
};
x.parsePropertyValue = function(e, t, r, i, a, s, n, u) {
  (r || i) && this.type === o.colon && this.unexpected(), this.eat(o.colon) ? (e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, n), e.kind = "init") : this.options.ecmaVersion >= 6 && this.type === o.parenL ? (t && this.unexpected(), e.method = !0, e.value = this.parseMethod(r, i), e.kind = "init") : !t && !u && this.options.ecmaVersion >= 5 && !e.computed && e.key.type === "Identifier" && (e.key.name === "get" || e.key.name === "set") && this.type !== o.comma && this.type !== o.braceR && this.type !== o.eq ? ((r || i) && this.unexpected(), this.parseGetterSetter(e)) : this.options.ecmaVersion >= 6 && !e.computed && e.key.type === "Identifier" ? ((r || i) && this.unexpected(), this.checkUnreserved(e.key), e.key.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = a), t ? e.value = this.parseMaybeDefault(a, s, this.copyNode(e.key)) : this.type === o.eq && n ? (n.shorthandAssign < 0 && (n.shorthandAssign = this.start), e.value = this.parseMaybeDefault(a, s, this.copyNode(e.key))) : e.value = this.copyNode(e.key), e.kind = "init", e.shorthand = !0) : this.unexpected();
};
x.parsePropertyName = function(e) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(o.bracketL))
      return e.computed = !0, e.key = this.parseMaybeAssign(), this.expect(o.bracketR), e.key;
    e.computed = !1;
  }
  return e.key = this.type === o.num || this.type === o.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
};
x.initFunction = function(e) {
  e.id = null, this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1), this.options.ecmaVersion >= 8 && (e.async = !1);
};
x.parseMethod = function(e, t, r) {
  var i = this.startNode(), a = this.yieldPos, s = this.awaitPos, n = this.awaitIdentPos;
  return this.initFunction(i), this.options.ecmaVersion >= 6 && (i.generator = e), this.options.ecmaVersion >= 8 && (i.async = !!t), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(Lt(t, i.generator) | rt | (r ? oi : 0)), this.expect(o.parenL), i.params = this.parseBindingList(o.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(i, !1, !0, !1), this.yieldPos = a, this.awaitPos = s, this.awaitIdentPos = n, this.finishNode(i, "FunctionExpression");
};
x.parseArrowExpression = function(e, t, r, i) {
  var a = this.yieldPos, s = this.awaitPos, n = this.awaitIdentPos;
  return this.enterScope(Lt(r, !1) | Pt), this.initFunction(e), this.options.ecmaVersion >= 8 && (e.async = !!r), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, e.params = this.toAssignableList(t, !0), this.parseFunctionBody(e, !0, !1, i), this.yieldPos = a, this.awaitPos = s, this.awaitIdentPos = n, this.finishNode(e, "ArrowFunctionExpression");
};
x.parseFunctionBody = function(e, t, r, i) {
  var a = t && this.type !== o.braceL, s = this.strict, n = !1;
  if (a)
    e.body = this.parseMaybeAssign(i), e.expression = !0, this.checkParams(e, !1);
  else {
    var u = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
    (!s || u) && (n = this.strictDirective(this.end), n && u && this.raiseRecoverable(e.start, "Illegal 'use strict' directive in function with non-simple parameter list"));
    var l = this.labels;
    this.labels = [], n && (this.strict = !0), this.checkParams(e, !s && !n && !t && !r && this.isSimpleParamList(e.params)), this.strict && e.id && this.checkLValSimple(e.id, ci), e.body = this.parseBlock(!1, void 0, n && !s), e.expression = !1, this.adaptDirectivePrologue(e.body.body), this.labels = l;
  }
  this.exitScope();
};
x.isSimpleParamList = function(e) {
  for (var t = 0, r = e; t < r.length; t += 1) {
    var i = r[t];
    if (i.type !== "Identifier")
      return !1;
  }
  return !0;
};
x.checkParams = function(e, t) {
  for (var r = /* @__PURE__ */ Object.create(null), i = 0, a = e.params; i < a.length; i += 1) {
    var s = a[i];
    this.checkLValInnerPattern(s, Tt, t ? null : r);
  }
};
x.parseExprList = function(e, t, r, i) {
  for (var a = [], s = !0; !this.eat(e); ) {
    if (s)
      s = !1;
    else if (this.expect(o.comma), t && this.afterTrailingComma(e))
      break;
    var n = void 0;
    r && this.type === o.comma ? n = null : this.type === o.ellipsis ? (n = this.parseSpread(i), i && this.type === o.comma && i.trailingComma < 0 && (i.trailingComma = this.start)) : n = this.parseMaybeAssign(!1, i), a.push(n);
  }
  return a;
};
x.checkUnreserved = function(e) {
  var t = e.start, r = e.end, i = e.name;
  if (this.inGenerator && i === "yield" && this.raiseRecoverable(t, "Cannot use 'yield' as identifier inside a generator"), this.inAsync && i === "await" && this.raiseRecoverable(t, "Cannot use 'await' as identifier inside an async function"), !(this.currentThisScope().flags & at) && i === "arguments" && this.raiseRecoverable(t, "Cannot use 'arguments' in class field initializer"), this.inClassStaticBlock && (i === "arguments" || i === "await") && this.raise(t, "Cannot use " + i + " in class static initialization block"), this.keywords.test(i) && this.raise(t, "Unexpected keyword '" + i + "'"), !(this.options.ecmaVersion < 6 && this.input.slice(t, r).indexOf("\\") !== -1)) {
    var a = this.strict ? this.reservedWordsStrict : this.reservedWords;
    a.test(i) && (!this.inAsync && i === "await" && this.raiseRecoverable(t, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(t, "The keyword '" + i + "' is reserved"));
  }
};
x.parseIdent = function(e) {
  var t = this.parseIdentNode();
  return this.next(!!e), this.finishNode(t, "Identifier"), e || (this.checkUnreserved(t), t.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = t.start)), t;
};
x.parseIdentNode = function() {
  var e = this.startNode();
  return this.type === o.name ? e.name = this.value : this.type.keyword ? (e.name = this.type.keyword, (e.name === "class" || e.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46) && this.context.pop(), this.type = o.name) : this.unexpected(), e;
};
x.parsePrivateIdent = function() {
  var e = this.startNode();
  return this.type === o.privateId ? e.name = this.value : this.unexpected(), this.next(), this.finishNode(e, "PrivateIdentifier"), this.options.checkPrivateFields && (this.privateNameStack.length === 0 ? this.raise(e.start, "Private field '#" + e.name + "' must be declared in an enclosing class") : this.privateNameStack[this.privateNameStack.length - 1].used.push(e)), e;
};
x.parseYield = function(e) {
  this.yieldPos || (this.yieldPos = this.start);
  var t = this.startNode();
  return this.next(), this.type === o.semi || this.canInsertSemicolon() || this.type !== o.star && !this.type.startsExpr ? (t.delegate = !1, t.argument = null) : (t.delegate = this.eat(o.star), t.argument = this.parseMaybeAssign(e)), this.finishNode(t, "YieldExpression");
};
x.parseAwait = function(e) {
  this.awaitPos || (this.awaitPos = this.start);
  var t = this.startNode();
  return this.next(), t.argument = this.parseMaybeUnary(null, !0, !1, e), this.finishNode(t, "AwaitExpression");
};
var Je = N.prototype;
Je.raise = function(e, t) {
  var r = ai(this.input, e);
  t += " (" + r.line + ":" + r.column + ")", this.sourceFile && (t += " in " + this.sourceFile);
  var i = new SyntaxError(t);
  throw i.pos = e, i.loc = r, i.raisedAt = this.pos, i;
};
Je.raiseRecoverable = Je.raise;
Je.curPosition = function() {
  if (this.options.locations)
    return new De(this.curLine, this.pos - this.lineStart);
};
var ge = N.prototype, Qr = function(t) {
  this.flags = t, this.var = [], this.lexical = [], this.functions = [];
};
ge.enterScope = function(e) {
  this.scopeStack.push(new Qr(e));
};
ge.exitScope = function() {
  this.scopeStack.pop();
};
ge.treatFunctionsAsVarInScope = function(e) {
  return e.flags & Ve || !this.inModule && e.flags & Fe;
};
ge.declareName = function(e, t, r) {
  var i = !1;
  if (t === he) {
    var a = this.currentScope();
    i = a.lexical.indexOf(e) > -1 || a.functions.indexOf(e) > -1 || a.var.indexOf(e) > -1, a.lexical.push(e), this.inModule && a.flags & Fe && delete this.undefinedExports[e];
  } else if (t === li) {
    var s = this.currentScope();
    s.lexical.push(e);
  } else if (t === ui) {
    var n = this.currentScope();
    this.treatFunctionsAsVar ? i = n.lexical.indexOf(e) > -1 : i = n.lexical.indexOf(e) > -1 || n.var.indexOf(e) > -1, n.functions.push(e);
  } else
    for (var u = this.scopeStack.length - 1; u >= 0; --u) {
      var l = this.scopeStack[u];
      if (l.lexical.indexOf(e) > -1 && !(l.flags & ni && l.lexical[0] === e) || !this.treatFunctionsAsVarInScope(l) && l.functions.indexOf(e) > -1) {
        i = !0;
        break;
      }
      if (l.var.push(e), this.inModule && l.flags & Fe && delete this.undefinedExports[e], l.flags & at)
        break;
    }
  i && this.raiseRecoverable(r, "Identifier '" + e + "' has already been declared");
};
ge.checkLocalExport = function(e) {
  this.scopeStack[0].lexical.indexOf(e.name) === -1 && this.scopeStack[0].var.indexOf(e.name) === -1 && (this.undefinedExports[e.name] = e);
};
ge.currentScope = function() {
  return this.scopeStack[this.scopeStack.length - 1];
};
ge.currentVarScope = function() {
  for (var e = this.scopeStack.length - 1; ; e--) {
    var t = this.scopeStack[e];
    if (t.flags & (at | Ue | ke))
      return t;
  }
};
ge.currentThisScope = function() {
  for (var e = this.scopeStack.length - 1; ; e--) {
    var t = this.scopeStack[e];
    if (t.flags & (at | Ue | ke) && !(t.flags & Pt))
      return t;
  }
};
var nt = function(t, r, i) {
  this.type = "", this.start = r, this.end = 0, t.options.locations && (this.loc = new it(t, i)), t.options.directSourceFile && (this.sourceFile = t.options.directSourceFile), t.options.ranges && (this.range = [r, 0]);
}, $e = N.prototype;
$e.startNode = function() {
  return new nt(this, this.start, this.startLoc);
};
$e.startNodeAt = function(e, t) {
  return new nt(this, e, t);
};
function pi(e, t, r, i) {
  return e.type = t, e.end = r, this.options.locations && (e.loc.end = i), this.options.ranges && (e.range[1] = r), e;
}
$e.finishNode = function(e, t) {
  return pi.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
};
$e.finishNodeAt = function(e, t, r, i) {
  return pi.call(this, e, t, r, i);
};
$e.copyNode = function(e) {
  var t = new nt(this, e.start, this.startLoc);
  for (var r in e)
    t[r] = e[r];
  return t;
};
var Xr = "Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sunu Sunuwar Todhri Todr Tulu_Tigalari Tutg Unknown Zzzz", di = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS", yi = di + " Extended_Pictographic", mi = yi, gi = mi + " EBase EComp EMod EPres ExtPict", xi = gi, Yr = xi, Zr = {
  9: di,
  10: yi,
  11: mi,
  12: gi,
  13: xi,
  14: Yr
}, Jr = "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji", ea = {
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: Jr
}, Wt = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu", bi = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb", vi = bi + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd", Si = vi + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho", wi = Si + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi", ki = wi + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith", ta = ki + " " + Xr, ia = {
  9: bi,
  10: vi,
  11: Si,
  12: wi,
  13: ki,
  14: ta
}, Ei = {};
function ra(e) {
  var t = Ei[e] = {
    binary: pe(Zr[e] + " " + Wt),
    binaryOfStrings: pe(ea[e]),
    nonBinary: {
      General_Category: pe(Wt),
      Script: pe(ia[e])
    }
  };
  t.nonBinary.Script_Extensions = t.nonBinary.Script, t.nonBinary.gc = t.nonBinary.General_Category, t.nonBinary.sc = t.nonBinary.Script, t.nonBinary.scx = t.nonBinary.Script_Extensions;
}
for (var dt = 0, zt = [9, 10, 11, 12, 13, 14]; dt < zt.length; dt += 1) {
  var aa = zt[dt];
  ra(aa);
}
var y = N.prototype, et = function(t, r) {
  this.parent = t, this.base = r || this;
};
et.prototype.separatedFrom = function(t) {
  for (var r = this; r; r = r.parent)
    for (var i = t; i; i = i.parent)
      if (r.base === i.base && r !== i)
        return !0;
  return !1;
};
et.prototype.sibling = function() {
  return new et(this.parent, this.base);
};
var ae = function(t) {
  this.parser = t, this.validFlags = "gim" + (t.options.ecmaVersion >= 6 ? "uy" : "") + (t.options.ecmaVersion >= 9 ? "s" : "") + (t.options.ecmaVersion >= 13 ? "d" : "") + (t.options.ecmaVersion >= 15 ? "v" : ""), this.unicodeProperties = Ei[t.options.ecmaVersion >= 14 ? 14 : t.options.ecmaVersion], this.source = "", this.flags = "", this.start = 0, this.switchU = !1, this.switchV = !1, this.switchN = !1, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = /* @__PURE__ */ Object.create(null), this.backReferenceNames = [], this.branchID = null;
};
ae.prototype.reset = function(t, r, i) {
  var a = i.indexOf("v") !== -1, s = i.indexOf("u") !== -1;
  this.start = t | 0, this.source = r + "", this.flags = i, a && this.parser.options.ecmaVersion >= 15 ? (this.switchU = !0, this.switchV = !0, this.switchN = !0) : (this.switchU = s && this.parser.options.ecmaVersion >= 6, this.switchV = !1, this.switchN = s && this.parser.options.ecmaVersion >= 9);
};
ae.prototype.raise = function(t) {
  this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + t);
};
ae.prototype.at = function(t, r) {
  r === void 0 && (r = !1);
  var i = this.source, a = i.length;
  if (t >= a)
    return -1;
  var s = i.charCodeAt(t);
  if (!(r || this.switchU) || s <= 55295 || s >= 57344 || t + 1 >= a)
    return s;
  var n = i.charCodeAt(t + 1);
  return n >= 56320 && n <= 57343 ? (s << 10) + n - 56613888 : s;
};
ae.prototype.nextIndex = function(t, r) {
  r === void 0 && (r = !1);
  var i = this.source, a = i.length;
  if (t >= a)
    return a;
  var s = i.charCodeAt(t), n;
  return !(r || this.switchU) || s <= 55295 || s >= 57344 || t + 1 >= a || (n = i.charCodeAt(t + 1)) < 56320 || n > 57343 ? t + 1 : t + 2;
};
ae.prototype.current = function(t) {
  return t === void 0 && (t = !1), this.at(this.pos, t);
};
ae.prototype.lookahead = function(t) {
  return t === void 0 && (t = !1), this.at(this.nextIndex(this.pos, t), t);
};
ae.prototype.advance = function(t) {
  t === void 0 && (t = !1), this.pos = this.nextIndex(this.pos, t);
};
ae.prototype.eat = function(t, r) {
  return r === void 0 && (r = !1), this.current(r) === t ? (this.advance(r), !0) : !1;
};
ae.prototype.eatChars = function(t, r) {
  r === void 0 && (r = !1);
  for (var i = this.pos, a = 0, s = t; a < s.length; a += 1) {
    var n = s[a], u = this.at(i, r);
    if (u === -1 || u !== n)
      return !1;
    i = this.nextIndex(i, r);
  }
  return this.pos = i, !0;
};
y.validateRegExpFlags = function(e) {
  for (var t = e.validFlags, r = e.flags, i = !1, a = !1, s = 0; s < r.length; s++) {
    var n = r.charAt(s);
    t.indexOf(n) === -1 && this.raise(e.start, "Invalid regular expression flag"), r.indexOf(n, s + 1) > -1 && this.raise(e.start, "Duplicate regular expression flag"), n === "u" && (i = !0), n === "v" && (a = !0);
  }
  this.options.ecmaVersion >= 15 && i && a && this.raise(e.start, "Invalid regular expression flag");
};
function sa(e) {
  for (var t in e)
    return !0;
  return !1;
}
y.validateRegExpPattern = function(e) {
  this.regexp_pattern(e), !e.switchN && this.options.ecmaVersion >= 9 && sa(e.groupNames) && (e.switchN = !0, this.regexp_pattern(e));
};
y.regexp_pattern = function(e) {
  e.pos = 0, e.lastIntValue = 0, e.lastStringValue = "", e.lastAssertionIsQuantifiable = !1, e.numCapturingParens = 0, e.maxBackReference = 0, e.groupNames = /* @__PURE__ */ Object.create(null), e.backReferenceNames.length = 0, e.branchID = null, this.regexp_disjunction(e), e.pos !== e.source.length && (e.eat(
    41
    /* ) */
  ) && e.raise("Unmatched ')'"), (e.eat(
    93
    /* ] */
  ) || e.eat(
    125
    /* } */
  )) && e.raise("Lone quantifier brackets")), e.maxBackReference > e.numCapturingParens && e.raise("Invalid escape");
  for (var t = 0, r = e.backReferenceNames; t < r.length; t += 1) {
    var i = r[t];
    e.groupNames[i] || e.raise("Invalid named capture referenced");
  }
};
y.regexp_disjunction = function(e) {
  var t = this.options.ecmaVersion >= 16;
  for (t && (e.branchID = new et(e.branchID, null)), this.regexp_alternative(e); e.eat(
    124
    /* | */
  ); )
    t && (e.branchID = e.branchID.sibling()), this.regexp_alternative(e);
  t && (e.branchID = e.branchID.parent), this.regexp_eatQuantifier(e, !0) && e.raise("Nothing to repeat"), e.eat(
    123
    /* { */
  ) && e.raise("Lone quantifier brackets");
};
y.regexp_alternative = function(e) {
  for (; e.pos < e.source.length && this.regexp_eatTerm(e); )
    ;
};
y.regexp_eatTerm = function(e) {
  return this.regexp_eatAssertion(e) ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU && e.raise("Invalid quantifier"), !0) : (e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e)) ? (this.regexp_eatQuantifier(e), !0) : !1;
};
y.regexp_eatAssertion = function(e) {
  var t = e.pos;
  if (e.lastAssertionIsQuantifiable = !1, e.eat(
    94
    /* ^ */
  ) || e.eat(
    36
    /* $ */
  ))
    return !0;
  if (e.eat(
    92
    /* \ */
  )) {
    if (e.eat(
      66
      /* B */
    ) || e.eat(
      98
      /* b */
    ))
      return !0;
    e.pos = t;
  }
  if (e.eat(
    40
    /* ( */
  ) && e.eat(
    63
    /* ? */
  )) {
    var r = !1;
    if (this.options.ecmaVersion >= 9 && (r = e.eat(
      60
      /* < */
    )), e.eat(
      61
      /* = */
    ) || e.eat(
      33
      /* ! */
    ))
      return this.regexp_disjunction(e), e.eat(
        41
        /* ) */
      ) || e.raise("Unterminated group"), e.lastAssertionIsQuantifiable = !r, !0;
  }
  return e.pos = t, !1;
};
y.regexp_eatQuantifier = function(e, t) {
  return t === void 0 && (t = !1), this.regexp_eatQuantifierPrefix(e, t) ? (e.eat(
    63
    /* ? */
  ), !0) : !1;
};
y.regexp_eatQuantifierPrefix = function(e, t) {
  return e.eat(
    42
    /* * */
  ) || e.eat(
    43
    /* + */
  ) || e.eat(
    63
    /* ? */
  ) || this.regexp_eatBracedQuantifier(e, t);
};
y.regexp_eatBracedQuantifier = function(e, t) {
  var r = e.pos;
  if (e.eat(
    123
    /* { */
  )) {
    var i = 0, a = -1;
    if (this.regexp_eatDecimalDigits(e) && (i = e.lastIntValue, e.eat(
      44
      /* , */
    ) && this.regexp_eatDecimalDigits(e) && (a = e.lastIntValue), e.eat(
      125
      /* } */
    )))
      return a !== -1 && a < i && !t && e.raise("numbers out of order in {} quantifier"), !0;
    e.switchU && !t && e.raise("Incomplete quantifier"), e.pos = r;
  }
  return !1;
};
y.regexp_eatAtom = function(e) {
  return this.regexp_eatPatternCharacters(e) || e.eat(
    46
    /* . */
  ) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e);
};
y.regexp_eatReverseSolidusAtomEscape = function(e) {
  var t = e.pos;
  if (e.eat(
    92
    /* \ */
  )) {
    if (this.regexp_eatAtomEscape(e))
      return !0;
    e.pos = t;
  }
  return !1;
};
y.regexp_eatUncapturingGroup = function(e) {
  var t = e.pos;
  if (e.eat(
    40
    /* ( */
  )) {
    if (e.eat(
      63
      /* ? */
    )) {
      if (this.options.ecmaVersion >= 16) {
        var r = this.regexp_eatModifiers(e), i = e.eat(
          45
          /* - */
        );
        if (r || i) {
          for (var a = 0; a < r.length; a++) {
            var s = r.charAt(a);
            r.indexOf(s, a + 1) > -1 && e.raise("Duplicate regular expression modifiers");
          }
          if (i) {
            var n = this.regexp_eatModifiers(e);
            !r && !n && e.current() === 58 && e.raise("Invalid regular expression modifiers");
            for (var u = 0; u < n.length; u++) {
              var l = n.charAt(u);
              (n.indexOf(l, u + 1) > -1 || r.indexOf(l) > -1) && e.raise("Duplicate regular expression modifiers");
            }
          }
        }
      }
      if (e.eat(
        58
        /* : */
      )) {
        if (this.regexp_disjunction(e), e.eat(
          41
          /* ) */
        ))
          return !0;
        e.raise("Unterminated group");
      }
    }
    e.pos = t;
  }
  return !1;
};
y.regexp_eatCapturingGroup = function(e) {
  if (e.eat(
    40
    /* ( */
  )) {
    if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(e) : e.current() === 63 && e.raise("Invalid group"), this.regexp_disjunction(e), e.eat(
      41
      /* ) */
    ))
      return e.numCapturingParens += 1, !0;
    e.raise("Unterminated group");
  }
  return !1;
};
y.regexp_eatModifiers = function(e) {
  for (var t = "", r = 0; (r = e.current()) !== -1 && na(r); )
    t += ue(r), e.advance();
  return t;
};
function na(e) {
  return e === 105 || e === 109 || e === 115;
}
y.regexp_eatExtendedAtom = function(e) {
  return e.eat(
    46
    /* . */
  ) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(e);
};
y.regexp_eatInvalidBracedQuantifier = function(e) {
  return this.regexp_eatBracedQuantifier(e, !0) && e.raise("Nothing to repeat"), !1;
};
y.regexp_eatSyntaxCharacter = function(e) {
  var t = e.current();
  return Ci(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
};
function Ci(e) {
  return e === 36 || e >= 40 && e <= 43 || e === 46 || e === 63 || e >= 91 && e <= 94 || e >= 123 && e <= 125;
}
y.regexp_eatPatternCharacters = function(e) {
  for (var t = e.pos, r = 0; (r = e.current()) !== -1 && !Ci(r); )
    e.advance();
  return e.pos !== t;
};
y.regexp_eatExtendedPatternCharacter = function(e) {
  var t = e.current();
  return t !== -1 && t !== 36 && !(t >= 40 && t <= 43) && t !== 46 && t !== 63 && t !== 91 && t !== 94 && t !== 124 ? (e.advance(), !0) : !1;
};
y.regexp_groupSpecifier = function(e) {
  if (e.eat(
    63
    /* ? */
  )) {
    this.regexp_eatGroupName(e) || e.raise("Invalid group");
    var t = this.options.ecmaVersion >= 16, r = e.groupNames[e.lastStringValue];
    if (r)
      if (t)
        for (var i = 0, a = r; i < a.length; i += 1) {
          var s = a[i];
          s.separatedFrom(e.branchID) || e.raise("Duplicate capture group name");
        }
      else
        e.raise("Duplicate capture group name");
    t ? (r || (e.groupNames[e.lastStringValue] = [])).push(e.branchID) : e.groupNames[e.lastStringValue] = !0;
  }
};
y.regexp_eatGroupName = function(e) {
  if (e.lastStringValue = "", e.eat(
    60
    /* < */
  )) {
    if (this.regexp_eatRegExpIdentifierName(e) && e.eat(
      62
      /* > */
    ))
      return !0;
    e.raise("Invalid capture group name");
  }
  return !1;
};
y.regexp_eatRegExpIdentifierName = function(e) {
  if (e.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(e)) {
    for (e.lastStringValue += ue(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e); )
      e.lastStringValue += ue(e.lastIntValue);
    return !0;
  }
  return !1;
};
y.regexp_eatRegExpIdentifierStart = function(e) {
  var t = e.pos, r = this.options.ecmaVersion >= 11, i = e.current(r);
  return e.advance(r), i === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, r) && (i = e.lastIntValue), oa(i) ? (e.lastIntValue = i, !0) : (e.pos = t, !1);
};
function oa(e) {
  return oe(e, !0) || e === 36 || e === 95;
}
y.regexp_eatRegExpIdentifierPart = function(e) {
  var t = e.pos, r = this.options.ecmaVersion >= 11, i = e.current(r);
  return e.advance(r), i === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, r) && (i = e.lastIntValue), ua(i) ? (e.lastIntValue = i, !0) : (e.pos = t, !1);
};
function ua(e) {
  return _e(e, !0) || e === 36 || e === 95 || e === 8204 || e === 8205;
}
y.regexp_eatAtomEscape = function(e) {
  return this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e) || e.switchN && this.regexp_eatKGroupName(e) ? !0 : (e.switchU && (e.current() === 99 && e.raise("Invalid unicode escape"), e.raise("Invalid escape")), !1);
};
y.regexp_eatBackReference = function(e) {
  var t = e.pos;
  if (this.regexp_eatDecimalEscape(e)) {
    var r = e.lastIntValue;
    if (e.switchU)
      return r > e.maxBackReference && (e.maxBackReference = r), !0;
    if (r <= e.numCapturingParens)
      return !0;
    e.pos = t;
  }
  return !1;
};
y.regexp_eatKGroupName = function(e) {
  if (e.eat(
    107
    /* k */
  )) {
    if (this.regexp_eatGroupName(e))
      return e.backReferenceNames.push(e.lastStringValue), !0;
    e.raise("Invalid named reference");
  }
  return !1;
};
y.regexp_eatCharacterEscape = function(e) {
  return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(e) || this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e) || this.regexp_eatIdentityEscape(e);
};
y.regexp_eatCControlLetter = function(e) {
  var t = e.pos;
  if (e.eat(
    99
    /* c */
  )) {
    if (this.regexp_eatControlLetter(e))
      return !0;
    e.pos = t;
  }
  return !1;
};
y.regexp_eatZero = function(e) {
  return e.current() === 48 && !ot(e.lookahead()) ? (e.lastIntValue = 0, e.advance(), !0) : !1;
};
y.regexp_eatControlEscape = function(e) {
  var t = e.current();
  return t === 116 ? (e.lastIntValue = 9, e.advance(), !0) : t === 110 ? (e.lastIntValue = 10, e.advance(), !0) : t === 118 ? (e.lastIntValue = 11, e.advance(), !0) : t === 102 ? (e.lastIntValue = 12, e.advance(), !0) : t === 114 ? (e.lastIntValue = 13, e.advance(), !0) : !1;
};
y.regexp_eatControlLetter = function(e) {
  var t = e.current();
  return _i(t) ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
};
function _i(e) {
  return e >= 65 && e <= 90 || e >= 97 && e <= 122;
}
y.regexp_eatRegExpUnicodeEscapeSequence = function(e, t) {
  t === void 0 && (t = !1);
  var r = e.pos, i = t || e.switchU;
  if (e.eat(
    117
    /* u */
  )) {
    if (this.regexp_eatFixedHexDigits(e, 4)) {
      var a = e.lastIntValue;
      if (i && a >= 55296 && a <= 56319) {
        var s = e.pos;
        if (e.eat(
          92
          /* \ */
        ) && e.eat(
          117
          /* u */
        ) && this.regexp_eatFixedHexDigits(e, 4)) {
          var n = e.lastIntValue;
          if (n >= 56320 && n <= 57343)
            return e.lastIntValue = (a - 55296) * 1024 + (n - 56320) + 65536, !0;
        }
        e.pos = s, e.lastIntValue = a;
      }
      return !0;
    }
    if (i && e.eat(
      123
      /* { */
    ) && this.regexp_eatHexDigits(e) && e.eat(
      125
      /* } */
    ) && la(e.lastIntValue))
      return !0;
    i && e.raise("Invalid unicode escape"), e.pos = r;
  }
  return !1;
};
function la(e) {
  return e >= 0 && e <= 1114111;
}
y.regexp_eatIdentityEscape = function(e) {
  if (e.switchU)
    return this.regexp_eatSyntaxCharacter(e) ? !0 : e.eat(
      47
      /* / */
    ) ? (e.lastIntValue = 47, !0) : !1;
  var t = e.current();
  return t !== 99 && (!e.switchN || t !== 107) ? (e.lastIntValue = t, e.advance(), !0) : !1;
};
y.regexp_eatDecimalEscape = function(e) {
  e.lastIntValue = 0;
  var t = e.current();
  if (t >= 49 && t <= 57) {
    do
      e.lastIntValue = 10 * e.lastIntValue + (t - 48), e.advance();
    while ((t = e.current()) >= 48 && t <= 57);
    return !0;
  }
  return !1;
};
var Ii = 0, le = 1, Y = 2;
y.regexp_eatCharacterClassEscape = function(e) {
  var t = e.current();
  if (ca(t))
    return e.lastIntValue = -1, e.advance(), le;
  var r = !1;
  if (e.switchU && this.options.ecmaVersion >= 9 && ((r = t === 80) || t === 112)) {
    e.lastIntValue = -1, e.advance();
    var i;
    if (e.eat(
      123
      /* { */
    ) && (i = this.regexp_eatUnicodePropertyValueExpression(e)) && e.eat(
      125
      /* } */
    ))
      return r && i === Y && e.raise("Invalid property name"), i;
    e.raise("Invalid property name");
  }
  return Ii;
};
function ca(e) {
  return e === 100 || e === 68 || e === 115 || e === 83 || e === 119 || e === 87;
}
y.regexp_eatUnicodePropertyValueExpression = function(e) {
  var t = e.pos;
  if (this.regexp_eatUnicodePropertyName(e) && e.eat(
    61
    /* = */
  )) {
    var r = e.lastStringValue;
    if (this.regexp_eatUnicodePropertyValue(e)) {
      var i = e.lastStringValue;
      return this.regexp_validateUnicodePropertyNameAndValue(e, r, i), le;
    }
  }
  if (e.pos = t, this.regexp_eatLoneUnicodePropertyNameOrValue(e)) {
    var a = e.lastStringValue;
    return this.regexp_validateUnicodePropertyNameOrValue(e, a);
  }
  return Ii;
};
y.regexp_validateUnicodePropertyNameAndValue = function(e, t, r) {
  Te(e.unicodeProperties.nonBinary, t) || e.raise("Invalid property name"), e.unicodeProperties.nonBinary[t].test(r) || e.raise("Invalid property value");
};
y.regexp_validateUnicodePropertyNameOrValue = function(e, t) {
  if (e.unicodeProperties.binary.test(t))
    return le;
  if (e.switchV && e.unicodeProperties.binaryOfStrings.test(t))
    return Y;
  e.raise("Invalid property name");
};
y.regexp_eatUnicodePropertyName = function(e) {
  var t = 0;
  for (e.lastStringValue = ""; Ai(t = e.current()); )
    e.lastStringValue += ue(t), e.advance();
  return e.lastStringValue !== "";
};
function Ai(e) {
  return _i(e) || e === 95;
}
y.regexp_eatUnicodePropertyValue = function(e) {
  var t = 0;
  for (e.lastStringValue = ""; fa(t = e.current()); )
    e.lastStringValue += ue(t), e.advance();
  return e.lastStringValue !== "";
};
function fa(e) {
  return Ai(e) || ot(e);
}
y.regexp_eatLoneUnicodePropertyNameOrValue = function(e) {
  return this.regexp_eatUnicodePropertyValue(e);
};
y.regexp_eatCharacterClass = function(e) {
  if (e.eat(
    91
    /* [ */
  )) {
    var t = e.eat(
      94
      /* ^ */
    ), r = this.regexp_classContents(e);
    return e.eat(
      93
      /* ] */
    ) || e.raise("Unterminated character class"), t && r === Y && e.raise("Negated character class may contain strings"), !0;
  }
  return !1;
};
y.regexp_classContents = function(e) {
  return e.current() === 93 ? le : e.switchV ? this.regexp_classSetExpression(e) : (this.regexp_nonEmptyClassRanges(e), le);
};
y.regexp_nonEmptyClassRanges = function(e) {
  for (; this.regexp_eatClassAtom(e); ) {
    var t = e.lastIntValue;
    if (e.eat(
      45
      /* - */
    ) && this.regexp_eatClassAtom(e)) {
      var r = e.lastIntValue;
      e.switchU && (t === -1 || r === -1) && e.raise("Invalid character class"), t !== -1 && r !== -1 && t > r && e.raise("Range out of order in character class");
    }
  }
};
y.regexp_eatClassAtom = function(e) {
  var t = e.pos;
  if (e.eat(
    92
    /* \ */
  )) {
    if (this.regexp_eatClassEscape(e))
      return !0;
    if (e.switchU) {
      var r = e.current();
      (r === 99 || Ti(r)) && e.raise("Invalid class escape"), e.raise("Invalid escape");
    }
    e.pos = t;
  }
  var i = e.current();
  return i !== 93 ? (e.lastIntValue = i, e.advance(), !0) : !1;
};
y.regexp_eatClassEscape = function(e) {
  var t = e.pos;
  if (e.eat(
    98
    /* b */
  ))
    return e.lastIntValue = 8, !0;
  if (e.switchU && e.eat(
    45
    /* - */
  ))
    return e.lastIntValue = 45, !0;
  if (!e.switchU && e.eat(
    99
    /* c */
  )) {
    if (this.regexp_eatClassControlLetter(e))
      return !0;
    e.pos = t;
  }
  return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e);
};
y.regexp_classSetExpression = function(e) {
  var t = le, r;
  if (!this.regexp_eatClassSetRange(e)) if (r = this.regexp_eatClassSetOperand(e)) {
    r === Y && (t = Y);
    for (var i = e.pos; e.eatChars(
      [38, 38]
      /* && */
    ); ) {
      if (e.current() !== 38 && (r = this.regexp_eatClassSetOperand(e))) {
        r !== Y && (t = le);
        continue;
      }
      e.raise("Invalid character in character class");
    }
    if (i !== e.pos)
      return t;
    for (; e.eatChars(
      [45, 45]
      /* -- */
    ); )
      this.regexp_eatClassSetOperand(e) || e.raise("Invalid character in character class");
    if (i !== e.pos)
      return t;
  } else
    e.raise("Invalid character in character class");
  for (; ; )
    if (!this.regexp_eatClassSetRange(e)) {
      if (r = this.regexp_eatClassSetOperand(e), !r)
        return t;
      r === Y && (t = Y);
    }
};
y.regexp_eatClassSetRange = function(e) {
  var t = e.pos;
  if (this.regexp_eatClassSetCharacter(e)) {
    var r = e.lastIntValue;
    if (e.eat(
      45
      /* - */
    ) && this.regexp_eatClassSetCharacter(e)) {
      var i = e.lastIntValue;
      return r !== -1 && i !== -1 && r > i && e.raise("Range out of order in character class"), !0;
    }
    e.pos = t;
  }
  return !1;
};
y.regexp_eatClassSetOperand = function(e) {
  return this.regexp_eatClassSetCharacter(e) ? le : this.regexp_eatClassStringDisjunction(e) || this.regexp_eatNestedClass(e);
};
y.regexp_eatNestedClass = function(e) {
  var t = e.pos;
  if (e.eat(
    91
    /* [ */
  )) {
    var r = e.eat(
      94
      /* ^ */
    ), i = this.regexp_classContents(e);
    if (e.eat(
      93
      /* ] */
    ))
      return r && i === Y && e.raise("Negated character class may contain strings"), i;
    e.pos = t;
  }
  if (e.eat(
    92
    /* \ */
  )) {
    var a = this.regexp_eatCharacterClassEscape(e);
    if (a)
      return a;
    e.pos = t;
  }
  return null;
};
y.regexp_eatClassStringDisjunction = function(e) {
  var t = e.pos;
  if (e.eatChars(
    [92, 113]
    /* \q */
  )) {
    if (e.eat(
      123
      /* { */
    )) {
      var r = this.regexp_classStringDisjunctionContents(e);
      if (e.eat(
        125
        /* } */
      ))
        return r;
    } else
      e.raise("Invalid escape");
    e.pos = t;
  }
  return null;
};
y.regexp_classStringDisjunctionContents = function(e) {
  for (var t = this.regexp_classString(e); e.eat(
    124
    /* | */
  ); )
    this.regexp_classString(e) === Y && (t = Y);
  return t;
};
y.regexp_classString = function(e) {
  for (var t = 0; this.regexp_eatClassSetCharacter(e); )
    t++;
  return t === 1 ? le : Y;
};
y.regexp_eatClassSetCharacter = function(e) {
  var t = e.pos;
  if (e.eat(
    92
    /* \ */
  ))
    return this.regexp_eatCharacterEscape(e) || this.regexp_eatClassSetReservedPunctuator(e) ? !0 : e.eat(
      98
      /* b */
    ) ? (e.lastIntValue = 8, !0) : (e.pos = t, !1);
  var r = e.current();
  return r < 0 || r === e.lookahead() && ha(r) || pa(r) ? !1 : (e.advance(), e.lastIntValue = r, !0);
};
function ha(e) {
  return e === 33 || e >= 35 && e <= 38 || e >= 42 && e <= 44 || e === 46 || e >= 58 && e <= 64 || e === 94 || e === 96 || e === 126;
}
function pa(e) {
  return e === 40 || e === 41 || e === 45 || e === 47 || e >= 91 && e <= 93 || e >= 123 && e <= 125;
}
y.regexp_eatClassSetReservedPunctuator = function(e) {
  var t = e.current();
  return da(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
};
function da(e) {
  return e === 33 || e === 35 || e === 37 || e === 38 || e === 44 || e === 45 || e >= 58 && e <= 62 || e === 64 || e === 96 || e === 126;
}
y.regexp_eatClassControlLetter = function(e) {
  var t = e.current();
  return ot(t) || t === 95 ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
};
y.regexp_eatHexEscapeSequence = function(e) {
  var t = e.pos;
  if (e.eat(
    120
    /* x */
  )) {
    if (this.regexp_eatFixedHexDigits(e, 2))
      return !0;
    e.switchU && e.raise("Invalid escape"), e.pos = t;
  }
  return !1;
};
y.regexp_eatDecimalDigits = function(e) {
  var t = e.pos, r = 0;
  for (e.lastIntValue = 0; ot(r = e.current()); )
    e.lastIntValue = 10 * e.lastIntValue + (r - 48), e.advance();
  return e.pos !== t;
};
function ot(e) {
  return e >= 48 && e <= 57;
}
y.regexp_eatHexDigits = function(e) {
  var t = e.pos, r = 0;
  for (e.lastIntValue = 0; Pi(r = e.current()); )
    e.lastIntValue = 16 * e.lastIntValue + Li(r), e.advance();
  return e.pos !== t;
};
function Pi(e) {
  return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
}
function Li(e) {
  return e >= 65 && e <= 70 ? 10 + (e - 65) : e >= 97 && e <= 102 ? 10 + (e - 97) : e - 48;
}
y.regexp_eatLegacyOctalEscapeSequence = function(e) {
  if (this.regexp_eatOctalDigit(e)) {
    var t = e.lastIntValue;
    if (this.regexp_eatOctalDigit(e)) {
      var r = e.lastIntValue;
      t <= 3 && this.regexp_eatOctalDigit(e) ? e.lastIntValue = t * 64 + r * 8 + e.lastIntValue : e.lastIntValue = t * 8 + r;
    } else
      e.lastIntValue = t;
    return !0;
  }
  return !1;
};
y.regexp_eatOctalDigit = function(e) {
  var t = e.current();
  return Ti(t) ? (e.lastIntValue = t - 48, e.advance(), !0) : (e.lastIntValue = 0, !1);
};
function Ti(e) {
  return e >= 48 && e <= 55;
}
y.regexp_eatFixedHexDigits = function(e, t) {
  var r = e.pos;
  e.lastIntValue = 0;
  for (var i = 0; i < t; ++i) {
    var a = e.current();
    if (!Pi(a))
      return e.pos = r, !1;
    e.lastIntValue = 16 * e.lastIntValue + Li(a), e.advance();
  }
  return !0;
};
var Nt = function(t) {
  this.type = t.type, this.value = t.value, this.start = t.start, this.end = t.end, t.options.locations && (this.loc = new it(t, t.startLoc, t.endLoc)), t.options.ranges && (this.range = [t.start, t.end]);
}, b = N.prototype;
b.next = function(e) {
  !e && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword), this.options.onToken && this.options.onToken(new Nt(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
};
b.getToken = function() {
  return this.next(), new Nt(this);
};
typeof Symbol < "u" && (b[Symbol.iterator] = function() {
  var e = this;
  return {
    next: function() {
      var t = e.getToken();
      return {
        done: t.type === o.eof,
        value: t
      };
    }
  };
});
b.nextToken = function() {
  var e = this.curContext();
  if ((!e || !e.preserveSpace) && this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length)
    return this.finishToken(o.eof);
  if (e.override)
    return e.override(this);
  this.readToken(this.fullCharCodeAtPos());
};
b.readToken = function(e) {
  return oe(e, this.options.ecmaVersion >= 6) || e === 92 ? this.readWord() : this.getTokenFromCode(e);
};
b.fullCharCodeAtPos = function() {
  var e = this.input.charCodeAt(this.pos);
  if (e <= 55295 || e >= 56320)
    return e;
  var t = this.input.charCodeAt(this.pos + 1);
  return t <= 56319 || t >= 57344 ? e : (e << 10) + t - 56613888;
};
b.skipBlockComment = function() {
  var e = this.options.onComment && this.curPosition(), t = this.pos, r = this.input.indexOf("*/", this.pos += 2);
  if (r === -1 && this.raise(this.pos - 2, "Unterminated comment"), this.pos = r + 2, this.options.locations)
    for (var i = void 0, a = t; (i = ti(this.input, a, this.pos)) > -1; )
      ++this.curLine, a = this.lineStart = i;
  this.options.onComment && this.options.onComment(
    !0,
    this.input.slice(t + 2, r),
    t,
    this.pos,
    e,
    this.curPosition()
  );
};
b.skipLineComment = function(e) {
  for (var t = this.pos, r = this.options.onComment && this.curPosition(), i = this.input.charCodeAt(this.pos += e); this.pos < this.input.length && !Le(i); )
    i = this.input.charCodeAt(++this.pos);
  this.options.onComment && this.options.onComment(
    !1,
    this.input.slice(t + e, this.pos),
    t,
    this.pos,
    r,
    this.curPosition()
  );
};
b.skipSpace = function() {
  e: for (; this.pos < this.input.length; ) {
    var e = this.input.charCodeAt(this.pos);
    switch (e) {
      case 32:
      case 160:
        ++this.pos;
        break;
      case 13:
        this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos;
      case 10:
      case 8232:
      case 8233:
        ++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);
        break;
      case 47:
        switch (this.input.charCodeAt(this.pos + 1)) {
          case 42:
            this.skipBlockComment();
            break;
          case 47:
            this.skipLineComment(2);
            break;
          default:
            break e;
        }
        break;
      default:
        if (e > 8 && e < 14 || e >= 5760 && ii.test(String.fromCharCode(e)))
          ++this.pos;
        else
          break e;
    }
  }
};
b.finishToken = function(e, t) {
  this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
  var r = this.type;
  this.type = e, this.value = t, this.updateContext(r);
};
b.readToken_dot = function() {
  var e = this.input.charCodeAt(this.pos + 1);
  if (e >= 48 && e <= 57)
    return this.readNumber(!0);
  var t = this.input.charCodeAt(this.pos + 2);
  return this.options.ecmaVersion >= 6 && e === 46 && t === 46 ? (this.pos += 3, this.finishToken(o.ellipsis)) : (++this.pos, this.finishToken(o.dot));
};
b.readToken_slash = function() {
  var e = this.input.charCodeAt(this.pos + 1);
  return this.exprAllowed ? (++this.pos, this.readRegexp()) : e === 61 ? this.finishOp(o.assign, 2) : this.finishOp(o.slash, 1);
};
b.readToken_mult_modulo_exp = function(e) {
  var t = this.input.charCodeAt(this.pos + 1), r = 1, i = e === 42 ? o.star : o.modulo;
  return this.options.ecmaVersion >= 7 && e === 42 && t === 42 && (++r, i = o.starstar, t = this.input.charCodeAt(this.pos + 2)), t === 61 ? this.finishOp(o.assign, r + 1) : this.finishOp(i, r);
};
b.readToken_pipe_amp = function(e) {
  var t = this.input.charCodeAt(this.pos + 1);
  if (t === e) {
    if (this.options.ecmaVersion >= 12) {
      var r = this.input.charCodeAt(this.pos + 2);
      if (r === 61)
        return this.finishOp(o.assign, 3);
    }
    return this.finishOp(e === 124 ? o.logicalOR : o.logicalAND, 2);
  }
  return t === 61 ? this.finishOp(o.assign, 2) : this.finishOp(e === 124 ? o.bitwiseOR : o.bitwiseAND, 1);
};
b.readToken_caret = function() {
  var e = this.input.charCodeAt(this.pos + 1);
  return e === 61 ? this.finishOp(o.assign, 2) : this.finishOp(o.bitwiseXOR, 1);
};
b.readToken_plus_min = function(e) {
  var t = this.input.charCodeAt(this.pos + 1);
  return t === e ? t === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || Z.test(this.input.slice(this.lastTokEnd, this.pos))) ? (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : this.finishOp(o.incDec, 2) : t === 61 ? this.finishOp(o.assign, 2) : this.finishOp(o.plusMin, 1);
};
b.readToken_lt_gt = function(e) {
  var t = this.input.charCodeAt(this.pos + 1), r = 1;
  return t === e ? (r = e === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2, this.input.charCodeAt(this.pos + r) === 61 ? this.finishOp(o.assign, r + 1) : this.finishOp(o.bitShift, r)) : t === 33 && e === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45 ? (this.skipLineComment(4), this.skipSpace(), this.nextToken()) : (t === 61 && (r = 2), this.finishOp(o.relational, r));
};
b.readToken_eq_excl = function(e) {
  var t = this.input.charCodeAt(this.pos + 1);
  return t === 61 ? this.finishOp(o.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) : e === 61 && t === 62 && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(o.arrow)) : this.finishOp(e === 61 ? o.eq : o.prefix, 1);
};
b.readToken_question = function() {
  var e = this.options.ecmaVersion;
  if (e >= 11) {
    var t = this.input.charCodeAt(this.pos + 1);
    if (t === 46) {
      var r = this.input.charCodeAt(this.pos + 2);
      if (r < 48 || r > 57)
        return this.finishOp(o.questionDot, 2);
    }
    if (t === 63) {
      if (e >= 12) {
        var i = this.input.charCodeAt(this.pos + 2);
        if (i === 61)
          return this.finishOp(o.assign, 3);
      }
      return this.finishOp(o.coalesce, 2);
    }
  }
  return this.finishOp(o.question, 1);
};
b.readToken_numberSign = function() {
  var e = this.options.ecmaVersion, t = 35;
  if (e >= 13 && (++this.pos, t = this.fullCharCodeAtPos(), oe(t, !0) || t === 92))
    return this.finishToken(o.privateId, this.readWord1());
  this.raise(this.pos, "Unexpected character '" + ue(t) + "'");
};
b.getTokenFromCode = function(e) {
  switch (e) {
    // The interpretation of a dot depends on whether it is followed
    // by a digit or another two dots.
    case 46:
      return this.readToken_dot();
    // Punctuation tokens.
    case 40:
      return ++this.pos, this.finishToken(o.parenL);
    case 41:
      return ++this.pos, this.finishToken(o.parenR);
    case 59:
      return ++this.pos, this.finishToken(o.semi);
    case 44:
      return ++this.pos, this.finishToken(o.comma);
    case 91:
      return ++this.pos, this.finishToken(o.bracketL);
    case 93:
      return ++this.pos, this.finishToken(o.bracketR);
    case 123:
      return ++this.pos, this.finishToken(o.braceL);
    case 125:
      return ++this.pos, this.finishToken(o.braceR);
    case 58:
      return ++this.pos, this.finishToken(o.colon);
    case 96:
      if (this.options.ecmaVersion < 6)
        break;
      return ++this.pos, this.finishToken(o.backQuote);
    case 48:
      var t = this.input.charCodeAt(this.pos + 1);
      if (t === 120 || t === 88)
        return this.readRadixNumber(16);
      if (this.options.ecmaVersion >= 6) {
        if (t === 111 || t === 79)
          return this.readRadixNumber(8);
        if (t === 98 || t === 66)
          return this.readRadixNumber(2);
      }
    // Anything else beginning with a digit is an integer, octal
    // number, or float.
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return this.readNumber(!1);
    // Quotes produce strings.
    case 34:
    case 39:
      return this.readString(e);
    // Operators are parsed inline in tiny state machines. '=' (61) is
    // often referred to. `finishOp` simply skips the amount of
    // characters it is given as second argument, and returns a token
    // of the type given by its first argument.
    case 47:
      return this.readToken_slash();
    case 37:
    case 42:
      return this.readToken_mult_modulo_exp(e);
    case 124:
    case 38:
      return this.readToken_pipe_amp(e);
    case 94:
      return this.readToken_caret();
    case 43:
    case 45:
      return this.readToken_plus_min(e);
    case 60:
    case 62:
      return this.readToken_lt_gt(e);
    case 61:
    case 33:
      return this.readToken_eq_excl(e);
    case 63:
      return this.readToken_question();
    case 126:
      return this.finishOp(o.prefix, 1);
    case 35:
      return this.readToken_numberSign();
  }
  this.raise(this.pos, "Unexpected character '" + ue(e) + "'");
};
b.finishOp = function(e, t) {
  var r = this.input.slice(this.pos, this.pos + t);
  return this.pos += t, this.finishToken(e, r);
};
b.readRegexp = function() {
  for (var e, t, r = this.pos; ; ) {
    this.pos >= this.input.length && this.raise(r, "Unterminated regular expression");
    var i = this.input.charAt(this.pos);
    if (Z.test(i) && this.raise(r, "Unterminated regular expression"), e)
      e = !1;
    else {
      if (i === "[")
        t = !0;
      else if (i === "]" && t)
        t = !1;
      else if (i === "/" && !t)
        break;
      e = i === "\\";
    }
    ++this.pos;
  }
  var a = this.input.slice(r, this.pos);
  ++this.pos;
  var s = this.pos, n = this.readWord1();
  this.containsEsc && this.unexpected(s);
  var u = this.regexpState || (this.regexpState = new ae(this));
  u.reset(r, a, n), this.validateRegExpFlags(u), this.validateRegExpPattern(u);
  var l = null;
  try {
    l = new RegExp(a, n);
  } catch {
  }
  return this.finishToken(o.regexp, { pattern: a, flags: n, value: l });
};
b.readInt = function(e, t, r) {
  for (var i = this.options.ecmaVersion >= 12 && t === void 0, a = r && this.input.charCodeAt(this.pos) === 48, s = this.pos, n = 0, u = 0, l = 0, c = t ?? 1 / 0; l < c; ++l, ++this.pos) {
    var f = this.input.charCodeAt(this.pos), g = void 0;
    if (i && f === 95) {
      a && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"), u === 95 && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"), l === 0 && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"), u = f;
      continue;
    }
    if (f >= 97 ? g = f - 97 + 10 : f >= 65 ? g = f - 65 + 10 : f >= 48 && f <= 57 ? g = f - 48 : g = 1 / 0, g >= e)
      break;
    u = f, n = n * e + g;
  }
  return i && u === 95 && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"), this.pos === s || t != null && this.pos - s !== t ? null : n;
};
function ya(e, t) {
  return t ? parseInt(e, 8) : parseFloat(e.replace(/_/g, ""));
}
function Vi(e) {
  return typeof BigInt != "function" ? null : BigInt(e.replace(/_/g, ""));
}
b.readRadixNumber = function(e) {
  var t = this.pos;
  this.pos += 2;
  var r = this.readInt(e);
  return r == null && this.raise(this.start + 2, "Expected number in radix " + e), this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110 ? (r = Vi(this.input.slice(t, this.pos)), ++this.pos) : oe(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(o.num, r);
};
b.readNumber = function(e) {
  var t = this.pos;
  !e && this.readInt(10, void 0, !0) === null && this.raise(t, "Invalid number");
  var r = this.pos - t >= 2 && this.input.charCodeAt(t) === 48;
  r && this.strict && this.raise(t, "Invalid number");
  var i = this.input.charCodeAt(this.pos);
  if (!r && !e && this.options.ecmaVersion >= 11 && i === 110) {
    var a = Vi(this.input.slice(t, this.pos));
    return ++this.pos, oe(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(o.num, a);
  }
  r && /[89]/.test(this.input.slice(t, this.pos)) && (r = !1), i === 46 && !r && (++this.pos, this.readInt(10), i = this.input.charCodeAt(this.pos)), (i === 69 || i === 101) && !r && (i = this.input.charCodeAt(++this.pos), (i === 43 || i === 45) && ++this.pos, this.readInt(10) === null && this.raise(t, "Invalid number")), oe(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");
  var s = ya(this.input.slice(t, this.pos), r);
  return this.finishToken(o.num, s);
};
b.readCodePoint = function() {
  var e = this.input.charCodeAt(this.pos), t;
  if (e === 123) {
    this.options.ecmaVersion < 6 && this.unexpected();
    var r = ++this.pos;
    t = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, t > 1114111 && this.invalidStringToken(r, "Code point out of bounds");
  } else
    t = this.readHexChar(4);
  return t;
};
b.readString = function(e) {
  for (var t = "", r = ++this.pos; ; ) {
    this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
    var i = this.input.charCodeAt(this.pos);
    if (i === e)
      break;
    i === 92 ? (t += this.input.slice(r, this.pos), t += this.readEscapedChar(!1), r = this.pos) : i === 8232 || i === 8233 ? (this.options.ecmaVersion < 10 && this.raise(this.start, "Unterminated string constant"), ++this.pos, this.options.locations && (this.curLine++, this.lineStart = this.pos)) : (Le(i) && this.raise(this.start, "Unterminated string constant"), ++this.pos);
  }
  return t += this.input.slice(r, this.pos++), this.finishToken(o.string, t);
};
var Ni = {};
b.tryReadTemplateToken = function() {
  this.inTemplateElement = !0;
  try {
    this.readTmplToken();
  } catch (e) {
    if (e === Ni)
      this.readInvalidTemplateToken();
    else
      throw e;
  }
  this.inTemplateElement = !1;
};
b.invalidStringToken = function(e, t) {
  if (this.inTemplateElement && this.options.ecmaVersion >= 9)
    throw Ni;
  this.raise(e, t);
};
b.readTmplToken = function() {
  for (var e = "", t = this.pos; ; ) {
    this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
    var r = this.input.charCodeAt(this.pos);
    if (r === 96 || r === 36 && this.input.charCodeAt(this.pos + 1) === 123)
      return this.pos === this.start && (this.type === o.template || this.type === o.invalidTemplate) ? r === 36 ? (this.pos += 2, this.finishToken(o.dollarBraceL)) : (++this.pos, this.finishToken(o.backQuote)) : (e += this.input.slice(t, this.pos), this.finishToken(o.template, e));
    if (r === 92)
      e += this.input.slice(t, this.pos), e += this.readEscapedChar(!0), t = this.pos;
    else if (Le(r)) {
      switch (e += this.input.slice(t, this.pos), ++this.pos, r) {
        case 13:
          this.input.charCodeAt(this.pos) === 10 && ++this.pos;
        case 10:
          e += `
`;
          break;
        default:
          e += String.fromCharCode(r);
          break;
      }
      this.options.locations && (++this.curLine, this.lineStart = this.pos), t = this.pos;
    } else
      ++this.pos;
  }
};
b.readInvalidTemplateToken = function() {
  for (; this.pos < this.input.length; this.pos++)
    switch (this.input[this.pos]) {
      case "\\":
        ++this.pos;
        break;
      case "$":
        if (this.input[this.pos + 1] !== "{")
          break;
      // fall through
      case "`":
        return this.finishToken(o.invalidTemplate, this.input.slice(this.start, this.pos));
      case "\r":
        this.input[this.pos + 1] === `
` && ++this.pos;
      // fall through
      case `
`:
      case "\u2028":
      case "\u2029":
        ++this.curLine, this.lineStart = this.pos + 1;
        break;
    }
  this.raise(this.start, "Unterminated template");
};
b.readEscapedChar = function(e) {
  var t = this.input.charCodeAt(++this.pos);
  switch (++this.pos, t) {
    case 110:
      return `
`;
    // 'n' -> '\n'
    case 114:
      return "\r";
    // 'r' -> '\r'
    case 120:
      return String.fromCharCode(this.readHexChar(2));
    // 'x'
    case 117:
      return ue(this.readCodePoint());
    // 'u'
    case 116:
      return "	";
    // 't' -> '\t'
    case 98:
      return "\b";
    // 'b' -> '\b'
    case 118:
      return "\v";
    // 'v' -> '\u000b'
    case 102:
      return "\f";
    // 'f' -> '\f'
    case 13:
      this.input.charCodeAt(this.pos) === 10 && ++this.pos;
    // '\r\n'
    case 10:
      return this.options.locations && (this.lineStart = this.pos, ++this.curLine), "";
    case 56:
    case 57:
      if (this.strict && this.invalidStringToken(
        this.pos - 1,
        "Invalid escape sequence"
      ), e) {
        var r = this.pos - 1;
        this.invalidStringToken(
          r,
          "Invalid escape sequence in template string"
        );
      }
    default:
      if (t >= 48 && t <= 55) {
        var i = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], a = parseInt(i, 8);
        return a > 255 && (i = i.slice(0, -1), a = parseInt(i, 8)), this.pos += i.length - 1, t = this.input.charCodeAt(this.pos), (i !== "0" || t === 56 || t === 57) && (this.strict || e) && this.invalidStringToken(
          this.pos - 1 - i.length,
          e ? "Octal literal in template string" : "Octal literal in strict mode"
        ), String.fromCharCode(a);
      }
      return Le(t) ? (this.options.locations && (this.lineStart = this.pos, ++this.curLine), "") : String.fromCharCode(t);
  }
};
b.readHexChar = function(e) {
  var t = this.pos, r = this.readInt(16, e);
  return r === null && this.invalidStringToken(t, "Bad character escape sequence"), r;
};
b.readWord1 = function() {
  this.containsEsc = !1;
  for (var e = "", t = !0, r = this.pos, i = this.options.ecmaVersion >= 6; this.pos < this.input.length; ) {
    var a = this.fullCharCodeAtPos();
    if (_e(a, i))
      this.pos += a <= 65535 ? 1 : 2;
    else if (a === 92) {
      this.containsEsc = !0, e += this.input.slice(r, this.pos);
      var s = this.pos;
      this.input.charCodeAt(++this.pos) !== 117 && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"), ++this.pos;
      var n = this.readCodePoint();
      (t ? oe : _e)(n, i) || this.invalidStringToken(s, "Invalid Unicode escape"), e += ue(n), r = this.pos;
    } else
      break;
    t = !1;
  }
  return e + this.input.slice(r, this.pos);
};
b.readWord = function() {
  var e = this.readWord1(), t = o.name;
  return this.keywords.test(e) && (t = It[e]), this.finishToken(t, e);
};
var ma = "8.14.1";
N.acorn = {
  Parser: N,
  version: ma,
  defaultOptions: xt,
  Position: De,
  SourceLocation: it,
  getLineInfo: ai,
  Node: nt,
  TokenType: E,
  tokTypes: o,
  keywordTypes: It,
  TokContext: ee,
  tokContexts: L,
  isIdentifierChar: _e,
  isIdentifierStart: oe,
  Token: Nt,
  isNewLine: Le,
  lineBreak: Z,
  lineBreakG: Fr,
  nonASCIIwhitespace: ii
};
function ga(e, t) {
  return N.parse(e, t);
}
const ve = { RES: void 0 }, k = { RES: void 0 }, C = { LABEL: void 0 }, _ = { LABEL: void 0 }, ut = B("super"), ye = B("supercall"), lt = B("noctor"), Ie = B("clsctor"), ct = B("newtarget"), R = B("private"), F = B("noinit"), $ = B("deadzone"), P = B("optchain"), Ee = B("import"), G = B("exports"), H = B("strict"), ft = B("strict-fn");
class Ke {
  constructor(t, r) {
    this.kind = t, this.value = r;
  }
  get() {
    return this.value;
  }
  set(t) {
    if (this.kind === "const")
      throw new TypeError("Assignment to constant variable");
    return this.value = t;
  }
}
class me {
  constructor(t, r) {
    this.object = t, this.property = r;
  }
  get() {
    return this.object[this.property];
  }
  set(t) {
    return this.object[this.property] = t, !0;
  }
  del() {
    return delete this.object[this.property];
  }
}
class V {
  /**
   * Create a simulated scope
   * @param parent the parent scope along the scope chain (default: null)
   * @param isolated true for function scope or false for block scope (default: false)
   */
  constructor(t = null, r = !1) {
    this.context = Ce(null), this.withContext = Ce(null), this.parent = t, this.isolated = r;
  }
  /**
   * Get global scope
   */
  global() {
    let t = this;
    for (; t.parent; )
      t = t.parent;
    return t;
  }
  /**
   * Find a variable along scope chain
   * @param name variable identifier name
   */
  find(t) {
    if (this.context[t])
      return this.context[t];
    if (t in this.withContext)
      return new me(this.withContext, t);
    if (this.parent)
      return this.parent.find(t);
    {
      const r = this.global().find("window").get();
      return t in r ? new me(r, t) : null;
    }
  }
  /**
   * Declare a var variable
   * @param name variable identifier name
   * @param value variable value
   */
  var(t, r) {
    let i = this;
    for (; i.parent && !i.isolated; )
      i = i.parent;
    const a = i.context[t];
    if (!a)
      i.context[t] = new Ke("var", r === F ? void 0 : r);
    else if (a.kind === "var")
      r !== F && a.set(r);
    else
      throw new SyntaxError(`Identifier '${t}' has already been declared`);
    if (!i.parent) {
      const s = i.find("window").get();
      r !== F && w(s, t, { value: r, writable: !0, enumerable: !0 });
    }
  }
  /**
   * Declare a let variable
   * @param name variable identifier name
   * @param value variable value
   */
  let(t, r) {
    const i = this.context[t];
    if (!i || i.get() === $)
      this.context[t] = new Ke("let", r);
    else
      throw new SyntaxError(`Identifier '${t}' has already been declared`);
  }
  /**
   * Declare a const variable
   * @param name variable identifier name
   * @param value variable value
   */
  const(t, r) {
    const i = this.context[t];
    if (!i || i.get() === $)
      this.context[t] = new Ke("const", r);
    else
      throw new SyntaxError(`Identifier '${t}' has already been declared`);
  }
  /**
   * Declare a function
   * @param name function name
   * @param value function
   */
  func(t, r) {
    const i = this.context[t];
    if (!i || i.kind === "var")
      this.context[t] = new Ke("var", r);
    else
      throw new SyntaxError(`Identifier '${t}' has already been declared`);
  }
  /**
   * Memoize the object for with-statement context
   * @param value object
   */
  with(t) {
    Object.keys(t) && (this.withContext = t);
  }
}
const xa = "0.6.11", ba = {
  version: xa
};
function St(e, t = {}) {
  const { res: r, err: i, ret: a, fullRet: s } = t;
  return new Promise((n, u) => {
    if ("ret" in t)
      return n(e.return(a));
    "err" in t ? c(i) : l(r);
    function l(g) {
      let I;
      try {
        I = e.next(g);
      } catch (O) {
        return u(O);
      }
      return f(I), null;
    }
    function c(g) {
      let I;
      try {
        I = e.throw(g);
      } catch (O) {
        return u(O);
      }
      f(I);
    }
    function f(g) {
      if (g.done) return n(s ? g : g.value);
      if (g.value !== ve) return n(g);
      const I = g.value.RES;
      return (I && I.then === "function" ? I : Promise.resolve(I)).then(l, c);
    }
  });
}
function* Re(e, t, r = {}) {
  const { getVar: i = !1, throwErr: a = !0 } = r;
  if (e.name === "undefined")
    return;
  const s = t.find(e.name);
  if (s) {
    if (i)
      return s;
    {
      const n = s.get();
      if (n === $)
        throw new ReferenceError(`${e.name} is not defined`);
      return n;
    }
  } else {
    if (a)
      throw new ReferenceError(`${e.name} is not defined`);
    return;
  }
}
const va = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Identifier: Re
}, Symbol.toStringTag, { value: "Module" }));
function* Ri(e, t) {
  return e.regex ? new RegExp(e.regex.pattern, e.regex.flags) : e.value;
}
const Sa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Literal: Ri
}, Symbol.toStringTag, { value: "Module" }));
function* wa(e, t) {
  const r = t.find(ye);
  if (r && r.get() !== !0)
    throw new ReferenceError("Must call super constructor in derived class before accessing 'this' or returning from derived constructor");
  return t.find("this").get();
}
function* ka(e, t) {
  let r = [];
  for (let i = 0; i < e.elements.length; i++) {
    const a = e.elements[i];
    a.type === "SpreadElement" ? r = r.concat(yield* We(a, t)) : r.push(yield* p(a, t));
  }
  return r;
}
function* Ea(e, t) {
  const r = {};
  for (let i = 0; i < e.properties.length; i++) {
    const a = e.properties[i];
    if (a.type === "SpreadElement")
      z(r, yield* We(a, t, { spreadProps: !0 }));
    else {
      let s;
      const n = a.key;
      a.computed ? s = yield* p(n, t) : n.type === "Identifier" ? s = n.name : s = "" + (yield* Ri(n));
      const u = yield* p(a.value, t), l = a.kind;
      if (l === "init")
        r[s] = u;
      else if (l === "get") {
        const c = de(r, s);
        w(r, s, {
          get: u,
          set: c && c.set,
          enumerable: !0,
          configurable: !0
        });
      } else {
        const c = de(r, s);
        w(r, s, {
          get: c && c.get,
          set: u,
          enumerable: !0,
          configurable: !0
        });
      }
    }
  }
  return r;
}
function* Ca(e, t) {
  if (e.id && e.id.name) {
    const r = new V(t), i = ie(e, r);
    return r.const(e.id.name, i), i;
  } else
    return ie(e, t);
}
function* _a(e, t) {
  const r = e.argument;
  switch (e.operator) {
    case "+":
      return +(yield* p(r, t));
    case "-":
      return -(yield* p(r, t));
    case "!":
      return !(yield* p(r, t));
    case "~":
      return ~(yield* p(r, t));
    case "void":
      return void (yield* p(r, t));
    case "typeof":
      return r.type === "Identifier" ? typeof (yield* Re(r, t, { throwErr: !1 })) : typeof (yield* p(r, t));
    case "delete":
      if (r.type === "MemberExpression")
        return (yield* qe(r, t, { getVar: !0 })).del();
      if (r.type === "Identifier")
        throw new SyntaxError("Delete of an unqualified identifier in strict mode");
      return yield* p(r, t), !0;
    /* istanbul ignore next */
    default:
      throw new SyntaxError(`Unexpected token ${e.operator}`);
  }
}
function* Ia(e, t) {
  const r = e.argument;
  let i;
  if (r.type === "Identifier")
    i = yield* Re(r, t, { getVar: !0 });
  else if (r.type === "MemberExpression")
    i = yield* qe(r, t, { getVar: !0 });
  else
    throw new SyntaxError("Unexpected token");
  const a = i.get();
  if (e.operator === "++")
    return i.set(a + 1), e.prefix ? i.get() : a;
  if (e.operator === "--")
    return i.set(a - 1), e.prefix ? i.get() : a;
  throw new SyntaxError(`Unexpected token ${e.operator}`);
}
function* Aa(e, t) {
  let r, i;
  switch (e.left.type === "PrivateIdentifier" ? (r = e.left.name, i = yield* p(e.right, t), i = i[R] || {}) : (r = yield* p(e.left, t), i = yield* p(e.right, t)), e.operator) {
    case "==":
      return r == i;
    case "!=":
      return r != i;
    case "===":
      return r === i;
    case "!==":
      return r !== i;
    case "<":
      return r < i;
    case "<=":
      return r <= i;
    case ">":
      return r > i;
    case ">=":
      return r >= i;
    case "<<":
      return r << i;
    case ">>":
      return r >> i;
    case ">>>":
      return r >>> i;
    case "+":
      return r + i;
    case "-":
      return r - i;
    case "*":
      return r * i;
    case "**":
      return r ** i;
    case "/":
      return r / i;
    case "%":
      return r % i;
    case "|":
      return r | i;
    case "^":
      return r ^ i;
    case "&":
      return r & i;
    case "in":
      return r in i;
    case "instanceof":
      return r instanceof i;
    /* istanbul ignore next */
    default:
      throw new SyntaxError(`Unexpected token ${e.operator}`);
  }
}
function* Pa(e, t) {
  const r = e.left;
  let i;
  if (r.type === "Identifier") {
    if (i = yield* Re(r, t, { getVar: !0, throwErr: !1 }), !i) {
      const s = t.find(H);
      if (s && s.get())
        throw new ReferenceError(`${r.name} is not defined`);
      const n = t.global().find("window").get();
      i = new me(n, r.name);
    }
  } else if (r.type === "MemberExpression")
    i = yield* qe(r, t, { getVar: !0 });
  else {
    const s = yield* p(e.right, t);
    return yield* W(r, t, { feed: s });
  }
  const a = yield* p(e.right, t);
  switch (e.operator) {
    case "=":
      return i.set(a), i.get();
    case "+=":
      return i.set(i.get() + a), i.get();
    case "-=":
      return i.set(i.get() - a), i.get();
    case "*=":
      return i.set(i.get() * a), i.get();
    case "/=":
      return i.set(i.get() / a), i.get();
    case "%=":
      return i.set(i.get() % a), i.get();
    case "**=":
      return i.set(i.get() ** a), i.get();
    case "<<=":
      return i.set(i.get() << a), i.get();
    case ">>=":
      return i.set(i.get() >> a), i.get();
    case ">>>=":
      return i.set(i.get() >>> a), i.get();
    case "|=":
      return i.set(i.get() | a), i.get();
    case "^=":
      return i.set(i.get() ^ a), i.get();
    case "&=":
      return i.set(i.get() & a), i.get();
    case "??=":
      return i.set(i.get() ?? a), i.get();
    case "&&=":
      return i.set(i.get() && a), i.get();
    case "||=":
      return i.set(i.get() || a), i.get();
    /* istanbul ignore next */
    default:
      throw new SyntaxError(`Unexpected token ${e.operator}`);
  }
}
function* La(e, t) {
  switch (e.operator) {
    case "||":
      return (yield* p(e.left, t)) || (yield* p(e.right, t));
    case "&&":
      return (yield* p(e.left, t)) && (yield* p(e.right, t));
    case "??":
      return (yield* p(e.left, t)) ?? (yield* p(e.right, t));
    default:
      throw new SyntaxError(`Unexpected token ${e.operator}`);
  }
}
function* qe(e, t, r = {}) {
  const { getObj: i = !1, getVar: a = !1 } = r;
  let s;
  if (e.object.type === "Super" ? s = yield* Oi(e.object, t, { getProto: !0 }) : s = yield* p(e.object, t), s === P) return P;
  if (i) return s;
  let n, u = !1;
  if (e.computed ? n = yield* p(e.property, t) : e.property.type === "PrivateIdentifier" ? (n = e.property.name, u = !0) : n = e.property.name, u && (s = s[R]), a) {
    const l = Xt(s, n);
    if (e.object.type === "Super" && l) {
      const c = t.find("this").get(), f = B(n);
      return w(c, f, { set: l }), new me(c, f);
    } else
      return new me(s, n);
  } else {
    const l = Qt(s, n);
    if (e.object.type === "Super" && l) {
      const c = t.find("this").get();
      return e.optional && c == null ? P : l.call(c);
    } else
      return e.optional && s == null ? P : s[n];
  }
}
function* Ta(e, t) {
  return (yield* p(e.test, t)) ? yield* p(e.consequent, t) : yield* p(e.alternate, t);
}
function* Va(e, t) {
  var s;
  let r, i;
  if (e.callee.type === "MemberExpression") {
    if (i = yield* qe(e.callee, t, { getObj: !0 }), i === P || e.callee.optional && i == null)
      return P;
    let n, u = !1;
    e.callee.computed ? n = yield* p(e.callee.property, t) : e.callee.property.type === "PrivateIdentifier" ? (n = e.callee.property.name, u = !0) : n = e.callee.property.name;
    let l = i;
    if (u && (l = l[R]), e.callee.object.type === "Super") {
      const c = t.find("this").get();
      r = l[n].bind(c);
    } else
      r = l[n];
    if (e.optional && r == null)
      return P;
    if (typeof r != "function")
      throw new TypeError(`${n} is not a function`);
    if (Ie in r)
      throw new TypeError(`Class constructor ${n} cannot be invoked without 'new'`);
  } else {
    if (r = yield* p(e.callee, t), r === P || e.optional && r == null)
      return P;
    if (typeof r != "function" || e.callee.type !== "Super" && Ie in r) {
      let n;
      if (e.callee.type === "Identifier")
        n = e.callee.name;
      else
        try {
          n = JSON.stringify(r);
        } catch {
          n = "" + r;
        }
      throw typeof r != "function" ? new TypeError(`${n} is not a function`) : new TypeError(`Class constructor ${n} cannot be invoked without 'new'`);
    }
    e.callee.type === "Super" ? i = t.find("this").get() : i = !!((s = t.find(H)) != null && s.get()) || !!(r && r[ft]) ? void 0 : t.find("this").get();
  }
  let a = [];
  for (let n = 0; n < e.arguments.length; n++) {
    const u = e.arguments[n];
    u.type === "SpreadElement" ? a = a.concat(yield* We(u, t)) : a.push(yield* p(u, t));
  }
  if (e.callee.type === "Super") {
    const u = t.find(ye).get();
    if (u === !0)
      throw new ReferenceError("Super constructor may only be called once");
    const l = tt(i, r, a);
    return yield* u(l), t.find("this").set(l), t.find(ye).set(!0), l;
  }
  try {
    return r.apply(i, a);
  } catch (n) {
    if (n instanceof TypeError && n.message === "Illegal invocation" && r.toString().indexOf("[native code]") !== -1) {
      const u = t.global().find("window").get();
      if (u && u[Oe])
        return r.apply(u[Oe], a);
    }
    throw n;
  }
}
function* Na(e, t) {
  const r = yield* p(e.callee, t);
  if (typeof r != "function") {
    let a;
    if (e.callee.type === "Identifier")
      a = e.callee.name;
    else
      try {
        a = JSON.stringify(r);
      } catch {
        a = "" + r;
      }
    throw new TypeError(`${a} is not a constructor`);
  } else if (r[lt])
    throw new TypeError(`${r.name || "(intermediate value)"} is not a constructor`);
  let i = [];
  for (let a = 0; a < e.arguments.length; a++) {
    const s = e.arguments[a];
    s.type === "SpreadElement" ? i = i.concat(yield* We(s, t)) : i.push(yield* p(s, t));
  }
  return new r(...i);
}
function* Ra(e, t) {
  if (e.meta.name === "new" && e.property.name === "target")
    return t.find(ct).get();
  if (e.meta.name === "import" && e.property.name === "meta")
    return { url: "" };
}
function* Ba(e, t) {
  let r;
  for (let i = 0; i < e.expressions.length; i++)
    r = yield* p(e.expressions[i], t);
  return r;
}
function* Oa(e, t) {
  return ie(e, t);
}
function* Da(e, t) {
  const r = e.quasis.slice(), i = e.expressions.slice();
  let a = "", s, n;
  for (; s = r.shift(); )
    a += yield* Bi(s), n = i.shift(), n && (a += yield* p(n, t));
  return a;
}
function* Fa(e, t) {
  const r = yield* p(e.tag, t), i = e.quasi.quasis, a = i.map((l) => l.value.cooked), s = i.map((l) => l.value.raw);
  w(a, "raw", {
    value: Qe(s)
  });
  const n = e.quasi.expressions, u = [];
  if (n)
    for (let l = 0; l < n.length; l++)
      u.push(yield* p(n[l], t));
  return r(Qe(a), ...u);
}
function* Bi(e, t) {
  return e.value.raw;
}
function* Ma(e, t) {
  if (e.id && e.id.name) {
    const r = new V(t), i = yield* je(e, r);
    return r.const(e.id.name, i), i;
  } else
    return yield* je(e, t);
}
function* Oi(e, t, r = {}) {
  const { getProto: i = !1 } = r, a = t.find(ut).get();
  return i ? a.prototype : a;
}
function* We(e, t, r = {}) {
  const i = yield* p(e.argument, t);
  if (r.spreadProps)
    return i;
  if (typeof Symbol == "function" && typeof i[Symbol.iterator] != "function")
    throw new TypeError("Spread syntax requires ...iterable[Symbol.iterator] to be a function");
  return [...i];
}
function* ja(e, t) {
  const r = yield* p(e.expression, t);
  return r === P ? void 0 : r;
}
function* Ua(e, t) {
  const r = t.global(), i = yield* p(e.source, t), a = r.find(Ee + i);
  let s;
  if (a) {
    const n = a.get();
    n && (typeof n == "function" ? s = n() : typeof n == "object" && (s = n));
  }
  return !s || typeof s != "object" ? Promise.reject(new TypeError(`Failed to resolve module specifier "${i}"`)) : Promise.resolve(s);
}
function* $a(e, t) {
  const r = yield* p(e.argument, t);
  return e.delegate ? yield* r : yield r;
}
function* qa(e, t) {
  return ve.RES = yield* p(e.argument, t), yield ve;
}
const Wa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ArrayExpression: ka,
  ArrowFunctionExpression: Oa,
  AssignmentExpression: Pa,
  AwaitExpression: qa,
  BinaryExpression: Aa,
  CallExpression: Va,
  ChainExpression: ja,
  ClassExpression: Ma,
  ConditionalExpression: Ta,
  FunctionExpression: Ca,
  ImportExpression: Ua,
  LogicalExpression: La,
  MemberExpression: qe,
  MetaProperty: Ra,
  NewExpression: Na,
  ObjectExpression: Ea,
  SequenceExpression: Ba,
  SpreadElement: We,
  Super: Oi,
  TaggedTemplateExpression: Fa,
  TemplateElement: Bi,
  TemplateLiteral: Da,
  ThisExpression: wa,
  UnaryExpression: _a,
  UpdateExpression: Ia,
  YieldExpression: $a
}, Symbol.toStringTag, { value: "Module" }));
function* Di(e, t, r = {}) {
  const { kind: i = "var", hoist: a = !1, onlyBlock: s = !1, feed: n = {} } = r, u = [];
  for (let l = 0; l < e.properties.length; l++) {
    const c = e.properties[l];
    if (a) {
      if (s || i === "var")
        if (c.type === "Property") {
          const f = c.value;
          f.type === "Identifier" ? t[i](f.name, s ? $ : i === "var" ? F : void 0) : yield* W(f, t, { kind: i, hoist: a, onlyBlock: s });
        } else
          yield* Ae(c, t, { kind: i, hoist: a, onlyBlock: s });
    } else if (c.type === "Property") {
      let f;
      c.computed ? f = yield* p(c.key, t) : f = c.key.name, u.push(f);
      const g = c.value;
      g.type === "Identifier" ? t[i](g.name, n[f]) : yield* W(g, t, { kind: i, feed: n[f] });
    } else {
      const f = z({}, n);
      for (let g = 0; g < u.length; g++) delete f[u[g]];
      yield* Ae(c, t, { kind: i, feed: f });
    }
  }
}
function* Fi(e, t, r = {}) {
  const { kind: i, hoist: a = !1, onlyBlock: s = !1, feed: n = [] } = r, u = [];
  for (let l = 0; l < e.elements.length; l++) {
    const c = e.elements[l];
    if (c)
      if (a)
        (s || i === "var") && (c.type === "Identifier" ? t[i](c.name, s ? $ : i === "var" ? F : void 0) : yield* W(c, t, { kind: i, hoist: a, onlyBlock: s }));
      else if (c.type === "Identifier")
        if (i)
          t[i](c.name, n[l]);
        else {
          const f = yield* Re(c, t, { getVar: !0 });
          f.set(n[l]), u.push(f.get());
        }
      else c.type === "RestElement" ? yield* Ae(c, t, { kind: i, feed: n.slice(l) }) : yield* W(c, t, { kind: i, feed: n[l] });
  }
  if (u.length)
    return u;
}
function* Ae(e, t, r = {}) {
  const { kind: i, hoist: a = !1, onlyBlock: s = !1, feed: n = [] } = r, u = e.argument;
  a ? (s || i === "var") && (u.type === "Identifier" ? t[i](u.name, s ? $ : i === "var" ? F : void 0) : yield* W(u, t, { kind: i, hoist: a, onlyBlock: s })) : u.type === "Identifier" ? i ? t[i](u.name, n) : (yield* Re(u, t, { getVar: !0 })).set(n) : yield* W(u, t, { kind: i, feed: n });
}
function* Mi(e, t, r = {}) {
  const { kind: i = "var", hoist: a = !1, onlyBlock: s = !1, feed: n = yield* p(e.right, t) } = r, u = e.left;
  a ? (s || i === "var") && (u.type === "Identifier" ? t[i](u.name, s ? $ : i === "var" ? F : void 0) : yield* W(u, t, { kind: i, hoist: a, onlyBlock: s })) : u.type === "Identifier" ? t[i](u.name, n) : yield* W(u, t, { kind: i, feed: n });
}
const za = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ArrayPattern: Fi,
  AssignmentPattern: Mi,
  ObjectPattern: Di,
  RestElement: Ae
}, Symbol.toStringTag, { value: "Module" }));
function* Ga(e, t) {
  for (let r = 0; r < e.body.length; r++) {
    const i = e.body[r];
    if (i.type === "ExpressionStatement" && i.directive)
      i.directive === "use strict" && !t.find(H) && t.const(H, !0);
    else
      break;
  }
  for (let r = 0; r < e.body.length; r++)
    yield* p(e.body[r], t);
}
const Ha = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Program: Ga
}, Symbol.toStringTag, { value: "Module" }));
let yt;
function* p(e, t) {
  if (!e) return;
  yt || (yt = z(
    {},
    kr,
    Wa,
    va,
    wr,
    Sa,
    za,
    Ha
  ));
  const r = yt[e.type];
  if (r)
    return yield* r(e, t);
  throw new Error(`${e.type} isn't implemented`);
}
function* Ka(e, t) {
  yield* p(e.expression, t);
}
function* ce(e, t, r = {}) {
  const {
    invasived: i = !1,
    hoisted: a = !1
  } = r, s = i ? t : new V(t);
  a || (yield* Dt(e, s, { onlyBlock: !0 }));
  for (let n = 0; n < e.body.length; n++) {
    const u = yield* p(e.body[n], s);
    if (u === _) {
      if (u.LABEL && u.LABEL === r.label)
        break;
      return u;
    }
    if (u === C || u === k)
      return u;
  }
}
function* Qa() {
}
function* Xa() {
  debugger;
}
function* Ya(e, t) {
  return k.RES = e.argument ? yield* p(e.argument, t) : void 0, k;
}
function* Za(e) {
  var t;
  return _.LABEL = (t = e.label) == null ? void 0 : t.name, _;
}
function* Ja(e) {
  var t;
  return C.LABEL = (t = e.label) == null ? void 0 : t.name, C;
}
function* es(e, t) {
  const r = e.label.name;
  if (e.body.type === "WhileStatement")
    return yield* zi(e.body, t, { label: r });
  if (e.body.type === "DoWhileStatement")
    return yield* Gi(e.body, t, { label: r });
  if (e.body.type === "ForStatement")
    return yield* Hi(e.body, t, { label: r });
  if (e.body.type === "ForInStatement")
    return yield* Ki(e.body, t, { label: r });
  if (e.body.type === "ForOfStatement")
    return yield* Qi(e.body, t, { label: r });
  if (e.body.type === "BlockStatement")
    return yield* ce(e.body, t, { label: r });
  if (e.body.type === "WithStatement")
    return yield* ji(e.body, t, { label: r });
  if (e.body.type === "IfStatement")
    return yield* Ui(e.body, t, { label: r });
  if (e.body.type === "SwitchStatement")
    return yield* $i(e.body, t, { label: r });
  if (e.body.type === "TryStatement")
    return yield* qi(e.body, t, { label: r });
  throw new SyntaxError(`${e.body.type} cannot be labeled`);
}
function* ji(e, t, r = {}) {
  const i = new V(t);
  i.with(yield* p(e.object, t));
  const a = yield* p(e.body, i);
  if (a === _)
    return a.LABEL && a.LABEL === r.label ? void 0 : a;
  if (a === C || a === k)
    return a;
}
function* Ui(e, t, r = {}) {
  let i;
  if ((yield* p(e.test, t)) ? i = yield* p(e.consequent, t) : i = yield* p(e.alternate, t), i === _)
    return i.LABEL && i.LABEL === r.label ? void 0 : i;
  if (i === C || i === k)
    return i;
}
function* $i(e, t, r = {}) {
  const i = yield* p(e.discriminant, t);
  let a = !1, s = -1;
  for (let n = 0; n < e.cases.length; n++) {
    const u = e.cases[n];
    if (u.test ? !a && (yield* p(u.test, t)) === i && (a = !0, s = -1) : s = n, a) {
      const l = yield* wt(u, t);
      if (l === _) {
        if (l.LABEL === r.label)
          break;
        return l;
      }
      if (l === C || l === k)
        return l;
    }
  }
  if (!a && s !== -1)
    for (let n = s; n < e.cases.length; n++) {
      const u = yield* wt(e.cases[n], t);
      if (u === _) {
        if (u.LABEL === r.label)
          break;
        return u;
      }
      if (u === C || u === k)
        return u;
    }
}
function* wt(e, t) {
  for (let r = 0; r < e.consequent.length; r++) {
    const i = yield* p(e.consequent[r], t);
    if (i === _ || i === C || i === k)
      return i;
  }
}
function* ts(e, t) {
  throw yield* p(e.argument, t);
}
function* qi(e, t, r = {}) {
  let i;
  try {
    i = yield* ce(e.block, t);
  } catch (a) {
    if (e.handler) {
      const s = new V(t), n = e.handler.param;
      if (n)
        if (n.type === "Identifier") {
          const u = n.name;
          s.var(u, a);
        } else
          yield* W(n, t, { feed: a });
      i = yield* Wi(e.handler, s);
    } else
      throw a;
  } finally {
    e.finalizer && (i = yield* ce(e.finalizer, t));
  }
  if (i === _)
    return i.LABEL && i.LABEL === r.label ? void 0 : i;
  if (i === C || i === k)
    return i;
}
function* Wi(e, t) {
  return yield* ce(e.body, t, { invasived: !0 });
}
function* zi(e, t, r = {}) {
  for (; yield* p(e.test, t); ) {
    const i = yield* p(e.body, t);
    if (i === _) {
      if (i.LABEL === r.label)
        break;
      return i;
    } else if (i === C) {
      if (i.LABEL === r.label)
        continue;
      return i;
    } else if (i === k)
      return i;
  }
}
function* Gi(e, t, r = {}) {
  do {
    const i = yield* p(e.body, t);
    if (i === _) {
      if (i.LABEL === r.label)
        break;
      return i;
    } else if (i === C) {
      if (i.LABEL === r.label)
        continue;
      return i;
    } else if (i === k)
      return i;
  } while (yield* p(e.test, t));
}
function* Hi(e, t, r = {}) {
  const i = new V(t);
  for (e.init ? yield* p(e.init, i) : void 0; !e.test || (yield* p(e.test, i)); e.update ? yield* p(e.update, i) : void 0) {
    const a = new V(i);
    let s;
    if (e.body.type === "BlockStatement" ? s = yield* ce(e.body, a, { invasived: !0 }) : s = yield* p(e.body, a), s === _) {
      if (s.LABEL === r.label)
        break;
      return s;
    } else if (s === C) {
      if (s.LABEL === r.label)
        continue;
      return s;
    } else if (s === k)
      return s;
  }
}
function* Ki(e, t, r = {}) {
  for (const i in yield* p(e.right, t)) {
    const a = yield* Et(e, t, { value: i });
    if (a === _) {
      if (a.LABEL === r.label)
        break;
      return a;
    } else if (a === C) {
      if (a.LABEL === r.label)
        continue;
      return a;
    } else if (a === k)
      return a;
  }
}
function* Qi(e, t, r = {}) {
  const i = yield* p(e.right, t);
  if (e.await) {
    const a = Tr(i);
    let s;
    for (ve.RES = a.next(), s = yield ve; !s.done; ve.RES = a.next(), s = yield ve) {
      const n = yield* Et(e, t, { value: s.value });
      if (n === _) {
        if (n.LABEL === r.label)
          break;
        return n;
      } else if (n === C) {
        if (n.LABEL === r.label)
          continue;
        return n;
      } else if (n === k)
        return n;
    }
  } else
    for (const a of i) {
      const s = yield* Et(e, t, { value: a });
      if (s === _) {
        if (s.LABEL === r.label)
          break;
        return s;
      } else if (s === C) {
        if (s.LABEL === r.label)
          continue;
        return s;
      } else if (s === k)
        return s;
    }
}
function* is(e, t) {
  t.func(e.id.name, ie(e, t));
}
function* Se(e, t, r = {}) {
  for (let i = 0; i < e.declarations.length; i++)
    yield* Xi(e.declarations[i], t, z({ kind: e.kind }, r));
}
function* Xi(e, t, r = {}) {
  const { kind: i = "var", hoist: a = !1, onlyBlock: s = !1, feed: n } = r;
  if (a)
    (s || i === "var") && (e.id.type === "Identifier" ? t[i](e.id.name, s ? $ : i === "var" ? F : void 0) : yield* W(e.id, t, { kind: i, hoist: a, onlyBlock: s }));
  else {
    const u = "feed" in r, l = u ? n : yield* p(e.init, t);
    if (e.id.type === "Identifier") {
      const c = e.id.name;
      i === "var" && !e.init && !u ? t.var(c, F) : t[i](c, l), e.init && ["ClassExpression", "FunctionExpression", "ArrowFunctionExpression"].indexOf(e.init.type) !== -1 && !l.name && w(l, "name", {
        value: c,
        configurable: !0
      });
    } else
      yield* W(e.id, t, { kind: i, feed: l });
  }
}
function* rs(e, t) {
  t.func(e.id.name, yield* je(e, t));
}
function* Yi(e, t, r = {}) {
  const { klass: i, superClass: a } = r;
  for (let s = 0; s < e.body.length; s++) {
    const n = e.body[s];
    n.type === "MethodDefinition" ? yield* Zi(n, t, { klass: i, superClass: a }) : n.type === "PropertyDefinition" && n.static ? yield* Rt(n, t, { klass: i, superClass: a }) : n.type === "StaticBlock" && (yield* Ji(n, t, { klass: i }));
  }
}
function* Zi(e, t, r = {}) {
  const { klass: i, superClass: a } = r;
  let s, n = !1;
  if (e.computed)
    s = yield* p(e.key, t);
  else if (e.key.type === "Identifier")
    s = e.key.name;
  else if (e.key.type === "PrivateIdentifier")
    s = e.key.name, n = !0;
  else
    throw new SyntaxError("Unexpected token");
  let u = e.static ? i : i.prototype;
  n && (u[R] || w(u, R, { value: {} }), u = u[R]);
  const l = ie(e.value, t, { superClass: a });
  switch (e.kind) {
    case "constructor":
      break;
    case "method":
      w(u, s, {
        value: l,
        writable: !0,
        configurable: !0
      });
      break;
    case "get": {
      const c = de(u, s);
      w(u, s, {
        get: l,
        set: c && c.set,
        configurable: !0
      });
      break;
    }
    case "set": {
      const c = de(u, s);
      w(u, s, {
        get: c && c.get,
        set: l,
        configurable: !0
      });
      break;
    }
    default:
      throw new SyntaxError("Unexpected token");
  }
}
function* Rt(e, t, r = {}) {
  const { klass: i, superClass: a } = r;
  let s, n = !1;
  if (e.computed)
    s = yield* p(e.key, t);
  else if (e.key.type === "Identifier")
    s = e.key.name;
  else if (e.key.type === "PrivateIdentifier")
    s = e.key.name, n = !0;
  else
    throw new SyntaxError("Unexpected token");
  const u = new V(t, !0);
  u.const("this", i);
  let l = i;
  n && (l[R] || w(l, R, { value: {} }), l = l[R]), e.value ? e.value.type === "FunctionExpression" || e.value.type === "ArrowFunctionExpression" ? l[s] = ie(e.value, u, { superClass: a }) : l[s] = yield* p(e.value, u) : l[s] = void 0;
}
function* Ji(e, t, r = {}) {
  const { klass: i } = r, a = new V(t, !0);
  return a.const("this", i), yield* ce(e, a, { invasived: !0 });
}
function* as(e, t) {
  const i = t.global().find(Ee + e.source.value);
  let a;
  if (i) {
    const s = i.get();
    s && (typeof s == "function" ? a = s() : typeof s == "object" && (a = s));
  }
  if (!a || typeof a != "object")
    throw new TypeError(`Failed to resolve module specifier "${e.source.value}"`);
  for (let s = 0; s < e.specifiers.length; s++) {
    const n = e.specifiers[s];
    let u;
    if (n.type === "ImportSpecifier" ? u = n.imported.type === "Identifier" ? n.imported.name : n.imported.value : n.type === "ImportDefaultSpecifier" ? u = "default" : n.type === "ImportNamespaceSpecifier" && (u = "*"), u !== "*" && !Ct(a, u))
      throw new SyntaxError(`The requested module "${e.source.value}" does not provide an export named "${u}"`);
    t.var(n.local.name, u === "*" ? z({}, a) : a[u]);
  }
}
function* ss(e, t) {
  const r = t.global();
  let i;
  e.declaration.type === "FunctionDeclaration" ? (i = ie(e.declaration, t), t.func(e.declaration.id.name, i)) : e.declaration.type === "ClassDeclaration" ? (i = yield* je(e.declaration, t), t.func(e.declaration.id.name, i)) : i = yield* p(e.declaration, t);
  const a = r.find(G);
  if (a) {
    const s = a.get();
    s && typeof s == "object" && (s.default = i);
  }
}
function* ns(e, t) {
  const r = t.global();
  if (e.declaration) {
    if (e.declaration.type === "FunctionDeclaration") {
      const i = ie(e.declaration, t);
      t.func(e.declaration.id.name, i);
      const a = r.find(G);
      if (a) {
        const s = a.get();
        s && typeof s == "object" && (s[e.declaration.id.name] = i);
      }
    } else if (e.declaration.type === "ClassDeclaration") {
      const i = yield* je(e.declaration, t);
      t.func(e.declaration.id.name, i);
      const a = r.find(G);
      if (a) {
        const s = a.get();
        s && typeof s == "object" && (s[e.declaration.id.name] = i);
      }
    } else if (e.declaration.type === "VariableDeclaration") {
      yield* Se(e.declaration, t);
      const i = r.find(G);
      if (i) {
        const a = i.get();
        if (a && typeof a == "object")
          for (let s = 0; s < e.declaration.declarations.length; s++) {
            const n = e.declaration.declarations[s].id.name, u = t.find(n);
            u && (a[n] = u.get());
          }
      }
    }
  } else if (e.specifiers) {
    const i = r.find(G);
    if (i) {
      const a = i.get();
      if (a && typeof a == "object")
        for (let s = 0; s < e.specifiers.length; s++) {
          const n = e.specifiers[s], u = n.local.type === "Identifier" ? n.local.name : n.local.value, l = t.find(u);
          l && (a[n.exported.type === "Identifier" ? n.exported.name : n.exported.value] = l.get());
        }
    }
  }
}
function* os(e, t) {
  const r = t.global(), i = r.find(Ee + e.source.value);
  let a;
  if (i) {
    const n = i.get();
    n && (typeof n == "function" ? a = n() : typeof n == "object" && (a = n));
  }
  if (!a || typeof a != "object")
    throw new TypeError(`Failed to resolve module specifier "${e.source.value}"`);
  const s = r.find(G);
  if (s) {
    const n = s.get();
    n && typeof n == "object" && z(n, a);
  }
}
function xe(e, t, r = {}) {
  const { getVar: i = !1, throwErr: a = !0 } = r;
  if (e.name === "undefined")
    return;
  const s = t.find(e.name);
  if (s) {
    if (i)
      return s;
    {
      const n = s.get();
      if (n === $)
        throw new ReferenceError(`${e.name} is not defined`);
      return n;
    }
  } else {
    if (a)
      throw new ReferenceError(`${e.name} is not defined`);
    return;
  }
}
const us = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Identifier: xe
}, Symbol.toStringTag, { value: "Module" }));
function er(e, t) {
  return e.regex ? new RegExp(e.regex.pattern, e.regex.flags) : e.value;
}
const ls = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Literal: er
}, Symbol.toStringTag, { value: "Module" }));
function cs(e, t) {
  const r = t.find(ye);
  if (r && r.get() !== !0)
    throw new ReferenceError("Must call super constructor in derived class before accessing 'this' or returning from derived constructor");
  return t.find("this").get();
}
function fs(e, t) {
  let r = [];
  for (let i = 0; i < e.elements.length; i++) {
    const a = e.elements[i];
    a.type === "SpreadElement" ? r = r.concat(Ge(a, t)) : r.push(d(a, t));
  }
  return r;
}
function hs(e, t) {
  const r = {};
  for (let i = 0; i < e.properties.length; i++) {
    const a = e.properties[i];
    if (a.type === "SpreadElement")
      z(r, Ge(a, t, { spreadProps: !0 }));
    else {
      let s;
      const n = a.key;
      a.computed ? s = d(n, t) : n.type === "Identifier" ? s = n.name : s = "" + er(n);
      const u = d(a.value, t), l = a.kind;
      if (l === "init")
        r[s] = u;
      else if (l === "get") {
        const c = de(r, s);
        w(r, s, {
          get: u,
          set: c && c.set,
          enumerable: !0,
          configurable: !0
        });
      } else {
        const c = de(r, s);
        w(r, s, {
          get: c && c.get,
          set: u,
          enumerable: !0,
          configurable: !0
        });
      }
    }
  }
  return r;
}
function ps(e, t) {
  if (e.id && e.id.name) {
    const r = new V(t), i = te(e, r);
    return r.const(e.id.name, i), i;
  } else
    return te(e, t);
}
function ds(e, t) {
  const r = e.argument;
  switch (e.operator) {
    case "+":
      return +d(r, t);
    case "-":
      return -d(r, t);
    case "!":
      return !d(r, t);
    case "~":
      return ~d(r, t);
    case "void":
      return void d(r, t);
    case "typeof":
      return r.type === "Identifier" ? typeof xe(r, t, { throwErr: !1 }) : typeof d(r, t);
    case "delete":
      if (r.type === "MemberExpression")
        return ze(r, t, { getVar: !0 }).del();
      if (r.type === "Identifier")
        throw new SyntaxError("Delete of an unqualified identifier in strict mode");
      return d(r, t), !0;
    /* istanbul ignore next */
    default:
      throw new SyntaxError(`Unexpected token ${e.operator}`);
  }
}
function ys(e, t) {
  const r = e.argument;
  let i;
  if (r.type === "Identifier")
    i = xe(r, t, { getVar: !0 });
  else if (r.type === "MemberExpression")
    i = ze(r, t, { getVar: !0 });
  else
    throw new SyntaxError("Unexpected token");
  const a = i.get();
  if (e.operator === "++")
    return i.set(a + 1), e.prefix ? i.get() : a;
  if (e.operator === "--")
    return i.set(a - 1), e.prefix ? i.get() : a;
  throw new SyntaxError(`Unexpected token ${e.operator}`);
}
function ms(e, t) {
  let r, i;
  switch (e.left.type === "PrivateIdentifier" ? (r = e.left.name, i = d(e.right, t), i = i[R] || {}) : (r = d(e.left, t), i = d(e.right, t)), e.operator) {
    case "==":
      return r == i;
    case "!=":
      return r != i;
    case "===":
      return r === i;
    case "!==":
      return r !== i;
    case "<":
      return r < i;
    case "<=":
      return r <= i;
    case ">":
      return r > i;
    case ">=":
      return r >= i;
    case "<<":
      return r << i;
    case ">>":
      return r >> i;
    case ">>>":
      return r >>> i;
    case "+":
      return r + i;
    case "-":
      return r - i;
    case "*":
      return r * i;
    case "**":
      return r ** i;
    case "/":
      return r / i;
    case "%":
      return r % i;
    case "|":
      return r | i;
    case "^":
      return r ^ i;
    case "&":
      return r & i;
    case "in":
      return r in i;
    case "instanceof":
      return r instanceof i;
    /* istanbul ignore next */
    default:
      throw new SyntaxError(`Unexpected token ${e.operator}`);
  }
}
function gs(e, t) {
  const r = e.left;
  let i;
  if (r.type === "Identifier") {
    if (i = xe(r, t, { getVar: !0, throwErr: !1 }), !i) {
      const s = t.find(H);
      if (s && s.get())
        throw new ReferenceError(`${r.name} is not defined`);
      const n = t.global().find("window").get();
      i = new me(n, r.name);
    }
  } else if (r.type === "MemberExpression")
    i = ze(r, t, { getVar: !0 });
  else {
    const s = d(e.right, t);
    return q(r, t, { feed: s });
  }
  const a = d(e.right, t);
  switch (e.operator) {
    case "=":
      return i.set(a), i.get();
    case "+=":
      return i.set(i.get() + a), i.get();
    case "-=":
      return i.set(i.get() - a), i.get();
    case "*=":
      return i.set(i.get() * a), i.get();
    case "/=":
      return i.set(i.get() / a), i.get();
    case "%=":
      return i.set(i.get() % a), i.get();
    case "**=":
      return i.set(i.get() ** a), i.get();
    case "<<=":
      return i.set(i.get() << a), i.get();
    case ">>=":
      return i.set(i.get() >> a), i.get();
    case ">>>=":
      return i.set(i.get() >>> a), i.get();
    case "|=":
      return i.set(i.get() | a), i.get();
    case "^=":
      return i.set(i.get() ^ a), i.get();
    case "&=":
      return i.set(i.get() & a), i.get();
    case "??=":
      return i.set(i.get() ?? a), i.get();
    case "&&=":
      return i.set(i.get() && a), i.get();
    case "||=":
      return i.set(i.get() || a), i.get();
    /* istanbul ignore next */
    default:
      throw new SyntaxError(`Unexpected token ${e.operator}`);
  }
}
function xs(e, t) {
  switch (e.operator) {
    case "||":
      return d(e.left, t) || d(e.right, t);
    case "&&":
      return d(e.left, t) && d(e.right, t);
    case "??":
      return d(e.left, t) ?? d(e.right, t);
    default:
      throw new SyntaxError(`Unexpected token ${e.operator}`);
  }
}
function ze(e, t, r = {}) {
  const { getObj: i = !1, getVar: a = !1 } = r;
  let s;
  if (e.object.type === "Super" ? s = ir(e.object, t, { getProto: !0 }) : s = d(e.object, t), s === P) return P;
  if (i) return s;
  let n, u = !1;
  if (e.computed ? n = d(e.property, t) : e.property.type === "PrivateIdentifier" ? (n = e.property.name, u = !0) : n = e.property.name, u && (s = s[R]), a) {
    const l = Xt(s, n);
    if (e.object.type === "Super" && l) {
      const c = t.find("this").get(), f = B(n);
      return w(c, f, { set: l }), new me(c, f);
    } else
      return new me(s, n);
  } else {
    const l = Qt(s, n);
    if (e.object.type === "Super" && l) {
      const c = t.find("this").get();
      return e.optional && c == null ? P : l.call(c);
    } else
      return e.optional && s == null ? P : s[n];
  }
}
function bs(e, t) {
  return d(e.test, t) ? d(e.consequent, t) : d(e.alternate, t);
}
function vs(e, t) {
  var s;
  let r, i;
  if (e.callee.type === "MemberExpression") {
    if (i = ze(e.callee, t, { getObj: !0 }), i === P || e.callee.optional && i == null)
      return P;
    let n, u = !1;
    e.callee.computed ? n = d(e.callee.property, t) : e.callee.property.type === "PrivateIdentifier" ? (n = e.callee.property.name, u = !0) : n = e.callee.property.name;
    let l = i;
    if (u && (l = l[R]), e.callee.object.type === "Super") {
      const c = t.find("this").get();
      r = l[n].bind(c);
    } else
      r = l[n];
    if (e.optional && r == null)
      return P;
    if (typeof r != "function")
      throw new TypeError(`${n} is not a function`);
    if (Ie in r)
      throw new TypeError(`Class constructor ${n} cannot be invoked without 'new'`);
  } else {
    if (r = d(e.callee, t), r === P || e.optional && r == null)
      return P;
    if (typeof r != "function" || e.callee.type !== "Super" && Ie in r) {
      let n;
      if (e.callee.type === "Identifier")
        n = e.callee.name;
      else
        try {
          n = JSON.stringify(r);
        } catch {
          n = "" + r;
        }
      throw typeof r != "function" ? new TypeError(`${n} is not a function`) : new TypeError(`Class constructor ${n} cannot be invoked without 'new'`);
    }
    e.callee.type === "Super" ? i = t.find("this").get() : i = !!((s = t.find(H)) != null && s.get()) || !!(r && r[ft]) ? void 0 : t.find("this").get();
  }
  let a = [];
  for (let n = 0; n < e.arguments.length; n++) {
    const u = e.arguments[n];
    u.type === "SpreadElement" ? a = a.concat(Ge(u, t)) : a.push(d(u, t));
  }
  if (e.callee.type === "Super") {
    const u = t.find(ye).get();
    if (u === !0)
      throw new ReferenceError("Super constructor may only be called once");
    const l = tt(i, r, a);
    return u(l), t.find("this").set(l), t.find(ye).set(!0), l;
  }
  try {
    return r.apply(i, a);
  } catch (n) {
    if (n instanceof TypeError && n.message === "Illegal invocation" && r.toString().indexOf("[native code]") !== -1) {
      const u = t.global().find("window").get();
      if (u && u[Oe])
        return r.apply(u[Oe], a);
    }
    throw n;
  }
}
function Ss(e, t) {
  const r = d(e.callee, t);
  if (typeof r != "function") {
    let a;
    if (e.callee.type === "Identifier")
      a = e.callee.name;
    else
      try {
        a = JSON.stringify(r);
      } catch {
        a = "" + r;
      }
    throw new TypeError(`${a} is not a constructor`);
  } else if (r[lt])
    throw new TypeError(`${r.name || "(intermediate value)"} is not a constructor`);
  let i = [];
  for (let a = 0; a < e.arguments.length; a++) {
    const s = e.arguments[a];
    s.type === "SpreadElement" ? i = i.concat(Ge(s, t)) : i.push(d(s, t));
  }
  return new r(...i);
}
function ws(e, t) {
  if (e.meta.name === "new" && e.property.name === "target")
    return t.find(ct).get();
  if (e.meta.name === "import" && e.property.name === "meta")
    return { url: "" };
}
function ks(e, t) {
  let r;
  for (let i = 0; i < e.expressions.length; i++)
    r = d(e.expressions[i], t);
  return r;
}
function Es(e, t) {
  return te(e, t);
}
function Cs(e, t) {
  const r = e.quasis.slice(), i = e.expressions.slice();
  let a = "", s, n;
  for (; s = r.shift(); )
    a += tr(s), n = i.shift(), n && (a += d(n, t));
  return a;
}
function _s(e, t) {
  const r = d(e.tag, t), i = e.quasi.quasis, a = i.map((l) => l.value.cooked), s = i.map((l) => l.value.raw);
  w(a, "raw", {
    value: Qe(s)
  });
  const n = e.quasi.expressions, u = [];
  if (n)
    for (let l = 0; l < n.length; l++)
      u.push(d(n[l], t));
  return r(Qe(a), ...u);
}
function tr(e, t) {
  return e.value.raw;
}
function Is(e, t) {
  if (e.id && e.id.name) {
    const r = new V(t), i = Me(e, r);
    return r.const(e.id.name, i), i;
  } else
    return Me(e, t);
}
function ir(e, t, r = {}) {
  const { getProto: i = !1 } = r, a = t.find(ut).get();
  return i ? a.prototype : a;
}
function Ge(e, t, r = {}) {
  const i = d(e.argument, t);
  if (r.spreadProps)
    return i;
  if (typeof Symbol == "function" && typeof i[Symbol.iterator] != "function")
    throw new TypeError("Spread syntax requires ...iterable[Symbol.iterator] to be a function");
  return [...i];
}
function As(e, t) {
  const r = d(e.expression, t);
  return r === P ? void 0 : r;
}
function Ps(e, t) {
  const r = t.global(), i = d(e.source, t), a = r.find(Ee + i);
  let s;
  if (a) {
    const n = a.get();
    n && (typeof n == "function" ? s = n() : typeof n == "object" && (s = n));
  }
  return !s || typeof s != "object" ? Promise.reject(new TypeError(`Failed to resolve module specifier "${i}"`)) : Promise.resolve(s);
}
const Ls = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ArrayExpression: fs,
  ArrowFunctionExpression: Es,
  AssignmentExpression: gs,
  BinaryExpression: ms,
  CallExpression: vs,
  ChainExpression: As,
  ClassExpression: Is,
  ConditionalExpression: bs,
  FunctionExpression: ps,
  ImportExpression: Ps,
  LogicalExpression: xs,
  MemberExpression: ze,
  MetaProperty: ws,
  NewExpression: Ss,
  ObjectExpression: hs,
  SequenceExpression: ks,
  SpreadElement: Ge,
  Super: ir,
  TaggedTemplateExpression: _s,
  TemplateElement: tr,
  TemplateLiteral: Cs,
  ThisExpression: cs,
  UnaryExpression: ds,
  UpdateExpression: ys
}, Symbol.toStringTag, { value: "Module" }));
function rr(e, t, r = {}) {
  const { kind: i = "var", hoist: a = !1, onlyBlock: s = !1, feed: n = {} } = r, u = [];
  for (let l = 0; l < e.properties.length; l++) {
    const c = e.properties[l];
    if (a) {
      if (s || i === "var")
        if (c.type === "Property") {
          const f = c.value;
          f.type === "Identifier" ? t[i](f.name, s ? $ : i === "var" ? F : void 0) : q(f, t, { kind: i, hoist: a, onlyBlock: s });
        } else
          Pe(c, t, { kind: i, hoist: a, onlyBlock: s });
    } else if (c.type === "Property") {
      let f;
      c.computed ? f = d(c.key, t) : f = c.key.name, u.push(f);
      const g = c.value;
      g.type === "Identifier" ? t[i](g.name, n[f]) : q(g, t, { kind: i, feed: n[f] });
    } else {
      const f = z({}, n);
      for (let g = 0; g < u.length; g++) delete f[u[g]];
      Pe(c, t, { kind: i, feed: f });
    }
  }
}
function ar(e, t, r = {}) {
  const { kind: i, hoist: a = !1, onlyBlock: s = !1, feed: n = [] } = r, u = [];
  for (let l = 0; l < e.elements.length; l++) {
    const c = e.elements[l];
    if (c)
      if (a)
        (s || i === "var") && (c.type === "Identifier" ? t[i](c.name, s ? $ : i === "var" ? F : void 0) : q(c, t, { kind: i, hoist: a, onlyBlock: s }));
      else if (c.type === "Identifier")
        if (i)
          t[i](c.name, n[l]);
        else {
          const f = xe(c, t, { getVar: !0 });
          f.set(n[l]), u.push(f.get());
        }
      else c.type === "RestElement" ? Pe(c, t, { kind: i, feed: n.slice(l) }) : q(c, t, { kind: i, feed: n[l] });
  }
  if (u.length)
    return u;
}
function Pe(e, t, r = {}) {
  const { kind: i, hoist: a = !1, onlyBlock: s = !1, feed: n = [] } = r, u = e.argument;
  a ? (s || i === "var") && (u.type === "Identifier" ? t[i](u.name, s ? $ : i === "var" ? F : void 0) : q(u, t, { kind: i, hoist: a, onlyBlock: s })) : u.type === "Identifier" ? i ? t[i](u.name, n) : xe(u, t, { getVar: !0 }).set(n) : q(u, t, { kind: i, feed: n });
}
function sr(e, t, r = {}) {
  const { kind: i = "var", hoist: a = !1, onlyBlock: s = !1, feed: n = d(e.right, t) } = r, u = e.left;
  a ? (s || i === "var") && (u.type === "Identifier" ? t[i](u.name, s ? $ : i === "var" ? F : void 0) : q(u, t, { kind: i, hoist: a, onlyBlock: s })) : u.type === "Identifier" ? t[i](u.name, n) : q(u, t, { kind: i, feed: n });
}
const Ts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ArrayPattern: ar,
  AssignmentPattern: sr,
  ObjectPattern: rr,
  RestElement: Pe
}, Symbol.toStringTag, { value: "Module" }));
function Vs(e, t) {
  for (let r = 0; r < e.body.length; r++) {
    const i = e.body[r];
    if (i.type === "ExpressionStatement" && i.directive)
      i.directive === "use strict" && !t.find(H) && t.const(H, !0);
    else
      break;
  }
  for (let r = 0; r < e.body.length; r++)
    d(e.body[r], t);
}
const Ns = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Program: Vs
}, Symbol.toStringTag, { value: "Module" }));
let mt;
function d(e, t) {
  if (!e) return;
  mt || (mt = z(
    {},
    Cr,
    Ls,
    us,
    Er,
    ls,
    Ts,
    Ns
  ));
  const r = mt[e.type];
  if (r)
    return r(e, t);
  throw new Error(`${e.type} isn't implemented`);
}
function Rs(e, t) {
  d(e.expression, t);
}
function fe(e, t, r = {}) {
  const {
    invasived: i = !1,
    hoisted: a = !1
  } = r, s = i ? t : new V(t);
  a || Ot(e, s, { onlyBlock: !0 });
  for (let n = 0; n < e.body.length; n++) {
    const u = d(e.body[n], s);
    if (u === _) {
      if (u.LABEL && u.LABEL === r.label)
        break;
      return u;
    }
    if (u === C || u === k)
      return u;
  }
}
function Bs() {
}
function Os() {
  debugger;
}
function Ds(e, t) {
  return k.RES = e.argument ? d(e.argument, t) : void 0, k;
}
function Fs(e) {
  var t;
  return _.LABEL = (t = e.label) == null ? void 0 : t.name, _;
}
function Ms(e) {
  var t;
  return C.LABEL = (t = e.label) == null ? void 0 : t.name, C;
}
function js(e, t) {
  const r = e.label.name;
  if (e.body.type === "WhileStatement")
    return fr(e.body, t, { label: r });
  if (e.body.type === "DoWhileStatement")
    return hr(e.body, t, { label: r });
  if (e.body.type === "ForStatement")
    return pr(e.body, t, { label: r });
  if (e.body.type === "ForInStatement")
    return dr(e.body, t, { label: r });
  if (e.body.type === "ForOfStatement")
    return yr(e.body, t, { label: r });
  if (e.body.type === "BlockStatement")
    return fe(e.body, t, { label: r });
  if (e.body.type === "WithStatement")
    return nr(e.body, t, { label: r });
  if (e.body.type === "IfStatement")
    return or(e.body, t, { label: r });
  if (e.body.type === "SwitchStatement")
    return ur(e.body, t, { label: r });
  if (e.body.type === "TryStatement")
    return lr(e.body, t, { label: r });
  throw new SyntaxError(`${e.body.type} cannot be labeled`);
}
function nr(e, t, r = {}) {
  const i = new V(t);
  i.with(d(e.object, t));
  const a = d(e.body, i);
  if (a === _)
    return a.LABEL && a.LABEL === r.label ? void 0 : a;
  if (a === C || a === k)
    return a;
}
function or(e, t, r = {}) {
  let i;
  if (d(e.test, t) ? i = d(e.consequent, t) : i = d(e.alternate, t), i === _)
    return i.LABEL && i.LABEL === r.label ? void 0 : i;
  if (i === C || i === k)
    return i;
}
function ur(e, t, r = {}) {
  const i = d(e.discriminant, t);
  let a = !1, s = -1;
  for (let n = 0; n < e.cases.length; n++) {
    const u = e.cases[n];
    if (u.test ? !a && d(u.test, t) === i && (a = !0, s = -1) : s = n, a) {
      const l = kt(u, t);
      if (l === _) {
        if (l.LABEL === r.label)
          break;
        return l;
      }
      if (l === C || l === k)
        return l;
    }
  }
  if (!a && s !== -1)
    for (let n = s; n < e.cases.length; n++) {
      const u = kt(e.cases[n], t);
      if (u === _) {
        if (u.LABEL === r.label)
          break;
        return u;
      }
      if (u === C || u === k)
        return u;
    }
}
function kt(e, t) {
  for (let r = 0; r < e.consequent.length; r++) {
    const i = d(e.consequent[r], t);
    if (i === _ || i === C || i === k)
      return i;
  }
}
function Us(e, t) {
  throw d(e.argument, t);
}
function lr(e, t, r = {}) {
  let i;
  try {
    i = fe(e.block, t);
  } catch (a) {
    if (e.handler) {
      const s = new V(t), n = e.handler.param;
      if (n)
        if (n.type === "Identifier") {
          const u = n.name;
          s.var(u, a);
        } else
          q(n, t, { feed: a });
      i = cr(e.handler, s);
    } else
      throw a;
  } finally {
    e.finalizer && (i = fe(e.finalizer, t));
  }
  if (i === _)
    return i.LABEL && i.LABEL === r.label ? void 0 : i;
  if (i === C || i === k)
    return i;
}
function cr(e, t) {
  return fe(e.body, t, { invasived: !0 });
}
function fr(e, t, r = {}) {
  for (; d(e.test, t); ) {
    const i = d(e.body, t);
    if (i === _) {
      if (i.LABEL === r.label)
        break;
      return i;
    } else if (i === C) {
      if (i.LABEL === r.label)
        continue;
      return i;
    } else if (i === k)
      return i;
  }
}
function hr(e, t, r = {}) {
  do {
    const i = d(e.body, t);
    if (i === _) {
      if (i.LABEL === r.label)
        break;
      return i;
    } else if (i === C) {
      if (i.LABEL === r.label)
        continue;
      return i;
    } else if (i === k)
      return i;
  } while (d(e.test, t));
}
function pr(e, t, r = {}) {
  const i = new V(t);
  for (e.init ? d(e.init, i) : void 0; !e.test || d(e.test, i); e.update ? d(e.update, i) : void 0) {
    const a = new V(i);
    let s;
    if (e.body.type === "BlockStatement" ? s = fe(e.body, a, { invasived: !0 }) : s = d(e.body, a), s === _) {
      if (s.LABEL === r.label)
        break;
      return s;
    } else if (s === C) {
      if (s.LABEL === r.label)
        continue;
      return s;
    } else if (s === k)
      return s;
  }
}
function dr(e, t, r = {}) {
  for (const i in d(e.right, t)) {
    const a = vr(e, t, { value: i });
    if (a === _) {
      if (a.LABEL === r.label)
        break;
      return a;
    } else if (a === C) {
      if (a.LABEL === r.label)
        continue;
      return a;
    } else if (a === k)
      return a;
  }
}
function yr(e, t, r = {}) {
  const i = d(e.right, t);
  for (const a of i) {
    const s = vr(e, t, { value: a });
    if (s === _) {
      if (s.LABEL === r.label)
        break;
      return s;
    } else if (s === C) {
      if (s.LABEL === r.label)
        continue;
      return s;
    } else if (s === k)
      return s;
  }
}
function $s(e, t) {
  t.func(e.id.name, te(e, t));
}
function we(e, t, r = {}) {
  for (let i = 0; i < e.declarations.length; i++)
    mr(e.declarations[i], t, z({ kind: e.kind }, r));
}
function mr(e, t, r = {}) {
  const { kind: i = "var", hoist: a = !1, onlyBlock: s = !1, feed: n } = r;
  if (a)
    (s || i === "var") && (e.id.type === "Identifier" ? t[i](e.id.name, s ? $ : i === "var" ? F : void 0) : q(e.id, t, { kind: i, hoist: a, onlyBlock: s }));
  else {
    const u = "feed" in r, l = u ? n : d(e.init, t);
    if (e.id.type === "Identifier") {
      const c = e.id.name;
      i === "var" && !e.init && !u ? t.var(c, F) : t[i](c, l), e.init && ["ClassExpression", "FunctionExpression", "ArrowFunctionExpression"].indexOf(e.init.type) !== -1 && !l.name && w(l, "name", {
        value: c,
        configurable: !0
      });
    } else
      q(e.id, t, { kind: i, feed: l });
  }
}
function qs(e, t) {
  t.func(e.id.name, Me(e, t));
}
function gr(e, t, r = {}) {
  const { klass: i, superClass: a } = r;
  for (let s = 0; s < e.body.length; s++) {
    const n = e.body[s];
    n.type === "MethodDefinition" ? xr(n, t, { klass: i, superClass: a }) : n.type === "PropertyDefinition" && n.static ? Bt(n, t, { klass: i, superClass: a }) : n.type === "StaticBlock" && br(n, t, { klass: i });
  }
}
function xr(e, t, r = {}) {
  const { klass: i, superClass: a } = r;
  let s, n = !1;
  if (e.computed)
    s = d(e.key, t);
  else if (e.key.type === "Identifier")
    s = e.key.name;
  else if (e.key.type === "PrivateIdentifier")
    s = e.key.name, n = !0;
  else
    throw new SyntaxError("Unexpected token");
  let u = e.static ? i : i.prototype;
  n && (u[R] || w(u, R, { value: {} }), u = u[R]);
  const l = te(e.value, t, { superClass: a });
  switch (e.kind) {
    case "constructor":
      break;
    case "method":
      w(u, s, {
        value: l,
        writable: !0,
        configurable: !0
      });
      break;
    case "get": {
      const c = de(u, s);
      w(u, s, {
        get: l,
        set: c && c.set,
        configurable: !0
      });
      break;
    }
    case "set": {
      const c = de(u, s);
      w(u, s, {
        get: c && c.get,
        set: l,
        configurable: !0
      });
      break;
    }
    default:
      throw new SyntaxError("Unexpected token");
  }
}
function Bt(e, t, r = {}) {
  const { klass: i, superClass: a } = r;
  let s, n = !1;
  if (e.computed)
    s = d(e.key, t);
  else if (e.key.type === "Identifier")
    s = e.key.name;
  else if (e.key.type === "PrivateIdentifier")
    s = e.key.name, n = !0;
  else
    throw new SyntaxError("Unexpected token");
  const u = new V(t, !0);
  u.const("this", i);
  let l = i;
  n && (l[R] || w(l, R, { value: {} }), l = l[R]), e.value ? e.value.type === "FunctionExpression" || e.value.type === "ArrowFunctionExpression" ? l[s] = te(e.value, u, { superClass: a }) : l[s] = d(e.value, u) : l[s] = void 0;
}
function br(e, t, r = {}) {
  const { klass: i } = r, a = new V(t, !0);
  return a.const("this", i), fe(e, a, { invasived: !0 });
}
function Ws(e, t) {
  const i = t.global().find(Ee + e.source.value);
  let a;
  if (i) {
    const s = i.get();
    s && (typeof s == "function" ? a = s() : typeof s == "object" && (a = s));
  }
  if (!a || typeof a != "object")
    throw new TypeError(`Failed to resolve module specifier "${e.source.value}"`);
  for (let s = 0; s < e.specifiers.length; s++) {
    const n = e.specifiers[s];
    let u;
    if (n.type === "ImportSpecifier" ? u = n.imported.type === "Identifier" ? n.imported.name : n.imported.value : n.type === "ImportDefaultSpecifier" ? u = "default" : n.type === "ImportNamespaceSpecifier" && (u = "*"), u !== "*" && !Ct(a, u))
      throw new SyntaxError(`The requested module "${e.source.value}" does not provide an export named "${u}"`);
    t.var(n.local.name, u === "*" ? z({}, a) : a[u]);
  }
}
function zs(e, t) {
  const r = t.global();
  let i;
  e.declaration.type === "FunctionDeclaration" ? (i = te(e.declaration, t), t.func(e.declaration.id.name, i)) : e.declaration.type === "ClassDeclaration" ? (i = Me(e.declaration, t), t.func(e.declaration.id.name, i)) : i = d(e.declaration, t);
  const a = r.find(G);
  if (a) {
    const s = a.get();
    s && typeof s == "object" && (s.default = i);
  }
}
function Gs(e, t) {
  const r = t.global();
  if (e.declaration) {
    if (e.declaration.type === "FunctionDeclaration") {
      const i = te(e.declaration, t);
      t.func(e.declaration.id.name, i);
      const a = r.find(G);
      if (a) {
        const s = a.get();
        s && typeof s == "object" && (s[e.declaration.id.name] = i);
      }
    } else if (e.declaration.type === "ClassDeclaration") {
      const i = Me(e.declaration, t);
      t.func(e.declaration.id.name, i);
      const a = r.find(G);
      if (a) {
        const s = a.get();
        s && typeof s == "object" && (s[e.declaration.id.name] = i);
      }
    } else if (e.declaration.type === "VariableDeclaration") {
      we(e.declaration, t);
      const i = r.find(G);
      if (i) {
        const a = i.get();
        if (a && typeof a == "object")
          for (let s = 0; s < e.declaration.declarations.length; s++) {
            const n = e.declaration.declarations[s].id.name, u = t.find(n);
            u && (a[n] = u.get());
          }
      }
    }
  } else if (e.specifiers) {
    const i = r.find(G);
    if (i) {
      const a = i.get();
      if (a && typeof a == "object")
        for (let s = 0; s < e.specifiers.length; s++) {
          const n = e.specifiers[s], u = n.local.type === "Identifier" ? n.local.name : n.local.value, l = t.find(u);
          l && (a[n.exported.type === "Identifier" ? n.exported.name : n.exported.value] = l.get());
        }
    }
  }
}
function Hs(e, t) {
  const r = t.global(), i = r.find(Ee + e.source.value);
  let a;
  if (i) {
    const n = i.get();
    n && (typeof n == "function" ? a = n() : typeof n == "object" && (a = n));
  }
  if (!a || typeof a != "object")
    throw new TypeError(`Failed to resolve module specifier "${e.source.value}"`);
  const s = r.find(G);
  if (s) {
    const n = s.get();
    n && typeof n == "object" && z(n, a);
  }
}
function Ot(e, t, r = {}) {
  const { onlyBlock: i = !1 } = r, a = [], s = [];
  for (let n = 0; n < e.body.length; n++) {
    const u = e.body[n];
    u.type === "FunctionDeclaration" ? (a.push(u), s.push(n)) : u.type === "VariableDeclaration" && ["const", "let"].indexOf(u.kind) !== -1 ? we(u, t, { hoist: !0, onlyBlock: !0 }) : i || se(u, t);
  }
  if (s.length) {
    for (let n = s.length - 1; n > -1; n--)
      e.body.splice(s[n], 1);
    e.body = a.concat(e.body);
  }
}
function se(e, t) {
  switch (e.type) {
    case "VariableDeclaration":
      we(e, t, { hoist: !0 });
      break;
    case "ForInStatement":
    case "ForOfStatement":
      e.left.type === "VariableDeclaration" && we(e.left, t, { hoist: !0 });
    case "ForStatement":
      e.type === "ForStatement" && e.init && e.init.type === "VariableDeclaration" && we(e.init, t, { hoist: !0 });
    case "WhileStatement":
    case "DoWhileStatement":
      se(e.body, t);
      break;
    case "IfStatement":
      se(e.consequent, t), e.alternate && se(e.alternate, t);
      break;
    case "BlockStatement":
      for (let r = 0; r < e.body.length; r++)
        se(e.body[r], t);
      break;
    case "SwitchStatement":
      for (let r = 0; r < e.cases.length; r++)
        for (let i = 0; i < e.cases[r].consequent.length; i++)
          se(e.cases[r].consequent[i], t);
      break;
    case "TryStatement": {
      const r = e.block.body;
      for (let s = 0; s < r.length; s++)
        se(r[s], t);
      const i = e.handler && e.handler.body.body;
      if (i)
        for (let s = 0; s < i.length; s++)
          se(i[s], t);
      const a = e.finalizer && e.finalizer.body;
      if (a)
        for (let s = 0; s < a.length; s++)
          se(a[s], t);
      break;
    }
  }
}
function q(e, t, r = {}) {
  switch (e.type) {
    case "ObjectPattern":
      return rr(e, t, r);
    case "ArrayPattern":
      return ar(e, t, r);
    case "RestElement":
      return Pe(e, t, r);
    case "AssignmentPattern":
      return sr(e, t, r);
    default:
      throw new SyntaxError("Unexpected token");
  }
}
function te(e, t, r = {}) {
  var I, O;
  if (e.generator || e.async)
    return ie(e, t, r);
  const { superClass: i, construct: a } = r, s = e.params, n = e.body.type === "BlockStatement" && e.body.body.length > 0 && e.body.body[0].directive === "use strict", u = !!((I = t.find(H)) != null && I.get()), l = n || u;
  let f = function(...D) {
    const v = new V(t, !0);
    n && !u && v.const(H, !0), e.type !== "ArrowFunctionExpression" && (v.let("this", this), v.let("arguments", arguments), v.const(ct, new.target), i ? (v.const(ut, i), a && v.let(ye, a)) : a && a(this));
    for (let A = 0; A < s.length; A++) {
      const j = s[A];
      j.type === "Identifier" ? v.var(j.name, D[A]) : j.type === "RestElement" ? Pe(j, v, { kind: "var", feed: D.slice(A) }) : q(j, v, { kind: "var", feed: D[A] });
    }
    let T;
    if (e.body.type === "BlockStatement" ? (Ot(e.body, v), T = fe(e.body, v, {
      invasived: !0,
      hoisted: !0
    })) : (T = d(e.body, v), e.type === "ArrowFunctionExpression" && (k.RES = T, T = k)), T === k)
      return T.RES;
    if (new.target)
      return v.find("this").get();
  };
  e.type === "ArrowFunctionExpression" && w(f, lt, { value: !0 }), w(f, "name", {
    value: e.id && e.id.name || "",
    configurable: !0
  }), w(f, "length", {
    value: s.length,
    configurable: !0
  }), l && w(f, ft, { value: !0 });
  const g = (O = e.loc) == null ? void 0 : O.source;
  return g && w(f, "toString", {
    value: () => g.substring(e.start, e.end),
    configurable: !0
  }), f;
}
function Me(e, t) {
  const r = d(e.superClass, t), i = e.body.body, a = function(n) {
    for (let u = 0; u < i.length; u++) {
      const l = i[u];
      l.type === "PropertyDefinition" && !l.static && Bt(l, t, { klass: n, superClass: r });
    }
  };
  let s = function() {
    const n = r ? tt(this, r) : this;
    return a(n), n;
  };
  for (let n = 0; n < i.length; n++) {
    const u = i[n];
    if (u.type === "MethodDefinition" && u.kind === "constructor") {
      s = te(u.value, t, { superClass: r, construct: a });
      break;
    }
  }
  return r && Yt(s, r), gr(e.body, t, { klass: s, superClass: r }), w(s, Ie, { value: !0 }), w(s, "name", {
    value: e.id && e.id.name || "",
    configurable: !0
  }), s;
}
function vr(e, t, r) {
  const { value: i } = r, a = e.left, s = new V(t);
  a.type === "VariableDeclaration" ? we(a, s, { feed: i }) : a.type === "Identifier" ? xe(a, t, { getVar: !0 }).set(i) : q(a, t, { feed: i });
  let n;
  return e.body.type === "BlockStatement" ? n = fe(e.body, s, { invasived: !0 }) : n = d(e.body, s), n;
}
function* Dt(e, t, r = {}) {
  const { onlyBlock: i = !1 } = r, a = [], s = [];
  for (let n = 0; n < e.body.length; n++) {
    const u = e.body[n];
    u.type === "FunctionDeclaration" ? (a.push(u), s.push(n)) : u.type === "VariableDeclaration" && ["const", "let"].indexOf(u.kind) !== -1 ? yield* Se(u, t, { hoist: !0, onlyBlock: !0 }) : i || (yield* ne(u, t));
  }
  if (s.length) {
    for (let n = s.length - 1; n > -1; n--)
      e.body.splice(s[n], 1);
    e.body = a.concat(e.body);
  }
}
function* ne(e, t) {
  switch (e.type) {
    case "VariableDeclaration":
      yield* Se(e, t, { hoist: !0 });
      break;
    case "ForInStatement":
    case "ForOfStatement":
      e.left.type === "VariableDeclaration" && (yield* Se(e.left, t, { hoist: !0 }));
    case "ForStatement":
      e.type === "ForStatement" && e.init && e.init.type === "VariableDeclaration" && (yield* Se(e.init, t, { hoist: !0 }));
    case "WhileStatement":
    case "DoWhileStatement":
      yield* ne(e.body, t);
      break;
    case "IfStatement":
      yield* ne(e.consequent, t), e.alternate && (yield* ne(e.alternate, t));
      break;
    case "BlockStatement":
      for (let r = 0; r < e.body.length; r++)
        yield* ne(e.body[r], t);
      break;
    case "SwitchStatement":
      for (let r = 0; r < e.cases.length; r++)
        for (let i = 0; i < e.cases[r].consequent.length; i++)
          yield* ne(e.cases[r].consequent[i], t);
      break;
    case "TryStatement": {
      const r = e.block.body;
      for (let s = 0; s < r.length; s++)
        yield* ne(r[s], t);
      const i = e.handler && e.handler.body.body;
      if (i)
        for (let s = 0; s < i.length; s++)
          yield* ne(i[s], t);
      const a = e.finalizer && e.finalizer.body;
      if (a)
        for (let s = 0; s < a.length; s++)
          yield* ne(a[s], t);
      break;
    }
  }
}
function* W(e, t, r = {}) {
  switch (e.type) {
    case "ObjectPattern":
      return yield* Di(e, t, r);
    case "ArrayPattern":
      return yield* Fi(e, t, r);
    case "RestElement":
      return yield* Ae(e, t, r);
    case "AssignmentPattern":
      return yield* Mi(e, t, r);
    default:
      throw new SyntaxError("Unexpected token");
  }
}
function ie(e, t, r = {}) {
  var I, O;
  if (
    /*<replace by:=node.generator\s||\snode.async>*/
    !e.generator && !e.async
  )
    return te(e, t, r);
  const { superClass: i, construct: a } = r, s = e.params, n = e.body.type === "BlockStatement" && e.body.body.length > 0 && e.body.body[0].directive === "use strict", u = !!((I = t.find(H)) != null && I.get()), l = n || u, c = function* (...D) {
    const v = new V(t, !0);
    n && !u && v.const(H, !0), e.type !== "ArrowFunctionExpression" && (v.let("this", this), v.let("arguments", arguments), v.const(ct, new.target), i ? (v.const(ut, i), a && v.let(ye, a)) : a && (yield* a(this)));
    for (let A = 0; A < s.length; A++) {
      const j = s[A];
      j.type === "Identifier" ? v.var(j.name, D[A]) : j.type === "RestElement" ? yield* Ae(j, v, { kind: "var", feed: D.slice(A) }) : yield* W(j, v, { kind: "var", feed: D[A] });
    }
    let T;
    if (e.body.type === "BlockStatement" ? (yield* Dt(e.body, v), T = yield* ce(e.body, v, {
      invasived: !0,
      hoisted: !0
    })) : (T = yield* p(e.body, v), e.type === "ArrowFunctionExpression" && (k.RES = T, T = k)), T === k)
      return T.RES;
    if (new.target)
      return v.find("this").get();
  };
  let f;
  e.async && e.generator ? f = function() {
    const D = c.apply(this, arguments);
    let v = Promise.resolve(), T = !1;
    const A = (be) => v = v.then(() => St(D, z({ fullRet: !0 }, be))).catch((Sr) => {
      if (!T)
        return T = !0, Promise.reject(Sr);
    }), j = {
      next: (be) => A({ res: be }),
      throw: (be) => A({ err: be }),
      return: (be) => A({ ret: be })
    };
    return typeof Symbol == "function" && (j[Symbol.iterator] = function() {
      return this;
    }), j;
  } : e.async ? f = function() {
    return St(c.apply(this, arguments));
  } : f = c, w(f, lt, { value: !0 }), w(f, "name", {
    value: e.id && e.id.name || "",
    configurable: !0
  }), w(f, "length", {
    value: s.length,
    configurable: !0
  }), l && w(f, ft, { value: !0 });
  const g = (O = e.loc) == null ? void 0 : O.source;
  return g && w(f, "toString", {
    value: () => g.substring(e.start, e.end),
    configurable: !0
  }), f;
}
function* je(e, t) {
  const r = yield* p(e.superClass, t), i = e.body.body, a = function* (n) {
    for (let u = 0; u < i.length; u++) {
      const l = i[u];
      l.type === "PropertyDefinition" && !l.static && (yield* Rt(l, t, { klass: n, superClass: r }));
    }
  };
  let s = function* () {
    const n = r ? tt(this, r) : this;
    return yield* a(n), n;
  };
  for (let n = 0; n < i.length; n++) {
    const u = i[n];
    if (u.type === "MethodDefinition" && u.kind === "constructor") {
      s = ie(u.value, t, { superClass: r, construct: a });
      break;
    }
  }
  return r && Yt(s, r), yield* Yi(e.body, t, { klass: s, superClass: r }), w(s, Ie, { value: !0 }), w(s, "name", {
    value: e.id && e.id.name || "",
    configurable: !0
  }), s;
}
function* Et(e, t, r) {
  const { value: i } = r, a = e.left, s = new V(t);
  a.type === "VariableDeclaration" ? yield* Se(a, s, { feed: i }) : a.type === "Identifier" ? (yield* xe(a, t, { getVar: !0 })).set(i) : yield* W(a, t, { feed: i });
  let n;
  return e.body.type === "BlockStatement" ? n = yield* ce(e.body, s, { invasived: !0 }) : n = yield* p(e.body, s), n;
}
const Ks = 15, Ft = class Ft {
  constructor(t = {}) {
    this.options = { ecmaVersion: "latest" }, this.scope = new V(null, !0), this.exports = {};
    let { ecmaVer: r = "latest", sandBox: i = !0, sourceType: a = "script" } = t;
    if (typeof r == "number" && (r -= r < 2015 ? 0 : 2009), r !== "latest" && r !== 3 && (r < 5 || r > Ks))
      throw new Error("unsupported ecmaVer");
    if (this.options.ecmaVersion = r, this.options.sourceType = a, i) {
      const s = Lr();
      this.scope.let("globalThis", s), this.scope.let("window", s), this.scope.let("self", s), this.scope.let("this", a === "module" ? void 0 : s);
    } else
      this.scope.let("globalThis", h), this.scope.let("window", h), this.scope.let("self", h), this.scope.let("this", a === "module" ? void 0 : h);
    this.scope.const(a === "module" ? G : "exports", this.exports = {}), a === "module" && this.scope.const(H, !0);
  }
  import(t, r) {
    if (typeof t == "string" && (t = { [t]: r }), typeof t != "object") return;
    const i = _t(t);
    for (let a = 0; a < i.length; a++) {
      const s = i[a], n = this.options.sourceType === "module" ? Ee + s : s;
      this.scope.var(n, t[s]);
    }
  }
  parse(t, r) {
    return typeof r == "function" ? r(t, this.options) : ga(t, this.options);
  }
  run(t) {
    const r = typeof t == "string" ? this.parse(t) : t, i = this.scope;
    this.options.sourceType === "module" && (this.options.ecmaVersion === "latest" || this.options.ecmaVersion >= 13) ? St(function* () {
      yield* Dt(r, i), yield* p(r, i);
    }()) : (Ot(r, i), d(r, i));
  }
};
Ft.version = ba.version;
let Gt = Ft;
export {
  Gt as default
};
