# Sval

[![npm](https://img.shields.io/npm/v/sval.svg?style=flat-square)](https://www.npmjs.com/package/sval)
[![travis-ci](https://img.shields.io/travis/Siubaak/sval.svg?style=flat-square)](https://travis-ci.org/Siubaak/sval)
[![coveralls](https://img.shields.io/coveralls/github/Siubaak/sval.svg?style=flat-square)](https://coveralls.io/github/Siubaak/sval)

A JavaScript interpreter writen in JavaScript, based on parser [Acorn](https://github.com/acornjs/acorn).

- **Running on ES5, supporting ES5/6/7/8 full features**
- **Both invasived and sandbox modes available**

It's useful to evaluate the code of higher ECMAScript editions, or for the environment with disabled `eval` and `new Function`.

[Try Sval on the playground.](https://siubaak.github.io/sval)

## Installation

The most recommended way to install Sval is with [npm](https://www.npmjs.com/package/sval).

```bash
npm install sval
```

Alternately you can simply download from [releases](https://github.com/Siubaak/sval/releases), get minimized file `sval/dist/min/sval.min.js`, and source at your html page.

```html
<script type="text/javascript" src="sval.min.js"></script>
```

## Usage

```js
import Sval from 'sval'

// Sval options
const options = {
  // ECMA Version of the code (5 | 6 | 7 | 8 | 2015 | 2016 | 2017)
  ecmaVer: 7,
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

Sval contructor has options with two fields, **ecmaVer** and **sandBox**.

- **ecmaVer** is the ECMA version that the code your want to run. Currently, 5, 6(2015), 7(2016) and 8(2017) are supported, and the default version is 7 if this field is missing.

- **sandBox** is true for sandbox mode or false for invasived mode. Sandbox mode will run code in a isolated sandbox and won't pollute your scope outside. Invasived mode allows you run code in the same scope of your current scope. The default setting is true if this field is missing.

Sval instance has two methods, **import** and **run**.

- **import** expects a name and a module as arguments like `import(name: string, mod: any)`, or only a object as argument, and the object contains the modules you need to use in the instance scope like `import({ [name: string]: any })`. The modules will be automatically declared as global variables. This method is more likely to be used in sandbox mode.

- **run** expects a string as argument like `run(code: string)`, and this string is the code you input to run. If you want to export something, there is a internal global `exports` object for mounting what you want to export.

Sval instance also has a field, **exports**, to get what you exported from runs, merged if several runs have exports.

## Note

**WithStatement** and **LabeledStatement** aren't implemented and recommended. Please avoid to use them. Also, the performance is just average, so don't expect much of it.

## Reference

- [ESTree](https://github.com/estree/estree)
- [Acorn](https://github.com/acornjs/acorn)
- [Jsjs](https://github.com/bramblex/jsjs)

## License

Sval is licensed under the [MIT](https://github.com/Siubaak/sval/blob/master/LICENSE).