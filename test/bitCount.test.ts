import { bitCount } from '../code'

test('bitCount(0) = 0', () => {
  expect(bitCount(0)).toBe(0)
})

test('bitCount(~0) = 32', () => {
  expect(bitCount(~0)).toBe(32)
})

test('bitCount(13) = 3', () => {
  expect(bitCount(13)).toBe(3)
})
