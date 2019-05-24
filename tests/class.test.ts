import Sval from '../src'

describe('testing src/index.ts', () => {
  it('should create es5 class normally', () => {
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

    expect(interpreter.exports.cls).toBe(interpreter.exports.cls.prototype.constructor)
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

    expect(interpreter.exports.cls).toBe(interpreter.exports.cls.prototype.constructor)
    expect(interpreter.exports.inst.x).toBe(1)
    expect(interpreter.exports.inst.y).toBe(2)
    expect(interpreter.exports.inst.toString()).toBe('(1, 2)')
    expect(interpreter.exports.inst1.__proto__).toBe(interpreter.exports.inst2.__proto__)
    expect(interpreter.exports.inst1.constructor).toBe(interpreter.exports.inst2.constructor)
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
          return true
        }
      }
      
      exports.inst = new Foo()
    `)

    expect(typeof interpreter.exports.inst.say).toBe('function')
    expect(interpreter.exports.inst.say()).toBeTruthy()
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
    expect(interpreter.exports.inst).not.toBeInstanceOf(interpreter.exports.cls)
    expect(interpreter.exports.inst).toBe(interpreter.exports.obj)
  })

  it('should throw TypeError when calling es6 class as function', () => {
    const interpreter = new Sval()
    let error = null;
    try {
      interpreter.run(`
        class Foo {
          
        }
        
        Foo()
      `)
    } catch (err) {
      error = err
    }

    expect(error).toBeInstanceOf(TypeError)
    error = null;

    try {
      interpreter.run(`
        class Bar {
          
        }

        const x = {
          bar: Bar
        }
        
        x.bar()
      `)
    } catch (err) {
      error = err
    }

    expect(error).toBeInstanceOf(TypeError)
  })
  
  it('should call super normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      class X {
        constructor(x) {
          this.x = x
        }
      }
    
      class Y extends X {
        constructor() {
          super(2)
        }
      }
    
      exports.y = new Y()
    `)
    expect(interpreter.exports.y.x).toBe(2)
  })

  it('should call super automatically', () => {
    const interpreter = new Sval()
    interpreter.run(`
      class X {
        constructor() {
          this.x = 2
        }
      }
    
      class Y extends X { }
    
      exports.y = new Y()
    `)
    expect(interpreter.exports.y.x).toBe(2)
  })

  it('should call super class static methods normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      class X {
        static set() {
          return 1
        }
      }
    
      class Y extends X { }
    
      exports.y = Y.set()
    `)
    expect(interpreter.exports.y).toBe(1)
  })

  it('should throw ReferenceError when super() is not called before acessing this', () => {
    const interpreter = new Sval()
    try {
      interpreter.run(`
        class X {
          constructor() {
            this.x = 1
          }
        }
      
        class Y extends X {
          constructor() {
            this.x = 2
            super()
          }
        }
      
        const y = new Y()
      `)
    } catch (err) {
      expect(err).toBeInstanceOf(ReferenceError)
    }
  })

  it('should throw ReferenceError when super() is not called in constructor for derived class', () => {
    const interpreter = new Sval()
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
    } catch (err) {
      expect(err).toBeInstanceOf(ReferenceError)
    }
  })

  it('should throw ReferenceError when super constructor is called multiple times', () => {
    const interpreter = new Sval()
    try {
      interpreter.run(`
        class X {
          constructor() {
            this.x = 1
          }
        }
      
        class Y extends X {
          constructor() {
            super()
            super()
          }
        }
      
        const y = new Y()
      `)
    } catch (err) {
      expect(err).toBeInstanceOf(ReferenceError)
    }
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
    try {
      interpreter.run(`
        const MyClass = class Me {
          getClassName() {
            return Me.name // can get Me
          }
        }

        exports.cls = Me // can't get Me
      `)
    } catch (err) {
      expect(err).toBeInstanceOf(ReferenceError)
    }
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
    try {
      interpreter.run(`
        new Foo()
        class Foo {

        }
      `)
    } catch(err) {
      expect(err).toBeInstanceOf(ReferenceError)
    }
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

    expect(interpreter.exports.result).toBeTruthy()
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
        *[Symbol.iterator]() {
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

    expect(interpreter.exports.target).toEqual(interpreter.exports.actual)
  })

  it('should support property accessing between parent and child class', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      class X {
        constructor() {
          this.x = 5
          this.y = 7
        }

        say() {
          return this.x
        }
      }

      class Y extends X {
        constructor() {
          super()
          this.x = 6
        }

        say() {
          return super.say()
        }

        bark() {
          return this.y
        }
      }

      exports.x = new Y().say()
      exports.y = new Y().bark()
    `)

    // parent reads overrided property
    expect(interpreter.exports.x).toEqual(6);
    // child reads parent property with this
    expect(interpreter.exports.y).toEqual(7);
  })
})
