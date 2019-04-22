const Sval = require('../dist/sval')

describe('testing src/index.ts', () => {
  it('should crate es5 class normally', () => {
    const interpreter = new Sval()
      interpreter.run(`
      function Point(x, y) {
        this.x = x
        this.y = y
      }
      
      Point.prototype.toString = function () {
        return '(' + this.x + ', ' + this.y + ')'
      };
      
      exports.inst = new Point(1, 2)
      exports.cls = Point
    `)

    expect(interpreter.exports.cls === interpreter.exports.cls.prototype.constructor)
    expect(interpreter.exports.inst.x).toBe(1)
    expect(interpreter.exports.inst.y).toBe(2)
    expect(interpreter.exports.inst.toString()).toBe('(1, 2)')
  })

  it('should create es6 class normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      class Point {
        constructor(x, y) {
          this.x = x
          this.y = y
        }
      
        toString() {
          return '(' + this.x + ', ' + this.y + ')'
        }
      }
      
      exports.inst = new Point(1, 2)
      exports.cls = Point
      exports.inst1 = new Point()
      exports.inst2 = new Point()
    `)

    expect(interpreter.exports.cls === interpreter.exports.cls.prototype.constructor)
    expect(interpreter.exports.inst.x).toBe(1)
    expect(interpreter.exports.inst.y).toBe(2)
    expect(interpreter.exports.inst.toString()).toBe('(1, 2)')
    expect(interpreter.exports.inst1.__proto__).toEqual(interpreter.exports.inst2.__proto__)
    expect(interpreter.exports.inst1.constructor).toEqual(interpreter.exports.inst2.constructor)
  })

  it('should create class with getter/setter normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      class A {
        constructor() {
          this.b = 1
        }
        p() {
          this.b++
        }
        get k() {
          return this.b + 1
        }
        set g(a) {
          this.b = a
        }
      }
      exports.inst = new A()
      exports.inst.g = 3
      exports.inst.p()
    `)
    expect(interpreter.exports.inst.b).toBe(4)
    expect(interpreter.exports.inst.k).toBe(5)
  })
  it('should extend class normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      class A {
        get g() {
          return this.k + 1
        }
      }
      class B extends A { }
      class C extends B {
        constructor() {
          super()
          this.k = 1
          exports.g = super.g
        }
      }
      new C()
    `)
    expect(interpreter.exports.g).toBe(2)
  })
  it('should get base class normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      class A {
        set g(val) {
          this.k = val
        }
      }
      class B extends A { }
      class C extends B {
        constructor() {
          super()
          super.g = 1
        }
      }
      const k = new C()
      exports.k = k.k
    `)
    expect(interpreter.exports.k).toBe(1)
  })
  it('should call base class method normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      class A {
        assign() {
          exports.a = 1
        }
      }
    
      class B extends A {
        assign() {
          super.assign()
          exports.b = 2
        }
      }
    
      const a = new B()
      a.assign()
    `)
    expect(interpreter.exports.a).toBe(1)
    expect(interpreter.exports.b).toBe(2)
  })

  it('should support property expression', () => {
    const interpreter = new Sval()
    interpreter.run(`
      const methodName = 'say'
      class Foo {
        [methodName]() {
          return true;
        }
      }
      
      exports.inst = new Foo();
    `)

    expect(typeof interpreter.exports.inst.say).toBe('function');
    expect(interpreter.exports.inst.say()).toBe(true);

  })

  it('should support returns object for constructor', () => {
    const interpreter = new Sval()
    interpreter.run(`
      class Foo {
        constructor() {
          exports.obj = Object.create(null)
          return exports.obj
        }
      }
      
      exports.inst = new Foo()
      exports.cls = Foo
    `)
    expect(interpreter.exports.inst instanceof interpreter.exports.cls).toBe(false)
    expect(interpreter.exports.inst).toBe(interpreter.exports.obj)
  })

  it('should throw TypeError when calling es6 class as function', () => {
    const interpreter = new Sval()
    let err;
    try {
      interpreter.run(`
        class Foo {
          
        }
        
        Foo()
      `)
    } catch (ex) {
      err = ex
    }

    expect(err).toBeInstanceOf(TypeError)
  })

  it('should throw ReferenceError when super() is not called in constructor for derived class', () => {
    const interpreter = new Sval()

    let err;
    try {
      interpreter.run(`
        class X {
          constructor() {
            this.x = 1
          }
        }
      
        class Y extends X {
          constructor() {
            // no super call
          }
        }
      
        const y = new Y()
      `)
    } catch (ex) {
      err = ex
    }

    expect(err).toBeInstanceOf(ReferenceError)
  })

  it('should support class expression', () => {
    const interpreter = new Sval()
    interpreter.run(`
      const MyClass = class Me {
        getClassName() {
          return Me.name // can get Me
        }
      }

      exports.inst = new MyClass()
    `)

    expect(interpreter.exports.inst.getClassName()).toBe('Me')
  })

  it('should hide class name from outer with class expression', () => {
    const interpreter = new Sval()
    let ex;
    try {
      interpreter.run(`
        const MyClass = class Me {
          getClassName() {
            return Me.name // can get Me
          }
        }

        exports.cls = Me // can't get Me
      `)
    } catch(ex) {
      err = ex
    }

    expect(err).toBeInstanceOf(ReferenceError)
  })

  it('should support omitting class name for class expression', () => {
    const interpreter = new Sval()
    interpreter.run(`
      const MyClass = class {
        say() {
          return 1
        }
      }

      exports.inst = new MyClass()
    `)

    expect(interpreter.exports.inst.say()).toBe(1)
  })

  it('should not support hoisting for es6 class', () => {
    const interpreter = new Sval()

    let err;
    try {
      interpreter.run(`
        new Foo()
        class Foo {

        }
      `)
    } catch(ex) {
      err = ex
    }

    expect(err).toBeInstanceOf(ReferenceError)
  })

  it('should not support hoisting for es6 class 2', () => {
    const interpreter = new Sval()
    interpreter.run(`
      {
        let Foo = class {};
        class Bar extends Foo {
        }
      }
    `)
  })

  it('should have correct name for class', () => {
    const interpreter = new Sval()
    interpreter.run(`
      class Point {}
      exports.result = Point.name === 'Point'
    `)

    expect(interpreter.exports.result).toBe(true)
  })

  it('should support static method for class', () => {
    const interpreter = new Sval()
    interpreter.run(`
      class Point {
        static create() {
          return new Point()
        }
      }
      exports.inst = Point.create()
      exports.cls = Point
    `)

    expect(interpreter.exports.inst).toBeInstanceOf(interpreter.exports.cls)
  })

  it('should set correct new.target when creating instance', () => {
    const interpreter = new Sval()
    interpreter.run(`
      class Point {
        constructor() {
          exports.target = new.target
        }
      }
    
      new Point()

      exports.cls = Point
    `)

    expect(interpreter.exports.target).toBe(interpreter.exports.cls)
  })

  it('should support generator method', () => {
    const interpreter = new Sval()
    interpreter.run(`
      class Foo {
        constructor(...args) {
          this.args = args
        }
        * [Symbol.iterator]() {
          for (let arg of this.args) {
            yield arg
          }
        }
      }
      
      const params = ['hello', 'world']
      const result = []
      for (let x of new Foo(...params)) {
        result.push(x)
      }

      exports.target = params
      exports.actual = result
    `)

    expect(interpreter.exports.target.length).toBe(interpreter.exports.actual.length)
    expect(interpreter.exports.target[0]).toBe(interpreter.exports.actual[0])
    expect(interpreter.exports.target[1]).toBe(interpreter.exports.actual[1])
  })
})
