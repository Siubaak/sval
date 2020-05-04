# Sval

[![npm](https://img.shields.io/npm/v/sval.svg?style=flat-square)](https://www.npmjs.com/package/sval)
[![travis-ci](https://img.shields.io/travis/Siubaak/sval.svg?style=flat-square)](https://travis-ci.org/Siubaak/sval)
[![coveralls](https://img.shields.io/coveralls/github/Siubaak/sval.svg?style=flat-square)](https://coveralls.io/github/Siubaak/sval)

A JavaScript interpreter writen in JavaScript, based on parser [Acorn](https://github.com/acornjs/acorn).

- **Running on ES5, supporting ES5~10 full features**
- **Both invasived and sandbox modes available**

It's useful to evaluate the code of higher ECMAScript editions, or for the environment with disabled `eval`, `setTimeout` and `new Function`.

[Try Sval on the playground.](https://jsbin.com/kehahiqono/edit?js,console)

## Installation

### Node

Install Sval with [npm](https://www.npmjs.com/package/sval).

```bash
npm install sval
```

### Browser

Simply source from [unpkg](https://unpkg.com/sval). Or, download from [releases](https://github.com/Siubaak/sval/releases), get minimized file `dist/min/sval.min.js`, and source at your html page. You can access a global variable **Sval** directly.

```html
<script type="text/javascript" src="https://unpkg.com/sval"></script>
```

## Usage

```js
import Sval from 'sval'

// Sval options
const options = {
  // ECMA Version of the code (5 | 6 | 7 | 8 | 9 | 10 | 2015 | 2016 | 2017 | 2018 | 2019)
  ecmaVer: 9,
  // Whether the code runs in a sandbox
  sandBox: true,
}

// Create a interpreter
const interpreter = new Sval(options)

// Add global modules in interpreter
interpreter.import('importWhatYouNeed', 'AllKindsOfStuffs')
// Or interpreter.import({ importWhatYouNeed: 'AllKindsOfStuffs' })

// Parse and run the code
interpreter.run(`
  const msg = 'Hello World'
  exports.msg = msg // Export any you want
`)

interpreter.run(`
  exports.mod = importWhatYouNeed // Export again and merge
`)

// Get exports from runs
console.log(interpreter.exports.msg) // Get 'Hello World'
console.log(interpreter.exports.mod) // Get 'AllKindsOfStuffs'
```

Sval constructor has options with two fields, **ecmaVer** and **sandBox**.

- **ecmaVer** is the ECMAScript edition of the code. Currently, 5, 6(2015), 7(2016), 8(2017), 9(2018) and 10(2019) are supported, and the default edition is 9.

- **sandBox** is true for sandbox mode or false for invasived mode. Sandbox mode will run code in an isolated sandbox and won't pollute your global scope. Invasived mode allows you run code in the same global scope of your current environment. The default setting is true.

Sval instance has two methods, **import** and **run**.

- **import** is to import modules into your Sval instance scope, expecting a name and a module as arguments like `import(name: string, mod: any)`, or an object which contains the modules as argument like `import({ [name: string]: any })`. The modules will be automatically declared as global variables. This method is more likely to be used in sandbox mode.

- **parse** is to parse the code with internal [Acorn](https://github.com/acornjs/acorn) or custom parser, to get the corresponding AST, like `parse(code: string)` or `parse(code: string, parser: (code: string, options: svalOptions) => estree.Node`

- **run** is to evaluate the code inputed, expecting a string as argument like `run(code: string)`, or an AST followed ESTree Spec as argument like `run(ast: estree.Node)`. If you want to export something, there is a internal global `exports` object for mounting what you want to export.

Sval instance also has a field, **exports**, to get what you exported from runs, merged if several runs have exports.

## Note

**WithStatement** and **LabeledStatement** aren't implemented and recommended. Please avoid to use them.

## Reference

- [ESTree](https://github.com/estree/estree)
- [Acorn](https://github.com/acornjs/acorn)
- [Jsjs](https://github.com/bramblex/jsjs)

## License

Sval is licensed under the [MIT](https://github.com/Siubaak/sval/blob/master/LICENSE).