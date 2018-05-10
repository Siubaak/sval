# Sval

[![npm](https://img.shields.io/npm/v/sval.svg?style=flat-square)](https://www.npmjs.com/package/sval)
[![travis-ci](https://img.shields.io/travis/Siubaak/sval.svg?style=flat-square)](https://travis-ci.org/Siubaak/sval)
[![coveralls](https://img.shields.io/coveralls/github/Siubaak/sval.svg?style=flat-square)](https://coveralls.io/github/Siubaak/sval)

This is a javascript interpreter writen in javascript, based on parser [acorn](https://github.com/acornjs/acorn). It's useful for those javascript engine which disable eval function. Both invasived and sandbox modes are supported.

## Installation

The most recommended way to install sval is with [npm](https://www.npmjs.com/package/sval).

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
  // ECMA Version of the code (5 | 6 | 2015)
  ecmaVer: 5,
  // Whether the code runs in a sandbox
  sandBox: true,
}

// Create a interpreter
const interpreter = new Sval(options)

// Add global modules in interpreter
interpreter.addModules({
  addWhatYouNeedToUse: 'AllKindsOfStuffs'
})

interpreter.run(`
  var msg = 'Hello World'
  console.log(msg) // Get 'Hello World'
  console.log(addWhatYouNeedToUse) // Get 'AllKindsOfStuffs'
`)
```

Sval contructor has options with two fields, **ecmaVer** and **sandBox**.

- **ecmaVer** is the ECMA version that the code your want to run. Currently, only 5 and 6 (2015) are supported, and the default version is 5 if this field is missing.

- **sandBox** is true for sandbox mode or false for invasived mode. Sandbox mode will run code in a isolated sandbox and won't pollute your scope outside. Invasived mode allows you run code in the same scope of your current scope. The default setting is true if this field is missing.

Sval instance has two methods, **addModules** and **run**.

- **addModules** expects a object as arguments, and the object contains the modules you need to use in the instance scope. The modules will be automatically declared as global variables. This method is more likely to be used in sandbox mode.

- **run** expects a string as arguments, and this string is the code you input to run.

## Reference

- [ESTree](https://github.com/estree/estree)
- [Acorn](https://github.com/acornjs/acorn)
- [Jsjs](https://github.com/bramblex/jsjs)

## License

Sval is licensed under the [MIT](https://github.com/Siubaak/sval/blob/master/LICENSE).