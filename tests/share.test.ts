import { _assign } from '../src/share/util'


describe('testing src/share/util.ts', () => {
  it('_assign should behavior correctly', () => {
    const actual = (_assign as any)({a: 3, c: 5}, { a: 5 }, { b: 4 });
    const expected = Object.assign({a: 3, c: 5}, { a: 5 }, { b: 4 });

    expect(actual).toEqual(expected)
  })
})
