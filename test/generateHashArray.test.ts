import { generateHashArray } from '../code'

const rows = [
  [0, 0, 1, 1, 1],
  [0, 1, 1, 3, 4],
  [0, 1, 6, 6, 7],
  [7, 7, 7, 7, 9],
  [8, 7, 7, 8, 9],
]

const result = 831518531

const rows2 = [...rows]
rows2.shift()

const rows3 = [
  [0, 0],
  [0, 0],
]

const rows4 = [
  [1, 1],
  [1, 1],
]

const rows5 = [
  [0, 1],
  [1, 0],
]

const rows6 = [
  [0, 1],
  [0, 1],
]

const rows7 = [
  [0, 0],
  [1, 1],
]

const testString = (array: number[][], size: number) =>
  `generateHashArray(Buffer.from([\n${' '.repeat(6)}${array.reduce(
    (acc, value, index) => {
      return `${acc}${value.join(', ')}${
        index != array.length - 1 ? `,\n${' '.repeat(6)}` : ''
      }`
    },
    ''
  )},\n${' '.repeat(4)}]), ${size})`

const createBuffer = (array: number[][]) => Buffer.from(array.flat())

test(`${testString(rows, 4)} = [${result}]`, () => {
  expect(generateHashArray(createBuffer(rows), 4)).toEqual([result])
})

test(`${testString(rows2, 4)} throws Error`, () => {
  expect(() => generateHashArray(createBuffer(rows2), 4)).toThrow()
})

test(`${testString(rows3, 1)} = [0]`, () => {
  expect(generateHashArray(createBuffer(rows3), 1)).toEqual([0])
})

test(`${testString(rows4, 1)} = [0]`, () => {
  expect(generateHashArray(createBuffer(rows4), 1)).toEqual([0])
})

test(`${testString(rows5, 1)} = [3]`, () => {
  expect(generateHashArray(createBuffer(rows5), 1)).toEqual([3])
})

test(`${testString(rows6, 1)} = [2]`, () => {
  expect(generateHashArray(createBuffer(rows6), 1)).toEqual([2])
})

test(`${testString(rows7, 1)} = [1]`, () => {
  expect(generateHashArray(createBuffer(rows7), 1)).toEqual([1])
})

test(`generateHashArray(Buffer.from([])) throws Error`, () => {
  expect(() => generateHashArray(createBuffer([]), 8)).toThrow()
})
