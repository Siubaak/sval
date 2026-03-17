# Sval &middot; [![npm](https://img.shields.io/npm/v/sval.svg?style=flat-square)](https://www.npmjs.com/package/sval) [![coveralls](https://img.shields.io/coveralls/github/Siubaak/sval.svg?style=flat-square)](https://coveralls.io/github/Siubaak/sval) [![gh-actions](https://img.shields.io/github/actions/workflow/status/Siubaak/sval/coverage.yml?style=flat-square)](https://github.com/Siubaak/sval/actions/workflows/coverage.yml) [![prs-welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://makeapullrequest.com)

A JavaScript interpreter written in JavaScript, based on the [Acorn](https://github.com/acornjs/acorn) parser.

- **Runs on ES5, supporting the latest ES features**
- **Both invasive and sandbox modes are available**

It is useful for evaluating code targeting higher ECMAScript editions, or for environments where `eval`, `setTimeout`, and `new Function` are disabled.

[Try Sval on the playground.](https://jsbin.com/kehahiqono/edit?js,console)

## Installation

### Node

Install Sval with [npm](https://www.npmjs.com/package/sval).

```bash
npm install sval
```

### Browser

Simply include it from [unpkg](https://unpkg.com/sval). Alternatively, download from [releases](https://github.com/Siubaak/sval/releases), get the minified file `dist/min/sval.min.js`, and include it in your HTML page. The global variable **Sval** will then be accessible directly.

```html
<script type="text/javascript" src="https://unpkg.com/sval"></script>
```

## Get Started

```js
import Sval from 'sval'

// Create an interpreter
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

The Sval constructor accepts three options: **ecmaVer**, **sourceType**, and **sandBox**.

- **ecmaVer** specifies the ECMAScript edition of the code. Currently, 3, 5, 6(2015), 7(2016), 8(2017), 9(2018), 10(2019), 11(2020), 12(2021), 13(2022), 14(2023), 15(2024), and "latest" are supported, and the default value is "latest".

- **sourceType** is either "script" or "module", which declares how Sval handles the code. A value of "script" means the code will be treated as a normal script, while "module" means the code will be treated as an ES module with global strict mode and support for import and export declarations. The default type is "script".

- **sandBox** is true for sandbox mode or false for invasive mode. Sandbox mode runs the code in an isolated environment and will not pollute your global scope. Invasive mode allows you to run code in the same global scope as your current environment. The default setting is true.

A Sval instance has two main methods: **parse** and **run**.

- **parse** parses the code with the internal [Acorn](https://github.com/acornjs/acorn) or a custom parser to get the corresponding AST, as in `parse(code: string)` or `parse(code: string, parser: (code: string, options: SvalOptions) => estree.Node)`.

- **run** evaluates the provided code, accepting either a string like `run(code: string)` or an AST conforming to the ESTree spec like `run(ast: estree.Node)`.

In addition, a Sval instance has one method, **import**, and one object, **exports**, for modularization.

- **import** is used to import modules into the Sval instance scope. This method behaves differently depending on the `sourceType`.

  For "script", this method expects a name and a module as arguments like `import(name: string, mod: any)`, or an object containing the modules like `import({ [name: string]: any })`. The modules will be automatically declared as global variables in the Sval instance scope. This method is most commonly used in sandbox mode.

  For "module", this method expects a path and a module declaration as arguments like `import(path: string, mod: Module)`, or an object containing the module declarations like `import({ [path: string]: Module })`. The `Module` is either an ES module export object like `{ default?: any, [name: string]: any }` or a function returning one like `() => ({ default?: any, [name: string]: any })`. The `Module` can also be a promise or a function returning a promise for use with dynamic imports. The modules will not be automatically declared as global variables in the Sval instance scope, and the code should use import declarations to import them.

- **exports** holds what was exported from runs, merged across multiple runs if applicable. This object also behaves differently depending on the `sourceType`.

  For "script", this object is automatically declared as a global variable in the Sval instance scope, and the code can simply mount properties on it to export values.

  For "module", this object is not automatically declared as a global variable in the Sval instance scope, and the code must use export declarations to export values.

Here are examples for **import** and **exports**:

Example for "script":

```js
import Sval from 'sval'

// Create an interpreter for script
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

// Create an interpreter for module
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

## Reference

- [estree](https://github.com/estree/estree)
- [acorn](https://github.com/acornjs/acorn)
- [jsjs](https://github.com/bramblex/jsjs)

## Related

- [sval-rhino-gs](https://github.com/Patrick-ring-motive/sval-rhino-gs)

## License

Sval is licensed under the [MIT](https://github.com/Siubaak/sval/blob/master/LICENSE).
