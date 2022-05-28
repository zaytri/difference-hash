import sharp from 'sharp'
import type { Sharp } from 'sharp'

const DEFAULT_DELIMITER = '_'
const DEFAULT_SIZE = 8

interface DHashOptions {
  size?: number
  delimiter?: string
}

interface DHashDifferenceOptions {
  asPercentage?: boolean
  delimiter?: string
}

export async function hash(
  image: Sharp,
  options: DHashOptions = {}
): Promise<string> {
  const { size = DEFAULT_SIZE, delimiter = DEFAULT_DELIMITER } = options

  if (delimiter.match(/^[-\d]|[-\d]$/)) {
    throw new Error(
      `Difference hash delimiter may not start or end with hyphen (-) or number.`
    )
  }

  const buffer = await generateBrightnessBuffer(image, size)
  const hashArray = generateHashArray(buffer, size)

  return [size, ...hashArray].join(delimiter)
}

export function difference(
  a: string,
  b: string,
  options: DHashDifferenceOptions = {}
): number {
  const { delimiter = DEFAULT_DELIMITER, asPercentage = false } = options

  if (delimiter.match(/^[-\d]|[-\d]$/)) {
    throw new Error(
      `Difference hash delimiter may not start or end with hyphen (-) or number.`
    )
  }

  const aHashes = a.split(delimiter)
  const bHashes = b.split(delimiter)
  const hashCount = aHashes.length

  if (bHashes.length !== hashCount) {
    throw new Error(
      `The given difference hashes have incompatible lengths. Difference hashes are composed of 32-bit integers, separated by the specified delimiter, or by ${DEFAULT_DELIMITER} if not specified.`
    )
  }

  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const aSize = parseInt(aHashes[0]!)
  const bSize = parseInt(bHashes[0]!)
  /* eslint-enable @typescript-eslint/no-non-null-assertion */

  if (isNaN(aSize)) {
    throw new Error(`${aSize} is not a valid difference hash size.`)
  }

  if (isNaN(bSize)) {
    throw new Error(`${bSize} is not a valid difference hash size.`)
  }

  if (aSize !== bSize) {
    throw new Error(
      `${aSize} is not equal to ${bSize}. The first value of a difference hash indicates the hash size, and the difference may only be calculated between hashes of the same size.`
    )
  }

  const size = aSize

  let difference = 0
  for (let i = 1; i < hashCount; i++) {
    const aHashString = aHashes[i]
    const bHashString = bHashes[i]

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const aHash = parseInt(aHashes[i]!)
    const bHash = parseInt(bHashes[i]!)
    /* eslint-enable @typescript-eslint/no-non-null-assertion */

    if (isNaN(aHash)) {
      throw new Error(
        `${aHashString} is not a valid difference hash. Difference hashes are composed of a 32-bit integer.`
      )
    }

    if (isNaN(bHash)) {
      throw new Error(
        `${bHashString} is not a valid difference hash. Difference hashes are composed of a 32-bit integer.`
      )
    }

    const differenceBits = aHash ^ bHash
    difference += bitCount(differenceBits)
  }

  if (asPercentage) return difference / (size * size * 2)

  return difference
}

export async function generateBrightnessBuffer(
  image: Sharp,
  size: number
): Promise<Buffer> {
  const width = size + 1

  return (
    image
      // layer on top of a white background to remove alpha
      .flatten({ background: 'white' })
      // average the colors
      .grayscale()
      // resize down to a 9x9 image
      .resize({
        width,
        height: width,
        fit: sharp.fit.fill,
      })
      // grayscale makes all channels the same, so only 1 channel is needed
      .extractChannel(0)
      // only pixel data
      .raw()
      // array of pixel brightness values
      .toBuffer()
  )
}

export function generateHashArray(buffer: Buffer, size: number): number[] {
  const width = size + 1

  if (buffer.length !== width * width) {
    throw new Error(
      `Buffer passed into generateHashArray has the wrong length. Expected ${
        width * width
      } but found ${buffer.length}.`
    )
  }

  const hashes: number[] = []

  for (let y = 0, bitCount = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const pixelIndex = y * width + x
      const hashIndex = Math.floor(bitCount / 32)

      const currentPixelBrightness = buffer[pixelIndex]
      const nextXPixelBrightness = buffer[pixelIndex + 1]
      const nextYPixelBrightness = buffer[pixelIndex + width]

      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      const nextXBrighter = currentPixelBrightness! < nextXPixelBrightness!
      const nextYBrighter = currentPixelBrightness! < nextYPixelBrightness!
      /* eslint-enable @typescript-eslint/no-non-null-assertion */

      // shift bits to make room for 2 more
      hashes[hashIndex] <<= 2
      // set second to last bit
      if (nextXBrighter) hashes[hashIndex] |= 2
      // set last bit
      if (nextYBrighter) hashes[hashIndex] |= 1

      bitCount += 2
    }
  }

  return hashes
}

// extremely efficient method of counting bits in a 32-bit integer in 12 operations
// source: https://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetParallel
export function bitCount(n: number) {
  n = n - ((n >> 1) & 0x55555555)
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333)
  return (((n + (n >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24
}
