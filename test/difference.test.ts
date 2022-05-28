import sharp from 'sharp'
import { difference, hash } from '../code'

const fileNames = [
  'original.png',
  'transparent.png',
  'animated.gif',
  'blur.png',
  'color_shifted.png',
  'compressed.jpg',
  'horizontal_stretch.png',
  'inverted.png',
  'pixelate.png',
  'sepia.png',
  'twist.png',
  'twist2.png',
  'vertical_stretch.png',
]

const sharps = fileNames.map((fileName: string) =>
  sharp(`./test/images/${fileName}`)
)

const testString = (a: string, b: string, asPercentage = false) =>
  `difference(${a}, ${b}${asPercentage ? ', { asPercentage: true }' : ''})`

const testFileString = (a: string, b: string, size = 8) =>
  `${testString(a, b)} using size ${size}`

test(`${testString('1', '1')} = 0`, () => {
  expect(difference('1', '1')).toBe(0)
})

test(`${testString(`4_${~0}`, '4_0')} = 32`, () => {
  expect(difference(`4_${~0}`, '4_0')).toBe(32)
})

test(`${testString(`4_13`, '4_0')} = 3`, () => {
  expect(difference(`4_13`, '4_0')).toBe(3)
})

test(`${testString(`4_1`, '4_0')} = 1`, () => {
  expect(difference(`4_1`, '4_0')).toBe(1)
})

test(`${testString('1', '1', true)} = 0`, () => {
  expect(difference('1', '1', { asPercentage: true })).toBe(0)
})

test(`${testString(`4_${~0}`, '4_0', true)} = 1`, () => {
  expect(difference(`4_${~0}`, '4_0', { asPercentage: true })).toBe(1)
})

test(`${testString(`4_13`, '4_0', true)} = ${3 / 32}`, () => {
  expect(difference(`4_13`, '4_0', { asPercentage: true })).toBe(3 / 32)
})

test(`${testString(`4_1`, '4_0', true)} = ${1 / 32}`, () => {
  expect(difference(`4_1`, '4_0', { asPercentage: true })).toBe(1 / 32)
})

let randomUnsignedInt = 0
for (let i = 0; i < 32; i++) {
  randomUnsignedInt <<= 1
  randomUnsignedInt |= Math.random() < 0.5 ? 0 : 1
}

test(`${testString(
  `4_${randomUnsignedInt}`,
  `4_${randomUnsignedInt}`
)} = 0`, () => {
  expect(difference(`4_${randomUnsignedInt}`, `4_${randomUnsignedInt}`)).toBe(0)
})

/* eslint-disable @typescript-eslint/no-non-null-assertion */

test(`${testFileString(fileNames[0]!, fileNames[1]!)} = 14`, async () => {
  const a = await hash(sharps[0]!)
  const b = await hash(sharps[1]!)
  expect(difference(a, b)).toBe(14)
})

test(`${testFileString(fileNames[0]!, fileNames[1]!, 4)} = 0`, async () => {
  const a = await hash(sharps[0]!, { size: 4 })
  const b = await hash(sharps[1]!, { size: 4 })
  expect(difference(a, b)).toBe(0)
})

test(`${testFileString(fileNames[0]!, fileNames[0]!, 12)} = 0`, async () => {
  const a = await hash(sharps[0]!, { size: 12 })
  const b = await hash(sharps[0]!, { size: 12 })
  expect(difference(a, b)).toBe(0)
})

test(`${testFileString(fileNames[0]!, fileNames[1]!, 12)} = 20`, async () => {
  const a = await hash(sharps[0]!, { size: 12 })
  const b = await hash(sharps[1]!, { size: 12 })
  expect(difference(a, b)).toBe(20)
})

test(`${testFileString(fileNames[0]!, fileNames[2]!, 12)} = 1`, async () => {
  const a = await hash(sharps[0]!, { size: 12 })
  const b = await hash(sharps[2]!, { size: 12 })
  expect(difference(a, b)).toBe(1)
})

test(`${testFileString(fileNames[0]!, fileNames[3]!, 12)} = 7`, async () => {
  const a = await hash(sharps[0]!, { size: 12 })
  const b = await hash(sharps[3]!, { size: 12 })
  expect(difference(a, b)).toBe(7)
})

test(`${testFileString(fileNames[0]!, fileNames[4]!, 12)} = 21`, async () => {
  const a = await hash(sharps[0]!, { size: 12 })
  const b = await hash(sharps[4]!, { size: 12 })
  expect(difference(a, b)).toBe(21)
})

test(`${testFileString(fileNames[0]!, fileNames[5]!, 12)} = 19`, async () => {
  const a = await hash(sharps[0]!, { size: 12 })
  const b = await hash(sharps[5]!, { size: 12 })
  expect(difference(a, b)).toBe(19)
})

test(`${testFileString(fileNames[0]!, fileNames[6]!, 12)} = 2`, async () => {
  const a = await hash(sharps[0]!, { size: 12 })
  const b = await hash(sharps[6]!, { size: 12 })
  expect(difference(a, b)).toBe(2)
})

