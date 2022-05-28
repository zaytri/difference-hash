import sharp from 'sharp'
import { hash } from '../code'

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

const resultHash4 = '4_237926239'
const resultHash12 =
  '12_201990704_2144043615_683871786_137480712_2020237071_2001565575_2087773040_603392045_-228819769'
const resultAlternateDelimiter = '8~1084359154~216662802~482834273~-230848514'

const resultsHash8 = [
  '8_1084359154_216662802_482834273_-230848514', // original
  '8_-1063124502_246030878_1036482337_-264402948',
  '8_1084359154_216662802_482834273_-230848514', // same as original
  '8_1084359162_214565650_482834273_-230848514',
  '8_1119308450_245498642_482834209_-230849538',
  '8_-1063124494_214573842_1019705185_-230849538',
  '8_1084359154_216662802_482834273_-230848514', // same as original
  '8_1063108109_-214565651_-482834274_230832129',
  '8_-1063108110_214565650_482834273_-230848513',
  '8_1084375538_214565650_482834273_-230881282',
  '8_-1063042104_260704799_15949256_2082435326',
  '8_279101950_145886354_902297383_-1066153985',
  '8_1084359154_216662802_482834273_-230848514', // same as original
]

const testString = (fileName: string, result: string, size = 8) =>
  `hash(${fileName}${size === 8 ? '' : `, { size: ${size} }`}) = ${result}`

/* eslint-disable @typescript-eslint/no-non-null-assertion */

test(testString(fileNames[0]!, resultHash4, 4), async () => {
  const hashString = await hash(sharps[0]!, { size: 4 })
  expect(hashString).toBe(resultHash4)
})

test(testString(fileNames[0]!, resultHash12, 12), async () => {
  const hashString = await hash(sharps[0]!, { size: 12 })
  expect(hashString).toBe(resultHash12)
})

test(`hash(${fileNames[0]!}, { delimiter: '~' }) = ${resultAlternateDelimiter}`, async () => {
  const hashString = await hash(sharps[0]!, { delimiter: '~' })
  expect(hashString).toBe(resultAlternateDelimiter)
})

test(testString(fileNames[0]!, resultsHash8[0]!), async () => {
  const hashString = await hash(sharps[0]!)
  expect(hashString).toBe(resultsHash8[0]!)
})

test(testString(fileNames[1]!, resultsHash8[1]!), async () => {
  const hashString = await hash(sharps[1]!)
  expect(hashString).toBe(resultsHash8[1]!)
})

test(testString(fileNames[2]!, resultsHash8[2]!), async () => {
  const hashString = await hash(sharps[2]!)
  expect(hashString).toBe(resultsHash8[2]!)
})

test(testString(fileNames[3]!, resultsHash8[3]!), async () => {
  const hashString = await hash(sharps[3]!)
  expect(hashString).toBe(resultsHash8[3]!)
})

test(testString(fileNames[4]!, resultsHash8[4]!), async () => {
  const hashString = await hash(sharps[4]!)
  expect(hashString).toBe(resultsHash8[4]!)
})

test(testString(fileNames[5]!, resultsHash8[5]!), async () => {
  const hashString = await hash(sharps[5]!)
  expect(hashString).toBe(resultsHash8[5]!)
})

test(testString(fileNames[6]!, resultsHash8[6]!), async () => {
  const hashString = await hash(sharps[6]!)
  expect(hashString).toBe(resultsHash8[6]!)
})

test(testString(fileNames[7]!, resultsHash8[7]!), async () => {
  const hashString = await hash(sharps[7]!)
  expect(hashString).toBe(resultsHash8[7]!)
})

test(testString(fileNames[8]!, resultsHash8[8]!), async () => {
  const hashString = await hash(sharps[8]!)
  expect(hashString).toBe(resultsHash8[8]!)
})

test(testString(fileNames[9]!, resultsHash8[9]!), async () => {
  const hashString = await hash(sharps[9]!)
  expect(hashString).toBe(resultsHash8[9]!)
})

test(testString(fileNames[10]!, resultsHash8[10]!), async () => {
  const hashString = await hash(sharps[10]!)
  expect(hashString).toBe(resultsHash8[10]!)
})

test(testString(fileNames[11]!, resultsHash8[11]!), async () => {
  const hashString = await hash(sharps[11]!)
  expect(hashString).toBe(resultsHash8[11]!)
})

test(testString(fileNames[12]!, resultsHash8[12]!), async () => {
  const hashString = await hash(sharps[12]!)
  expect(hashString).toBe(resultsHash8[12]!)
})

const testDelimiterString = (
  fileName: string,
  delimiter: string,
  success: boolean
) =>
  `hash(${fileName}, { delimiter: '${delimiter}' }) ${
    success ? 'returns successfully' : 'throws Error'
  }`

test(testDelimiterString(fileNames[0]!, '_', true), async () => {
  await expect(hash(sharps[0]!, { delimiter: '_' })).resolves.not.toThrow()
})

test(testDelimiterString(fileNames[0]!, '_-_', true), async () => {
  await expect(hash(sharps[0]!, { delimiter: '_-_' })).resolves.not.toThrow()
})

test(testDelimiterString(fileNames[0]!, '_0_', true), async () => {
  await expect(hash(sharps[0]!, { delimiter: '_0_' })).resolves.not.toThrow()
})

test(testDelimiterString(fileNames[0]!, ' ', true), async () => {
  await expect(hash(sharps[0]!, { delimiter: ' ' })).resolves.not.toThrow()
})

test(testDelimiterString(fileNames[0]!, 'a', true), async () => {
  await expect(hash(sharps[0]!, { delimiter: 'a' })).resolves.not.toThrow()
})

test(testDelimiterString(fileNames[0]!, '-', false), async () => {
  await expect(hash(sharps[0]!, { delimiter: '-' })).rejects.toThrow()
})

test(testDelimiterString(fileNames[0]!, '0', false), async () => {
  await expect(hash(sharps[0]!, { delimiter: '0' })).rejects.toThrow()
})

test(testDelimiterString(fileNames[0]!, '9', false), async () => {
  await expect(hash(sharps[0]!, { delimiter: '9' })).rejects.toThrow()
})

test(testDelimiterString(fileNames[0]!, '-_', false), async () => {
  await expect(hash(sharps[0]!, { delimiter: '-_' })).rejects.toThrow()
})

test(testDelimiterString(fileNames[0]!, '0_', false), async () => {
  await expect(hash(sharps[0]!, { delimiter: '0_' })).rejects.toThrow()
})

test(testDelimiterString(fileNames[0]!, '_-', false), async () => {
  await expect(hash(sharps[0]!, { delimiter: '_-' })).rejects.toThrow()
})

test(testDelimiterString(fileNames[0]!, '_0', false), async () => {
  await expect(hash(sharps[0]!, { delimiter: '_0' })).rejects.toThrow()
})

test(testDelimiterString(fileNames[0]!, '-_-', false), async () => {
  await expect(hash(sharps[0]!, { delimiter: '-_-' })).rejects.toThrow()
})

test(testDelimiterString(fileNames[0]!, '0_0', false), async () => {
  await expect(hash(sharps[0]!, { delimiter: '0_0' })).rejects.toThrow()
})

/* eslint-enable @typescript-eslint/no-non-null-assertion */
