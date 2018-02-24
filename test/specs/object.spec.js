'use strict'

import { equals, isScalar, merge } from '@/lib/object'

/* global describe it expect */

describe('lib/object', () => {
  describe('equals(o1, o2)', () => {
    it('should return false for inputs with not equal keys length', () => {
      const o1 = { a: 1 }
      const o2 = { a: 1, b: 2 }

      expect(equals(o1, o2)).toEqual(false)
    })

    it('should return false for different inputs with equal keys length', () => {
      const o1 = { a: 1, b: 3 }
      const o2 = { a: 1, b: 2 }

      expect(equals(o1, o2)).toEqual(false)
    })

    it('should return true for different inputs with equal ordered keys', () => {
      const o1 = { a: 1, b: 3 }
      const o2 = { a: 1, b: 3 }

      expect(equals(o1, o2)).toEqual(true)
    })

    it('should return true for different inputs with equal non ordered keys', () => {
      const o1 = { a: 1, b: 3 }
      const o2 = { b: 3, a: 1 }

      expect(equals(o1, o2)).toEqual(true)
    })

    it('should return true for empty inputs', () => {
      const o1 = {}
      const o2 = {}

      expect(equals(o1, o2)).toEqual(true)
    })
  })

  describe('isScalar(value)', () => {
    ['hello', 123, true, undefined, null, () => {}].forEach((value) => {
      it(`should return true for '${value}' as scalar value`, () => {
        expect(isScalar(value)).toBe(true)
      })
    });

    [{}, []].forEach((value) => {
      it(`should return false for '${JSON.stringify(value)}' as non scalar value`, () => {
        expect(isScalar(value)).toBe(false)
      })
    })
  })

  describe('merge(dest, src)', () => {
    it('should successfully merge src object to the dest object', () => {
      const src = { a: 1, c: 2, e: { x: 1 }, d: [1], f: { g: 1 } }
      const dest = { a: 0, b: 1, e: { y: 2 }, d: [2, 3] }
      const expected = { a: 1, b: 1, c: 2, e: { x: 1, y: 2 }, d: [1], f: { g: 1 } }

      merge(dest, src)

      expect(dest).toEqual(expected)
    })
  })
})
