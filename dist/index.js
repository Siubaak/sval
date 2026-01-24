const ze = Object.defineProperty, Xe = Object.prototype.hasOwnProperty;
function $e(t, e) {
  return Xe.call(t, e);
}
const Xt = Object.getOwnPropertyNames, At = Object.create;
function Ze(t) {
  for (let e = 1; e < arguments.length; ++e) {
    const i = arguments[e];
    for (const r in i)
      $e(i, r) && (t[r] = i[r]);
  }
  return t;
}
const ti = Object.assign || Ze;
let Ct = [], m = At(null);
const Nt = (t) => {
  if (!t.Object) throw 0;
  Ct = Xt(m = t).filter((e) => ["webkitStorageInfo", "GLOBAL", "root"].indexOf(e) === -1);
};
try {
  Nt(window);
} catch {
  try {
    Nt(self);
  } catch {
    try {
      Nt(global);
    } catch {
      try {
        Nt(globalThis);
      } catch {
        try {
          m.Object = Object;
        } catch {
        }
        try {
          m.Function = Function;
        } catch {
        }
        try {
          m.Array = Array;
        } catch {
        }
        try {
          m.Number = Number;
        } catch {
        }
        try {
          m.parseFloat = parseFloat;
        } catch {
        }
        try {
          m.parseInt = parseInt;
        } catch {
        }
        try {
          m.Infinity = 1 / 0;
        } catch {
        }
        try {
          m.NaN = NaN;
        } catch {
        }
        try {
          m.undefined = void 0;
        } catch {
        }
        try {
          m.Boolean = Boolean;
        } catch {
        }
        try {
          m.String = String;
        } catch {
        }
        try {
          m.Symbol = Symbol;
        } catch {
        }
        try {
          m.Date = Date;
        } catch {
        }
        try {
          m.Promise = Promise;
        } catch {
        }
        try {
          m.RegExp = RegExp;
        } catch {
        }
        try {
          m.Error = Error;
        } catch {
        }
        try {
          m.EvalError = EvalError;
        } catch {
        }
        try {
          m.RangeError = RangeError;
        } catch {
        }
        try {
          m.ReferenceError = ReferenceError;
        } catch {
        }
        try {
          m.SyntaxError = SyntaxError;
        } catch {
        }
        try {
          m.TypeError = TypeError;
        } catch {
        }
        try {
          m.URIError = URIError;
        } catch {
        }
        try {
          m.JSON = JSON;
        } catch {
        }
        try {
          m.Math = Math;
        } catch {
        }
        try {
          m.console = console;
        } catch {
        }
        try {
          m.Intl = Intl;
        } catch {
        }
        try {
          m.ArrayBuffer = ArrayBuffer;
        } catch {
        }
        try {
          m.Uint8Array = Uint8Array;
        } catch {
        }
        try {
          m.Int8Array = Int8Array;
        } catch {
        }
        try {
          m.Uint16Array = Uint16Array;
        } catch {
        }
        try {
          m.Int16Array = Int16Array;
        } catch {
        }
        try {
          m.Uint32Array = Uint32Array;
        } catch {
        }
        try {
          m.Int32Array = Int32Array;
        } catch {
        }
        try {
          m.Float32Array = Float32Array;
        } catch {
        }
        try {
          m.Float64Array = Float64Array;
        } catch {
        }
        try {
          m.Uint8ClampedArray = Uint8ClampedArray;
        } catch {
        }
        try {
          m.DataView = DataView;
        } catch {
        }
        try {
          m.Map = Map;
        } catch {
        }
        try {
          m.Set = Set;
        } catch {
        }
        try {
          m.WeakMap = WeakMap;
        } catch {
        }
        try {
          m.WeakSet = WeakSet;
        } catch {
        }
        try {
          m.Proxy = Proxy;
        } catch {
        }
        try {
          m.Reflect = Reflect;
        } catch {
        }
        try {
          m.BigInt = BigInt;
        } catch {
        }
        try {
          m.decodeURI = decodeURI;
        } catch {
        }
        try {
          m.decodeURIComponent = decodeURIComponent;
        } catch {
        }
        try {
          m.encodeURI = encodeURI;
        } catch {
        }
        try {
          m.encodeURIComponent = encodeURIComponent;
        } catch {
        }
        try {
          m.escape = escape;
        } catch {
        }
        try {
          m.unescape = unescape;
        } catch {
        }
        try {
          m.eval = eval;
        } catch {
        }
        try {
          m.isFinite = isFinite;
        } catch {
        }
        try {
          m.isNaN = isNaN;
        } catch {
        }
        try {
          m.SharedArrayBuffer = SharedArrayBuffer;
        } catch {
        }
        try {
          m.Atomics = Atomics;
        } catch {
        }
        try {
          m.WebAssembly = WebAssembly;
        } catch {
        }
        try {
          m.clearInterval = clearInterval;
        } catch {
        }
        try {
          m.clearTimeout = clearTimeout;
        } catch {
        }
        try {
          m.setInterval = setInterval;
        } catch {
        }
        try {
          m.setTimeout = setTimeout;
        } catch {
        }
        try {
          m.crypto = crypto;
        } catch {
        }
        try {
          m.URL = URL;
        } catch {
        }
        Ct = Xt(m);
      }
    }
  }
}
m.Symbol && (!m.Symbol.iterator && (m.Symbol.iterator = j("iterator")), !m.Symbol.asyncIterator && (m.Symbol.asyncIterator = j("asynciterator")));
const me = At({});
for (let t = 0; t < Ct.length; t++) {
  const e = Ct[t];
  try {
    me[e] = m[e];
  } catch {
  }
}
const ei = j("window");
function ii() {
  return ti(At({ [ei]: m }), me);
}
function j(t) {
  return t + Math.random().toString(36).substring(2);
}
var si = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 80, 3, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 343, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 245, 1, 2, 9, 726, 6, 110, 6, 6, 9, 4759, 9, 787719, 239], de = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51, 13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7, 1, 17, 2, 60, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 433, 44, 212, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 42, 9, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 496, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191], ri = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࢗ-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･", ye = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲊᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟍꟐꟑꟓꟕ-Ƛꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", Gt = {
  3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
  5: "class enum extends super const export import",
  6: "enum",
  strict: "implements interface let package private protected public static yield",
  strictBind: "eval arguments"
}, Jt = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this", ai = {
  5: Jt,
  "5module": Jt + " export import",
  6: Jt + " const class extends export import super"
}, ni = /^in(stanceof)?$/, oi = new RegExp("[" + ye + "]"), ci = new RegExp("[" + ye + ri + "]");
function Yt(t, e) {
  for (var i = 65536, r = 0; r < e.length; r += 2) {
    if (i += e[r], i > t)
      return !1;
    if (i += e[r + 1], i >= t)
      return !0;
  }
  return !1;
}
function st(t, e) {
  return t < 65 ? t === 36 : t < 91 ? !0 : t < 97 ? t === 95 : t < 123 ? !0 : t <= 65535 ? t >= 170 && oi.test(String.fromCharCode(t)) : e === !1 ? !1 : Yt(t, de);
}
function mt(t, e) {
  return t < 48 ? t === 36 : t < 58 ? !0 : t < 65 ? !1 : t < 91 ? !0 : t < 97 ? t === 95 : t < 123 ? !0 : t <= 65535 ? t >= 170 && ci.test(String.fromCharCode(t)) : e === !1 ? !1 : Yt(t, de) || Yt(t, si);
}
var I = function(e, i) {
  i === void 0 && (i = {}), this.label = e, this.keyword = i.keyword, this.beforeExpr = !!i.beforeExpr, this.startsExpr = !!i.startsExpr, this.isLoop = !!i.isLoop, this.isAssign = !!i.isAssign, this.prefix = !!i.prefix, this.postfix = !!i.postfix, this.binop = i.binop || null, this.updateContext = null;
};
function G(t, e) {
  return new I(t, { beforeExpr: !0, binop: e });
}
var J = { beforeExpr: !0 }, H = { startsExpr: !0 }, $t = {};
function A(t, e) {
  return e === void 0 && (e = {}), e.keyword = t, $t[t] = new I(t, e);
}
var c = {
  num: new I("num", H),
  regexp: new I("regexp", H),
  string: new I("string", H),
  name: new I("name", H),
  privateId: new I("privateId", H),
  eof: new I("eof"),
  // Punctuation token types.
  bracketL: new I("[", { beforeExpr: !0, startsExpr: !0 }),
  bracketR: new I("]"),
  braceL: new I("{", { beforeExpr: !0, startsExpr: !0 }),
  braceR: new I("}"),
  parenL: new I("(", { beforeExpr: !0, startsExpr: !0 }),
  parenR: new I(")"),
  comma: new I(",", J),
  semi: new I(";", J),
  colon: new I(":", J),
  dot: new I("."),
  question: new I("?", J),
  questionDot: new I("?."),
  arrow: new I("=>", J),
  template: new I("template"),
  invalidTemplate: new I("invalidTemplate"),
  ellipsis: new I("...", J),
  backQuote: new I("`", H),
  dollarBraceL: new I("${", { beforeExpr: !0, startsExpr: !0 }),
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
  eq: new I("=", { beforeExpr: !0, isAssign: !0 }),
  assign: new I("_=", { beforeExpr: !0, isAssign: !0 }),
  incDec: new I("++/--", { prefix: !0, postfix: !0, startsExpr: !0 }),
  prefix: new I("!/~", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  logicalOR: G("||", 1),
  logicalAND: G("&&", 2),
  bitwiseOR: G("|", 3),
  bitwiseXOR: G("^", 4),
  bitwiseAND: G("&", 5),
  equality: G("==/!=/===/!==", 6),
  relational: G("</>/<=/>=", 7),
  bitShift: G("<</>>/>>>", 8),
  plusMin: new I("+/-", { beforeExpr: !0, binop: 9, prefix: !0, startsExpr: !0 }),
  modulo: G("%", 10),
  star: G("*", 10),
  slash: G("/", 10),
  starstar: new I("**", { beforeExpr: !0 }),
  coalesce: G("??", 1),
  // Keyword token types.
  _break: A("break"),
  _case: A("case", J),
  _catch: A("catch"),
  _continue: A("continue"),
  _debugger: A("debugger"),
  _default: A("default", J),
  _do: A("do", { isLoop: !0, beforeExpr: !0 }),
  _else: A("else", J),
  _finally: A("finally"),
  _for: A("for", { isLoop: !0 }),
  _function: A("function", H),
  _if: A("if"),
  _return: A("return", J),
  _switch: A("switch"),
  _throw: A("throw", J),
  _try: A("try"),
  _var: A("var"),
  _const: A("const"),
  _while: A("while", { isLoop: !0 }),
  _with: A("with"),
  _new: A("new", { beforeExpr: !0, startsExpr: !0 }),
  _this: A("this", H),
  _super: A("super", H),
  _class: A("class", H),
  _extends: A("extends", J),
  _export: A("export"),
  _import: A("import", H),
  _null: A("null", H),
  _true: A("true", H),
  _false: A("false", H),
  _in: A("in", { beforeExpr: !0, binop: 7 }),
  _instanceof: A("instanceof", { beforeExpr: !0, binop: 7 }),
  _typeof: A("typeof", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  _void: A("void", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  _delete: A("delete", { beforeExpr: !0, prefix: !0, startsExpr: !0 })
}, q = /\r\n?|\n|\u2028|\u2029/, hi = new RegExp(q.source, "g");
function dt(t) {
  return t === 10 || t === 13 || t === 8232 || t === 8233;
}
function be(t, e, i) {
  i === void 0 && (i = t.length);
  for (var r = e; r < i; r++) {
    var o = t.charCodeAt(r);
    if (dt(o))
      return r < i - 1 && o === 13 && t.charCodeAt(r + 1) === 10 ? r + 2 : r + 1;
  }
  return -1;
}
var xe = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/, W = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, ge = Object.prototype, ui = ge.hasOwnProperty, pi = ge.toString, yt = Object.hasOwn || function(t, e) {
  return ui.call(t, e);
}, oe = Array.isArray || function(t) {
  return pi.call(t) === "[object Array]";
}, ce = /* @__PURE__ */ Object.create(null);
function ot(t) {
  return ce[t] || (ce[t] = new RegExp("^(?:" + t.replace(/ /g, "|") + ")$"));
}
function rt(t) {
  return t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10) + 55296, (t & 1023) + 56320));
}
var li = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/, It = function(e, i) {
  this.line = e, this.column = i;
};
It.prototype.offset = function(e) {
  return new It(this.line, this.column + e);
};
var Vt = function(e, i, r) {
  this.start = i, this.end = r, e.sourceFile !== null && (this.source = e.sourceFile);
};
function Ee(t, e) {
  for (var i = 1, r = 0; ; ) {
    var o = be(t, r, e);
    if (o < 0)
      return new It(i, e - r);
    ++i, r = o;
  }
}
var qt = {
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
}, he = !1;
function fi(t) {
  var e = {};
  for (var i in qt)
    e[i] = t && yt(t, i) ? t[i] : qt[i];
  if (e.ecmaVersion === "latest" ? e.ecmaVersion = 1e8 : e.ecmaVersion == null ? (!he && typeof console == "object" && console.warn && (he = !0, console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)), e.ecmaVersion = 11) : e.ecmaVersion >= 2015 && (e.ecmaVersion -= 2009), e.allowReserved == null && (e.allowReserved = e.ecmaVersion < 5), (!t || t.allowHashBang == null) && (e.allowHashBang = e.ecmaVersion >= 14), oe(e.onToken)) {
    var r = e.onToken;
    e.onToken = function(o) {
      return r.push(o);
    };
  }
  return oe(e.onComment) && (e.onComment = mi(e, e.onComment)), e;
}
function mi(t, e) {
  return function(i, r, o, s, a, h) {
    var u = {
      type: i ? "Block" : "Line",
      value: r,
      start: o,
      end: s
    };
    t.locations && (u.loc = new Vt(this, a, h)), t.ranges && (u.range = [o, s]), e.push(u);
  };
}
var Pt = 1, bt = 2, Zt = 4, ve = 8, te = 16, Se = 32, Ut = 64, ke = 128, ft = 256, Tt = 512, Bt = Pt | bt | ft;
function ee(t, e) {
  return bt | (t ? Zt : 0) | (e ? ve : 0);
}
var Lt = 0, ie = 1, nt = 2, _e = 3, Ae = 4, Ie = 5, L = function(e, i, r) {
  this.options = e = fi(e), this.sourceFile = e.sourceFile, this.keywords = ot(ai[e.ecmaVersion >= 6 ? 6 : e.sourceType === "module" ? "5module" : 5]);
  var o = "";
  e.allowReserved !== !0 && (o = Gt[e.ecmaVersion >= 6 ? 6 : e.ecmaVersion === 5 ? 5 : 3], e.sourceType === "module" && (o += " await")), this.reservedWords = ot(o);
  var s = (o ? o + " " : "") + Gt.strict;
  this.reservedWordsStrict = ot(s), this.reservedWordsStrictBind = ot(s + " " + Gt.strictBind), this.input = String(i), this.containsEsc = !1, r ? (this.pos = r, this.lineStart = this.input.lastIndexOf(`
`, r - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(q).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = c.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = e.sourceType === "module", this.strict = this.inModule || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.potentialArrowInForAwait = !1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = /* @__PURE__ */ Object.create(null), this.pos === 0 && e.allowHashBang && this.input.slice(0, 2) === "#!" && this.skipLineComment(2), this.scopeStack = [], this.enterScope(Pt), this.regexpState = null, this.privateNameStack = [];
}, tt = { inFunction: { configurable: !0 }, inGenerator: { configurable: !0 }, inAsync: { configurable: !0 }, canAwait: { configurable: !0 }, allowSuper: { configurable: !0 }, allowDirectSuper: { configurable: !0 }, treatFunctionsAsVar: { configurable: !0 }, allowNewDotTarget: { configurable: !0 }, inClassStaticBlock: { configurable: !0 } };
L.prototype.parse = function() {
  var e = this.options.program || this.startNode();
  return this.nextToken(), this.parseTopLevel(e);
};
tt.inFunction.get = function() {
  return (this.currentVarScope().flags & bt) > 0;
};
tt.inGenerator.get = function() {
  return (this.currentVarScope().flags & ve) > 0;
};
tt.inAsync.get = function() {
  return (this.currentVarScope().flags & Zt) > 0;
};
tt.canAwait.get = function() {
  for (var t = this.scopeStack.length - 1; t >= 0; t--) {
    var e = this.scopeStack[t], i = e.flags;
    if (i & (ft | Tt))
      return !1;
    if (i & bt)
      return (i & Zt) > 0;
  }
  return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
};
tt.allowSuper.get = function() {
  var t = this.currentThisScope(), e = t.flags;
  return (e & Ut) > 0 || this.options.allowSuperOutsideMethod;
};
tt.allowDirectSuper.get = function() {
  return (this.currentThisScope().flags & ke) > 0;
};
tt.treatFunctionsAsVar.get = function() {
  return this.treatFunctionsAsVarInScope(this.currentScope());
};
tt.allowNewDotTarget.get = function() {
  for (var t = this.scopeStack.length - 1; t >= 0; t--) {
    var e = this.scopeStack[t], i = e.flags;
    if (i & (ft | Tt) || i & bt && !(i & te))
      return !0;
  }
  return !1;
};
tt.inClassStaticBlock.get = function() {
  return (this.currentVarScope().flags & ft) > 0;
};
L.extend = function() {
  for (var e = [], i = arguments.length; i--; ) e[i] = arguments[i];
  for (var r = this, o = 0; o < e.length; o++)
    r = e[o](r);
  return r;
};
L.parse = function(e, i) {
  return new this(i, e).parse();
};
L.parseExpressionAt = function(e, i, r) {
  var o = new this(r, e, i);
  return o.nextToken(), o.parseExpression();
};
L.tokenizer = function(e, i) {
  return new this(i, e);
};
Object.defineProperties(L.prototype, tt);
var B = L.prototype, di = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
B.strictDirective = function(t) {
  if (this.options.ecmaVersion < 5)
    return !1;
  for (; ; ) {
    W.lastIndex = t, t += W.exec(this.input)[0].length;
    var e = di.exec(this.input.slice(t));
    if (!e)
      return !1;
    if ((e[1] || e[2]) === "use strict") {
      W.lastIndex = t + e[0].length;
      var i = W.exec(this.input), r = i.index + i[0].length, o = this.input.charAt(r);
      return o === ";" || o === "}" || q.test(i[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(o) || o === "!" && this.input.charAt(r + 1) === "=");
    }
    t += e[0].length, W.lastIndex = t, t += W.exec(this.input)[0].length, this.input[t] === ";" && t++;
  }
};
B.eat = function(t) {
  return this.type === t ? (this.next(), !0) : !1;
};
B.isContextual = function(t) {
  return this.type === c.name && this.value === t && !this.containsEsc;
};
B.eatContextual = function(t) {
  return this.isContextual(t) ? (this.next(), !0) : !1;
};
B.expectContextual = function(t) {
  this.eatContextual(t) || this.unexpected();
};
B.canInsertSemicolon = function() {
  return this.type === c.eof || this.type === c.braceR || q.test(this.input.slice(this.lastTokEnd, this.start));
};
B.insertSemicolon = function() {
  if (this.canInsertSemicolon())
    return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), !0;
};
B.semicolon = function() {
  !this.eat(c.semi) && !this.insertSemicolon() && this.unexpected();
};
B.afterTrailingComma = function(t, e) {
  if (this.type === t)
    return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), e || this.next(), !0;
};
B.expect = function(t) {
  this.eat(t) || this.unexpected();
};
B.unexpected = function(t) {
  this.raise(t ?? this.start, "Unexpected token");
};
var Mt = function() {
  this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
};
B.checkPatternErrors = function(t, e) {
  if (t) {
    t.trailingComma > -1 && this.raiseRecoverable(t.trailingComma, "Comma is not permitted after the rest element");
    var i = e ? t.parenthesizedAssign : t.parenthesizedBind;
    i > -1 && this.raiseRecoverable(i, e ? "Assigning to rvalue" : "Parenthesized pattern");
  }
};
B.checkExpressionErrors = function(t, e) {
  if (!t)
    return !1;
  var i = t.shorthandAssign, r = t.doubleProto;
  if (!e)
    return i >= 0 || r >= 0;
  i >= 0 && this.raise(i, "Shorthand property assignments are valid only in destructuring patterns"), r >= 0 && this.raiseRecoverable(r, "Redefinition of __proto__ property");
};
B.checkYieldAwaitInDefaultParams = function() {
  this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"), this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value");
};
B.isSimpleAssignTarget = function(t) {
  return t.type === "ParenthesizedExpression" ? this.isSimpleAssignTarget(t.expression) : t.type === "Identifier" || t.type === "MemberExpression";
};
var b = L.prototype;
b.parseTopLevel = function(t) {
  var e = /* @__PURE__ */ Object.create(null);
  for (t.body || (t.body = []); this.type !== c.eof; ) {
    var i = this.parseStatement(null, !0, e);
    t.body.push(i);
  }
  if (this.inModule)
    for (var r = 0, o = Object.keys(this.undefinedExports); r < o.length; r += 1) {
      var s = o[r];
      this.raiseRecoverable(this.undefinedExports[s].start, "Export '" + s + "' is not defined");
    }
  return this.adaptDirectivePrologue(t.body), this.next(), t.sourceType = this.options.sourceType, this.finishNode(t, "Program");
};
var se = { kind: "loop" }, yi = { kind: "switch" };
b.isLet = function(t) {
  if (this.options.ecmaVersion < 6 || !this.isContextual("let"))
    return !1;
  W.lastIndex = this.pos;
  var e = W.exec(this.input), i = this.pos + e[0].length, r = this.input.charCodeAt(i);
  if (r === 91 || r === 92)
    return !0;
  if (t)
    return !1;
  if (r === 123 || r > 55295 && r < 56320)
    return !0;
  if (st(r, !0)) {
    for (var o = i + 1; mt(r = this.input.charCodeAt(o), !0); )
      ++o;
    if (r === 92 || r > 55295 && r < 56320)
      return !0;
    var s = this.input.slice(i, o);
    if (!ni.test(s))
      return !0;
  }
  return !1;
};
b.isAsyncFunction = function() {
  if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
    return !1;
  W.lastIndex = this.pos;
  var t = W.exec(this.input), e = this.pos + t[0].length, i;
  return !q.test(this.input.slice(this.pos, e)) && this.input.slice(e, e + 8) === "function" && (e + 8 === this.input.length || !(mt(i = this.input.charCodeAt(e + 8)) || i > 55295 && i < 56320));
};
b.parseStatement = function(t, e, i) {
  var r = this.type, o = this.startNode(), s;
  switch (this.isLet(t) && (r = c._var, s = "let"), r) {
    case c._break:
    case c._continue:
      return this.parseBreakContinueStatement(o, r.keyword);
    case c._debugger:
      return this.parseDebuggerStatement(o);
    case c._do:
      return this.parseDoStatement(o);
    case c._for:
      return this.parseForStatement(o);
    case c._function:
      return t && (this.strict || t !== "if" && t !== "label") && this.options.ecmaVersion >= 6 && this.unexpected(), this.parseFunctionStatement(o, !1, !t);
    case c._class:
      return t && this.unexpected(), this.parseClass(o, !0);
    case c._if:
      return this.parseIfStatement(o);
    case c._return:
      return this.parseReturnStatement(o);
    case c._switch:
      return this.parseSwitchStatement(o);
    case c._throw:
      return this.parseThrowStatement(o);
    case c._try:
      return this.parseTryStatement(o);
    case c._const:
    case c._var:
      return s = s || this.value, t && s !== "var" && this.unexpected(), this.parseVarStatement(o, s);
    case c._while:
      return this.parseWhileStatement(o);
    case c._with:
      return this.parseWithStatement(o);
    case c.braceL:
      return this.parseBlock(!0, o);
    case c.semi:
      return this.parseEmptyStatement(o);
    case c._export:
    case c._import:
      if (this.options.ecmaVersion > 10 && r === c._import) {
        W.lastIndex = this.pos;
        var a = W.exec(this.input), h = this.pos + a[0].length, u = this.input.charCodeAt(h);
        if (u === 40 || u === 46)
          return this.parseExpressionStatement(o, this.parseExpression());
      }
      return this.options.allowImportExportEverywhere || (e || this.raise(this.start, "'import' and 'export' may only appear at the top level"), this.inModule || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")), r === c._import ? this.parseImport(o) : this.parseExport(o, i);
    // If the statement does not start with a statement keyword or a
    // brace, it's an ExpressionStatement or LabeledStatement. We
    // simply start parsing an expression, and afterwards, if the
    // next token is a colon and the expression was a simple
    // Identifier node, we switch to interpreting it as a label.
    default:
      if (this.isAsyncFunction())
        return t && this.unexpected(), this.next(), this.parseFunctionStatement(o, !0, !t);
      var p = this.value, l = this.parseExpression();
      return r === c.name && l.type === "Identifier" && this.eat(c.colon) ? this.parseLabeledStatement(o, p, l, t) : this.parseExpressionStatement(o, l);
  }
};
b.parseBreakContinueStatement = function(t, e) {
  var i = e === "break";
  this.next(), this.eat(c.semi) || this.insertSemicolon() ? t.label = null : this.type !== c.name ? this.unexpected() : (t.label = this.parseIdent(), this.semicolon());
  for (var r = 0; r < this.labels.length; ++r) {
    var o = this.labels[r];
    if ((t.label == null || o.name === t.label.name) && (o.kind != null && (i || o.kind === "loop") || t.label && i))
      break;
  }
  return r === this.labels.length && this.raise(t.start, "Unsyntactic " + e), this.finishNode(t, i ? "BreakStatement" : "ContinueStatement");
};
b.parseDebuggerStatement = function(t) {
  return this.next(), this.semicolon(), this.finishNode(t, "DebuggerStatement");
};
b.parseDoStatement = function(t) {
  return this.next(), this.labels.push(se), t.body = this.parseStatement("do"), this.labels.pop(), this.expect(c._while), t.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(c.semi) : this.semicolon(), this.finishNode(t, "DoWhileStatement");
};
b.parseForStatement = function(t) {
  this.next();
  var e = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
  if (this.labels.push(se), this.enterScope(0), this.expect(c.parenL), this.type === c.semi)
    return e > -1 && this.unexpected(e), this.parseFor(t, null);
  var i = this.isLet();
  if (this.type === c._var || this.type === c._const || i) {
    var r = this.startNode(), o = i ? "let" : this.value;
    return this.next(), this.parseVar(r, !0, o), this.finishNode(r, "VariableDeclaration"), (this.type === c._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && r.declarations.length === 1 ? (this.options.ecmaVersion >= 9 && (this.type === c._in ? e > -1 && this.unexpected(e) : t.await = e > -1), this.parseForIn(t, r)) : (e > -1 && this.unexpected(e), this.parseFor(t, r));
  }
  var s = this.isContextual("let"), a = !1, h = this.containsEsc, u = new Mt(), p = this.start, l = e > -1 ? this.parseExprSubscripts(u, "await") : this.parseExpression(!0, u);
  return this.type === c._in || (a = this.options.ecmaVersion >= 6 && this.isContextual("of")) ? (e > -1 ? (this.type === c._in && this.unexpected(e), t.await = !0) : a && this.options.ecmaVersion >= 8 && (l.start === p && !h && l.type === "Identifier" && l.name === "async" ? this.unexpected() : this.options.ecmaVersion >= 9 && (t.await = !1)), s && a && this.raise(l.start, "The left-hand side of a for-of loop may not start with 'let'."), this.toAssignable(l, !1, u), this.checkLValPattern(l), this.parseForIn(t, l)) : (this.checkExpressionErrors(u, !0), e > -1 && this.unexpected(e), this.parseFor(t, l));
};
b.parseFunctionStatement = function(t, e, i) {
  return this.next(), this.parseFunction(t, kt | (i ? 0 : Qt), !1, e);
};
b.parseIfStatement = function(t) {
  return this.next(), t.test = this.parseParenExpression(), t.consequent = this.parseStatement("if"), t.alternate = this.eat(c._else) ? this.parseStatement("if") : null, this.finishNode(t, "IfStatement");
};
b.parseReturnStatement = function(t) {
  return !this.inFunction && !this.options.allowReturnOutsideFunction && this.raise(this.start, "'return' outside of function"), this.next(), this.eat(c.semi) || this.insertSemicolon() ? t.argument = null : (t.argument = this.parseExpression(), this.semicolon()), this.finishNode(t, "ReturnStatement");
};
b.parseSwitchStatement = function(t) {
  this.next(), t.discriminant = this.parseParenExpression(), t.cases = [], this.expect(c.braceL), this.labels.push(yi), this.enterScope(0);
  for (var e, i = !1; this.type !== c.braceR; )
    if (this.type === c._case || this.type === c._default) {
      var r = this.type === c._case;
      e && this.finishNode(e, "SwitchCase"), t.cases.push(e = this.startNode()), e.consequent = [], this.next(), r ? e.test = this.parseExpression() : (i && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"), i = !0, e.test = null), this.expect(c.colon);
    } else
      e || this.unexpected(), e.consequent.push(this.parseStatement(null));
  return this.exitScope(), e && this.finishNode(e, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(t, "SwitchStatement");
};
b.parseThrowStatement = function(t) {
  return this.next(), q.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"), t.argument = this.parseExpression(), this.semicolon(), this.finishNode(t, "ThrowStatement");
};
var bi = [];
b.parseCatchClauseParam = function() {
  var t = this.parseBindingAtom(), e = t.type === "Identifier";
  return this.enterScope(e ? Se : 0), this.checkLValPattern(t, e ? Ae : nt), this.expect(c.parenR), t;
};
b.parseTryStatement = function(t) {
  if (this.next(), t.block = this.parseBlock(), t.handler = null, this.type === c._catch) {
    var e = this.startNode();
    this.next(), this.eat(c.parenL) ? e.param = this.parseCatchClauseParam() : (this.options.ecmaVersion < 10 && this.unexpected(), e.param = null, this.enterScope(0)), e.body = this.parseBlock(!1), this.exitScope(), t.handler = this.finishNode(e, "CatchClause");
  }
  return t.finalizer = this.eat(c._finally) ? this.parseBlock() : null, !t.handler && !t.finalizer && this.raise(t.start, "Missing catch or finally clause"), this.finishNode(t, "TryStatement");
};
b.parseVarStatement = function(t, e, i) {
  return this.next(), this.parseVar(t, !1, e, i), this.semicolon(), this.finishNode(t, "VariableDeclaration");
};
b.parseWhileStatement = function(t) {
  return this.next(), t.test = this.parseParenExpression(), this.labels.push(se), t.body = this.parseStatement("while"), this.labels.pop(), this.finishNode(t, "WhileStatement");
};
b.parseWithStatement = function(t) {
  return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), t.object = this.parseParenExpression(), t.body = this.parseStatement("with"), this.finishNode(t, "WithStatement");
};
b.parseEmptyStatement = function(t) {
  return this.next(), this.finishNode(t, "EmptyStatement");
};
b.parseLabeledStatement = function(t, e, i, r) {
  for (var o = 0, s = this.labels; o < s.length; o += 1) {
    var a = s[o];
    a.name === e && this.raise(i.start, "Label '" + e + "' is already declared");
  }
  for (var h = this.type.isLoop ? "loop" : this.type === c._switch ? "switch" : null, u = this.labels.length - 1; u >= 0; u--) {
    var p = this.labels[u];
    if (p.statementStart === t.start)
      p.statementStart = this.start, p.kind = h;
    else
      break;
  }
  return this.labels.push({ name: e, kind: h, statementStart: this.start }), t.body = this.parseStatement(r ? r.indexOf("label") === -1 ? r + "label" : r : "label"), this.labels.pop(), t.label = i, this.finishNode(t, "LabeledStatement");
};
b.parseExpressionStatement = function(t, e) {
  return t.expression = e, this.semicolon(), this.finishNode(t, "ExpressionStatement");
};
b.parseBlock = function(t, e, i) {
  for (t === void 0 && (t = !0), e === void 0 && (e = this.startNode()), e.body = [], this.expect(c.braceL), t && this.enterScope(0); this.type !== c.braceR; ) {
    var r = this.parseStatement(null);
    e.body.push(r);
  }
  return i && (this.strict = !1), this.next(), t && this.exitScope(), this.finishNode(e, "BlockStatement");
};
b.parseFor = function(t, e) {
  return t.init = e, this.expect(c.semi), t.test = this.type === c.semi ? null : this.parseExpression(), this.expect(c.semi), t.update = this.type === c.parenR ? null : this.parseExpression(), this.expect(c.parenR), t.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(t, "ForStatement");
};
b.parseForIn = function(t, e) {
  var i = this.type === c._in;
  return this.next(), e.type === "VariableDeclaration" && e.declarations[0].init != null && (!i || this.options.ecmaVersion < 8 || this.strict || e.kind !== "var" || e.declarations[0].id.type !== "Identifier") && this.raise(
    e.start,
    (i ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"
  ), t.left = e, t.right = i ? this.parseExpression() : this.parseMaybeAssign(), this.expect(c.parenR), t.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(t, i ? "ForInStatement" : "ForOfStatement");
};
b.parseVar = function(t, e, i, r) {
  for (t.declarations = [], t.kind = i; ; ) {
    var o = this.startNode();
    if (this.parseVarId(o, i), this.eat(c.eq) ? o.init = this.parseMaybeAssign(e) : !r && i === "const" && !(this.type === c._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) ? this.unexpected() : !r && o.id.type !== "Identifier" && !(e && (this.type === c._in || this.isContextual("of"))) ? this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : o.init = null, t.declarations.push(this.finishNode(o, "VariableDeclarator")), !this.eat(c.comma))
      break;
  }
  return t;
};
b.parseVarId = function(t, e) {
  t.id = this.parseBindingAtom(), this.checkLValPattern(t.id, e === "var" ? ie : nt, !1);
};
var kt = 1, Qt = 2, Pe = 4;
b.parseFunction = function(t, e, i, r, o) {
  this.initFunction(t), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !r) && (this.type === c.star && e & Qt && this.unexpected(), t.generator = this.eat(c.star)), this.options.ecmaVersion >= 8 && (t.async = !!r), e & kt && (t.id = e & Pe && this.type !== c.name ? null : this.parseIdent(), t.id && !(e & Qt) && this.checkLValSimple(t.id, this.strict || t.generator || t.async ? this.treatFunctionsAsVar ? ie : nt : _e));
  var s = this.yieldPos, a = this.awaitPos, h = this.awaitIdentPos;
  return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(ee(t.async, t.generator)), e & kt || (t.id = this.type === c.name ? this.parseIdent() : null), this.parseFunctionParams(t), this.parseFunctionBody(t, i, !1, o), this.yieldPos = s, this.awaitPos = a, this.awaitIdentPos = h, this.finishNode(t, e & kt ? "FunctionDeclaration" : "FunctionExpression");
};
b.parseFunctionParams = function(t) {
  this.expect(c.parenL), t.params = this.parseBindingList(c.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
};
b.parseClass = function(t, e) {
  this.next();
  var i = this.strict;
  this.strict = !0, this.parseClassId(t, e), this.parseClassSuper(t);
  var r = this.enterClassBody(), o = this.startNode(), s = !1;
  for (o.body = [], this.expect(c.braceL); this.type !== c.braceR; ) {
    var a = this.parseClassElement(t.superClass !== null);
    a && (o.body.push(a), a.type === "MethodDefinition" && a.kind === "constructor" ? (s && this.raiseRecoverable(a.start, "Duplicate constructor in the same class"), s = !0) : a.key && a.key.type === "PrivateIdentifier" && xi(r, a) && this.raiseRecoverable(a.key.start, "Identifier '#" + a.key.name + "' has already been declared"));
  }
  return this.strict = i, this.next(), t.body = this.finishNode(o, "ClassBody"), this.exitClassBody(), this.finishNode(t, e ? "ClassDeclaration" : "ClassExpression");
};
b.parseClassElement = function(t) {
  if (this.eat(c.semi))
    return null;
  var e = this.options.ecmaVersion, i = this.startNode(), r = "", o = !1, s = !1, a = "method", h = !1;
  if (this.eatContextual("static")) {
    if (e >= 13 && this.eat(c.braceL))
      return this.parseClassStaticBlock(i), i;
    this.isClassElementNameStart() || this.type === c.star ? h = !0 : r = "static";
  }
  if (i.static = h, !r && e >= 8 && this.eatContextual("async") && ((this.isClassElementNameStart() || this.type === c.star) && !this.canInsertSemicolon() ? s = !0 : r = "async"), !r && (e >= 9 || !s) && this.eat(c.star) && (o = !0), !r && !s && !o) {
    var u = this.value;
    (this.eatContextual("get") || this.eatContextual("set")) && (this.isClassElementNameStart() ? a = u : r = u);
  }
  if (r ? (i.computed = !1, i.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc), i.key.name = r, this.finishNode(i.key, "Identifier")) : this.parseClassElementName(i), e < 13 || this.type === c.parenL || a !== "method" || o || s) {
    var p = !i.static && Dt(i, "constructor"), l = p && t;
    p && a !== "method" && this.raise(i.key.start, "Constructor can't have get/set modifier"), i.kind = p ? "constructor" : a, this.parseClassMethod(i, o, s, l);
  } else
    this.parseClassField(i);
  return i;
};
b.isClassElementNameStart = function() {
  return this.type === c.name || this.type === c.privateId || this.type === c.num || this.type === c.string || this.type === c.bracketL || this.type.keyword;
};
b.parseClassElementName = function(t) {
  this.type === c.privateId ? (this.value === "constructor" && this.raise(this.start, "Classes can't have an element named '#constructor'"), t.computed = !1, t.key = this.parsePrivateIdent()) : this.parsePropertyName(t);
};
b.parseClassMethod = function(t, e, i, r) {
  var o = t.key;
  t.kind === "constructor" ? (e && this.raise(o.start, "Constructor can't be a generator"), i && this.raise(o.start, "Constructor can't be an async method")) : t.static && Dt(t, "prototype") && this.raise(o.start, "Classes may not have a static property named prototype");
  var s = t.value = this.parseMethod(e, i, r);
  return t.kind === "get" && s.params.length !== 0 && this.raiseRecoverable(s.start, "getter should have no params"), t.kind === "set" && s.params.length !== 1 && this.raiseRecoverable(s.start, "setter should have exactly one param"), t.kind === "set" && s.params[0].type === "RestElement" && this.raiseRecoverable(s.params[0].start, "Setter cannot use rest params"), this.finishNode(t, "MethodDefinition");
};
b.parseClassField = function(t) {
  return Dt(t, "constructor") ? this.raise(t.key.start, "Classes can't have a field named 'constructor'") : t.static && Dt(t, "prototype") && this.raise(t.key.start, "Classes can't have a static field named 'prototype'"), this.eat(c.eq) ? (this.enterScope(Tt | Ut), t.value = this.parseMaybeAssign(), this.exitScope()) : t.value = null, this.semicolon(), this.finishNode(t, "PropertyDefinition");
};
b.parseClassStaticBlock = function(t) {
  t.body = [];
  var e = this.labels;
  for (this.labels = [], this.enterScope(ft | Ut); this.type !== c.braceR; ) {
    var i = this.parseStatement(null);
    t.body.push(i);
  }
  return this.next(), this.exitScope(), this.labels = e, this.finishNode(t, "StaticBlock");
};
b.parseClassId = function(t, e) {
  this.type === c.name ? (t.id = this.parseIdent(), e && this.checkLValSimple(t.id, nt, !1)) : (e === !0 && this.unexpected(), t.id = null);
};
b.parseClassSuper = function(t) {
  t.superClass = this.eat(c._extends) ? this.parseExprSubscripts(null, !1) : null;
};
b.enterClassBody = function() {
  var t = { declared: /* @__PURE__ */ Object.create(null), used: [] };
  return this.privateNameStack.push(t), t.declared;
};
b.exitClassBody = function() {
  var t = this.privateNameStack.pop(), e = t.declared, i = t.used;
  if (this.options.checkPrivateFields)
    for (var r = this.privateNameStack.length, o = r === 0 ? null : this.privateNameStack[r - 1], s = 0; s < i.length; ++s) {
      var a = i[s];
      yt(e, a.name) || (o ? o.used.push(a) : this.raiseRecoverable(a.start, "Private field '#" + a.name + "' must be declared in an enclosing class"));
    }
};
function xi(t, e) {
  var i = e.key.name, r = t[i], o = "true";
  return e.type === "MethodDefinition" && (e.kind === "get" || e.kind === "set") && (o = (e.static ? "s" : "i") + e.kind), r === "iget" && o === "iset" || r === "iset" && o === "iget" || r === "sget" && o === "sset" || r === "sset" && o === "sget" ? (t[i] = "true", !1) : r ? !0 : (t[i] = o, !1);
}
function Dt(t, e) {
  var i = t.computed, r = t.key;
  return !i && (r.type === "Identifier" && r.name === e || r.type === "Literal" && r.value === e);
}
b.parseExportAllDeclaration = function(t, e) {
  return this.options.ecmaVersion >= 11 && (this.eatContextual("as") ? (t.exported = this.parseModuleExportName(), this.checkExport(e, t.exported, this.lastTokStart)) : t.exported = null), this.expectContextual("from"), this.type !== c.string && this.unexpected(), t.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (t.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(t, "ExportAllDeclaration");
};
b.parseExport = function(t, e) {
  if (this.next(), this.eat(c.star))
    return this.parseExportAllDeclaration(t, e);
  if (this.eat(c._default))
    return this.checkExport(e, "default", this.lastTokStart), t.declaration = this.parseExportDefaultDeclaration(), this.finishNode(t, "ExportDefaultDeclaration");
  if (this.shouldParseExportStatement())
    t.declaration = this.parseExportDeclaration(t), t.declaration.type === "VariableDeclaration" ? this.checkVariableExport(e, t.declaration.declarations) : this.checkExport(e, t.declaration.id, t.declaration.id.start), t.specifiers = [], t.source = null, this.options.ecmaVersion >= 16 && (t.attributes = []);
  else {
    if (t.declaration = null, t.specifiers = this.parseExportSpecifiers(e), this.eatContextual("from"))
      this.type !== c.string && this.unexpected(), t.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (t.attributes = this.parseWithClause());
    else {
      for (var i = 0, r = t.specifiers; i < r.length; i += 1) {
        var o = r[i];
        this.checkUnreserved(o.local), this.checkLocalExport(o.local), o.local.type === "Literal" && this.raise(o.local.start, "A string literal cannot be used as an exported binding without `from`.");
      }
      t.source = null, this.options.ecmaVersion >= 16 && (t.attributes = []);
    }
    this.semicolon();
  }
  return this.finishNode(t, "ExportNamedDeclaration");
};
b.parseExportDeclaration = function(t) {
  return this.parseStatement(null);
};
b.parseExportDefaultDeclaration = function() {
  var t;
  if (this.type === c._function || (t = this.isAsyncFunction())) {
    var e = this.startNode();
    return this.next(), t && this.next(), this.parseFunction(e, kt | Pe, !1, t);
  } else if (this.type === c._class) {
    var i = this.startNode();
    return this.parseClass(i, "nullableID");
  } else {
    var r = this.parseMaybeAssign();
    return this.semicolon(), r;
  }
};
b.checkExport = function(t, e, i) {
  t && (typeof e != "string" && (e = e.type === "Identifier" ? e.name : e.value), yt(t, e) && this.raiseRecoverable(i, "Duplicate export '" + e + "'"), t[e] = !0);
};
b.checkPatternExport = function(t, e) {
  var i = e.type;
  if (i === "Identifier")
    this.checkExport(t, e, e.start);
  else if (i === "ObjectPattern")
    for (var r = 0, o = e.properties; r < o.length; r += 1) {
      var s = o[r];
      this.checkPatternExport(t, s);
    }
  else if (i === "ArrayPattern")
    for (var a = 0, h = e.elements; a < h.length; a += 1) {
      var u = h[a];
      u && this.checkPatternExport(t, u);
    }
  else i === "Property" ? this.checkPatternExport(t, e.value) : i === "AssignmentPattern" ? this.checkPatternExport(t, e.left) : i === "RestElement" && this.checkPatternExport(t, e.argument);
};
b.checkVariableExport = function(t, e) {
  if (t)
    for (var i = 0, r = e; i < r.length; i += 1) {
      var o = r[i];
      this.checkPatternExport(t, o.id);
    }
};
b.shouldParseExportStatement = function() {
  return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
};
b.parseExportSpecifier = function(t) {
  var e = this.startNode();
  return e.local = this.parseModuleExportName(), e.exported = this.eatContextual("as") ? this.parseModuleExportName() : e.local, this.checkExport(
    t,
    e.exported,
    e.exported.start
  ), this.finishNode(e, "ExportSpecifier");
};
b.parseExportSpecifiers = function(t) {
  var e = [], i = !0;
  for (this.expect(c.braceL); !this.eat(c.braceR); ) {
    if (i)
      i = !1;
    else if (this.expect(c.comma), this.afterTrailingComma(c.braceR))
      break;
    e.push(this.parseExportSpecifier(t));
  }
  return e;
};
b.parseImport = function(t) {
  return this.next(), this.type === c.string ? (t.specifiers = bi, t.source = this.parseExprAtom()) : (t.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), t.source = this.type === c.string ? this.parseExprAtom() : this.unexpected()), this.options.ecmaVersion >= 16 && (t.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(t, "ImportDeclaration");
};
b.parseImportSpecifier = function() {
  var t = this.startNode();
  return t.imported = this.parseModuleExportName(), this.eatContextual("as") ? t.local = this.parseIdent() : (this.checkUnreserved(t.imported), t.local = t.imported), this.checkLValSimple(t.local, nt), this.finishNode(t, "ImportSpecifier");
};
b.parseImportDefaultSpecifier = function() {
  var t = this.startNode();
  return t.local = this.parseIdent(), this.checkLValSimple(t.local, nt), this.finishNode(t, "ImportDefaultSpecifier");
};
b.parseImportNamespaceSpecifier = function() {
  var t = this.startNode();
  return this.next(), this.expectContextual("as"), t.local = this.parseIdent(), this.checkLValSimple(t.local, nt), this.finishNode(t, "ImportNamespaceSpecifier");
};
b.parseImportSpecifiers = function() {
  var t = [], e = !0;
  if (this.type === c.name && (t.push(this.parseImportDefaultSpecifier()), !this.eat(c.comma)))
    return t;
  if (this.type === c.star)
    return t.push(this.parseImportNamespaceSpecifier()), t;
  for (this.expect(c.braceL); !this.eat(c.braceR); ) {
    if (e)
      e = !1;
    else if (this.expect(c.comma), this.afterTrailingComma(c.braceR))
      break;
    t.push(this.parseImportSpecifier());
  }
  return t;
};
b.parseWithClause = function() {
  var t = [];
  if (!this.eat(c._with))
    return t;
  this.expect(c.braceL);
  for (var e = {}, i = !0; !this.eat(c.braceR); ) {
    if (i)
      i = !1;
    else if (this.expect(c.comma), this.afterTrailingComma(c.braceR))
      break;
    var r = this.parseImportAttribute(), o = r.key.type === "Identifier" ? r.key.name : r.key.value;
    yt(e, o) && this.raiseRecoverable(r.key.start, "Duplicate attribute key '" + o + "'"), e[o] = !0, t.push(r);
  }
  return t;
};
b.parseImportAttribute = function() {
  var t = this.startNode();
  return t.key = this.type === c.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never"), this.expect(c.colon), this.type !== c.string && this.unexpected(), t.value = this.parseExprAtom(), this.finishNode(t, "ImportAttribute");
};
b.parseModuleExportName = function() {
  if (this.options.ecmaVersion >= 13 && this.type === c.string) {
    var t = this.parseLiteral(this.value);
    return li.test(t.value) && this.raise(t.start, "An export name cannot include a lone surrogate."), t;
  }
  return this.parseIdent(!0);
};
b.adaptDirectivePrologue = function(t) {
  for (var e = 0; e < t.length && this.isDirectiveCandidate(t[e]); ++e)
    t[e].directive = t[e].expression.raw.slice(1, -1);
};
b.isDirectiveCandidate = function(t) {
  return this.options.ecmaVersion >= 5 && t.type === "ExpressionStatement" && t.expression.type === "Literal" && typeof t.expression.value == "string" && // Reject parenthesized strings.
  (this.input[t.start] === '"' || this.input[t.start] === "'");
};
var Q = L.prototype;
Q.toAssignable = function(t, e, i) {
  if (this.options.ecmaVersion >= 6 && t)
    switch (t.type) {
      case "Identifier":
        this.inAsync && t.name === "await" && this.raise(t.start, "Cannot use 'await' as identifier inside an async function");
        break;
      case "ObjectPattern":
      case "ArrayPattern":
      case "AssignmentPattern":
      case "RestElement":
        break;
      case "ObjectExpression":
        t.type = "ObjectPattern", i && this.checkPatternErrors(i, !0);
        for (var r = 0, o = t.properties; r < o.length; r += 1) {
          var s = o[r];
          this.toAssignable(s, e), s.type === "RestElement" && (s.argument.type === "ArrayPattern" || s.argument.type === "ObjectPattern") && this.raise(s.argument.start, "Unexpected token");
        }
        break;
      case "Property":
        t.kind !== "init" && this.raise(t.key.start, "Object pattern can't contain getter or setter"), this.toAssignable(t.value, e);
        break;
      case "ArrayExpression":
        t.type = "ArrayPattern", i && this.checkPatternErrors(i, !0), this.toAssignableList(t.elements, e);
        break;
      case "SpreadElement":
        t.type = "RestElement", this.toAssignable(t.argument, e), t.argument.type === "AssignmentPattern" && this.raise(t.argument.start, "Rest elements cannot have a default value");
        break;
      case "AssignmentExpression":
        t.operator !== "=" && this.raise(t.left.end, "Only '=' operator can be used for specifying default value."), t.type = "AssignmentPattern", delete t.operator, this.toAssignable(t.left, e);
        break;
      case "ParenthesizedExpression":
        this.toAssignable(t.expression, e, i);
        break;
      case "ChainExpression":
        this.raiseRecoverable(t.start, "Optional chaining cannot appear in left-hand side");
        break;
      case "MemberExpression":
        if (!e)
          break;
      default:
        this.raise(t.start, "Assigning to rvalue");
    }
  else i && this.checkPatternErrors(i, !0);
  return t;
};
Q.toAssignableList = function(t, e) {
  for (var i = t.length, r = 0; r < i; r++) {
    var o = t[r];
    o && this.toAssignable(o, e);
  }
  if (i) {
    var s = t[i - 1];
    this.options.ecmaVersion === 6 && e && s && s.type === "RestElement" && s.argument.type !== "Identifier" && this.unexpected(s.argument.start);
  }
  return t;
};
Q.parseSpread = function(t) {
  var e = this.startNode();
  return this.next(), e.argument = this.parseMaybeAssign(!1, t), this.finishNode(e, "SpreadElement");
};
Q.parseRestBinding = function() {
  var t = this.startNode();
  return this.next(), this.options.ecmaVersion === 6 && this.type !== c.name && this.unexpected(), t.argument = this.parseBindingAtom(), this.finishNode(t, "RestElement");
};
Q.parseBindingAtom = function() {
  if (this.options.ecmaVersion >= 6)
    switch (this.type) {
      case c.bracketL:
        var t = this.startNode();
        return this.next(), t.elements = this.parseBindingList(c.bracketR, !0, !0), this.finishNode(t, "ArrayPattern");
      case c.braceL:
        return this.parseObj(!0);
    }
  return this.parseIdent();
};
Q.parseBindingList = function(t, e, i, r) {
  for (var o = [], s = !0; !this.eat(t); )
    if (s ? s = !1 : this.expect(c.comma), e && this.type === c.comma)
      o.push(null);
    else {
      if (i && this.afterTrailingComma(t))
        break;
      if (this.type === c.ellipsis) {
        var a = this.parseRestBinding();
        this.parseBindingListItem(a), o.push(a), this.type === c.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.expect(t);
        break;
      } else
        o.push(this.parseAssignableListItem(r));
    }
  return o;
};
Q.parseAssignableListItem = function(t) {
  var e = this.parseMaybeDefault(this.start, this.startLoc);
  return this.parseBindingListItem(e), e;
};
Q.parseBindingListItem = function(t) {
  return t;
};
Q.parseMaybeDefault = function(t, e, i) {
  if (i = i || this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(c.eq))
    return i;
  var r = this.startNodeAt(t, e);
  return r.left = i, r.right = this.parseMaybeAssign(), this.finishNode(r, "AssignmentPattern");
};
Q.checkLValSimple = function(t, e, i) {
  e === void 0 && (e = Lt);
  var r = e !== Lt;
  switch (t.type) {
    case "Identifier":
      this.strict && this.reservedWordsStrictBind.test(t.name) && this.raiseRecoverable(t.start, (r ? "Binding " : "Assigning to ") + t.name + " in strict mode"), r && (e === nt && t.name === "let" && this.raiseRecoverable(t.start, "let is disallowed as a lexically bound name"), i && (yt(i, t.name) && this.raiseRecoverable(t.start, "Argument name clash"), i[t.name] = !0), e !== Ie && this.declareName(t.name, e, t.start));
      break;
    case "ChainExpression":
      this.raiseRecoverable(t.start, "Optional chaining cannot appear in left-hand side");
      break;
    case "MemberExpression":
      r && this.raiseRecoverable(t.start, "Binding member expression");
      break;
    case "ParenthesizedExpression":
      return r && this.raiseRecoverable(t.start, "Binding parenthesized expression"), this.checkLValSimple(t.expression, e, i);
    default:
      this.raise(t.start, (r ? "Binding" : "Assigning to") + " rvalue");
  }
};
Q.checkLValPattern = function(t, e, i) {
  switch (e === void 0 && (e = Lt), t.type) {
    case "ObjectPattern":
      for (var r = 0, o = t.properties; r < o.length; r += 1) {
        var s = o[r];
        this.checkLValInnerPattern(s, e, i);
      }
      break;
    case "ArrayPattern":
      for (var a = 0, h = t.elements; a < h.length; a += 1) {
        var u = h[a];
        u && this.checkLValInnerPattern(u, e, i);
      }
      break;
    default:
      this.checkLValSimple(t, e, i);
  }
};
Q.checkLValInnerPattern = function(t, e, i) {
  switch (e === void 0 && (e = Lt), t.type) {
    case "Property":
      this.checkLValInnerPattern(t.value, e, i);
      break;
    case "AssignmentPattern":
      this.checkLValPattern(t.left, e, i);
      break;
    case "RestElement":
      this.checkLValPattern(t.argument, e, i);
      break;
    default:
      this.checkLValPattern(t, e, i);
  }
};
var $ = function(e, i, r, o, s) {
  this.token = e, this.isExpr = !!i, this.preserveSpace = !!r, this.override = o, this.generator = !!s;
}, w = {
  b_stat: new $("{", !1),
  b_expr: new $("{", !0),
  b_tmpl: new $("${", !1),
  p_stat: new $("(", !1),
  p_expr: new $("(", !0),
  q_tmpl: new $("`", !0, !0, function(t) {
    return t.tryReadTemplateToken();
  }),
  f_stat: new $("function", !1),
  f_expr: new $("function", !0),
  f_expr_gen: new $("function", !0, !1, null, !0),
  f_gen: new $("function", !1, !1, null, !0)
}, xt = L.prototype;
xt.initialContext = function() {
  return [w.b_stat];
};
xt.curContext = function() {
  return this.context[this.context.length - 1];
};
xt.braceIsBlock = function(t) {
  var e = this.curContext();
  return e === w.f_expr || e === w.f_stat ? !0 : t === c.colon && (e === w.b_stat || e === w.b_expr) ? !e.isExpr : t === c._return || t === c.name && this.exprAllowed ? q.test(this.input.slice(this.lastTokEnd, this.start)) : t === c._else || t === c.semi || t === c.eof || t === c.parenR || t === c.arrow ? !0 : t === c.braceL ? e === w.b_stat : t === c._var || t === c._const || t === c.name ? !1 : !this.exprAllowed;
};
xt.inGeneratorContext = function() {
  for (var t = this.context.length - 1; t >= 1; t--) {
    var e = this.context[t];
    if (e.token === "function")
      return e.generator;
  }
  return !1;
};
xt.updateContext = function(t) {
  var e, i = this.type;
  i.keyword && t === c.dot ? this.exprAllowed = !1 : (e = i.updateContext) ? e.call(this, t) : this.exprAllowed = i.beforeExpr;
};
xt.overrideContext = function(t) {
  this.curContext() !== t && (this.context[this.context.length - 1] = t);
};
c.parenR.updateContext = c.braceR.updateContext = function() {
  if (this.context.length === 1) {
    this.exprAllowed = !0;
    return;
  }
  var t = this.context.pop();
  t === w.b_stat && this.curContext().token === "function" && (t = this.context.pop()), this.exprAllowed = !t.isExpr;
};
c.braceL.updateContext = function(t) {
  this.context.push(this.braceIsBlock(t) ? w.b_stat : w.b_expr), this.exprAllowed = !0;
};
c.dollarBraceL.updateContext = function() {
  this.context.push(w.b_tmpl), this.exprAllowed = !0;
};
c.parenL.updateContext = function(t) {
  var e = t === c._if || t === c._for || t === c._with || t === c._while;
  this.context.push(e ? w.p_stat : w.p_expr), this.exprAllowed = !0;
};
c.incDec.updateContext = function() {
};
c._function.updateContext = c._class.updateContext = function(t) {
  t.beforeExpr && t !== c._else && !(t === c.semi && this.curContext() !== w.p_stat) && !(t === c._return && q.test(this.input.slice(this.lastTokEnd, this.start))) && !((t === c.colon || t === c.braceL) && this.curContext() === w.b_stat) ? this.context.push(w.f_expr) : this.context.push(w.f_stat), this.exprAllowed = !1;
};
c.colon.updateContext = function() {
  this.curContext().token === "function" && this.context.pop(), this.exprAllowed = !0;
};
c.backQuote.updateContext = function() {
  this.curContext() === w.q_tmpl ? this.context.pop() : this.context.push(w.q_tmpl), this.exprAllowed = !1;
};
c.star.updateContext = function(t) {
  if (t === c._function) {
    var e = this.context.length - 1;
    this.context[e] === w.f_expr ? this.context[e] = w.f_expr_gen : this.context[e] = w.f_gen;
  }
  this.exprAllowed = !0;
};
c.name.updateContext = function(t) {
  var e = !1;
  this.options.ecmaVersion >= 6 && t !== c.dot && (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) && (e = !0), this.exprAllowed = e;
};
var E = L.prototype;
E.checkPropClash = function(t, e, i) {
  if (!(this.options.ecmaVersion >= 9 && t.type === "SpreadElement") && !(this.options.ecmaVersion >= 6 && (t.computed || t.method || t.shorthand))) {
    var r = t.key, o;
    switch (r.type) {
      case "Identifier":
        o = r.name;
        break;
      case "Literal":
        o = String(r.value);
        break;
      default:
        return;
    }
    var s = t.kind;
    if (this.options.ecmaVersion >= 6) {
      o === "__proto__" && s === "init" && (e.proto && (i ? i.doubleProto < 0 && (i.doubleProto = r.start) : this.raiseRecoverable(r.start, "Redefinition of __proto__ property")), e.proto = !0);
      return;
    }
    o = "$" + o;
    var a = e[o];
    if (a) {
      var h;
      s === "init" ? h = this.strict && a.init || a.get || a.set : h = a.init || a[s], h && this.raiseRecoverable(r.start, "Redefinition of property");
    } else
      a = e[o] = {
        init: !1,
        get: !1,
        set: !1
      };
    a[s] = !0;
  }
};
E.parseExpression = function(t, e) {
  var i = this.start, r = this.startLoc, o = this.parseMaybeAssign(t, e);
  if (this.type === c.comma) {
    var s = this.startNodeAt(i, r);
    for (s.expressions = [o]; this.eat(c.comma); )
      s.expressions.push(this.parseMaybeAssign(t, e));
    return this.finishNode(s, "SequenceExpression");
  }
  return o;
};
E.parseMaybeAssign = function(t, e, i) {
  if (this.isContextual("yield")) {
    if (this.inGenerator)
      return this.parseYield(t);
    this.exprAllowed = !1;
  }
  var r = !1, o = -1, s = -1, a = -1;
  e ? (o = e.parenthesizedAssign, s = e.trailingComma, a = e.doubleProto, e.parenthesizedAssign = e.trailingComma = -1) : (e = new Mt(), r = !0);
  var h = this.start, u = this.startLoc;
  (this.type === c.parenL || this.type === c.name) && (this.potentialArrowAt = this.start, this.potentialArrowInForAwait = t === "await");
  var p = this.parseMaybeConditional(t, e);
  if (i && (p = i.call(this, p, h, u)), this.type.isAssign) {
    var l = this.startNodeAt(h, u);
    return l.operator = this.value, this.type === c.eq && (p = this.toAssignable(p, !1, e)), r || (e.parenthesizedAssign = e.trailingComma = e.doubleProto = -1), e.shorthandAssign >= p.start && (e.shorthandAssign = -1), this.type === c.eq ? this.checkLValPattern(p) : this.checkLValSimple(p), l.left = p, this.next(), l.right = this.parseMaybeAssign(t), a > -1 && (e.doubleProto = a), this.finishNode(l, "AssignmentExpression");
  } else
    r && this.checkExpressionErrors(e, !0);
  return o > -1 && (e.parenthesizedAssign = o), s > -1 && (e.trailingComma = s), p;
};
E.parseMaybeConditional = function(t, e) {
  var i = this.start, r = this.startLoc, o = this.parseExprOps(t, e);
  if (this.checkExpressionErrors(e))
    return o;
  if (this.eat(c.question)) {
    var s = this.startNodeAt(i, r);
    return s.test = o, s.consequent = this.parseMaybeAssign(), this.expect(c.colon), s.alternate = this.parseMaybeAssign(t), this.finishNode(s, "ConditionalExpression");
  }
  return o;
};
E.parseExprOps = function(t, e) {
  var i = this.start, r = this.startLoc, o = this.parseMaybeUnary(e, !1, !1, t);
  return this.checkExpressionErrors(e) || o.start === i && o.type === "ArrowFunctionExpression" ? o : this.parseExprOp(o, i, r, -1, t);
};
E.parseExprOp = function(t, e, i, r, o) {
  var s = this.type.binop;
  if (s != null && (!o || this.type !== c._in) && s > r) {
    var a = this.type === c.logicalOR || this.type === c.logicalAND, h = this.type === c.coalesce;
    h && (s = c.logicalAND.binop);
    var u = this.value;
    this.next();
    var p = this.start, l = this.startLoc, f = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, o), p, l, s, o), y = this.buildBinary(e, i, t, f, u, a || h);
    return (a && this.type === c.coalesce || h && (this.type === c.logicalOR || this.type === c.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"), this.parseExprOp(y, e, i, r, o);
  }
  return t;
};
E.buildBinary = function(t, e, i, r, o, s) {
  r.type === "PrivateIdentifier" && this.raise(r.start, "Private identifier can only be left side of binary expression");
  var a = this.startNodeAt(t, e);
  return a.left = i, a.operator = o, a.right = r, this.finishNode(a, s ? "LogicalExpression" : "BinaryExpression");
};
E.parseMaybeUnary = function(t, e, i, r) {
  var o = this.start, s = this.startLoc, a;
  if (this.isContextual("await") && this.canAwait)
    a = this.parseAwait(r), e = !0;
  else if (this.type.prefix) {
    var h = this.startNode(), u = this.type === c.incDec;
    h.operator = this.value, h.prefix = !0, this.next(), h.argument = this.parseMaybeUnary(null, !0, u, r), this.checkExpressionErrors(t, !0), u ? this.checkLValSimple(h.argument) : this.strict && h.operator === "delete" && Te(h.argument) ? this.raiseRecoverable(h.start, "Deleting local variable in strict mode") : h.operator === "delete" && Kt(h.argument) ? this.raiseRecoverable(h.start, "Private fields can not be deleted") : e = !0, a = this.finishNode(h, u ? "UpdateExpression" : "UnaryExpression");
  } else if (!e && this.type === c.privateId)
    (r || this.privateNameStack.length === 0) && this.options.checkPrivateFields && this.unexpected(), a = this.parsePrivateIdent(), this.type !== c._in && this.unexpected();
  else {
    if (a = this.parseExprSubscripts(t, r), this.checkExpressionErrors(t))
      return a;
    for (; this.type.postfix && !this.canInsertSemicolon(); ) {
      var p = this.startNodeAt(o, s);
      p.operator = this.value, p.prefix = !1, p.argument = a, this.checkLValSimple(a), this.next(), a = this.finishNode(p, "UpdateExpression");
    }
  }
  if (!i && this.eat(c.starstar))
    if (e)
      this.unexpected(this.lastTokStart);
    else
      return this.buildBinary(o, s, a, this.parseMaybeUnary(null, !1, !1, r), "**", !1);
  else
    return a;
};
function Te(t) {
  return t.type === "Identifier" || t.type === "ParenthesizedExpression" && Te(t.expression);
}
function Kt(t) {
  return t.type === "MemberExpression" && t.property.type === "PrivateIdentifier" || t.type === "ChainExpression" && Kt(t.expression) || t.type === "ParenthesizedExpression" && Kt(t.expression);
}
E.parseExprSubscripts = function(t, e) {
  var i = this.start, r = this.startLoc, o = this.parseExprAtom(t, e);
  if (o.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")")
    return o;
  var s = this.parseSubscripts(o, i, r, !1, e);
  return t && s.type === "MemberExpression" && (t.parenthesizedAssign >= s.start && (t.parenthesizedAssign = -1), t.parenthesizedBind >= s.start && (t.parenthesizedBind = -1), t.trailingComma >= s.start && (t.trailingComma = -1)), s;
};
E.parseSubscripts = function(t, e, i, r, o) {
  for (var s = this.options.ecmaVersion >= 8 && t.type === "Identifier" && t.name === "async" && this.lastTokEnd === t.end && !this.canInsertSemicolon() && t.end - t.start === 5 && this.potentialArrowAt === t.start, a = !1; ; ) {
    var h = this.parseSubscript(t, e, i, r, s, a, o);
    if (h.optional && (a = !0), h === t || h.type === "ArrowFunctionExpression") {
      if (a) {
        var u = this.startNodeAt(e, i);
        u.expression = h, h = this.finishNode(u, "ChainExpression");
      }
      return h;
    }
    t = h;
  }
};
E.shouldParseAsyncArrow = function() {
  return !this.canInsertSemicolon() && this.eat(c.arrow);
};
E.parseSubscriptAsyncArrow = function(t, e, i, r) {
  return this.parseArrowExpression(this.startNodeAt(t, e), i, !0, r);
};
E.parseSubscript = function(t, e, i, r, o, s, a) {
  var h = this.options.ecmaVersion >= 11, u = h && this.eat(c.questionDot);
  r && u && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
  var p = this.eat(c.bracketL);
  if (p || u && this.type !== c.parenL && this.type !== c.backQuote || this.eat(c.dot)) {
    var l = this.startNodeAt(e, i);
    l.object = t, p ? (l.property = this.parseExpression(), this.expect(c.bracketR)) : this.type === c.privateId && t.type !== "Super" ? l.property = this.parsePrivateIdent() : l.property = this.parseIdent(this.options.allowReserved !== "never"), l.computed = !!p, h && (l.optional = u), t = this.finishNode(l, "MemberExpression");
  } else if (!r && this.eat(c.parenL)) {
    var f = new Mt(), y = this.yieldPos, k = this.awaitPos, N = this.awaitIdentPos;
    this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
    var ht = this.parseExprList(c.parenR, this.options.ecmaVersion >= 8, !1, f);
    if (o && !u && this.shouldParseAsyncArrow())
      return this.checkPatternErrors(f, !1), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = y, this.awaitPos = k, this.awaitIdentPos = N, this.parseSubscriptAsyncArrow(e, i, ht, a);
    this.checkExpressionErrors(f, !0), this.yieldPos = y || this.yieldPos, this.awaitPos = k || this.awaitPos, this.awaitIdentPos = N || this.awaitIdentPos;
    var K = this.startNodeAt(e, i);
    K.callee = t, K.arguments = ht, h && (K.optional = u), t = this.finishNode(K, "CallExpression");
  } else if (this.type === c.backQuote) {
    (u || s) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
    var it = this.startNodeAt(e, i);
    it.tag = t, it.quasi = this.parseTemplate({ isTagged: !0 }), t = this.finishNode(it, "TaggedTemplateExpression");
  }
  return t;
};
E.parseExprAtom = function(t, e, i) {
  this.type === c.slash && this.readRegexp();
  var r, o = this.potentialArrowAt === this.start;
  switch (this.type) {
    case c._super:
      return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), r = this.startNode(), this.next(), this.type === c.parenL && !this.allowDirectSuper && this.raise(r.start, "super() call outside constructor of a subclass"), this.type !== c.dot && this.type !== c.bracketL && this.type !== c.parenL && this.unexpected(), this.finishNode(r, "Super");
    case c._this:
      return r = this.startNode(), this.next(), this.finishNode(r, "ThisExpression");
    case c.name:
      var s = this.start, a = this.startLoc, h = this.containsEsc, u = this.parseIdent(!1);
      if (this.options.ecmaVersion >= 8 && !h && u.name === "async" && !this.canInsertSemicolon() && this.eat(c._function))
        return this.overrideContext(w.f_expr), this.parseFunction(this.startNodeAt(s, a), 0, !1, !0, e);
      if (o && !this.canInsertSemicolon()) {
        if (this.eat(c.arrow))
          return this.parseArrowExpression(this.startNodeAt(s, a), [u], !1, e);
        if (this.options.ecmaVersion >= 8 && u.name === "async" && this.type === c.name && !h && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc))
          return u = this.parseIdent(!1), (this.canInsertSemicolon() || !this.eat(c.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAt(s, a), [u], !0, e);
      }
      return u;
    case c.regexp:
      var p = this.value;
      return r = this.parseLiteral(p.value), r.regex = { pattern: p.pattern, flags: p.flags }, r;
    case c.num:
    case c.string:
      return this.parseLiteral(this.value);
    case c._null:
    case c._true:
    case c._false:
      return r = this.startNode(), r.value = this.type === c._null ? null : this.type === c._true, r.raw = this.type.keyword, this.next(), this.finishNode(r, "Literal");
    case c.parenL:
      var l = this.start, f = this.parseParenAndDistinguishExpression(o, e);
      return t && (t.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(f) && (t.parenthesizedAssign = l), t.parenthesizedBind < 0 && (t.parenthesizedBind = l)), f;
    case c.bracketL:
      return r = this.startNode(), this.next(), r.elements = this.parseExprList(c.bracketR, !0, !0, t), this.finishNode(r, "ArrayExpression");
    case c.braceL:
      return this.overrideContext(w.b_expr), this.parseObj(!1, t);
    case c._function:
      return r = this.startNode(), this.next(), this.parseFunction(r, 0);
    case c._class:
      return this.parseClass(this.startNode(), !1);
    case c._new:
      return this.parseNew();
    case c.backQuote:
      return this.parseTemplate();
    case c._import:
      return this.options.ecmaVersion >= 11 ? this.parseExprImport(i) : this.unexpected();
    default:
      return this.parseExprAtomDefault();
  }
};
E.parseExprAtomDefault = function() {
  this.unexpected();
};
E.parseExprImport = function(t) {
  var e = this.startNode();
  if (this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword import"), this.next(), this.type === c.parenL && !t)
    return this.parseDynamicImport(e);
  if (this.type === c.dot) {
    var i = this.startNodeAt(e.start, e.loc && e.loc.start);
    return i.name = "import", e.meta = this.finishNode(i, "Identifier"), this.parseImportMeta(e);
  } else
    this.unexpected();
};
E.parseDynamicImport = function(t) {
  if (this.next(), t.source = this.parseMaybeAssign(), this.options.ecmaVersion >= 16)
    this.eat(c.parenR) ? t.options = null : (this.expect(c.comma), this.afterTrailingComma(c.parenR) ? t.options = null : (t.options = this.parseMaybeAssign(), this.eat(c.parenR) || (this.expect(c.comma), this.afterTrailingComma(c.parenR) || this.unexpected())));
  else if (!this.eat(c.parenR)) {
    var e = this.start;
    this.eat(c.comma) && this.eat(c.parenR) ? this.raiseRecoverable(e, "Trailing comma is not allowed in import()") : this.unexpected(e);
  }
  return this.finishNode(t, "ImportExpression");
};
E.parseImportMeta = function(t) {
  this.next();
  var e = this.containsEsc;
  return t.property = this.parseIdent(!0), t.property.name !== "meta" && this.raiseRecoverable(t.property.start, "The only valid meta property for import is 'import.meta'"), e && this.raiseRecoverable(t.start, "'import.meta' must not contain escaped characters"), this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere && this.raiseRecoverable(t.start, "Cannot use 'import.meta' outside a module"), this.finishNode(t, "MetaProperty");
};
E.parseLiteral = function(t) {
  var e = this.startNode();
  return e.value = t, e.raw = this.input.slice(this.start, this.end), e.raw.charCodeAt(e.raw.length - 1) === 110 && (e.bigint = e.raw.slice(0, -1).replace(/_/g, "")), this.next(), this.finishNode(e, "Literal");
};
E.parseParenExpression = function() {
  this.expect(c.parenL);
  var t = this.parseExpression();
  return this.expect(c.parenR), t;
};
E.shouldParseArrow = function(t) {
  return !this.canInsertSemicolon();
};
E.parseParenAndDistinguishExpression = function(t, e) {
  var i = this.start, r = this.startLoc, o, s = this.options.ecmaVersion >= 8;
  if (this.options.ecmaVersion >= 6) {
    this.next();
    var a = this.start, h = this.startLoc, u = [], p = !0, l = !1, f = new Mt(), y = this.yieldPos, k = this.awaitPos, N;
    for (this.yieldPos = 0, this.awaitPos = 0; this.type !== c.parenR; )
      if (p ? p = !1 : this.expect(c.comma), s && this.afterTrailingComma(c.parenR, !0)) {
        l = !0;
        break;
      } else if (this.type === c.ellipsis) {
        N = this.start, u.push(this.parseParenItem(this.parseRestBinding())), this.type === c.comma && this.raiseRecoverable(
          this.start,
          "Comma is not permitted after the rest element"
        );
        break;
      } else
        u.push(this.parseMaybeAssign(!1, f, this.parseParenItem));
    var ht = this.lastTokEnd, K = this.lastTokEndLoc;
    if (this.expect(c.parenR), t && this.shouldParseArrow(u) && this.eat(c.arrow))
      return this.checkPatternErrors(f, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = y, this.awaitPos = k, this.parseParenArrowList(i, r, u, e);
    (!u.length || l) && this.unexpected(this.lastTokStart), N && this.unexpected(N), this.checkExpressionErrors(f, !0), this.yieldPos = y || this.yieldPos, this.awaitPos = k || this.awaitPos, u.length > 1 ? (o = this.startNodeAt(a, h), o.expressions = u, this.finishNodeAt(o, "SequenceExpression", ht, K)) : o = u[0];
  } else
    o = this.parseParenExpression();
  if (this.options.preserveParens) {
    var it = this.startNodeAt(i, r);
    return it.expression = o, this.finishNode(it, "ParenthesizedExpression");
  } else
    return o;
};
E.parseParenItem = function(t) {
  return t;
};
E.parseParenArrowList = function(t, e, i, r) {
  return this.parseArrowExpression(this.startNodeAt(t, e), i, !1, r);
};
var gi = [];
E.parseNew = function() {
  this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
  var t = this.startNode();
  if (this.next(), this.options.ecmaVersion >= 6 && this.type === c.dot) {
    var e = this.startNodeAt(t.start, t.loc && t.loc.start);
    e.name = "new", t.meta = this.finishNode(e, "Identifier"), this.next();
    var i = this.containsEsc;
    return t.property = this.parseIdent(!0), t.property.name !== "target" && this.raiseRecoverable(t.property.start, "The only valid meta property for new is 'new.target'"), i && this.raiseRecoverable(t.start, "'new.target' must not contain escaped characters"), this.allowNewDotTarget || this.raiseRecoverable(t.start, "'new.target' can only be used in functions and class static block"), this.finishNode(t, "MetaProperty");
  }
  var r = this.start, o = this.startLoc;
  return t.callee = this.parseSubscripts(this.parseExprAtom(null, !1, !0), r, o, !0, !1), this.eat(c.parenL) ? t.arguments = this.parseExprList(c.parenR, this.options.ecmaVersion >= 8, !1) : t.arguments = gi, this.finishNode(t, "NewExpression");
};
E.parseTemplateElement = function(t) {
  var e = t.isTagged, i = this.startNode();
  return this.type === c.invalidTemplate ? (e || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"), i.value = {
    raw: this.value.replace(/\r\n?/g, `
`),
    cooked: null
  }) : i.value = {
    raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, `
`),
    cooked: this.value
  }, this.next(), i.tail = this.type === c.backQuote, this.finishNode(i, "TemplateElement");
};
E.parseTemplate = function(t) {
  t === void 0 && (t = {});
  var e = t.isTagged;
  e === void 0 && (e = !1);
  var i = this.startNode();
  this.next(), i.expressions = [];
  var r = this.parseTemplateElement({ isTagged: e });
  for (i.quasis = [r]; !r.tail; )
    this.type === c.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(c.dollarBraceL), i.expressions.push(this.parseExpression()), this.expect(c.braceR), i.quasis.push(r = this.parseTemplateElement({ isTagged: e }));
  return this.next(), this.finishNode(i, "TemplateLiteral");
};
E.isAsyncProp = function(t) {
  return !t.computed && t.key.type === "Identifier" && t.key.name === "async" && (this.type === c.name || this.type === c.num || this.type === c.string || this.type === c.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === c.star) && !q.test(this.input.slice(this.lastTokEnd, this.start));
};
E.parseObj = function(t, e) {
  var i = this.startNode(), r = !0, o = {};
  for (i.properties = [], this.next(); !this.eat(c.braceR); ) {
    if (r)
      r = !1;
    else if (this.expect(c.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(c.braceR))
      break;
    var s = this.parseProperty(t, e);
    t || this.checkPropClash(s, o, e), i.properties.push(s);
  }
  return this.finishNode(i, t ? "ObjectPattern" : "ObjectExpression");
};
E.parseProperty = function(t, e) {
  var i = this.startNode(), r, o, s, a;
  if (this.options.ecmaVersion >= 9 && this.eat(c.ellipsis))
    return t ? (i.argument = this.parseIdent(!1), this.type === c.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.finishNode(i, "RestElement")) : (i.argument = this.parseMaybeAssign(!1, e), this.type === c.comma && e && e.trailingComma < 0 && (e.trailingComma = this.start), this.finishNode(i, "SpreadElement"));
  this.options.ecmaVersion >= 6 && (i.method = !1, i.shorthand = !1, (t || e) && (s = this.start, a = this.startLoc), t || (r = this.eat(c.star)));
  var h = this.containsEsc;
  return this.parsePropertyName(i), !t && !h && this.options.ecmaVersion >= 8 && !r && this.isAsyncProp(i) ? (o = !0, r = this.options.ecmaVersion >= 9 && this.eat(c.star), this.parsePropertyName(i)) : o = !1, this.parsePropertyValue(i, t, r, o, s, a, e, h), this.finishNode(i, "Property");
};
E.parseGetterSetter = function(t) {
  var e = t.key.name;
  this.parsePropertyName(t), t.value = this.parseMethod(!1), t.kind = e;
  var i = t.kind === "get" ? 0 : 1;
  if (t.value.params.length !== i) {
    var r = t.value.start;
    t.kind === "get" ? this.raiseRecoverable(r, "getter should have no params") : this.raiseRecoverable(r, "setter should have exactly one param");
  } else
    t.kind === "set" && t.value.params[0].type === "RestElement" && this.raiseRecoverable(t.value.params[0].start, "Setter cannot use rest params");
};
E.parsePropertyValue = function(t, e, i, r, o, s, a, h) {
  (i || r) && this.type === c.colon && this.unexpected(), this.eat(c.colon) ? (t.value = e ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, a), t.kind = "init") : this.options.ecmaVersion >= 6 && this.type === c.parenL ? (e && this.unexpected(), t.method = !0, t.value = this.parseMethod(i, r), t.kind = "init") : !e && !h && this.options.ecmaVersion >= 5 && !t.computed && t.key.type === "Identifier" && (t.key.name === "get" || t.key.name === "set") && this.type !== c.comma && this.type !== c.braceR && this.type !== c.eq ? ((i || r) && this.unexpected(), this.parseGetterSetter(t)) : this.options.ecmaVersion >= 6 && !t.computed && t.key.type === "Identifier" ? ((i || r) && this.unexpected(), this.checkUnreserved(t.key), t.key.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = o), e ? t.value = this.parseMaybeDefault(o, s, this.copyNode(t.key)) : this.type === c.eq && a ? (a.shorthandAssign < 0 && (a.shorthandAssign = this.start), t.value = this.parseMaybeDefault(o, s, this.copyNode(t.key))) : t.value = this.copyNode(t.key), t.kind = "init", t.shorthand = !0) : this.unexpected();
};
E.parsePropertyName = function(t) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(c.bracketL))
      return t.computed = !0, t.key = this.parseMaybeAssign(), this.expect(c.bracketR), t.key;
    t.computed = !1;
  }
  return t.key = this.type === c.num || this.type === c.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
};
E.initFunction = function(t) {
  t.id = null, this.options.ecmaVersion >= 6 && (t.generator = t.expression = !1), this.options.ecmaVersion >= 8 && (t.async = !1);
};
E.parseMethod = function(t, e, i) {
  var r = this.startNode(), o = this.yieldPos, s = this.awaitPos, a = this.awaitIdentPos;
  return this.initFunction(r), this.options.ecmaVersion >= 6 && (r.generator = t), this.options.ecmaVersion >= 8 && (r.async = !!e), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(ee(e, r.generator) | Ut | (i ? ke : 0)), this.expect(c.parenL), r.params = this.parseBindingList(c.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(r, !1, !0, !1), this.yieldPos = o, this.awaitPos = s, this.awaitIdentPos = a, this.finishNode(r, "FunctionExpression");
};
E.parseArrowExpression = function(t, e, i, r) {
  var o = this.yieldPos, s = this.awaitPos, a = this.awaitIdentPos;
  return this.enterScope(ee(i, !1) | te), this.initFunction(t), this.options.ecmaVersion >= 8 && (t.async = !!i), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, t.params = this.toAssignableList(e, !0), this.parseFunctionBody(t, !0, !1, r), this.yieldPos = o, this.awaitPos = s, this.awaitIdentPos = a, this.finishNode(t, "ArrowFunctionExpression");
};
E.parseFunctionBody = function(t, e, i, r) {
  var o = e && this.type !== c.braceL, s = this.strict, a = !1;
  if (o)
    t.body = this.parseMaybeAssign(r), t.expression = !0, this.checkParams(t, !1);
  else {
    var h = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(t.params);
    (!s || h) && (a = this.strictDirective(this.end), a && h && this.raiseRecoverable(t.start, "Illegal 'use strict' directive in function with non-simple parameter list"));
    var u = this.labels;
    this.labels = [], a && (this.strict = !0), this.checkParams(t, !s && !a && !e && !i && this.isSimpleParamList(t.params)), this.strict && t.id && this.checkLValSimple(t.id, Ie), t.body = this.parseBlock(!1, void 0, a && !s), t.expression = !1, this.adaptDirectivePrologue(t.body.body), this.labels = u;
  }
  this.exitScope();
};
E.isSimpleParamList = function(t) {
  for (var e = 0, i = t; e < i.length; e += 1) {
    var r = i[e];
    if (r.type !== "Identifier")
      return !1;
  }
  return !0;
};
E.checkParams = function(t, e) {
  for (var i = /* @__PURE__ */ Object.create(null), r = 0, o = t.params; r < o.length; r += 1) {
    var s = o[r];
    this.checkLValInnerPattern(s, ie, e ? null : i);
  }
};
E.parseExprList = function(t, e, i, r) {
  for (var o = [], s = !0; !this.eat(t); ) {
    if (s)
      s = !1;
    else if (this.expect(c.comma), e && this.afterTrailingComma(t))
      break;
    var a = void 0;
    i && this.type === c.comma ? a = null : this.type === c.ellipsis ? (a = this.parseSpread(r), r && this.type === c.comma && r.trailingComma < 0 && (r.trailingComma = this.start)) : a = this.parseMaybeAssign(!1, r), o.push(a);
  }
  return o;
};
E.checkUnreserved = function(t) {
  var e = t.start, i = t.end, r = t.name;
  if (this.inGenerator && r === "yield" && this.raiseRecoverable(e, "Cannot use 'yield' as identifier inside a generator"), this.inAsync && r === "await" && this.raiseRecoverable(e, "Cannot use 'await' as identifier inside an async function"), !(this.currentThisScope().flags & Bt) && r === "arguments" && this.raiseRecoverable(e, "Cannot use 'arguments' in class field initializer"), this.inClassStaticBlock && (r === "arguments" || r === "await") && this.raise(e, "Cannot use " + r + " in class static initialization block"), this.keywords.test(r) && this.raise(e, "Unexpected keyword '" + r + "'"), !(this.options.ecmaVersion < 6 && this.input.slice(e, i).indexOf("\\") !== -1)) {
    var o = this.strict ? this.reservedWordsStrict : this.reservedWords;
    o.test(r) && (!this.inAsync && r === "await" && this.raiseRecoverable(e, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(e, "The keyword '" + r + "' is reserved"));
  }
};
E.parseIdent = function(t) {
  var e = this.parseIdentNode();
  return this.next(!!t), this.finishNode(e, "Identifier"), t || (this.checkUnreserved(e), e.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = e.start)), e;
};
E.parseIdentNode = function() {
  var t = this.startNode();
  return this.type === c.name ? t.name = this.value : this.type.keyword ? (t.name = this.type.keyword, (t.name === "class" || t.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46) && this.context.pop(), this.type = c.name) : this.unexpected(), t;
};
E.parsePrivateIdent = function() {
  var t = this.startNode();
  return this.type === c.privateId ? t.name = this.value : this.unexpected(), this.next(), this.finishNode(t, "PrivateIdentifier"), this.options.checkPrivateFields && (this.privateNameStack.length === 0 ? this.raise(t.start, "Private field '#" + t.name + "' must be declared in an enclosing class") : this.privateNameStack[this.privateNameStack.length - 1].used.push(t)), t;
};
E.parseYield = function(t) {
  this.yieldPos || (this.yieldPos = this.start);
  var e = this.startNode();
  return this.next(), this.type === c.semi || this.canInsertSemicolon() || this.type !== c.star && !this.type.startsExpr ? (e.delegate = !1, e.argument = null) : (e.delegate = this.eat(c.star), e.argument = this.parseMaybeAssign(t)), this.finishNode(e, "YieldExpression");
};
E.parseAwait = function(t) {
  this.awaitPos || (this.awaitPos = this.start);
  var e = this.startNode();
  return this.next(), e.argument = this.parseMaybeUnary(null, !0, !1, t), this.finishNode(e, "AwaitExpression");
};
var Ft = L.prototype;
Ft.raise = function(t, e) {
  var i = Ee(this.input, t);
  e += " (" + i.line + ":" + i.column + ")", this.sourceFile && (e += " in " + this.sourceFile);
  var r = new SyntaxError(e);
  throw r.pos = t, r.loc = i, r.raisedAt = this.pos, r;
};
Ft.raiseRecoverable = Ft.raise;
Ft.curPosition = function() {
  if (this.options.locations)
    return new It(this.curLine, this.pos - this.lineStart);
};
var ct = L.prototype, Ei = function(e) {
  this.flags = e, this.var = [], this.lexical = [], this.functions = [];
};
ct.enterScope = function(t) {
  this.scopeStack.push(new Ei(t));
};
ct.exitScope = function() {
  this.scopeStack.pop();
};
ct.treatFunctionsAsVarInScope = function(t) {
  return t.flags & bt || !this.inModule && t.flags & Pt;
};
ct.declareName = function(t, e, i) {
  var r = !1;
  if (e === nt) {
    var o = this.currentScope();
    r = o.lexical.indexOf(t) > -1 || o.functions.indexOf(t) > -1 || o.var.indexOf(t) > -1, o.lexical.push(t), this.inModule && o.flags & Pt && delete this.undefinedExports[t];
  } else if (e === Ae) {
    var s = this.currentScope();
    s.lexical.push(t);
  } else if (e === _e) {
    var a = this.currentScope();
    this.treatFunctionsAsVar ? r = a.lexical.indexOf(t) > -1 : r = a.lexical.indexOf(t) > -1 || a.var.indexOf(t) > -1, a.functions.push(t);
  } else
    for (var h = this.scopeStack.length - 1; h >= 0; --h) {
      var u = this.scopeStack[h];
      if (u.lexical.indexOf(t) > -1 && !(u.flags & Se && u.lexical[0] === t) || !this.treatFunctionsAsVarInScope(u) && u.functions.indexOf(t) > -1) {
        r = !0;
        break;
      }
      if (u.var.push(t), this.inModule && u.flags & Pt && delete this.undefinedExports[t], u.flags & Bt)
        break;
    }
  r && this.raiseRecoverable(i, "Identifier '" + t + "' has already been declared");
};
ct.checkLocalExport = function(t) {
  this.scopeStack[0].lexical.indexOf(t.name) === -1 && this.scopeStack[0].var.indexOf(t.name) === -1 && (this.undefinedExports[t.name] = t);
};
ct.currentScope = function() {
  return this.scopeStack[this.scopeStack.length - 1];
};
ct.currentVarScope = function() {
  for (var t = this.scopeStack.length - 1; ; t--) {
    var e = this.scopeStack[t];
    if (e.flags & (Bt | Tt | ft))
      return e;
  }
};
ct.currentThisScope = function() {
  for (var t = this.scopeStack.length - 1; ; t--) {
    var e = this.scopeStack[t];
    if (e.flags & (Bt | Tt | ft) && !(e.flags & te))
      return e;
  }
};
var Ht = function(e, i, r) {
  this.type = "", this.start = i, this.end = 0, e.options.locations && (this.loc = new Vt(e, r)), e.options.directSourceFile && (this.sourceFile = e.options.directSourceFile), e.options.ranges && (this.range = [i, 0]);
}, wt = L.prototype;
wt.startNode = function() {
  return new Ht(this, this.start, this.startLoc);
};
wt.startNodeAt = function(t, e) {
  return new Ht(this, t, e);
};
function we(t, e, i, r) {
  return t.type = e, t.end = i, this.options.locations && (t.loc.end = r), this.options.ranges && (t.range[1] = i), t;
}
wt.finishNode = function(t, e) {
  return we.call(this, t, e, this.lastTokEnd, this.lastTokEndLoc);
};
wt.finishNodeAt = function(t, e, i, r) {
  return we.call(this, t, e, i, r);
};
wt.copyNode = function(t) {
  var e = new Ht(this, t.start, this.startLoc);
  for (var i in t)
    e[i] = t[i];
  return e;
};
var vi = "Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sunu Sunuwar Todhri Todr Tulu_Tigalari Tutg Unknown Zzzz", Ne = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS", Re = Ne + " Extended_Pictographic", Ce = Re, Le = Ce + " EBase EComp EMod EPres ExtPict", De = Le, Si = De, ki = {
  9: Ne,
  10: Re,
  11: Ce,
  12: Le,
  13: De,
  14: Si
}, _i = "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji", Ai = {
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: _i
}, ue = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu", Fe = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb", Oe = Fe + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd", Ve = Oe + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho", Ue = Ve + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi", Be = Ue + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith", Ii = Be + " " + vi, Pi = {
  9: Fe,
  10: Oe,
  11: Ve,
  12: Ue,
  13: Be,
  14: Ii
}, Me = {};
function Ti(t) {
  var e = Me[t] = {
    binary: ot(ki[t] + " " + ue),
    binaryOfStrings: ot(Ai[t]),
    nonBinary: {
      General_Category: ot(ue),
      Script: ot(Pi[t])
    }
  };
  e.nonBinary.Script_Extensions = e.nonBinary.Script, e.nonBinary.gc = e.nonBinary.General_Category, e.nonBinary.sc = e.nonBinary.Script, e.nonBinary.scx = e.nonBinary.Script_Extensions;
}
for (var Wt = 0, pe = [9, 10, 11, 12, 13, 14]; Wt < pe.length; Wt += 1) {
  var wi = pe[Wt];
  Ti(wi);
}
var d = L.prototype, Ot = function(e, i) {
  this.parent = e, this.base = i || this;
};
Ot.prototype.separatedFrom = function(e) {
  for (var i = this; i; i = i.parent)
    for (var r = e; r; r = r.parent)
      if (i.base === r.base && i !== r)
        return !0;
  return !1;
};
Ot.prototype.sibling = function() {
  return new Ot(this.parent, this.base);
};
var et = function(e) {
  this.parser = e, this.validFlags = "gim" + (e.options.ecmaVersion >= 6 ? "uy" : "") + (e.options.ecmaVersion >= 9 ? "s" : "") + (e.options.ecmaVersion >= 13 ? "d" : "") + (e.options.ecmaVersion >= 15 ? "v" : ""), this.unicodeProperties = Me[e.options.ecmaVersion >= 14 ? 14 : e.options.ecmaVersion], this.source = "", this.flags = "", this.start = 0, this.switchU = !1, this.switchV = !1, this.switchN = !1, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = /* @__PURE__ */ Object.create(null), this.backReferenceNames = [], this.branchID = null;
};
et.prototype.reset = function(e, i, r) {
  var o = r.indexOf("v") !== -1, s = r.indexOf("u") !== -1;
  this.start = e | 0, this.source = i + "", this.flags = r, o && this.parser.options.ecmaVersion >= 15 ? (this.switchU = !0, this.switchV = !0, this.switchN = !0) : (this.switchU = s && this.parser.options.ecmaVersion >= 6, this.switchV = !1, this.switchN = s && this.parser.options.ecmaVersion >= 9);
};
et.prototype.raise = function(e) {
  this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + e);
};
et.prototype.at = function(e, i) {
  i === void 0 && (i = !1);
  var r = this.source, o = r.length;
  if (e >= o)
    return -1;
  var s = r.charCodeAt(e);
  if (!(i || this.switchU) || s <= 55295 || s >= 57344 || e + 1 >= o)
    return s;
  var a = r.charCodeAt(e + 1);
  return a >= 56320 && a <= 57343 ? (s << 10) + a - 56613888 : s;
};
et.prototype.nextIndex = function(e, i) {
  i === void 0 && (i = !1);
  var r = this.source, o = r.length;
  if (e >= o)
    return o;
  var s = r.charCodeAt(e), a;
  return !(i || this.switchU) || s <= 55295 || s >= 57344 || e + 1 >= o || (a = r.charCodeAt(e + 1)) < 56320 || a > 57343 ? e + 1 : e + 2;
};
et.prototype.current = function(e) {
  return e === void 0 && (e = !1), this.at(this.pos, e);
};
et.prototype.lookahead = function(e) {
  return e === void 0 && (e = !1), this.at(this.nextIndex(this.pos, e), e);
};
et.prototype.advance = function(e) {
  e === void 0 && (e = !1), this.pos = this.nextIndex(this.pos, e);
};
et.prototype.eat = function(e, i) {
  return i === void 0 && (i = !1), this.current(i) === e ? (this.advance(i), !0) : !1;
};
et.prototype.eatChars = function(e, i) {
  i === void 0 && (i = !1);
  for (var r = this.pos, o = 0, s = e; o < s.length; o += 1) {
    var a = s[o], h = this.at(r, i);
    if (h === -1 || h !== a)
      return !1;
    r = this.nextIndex(r, i);
  }
  return this.pos = r, !0;
};
d.validateRegExpFlags = function(t) {
  for (var e = t.validFlags, i = t.flags, r = !1, o = !1, s = 0; s < i.length; s++) {
    var a = i.charAt(s);
    e.indexOf(a) === -1 && this.raise(t.start, "Invalid regular expression flag"), i.indexOf(a, s + 1) > -1 && this.raise(t.start, "Duplicate regular expression flag"), a === "u" && (r = !0), a === "v" && (o = !0);
  }
  this.options.ecmaVersion >= 15 && r && o && this.raise(t.start, "Invalid regular expression flag");
};
function Ni(t) {
  for (var e in t)
    return !0;
  return !1;
}
d.validateRegExpPattern = function(t) {
  this.regexp_pattern(t), !t.switchN && this.options.ecmaVersion >= 9 && Ni(t.groupNames) && (t.switchN = !0, this.regexp_pattern(t));
};
d.regexp_pattern = function(t) {
  t.pos = 0, t.lastIntValue = 0, t.lastStringValue = "", t.lastAssertionIsQuantifiable = !1, t.numCapturingParens = 0, t.maxBackReference = 0, t.groupNames = /* @__PURE__ */ Object.create(null), t.backReferenceNames.length = 0, t.branchID = null, this.regexp_disjunction(t), t.pos !== t.source.length && (t.eat(
    41
    /* ) */
  ) && t.raise("Unmatched ')'"), (t.eat(
    93
    /* ] */
  ) || t.eat(
    125
    /* } */
  )) && t.raise("Lone quantifier brackets")), t.maxBackReference > t.numCapturingParens && t.raise("Invalid escape");
  for (var e = 0, i = t.backReferenceNames; e < i.length; e += 1) {
    var r = i[e];
    t.groupNames[r] || t.raise("Invalid named capture referenced");
  }
};
d.regexp_disjunction = function(t) {
  var e = this.options.ecmaVersion >= 16;
  for (e && (t.branchID = new Ot(t.branchID, null)), this.regexp_alternative(t); t.eat(
    124
    /* | */
  ); )
    e && (t.branchID = t.branchID.sibling()), this.regexp_alternative(t);
  e && (t.branchID = t.branchID.parent), this.regexp_eatQuantifier(t, !0) && t.raise("Nothing to repeat"), t.eat(
    123
    /* { */
  ) && t.raise("Lone quantifier brackets");
};
d.regexp_alternative = function(t) {
  for (; t.pos < t.source.length && this.regexp_eatTerm(t); )
    ;
};
d.regexp_eatTerm = function(t) {
  return this.regexp_eatAssertion(t) ? (t.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(t) && t.switchU && t.raise("Invalid quantifier"), !0) : (t.switchU ? this.regexp_eatAtom(t) : this.regexp_eatExtendedAtom(t)) ? (this.regexp_eatQuantifier(t), !0) : !1;
};
d.regexp_eatAssertion = function(t) {
  var e = t.pos;
  if (t.lastAssertionIsQuantifiable = !1, t.eat(
    94
    /* ^ */
  ) || t.eat(
    36
    /* $ */
  ))
    return !0;
  if (t.eat(
    92
    /* \ */
  )) {
    if (t.eat(
      66
      /* B */
    ) || t.eat(
      98
      /* b */
    ))
      return !0;
    t.pos = e;
  }
  if (t.eat(
    40
    /* ( */
  ) && t.eat(
    63
    /* ? */
  )) {
    var i = !1;
    if (this.options.ecmaVersion >= 9 && (i = t.eat(
      60
      /* < */
    )), t.eat(
      61
      /* = */
    ) || t.eat(
      33
      /* ! */
    ))
      return this.regexp_disjunction(t), t.eat(
        41
        /* ) */
      ) || t.raise("Unterminated group"), t.lastAssertionIsQuantifiable = !i, !0;
  }
  return t.pos = e, !1;
};
d.regexp_eatQuantifier = function(t, e) {
  return e === void 0 && (e = !1), this.regexp_eatQuantifierPrefix(t, e) ? (t.eat(
    63
    /* ? */
  ), !0) : !1;
};
d.regexp_eatQuantifierPrefix = function(t, e) {
  return t.eat(
    42
    /* * */
  ) || t.eat(
    43
    /* + */
  ) || t.eat(
    63
    /* ? */
  ) || this.regexp_eatBracedQuantifier(t, e);
};
d.regexp_eatBracedQuantifier = function(t, e) {
  var i = t.pos;
  if (t.eat(
    123
    /* { */
  )) {
    var r = 0, o = -1;
    if (this.regexp_eatDecimalDigits(t) && (r = t.lastIntValue, t.eat(
      44
      /* , */
    ) && this.regexp_eatDecimalDigits(t) && (o = t.lastIntValue), t.eat(
      125
      /* } */
    )))
      return o !== -1 && o < r && !e && t.raise("numbers out of order in {} quantifier"), !0;
    t.switchU && !e && t.raise("Incomplete quantifier"), t.pos = i;
  }
  return !1;
};
d.regexp_eatAtom = function(t) {
  return this.regexp_eatPatternCharacters(t) || t.eat(
    46
    /* . */
  ) || this.regexp_eatReverseSolidusAtomEscape(t) || this.regexp_eatCharacterClass(t) || this.regexp_eatUncapturingGroup(t) || this.regexp_eatCapturingGroup(t);
};
d.regexp_eatReverseSolidusAtomEscape = function(t) {
  var e = t.pos;
  if (t.eat(
    92
    /* \ */
  )) {
    if (this.regexp_eatAtomEscape(t))
      return !0;
    t.pos = e;
  }
  return !1;
};
d.regexp_eatUncapturingGroup = function(t) {
  var e = t.pos;
  if (t.eat(
    40
    /* ( */
  )) {
    if (t.eat(
      63
      /* ? */
    )) {
      if (this.options.ecmaVersion >= 16) {
        var i = this.regexp_eatModifiers(t), r = t.eat(
          45
          /* - */
        );
        if (i || r) {
          for (var o = 0; o < i.length; o++) {
            var s = i.charAt(o);
            i.indexOf(s, o + 1) > -1 && t.raise("Duplicate regular expression modifiers");
          }
          if (r) {
            var a = this.regexp_eatModifiers(t);
            !i && !a && t.current() === 58 && t.raise("Invalid regular expression modifiers");
            for (var h = 0; h < a.length; h++) {
              var u = a.charAt(h);
              (a.indexOf(u, h + 1) > -1 || i.indexOf(u) > -1) && t.raise("Duplicate regular expression modifiers");
            }
          }
        }
      }
      if (t.eat(
        58
        /* : */
      )) {
        if (this.regexp_disjunction(t), t.eat(
          41
          /* ) */
        ))
          return !0;
        t.raise("Unterminated group");
      }
    }
    t.pos = e;
  }
  return !1;
};
d.regexp_eatCapturingGroup = function(t) {
  if (t.eat(
    40
    /* ( */
  )) {
    if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(t) : t.current() === 63 && t.raise("Invalid group"), this.regexp_disjunction(t), t.eat(
      41
      /* ) */
    ))
      return t.numCapturingParens += 1, !0;
    t.raise("Unterminated group");
  }
  return !1;
};
d.regexp_eatModifiers = function(t) {
  for (var e = "", i = 0; (i = t.current()) !== -1 && Ri(i); )
    e += rt(i), t.advance();
  return e;
};
function Ri(t) {
  return t === 105 || t === 109 || t === 115;
}
d.regexp_eatExtendedAtom = function(t) {
  return t.eat(
    46
    /* . */
  ) || this.regexp_eatReverseSolidusAtomEscape(t) || this.regexp_eatCharacterClass(t) || this.regexp_eatUncapturingGroup(t) || this.regexp_eatCapturingGroup(t) || this.regexp_eatInvalidBracedQuantifier(t) || this.regexp_eatExtendedPatternCharacter(t);
};
d.regexp_eatInvalidBracedQuantifier = function(t) {
  return this.regexp_eatBracedQuantifier(t, !0) && t.raise("Nothing to repeat"), !1;
};
d.regexp_eatSyntaxCharacter = function(t) {
  var e = t.current();
  return He(e) ? (t.lastIntValue = e, t.advance(), !0) : !1;
};
function He(t) {
  return t === 36 || t >= 40 && t <= 43 || t === 46 || t === 63 || t >= 91 && t <= 94 || t >= 123 && t <= 125;
}
d.regexp_eatPatternCharacters = function(t) {
  for (var e = t.pos, i = 0; (i = t.current()) !== -1 && !He(i); )
    t.advance();
  return t.pos !== e;
};
d.regexp_eatExtendedPatternCharacter = function(t) {
  var e = t.current();
  return e !== -1 && e !== 36 && !(e >= 40 && e <= 43) && e !== 46 && e !== 63 && e !== 91 && e !== 94 && e !== 124 ? (t.advance(), !0) : !1;
};
d.regexp_groupSpecifier = function(t) {
  if (t.eat(
    63
    /* ? */
  )) {
    this.regexp_eatGroupName(t) || t.raise("Invalid group");
    var e = this.options.ecmaVersion >= 16, i = t.groupNames[t.lastStringValue];
    if (i)
      if (e)
        for (var r = 0, o = i; r < o.length; r += 1) {
          var s = o[r];
          s.separatedFrom(t.branchID) || t.raise("Duplicate capture group name");
        }
      else
        t.raise("Duplicate capture group name");
    e ? (i || (t.groupNames[t.lastStringValue] = [])).push(t.branchID) : t.groupNames[t.lastStringValue] = !0;
  }
};
d.regexp_eatGroupName = function(t) {
  if (t.lastStringValue = "", t.eat(
    60
    /* < */
  )) {
    if (this.regexp_eatRegExpIdentifierName(t) && t.eat(
      62
      /* > */
    ))
      return !0;
    t.raise("Invalid capture group name");
  }
  return !1;
};
d.regexp_eatRegExpIdentifierName = function(t) {
  if (t.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(t)) {
    for (t.lastStringValue += rt(t.lastIntValue); this.regexp_eatRegExpIdentifierPart(t); )
      t.lastStringValue += rt(t.lastIntValue);
    return !0;
  }
  return !1;
};
d.regexp_eatRegExpIdentifierStart = function(t) {
  var e = t.pos, i = this.options.ecmaVersion >= 11, r = t.current(i);
  return t.advance(i), r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(t, i) && (r = t.lastIntValue), Ci(r) ? (t.lastIntValue = r, !0) : (t.pos = e, !1);
};
function Ci(t) {
  return st(t, !0) || t === 36 || t === 95;
}
d.regexp_eatRegExpIdentifierPart = function(t) {
  var e = t.pos, i = this.options.ecmaVersion >= 11, r = t.current(i);
  return t.advance(i), r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(t, i) && (r = t.lastIntValue), Li(r) ? (t.lastIntValue = r, !0) : (t.pos = e, !1);
};
function Li(t) {
  return mt(t, !0) || t === 36 || t === 95 || t === 8204 || t === 8205;
}
d.regexp_eatAtomEscape = function(t) {
  return this.regexp_eatBackReference(t) || this.regexp_eatCharacterClassEscape(t) || this.regexp_eatCharacterEscape(t) || t.switchN && this.regexp_eatKGroupName(t) ? !0 : (t.switchU && (t.current() === 99 && t.raise("Invalid unicode escape"), t.raise("Invalid escape")), !1);
};
d.regexp_eatBackReference = function(t) {
  var e = t.pos;
  if (this.regexp_eatDecimalEscape(t)) {
    var i = t.lastIntValue;
    if (t.switchU)
      return i > t.maxBackReference && (t.maxBackReference = i), !0;
    if (i <= t.numCapturingParens)
      return !0;
    t.pos = e;
  }
  return !1;
};
d.regexp_eatKGroupName = function(t) {
  if (t.eat(
    107
    /* k */
  )) {
    if (this.regexp_eatGroupName(t))
      return t.backReferenceNames.push(t.lastStringValue), !0;
    t.raise("Invalid named reference");
  }
  return !1;
};
d.regexp_eatCharacterEscape = function(t) {
  return this.regexp_eatControlEscape(t) || this.regexp_eatCControlLetter(t) || this.regexp_eatZero(t) || this.regexp_eatHexEscapeSequence(t) || this.regexp_eatRegExpUnicodeEscapeSequence(t, !1) || !t.switchU && this.regexp_eatLegacyOctalEscapeSequence(t) || this.regexp_eatIdentityEscape(t);
};
d.regexp_eatCControlLetter = function(t) {
  var e = t.pos;
  if (t.eat(
    99
    /* c */
  )) {
    if (this.regexp_eatControlLetter(t))
      return !0;
    t.pos = e;
  }
  return !1;
};
d.regexp_eatZero = function(t) {
  return t.current() === 48 && !jt(t.lookahead()) ? (t.lastIntValue = 0, t.advance(), !0) : !1;
};
d.regexp_eatControlEscape = function(t) {
  var e = t.current();
  return e === 116 ? (t.lastIntValue = 9, t.advance(), !0) : e === 110 ? (t.lastIntValue = 10, t.advance(), !0) : e === 118 ? (t.lastIntValue = 11, t.advance(), !0) : e === 102 ? (t.lastIntValue = 12, t.advance(), !0) : e === 114 ? (t.lastIntValue = 13, t.advance(), !0) : !1;
};
d.regexp_eatControlLetter = function(t) {
  var e = t.current();
  return je(e) ? (t.lastIntValue = e % 32, t.advance(), !0) : !1;
};
function je(t) {
  return t >= 65 && t <= 90 || t >= 97 && t <= 122;
}
d.regexp_eatRegExpUnicodeEscapeSequence = function(t, e) {
  e === void 0 && (e = !1);
  var i = t.pos, r = e || t.switchU;
  if (t.eat(
    117
    /* u */
  )) {
    if (this.regexp_eatFixedHexDigits(t, 4)) {
      var o = t.lastIntValue;
      if (r && o >= 55296 && o <= 56319) {
        var s = t.pos;
        if (t.eat(
          92
          /* \ */
        ) && t.eat(
          117
          /* u */
        ) && this.regexp_eatFixedHexDigits(t, 4)) {
          var a = t.lastIntValue;
          if (a >= 56320 && a <= 57343)
            return t.lastIntValue = (o - 55296) * 1024 + (a - 56320) + 65536, !0;
        }
        t.pos = s, t.lastIntValue = o;
      }
      return !0;
    }
    if (r && t.eat(
      123
      /* { */
    ) && this.regexp_eatHexDigits(t) && t.eat(
      125
      /* } */
    ) && Di(t.lastIntValue))
      return !0;
    r && t.raise("Invalid unicode escape"), t.pos = i;
  }
  return !1;
};
function Di(t) {
  return t >= 0 && t <= 1114111;
}
d.regexp_eatIdentityEscape = function(t) {
  if (t.switchU)
    return this.regexp_eatSyntaxCharacter(t) ? !0 : t.eat(
      47
      /* / */
    ) ? (t.lastIntValue = 47, !0) : !1;
  var e = t.current();
  return e !== 99 && (!t.switchN || e !== 107) ? (t.lastIntValue = e, t.advance(), !0) : !1;
};
d.regexp_eatDecimalEscape = function(t) {
  t.lastIntValue = 0;
  var e = t.current();
  if (e >= 49 && e <= 57) {
    do
      t.lastIntValue = 10 * t.lastIntValue + (e - 48), t.advance();
    while ((e = t.current()) >= 48 && e <= 57);
    return !0;
  }
  return !1;
};
var Ge = 0, at = 1, Y = 2;
d.regexp_eatCharacterClassEscape = function(t) {
  var e = t.current();
  if (Fi(e))
    return t.lastIntValue = -1, t.advance(), at;
  var i = !1;
  if (t.switchU && this.options.ecmaVersion >= 9 && ((i = e === 80) || e === 112)) {
    t.lastIntValue = -1, t.advance();
    var r;
    if (t.eat(
      123
      /* { */
    ) && (r = this.regexp_eatUnicodePropertyValueExpression(t)) && t.eat(
      125
      /* } */
    ))
      return i && r === Y && t.raise("Invalid property name"), r;
    t.raise("Invalid property name");
  }
  return Ge;
};
function Fi(t) {
  return t === 100 || t === 68 || t === 115 || t === 83 || t === 119 || t === 87;
}
d.regexp_eatUnicodePropertyValueExpression = function(t) {
  var e = t.pos;
  if (this.regexp_eatUnicodePropertyName(t) && t.eat(
    61
    /* = */
  )) {
    var i = t.lastStringValue;
    if (this.regexp_eatUnicodePropertyValue(t)) {
      var r = t.lastStringValue;
      return this.regexp_validateUnicodePropertyNameAndValue(t, i, r), at;
    }
  }
  if (t.pos = e, this.regexp_eatLoneUnicodePropertyNameOrValue(t)) {
    var o = t.lastStringValue;
    return this.regexp_validateUnicodePropertyNameOrValue(t, o);
  }
  return Ge;
};
d.regexp_validateUnicodePropertyNameAndValue = function(t, e, i) {
  yt(t.unicodeProperties.nonBinary, e) || t.raise("Invalid property name"), t.unicodeProperties.nonBinary[e].test(i) || t.raise("Invalid property value");
};
d.regexp_validateUnicodePropertyNameOrValue = function(t, e) {
  if (t.unicodeProperties.binary.test(e))
    return at;
  if (t.switchV && t.unicodeProperties.binaryOfStrings.test(e))
    return Y;
  t.raise("Invalid property name");
};
d.regexp_eatUnicodePropertyName = function(t) {
  var e = 0;
  for (t.lastStringValue = ""; Je(e = t.current()); )
    t.lastStringValue += rt(e), t.advance();
  return t.lastStringValue !== "";
};
function Je(t) {
  return je(t) || t === 95;
}
d.regexp_eatUnicodePropertyValue = function(t) {
  var e = 0;
  for (t.lastStringValue = ""; Oi(e = t.current()); )
    t.lastStringValue += rt(e), t.advance();
  return t.lastStringValue !== "";
};
function Oi(t) {
  return Je(t) || jt(t);
}
d.regexp_eatLoneUnicodePropertyNameOrValue = function(t) {
  return this.regexp_eatUnicodePropertyValue(t);
};
d.regexp_eatCharacterClass = function(t) {
  if (t.eat(
    91
    /* [ */
  )) {
    var e = t.eat(
      94
      /* ^ */
    ), i = this.regexp_classContents(t);
    return t.eat(
      93
      /* ] */
    ) || t.raise("Unterminated character class"), e && i === Y && t.raise("Negated character class may contain strings"), !0;
  }
  return !1;
};
d.regexp_classContents = function(t) {
  return t.current() === 93 ? at : t.switchV ? this.regexp_classSetExpression(t) : (this.regexp_nonEmptyClassRanges(t), at);
};
d.regexp_nonEmptyClassRanges = function(t) {
  for (; this.regexp_eatClassAtom(t); ) {
    var e = t.lastIntValue;
    if (t.eat(
      45
      /* - */
    ) && this.regexp_eatClassAtom(t)) {
      var i = t.lastIntValue;
      t.switchU && (e === -1 || i === -1) && t.raise("Invalid character class"), e !== -1 && i !== -1 && e > i && t.raise("Range out of order in character class");
    }
  }
};
d.regexp_eatClassAtom = function(t) {
  var e = t.pos;
  if (t.eat(
    92
    /* \ */
  )) {
    if (this.regexp_eatClassEscape(t))
      return !0;
    if (t.switchU) {
      var i = t.current();
      (i === 99 || qe(i)) && t.raise("Invalid class escape"), t.raise("Invalid escape");
    }
    t.pos = e;
  }
  var r = t.current();
  return r !== 93 ? (t.lastIntValue = r, t.advance(), !0) : !1;
};
d.regexp_eatClassEscape = function(t) {
  var e = t.pos;
  if (t.eat(
    98
    /* b */
  ))
    return t.lastIntValue = 8, !0;
  if (t.switchU && t.eat(
    45
    /* - */
  ))
    return t.lastIntValue = 45, !0;
  if (!t.switchU && t.eat(
    99
    /* c */
  )) {
    if (this.regexp_eatClassControlLetter(t))
      return !0;
    t.pos = e;
  }
  return this.regexp_eatCharacterClassEscape(t) || this.regexp_eatCharacterEscape(t);
};
d.regexp_classSetExpression = function(t) {
  var e = at, i;
  if (!this.regexp_eatClassSetRange(t)) if (i = this.regexp_eatClassSetOperand(t)) {
    i === Y && (e = Y);
    for (var r = t.pos; t.eatChars(
      [38, 38]
      /* && */
    ); ) {
      if (t.current() !== 38 && (i = this.regexp_eatClassSetOperand(t))) {
        i !== Y && (e = at);
        continue;
      }
      t.raise("Invalid character in character class");
    }
    if (r !== t.pos)
      return e;
    for (; t.eatChars(
      [45, 45]
      /* -- */
    ); )
      this.regexp_eatClassSetOperand(t) || t.raise("Invalid character in character class");
    if (r !== t.pos)
      return e;
  } else
    t.raise("Invalid character in character class");
  for (; ; )
    if (!this.regexp_eatClassSetRange(t)) {
      if (i = this.regexp_eatClassSetOperand(t), !i)
        return e;
      i === Y && (e = Y);
    }
};
d.regexp_eatClassSetRange = function(t) {
  var e = t.pos;
  if (this.regexp_eatClassSetCharacter(t)) {
    var i = t.lastIntValue;
    if (t.eat(
      45
      /* - */
    ) && this.regexp_eatClassSetCharacter(t)) {
      var r = t.lastIntValue;
      return i !== -1 && r !== -1 && i > r && t.raise("Range out of order in character class"), !0;
    }
    t.pos = e;
  }
  return !1;
};
d.regexp_eatClassSetOperand = function(t) {
  return this.regexp_eatClassSetCharacter(t) ? at : this.regexp_eatClassStringDisjunction(t) || this.regexp_eatNestedClass(t);
};
d.regexp_eatNestedClass = function(t) {
  var e = t.pos;
  if (t.eat(
    91
    /* [ */
  )) {
    var i = t.eat(
      94
      /* ^ */
    ), r = this.regexp_classContents(t);
    if (t.eat(
      93
      /* ] */
    ))
      return i && r === Y && t.raise("Negated character class may contain strings"), r;
    t.pos = e;
  }
  if (t.eat(
    92
    /* \ */
  )) {
    var o = this.regexp_eatCharacterClassEscape(t);
    if (o)
      return o;
    t.pos = e;
  }
  return null;
};
d.regexp_eatClassStringDisjunction = function(t) {
  var e = t.pos;
  if (t.eatChars(
    [92, 113]
    /* \q */
  )) {
    if (t.eat(
      123
      /* { */
    )) {
      var i = this.regexp_classStringDisjunctionContents(t);
      if (t.eat(
        125
        /* } */
      ))
        return i;
    } else
      t.raise("Invalid escape");
    t.pos = e;
  }
  return null;
};
d.regexp_classStringDisjunctionContents = function(t) {
  for (var e = this.regexp_classString(t); t.eat(
    124
    /* | */
  ); )
    this.regexp_classString(t) === Y && (e = Y);
  return e;
};
d.regexp_classString = function(t) {
  for (var e = 0; this.regexp_eatClassSetCharacter(t); )
    e++;
  return e === 1 ? at : Y;
};
d.regexp_eatClassSetCharacter = function(t) {
  var e = t.pos;
  if (t.eat(
    92
    /* \ */
  ))
    return this.regexp_eatCharacterEscape(t) || this.regexp_eatClassSetReservedPunctuator(t) ? !0 : t.eat(
      98
      /* b */
    ) ? (t.lastIntValue = 8, !0) : (t.pos = e, !1);
  var i = t.current();
  return i < 0 || i === t.lookahead() && Vi(i) || Ui(i) ? !1 : (t.advance(), t.lastIntValue = i, !0);
};
function Vi(t) {
  return t === 33 || t >= 35 && t <= 38 || t >= 42 && t <= 44 || t === 46 || t >= 58 && t <= 64 || t === 94 || t === 96 || t === 126;
}
function Ui(t) {
  return t === 40 || t === 41 || t === 45 || t === 47 || t >= 91 && t <= 93 || t >= 123 && t <= 125;
}
d.regexp_eatClassSetReservedPunctuator = function(t) {
  var e = t.current();
  return Bi(e) ? (t.lastIntValue = e, t.advance(), !0) : !1;
};
function Bi(t) {
  return t === 33 || t === 35 || t === 37 || t === 38 || t === 44 || t === 45 || t >= 58 && t <= 62 || t === 64 || t === 96 || t === 126;
}
d.regexp_eatClassControlLetter = function(t) {
  var e = t.current();
  return jt(e) || e === 95 ? (t.lastIntValue = e % 32, t.advance(), !0) : !1;
};
d.regexp_eatHexEscapeSequence = function(t) {
  var e = t.pos;
  if (t.eat(
    120
    /* x */
  )) {
    if (this.regexp_eatFixedHexDigits(t, 2))
      return !0;
    t.switchU && t.raise("Invalid escape"), t.pos = e;
  }
  return !1;
};
d.regexp_eatDecimalDigits = function(t) {
  var e = t.pos, i = 0;
  for (t.lastIntValue = 0; jt(i = t.current()); )
    t.lastIntValue = 10 * t.lastIntValue + (i - 48), t.advance();
  return t.pos !== e;
};
function jt(t) {
  return t >= 48 && t <= 57;
}
d.regexp_eatHexDigits = function(t) {
  var e = t.pos, i = 0;
  for (t.lastIntValue = 0; We(i = t.current()); )
    t.lastIntValue = 16 * t.lastIntValue + Ye(i), t.advance();
  return t.pos !== e;
};
function We(t) {
  return t >= 48 && t <= 57 || t >= 65 && t <= 70 || t >= 97 && t <= 102;
}
function Ye(t) {
  return t >= 65 && t <= 70 ? 10 + (t - 65) : t >= 97 && t <= 102 ? 10 + (t - 97) : t - 48;
}
d.regexp_eatLegacyOctalEscapeSequence = function(t) {
  if (this.regexp_eatOctalDigit(t)) {
    var e = t.lastIntValue;
    if (this.regexp_eatOctalDigit(t)) {
      var i = t.lastIntValue;
      e <= 3 && this.regexp_eatOctalDigit(t) ? t.lastIntValue = e * 64 + i * 8 + t.lastIntValue : t.lastIntValue = e * 8 + i;
    } else
      t.lastIntValue = e;
    return !0;
  }
  return !1;
};
d.regexp_eatOctalDigit = function(t) {
  var e = t.current();
  return qe(e) ? (t.lastIntValue = e - 48, t.advance(), !0) : (t.lastIntValue = 0, !1);
};
function qe(t) {
  return t >= 48 && t <= 55;
}
d.regexp_eatFixedHexDigits = function(t, e) {
  var i = t.pos;
  t.lastIntValue = 0;
  for (var r = 0; r < e; ++r) {
    var o = t.current();
    if (!We(o))
      return t.pos = i, !1;
    t.lastIntValue = 16 * t.lastIntValue + Ye(o), t.advance();
  }
  return !0;
};
var re = function(e) {
  this.type = e.type, this.value = e.value, this.start = e.start, this.end = e.end, e.options.locations && (this.loc = new Vt(e, e.startLoc, e.endLoc)), e.options.ranges && (this.range = [e.start, e.end]);
}, _ = L.prototype;
_.next = function(t) {
  !t && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword), this.options.onToken && this.options.onToken(new re(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
};
_.getToken = function() {
  return this.next(), new re(this);
};
typeof Symbol < "u" && (_[Symbol.iterator] = function() {
  var t = this;
  return {
    next: function() {
      var e = t.getToken();
      return {
        done: e.type === c.eof,
        value: e
      };
    }
  };
});
_.nextToken = function() {
  var t = this.curContext();
  if ((!t || !t.preserveSpace) && this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length)
    return this.finishToken(c.eof);
  if (t.override)
    return t.override(this);
  this.readToken(this.fullCharCodeAtPos());
};
_.readToken = function(t) {
  return st(t, this.options.ecmaVersion >= 6) || t === 92 ? this.readWord() : this.getTokenFromCode(t);
};
_.fullCharCodeAtPos = function() {
  var t = this.input.charCodeAt(this.pos);
  if (t <= 55295 || t >= 56320)
    return t;
  var e = this.input.charCodeAt(this.pos + 1);
  return e <= 56319 || e >= 57344 ? t : (t << 10) + e - 56613888;
};
_.skipBlockComment = function() {
  var t = this.options.onComment && this.curPosition(), e = this.pos, i = this.input.indexOf("*/", this.pos += 2);
  if (i === -1 && this.raise(this.pos - 2, "Unterminated comment"), this.pos = i + 2, this.options.locations)
    for (var r = void 0, o = e; (r = be(this.input, o, this.pos)) > -1; )
      ++this.curLine, o = this.lineStart = r;
  this.options.onComment && this.options.onComment(
    !0,
    this.input.slice(e + 2, i),
    e,
    this.pos,
    t,
    this.curPosition()
  );
};
_.skipLineComment = function(t) {
  for (var e = this.pos, i = this.options.onComment && this.curPosition(), r = this.input.charCodeAt(this.pos += t); this.pos < this.input.length && !dt(r); )
    r = this.input.charCodeAt(++this.pos);
  this.options.onComment && this.options.onComment(
    !1,
    this.input.slice(e + t, this.pos),
    e,
    this.pos,
    i,
    this.curPosition()
  );
};
_.skipSpace = function() {
  t: for (; this.pos < this.input.length; ) {
    var t = this.input.charCodeAt(this.pos);
    switch (t) {
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
            break t;
        }
        break;
      default:
        if (t > 8 && t < 14 || t >= 5760 && xe.test(String.fromCharCode(t)))
          ++this.pos;
        else
          break t;
    }
  }
};
_.finishToken = function(t, e) {
  this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
  var i = this.type;
  this.type = t, this.value = e, this.updateContext(i);
};
_.readToken_dot = function() {
  var t = this.input.charCodeAt(this.pos + 1);
  if (t >= 48 && t <= 57)
    return this.readNumber(!0);
  var e = this.input.charCodeAt(this.pos + 2);
  return this.options.ecmaVersion >= 6 && t === 46 && e === 46 ? (this.pos += 3, this.finishToken(c.ellipsis)) : (++this.pos, this.finishToken(c.dot));
};
_.readToken_slash = function() {
  var t = this.input.charCodeAt(this.pos + 1);
  return this.exprAllowed ? (++this.pos, this.readRegexp()) : t === 61 ? this.finishOp(c.assign, 2) : this.finishOp(c.slash, 1);
};
_.readToken_mult_modulo_exp = function(t) {
  var e = this.input.charCodeAt(this.pos + 1), i = 1, r = t === 42 ? c.star : c.modulo;
  return this.options.ecmaVersion >= 7 && t === 42 && e === 42 && (++i, r = c.starstar, e = this.input.charCodeAt(this.pos + 2)), e === 61 ? this.finishOp(c.assign, i + 1) : this.finishOp(r, i);
};
_.readToken_pipe_amp = function(t) {
  var e = this.input.charCodeAt(this.pos + 1);
  if (e === t) {
    if (this.options.ecmaVersion >= 12) {
      var i = this.input.charCodeAt(this.pos + 2);
      if (i === 61)
        return this.finishOp(c.assign, 3);
    }
    return this.finishOp(t === 124 ? c.logicalOR : c.logicalAND, 2);
  }
  return e === 61 ? this.finishOp(c.assign, 2) : this.finishOp(t === 124 ? c.bitwiseOR : c.bitwiseAND, 1);
};
_.readToken_caret = function() {
  var t = this.input.charCodeAt(this.pos + 1);
  return t === 61 ? this.finishOp(c.assign, 2) : this.finishOp(c.bitwiseXOR, 1);
};
_.readToken_plus_min = function(t) {
  var e = this.input.charCodeAt(this.pos + 1);
  return e === t ? e === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || q.test(this.input.slice(this.lastTokEnd, this.pos))) ? (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : this.finishOp(c.incDec, 2) : e === 61 ? this.finishOp(c.assign, 2) : this.finishOp(c.plusMin, 1);
};
_.readToken_lt_gt = function(t) {
  var e = this.input.charCodeAt(this.pos + 1), i = 1;
  return e === t ? (i = t === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2, this.input.charCodeAt(this.pos + i) === 61 ? this.finishOp(c.assign, i + 1) : this.finishOp(c.bitShift, i)) : e === 33 && t === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45 ? (this.skipLineComment(4), this.skipSpace(), this.nextToken()) : (e === 61 && (i = 2), this.finishOp(c.relational, i));
};
_.readToken_eq_excl = function(t) {
  var e = this.input.charCodeAt(this.pos + 1);
  return e === 61 ? this.finishOp(c.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) : t === 61 && e === 62 && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(c.arrow)) : this.finishOp(t === 61 ? c.eq : c.prefix, 1);
};
_.readToken_question = function() {
  var t = this.options.ecmaVersion;
  if (t >= 11) {
    var e = this.input.charCodeAt(this.pos + 1);
    if (e === 46) {
      var i = this.input.charCodeAt(this.pos + 2);
      if (i < 48 || i > 57)
        return this.finishOp(c.questionDot, 2);
    }
    if (e === 63) {
      if (t >= 12) {
        var r = this.input.charCodeAt(this.pos + 2);
        if (r === 61)
          return this.finishOp(c.assign, 3);
      }
      return this.finishOp(c.coalesce, 2);
    }
  }
  return this.finishOp(c.question, 1);
};
_.readToken_numberSign = function() {
  var t = this.options.ecmaVersion, e = 35;
  if (t >= 13 && (++this.pos, e = this.fullCharCodeAtPos(), st(e, !0) || e === 92))
    return this.finishToken(c.privateId, this.readWord1());
  this.raise(this.pos, "Unexpected character '" + rt(e) + "'");
};
_.getTokenFromCode = function(t) {
  switch (t) {
    // The interpretation of a dot depends on whether it is followed
    // by a digit or another two dots.
    case 46:
      return this.readToken_dot();
    // Punctuation tokens.
    case 40:
      return ++this.pos, this.finishToken(c.parenL);
    case 41:
      return ++this.pos, this.finishToken(c.parenR);
    case 59:
      return ++this.pos, this.finishToken(c.semi);
    case 44:
      return ++this.pos, this.finishToken(c.comma);
    case 91:
      return ++this.pos, this.finishToken(c.bracketL);
    case 93:
      return ++this.pos, this.finishToken(c.bracketR);
    case 123:
      return ++this.pos, this.finishToken(c.braceL);
    case 125:
      return ++this.pos, this.finishToken(c.braceR);
    case 58:
      return ++this.pos, this.finishToken(c.colon);
    case 96:
      if (this.options.ecmaVersion < 6)
        break;
      return ++this.pos, this.finishToken(c.backQuote);
    case 48:
      var e = this.input.charCodeAt(this.pos + 1);
      if (e === 120 || e === 88)
        return this.readRadixNumber(16);
      if (this.options.ecmaVersion >= 6) {
        if (e === 111 || e === 79)
          return this.readRadixNumber(8);
        if (e === 98 || e === 66)
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
      return this.readString(t);
    // Operators are parsed inline in tiny state machines. '=' (61) is
    // often referred to. `finishOp` simply skips the amount of
    // characters it is given as second argument, and returns a token
    // of the type given by its first argument.
    case 47:
      return this.readToken_slash();
    case 37:
    case 42:
      return this.readToken_mult_modulo_exp(t);
    case 124:
    case 38:
      return this.readToken_pipe_amp(t);
    case 94:
      return this.readToken_caret();
    case 43:
    case 45:
      return this.readToken_plus_min(t);
    case 60:
    case 62:
      return this.readToken_lt_gt(t);
    case 61:
    case 33:
      return this.readToken_eq_excl(t);
    case 63:
      return this.readToken_question();
    case 126:
      return this.finishOp(c.prefix, 1);
    case 35:
      return this.readToken_numberSign();
  }
  this.raise(this.pos, "Unexpected character '" + rt(t) + "'");
};
_.finishOp = function(t, e) {
  var i = this.input.slice(this.pos, this.pos + e);
  return this.pos += e, this.finishToken(t, i);
};
_.readRegexp = function() {
  for (var t, e, i = this.pos; ; ) {
    this.pos >= this.input.length && this.raise(i, "Unterminated regular expression");
    var r = this.input.charAt(this.pos);
    if (q.test(r) && this.raise(i, "Unterminated regular expression"), t)
      t = !1;
    else {
      if (r === "[")
        e = !0;
      else if (r === "]" && e)
        e = !1;
      else if (r === "/" && !e)
        break;
      t = r === "\\";
    }
    ++this.pos;
  }
  var o = this.input.slice(i, this.pos);
  ++this.pos;
  var s = this.pos, a = this.readWord1();
  this.containsEsc && this.unexpected(s);
  var h = this.regexpState || (this.regexpState = new et(this));
  h.reset(i, o, a), this.validateRegExpFlags(h), this.validateRegExpPattern(h);
  var u = null;
  try {
    u = new RegExp(o, a);
  } catch {
  }
  return this.finishToken(c.regexp, { pattern: o, flags: a, value: u });
};
_.readInt = function(t, e, i) {
  for (var r = this.options.ecmaVersion >= 12 && e === void 0, o = i && this.input.charCodeAt(this.pos) === 48, s = this.pos, a = 0, h = 0, u = 0, p = e ?? 1 / 0; u < p; ++u, ++this.pos) {
    var l = this.input.charCodeAt(this.pos), f = void 0;
    if (r && l === 95) {
      o && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"), h === 95 && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"), u === 0 && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"), h = l;
      continue;
    }
    if (l >= 97 ? f = l - 97 + 10 : l >= 65 ? f = l - 65 + 10 : l >= 48 && l <= 57 ? f = l - 48 : f = 1 / 0, f >= t)
      break;
    h = l, a = a * t + f;
  }
  return r && h === 95 && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"), this.pos === s || e != null && this.pos - s !== e ? null : a;
};
function Mi(t, e) {
  return e ? parseInt(t, 8) : parseFloat(t.replace(/_/g, ""));
}
function Qe(t) {
  return typeof BigInt != "function" ? null : BigInt(t.replace(/_/g, ""));
}
_.readRadixNumber = function(t) {
  var e = this.pos;
  this.pos += 2;
  var i = this.readInt(t);
  return i == null && this.raise(this.start + 2, "Expected number in radix " + t), this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110 ? (i = Qe(this.input.slice(e, this.pos)), ++this.pos) : st(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(c.num, i);
};
_.readNumber = function(t) {
  var e = this.pos;
  !t && this.readInt(10, void 0, !0) === null && this.raise(e, "Invalid number");
  var i = this.pos - e >= 2 && this.input.charCodeAt(e) === 48;
  i && this.strict && this.raise(e, "Invalid number");
  var r = this.input.charCodeAt(this.pos);
  if (!i && !t && this.options.ecmaVersion >= 11 && r === 110) {
    var o = Qe(this.input.slice(e, this.pos));
    return ++this.pos, st(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(c.num, o);
  }
  i && /[89]/.test(this.input.slice(e, this.pos)) && (i = !1), r === 46 && !i && (++this.pos, this.readInt(10), r = this.input.charCodeAt(this.pos)), (r === 69 || r === 101) && !i && (r = this.input.charCodeAt(++this.pos), (r === 43 || r === 45) && ++this.pos, this.readInt(10) === null && this.raise(e, "Invalid number")), st(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");
  var s = Mi(this.input.slice(e, this.pos), i);
  return this.finishToken(c.num, s);
};
_.readCodePoint = function() {
  var t = this.input.charCodeAt(this.pos), e;
  if (t === 123) {
    this.options.ecmaVersion < 6 && this.unexpected();
    var i = ++this.pos;
    e = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, e > 1114111 && this.invalidStringToken(i, "Code point out of bounds");
  } else
    e = this.readHexChar(4);
  return e;
};
_.readString = function(t) {
  for (var e = "", i = ++this.pos; ; ) {
    this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
    var r = this.input.charCodeAt(this.pos);
    if (r === t)
      break;
    r === 92 ? (e += this.input.slice(i, this.pos), e += this.readEscapedChar(!1), i = this.pos) : r === 8232 || r === 8233 ? (this.options.ecmaVersion < 10 && this.raise(this.start, "Unterminated string constant"), ++this.pos, this.options.locations && (this.curLine++, this.lineStart = this.pos)) : (dt(r) && this.raise(this.start, "Unterminated string constant"), ++this.pos);
  }
  return e += this.input.slice(i, this.pos++), this.finishToken(c.string, e);
};
var Ke = {};
_.tryReadTemplateToken = function() {
  this.inTemplateElement = !0;
  try {
    this.readTmplToken();
  } catch (t) {
    if (t === Ke)
      this.readInvalidTemplateToken();
    else
      throw t;
  }
  this.inTemplateElement = !1;
};
_.invalidStringToken = function(t, e) {
  if (this.inTemplateElement && this.options.ecmaVersion >= 9)
    throw Ke;
  this.raise(t, e);
};
_.readTmplToken = function() {
  for (var t = "", e = this.pos; ; ) {
    this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
    var i = this.input.charCodeAt(this.pos);
    if (i === 96 || i === 36 && this.input.charCodeAt(this.pos + 1) === 123)
      return this.pos === this.start && (this.type === c.template || this.type === c.invalidTemplate) ? i === 36 ? (this.pos += 2, this.finishToken(c.dollarBraceL)) : (++this.pos, this.finishToken(c.backQuote)) : (t += this.input.slice(e, this.pos), this.finishToken(c.template, t));
    if (i === 92)
      t += this.input.slice(e, this.pos), t += this.readEscapedChar(!0), e = this.pos;
    else if (dt(i)) {
      switch (t += this.input.slice(e, this.pos), ++this.pos, i) {
        case 13:
          this.input.charCodeAt(this.pos) === 10 && ++this.pos;
        case 10:
          t += `
`;
          break;
        default:
          t += String.fromCharCode(i);
          break;
      }
      this.options.locations && (++this.curLine, this.lineStart = this.pos), e = this.pos;
    } else
      ++this.pos;
  }
};
_.readInvalidTemplateToken = function() {
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
        return this.finishToken(c.invalidTemplate, this.input.slice(this.start, this.pos));
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
_.readEscapedChar = function(t) {
  var e = this.input.charCodeAt(++this.pos);
  switch (++this.pos, e) {
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
      return rt(this.readCodePoint());
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
      ), t) {
        var i = this.pos - 1;
        this.invalidStringToken(
          i,
          "Invalid escape sequence in template string"
        );
      }
    default:
      if (e >= 48 && e <= 55) {
        var r = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], o = parseInt(r, 8);
        return o > 255 && (r = r.slice(0, -1), o = parseInt(r, 8)), this.pos += r.length - 1, e = this.input.charCodeAt(this.pos), (r !== "0" || e === 56 || e === 57) && (this.strict || t) && this.invalidStringToken(
          this.pos - 1 - r.length,
          t ? "Octal literal in template string" : "Octal literal in strict mode"
        ), String.fromCharCode(o);
      }
      return dt(e) ? (this.options.locations && (this.lineStart = this.pos, ++this.curLine), "") : String.fromCharCode(e);
  }
};
_.readHexChar = function(t) {
  var e = this.pos, i = this.readInt(16, t);
  return i === null && this.invalidStringToken(e, "Bad character escape sequence"), i;
};
_.readWord1 = function() {
  this.containsEsc = !1;
  for (var t = "", e = !0, i = this.pos, r = this.options.ecmaVersion >= 6; this.pos < this.input.length; ) {
    var o = this.fullCharCodeAtPos();
    if (mt(o, r))
      this.pos += o <= 65535 ? 1 : 2;
    else if (o === 92) {
      this.containsEsc = !0, t += this.input.slice(i, this.pos);
      var s = this.pos;
      this.input.charCodeAt(++this.pos) !== 117 && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"), ++this.pos;
      var a = this.readCodePoint();
      (e ? st : mt)(a, r) || this.invalidStringToken(s, "Invalid Unicode escape"), t += rt(a), i = this.pos;
    } else
      break;
    e = !1;
  }
  return t + this.input.slice(i, this.pos);
};
_.readWord = function() {
  var t = this.readWord1(), e = c.name;
  return this.keywords.test(t) && (e = $t[t]), this.finishToken(e, t);
};
var Hi = "8.14.1";
L.acorn = {
  Parser: L,
  version: Hi,
  defaultOptions: qt,
  Position: It,
  SourceLocation: Vt,
  getLineInfo: Ee,
  Node: Ht,
  TokenType: I,
  tokTypes: c,
  keywordTypes: $t,
  TokContext: $,
  tokContexts: w,
  isIdentifierChar: mt,
  isIdentifierStart: st,
  Token: re,
  isNewLine: dt,
  lineBreak: q,
  lineBreakG: hi,
  nonASCIIwhitespace: xe
};
function ji(t, e) {
  return L.parse(t, e);
}
j("super");
j("supercall");
j("noctor");
j("clsctor");
const _t = j("newtarget");
j("private");
const lt = j("noinit"), zt = j("deadzone"), vt = j("import"), St = j("exports");
class Rt {
  constructor(e, i) {
    this.kind = e, this.value = i;
  }
  get() {
    return this.value;
  }
  set(e) {
    if (this.kind === "const")
      throw new TypeError("Assignment to constant variable");
    return this.value = e;
  }
}
class le {
  constructor(e, i) {
    this.object = e, this.property = i;
  }
  get() {
    return this.object[this.property];
  }
  set(e) {
    return this.object[this.property] = e, !0;
  }
  del() {
    return delete this.object[this.property];
  }
}
class R {
  /**
   * Create a simulated scope
   * @param parent the parent scope along the scope chain (default: null)
   * @param isolated true for function scope or false for block scope (default: false)
   */
  constructor(e = null, i = !1) {
    this.context = At(null), this.withContext = At(null), this.parent = e, this.isolated = i;
  }
  /**
   * Get global scope
   */
  global() {
    let e = this;
    for (; e.parent; )
      e = e.parent;
    return e;
  }
  /**
   * Find a variable along scope chain
   * @param name variable identifier name
   */
  find(e) {
    if (this.context[e])
      return this.context[e];
    if (e in this.withContext)
      return new le(this.withContext, e);
    if (this.parent)
      return this.parent.find(e);
    {
      const i = this.global().find("window").get();
      return e in i ? new le(i, e) : null;
    }
  }
  /**
   * Declare a var variable
   * @param name variable identifier name
   * @param value variable value
   */
  var(e, i) {
    let r = this;
    for (; r.parent && !r.isolated; )
      r = r.parent;
    const o = r.context[e];
    if (!o)
      r.context[e] = new Rt("var", i === lt ? void 0 : i);
    else if (o.kind === "var")
      i !== lt && o.set(i);
    else
      throw new SyntaxError(`Identifier '${e}' has already been declared`);
    if (!r.parent) {
      const s = r.find("window").get();
      i !== lt && ze(s, e, { value: i, writable: !0, enumerable: !0 });
    }
  }
  /**
   * Declare a let variable
   * @param name variable identifier name
   * @param value variable value
   */
  let(e, i) {
    const r = this.context[e];
    if (!r || r.get() === zt)
      this.context[e] = new Rt("let", i);
    else
      throw new SyntaxError(`Identifier '${e}' has already been declared`);
  }
  /**
   * Declare a const variable
   * @param name variable identifier name
   * @param value variable value
   */
  const(e, i) {
    const r = this.context[e];
    if (!r || r.get() === zt)
      this.context[e] = new Rt("const", i);
    else
      throw new SyntaxError(`Identifier '${e}' has already been declared`);
  }
  /**
   * Declare a function
   * @param name function name
   * @param value function
   */
  func(e, i) {
    const r = this.context[e];
    if (!r || r.kind === "var")
      this.context[e] = new Rt("var", i);
    else
      throw new SyntaxError(`Identifier '${e}' has already been declared`);
  }
  /**
   * Memoize the object for with-statement context
   * @param value object
   */
  with(e) {
    Object.keys(e) && (this.withContext = e);
  }
}
const Gi = "0.6.8", Ji = {
  version: Gi
};
var n = /* @__PURE__ */ ((t) => (t[t.PUSH = 0] = "PUSH", t[t.POP = 1] = "POP", t[t.DUP = 2] = "DUP", t[t.SWAP = 3] = "SWAP", t[t.ROT3 = 4] = "ROT3", t[t.ROT4 = 5] = "ROT4", t[t.LOAD_VAR = 6] = "LOAD_VAR", t[t.STORE_VAR = 7] = "STORE_VAR", t[t.ASSIGN_VAR = 8] = "ASSIGN_VAR", t[t.DECLARE_VAR = 9] = "DECLARE_VAR", t[t.DECLARE_CONST = 10] = "DECLARE_CONST", t[t.DECLARE_LET = 11] = "DECLARE_LET", t[t.LOAD_UNDEFINED = 12] = "LOAD_UNDEFINED", t[t.LOAD_NULL = 13] = "LOAD_NULL", t[t.LOAD_TRUE = 14] = "LOAD_TRUE", t[t.LOAD_FALSE = 15] = "LOAD_FALSE", t[t.LOAD_THIS = 16] = "LOAD_THIS", t[t.LOAD_NOINIT = 17] = "LOAD_NOINIT", t[t.ADD = 18] = "ADD", t[t.SUB = 19] = "SUB", t[t.MUL = 20] = "MUL", t[t.DIV = 21] = "DIV", t[t.MOD = 22] = "MOD", t[t.EXP = 23] = "EXP", t[t.EQ = 24] = "EQ", t[t.NEQ = 25] = "NEQ", t[t.SEQ = 26] = "SEQ", t[t.SNEQ = 27] = "SNEQ", t[t.LT = 28] = "LT", t[t.LTE = 29] = "LTE", t[t.GT = 30] = "GT", t[t.GTE = 31] = "GTE", t[t.LOGICAL_AND = 32] = "LOGICAL_AND", t[t.LOGICAL_OR = 33] = "LOGICAL_OR", t[t.NULLISH_COALESCING = 34] = "NULLISH_COALESCING", t[t.BITWISE_AND = 35] = "BITWISE_AND", t[t.BITWISE_OR = 36] = "BITWISE_OR", t[t.BITWISE_XOR = 37] = "BITWISE_XOR", t[t.LEFT_SHIFT = 38] = "LEFT_SHIFT", t[t.RIGHT_SHIFT = 39] = "RIGHT_SHIFT", t[t.UNSIGNED_RIGHT_SHIFT = 40] = "UNSIGNED_RIGHT_SHIFT", t[t.IN = 41] = "IN", t[t.INSTANCEOF = 42] = "INSTANCEOF", t[t.NOT = 43] = "NOT", t[t.BITWISE_NOT = 44] = "BITWISE_NOT", t[t.TYPEOF = 45] = "TYPEOF", t[t.TYPEOF_VAR = 46] = "TYPEOF_VAR", t[t.VOID = 47] = "VOID", t[t.DELETE = 48] = "DELETE", t[t.DELETE_MEMBER = 49] = "DELETE_MEMBER", t[t.PLUS = 50] = "PLUS", t[t.MINUS = 51] = "MINUS", t[t.INC = 52] = "INC", t[t.DEC = 53] = "DEC", t[t.GET_MEMBER = 54] = "GET_MEMBER", t[t.SET_MEMBER = 55] = "SET_MEMBER", t[t.CALL = 56] = "CALL", t[t.CALL_METHOD = 57] = "CALL_METHOD", t[t.CALL_WITH_SPREAD = 58] = "CALL_WITH_SPREAD", t[t.NEW = 59] = "NEW", t[t.NEW_WITH_SPREAD = 60] = "NEW_WITH_SPREAD", t[t.RETURN = 61] = "RETURN", t[t.YIELD = 62] = "YIELD", t[t.AWAIT = 63] = "AWAIT", t[t.NEW_OBJECT = 64] = "NEW_OBJECT", t[t.NEW_ARRAY = 65] = "NEW_ARRAY", t[t.SPREAD = 66] = "SPREAD", t[t.ARRAY_PUSH = 67] = "ARRAY_PUSH", t[t.ARRAY_CONCAT = 68] = "ARRAY_CONCAT", t[t.OBJECT_ASSIGN = 69] = "OBJECT_ASSIGN", t[t.OBJECT_SET_PROP = 70] = "OBJECT_SET_PROP", t[t.OBJECT_DEFINE_GETTER = 71] = "OBJECT_DEFINE_GETTER", t[t.OBJECT_DEFINE_SETTER = 72] = "OBJECT_DEFINE_SETTER", t[t.OBJECT_REST = 73] = "OBJECT_REST", t[t.ARRAY_REST = 74] = "ARRAY_REST", t[t.JUMP = 75] = "JUMP", t[t.JUMP_IF_FALSE = 76] = "JUMP_IF_FALSE", t[t.JUMP_IF_TRUE = 77] = "JUMP_IF_TRUE", t[t.PUSH_SCOPE = 78] = "PUSH_SCOPE", t[t.POP_SCOPE = 79] = "POP_SCOPE", t[t.CREATE_FUNCTION = 80] = "CREATE_FUNCTION", t[t.CREATE_ARROW_FUNCTION = 81] = "CREATE_ARROW_FUNCTION", t[t.CREATE_CLASS = 82] = "CREATE_CLASS", t[t.SUPER_CALL = 83] = "SUPER_CALL", t[t.EXPORT_ALL = 84] = "EXPORT_ALL", t[t.EXPORT_NAMED = 85] = "EXPORT_NAMED", t[t.IMPORT_BINDINGS = 86] = "IMPORT_BINDINGS", t[t.THROW = 87] = "THROW", t[t.TRY_START = 88] = "TRY_START", t[t.TRY_END = 89] = "TRY_END", t[t.CATCH_START = 90] = "CATCH_START", t[t.CATCH_END = 91] = "CATCH_END", t[t.FINALLY_START = 92] = "FINALLY_START", t[t.FINALLY_END = 93] = "FINALLY_END", t[t.BREAK = 94] = "BREAK", t[t.CONTINUE = 95] = "CONTINUE", t[t.GET_KEYS = 96] = "GET_KEYS", t[t.GET_ITERATOR = 97] = "GET_ITERATOR", t[t.ITERATOR_NEXT = 98] = "ITERATOR_NEXT", t[t.ITERATOR_DONE = 99] = "ITERATOR_DONE", t[t.NOP = 100] = "NOP", t[t.HALT = 101] = "HALT", t))(n || {});
function Wi(t, e, i, r) {
  return { opcode: t, operand: e, line: i, column: r };
}
function Yi() {
  return {
    instructions: [],
    constants: [],
    sourceMap: /* @__PURE__ */ new Map()
  };
}
function qi(t, e) {
  const i = t.instructions.length;
  return t.instructions.push(e), e.line !== void 0 && e.column !== void 0 && t.sourceMap.set(i, {
    line: e.line,
    column: e.column
  }), i;
}
function g(t, e) {
  const i = t.constants.indexOf(e);
  return i !== -1 ? i : (t.constants.push(e), t.constants.length - 1);
}
class P {
  constructor() {
    this.loopStack = [], this.labelMap = /* @__PURE__ */ new Map(), this.chunk = Yi();
  }
  // Helper to get property name, handling private identifiers
  getPropertyName(e) {
    return e.type === "PrivateIdentifier" ? `__private_${e.name}` : e.name || e.value;
  }
  compile(e, i) {
    return this.currentScope = i, this.hoist(e, i), this.compileNode(e, i), this.emit(n.HALT), this.chunk;
  }
  /**
   * Hoist function declarations and var declarations to the top of their scope
   */
  hoist(e, i) {
    (e.type === "Program" || e.type === "BlockStatement") && this.hoistInBlock(e.body, i);
  }
  hoistInBlock(e, i) {
    for (const s of e)
      if (s.type === "FunctionDeclaration" && s.id)
        try {
          i.let(s.id.name, lt);
        } catch {
        }
    const r = [], o = [];
    for (const s of e)
      s.type === "FunctionDeclaration" ? r.push(s) : o.push(s);
    e.length = 0, e.push(...r, ...o);
    for (const s of e)
      this.hoistVarsInStatement(s, i);
    for (const s of e)
      if (s.type === "VariableDeclaration" && (s.kind === "let" || s.kind === "const")) {
        for (const a of s.declarations)
          if (a.id.type === "Identifier")
            try {
              i.let(a.id.name, zt);
            } catch {
            }
      }
  }
  hoistPattern(e, i) {
    if (e.type === "Identifier")
      i.var(e.name, lt);
    else if (e.type === "ArrayPattern")
      for (const r of e.elements)
        r && (r.type === "RestElement" ? this.hoistPattern(r.argument, i) : this.hoistPattern(r, i));
    else if (e.type === "ObjectPattern")
      for (const r of e.properties)
        r.type === "RestElement" ? this.hoistPattern(r.argument, i) : this.hoistPattern(r.value, i);
    else e.type === "AssignmentPattern" && this.hoistPattern(e.left, i);
  }
  hoistVarsInStatement(e, i) {
    switch (e.type) {
      case "VariableDeclaration":
        if (e.kind === "var")
          for (const r of e.declarations)
            this.hoistPattern(r.id, i);
        break;
      case "ForStatement":
        e.init && e.init.type === "VariableDeclaration" && this.hoistVarsInStatement(e.init, i), this.hoistVarsInStatement(e.body, i);
        break;
      case "ForInStatement":
      case "ForOfStatement":
        e.left && e.left.type === "VariableDeclaration" && this.hoistVarsInStatement(e.left, i), this.hoistVarsInStatement(e.body, i);
        break;
      case "WhileStatement":
      case "DoWhileStatement":
        this.hoistVarsInStatement(e.body, i);
        break;
      case "IfStatement":
        this.hoistVarsInStatement(e.consequent, i), e.alternate && this.hoistVarsInStatement(e.alternate, i);
        break;
      case "BlockStatement":
        for (const r of e.body)
          this.hoistVarsInStatement(r, i);
        break;
      case "SwitchStatement":
        for (const r of e.cases)
          for (const o of r.consequent)
            this.hoistVarsInStatement(o, i);
        break;
      case "TryStatement":
        for (const r of e.block.body)
          this.hoistVarsInStatement(r, i);
        if (e.handler, e.finalizer)
          for (const r of e.finalizer.body)
            this.hoistVarsInStatement(r, i);
        break;
      case "LabeledStatement":
        this.hoistVarsInStatement(e.body, i);
        break;
    }
  }
  compileNode(e, i) {
    this.currentScope = i;
    const r = this[`compile${e.type}`];
    if (!r)
      throw new Error(`Unknown node type: ${e.type}`);
    r.call(this, e, i);
  }
  // ===== Program =====
  compileProgram(e, i) {
    for (const r of e.body)
      this.compileNode(r, i);
  }
  // ===== Literals =====
  compileLiteral(e, i) {
    if (e.regex) {
      const r = new RegExp(e.regex.pattern, e.regex.flags), o = g(this.chunk, r);
      this.emit(n.PUSH, o);
    } else {
      const r = g(this.chunk, e.value);
      this.emit(n.PUSH, r);
    }
  }
  compileTemplateLiteral(e, i) {
    const { quasis: r, expressions: o } = e;
    for (let s = 0; s < r.length; s++) {
      const a = r[s].value.cooked !== void 0 ? r[s].value.cooked : "", h = g(this.chunk, a);
      this.emit(n.PUSH, h), s < o.length && (this.compileNode(o[s], i), this.emit(n.ADD));
    }
    for (let s = 1; s < r.length + o.length - 1; s++)
      this.emit(n.ADD);
  }
  compileIdentifier(e, i) {
    this.emit(n.LOAD_VAR, e.name);
  }
  compilePrivateIdentifier(e, i) {
    const r = `__private_${e.name}`, o = g(this.chunk, r);
    this.emit(n.PUSH, o);
  }
  compileThisExpression(e, i) {
    this.emit(n.LOAD_THIS);
  }
  compileSuper(e, i) {
    this.emit(n.LOAD_VAR, "super");
  }
  // ===== Binary Operations =====
  compileBinaryExpression(e, i) {
    this.compileNode(e.left, i), this.compileNode(e.right, i);
    const o = {
      "+": n.ADD,
      "-": n.SUB,
      "*": n.MUL,
      "/": n.DIV,
      "%": n.MOD,
      "**": n.EXP,
      "==": n.EQ,
      "!=": n.NEQ,
      "===": n.SEQ,
      "!==": n.SNEQ,
      "<": n.LT,
      "<=": n.LTE,
      ">": n.GT,
      ">=": n.GTE,
      "&": n.BITWISE_AND,
      "|": n.BITWISE_OR,
      "^": n.BITWISE_XOR,
      "<<": n.LEFT_SHIFT,
      ">>": n.RIGHT_SHIFT,
      ">>>": n.UNSIGNED_RIGHT_SHIFT,
      in: n.IN,
      instanceof: n.INSTANCEOF
    }[e.operator];
    if (o === void 0)
      throw new Error(`Unknown binary operator: ${e.operator}`);
    this.emit(o);
  }
  compileLogicalExpression(e, i) {
    if (this.compileNode(e.left, i), e.operator === "&&") {
      this.emit(n.DUP);
      const r = this.emit(n.JUMP_IF_FALSE, 0);
      this.emit(n.POP), this.compileNode(e.right, i), this.patchJump(r);
    } else if (e.operator === "||") {
      this.emit(n.DUP);
      const r = this.emit(n.JUMP_IF_TRUE, 0);
      this.emit(n.POP), this.compileNode(e.right, i), this.patchJump(r);
    } else if (e.operator === "??") {
      this.emit(n.DUP), this.emit(n.LOAD_NULL), this.emit(n.SEQ);
      const r = this.emit(n.JUMP_IF_TRUE, 0);
      this.emit(n.DUP), this.emit(n.LOAD_UNDEFINED), this.emit(n.SEQ);
      const o = this.emit(n.JUMP_IF_TRUE, 0), s = this.emit(n.JUMP, 0);
      this.patchJump(r), this.patchJump(o), this.emit(n.POP), this.compileNode(e.right, i), this.patchJump(s);
    }
  }
  compileUnaryExpression(e, i) {
    if (e.operator === "typeof" && e.argument.type === "Identifier") {
      this.emit(n.TYPEOF_VAR, e.argument.name);
      return;
    }
    if (e.operator === "delete" && e.argument.type === "MemberExpression") {
      if (this.compileNode(e.argument.object, i), e.argument.computed)
        this.compileNode(e.argument.property, i);
      else {
        const s = this.getPropertyName(e.argument.property), a = g(this.chunk, s);
        this.emit(n.PUSH, a);
      }
      this.emit(n.DELETE_MEMBER);
      return;
    }
    this.compileNode(e.argument, i);
    const o = {
      "!": n.NOT,
      "~": n.BITWISE_NOT,
      typeof: n.TYPEOF,
      void: n.VOID,
      delete: n.DELETE,
      "+": n.PLUS,
      "-": n.MINUS
    }[e.operator];
    if (o === void 0)
      throw new Error(`Unknown unary operator: ${e.operator}`);
    this.emit(o);
  }
  compileUpdateExpression(e, i) {
    if (e.argument.type === "Identifier")
      this.emit(n.LOAD_VAR, e.argument.name), e.prefix || this.emit(n.DUP), this.emit(e.operator === "++" ? n.INC : n.DEC), e.prefix && this.emit(n.DUP), this.emit(n.STORE_VAR, e.argument.name);
    else if (e.argument.type === "MemberExpression") {
      if (this.compileNode(e.argument.object, i), e.argument.computed)
        this.compileNode(e.argument.property, i);
      else {
        const r = this.getPropertyName(e.argument.property), o = g(this.chunk, r);
        this.emit(n.PUSH, o);
      }
      if (this.emit(n.GET_MEMBER), e.prefix ? (this.emit(e.operator === "++" ? n.INC : n.DEC), this.emit(n.DUP)) : (this.emit(n.DUP), this.emit(e.operator === "++" ? n.INC : n.DEC)), this.emit(n.SWAP), this.compileNode(e.argument.object, i), e.argument.computed)
        this.compileNode(e.argument.property, i);
      else {
        const r = this.getPropertyName(e.argument.property), o = g(this.chunk, r);
        this.emit(n.PUSH, o);
      }
      this.emit(n.ROT4), this.emit(n.SET_MEMBER), this.emit(n.POP);
    }
  }
  // ===== Assignment =====
  compileAssignmentExpression(e, i) {
    if (e.operator === "=")
      if (e.left.type === "MemberExpression") {
        if (this.compileNode(e.left.object, i), e.left.computed)
          this.compileNode(e.left.property, i);
        else {
          const r = this.getPropertyName(e.left.property), o = g(this.chunk, r);
          this.emit(n.PUSH, o);
        }
        this.compileNode(e.right, i), this.emit(n.SET_MEMBER);
      } else
        this.compileNode(e.right, i), this.compileAssignmentTarget(e.left, i);
    else if (e.operator === "??=" || e.operator === "||=" || e.operator === "&&=") {
      if (e.left.type === "Identifier") {
        if (this.emit(n.LOAD_VAR, e.left.name), e.operator === "??=") {
          this.emit(n.DUP), this.emit(n.LOAD_NULL), this.emit(n.SEQ);
          const r = this.emit(n.JUMP_IF_TRUE, 0);
          this.emit(n.DUP), this.emit(n.LOAD_UNDEFINED), this.emit(n.SEQ);
          const o = this.emit(n.JUMP_IF_TRUE, 0), s = this.emit(n.JUMP, 0);
          this.patchJump(r), this.patchJump(o), this.emit(n.POP), this.compileNode(e.right, i), this.emit(n.DUP), this.emit(n.STORE_VAR, e.left.name), this.patchJump(s);
        } else if (e.operator === "||=") {
          this.emit(n.DUP);
          const r = this.emit(n.JUMP_IF_TRUE, 0);
          this.emit(n.POP), this.compileNode(e.right, i), this.emit(n.DUP), this.emit(n.STORE_VAR, e.left.name), this.patchJump(r);
        } else if (e.operator === "&&=") {
          this.emit(n.DUP);
          const r = this.emit(n.JUMP_IF_FALSE, 0);
          this.emit(n.POP), this.compileNode(e.right, i), this.emit(n.DUP), this.emit(n.STORE_VAR, e.left.name), this.patchJump(r);
        }
      } else if (e.left.type === "MemberExpression") {
        if (this.compileNode(e.left.object, i), e.left.computed)
          this.compileNode(e.left.property, i);
        else {
          const r = this.getPropertyName(e.left.property), o = g(this.chunk, r);
          this.emit(n.PUSH, o);
        }
        if (this.emit(n.GET_MEMBER), e.operator === "??=") {
          this.emit(n.DUP), this.emit(n.LOAD_NULL), this.emit(n.SEQ);
          const r = this.emit(n.JUMP_IF_TRUE, 0);
          this.emit(n.DUP), this.emit(n.LOAD_UNDEFINED), this.emit(n.SEQ);
          const o = this.emit(n.JUMP_IF_TRUE, 0), s = this.emit(n.JUMP, 0);
          if (this.patchJump(r), this.patchJump(o), this.emit(n.POP), this.compileNode(e.right, i), this.compileNode(e.left.object, i), e.left.computed)
            this.compileNode(e.left.property, i);
          else {
            const a = this.getPropertyName(e.left.property), h = g(this.chunk, a);
            this.emit(n.PUSH, h);
          }
          this.emit(n.ROT3), this.emit(n.SET_MEMBER), this.patchJump(s);
        } else if (e.operator === "||=") {
          this.emit(n.DUP);
          const r = this.emit(n.JUMP_IF_TRUE, 0);
          if (this.emit(n.POP), this.compileNode(e.right, i), this.compileNode(e.left.object, i), e.left.computed)
            this.compileNode(e.left.property, i);
          else {
            const o = this.getPropertyName(e.left.property), s = g(this.chunk, o);
            this.emit(n.PUSH, s);
          }
          this.emit(n.ROT3), this.emit(n.SET_MEMBER), this.patchJump(r);
        } else if (e.operator === "&&=") {
          this.emit(n.DUP);
          const r = this.emit(n.JUMP_IF_FALSE, 0);
          if (this.emit(n.POP), this.compileNode(e.right, i), this.compileNode(e.left.object, i), e.left.computed)
            this.compileNode(e.left.property, i);
          else {
            const o = this.getPropertyName(e.left.property), s = g(this.chunk, o);
            this.emit(n.PUSH, s);
          }
          this.emit(n.ROT3), this.emit(n.SET_MEMBER), this.patchJump(r);
        }
      }
    } else {
      const r = e.operator.slice(0, -1);
      if (e.left.type === "Identifier")
        this.emit(n.LOAD_VAR, e.left.name), this.compileNode(e.right, i), this.emitBinaryOp(r), this.emit(n.DUP), this.emit(n.STORE_VAR, e.left.name);
      else if (e.left.type === "MemberExpression") {
        if (this.compileNode(e.left.object, i), e.left.computed)
          this.compileNode(e.left.property, i);
        else {
          const o = this.getPropertyName(e.left.property), s = g(this.chunk, o);
          this.emit(n.PUSH, s);
        }
        if (this.emit(n.GET_MEMBER), this.compileNode(e.right, i), this.emitBinaryOp(r), this.compileNode(e.left.object, i), e.left.computed)
          this.compileNode(e.left.property, i);
        else {
          const o = this.getPropertyName(e.left.property), s = g(this.chunk, o);
          this.emit(n.PUSH, s);
        }
        this.emit(n.ROT3), this.emit(n.SET_MEMBER);
      }
    }
  }
  compileAssignmentTarget(e, i) {
    if (e.type === "Identifier")
      this.emit(n.DUP), this.emit(n.STORE_VAR, e.name);
    else if (e.type === "MemberExpression") {
      if (this.compileNode(e.object, i), e.computed)
        this.compileNode(e.property, i);
      else {
        const r = this.getPropertyName(e.property), o = g(this.chunk, r);
        this.emit(n.PUSH, o);
      }
      this.emit(n.SET_MEMBER);
    } else (e.type === "ArrayPattern" || e.type === "ObjectPattern") && this.compilePattern(e, i);
  }
  emitBinaryOp(e) {
    const r = {
      "+": n.ADD,
      "-": n.SUB,
      "*": n.MUL,
      "/": n.DIV,
      "%": n.MOD,
      "**": n.EXP,
      "&": n.BITWISE_AND,
      "|": n.BITWISE_OR,
      "^": n.BITWISE_XOR,
      "<<": n.LEFT_SHIFT,
      ">>": n.RIGHT_SHIFT,
      ">>>": n.UNSIGNED_RIGHT_SHIFT
    }[e];
    if (r === void 0)
      throw new Error(`Unknown binary operator in compound assignment: ${e}`);
    this.emit(r);
  }
  // ===== Member & Call Expressions =====
  compileMemberExpression(e, i) {
    if (this.compileNode(e.object, i), e.optional) {
      this.emit(n.DUP), this.emit(n.LOAD_NULL), this.emit(n.EQ);
      const r = this.emit(n.JUMP_IF_TRUE, 0);
      if (e.computed)
        this.compileNode(e.property, i);
      else if (e.property.type === "PrivateIdentifier") {
        const s = `__private_${e.property.name}`, a = g(this.chunk, s);
        this.emit(n.PUSH, a);
      } else {
        const s = g(this.chunk, e.property.name);
        this.emit(n.PUSH, s);
      }
      this.emit(n.GET_MEMBER);
      const o = this.emit(n.JUMP, 0);
      this.patchJump(r), this.emit(n.POP), this.emit(n.LOAD_UNDEFINED), this.patchJump(o);
    } else {
      if (e.computed)
        this.compileNode(e.property, i);
      else if (e.property.type === "PrivateIdentifier") {
        const r = `__private_${e.property.name}`, o = g(this.chunk, r);
        this.emit(n.PUSH, o);
      } else {
        const r = g(this.chunk, e.property.name);
        this.emit(n.PUSH, r);
      }
      this.emit(n.GET_MEMBER);
    }
  }
  compileCallExpression(e, i) {
    const r = e.arguments.some((o) => o && o.type === "SpreadElement");
    if (e.callee.type === "Super") {
      for (const o of e.arguments)
        this.compileNode(o, i);
      this.emit(n.SUPER_CALL, e.arguments.length);
    } else if (e.callee.type === "MemberExpression")
      if (r) {
        this.emit(n.NEW_ARRAY, 0);
        for (const o of e.arguments)
          o.type === "SpreadElement" ? (this.compileNode(o.argument, i), this.emit(n.ARRAY_CONCAT)) : (this.compileNode(o, i), this.emit(n.ARRAY_PUSH));
        if (this.compileNode(e.callee.object, i), this.emit(n.DUP), e.callee.computed)
          this.compileNode(e.callee.property, i);
        else if (e.callee.property.type === "PrivateIdentifier") {
          const o = `__private_${e.callee.property.name}`, s = g(this.chunk, o);
          this.emit(n.PUSH, s);
        } else {
          const o = g(this.chunk, e.callee.property.name);
          this.emit(n.PUSH, o);
        }
        this.emit(n.GET_MEMBER), this.emit(n.CALL_WITH_SPREAD);
      } else {
        for (const o of e.arguments)
          this.compileNode(o, i);
        if (this.compileNode(e.callee.object, i), this.emit(n.DUP), e.callee.computed)
          this.compileNode(e.callee.property, i);
        else if (e.callee.property.type === "PrivateIdentifier") {
          const o = `__private_${e.callee.property.name}`, s = g(this.chunk, o);
          this.emit(n.PUSH, s);
        } else {
          const o = g(this.chunk, e.callee.property.name);
          this.emit(n.PUSH, o);
        }
        if (this.emit(n.GET_MEMBER), e.optional) {
          this.emit(n.DUP), this.emit(n.LOAD_NULL), this.emit(n.EQ);
          const o = this.emit(n.JUMP_IF_TRUE, 0);
          this.emit(n.CALL_METHOD, e.arguments.length);
          const s = this.emit(n.JUMP, 0);
          this.patchJump(o), this.emit(n.POP), this.emit(n.POP);
          for (let a = 0; a < e.arguments.length; a++)
            this.emit(n.POP);
          this.emit(n.LOAD_UNDEFINED), this.patchJump(s);
        } else
          this.emit(n.CALL_METHOD, e.arguments.length);
      }
    else if (r) {
      this.emit(n.NEW_ARRAY, 0);
      for (const o of e.arguments)
        o.type === "SpreadElement" ? (this.compileNode(o.argument, i), this.emit(n.ARRAY_CONCAT)) : (this.compileNode(o, i), this.emit(n.ARRAY_PUSH));
      this.emit(n.LOAD_UNDEFINED), this.compileNode(e.callee, i), this.emit(n.CALL_WITH_SPREAD);
    } else {
      for (const o of e.arguments)
        this.compileNode(o, i);
      this.compileNode(e.callee, i), this.emit(n.CALL, e.arguments.length);
    }
  }
  compileNewExpression(e, i) {
    if (e.arguments.some((o) => o.type === "SpreadElement")) {
      this.emit(n.NEW_ARRAY, 0);
      for (const o of e.arguments)
        o.type === "SpreadElement" ? (this.compileNode(o.argument, i), this.emit(n.ARRAY_CONCAT)) : (this.compileNode(o, i), this.emit(n.ARRAY_PUSH));
      this.compileNode(e.callee, i), this.emit(n.NEW_WITH_SPREAD);
    } else {
      for (const o of e.arguments)
        this.compileNode(o, i);
      this.compileNode(e.callee, i), this.emit(n.NEW, e.arguments.length);
    }
  }
  // ===== Statements =====
  compileExpressionStatement(e, i) {
    this.compileNode(e.expression, i), this.emit(n.POP);
  }
  compileBlockStatement(e, i) {
    this.emit(n.PUSH_SCOPE);
    const r = new R(i);
    this.hoistInBlock(e.body, r);
    for (const o of e.body)
      this.compileNode(o, r);
    this.emit(n.POP_SCOPE);
  }
  compileReturnStatement(e, i) {
    e.argument ? this.compileNode(e.argument, i) : this.emit(n.LOAD_UNDEFINED), this.emit(n.RETURN);
  }
  compileIfStatement(e, i) {
    this.compileNode(e.test, i);
    const r = this.emit(n.JUMP_IF_FALSE, 0);
    if (this.compileNode(e.consequent, i), e.alternate) {
      const o = this.emit(n.JUMP, 0);
      this.patchJump(r), this.compileNode(e.alternate, i), this.patchJump(o);
    } else
      this.patchJump(r);
  }
  compileWhileStatement(e, i) {
    const r = this.chunk.instructions.length, o = [], s = [];
    this.loopStack.push({ breakLabel: o, continueLabel: s }), this.compileNode(e.test, i);
    const a = this.emit(n.JUMP_IF_FALSE, 0);
    this.compileNode(e.body, i), this.emit(n.JUMP, r), this.patchJump(a);
    const h = this.chunk.instructions.length;
    for (const u of o)
      this.chunk.instructions[u].operand = h;
    for (const u of s)
      this.chunk.instructions[u].operand = r;
    this.loopStack.pop();
  }
  compileDoWhileStatement(e, i) {
    const r = this.chunk.instructions.length, o = [], s = [];
    this.loopStack.push({ breakLabel: o, continueLabel: s }), this.compileNode(e.body, i);
    const a = this.chunk.instructions.length;
    this.compileNode(e.test, i), this.emit(n.JUMP_IF_TRUE, r);
    const h = this.chunk.instructions.length;
    for (const u of o)
      this.chunk.instructions[u].operand = h;
    for (const u of s)
      this.chunk.instructions[u].operand = a;
    this.loopStack.pop();
  }
  compileForStatement(e, i) {
    this.emit(n.PUSH_SCOPE), e.init && (this.compileNode(e.init, i), e.init.type !== "VariableDeclaration" && this.emit(n.POP));
    const r = this.chunk.instructions.length, o = [], s = [];
    this.loopStack.push({ breakLabel: o, continueLabel: s });
    let a = null;
    e.test && (this.compileNode(e.test, i), a = this.emit(n.JUMP_IF_FALSE, 0)), this.compileNode(e.body, i);
    const h = this.chunk.instructions.length;
    e.update && (this.compileNode(e.update, i), this.emit(n.POP)), this.emit(n.JUMP, r);
    const u = this.chunk.instructions.length;
    a !== null && this.patchJump(a);
    for (const p of o)
      this.chunk.instructions[p].operand = u;
    for (const p of s)
      this.chunk.instructions[p].operand = h;
    this.loopStack.pop(), this.emit(n.POP_SCOPE);
  }
  compileBreakStatement(e, i) {
    if (this.loopStack.length === 0)
      throw new Error("Break statement outside of loop");
    const r = this.emit(n.JUMP, 0);
    this.loopStack[this.loopStack.length - 1].breakLabel.push(r);
  }
  compileContinueStatement(e, i) {
    if (this.loopStack.length === 0)
      throw new Error("Continue statement outside of loop");
    const r = this.emit(n.JUMP, 0);
    this.loopStack[this.loopStack.length - 1].continueLabel.push(r);
  }
  // ===== Declarations =====
  compileVariableDeclaration(e, i) {
    for (const r of e.declarations)
      r.init ? this.compileNode(r.init, i) : e.kind === "var" ? this.emit(n.LOAD_NOINIT) : this.emit(n.LOAD_UNDEFINED), r.id.type === "Identifier" ? e.kind === "const" ? this.emit(n.DECLARE_CONST, r.id.name) : e.kind === "let" ? this.emit(n.DECLARE_LET, r.id.name) : this.emit(n.DECLARE_VAR, r.id.name) : this.compilePattern(r.id, i, e.kind);
  }
  compileFunctionDeclaration(e, i) {
    const r = g(this.chunk, e);
    this.emit(n.CREATE_FUNCTION, r), this.emit(n.STORE_VAR, e.id.name), this.emit(n.POP);
  }
  // ===== Special =====
  compileConditionalExpression(e, i) {
    this.compileNode(e.test, i);
    const r = this.emit(n.JUMP_IF_FALSE, 0);
    this.compileNode(e.consequent, i);
    const o = this.emit(n.JUMP, 0);
    this.patchJump(r), this.compileNode(e.alternate, i), this.patchJump(o);
  }
  compileSequenceExpression(e, i) {
    for (let r = 0; r < e.expressions.length; r++)
      this.compileNode(e.expressions[r], i), r < e.expressions.length - 1 && this.emit(n.POP);
  }
  compileArrayExpression(e, i) {
    if (e.elements.some((o) => o && o.type === "SpreadElement")) {
      this.emit(n.NEW_ARRAY, 0);
      for (const o of e.elements)
        o ? o.type === "SpreadElement" ? (this.compileNode(o.argument, i), this.emit(n.ARRAY_CONCAT)) : (this.compileNode(o, i), this.emit(n.ARRAY_PUSH)) : (this.emit(n.LOAD_UNDEFINED), this.emit(n.ARRAY_PUSH));
    } else {
      for (const o of e.elements)
        o ? this.compileNode(o, i) : this.emit(n.LOAD_UNDEFINED);
      this.emit(n.NEW_ARRAY, e.elements.length);
    }
  }
  compileObjectExpression(e, i) {
    if (e.properties.some((o) => o.type === "SpreadElement")) {
      this.emit(n.NEW_OBJECT, 0);
      for (const o of e.properties)
        if (o.type === "SpreadElement")
          this.compileNode(o.argument, i), this.emit(n.OBJECT_ASSIGN);
        else {
          if (o.computed)
            this.compileNode(o.key, i);
          else {
            const s = o.key.type === "Identifier" ? o.key.name : o.key.value, a = g(this.chunk, s);
            this.emit(n.PUSH, a);
          }
          this.compileNode(o.value, i), this.emit(n.OBJECT_SET_PROP);
        }
    } else if (e.properties.some((s) => s.kind === "get" || s.kind === "set")) {
      this.emit(n.NEW_OBJECT, 0);
      for (const s of e.properties) {
        const a = s.computed ? null : s.key.type === "Identifier" ? s.key.name : s.key.value;
        if (s.kind === "get") {
          if (s.computed)
            this.compileNode(s.key, i);
          else {
            const h = g(this.chunk, a);
            this.emit(n.PUSH, h);
          }
          this.compileNode(s.value, i), this.emit(n.OBJECT_DEFINE_GETTER);
        } else if (s.kind === "set") {
          if (s.computed)
            this.compileNode(s.key, i);
          else {
            const h = g(this.chunk, a);
            this.emit(n.PUSH, h);
          }
          this.compileNode(s.value, i), this.emit(n.OBJECT_DEFINE_SETTER);
        } else {
          if (s.computed)
            this.compileNode(s.key, i);
          else {
            const h = g(this.chunk, a);
            this.emit(n.PUSH, h);
          }
          this.compileNode(s.value, i), this.emit(n.OBJECT_SET_PROP);
        }
      }
    } else {
      let s = 0;
      for (const a of e.properties) {
        if (a.computed)
          this.compileNode(a.key, i);
        else {
          const h = a.key.type === "Identifier" ? a.key.name : a.key.value, u = g(this.chunk, h);
          this.emit(n.PUSH, u);
        }
        this.compileNode(a.value, i), s++;
      }
      this.emit(n.NEW_OBJECT, s);
    }
  }
  compileArrowFunctionExpression(e, i) {
    const r = g(this.chunk, e);
    this.emit(n.CREATE_ARROW_FUNCTION, r);
  }
  compileFunctionExpression(e, i) {
    const r = g(this.chunk, e);
    this.emit(n.CREATE_FUNCTION, r);
  }
  compileAwaitExpression(e, i) {
    this.compileNode(e.argument, i), this.emit(n.AWAIT);
  }
  compileYieldExpression(e, i) {
    e.argument ? this.compileNode(e.argument, i) : this.emit(n.LOAD_UNDEFINED), this.emit(n.YIELD, e.delegate ? 1 : 0);
  }
  compileThrowStatement(e, i) {
    this.compileNode(e.argument, i), this.emit(n.THROW);
  }
  compileTryStatement(e, i) {
    var p;
    const r = e.handler !== null, o = e.finalizer !== null, s = this.emit(n.TRY_START, {
      hasCatch: r,
      hasFinally: o,
      catchJump: 0,
      finallyJump: 0
    });
    this.compileNode(e.block, i), this.emit(n.TRY_END);
    const a = r ? this.emit(n.JUMP, 0) : -1, h = this.chunk.instructions.length;
    r && (this.emit(n.CATCH_START, (p = e.handler.param) == null ? void 0 : p.name), this.compileNode(e.handler.body, i), this.emit(n.CATCH_END)), a >= 0 && this.patchJump(a);
    const u = this.chunk.instructions.length;
    o && (this.emit(n.FINALLY_START), this.compileNode(e.finalizer, i), this.emit(n.FINALLY_END)), this.chunk.instructions[s].operand = {
      hasCatch: r,
      hasFinally: o,
      catchJump: h,
      finallyJump: u
    };
  }
  compileSwitchStatement(e, i) {
    this.compileNode(e.discriminant, i);
    const r = [], o = [];
    this.loopStack.push({ breakLabel: o, continueLabel: [] });
    for (const u of e.cases)
      u.test && (this.emit(n.DUP), this.compileNode(u.test, i), this.emit(n.SEQ), r.push(this.emit(n.JUMP_IF_TRUE, 0)));
    const s = this.emit(n.JUMP, 0);
    let a = 0;
    for (let u = 0; u < e.cases.length; u++) {
      const p = e.cases[u];
      p.test && this.patchJump(r[a++]);
      for (const l of p.consequent)
        this.compileNode(l, i);
    }
    const h = this.chunk.instructions.length;
    this.patchJump(s);
    for (const u of o)
      this.chunk.instructions[u].operand = h;
    this.loopStack.pop(), this.emit(n.POP);
  }
  // ===== Pattern compilation (destructuring) =====
  compilePattern(e, i, r) {
    if (e.type === "Identifier")
      r === "const" ? this.emit(n.DECLARE_CONST, e.name) : r === "let" ? this.emit(n.DECLARE_LET, e.name) : r === "var" ? this.emit(n.DECLARE_VAR, e.name) : this.emit(n.ASSIGN_VAR, e.name);
    else if (e.type === "AssignmentPattern") {
      this.emit(n.DUP), this.emit(n.LOAD_UNDEFINED), this.emit(n.SEQ);
      const o = this.emit(n.JUMP_IF_FALSE, 0);
      this.emit(n.POP), this.compileNode(e.right, i), this.patchJump(o), this.compilePattern(e.left, i, r);
    } else if (e.type === "ArrayPattern") {
      for (let o = 0; o < e.elements.length; o++) {
        const s = e.elements[o];
        if (s)
          if (s.type === "RestElement") {
            this.emit(n.DUP);
            const a = g(this.chunk, o);
            this.emit(n.PUSH, a), this.emit(n.ARRAY_REST), this.compilePattern(s.argument, i, r);
            break;
          } else {
            this.emit(n.DUP);
            const a = g(this.chunk, o);
            this.emit(n.PUSH, a), this.emit(n.GET_MEMBER), this.compilePattern(s, i, r);
          }
      }
      r && this.emit(n.POP);
    } else if (e.type === "ObjectPattern") {
      const o = [];
      for (const s of e.properties)
        if (s.type === "RestElement") {
          this.emit(n.DUP);
          const a = g(this.chunk, o);
          this.emit(n.PUSH, a), this.emit(n.OBJECT_REST), this.compilePattern(s.argument, i, r);
        } else {
          if (this.emit(n.DUP), s.computed)
            this.compileNode(s.key, i);
          else {
            const a = s.key.name || s.key.value;
            o.push(a);
            const h = g(this.chunk, a);
            this.emit(n.PUSH, h);
          }
          this.emit(n.GET_MEMBER), this.compilePattern(s.value, i, r);
        }
      r && this.emit(n.POP);
    }
  }
  // ===== Additional statement types =====
  compileEmptyStatement(e, i) {
  }
  compileDebuggerStatement(e, i) {
    this.emit(n.NOP);
  }
  compileLabeledStatement(e, i) {
    const r = this.chunk.instructions.length;
    this.labelMap.set(e.label.name, r), this.compileNode(e.body, i), this.labelMap.delete(e.label.name);
  }
  compileWithStatement(e, i) {
    this.compileNode(e.object, i), this.emit(n.POP), this.compileNode(e.body, i);
  }
  // ===== For-in and For-of loops =====
  compileForInStatement(e, i) {
    this.emit(n.PUSH_SCOPE), this.compileNode(e.right, i), this.emit(n.GET_KEYS), this.emit(n.DECLARE_VAR, "__keys__");
    const r = g(this.chunk, 0);
    this.emit(n.PUSH, r), this.emit(n.DECLARE_VAR, "__index__");
    let o = null, s = !1;
    if (e.left.type === "VariableDeclaration") {
      const N = e.left.declarations[0];
      N.id.type === "Identifier" && (o = N.id.name, s = e.left.kind === "var", s && (this.emit(n.LOAD_UNDEFINED), this.emit(n.DECLARE_VAR, o)));
    } else e.left.type === "Identifier" && (o = e.left.name);
    const a = this.chunk.instructions.length, h = [], u = [];
    this.loopStack.push({ breakLabel: h, continueLabel: u }), this.emit(n.LOAD_VAR, "__index__"), this.emit(n.LOAD_VAR, "__keys__");
    const p = g(this.chunk, "length");
    this.emit(n.PUSH, p), this.emit(n.GET_MEMBER), this.emit(n.LT);
    const l = this.emit(n.JUMP_IF_FALSE, 0), f = e.left.type === "VariableDeclaration" && !s;
    if (f && this.emit(n.PUSH_SCOPE), this.emit(n.LOAD_VAR, "__keys__"), this.emit(n.LOAD_VAR, "__index__"), this.emit(n.GET_MEMBER), e.left.type === "VariableDeclaration") {
      const N = e.left.declarations[0];
      N.id.type === "Identifier" && (s ? (this.emit(n.STORE_VAR, N.id.name), this.emit(n.POP)) : e.left.kind === "const" ? this.emit(n.DECLARE_CONST, N.id.name) : this.emit(n.DECLARE_LET, N.id.name));
    } else e.left.type === "Identifier" && (this.emit(n.STORE_VAR, e.left.name), this.emit(n.POP));
    this.compileNode(e.body, i), f && this.emit(n.POP_SCOPE);
    const y = this.chunk.instructions.length;
    this.emit(n.LOAD_VAR, "__index__"), this.emit(n.INC), this.emit(n.STORE_VAR, "__index__"), this.emit(n.POP), this.emit(n.JUMP, a);
    const k = this.chunk.instructions.length;
    this.patchJump(l);
    for (const N of h)
      this.chunk.instructions[N].operand = k;
    for (const N of u)
      this.chunk.instructions[N].operand = y;
    this.loopStack.pop(), this.emit(n.POP_SCOPE);
  }
  compileForAwaitStatement(e, i) {
    this.compileForOfStatement(e, i);
  }
  compileForOfStatement(e, i) {
    this.emit(n.PUSH_SCOPE), this.compileNode(e.right, i), this.emit(n.GET_ITERATOR), this.emit(n.DECLARE_VAR, "__iterator__");
    const r = this.chunk.instructions.length, o = [], s = [];
    this.loopStack.push({ breakLabel: o, continueLabel: s }), this.emit(n.LOAD_VAR, "__iterator__"), this.emit(n.ITERATOR_NEXT), this.emit(n.DUP), this.emit(n.DECLARE_VAR, "__iterResult__"), this.emit(n.LOAD_VAR, "__iterResult__"), this.emit(n.ITERATOR_DONE);
    const a = this.emit(n.JUMP_IF_TRUE, 0), h = e.left.type === "VariableDeclaration" && (e.left.kind === "const" || e.left.kind === "let");
    h && this.emit(n.PUSH_SCOPE), this.emit(n.LOAD_VAR, "__iterResult__");
    const u = g(this.chunk, "value");
    if (this.emit(n.PUSH, u), this.emit(n.GET_MEMBER), e.left.type === "VariableDeclaration") {
      const f = e.left.declarations[0];
      f.id.type === "Identifier" && (e.left.kind === "const" ? this.emit(n.DECLARE_CONST, f.id.name) : e.left.kind === "let" ? this.emit(n.DECLARE_LET, f.id.name) : this.emit(n.DECLARE_VAR, f.id.name));
    } else e.left.type === "Identifier" && (this.emit(n.STORE_VAR, e.left.name), this.emit(n.POP));
    this.compileNode(e.body, i);
    const p = this.chunk.instructions.length;
    h && this.emit(n.POP_SCOPE), this.emit(n.JUMP, r);
    const l = this.chunk.instructions.length;
    h && this.emit(n.POP_SCOPE), this.patchJump(a);
    for (const f of o)
      this.chunk.instructions[f].operand = l;
    for (const f of s)
      this.chunk.instructions[f].operand = p;
    this.loopStack.pop(), this.emit(n.POP_SCOPE);
  }
  // ===== Class declarations =====
  compileClassDeclaration(e, i) {
    const r = g(this.chunk, e);
    this.emit(n.CREATE_CLASS, r), this.emit(n.DECLARE_VAR, e.id.name);
  }
  compileClassExpression(e, i) {
    const r = g(this.chunk, e);
    this.emit(n.CREATE_CLASS, r);
  }
  // ===== Import/Export =====
  compileImportDeclaration(e, i) {
    const r = g(this.chunk, e);
    this.emit(n.IMPORT_BINDINGS, r);
  }
  compileExportNamedDeclaration(e, i) {
    e.declaration && this.compileNode(e.declaration, i);
    const r = g(this.chunk, e);
    this.emit(n.EXPORT_NAMED, r);
  }
  compileExportDefaultDeclaration(e, i) {
    this.compileNode(e.declaration, i), this.emit(n.LOAD_VAR, "exports");
    const r = g(this.chunk, "default");
    this.emit(n.PUSH, r), this.emit(n.SET_MEMBER), this.emit(n.POP);
  }
  compileExportAllDeclaration(e, i) {
    const r = g(this.chunk, e.source.value);
    this.emit(n.EXPORT_ALL, r);
  }
  // ===== Special expressions =====
  compileChainExpression(e, i) {
    this.compileNode(e.expression, i);
  }
  compileMetaProperty(e, i) {
    e.meta.name === "new" && e.property.name === "target" ? this.currentScope.find(_t) ? this.emit(n.LOAD_VAR, _t) : this.emit(n.LOAD_UNDEFINED) : e.meta.name === "import" && e.property.name === "meta" && this.emit(n.LOAD_UNDEFINED);
  }
  compileSpreadElement(e, i) {
    this.compileNode(e.argument, i), this.emit(n.SPREAD);
  }
  compileRestElement(e, i) {
    this.compilePattern(e.argument, i);
  }
  compileAssignmentPattern(e, i) {
    this.emit(n.DUP), this.emit(n.LOAD_UNDEFINED), this.emit(n.SEQ);
    const r = this.emit(n.JUMP_IF_FALSE, 0);
    this.emit(n.POP), this.compileNode(e.right, i), this.patchJump(r), this.compilePattern(e.left, i);
  }
  compileProperty(e, i) {
    if (e.kind === "init")
      if (e.method) {
        const r = g(this.chunk, e.value);
        this.emit(n.CREATE_FUNCTION, r);
      } else
        this.compileNode(e.value, i);
    else if (e.kind === "get" || e.kind === "set") {
      const r = g(this.chunk, e.value);
      this.emit(n.CREATE_FUNCTION, r);
    }
  }
  compileMethodDefinition(e, i) {
  }
  compilePropertyDefinition(e, i) {
  }
  compileImportExpression(e, i) {
    this.compileNode(e.source, i), this.emit(n.LOAD_UNDEFINED);
  }
  compileTaggedTemplateExpression(e, i) {
    const r = e.quasi.quasis.map((s) => s.value.cooked), o = g(this.chunk, r);
    this.emit(n.PUSH, o);
    for (const s of e.quasi.expressions)
      this.compileNode(s, i);
    this.compileNode(e.tag, i), this.emit(n.CALL, 1 + e.quasi.expressions.length);
  }
  // ===== Helper methods =====
  emit(e, i) {
    const r = Wi(e, i);
    return qi(this.chunk, r);
  }
  patchJump(e) {
    const i = this.chunk.instructions.length;
    this.chunk.instructions[e].operand = i;
  }
  getChunk() {
    return this.chunk;
  }
}
class pt {
  constructor(e, i = 0) {
    this.ip = 0, this.slots = [], this.returnAddress = 0, this.chunk = e, this.returnAddress = i;
  }
}
class ut {
  // For yield* delegation
  constructor(e, i, r, o, s, a, h = null) {
    this.done = !1, this.value = void 0, this.delegatedIterator = null, this.stack = [...e], this.callStack = i.map((u) => {
      const p = new pt(u.chunk, u.returnAddress);
      return p.ip = u.ip, p.slots = [...u.slots], p;
    }), this.currentFrame = r, this.scopeStack = [...o], this.currentScope = s, this.exceptionHandlers = [...a], this.delegatedIterator = h;
  }
}
class T {
  // For super() calls in class constructors
  constructor(e, i = !1) {
    this.rootScope = e, this.stack = [], this.callStack = [], this.currentFrame = null, this.scopeStack = [], this.halted = !1, this.isAsync = !1, this.exceptionHandlers = [], this.superClass = null, this.currentScope = e, this.scopeStack.push(e), this.isAsync = i;
  }
  setSuperClass(e) {
    this.superClass = e;
  }
  execute(e) {
    for (this.currentFrame = new pt(e), this.callStack.push(this.currentFrame); !this.halted && this.currentFrame.ip < this.currentFrame.chunk.instructions.length; ) {
      const i = this.currentFrame.chunk.instructions[this.currentFrame.ip];
      this.currentFrame.ip++;
      try {
        this.executeInstruction(i);
      } catch (r) {
        if (!this.handleException(r))
          throw r;
      }
    }
    return this.stack.length > 0 ? this.stack.pop() : void 0;
  }
  handleException(e) {
    if (this.exceptionHandlers.length === 0)
      return !1;
    const i = this.exceptionHandlers.pop();
    for (; this.scopeStack.length > i.scopeDepth; )
      this.scopeStack.pop();
    return this.currentScope = this.scopeStack[this.scopeStack.length - 1], i.hasCatch ? (this.push(e), this.currentFrame.ip = i.catchJump) : i.hasFinally && (this.currentFrame.ip = i.finallyJump), !0;
  }
  async executeAsync(e) {
    for (this.currentFrame = new pt(e), this.callStack.push(this.currentFrame); !this.halted && this.currentFrame.ip < this.currentFrame.chunk.instructions.length; ) {
      const i = this.currentFrame.chunk.instructions[this.currentFrame.ip];
      this.currentFrame.ip++;
      try {
        await this.executeInstructionAsync(i);
      } catch (r) {
        throw r;
      }
    }
    return this.stack.length > 0 ? this.stack.pop() : void 0;
  }
  executeInstruction(e) {
    var o;
    const { opcode: i, operand: r } = e;
    switch (i) {
      // ===== Stack operations =====
      case n.PUSH: {
        const s = this.currentFrame.chunk.constants[r];
        this.push(s);
        break;
      }
      case n.POP: {
        this.pop();
        break;
      }
      case n.DUP: {
        const s = this.peek();
        this.push(s);
        break;
      }
      case n.SWAP: {
        const s = this.pop(), a = this.pop();
        this.push(s), this.push(a);
        break;
      }
      case n.ROT3: {
        const s = this.pop(), a = this.pop(), h = this.pop();
        this.push(a), this.push(s), this.push(h);
        break;
      }
      case n.ROT4: {
        const s = this.pop(), a = this.pop(), h = this.pop(), u = this.pop();
        this.push(h), this.push(a), this.push(s), this.push(u);
        break;
      }
      // ===== Literal operations =====
      case n.LOAD_UNDEFINED: {
        this.push(void 0);
        break;
      }
      case n.LOAD_NULL: {
        this.push(null);
        break;
      }
      case n.LOAD_TRUE: {
        this.push(!0);
        break;
      }
      case n.LOAD_FALSE: {
        this.push(!1);
        break;
      }
      case n.LOAD_THIS: {
        const s = (o = this.currentScope.find("this")) == null ? void 0 : o.get();
        this.push(s);
        break;
      }
      case n.LOAD_NOINIT: {
        this.push(lt);
        break;
      }
      // ===== Variable operations =====
      case n.LOAD_VAR: {
        const s = r, a = this.currentScope.find(s);
        if (!a)
          throw new ReferenceError(`${s} is not defined`);
        this.push(a.get());
        break;
      }
      case n.STORE_VAR: {
        const s = r, a = this.peek(), h = this.currentScope.find(s);
        h ? h.set(a) : this.currentScope.var(s, a);
        break;
      }
      case n.ASSIGN_VAR: {
        const s = r, a = this.pop(), h = this.currentScope.find(s);
        if (!h)
          throw new ReferenceError(`${s} is not defined`);
        h.set(a);
        break;
      }
      case n.DECLARE_VAR: {
        const s = r, a = this.pop();
        this.currentScope.var(s, a);
        break;
      }
      case n.DECLARE_CONST: {
        const s = r, a = this.pop();
        this.currentScope.const(s, a);
        break;
      }
      case n.DECLARE_LET: {
        const s = r, a = this.pop();
        this.currentScope.let(s, a);
        break;
      }
      // ===== Binary operations =====
      case n.ADD: {
        const s = this.pop(), a = this.pop();
        this.push(a + s);
        break;
      }
      case n.SUB: {
        const s = this.pop(), a = this.pop();
        this.push(a - s);
        break;
      }
      case n.MUL: {
        const s = this.pop(), a = this.pop();
        this.push(a * s);
        break;
      }
      case n.DIV: {
        const s = this.pop(), a = this.pop();
        this.push(a / s);
        break;
      }
      case n.MOD: {
        const s = this.pop(), a = this.pop();
        this.push(a % s);
        break;
      }
      case n.EXP: {
        const s = this.pop(), a = this.pop();
        this.push(a ** s);
        break;
      }
      case n.EQ: {
        const s = this.pop(), a = this.pop();
        this.push(a == s);
        break;
      }
      case n.NEQ: {
        const s = this.pop(), a = this.pop();
        this.push(a != s);
        break;
      }
      case n.SEQ: {
        const s = this.pop(), a = this.pop();
        this.push(a === s);
        break;
      }
      case n.SNEQ: {
        const s = this.pop(), a = this.pop();
        this.push(a !== s);
        break;
      }
      case n.LT: {
        const s = this.pop(), a = this.pop();
        this.push(a < s);
        break;
      }
      case n.LTE: {
        const s = this.pop(), a = this.pop();
        this.push(a <= s);
        break;
      }
      case n.GT: {
        const s = this.pop(), a = this.pop();
        this.push(a > s);
        break;
      }
      case n.GTE: {
        const s = this.pop(), a = this.pop();
        this.push(a >= s);
        break;
      }
      case n.BITWISE_AND: {
        const s = this.pop(), a = this.pop();
        this.push(a & s);
        break;
      }
      case n.BITWISE_OR: {
        const s = this.pop(), a = this.pop();
        this.push(a | s);
        break;
      }
      case n.BITWISE_XOR: {
        const s = this.pop(), a = this.pop();
        this.push(a ^ s);
        break;
      }
      case n.LEFT_SHIFT: {
        const s = this.pop(), a = this.pop();
        this.push(a << s);
        break;
      }
      case n.RIGHT_SHIFT: {
        const s = this.pop(), a = this.pop();
        this.push(a >> s);
        break;
      }
      case n.UNSIGNED_RIGHT_SHIFT: {
        const s = this.pop(), a = this.pop();
        this.push(a >>> s);
        break;
      }
      case n.IN: {
        const s = this.pop(), a = this.pop();
        this.push(a in s);
        break;
      }
      case n.INSTANCEOF: {
        const s = this.pop(), a = this.pop();
        this.push(a instanceof s);
        break;
      }
      // ===== Unary operations =====
      case n.NOT: {
        const s = this.pop();
        this.push(!s);
        break;
      }
      case n.BITWISE_NOT: {
        const s = this.pop();
        this.push(~s);
        break;
      }
      case n.TYPEOF: {
        const s = this.pop();
        this.push(typeof s);
        break;
      }
      case n.TYPEOF_VAR: {
        const s = r, a = this.currentScope.find(s);
        a ? this.push(typeof a.get()) : this.push("undefined");
        break;
      }
      case n.VOID: {
        this.pop(), this.push(void 0);
        break;
      }
      case n.DELETE: {
        this.pop(), this.push(!0);
        break;
      }
      case n.DELETE_MEMBER: {
        const s = this.pop(), a = this.pop(), h = delete a[s];
        this.push(h);
        break;
      }
      case n.PLUS: {
        const s = this.pop();
        this.push(+s);
        break;
      }
      case n.MINUS: {
        const s = this.pop();
        this.push(-s);
        break;
      }
      // ===== Update operations =====
      case n.INC: {
        const s = this.pop();
        this.push(s + 1);
        break;
      }
      case n.DEC: {
        const s = this.pop();
        this.push(s - 1);
        break;
      }
      // ===== Property access =====
      case n.GET_MEMBER: {
        const s = this.pop(), a = this.pop();
        this.push(a[s]);
        break;
      }
      case n.SET_MEMBER: {
        const s = this.pop(), a = this.pop(), h = this.pop();
        h[a] = s, this.push(s);
        break;
      }
      // ===== Function operations =====
      case n.CALL: {
        const s = r, a = this.pop(), h = [];
        for (let p = 0; p < s; p++)
          h.unshift(this.pop());
        if (typeof a != "function")
          throw new TypeError(`${a} is not a function`);
        const u = a(...h);
        this.push(u);
        break;
      }
      case n.CALL_METHOD: {
        const s = r, a = this.pop(), h = this.pop(), u = [];
        for (let l = 0; l < s; l++)
          u.unshift(this.pop());
        if (typeof a != "function")
          throw new TypeError(`${a} is not a function`);
        const p = a.call(h, ...u);
        this.push(p);
        break;
      }
      case n.CALL_WITH_SPREAD: {
        const s = this.pop(), a = this.pop(), h = this.pop();
        if (typeof s != "function")
          throw new TypeError(`${s} is not a function`);
        if (a === void 0) {
          const u = s(...h);
          this.push(u);
        } else {
          const u = s.call(a, ...h);
          this.push(u);
        }
        break;
      }
      case n.NEW: {
        const s = r, a = this.pop(), h = [];
        for (let p = 0; p < s; p++)
          h.unshift(this.pop());
        const u = new a(...h);
        this.push(u);
        break;
      }
      case n.NEW_WITH_SPREAD: {
        const s = this.pop(), a = this.pop();
        if (typeof s != "function")
          throw new TypeError(`${s} is not a constructor`);
        const h = new s(...a);
        this.push(h);
        break;
      }
      case n.RETURN: {
        const s = this.pop();
        this.callStack.pop(), this.callStack.length > 0 ? (this.currentFrame = this.callStack[this.callStack.length - 1], this.push(s)) : (this.push(s), this.halted = !0);
        break;
      }
      case n.AWAIT:
        throw new Error("AWAIT instruction requires async execution");
      case n.YIELD: {
        const s = this.pop();
        this.push(s);
        break;
      }
      // ===== Object/Array operations =====
      case n.NEW_OBJECT: {
        const s = r, a = {};
        for (let h = s - 1; h >= 0; h--) {
          const u = this.pop(), p = this.pop();
          a[p] = u;
        }
        this.push(a);
        break;
      }
      case n.NEW_ARRAY: {
        const s = r, a = [];
        for (let h = 0; h < s; h++)
          a.unshift(this.pop());
        this.push(a);
        break;
      }
      case n.SPREAD: {
        const s = this.pop();
        if (Array.isArray(s))
          for (const a of s)
            this.push(a);
        else if (typeof s == "object" && s !== null)
          for (const a in s)
            this.push(a), this.push(s[a]);
        break;
      }
      case n.ARRAY_PUSH: {
        const s = this.pop(), a = this.pop();
        a.push(s), this.push(a);
        break;
      }
      case n.ARRAY_CONCAT: {
        const s = this.pop(), a = this.pop();
        if (Array.isArray(s))
          a.push(...s);
        else if (typeof s == "string")
          a.push(...s);
        else if (s && typeof s[Symbol.iterator] == "function")
          for (const h of s)
            a.push(h);
        else
          throw new TypeError(`${Object.prototype.toString.call(s)} is not iterable`);
        this.push(a);
        break;
      }
      case n.OBJECT_ASSIGN: {
        const s = this.pop(), a = this.pop();
        Object.assign(a, s), this.push(a);
        break;
      }
      case n.OBJECT_SET_PROP: {
        const s = this.pop(), a = this.pop(), h = this.pop();
        h[a] = s, this.push(h);
        break;
      }
      case n.OBJECT_DEFINE_GETTER: {
        const s = this.pop(), a = this.pop(), h = this.pop();
        Object.defineProperty(h, a, {
          get: s,
          enumerable: !0,
          configurable: !0
        }), this.push(h);
        break;
      }
      case n.OBJECT_DEFINE_SETTER: {
        const s = this.pop(), a = this.pop(), h = this.pop();
        Object.defineProperty(h, a, {
          set: s,
          enumerable: !0,
          configurable: !0
        }), this.push(h);
        break;
      }
      case n.OBJECT_REST: {
        const s = this.pop(), a = this.pop(), h = {};
        for (const u in a)
          a.hasOwnProperty(u) && !s.includes(u) && (h[u] = a[u]);
        this.push(h);
        break;
      }
      case n.ARRAY_REST: {
        const s = this.pop(), a = this.pop(), h = Array.isArray(a) ? a.slice(s) : [];
        this.push(h);
        break;
      }
      // ===== Control flow =====
      case n.JUMP: {
        this.currentFrame.ip = r;
        break;
      }
      case n.JUMP_IF_FALSE: {
        this.pop() || (this.currentFrame.ip = r);
        break;
      }
      case n.JUMP_IF_TRUE: {
        this.pop() && (this.currentFrame.ip = r);
        break;
      }
      // ===== Scope operations =====
      case n.PUSH_SCOPE: {
        const s = new R(this.currentScope);
        this.scopeStack.push(s), this.currentScope = s;
        break;
      }
      case n.POP_SCOPE: {
        this.scopeStack.pop(), this.scopeStack.length > 0 && (this.currentScope = this.scopeStack[this.scopeStack.length - 1]);
        break;
      }
      // ===== Function/Class creation =====
      case n.CREATE_FUNCTION: {
        const s = this.currentFrame.chunk.constants[r], a = this.createFunction(s, this.currentScope);
        this.push(a);
        break;
      }
      case n.CREATE_ARROW_FUNCTION: {
        const s = this.currentFrame.chunk.constants[r], a = this.createArrowFunction(s, this.currentScope);
        this.push(a);
        break;
      }
      case n.CREATE_CLASS: {
        const s = this.currentFrame.chunk.constants[r], a = this.createClass(s, this.currentScope);
        this.push(a);
        break;
      }
      case n.SUPER_CALL: {
        const s = r, a = [];
        for (let f = 0; f < s; f++)
          a.unshift(this.pop());
        if (!this.superClass)
          throw new ReferenceError("super() call outside of class constructor with parent");
        const h = this.currentScope.find("this");
        if (!h)
          throw new ReferenceError("super() call without this context");
        const u = h.get(), p = this.currentScope.find(_t), l = p ? p.get() : this.superClass;
        if (this.superClass === Array || this.superClass === Set || this.superClass === Map || this.superClass === Promise || this.superClass === Error || this.superClass === RegExp || this.superClass === Date || this.superClass === String || this.superClass === Number || this.superClass === Boolean || this.superClass === Symbol) {
          const f = Reflect.construct(this.superClass, a, l);
          h.set(f);
        } else
          this.superClass.apply(u, a);
        this.push(void 0);
        break;
      }
      case n.EXPORT_ALL: {
        const s = this.currentFrame.chunk.constants[r], a = this.currentScope.global(), h = a.find(vt + s);
        let u;
        if (h) {
          const l = h.get();
          l && (typeof l == "function" ? u = l() : typeof l == "object" && (u = l));
        }
        if (!u || typeof u != "object")
          throw new TypeError(`Failed to resolve module specifier "${s}"`);
        const p = a.find(St);
        if (p) {
          const l = p.get();
          if (l && typeof l == "object")
            for (const f in u)
              Object.prototype.hasOwnProperty.call(u, f) && (l[f] = u[f]);
        }
        break;
      }
      case n.EXPORT_NAMED: {
        const s = this.currentFrame.chunk.constants[r], a = this.currentScope.global(), h = a.find(St);
        if (!h) break;
        const u = h.get();
        if (!u || typeof u != "object") break;
        if (s.declaration) {
          if (s.declaration.type === "VariableDeclaration")
            for (let p = 0; p < s.declaration.declarations.length; p++) {
              const f = s.declaration.declarations[p].id.name, y = a.find(f);
              y && (u[f] = y.get());
            }
          else if (s.declaration.type === "FunctionDeclaration" || s.declaration.type === "ClassDeclaration") {
            const p = s.declaration.id.name, l = a.find(p);
            l && (u[p] = l.get());
          }
        } else if (s.specifiers)
          for (let p = 0; p < s.specifiers.length; p++) {
            const l = s.specifiers[p], f = l.local.type === "Identifier" ? l.local.name : l.local.value, y = l.exported.type === "Identifier" ? l.exported.name : l.exported.value, k = a.find(f);
            k && (u[y] = k.get());
          }
        break;
      }
      case n.IMPORT_BINDINGS: {
        const s = this.currentFrame.chunk.constants[r], h = this.currentScope.global().find(vt + s.source.value);
        let u;
        if (h) {
          const p = h.get();
          p && (typeof p == "function" ? u = p() : typeof p == "object" && (u = p));
        }
        if (!u || typeof u != "object")
          throw new TypeError(`Failed to resolve module specifier "${s.source.value}"`);
        for (let p = 0; p < s.specifiers.length; p++) {
          const l = s.specifiers[p];
          let f;
          if (l.type === "ImportSpecifier")
            f = l.imported.type === "Identifier" ? l.imported.name : l.imported.value;
          else if (l.type === "ImportDefaultSpecifier")
            f = "default";
          else if (l.type === "ImportNamespaceSpecifier")
            f = "*";
          else
            continue;
          if (f !== "*" && !Object.prototype.hasOwnProperty.call(u, f))
            throw new SyntaxError(`The requested module "${s.source.value}" does not provide an export named "${f}"`);
          const y = f === "*" ? Object.assign({}, u) : u[f];
          this.currentScope.var(l.local.name, y);
        }
        break;
      }
      // ===== Exception handling =====
      case n.THROW:
        throw this.pop();
      case n.TRY_START: {
        const s = r;
        this.exceptionHandlers.push({
          catchJump: s.catchJump,
          finallyJump: s.finallyJump,
          hasCatch: s.hasCatch,
          hasFinally: s.hasFinally,
          scopeDepth: this.scopeStack.length
        });
        break;
      }
      case n.TRY_END: {
        if (this.exceptionHandlers.length > 0) {
          const s = this.exceptionHandlers.pop();
          s.hasFinally && (this.currentFrame.ip = s.finallyJump);
        }
        break;
      }
      case n.CATCH_START: {
        const s = r;
        if (s) {
          const a = this.pop();
          this.currentScope.let(s, a);
        }
        break;
      }
      case n.CATCH_END:
        break;
      case n.FINALLY_START:
        break;
      case n.FINALLY_END:
        break;
      // ===== Loop control =====
      case n.BREAK:
      case n.CONTINUE:
        break;
      // ===== Iterator operations =====
      case n.GET_KEYS: {
        const s = this.pop(), a = Object.keys(s);
        this.push(a);
        break;
      }
      case n.GET_ITERATOR: {
        const s = this.pop();
        let a;
        if (Array.isArray(s)) {
          let h = 0;
          a = {
            next() {
              return h < s.length ? { value: s[h++], done: !1 } : { value: void 0, done: !0 };
            }
          };
        } else if (s && typeof s[Symbol.iterator] == "function")
          a = s[Symbol.iterator]();
        else if (typeof s == "string") {
          let h = 0;
          a = {
            next() {
              return h < s.length ? { value: s[h++], done: !1 } : { value: void 0, done: !0 };
            }
          };
        } else
          throw new TypeError(`${s} is not iterable`);
        this.push(a);
        break;
      }
      case n.ITERATOR_NEXT: {
        const a = this.pop().next();
        this.push(a);
        break;
      }
      case n.ITERATOR_DONE: {
        const s = this.pop();
        this.push(s.done);
        break;
      }
      // ===== Special =====
      case n.NOP:
        break;
      case n.HALT: {
        this.halted = !0;
        break;
      }
      default:
        throw new Error(`Unknown opcode: ${i}`);
    }
  }
  async executeInstructionAsync(e) {
    var o;
    const { opcode: i, operand: r } = e;
    switch (i) {
      // ===== Stack operations =====
      case n.PUSH: {
        const s = this.currentFrame.chunk.constants[r];
        this.push(s);
        break;
      }
      case n.POP: {
        this.pop();
        break;
      }
      case n.DUP: {
        const s = this.peek();
        this.push(s);
        break;
      }
      case n.SWAP: {
        const s = this.pop(), a = this.pop();
        this.push(s), this.push(a);
        break;
      }
      case n.ROT3: {
        const s = this.pop(), a = this.pop(), h = this.pop();
        this.push(a), this.push(s), this.push(h);
        break;
      }
      case n.ROT4: {
        const s = this.pop(), a = this.pop(), h = this.pop(), u = this.pop();
        this.push(h), this.push(a), this.push(s), this.push(u);
        break;
      }
      // ===== Literal operations =====
      case n.LOAD_UNDEFINED: {
        this.push(void 0);
        break;
      }
      case n.LOAD_NULL: {
        this.push(null);
        break;
      }
      case n.LOAD_TRUE: {
        this.push(!0);
        break;
      }
      case n.LOAD_FALSE: {
        this.push(!1);
        break;
      }
      case n.LOAD_THIS: {
        const s = (o = this.currentScope.find("this")) == null ? void 0 : o.get();
        this.push(s);
        break;
      }
      case n.LOAD_NOINIT: {
        this.push(lt);
        break;
      }
      // ===== Variable operations =====
      case n.LOAD_VAR: {
        const s = r, a = this.currentScope.find(s);
        if (!a)
          throw new ReferenceError(`${s} is not defined`);
        this.push(a.get());
        break;
      }
      case n.STORE_VAR: {
        const s = r, a = this.peek(), h = this.currentScope.find(s);
        h ? h.set(a) : this.currentScope.var(s, a);
        break;
      }
      case n.ASSIGN_VAR: {
        const s = r, a = this.pop(), h = this.currentScope.find(s);
        if (!h)
          throw new ReferenceError(`${s} is not defined`);
        h.set(a);
        break;
      }
      case n.DECLARE_VAR: {
        const s = r, a = this.pop();
        this.currentScope.var(s, a);
        break;
      }
      case n.DECLARE_CONST: {
        const s = r, a = this.pop();
        this.currentScope.const(s, a);
        break;
      }
      case n.DECLARE_LET: {
        const s = r, a = this.pop();
        this.currentScope.let(s, a);
        break;
      }
      // ===== Binary operations =====
      case n.ADD: {
        const s = this.pop(), a = this.pop();
        this.push(a + s);
        break;
      }
      case n.SUB: {
        const s = this.pop(), a = this.pop();
        this.push(a - s);
        break;
      }
      case n.MUL: {
        const s = this.pop(), a = this.pop();
        this.push(a * s);
        break;
      }
      case n.DIV: {
        const s = this.pop(), a = this.pop();
        this.push(a / s);
        break;
      }
      case n.MOD: {
        const s = this.pop(), a = this.pop();
        this.push(a % s);
        break;
      }
      case n.EXP: {
        const s = this.pop(), a = this.pop();
        this.push(a ** s);
        break;
      }
      case n.EQ: {
        const s = this.pop(), a = this.pop();
        this.push(a == s);
        break;
      }
      case n.NEQ: {
        const s = this.pop(), a = this.pop();
        this.push(a != s);
        break;
      }
      case n.SEQ: {
        const s = this.pop(), a = this.pop();
        this.push(a === s);
        break;
      }
      case n.SNEQ: {
        const s = this.pop(), a = this.pop();
        this.push(a !== s);
        break;
      }
      case n.LT: {
        const s = this.pop(), a = this.pop();
        this.push(a < s);
        break;
      }
      case n.LTE: {
        const s = this.pop(), a = this.pop();
        this.push(a <= s);
        break;
      }
      case n.GT: {
        const s = this.pop(), a = this.pop();
        this.push(a > s);
        break;
      }
      case n.GTE: {
        const s = this.pop(), a = this.pop();
        this.push(a >= s);
        break;
      }
      case n.BITWISE_AND: {
        const s = this.pop(), a = this.pop();
        this.push(a & s);
        break;
      }
      case n.BITWISE_OR: {
        const s = this.pop(), a = this.pop();
        this.push(a | s);
        break;
      }
      case n.BITWISE_XOR: {
        const s = this.pop(), a = this.pop();
        this.push(a ^ s);
        break;
      }
      case n.LEFT_SHIFT: {
        const s = this.pop(), a = this.pop();
        this.push(a << s);
        break;
      }
      case n.RIGHT_SHIFT: {
        const s = this.pop(), a = this.pop();
        this.push(a >> s);
        break;
      }
      case n.UNSIGNED_RIGHT_SHIFT: {
        const s = this.pop(), a = this.pop();
        this.push(a >>> s);
        break;
      }
      case n.IN: {
        const s = this.pop(), a = this.pop();
        this.push(a in s);
        break;
      }
      case n.INSTANCEOF: {
        const s = this.pop(), a = this.pop();
        this.push(a instanceof s);
        break;
      }
      // ===== Unary operations =====
      case n.NOT: {
        const s = this.pop();
        this.push(!s);
        break;
      }
      case n.BITWISE_NOT: {
        const s = this.pop();
        this.push(~s);
        break;
      }
      case n.TYPEOF: {
        const s = this.pop();
        this.push(typeof s);
        break;
      }
      case n.TYPEOF_VAR: {
        const s = r, a = this.currentScope.find(s);
        a ? this.push(typeof a.get()) : this.push("undefined");
        break;
      }
      case n.VOID: {
        this.pop(), this.push(void 0);
        break;
      }
      case n.DELETE: {
        this.pop(), this.push(!0);
        break;
      }
      case n.DELETE_MEMBER: {
        const s = this.pop(), a = this.pop(), h = delete a[s];
        this.push(h);
        break;
      }
      case n.PLUS: {
        const s = this.pop();
        this.push(+s);
        break;
      }
      case n.MINUS: {
        const s = this.pop();
        this.push(-s);
        break;
      }
      // ===== Update operations =====
      case n.INC: {
        const s = this.pop();
        this.push(s + 1);
        break;
      }
      case n.DEC: {
        const s = this.pop();
        this.push(s - 1);
        break;
      }
      // ===== Property access =====
      case n.GET_MEMBER: {
        const s = this.pop(), a = this.pop();
        this.push(a[s]);
        break;
      }
      case n.SET_MEMBER: {
        const s = this.pop(), a = this.pop(), h = this.pop();
        h[a] = s, this.push(s);
        break;
      }
      // ===== Function operations =====
      case n.CALL: {
        const s = r, a = this.pop(), h = [];
        for (let p = 0; p < s; p++)
          h.unshift(this.pop());
        if (typeof a != "function")
          throw new TypeError(`${a} is not a function`);
        const u = await a(...h);
        this.push(u);
        break;
      }
      case n.CALL_METHOD: {
        const s = r, a = this.pop(), h = this.pop(), u = [];
        for (let l = 0; l < s; l++)
          u.unshift(this.pop());
        if (typeof a != "function")
          throw new TypeError(`${a} is not a function`);
        const p = await a.call(h, ...u);
        this.push(p);
        break;
      }
      case n.CALL_WITH_SPREAD: {
        const s = this.pop(), a = this.pop(), h = this.pop();
        if (typeof s != "function")
          throw new TypeError(`${s} is not a function`);
        if (a === void 0) {
          const u = await s(...h);
          this.push(u);
        } else {
          const u = await s.call(a, ...h);
          this.push(u);
        }
        break;
      }
      case n.NEW: {
        const s = r, a = this.pop(), h = [];
        for (let p = 0; p < s; p++)
          h.unshift(this.pop());
        const u = new a(...h);
        this.push(u);
        break;
      }
      case n.NEW_WITH_SPREAD: {
        const s = this.pop(), a = this.pop();
        if (typeof s != "function")
          throw new TypeError(`${s} is not a constructor`);
        const h = new s(...a);
        this.push(h);
        break;
      }
      case n.RETURN: {
        const s = this.pop();
        this.callStack.pop(), this.callStack.length > 0 ? (this.currentFrame = this.callStack[this.callStack.length - 1], this.push(s)) : (this.push(s), this.halted = !0);
        break;
      }
      case n.AWAIT: {
        const a = await this.pop();
        this.push(a);
        break;
      }
      case n.YIELD: {
        const s = this.pop();
        this.push(s);
        break;
      }
      // ===== Object/Array operations =====
      case n.NEW_OBJECT: {
        const s = r, a = {};
        for (let h = 0; h < s; h++) {
          const u = this.pop(), p = this.pop();
          a[p] = u;
        }
        this.push(a);
        break;
      }
      case n.NEW_ARRAY: {
        const s = r, a = [];
        for (let h = 0; h < s; h++)
          a.unshift(this.pop());
        this.push(a);
        break;
      }
      case n.SPREAD: {
        const s = this.pop();
        if (Array.isArray(s))
          for (const a of s)
            this.push(a);
        else if (typeof s == "object" && s !== null)
          for (const a in s)
            this.push(a), this.push(s[a]);
        break;
      }
      case n.ARRAY_PUSH: {
        const s = this.pop(), a = this.pop();
        a.push(s), this.push(a);
        break;
      }
      case n.ARRAY_CONCAT: {
        const s = this.pop(), a = this.pop();
        if (Array.isArray(s))
          a.push(...s);
        else if (typeof s == "string")
          a.push(...s);
        else if (s && typeof s[Symbol.iterator] == "function")
          for (const h of s)
            a.push(h);
        else
          throw new TypeError(`${Object.prototype.toString.call(s)} is not iterable`);
        this.push(a);
        break;
      }
      case n.OBJECT_ASSIGN: {
        const s = this.pop(), a = this.pop();
        Object.assign(a, s), this.push(a);
        break;
      }
      case n.OBJECT_SET_PROP: {
        const s = this.pop(), a = this.pop(), h = this.pop();
        h[a] = s, this.push(h);
        break;
      }
      case n.OBJECT_DEFINE_GETTER: {
        const s = this.pop(), a = this.pop(), h = this.pop();
        Object.defineProperty(h, a, {
          get: s,
          enumerable: !0,
          configurable: !0
        }), this.push(h);
        break;
      }
      case n.OBJECT_DEFINE_SETTER: {
        const s = this.pop(), a = this.pop(), h = this.pop();
        Object.defineProperty(h, a, {
          set: s,
          enumerable: !0,
          configurable: !0
        }), this.push(h);
        break;
      }
      case n.OBJECT_REST: {
        const s = this.pop(), a = this.pop(), h = {};
        for (const u in a)
          a.hasOwnProperty(u) && !s.includes(u) && (h[u] = a[u]);
        this.push(h);
        break;
      }
      case n.ARRAY_REST: {
        const s = this.pop(), a = this.pop(), h = Array.isArray(a) ? a.slice(s) : [];
        this.push(h);
        break;
      }
      // ===== Control flow =====
      case n.JUMP: {
        this.currentFrame.ip = r;
        break;
      }
      case n.JUMP_IF_FALSE: {
        this.pop() || (this.currentFrame.ip = r);
        break;
      }
      case n.JUMP_IF_TRUE: {
        this.pop() && (this.currentFrame.ip = r);
        break;
      }
      // ===== Scope operations =====
      case n.PUSH_SCOPE: {
        const s = new R(this.currentScope);
        this.scopeStack.push(s), this.currentScope = s;
        break;
      }
      case n.POP_SCOPE: {
        this.scopeStack.pop(), this.scopeStack.length > 0 && (this.currentScope = this.scopeStack[this.scopeStack.length - 1]);
        break;
      }
      // ===== Function/Class creation =====
      case n.CREATE_FUNCTION: {
        const s = this.currentFrame.chunk.constants[r], a = this.createFunction(s, this.currentScope);
        this.push(a);
        break;
      }
      case n.CREATE_ARROW_FUNCTION: {
        const s = this.currentFrame.chunk.constants[r], a = this.createArrowFunction(s, this.currentScope);
        this.push(a);
        break;
      }
      case n.CREATE_CLASS: {
        const s = this.currentFrame.chunk.constants[r], a = this.createClass(s, this.currentScope);
        this.push(a);
        break;
      }
      case n.SUPER_CALL: {
        const s = r, a = [];
        for (let f = 0; f < s; f++)
          a.unshift(this.pop());
        if (!this.superClass)
          throw new ReferenceError("super() call outside of class constructor with parent");
        const h = this.currentScope.find("this");
        if (!h)
          throw new ReferenceError("super() call without this context");
        const u = h.get(), p = this.currentScope.find(_t), l = p ? p.get() : this.superClass;
        if (this.superClass === Array || this.superClass === Set || this.superClass === Map || this.superClass === Promise || this.superClass === Error || this.superClass === RegExp || this.superClass === Date || this.superClass === String || this.superClass === Number || this.superClass === Boolean || this.superClass === Symbol) {
          const f = Reflect.construct(this.superClass, a, l);
          h.set(f);
        } else
          this.superClass.apply(u, a);
        this.push(void 0);
        break;
      }
      case n.EXPORT_ALL: {
        const s = this.currentFrame.chunk.constants[r], a = this.currentScope.global(), h = a.find(vt + s);
        let u;
        if (h) {
          const l = h.get();
          l && (typeof l == "function" ? u = l() : typeof l == "object" && (u = l));
        }
        if (!u || typeof u != "object")
          throw new TypeError(`Failed to resolve module specifier "${s}"`);
        const p = a.find(St);
        if (p) {
          const l = p.get();
          if (l && typeof l == "object")
            for (const f in u)
              Object.prototype.hasOwnProperty.call(u, f) && (l[f] = u[f]);
        }
        break;
      }
      case n.EXPORT_NAMED: {
        const s = this.currentFrame.chunk.constants[r], a = this.currentScope.global(), h = a.find(St);
        if (!h) break;
        const u = h.get();
        if (!u || typeof u != "object") break;
        if (s.declaration) {
          if (s.declaration.type === "VariableDeclaration")
            for (let p = 0; p < s.declaration.declarations.length; p++) {
              const f = s.declaration.declarations[p].id.name, y = a.find(f);
              y && (u[f] = y.get());
            }
          else if (s.declaration.type === "FunctionDeclaration" || s.declaration.type === "ClassDeclaration") {
            const p = s.declaration.id.name, l = a.find(p);
            l && (u[p] = l.get());
          }
        } else if (s.specifiers)
          for (let p = 0; p < s.specifiers.length; p++) {
            const l = s.specifiers[p], f = l.local.type === "Identifier" ? l.local.name : l.local.value, y = l.exported.type === "Identifier" ? l.exported.name : l.exported.value, k = a.find(f);
            k && (u[y] = k.get());
          }
        break;
      }
      case n.IMPORT_BINDINGS: {
        const s = this.currentFrame.chunk.constants[r], h = this.currentScope.global().find(vt + s.source.value);
        let u;
        if (h) {
          const p = h.get();
          p && (typeof p == "function" ? u = p() : typeof p == "object" && (u = p));
        }
        if (!u || typeof u != "object")
          throw new TypeError(`Failed to resolve module specifier "${s.source.value}"`);
        for (let p = 0; p < s.specifiers.length; p++) {
          const l = s.specifiers[p];
          let f;
          if (l.type === "ImportSpecifier")
            f = l.imported.type === "Identifier" ? l.imported.name : l.imported.value;
          else if (l.type === "ImportDefaultSpecifier")
            f = "default";
          else if (l.type === "ImportNamespaceSpecifier")
            f = "*";
          else
            continue;
          if (f !== "*" && !Object.prototype.hasOwnProperty.call(u, f))
            throw new SyntaxError(`The requested module "${s.source.value}" does not provide an export named "${f}"`);
          const y = f === "*" ? Object.assign({}, u) : u[f];
          this.currentScope.var(l.local.name, y);
        }
        break;
      }
      // ===== Exception handling =====
      case n.THROW:
        throw this.pop();
      case n.TRY_START: {
        const s = r;
        this.exceptionHandlers.push({
          catchJump: s.catchJump,
          finallyJump: s.finallyJump,
          hasCatch: s.hasCatch,
          hasFinally: s.hasFinally,
          scopeDepth: this.scopeStack.length
        });
        break;
      }
      case n.TRY_END: {
        if (this.exceptionHandlers.length > 0) {
          const s = this.exceptionHandlers.pop();
          s.hasFinally && (this.currentFrame.ip = s.finallyJump);
        }
        break;
      }
      case n.CATCH_START: {
        const s = r;
        if (s) {
          const a = this.pop();
          this.currentScope.let(s, a);
        }
        break;
      }
      case n.CATCH_END:
        break;
      case n.FINALLY_START:
        break;
      case n.FINALLY_END:
        break;
      // ===== Loop control =====
      case n.BREAK:
      case n.CONTINUE:
        break;
      // ===== Iterator operations =====
      case n.GET_KEYS: {
        const s = this.pop(), a = Object.keys(s);
        this.push(a);
        break;
      }
      case n.GET_ITERATOR: {
        const s = this.pop();
        let a;
        if (Array.isArray(s)) {
          let h = 0;
          a = {
            next() {
              return h < s.length ? { value: s[h++], done: !1 } : { value: void 0, done: !0 };
            }
          };
        } else if (s && typeof s[Symbol.iterator] == "function")
          a = s[Symbol.iterator]();
        else if (typeof s == "string") {
          let h = 0;
          a = {
            next() {
              return h < s.length ? { value: s[h++], done: !1 } : { value: void 0, done: !0 };
            }
          };
        } else
          throw new TypeError(`${s} is not iterable`);
        this.push(a);
        break;
      }
      case n.ITERATOR_NEXT: {
        const a = this.pop().next();
        this.push(a);
        break;
      }
      case n.ITERATOR_DONE: {
        const s = this.pop();
        this.push(s.done);
        break;
      }
      // ===== Special =====
      case n.NOP:
        break;
      case n.HALT: {
        this.halted = !0;
        break;
      }
      default:
        throw new Error(`Unknown opcode: ${i}`);
    }
  }
  // Helper to bind function parameters including rest parameters
  bindParameters(e, i, r) {
    for (let o = 0; o < e.length; o++) {
      const s = e[o];
      if (s.type === "Identifier")
        r.var(s.name, i[o]);
      else if (s.type === "RestElement") {
        const a = i.slice(o);
        r.var(s.argument.name, a);
        break;
      } else if (s.type === "AssignmentPattern") {
        const a = i[o] !== void 0 ? i[o] : this.evaluateDefault(s.right, r);
        s.left.type === "Identifier" ? r.var(s.left.name, a) : this.bindPattern(s.left, a, r);
      } else (s.type === "ArrayPattern" || s.type === "ObjectPattern") && this.bindPattern(s, i[o], r);
    }
  }
  bindPattern(e, i, r) {
    if (e.type === "Identifier")
      r.var(e.name, i);
    else if (e.type === "ArrayPattern") {
      const o = i || [];
      for (let s = 0; s < e.elements.length; s++) {
        const a = e.elements[s];
        if (a)
          if (a.type === "RestElement") {
            this.bindPattern(a.argument, o.slice(s), r);
            break;
          } else
            this.bindPattern(a, o[s], r);
      }
    } else if (e.type === "ObjectPattern") {
      const o = i || {};
      for (const s of e.properties)
        if (s.type === "RestElement") {
          const a = {}, h = /* @__PURE__ */ new Set();
          for (const u of e.properties)
            if (u !== s && u.key) {
              const p = u.key.type === "Identifier" ? u.key.name : u.key.value;
              h.add(p);
            }
          for (const u in o)
            h.has(u) || (a[u] = o[u]);
          this.bindPattern(s.argument, a, r);
        } else {
          const a = s.key.type === "Identifier" ? s.key.name : s.key.value, h = o[a];
          this.bindPattern(s.value, h, r);
        }
    } else if (e.type === "AssignmentPattern") {
      const o = i !== void 0 ? i : this.evaluateDefault(e.right, r);
      this.bindPattern(e.left, o, r);
    }
  }
  evaluateDefault(e, i) {
    const o = new P().compile({
      type: "Program",
      body: [{ type: "ReturnStatement", argument: e }],
      sourceType: "script"
    }, i);
    return new T(i).execute(o);
  }
  createClassMethod(e, i, r) {
    const o = this, s = e.generator, a = e.async, h = (u) => new Proxy(r.prototype, {
      get(p, l) {
        const f = p[l];
        return typeof f == "function" ? f.bind(u) : f;
      },
      set(p, l, f) {
        return u[l] = f, !0;
      }
    });
    return s && !a ? function(...u) {
      const p = new R(i, !0);
      o.bindParameters(e.params, u, p), p.var("this", this), p.var("arguments", arguments), p.var("super", h(this));
      const f = new P().compile(e.body, p);
      return o.createGeneratorObject(f, p);
    } : s && a ? function(...u) {
      const p = new R(i, !0);
      o.bindParameters(e.params, u, p), p.var("this", this), p.var("arguments", arguments), p.var("super", h(this));
      const f = new P().compile(e.body, p);
      return o.createAsyncGeneratorObject(f, p);
    } : a ? async function(...u) {
      const p = new R(i, !0);
      o.bindParameters(e.params, u, p), p.var("this", this), p.var("arguments", arguments), p.var("super", h(this));
      const f = new P().compile(e.body, p);
      return await new T(p).executeAsync(f);
    } : function(...u) {
      const p = new R(i, !0);
      o.bindParameters(e.params, u, p), p.var("this", this), p.var("arguments", arguments), p.var("super", h(this));
      const f = new P().compile(e.body, p);
      return new T(p).execute(f);
    };
  }
  createFunction(e, i) {
    const r = this, o = e.generator, s = e.async;
    if (o && !s) {
      let a = i;
      e.id && e.type === "FunctionExpression" && (a = new R(i, !1));
      const h = function(...u) {
        const p = new R(a, !0);
        r.bindParameters(e.params, u, p), p.var("this", this), p.var("arguments", arguments);
        const f = new P().compile(e.body, p);
        return r.createGeneratorObject(f, p);
      };
      return r.setFunctionToString(h, e), e.id && e.type === "FunctionExpression" && a.const(e.id.name, h), h;
    } else if (o && s) {
      let a = i;
      e.id && e.type === "FunctionExpression" && (a = new R(i, !1));
      const h = function(...u) {
        const p = new R(a, !0);
        r.bindParameters(e.params, u, p), p.var("this", this), p.var("arguments", arguments);
        const f = new P().compile(e.body, p);
        return r.createAsyncGeneratorObject(f, p);
      };
      return r.setFunctionToString(h, e), e.id && e.type === "FunctionExpression" && a.const(e.id.name, h), h;
    } else if (s) {
      let a = i;
      e.id && e.type === "FunctionExpression" && (a = new R(i, !1));
      const h = async function(...u) {
        const p = new R(a, !0);
        r.bindParameters(e.params, u, p), p.var("this", this), p.var("arguments", arguments);
        const f = new P().compile(e.body, p);
        return await new T(p).executeAsync(f);
      };
      return r.setFunctionToString(h, e), e.id && e.type === "FunctionExpression" && a.const(e.id.name, h), h;
    } else {
      let a = i;
      e.id && e.type === "FunctionExpression" && (a = new R(i, !1));
      const h = function(...u) {
        const p = new R(a, !0);
        r.bindParameters(e.params, u, p), p.var("this", this), p.var("arguments", arguments);
        const f = new P().compile(e.body, p);
        return new T(p).execute(f);
      };
      return r.setFunctionToString(h, e), e.id && e.type === "FunctionExpression" && a.const(e.id.name, h), h;
    }
  }
  createArrowFunction(e, i) {
    var h;
    const r = this, o = (h = i.find("this")) == null ? void 0 : h.get(), s = e.async || e.generator;
    let a;
    return s ? a = async (...u) => {
      const p = new R(i, !0);
      r.bindParameters(e.params, u, p), o !== void 0 && p.var("this", o);
      const l = new P();
      let f;
      return e.body.type === "BlockStatement" ? f = l.compile(e.body, p) : f = l.compile({
        type: "ReturnStatement",
        argument: e.body
      }, p), await new T(p).executeAsync(f);
    } : a = (...u) => {
      const p = new R(i, !0);
      r.bindParameters(e.params, u, p), o !== void 0 && p.var("this", o);
      const l = new P();
      let f;
      return e.body.type === "BlockStatement" ? f = l.compile(e.body, p) : f = l.compile({
        type: "ReturnStatement",
        argument: e.body
      }, p), new T(p).execute(f);
    }, r.setFunctionToString(a, e), a;
  }
  createClass(e, i) {
    var ne;
    const r = this, o = ((ne = e.id) == null ? void 0 : ne.name) || "AnonymousClass", s = new R(i, !1);
    let a = null;
    const h = [], u = [], p = [], l = [], f = [];
    for (const x of e.body.body)
      x.type === "MethodDefinition" ? x.kind === "constructor" ? a = x : x.static ? u.push(x) : h.push(x) : x.type === "PropertyDefinition" ? x.static ? l.push(x) : p.push(x) : x.type === "StaticBlock" && f.push(x);
    let y = null;
    if (e.superClass) {
      const v = new P().compile({
        type: "Program",
        body: [{
          type: "ReturnStatement",
          argument: e.superClass
        }],
        sourceType: "script"
      }, i);
      y = new T(i).execute(v);
    }
    let k;
    if (a) {
      const x = a.value.body, v = a.value.params;
      k = function(...C) {
        var Z, gt;
        if (!(this instanceof k))
          throw new TypeError(`Class constructor ${o} cannot be invoked without 'new'`);
        const S = new R(i, !0);
        if (r.bindParameters(v, C, S), S.var("this", this), S.var("arguments", arguments), S.var(_t, k), y) {
          const O = new Proxy(y.prototype, {
            get(D, M) {
              var Et;
              const F = (Et = S.find("this")) == null ? void 0 : Et.get();
              let z = Object.getOwnPropertyDescriptor(D, M), U = D;
              for (; !z && U; )
                U = Object.getPrototypeOf(U), U && (z = Object.getOwnPropertyDescriptor(U, M));
              if (z && z.get)
                return z.get.call(F);
              const X = D[M];
              return typeof X == "function" ? X.bind(F) : X;
            },
            set(D, M, F) {
              var Et;
              const z = (Et = S.find("this")) == null ? void 0 : Et.get();
              if (!z) return !1;
              let U = Object.getOwnPropertyDescriptor(D, M), X = D;
              for (; !U && X; )
                X = Object.getPrototypeOf(X), X && (U = Object.getOwnPropertyDescriptor(X, M));
              return U && U.set ? (U.set.call(z, F), !0) : (z[M] = F, !0);
            }
          });
          S.var("super", O);
        }
        if (y) {
          const D = new P().compile({
            type: "Program",
            body: x.body,
            sourceType: "script"
          }, S), M = new T(S);
          M.setSuperClass(y);
          const F = M.execute(D);
          if (F !== void 0 && typeof F == "object" && F !== null)
            return F;
        }
        for (const O of p) {
          let D;
          if (O.computed) {
            const U = new P().compile({
              type: "Program",
              body: [{
                type: "ReturnStatement",
                argument: O.key
              }],
              sourceType: "script"
            }, S);
            D = new T(S).execute(U);
          } else O.key.type === "PrivateIdentifier" ? D = `__private_${O.key.name}` : D = O.key.name || O.key.value;
          let M;
          if (O.value) {
            const U = new P().compile({
              type: "Program",
              body: [{
                type: "ReturnStatement",
                argument: O.value
              }],
              sourceType: "script"
            }, S);
            M = new T(S).execute(U);
          }
          const F = ((Z = S.find("this")) == null ? void 0 : Z.get()) || this;
          F[D] = M;
        }
        if (!y) {
          const D = new P().compile({
            type: "Program",
            body: x.body,
            sourceType: "script"
          }, S), F = new T(S).execute(D);
          if (F !== void 0 && typeof F == "object" && F !== null)
            return F;
        }
        const V = (gt = S.find("this")) == null ? void 0 : gt.get();
        return V !== void 0 ? V : this;
      };
    } else
      k = function(...x) {
        if (!(this instanceof k))
          throw new TypeError(`Class constructor ${o} cannot be invoked without 'new'`);
        let v = this;
        y && (y === Array || y === Set || y === Map || y === Promise || y === Error || y === RegExp || y === Date || y === String || y === Number || y === Boolean || y === Symbol ? v = Reflect.construct(y, x, k) : y.apply(this, x));
        const C = new R(i, !0);
        C.var("this", v);
        for (const S of p) {
          let V;
          if (S.computed) {
            const O = new P().compile({
              type: "Program",
              body: [{
                type: "ReturnStatement",
                argument: S.key
              }],
              sourceType: "script"
            }, C);
            V = new T(C).execute(O);
          } else S.key.type === "PrivateIdentifier" ? V = `__private_${S.key.name}` : V = S.key.name || S.key.value;
          let Z;
          if (S.value) {
            const O = new P().compile({
              type: "Program",
              body: [{
                type: "ReturnStatement",
                argument: S.value
              }],
              sourceType: "script"
            }, C);
            Z = new T(C).execute(O);
          }
          v[V] = Z;
        }
        return v;
      };
    y && (k.prototype = Object.create(y.prototype), k.prototype.constructor = k, Object.setPrototypeOf(k, y)), e.id && s.const(o, k);
    const N = /* @__PURE__ */ new Map(), ht = [];
    for (const x of h) {
      let v;
      if (x.computed) {
        const V = new P().compile({
          type: "Program",
          body: [{
            type: "ReturnStatement",
            argument: x.key
          }],
          sourceType: "script"
        }, s);
        v = new T(s).execute(V);
      } else
        v = x.key.name || x.key.value;
      const C = y ? this.createClassMethod(x.value, s, y) : this.createFunction(x.value, s);
      if (x.kind === "get" || x.kind === "set") {
        N.has(v) || N.set(v, {});
        const S = N.get(v);
        x.kind === "get" ? S.get = C : S.set = C;
      } else
        ht.push({ name: v, func: C });
    }
    for (const [x, v] of N)
      Object.defineProperty(k.prototype, x, {
        get: v.get,
        set: v.set,
        enumerable: !1,
        configurable: !0
      });
    for (const { name: x, func: v } of ht)
      Object.defineProperty(k.prototype, x, {
        value: v,
        writable: !0,
        enumerable: !1,
        configurable: !0
      });
    const K = /* @__PURE__ */ new Map(), it = [];
    for (const x of u) {
      let v;
      if (x.computed) {
        const V = new P().compile({
          type: "Program",
          body: [{
            type: "ReturnStatement",
            argument: x.key
          }],
          sourceType: "script"
        }, s);
        v = new T(s).execute(V);
      } else
        v = x.key.name || x.key.value;
      const C = this.createFunction(x.value, s);
      if (x.kind === "get" || x.kind === "set") {
        K.has(v) || K.set(v, {});
        const S = K.get(v);
        x.kind === "get" ? S.get = C : S.set = C;
      } else
        it.push({ name: v, func: C });
    }
    for (const [x, v] of K)
      Object.defineProperty(k, x, {
        get: v.get,
        set: v.set,
        enumerable: !1,
        configurable: !0
      });
    for (const { name: x, func: v } of it)
      Object.defineProperty(k, x, {
        value: v,
        writable: !0,
        enumerable: !1,
        configurable: !0
      });
    for (const x of l) {
      let v;
      if (x.computed) {
        const V = new P().compile({
          type: "Program",
          body: [{
            type: "ReturnStatement",
            argument: x.key
          }],
          sourceType: "script"
        }, s);
        v = new T(s).execute(V);
      } else x.key.type === "PrivateIdentifier" ? v = `__private_${x.key.name}` : v = x.key.name || x.key.value;
      let C;
      if (x.value) {
        const S = new R(s, !0);
        S.var("this", k);
        const Z = new P().compile({
          type: "Program",
          body: [{
            type: "ReturnStatement",
            argument: x.value
          }],
          sourceType: "script"
        }, S);
        C = new T(S).execute(Z);
      }
      k[v] = C;
    }
    for (const x of f) {
      const v = new R(s, !0);
      v.var("this", k);
      const S = new P().compile({
        type: "Program",
        body: x.body,
        sourceType: "script"
      }, v);
      new T(v).execute(S);
    }
    return Object.defineProperty(k, "name", {
      value: o,
      writable: !1,
      enumerable: !1,
      configurable: !0
    }), k;
  }
  // ===== Generator support =====
  createGeneratorObject(e, i) {
    let r = null;
    return {
      next: (s) => {
        const a = new T(i);
        if (r === null)
          a.currentFrame = new pt(e), a.callStack.push(a.currentFrame);
        else {
          if (r.done)
            return { value: void 0, done: !0 };
          a.stack = [...r.stack], a.callStack = r.callStack.map((h) => {
            const u = new pt(h.chunk, h.returnAddress);
            return u.ip = h.ip, u.slots = [...h.slots], u;
          }), a.currentFrame = a.callStack[a.callStack.length - 1] || null, a.scopeStack = [...r.scopeStack], a.currentScope = r.currentScope, a.exceptionHandlers = [...r.exceptionHandlers], a.push(s);
        }
        try {
          if (r && r.delegatedIterator) {
            const u = r.delegatedIterator.next(s);
            if (!u.done)
              return { value: u.value, done: !1 };
            r.delegatedIterator = null, a.push(u.value);
          }
          for (; a.currentFrame && a.currentFrame.ip < a.currentFrame.chunk.instructions.length && !a.halted; ) {
            const u = a.currentFrame.chunk.instructions[a.currentFrame.ip];
            if (a.currentFrame.ip++, u.opcode === n.YIELD) {
              const p = u.operand, l = a.stack.length > 0 ? a.pop() : void 0;
              if (p) {
                const f = l;
                if (f && typeof f[Symbol.iterator] == "function") {
                  const y = f[Symbol.iterator](), k = y.next();
                  if (!k.done)
                    return r = new ut(
                      a.stack,
                      a.callStack,
                      a.currentFrame,
                      a.scopeStack,
                      a.currentScope,
                      a.exceptionHandlers,
                      y
                      // Save the iterator for next call
                    ), { value: k.value, done: !1 };
                  a.push(k.value);
                  continue;
                }
              }
              return r = new ut(
                a.stack,
                a.callStack,
                a.currentFrame,
                a.scopeStack,
                a.currentScope,
                a.exceptionHandlers,
                null
                // No delegation
              ), { value: l, done: !1 };
            }
            a.executeInstruction(u);
          }
          const h = a.stack.length > 0 ? a.pop() : void 0;
          return r === null && (r = new ut(
            a.stack,
            a.callStack,
            a.currentFrame,
            a.scopeStack,
            a.currentScope,
            a.exceptionHandlers,
            null
          )), r.done = !0, { value: h, done: !0 };
        } catch (h) {
          throw r === null && (r = new ut(
            a.stack,
            a.callStack,
            a.currentFrame,
            a.scopeStack,
            a.currentScope,
            a.exceptionHandlers,
            null
          )), r.done = !0, h;
        }
      },
      return: (s) => (r && (r.done = !0), { value: s, done: !0 }),
      throw: (s) => {
        throw r && (r.done = !0), s;
      },
      [Symbol.iterator]: function() {
        return this;
      }
    };
  }
  createAsyncGeneratorObject(e, i) {
    let r = null, o = null;
    return {
      next: async (a) => {
        o && await o;
        const h = (async () => {
          const u = new T(i, !0);
          if (r === null)
            u.currentFrame = new pt(e), u.callStack.push(u.currentFrame);
          else {
            if (r.done)
              return { value: void 0, done: !0 };
            u.stack = [...r.stack], u.callStack = r.callStack.map((p) => {
              const l = new pt(p.chunk, p.returnAddress);
              return l.ip = p.ip, l.slots = [...p.slots], l;
            }), u.currentFrame = u.callStack[u.callStack.length - 1] || null, u.scopeStack = [...r.scopeStack], u.currentScope = r.currentScope, u.exceptionHandlers = [...r.exceptionHandlers], u.push(a);
          }
          try {
            for (; u.currentFrame && u.currentFrame.ip < u.currentFrame.chunk.instructions.length && !u.halted; ) {
              const l = u.currentFrame.chunk.instructions[u.currentFrame.ip];
              if (u.currentFrame.ip++, l.opcode === n.YIELD) {
                const f = l.operand, y = u.stack.length > 0 ? u.pop() : void 0;
                return r = new ut(
                  u.stack,
                  u.callStack,
                  u.currentFrame,
                  u.scopeStack,
                  u.currentScope,
                  u.exceptionHandlers,
                  null
                ), { value: await y, done: !1 };
              }
              await u.executeInstructionAsync(l);
            }
            const p = u.stack.length > 0 ? u.pop() : void 0;
            return r === null && (r = new ut(
              u.stack,
              u.callStack,
              u.currentFrame,
              u.scopeStack,
              u.currentScope,
              u.exceptionHandlers,
              null
            )), r.done = !0, { value: p, done: !0 };
          } catch (p) {
            throw r === null && (r = new ut(
              u.stack,
              u.callStack,
              u.currentFrame,
              u.scopeStack,
              u.currentScope,
              u.exceptionHandlers,
              null
            )), r.done = !0, p;
          } finally {
            o === h && (o = null);
          }
        })();
        return o = h, await h;
      },
      return: async (a) => {
        o && await o;
        const h = (async () => (r && (r.done = !0), { value: a, done: !0 }))();
        return o = h, await h;
      },
      throw: async (a) => {
        o && await o;
        const h = (async () => {
          throw r && (r.done = !0), a;
        })();
        return o = h, await h;
      },
      [Symbol.asyncIterator]: function() {
        return this;
      }
    };
  }
  // ===== Function toString helper =====
  setFunctionToString(e, i) {
    const r = this.generateFunctionSource(i);
    Object.defineProperty(e, "toString", {
      value: () => r,
      writable: !0,
      configurable: !0
    });
  }
  generateFunctionSource(e) {
    var r;
    if (e.start !== void 0 && e.end !== void 0 && ((r = e.loc) != null && r.source))
      return e.loc.source.substring(e.start, e.end);
    const i = [];
    if (e.async && i.push("async "), e.type === "ArrowFunctionExpression") {
      const o = this.generateParams(e.params);
      i.push(`(${o}) => `), e.body.type === "BlockStatement" ? i.push(this.generateBlockBody(e.body)) : i.push(this.generateExpression(e.body));
    } else {
      i.push("function"), e.generator ? i.push("* ") : i.push(" "), e.id && i.push(e.id.name);
      const o = this.generateParams(e.params);
      i.push(`(${o}) `), i.push(this.generateBlockBody(e.body));
    }
    return i.join("");
  }
  generateParams(e) {
    return e.map((i) => i.type === "Identifier" ? i.name : i.type === "RestElement" ? "..." + this.generateParams([i.argument]) : "param").join(", ");
  }
  generateBlockBody(e) {
    return !e.body || e.body.length === 0 ? "{ }" : `{ ${e.body.map((r) => this.generateStatement(r)).join(" ")} }`;
  }
  generateStatement(e) {
    return e.type === "ReturnStatement" ? e.argument ? "return " + this.generateExpression(e.argument) : "return" : e.type === "ExpressionStatement" ? this.generateExpression(e.expression) : "";
  }
  generateExpression(e) {
    return e.type === "Identifier" ? e.name : e.type === "BinaryExpression" ? this.generateExpression(e.left) + " " + e.operator + " " + this.generateExpression(e.right) : e.type === "AwaitExpression" ? "await " + this.generateExpression(e.argument) : e.type === "YieldExpression" ? "yield " + (e.argument ? this.generateExpression(e.argument) : "") : "";
  }
  // ===== Stack helpers =====
  push(e) {
    this.stack.push(e);
  }
  pop() {
    if (this.stack.length === 0)
      throw new Error("Stack underflow");
    return this.stack.pop();
  }
  peek(e = 0) {
    if (this.stack.length === 0)
      throw new Error("Stack is empty");
    return this.stack[this.stack.length - 1 - e];
  }
}
const Qi = 15, ae = class ae {
  constructor(e = {}) {
    this.options = { ecmaVersion: "latest" }, this.scope = new R(null, !0), this.exports = {};
    let { ecmaVer: i = "latest", sandBox: r = !0, sourceType: o = "script" } = e;
    if (typeof i == "number" && (i -= i < 2015 ? 0 : 2009), i !== "latest" && i !== 3 && (i < 5 || i > Qi))
      throw new Error("unsupported ecmaVer");
    if (this.options.ecmaVersion = i, this.options.sourceType = o, r) {
      const s = ii();
      this.scope.let("globalThis", s), this.scope.let("window", s), this.scope.let("self", s), this.scope.let("this", s);
    } else
      this.scope.let("globalThis", m), this.scope.let("window", m), this.scope.let("self", m), this.scope.let("this", m);
    this.scope.const(o === "module" ? St : "exports", this.exports = {});
  }
  import(e, i) {
    if (typeof e == "string" && (e = { [e]: i }), typeof e != "object") return;
    const r = Xt(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o], a = this.options.sourceType === "module" ? vt + s : s;
      this.scope.var(a, e[s]);
    }
  }
  parse(e, i) {
    return typeof i == "function" ? i(e, this.options) : ji(e, this.options);
  }
  run(e) {
    const i = typeof e == "string" ? this.parse(e) : e, r = this.scope, s = new P().compile(i, r);
    return this.options.sourceType === "module" && (this.options.ecmaVersion === "latest" || this.options.ecmaVersion >= 13) ? new T(r, !0).executeAsync(s) : new T(r, !1).execute(s);
  }
};
ae.version = Ji.version;
let fe = ae;
export {
  fe as default
};
