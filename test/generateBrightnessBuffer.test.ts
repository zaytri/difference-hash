import sharp from 'sharp'
import { generateBrightnessBuffer } from '../code'

const opaquePath = './test/images/original.png'
const transparentPath = './test/images/transparent.png'

const opaqueArray = [
  255, 203, 157, 244, 255, 233, 156, 165, 196, 225, 185, 139, 168, 157, 169,
  224, 211, 174, 192, 233, 255, 213, 186, 248, 253,
]

const transparentArray = [
  255, 206, 157, 247, 255, 236, 156, 164, 199, 228, 185, 140, 168, 157, 169,
  223, 211, 173, 194, 234, 255, 213, 186, 249, 254,
]

const testString = (image: string, size: number) =>
  `generateBrightnessBuffer(sharp(${image}), ${size})`

test(`${testString(opaquePath, 4)} = [${opaqueArray}]`, async () => {
  const buffer = await generateBrightnessBuffer(sharp(opaquePath), 4)
  expect(buffer.toJSON().data).toEqual(opaqueArray)
})

test(`${testString(transparentPath, 4)} = [${transparentArray}]`, async () => {
  const buffer = await generateBrightnessBuffer(sharp(transparentPath), 4)
  expect(buffer.toJSON().data).toEqual(transparentArray)
})
