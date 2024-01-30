# Sval &middot; [![npm](https://img.shields.io/npm/v/sval.svg?style=flat-square)](https://www.npmjs.com/package/sval) [![github-actions](https://img.shields.io/github/actions/workflow/status/Siubaak/sval/coverage.yml?style=flat-square)](https://github.com/Siubaak/sval/actions/workflows/coverage.yml) [![coveralls](https://img.shields.io/coveralls/github/Siubaak/sval.svg?style=flat-square)](https://coveralls.io/github/Siubaak/sval)

A JavaScript interpreter writen in JavaScript, based on parser [Acorn](https://github.com/acornjs/acorn).

- **Running on ES5, supporting ES latest features**
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

## Get Started

```js
import Sval from 'sval'

// Create a interpreter
const interpreter = new Sval({
  // ECMA Version of the code
  // 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
  // or 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024
  // or "latest"
  ecmaVer: 'latest',
  // Code source type
  // "script" or "module"
  sourceType: 'script',
  // Whether the code runs in a sandbox
  sandBox: true,
})

// Parse and run the code
interpreter.run(`
  console.log('Hello World')
`)
```

## Usage

Sval constructor has three options: **ecmaVer**, **sourceType** and **sandBox**.

- **ecmaVer** is the ECMAScript edition of the code. Currently, 3, 5, 6(2015), 7(2016), 8(2017), 9(2018), 10(2019), 11(2020), 12(2021), 13(2022), 14(2023), 15(2024) and "latest" are supported, and the default edition is "latest".

- **sourceType** is ethier "script" or "module", which is to declare how Sval handle the code. The "script" means the code will be treated as a normal script, while the "module" means the code will be treated as an ES module with global strict mode and parsing of import and export declarations. The default type is "script".

- **sandBox** is true for sandbox mode or false for invasived mode. Sandbox mode will run code in an isolated sandbox and won't pollute your global scope. Invasived mode allows you run code in the same global scope of your current environment. The default setting is true.

Sval instance has two main methods: **parse** and **run**.

- **parse** is to parse the code with internal [Acorn](https://github.com/acornjs/acorn) or custom parser, to get the corresponding AST, like `parse(code: string)` or `parse(code: string, parser: (code: string, options: SvalOptions) => estree.Node`.

- **run** is to evaluate the code inputed, expecting a string as argument like `run(code: string)`, or an AST followed ESTree Spec as argument like `run(ast: estree.Node)`.

Besides, Sval instance also has one method, **import**, and one object, **exports**, for modularization.

- **import** is to import modules into your Sval instance scope. This method has different behaviors for different `sourceType`.

  For "script", this method expecting a name and a module as arguments like `import(name: string, mod: any)`, or an object which contains the modules as argument like `import({ [name: string]: any })`. The modules will be automatically declared as global variables in Sval instance scope. This method is more likely to be used in sandbox mode.

  For "module", this method expecting a path and a module declaration as arguments like `import(path: string, mod: Module)`, or an object which contains the module declarations as argument like `import({ [path: string]: Module })`. The `Module` is either an ES module exported object like `{ default?: any, [name: string]: any }` or a function returning an ES module exported object like `() => ({ default?: any, [name: string]: any })`. The `Module` can also be a promise or a function returning a promise if importing a module by dynamic import. The modules will not be automatically declared as global variables in Sval instance scope, and the code should use import declarations to import the module.

- **exports** is to get what you exported from runs, merged if several runs have exports. Also, this object has different behaviors for different `sourceType`.

  For "script", this object will be automatically declared as global variables in Sval instance scope, and the code can just simple mount properties on it for export.

  For "module", this object will not be automatically declared as global variables in Sval instance scope, and the code needs to use export declarations for export.

Here are examples for **import** and **exports** below:

Example for "script":

```js
import Sval from 'sval'

// Create a interpreter for script
const scriptInterpreter = new Sval({ sourceType: 'script' })

// Add global modules in interpreter
scriptInterpreter.import('importWhatYouNeed', 'AllKindsOfStuffs')
// Or scriptInterpreter.import({ importWhatYouNeed: 'AllKindsOfStuffs' })

// Parse and run the code
scriptInterpreter.run(`
  exports.mod = importWhatYouNeed
`)

// Get exports from runs
console.log(scriptInterpreter.exports.mod) // Get 'AllKindsOfStuffs'
```

Example for "module":

```js
import Sval from 'sval'

// Create a interpreter for module
const moduleInterpreter = new Sval({ sourceType: 'module' })

// Add ES modules in interpreter
moduleInterpreter.import('./import-what-you-need', { default: 'AllKindsOfStuffs' })
// Or moduleInterpreter.import('./import-what-you-need', () => ({ default: 'AllKindsOfStuffs' }))
// Or moduleInterpreter.import({ './import-what-you-need': { default: 'AllKindsOfStuffs' } })
// Or moduleInterpreter.import({ './import-what-you-need': () => ({ default: 'AllKindsOfStuffs' }) })

// Add ES modules in interpreter for dynamic import
moduleInterpreter.import('./dynamic-import-what-you-need', Promise.resolve({ default: 'AllKindsOfStuffs' }))

// Parse and run the code
moduleInterpreter.run(`
  import importWhatYouNeed from './import-what-you-need'
  import('./dynamic-import-what-you-need').then(m => console.log(m.default)) // Get 'AllKindsOfStuffs'
  export { importWhatYouNeed as mod }
`)

// Get exports from runs
console.log(moduleInterpreter.exports.mod) // Get 'AllKindsOfStuffs'
```

## Note

**WithStatement** and **LabeledStatement** aren't implemented and recommended. Please avoid to use them.

## Reference

- [ESTree](https://github.com/estree/estree)
- [Acorn](https://github.com/acornjs/acorn)
- [Jsjs](https://github.com/bramblex/jsjs)

## License

Sval is licensed under the [MIT](https://github.com/Siubaak/sval/blob/master/LICENSE).