test(`${testFileString(fileNames[0]!, fileNames[7]!, 12)} = 272`, async () => {
  const a = await hash(sharps[0]!, { size: 12 })
  const b = await hash(sharps[7]!, { size: 12 })
  expect(difference(a, b)).toBe(272)
})

test(`${testFileString(fileNames[0]!, fileNames[8]!, 12)} = 9`, async () => {
  const a = await hash(sharps[0]!, { size: 12 })
  const b = await hash(sharps[8]!, { size: 12 })
  expect(difference(a, b)).toBe(9)
})

test(`${testFileString(fileNames[0]!, fileNames[9]!, 12)} = 5`, async () => {
  const a = await hash(sharps[0]!, { size: 12 })
  const b = await hash(sharps[9]!, { size: 12 })
  expect(difference(a, b)).toBe(5)
})

test(`${testFileString(fileNames[0]!, fileNames[10]!, 12)} = 114`, async () => {
  const a = await hash(sharps[0]!, { size: 12 })
  const b = await hash(sharps[10]!, { size: 12 })
  expect(difference(a, b)).toBe(114)
})

test(`${testFileString(fileNames[0]!, fileNames[11]!, 12)} = 103`, async () => {
  const a = await hash(sharps[0]!, { size: 12 })
  const b = await hash(sharps[11]!, { size: 12 })
  expect(difference(a, b)).toBe(103)
})

test(`${testFileString(fileNames[0]!, fileNames[12]!, 12)} = 15`, async () => {
  const a = await hash(sharps[0]!, { size: 12 })
  const b = await hash(sharps[12]!, { size: 12 })
  expect(difference(a, b)).toBe(15)
})

/* eslint-enable @typescript-eslint/no-non-null-assertion */

test(`difference('1', '1', { delimiter: '_' }) returns successfully`, () => {
  expect(() => difference('1', '1', { delimiter: '_' })).not.toThrow()
})

test(`difference('1', '1', { delimiter: '_-_' }) returns successfully`, () => {
  expect(() => difference('1', '1', { delimiter: '_-_' })).not.toThrow()
})

test(`difference('1', '1', { delimiter: '_0_' }) returns successfully`, () => {
  expect(() => difference('1', '1', { delimiter: '_0_' })).not.toThrow()
})

test(`difference('1', '1', { delimiter: ' ' }) returns successfully`, () => {
  expect(() => difference('1', '1', { delimiter: ' ' })).not.toThrow()
})

test(`difference('1', '1', { delimiter: 'a' }) returns successfully`, () => {
  expect(() => difference('1', '1', { delimiter: 'a' })).not.toThrow()
})

test(`difference('1', '1', { delimiter: '0' }) throws Error`, () => {
  expect(() => difference('1', '1', { delimiter: '0' })).toThrow()
})

test(`difference('1', '1', { delimiter: '-' }) throws Error`, () => {
  expect(() => difference('1', '1', { delimiter: '-' })).toThrow()
})

test(`difference('1', '1', { delimiter: '_0' }) throws Error`, () => {
  expect(() => difference('1', '1', { delimiter: '_0' })).toThrow()
})

test(`difference('1', '1', { delimiter: '_-' }) throws Error`, () => {
  expect(() => difference('1', '1', { delimiter: '_-' })).toThrow()
})

test(`difference('1', '1', { delimiter: '0_' }) throws Error`, () => {
  expect(() => difference('1', '1', { delimiter: '0_' })).toThrow()
})

test(`difference('1', '1', { delimiter: '-_' }) throws Error`, () => {
  expect(() => difference('1', '1', { delimiter: '-_' })).toThrow()
})

test(`difference('1', '1', { delimiter: '0_0' }) throws Error`, () => {
  expect(() => difference('1', '1', { delimiter: '0_0' })).toThrow()
})

test(`difference('1', '1', { delimiter: '-_-' }) throws Error`, () => {
  expect(() => difference('1', '1', { delimiter: '-_-' })).toThrow()
})

test(`difference('1_1', '1' }) throws Error`, () => {
  expect(() => difference('1_1', '1')).toThrow()
})

test(`difference('1_1', '1_1' }) throws Error`, () => {
  expect(() => difference('1', '1_1')).toThrow()
})

test(`difference('', '1' }) throws Error`, () => {
  expect(() => difference('', '1')).toThrow()
})

test(`difference('1', '' }) throws Error`, () => {
  expect(() => difference('1', '')).toThrow()
})

test(`difference('', '' }) throws Error`, () => {
  expect(() => difference('', '')).toThrow()
})

test(`difference('1', '2' }) throws Error`, () => {
  expect(() => difference('1', '2')).toThrow()
})

test(`difference('10', '1' }) throws Error`, () => {
  expect(() => difference('10', '1')).toThrow()
})

test(`difference('1_test', '1_1' }) throws Error`, () => {
  expect(() => difference('1_test', '1_1')).toThrow()
})

test(`difference('1_1', '1_test' }) throws Error`, () => {
  expect(() => difference('1_1', '1_test')).toThrow()
})
