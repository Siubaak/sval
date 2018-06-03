import { createSymbol } from './util'

export const BREAK = {}

export const CONTINUE = {}

export const RETURN: { RES: any } = { RES: undefined }

export const SUPER = createSymbol('super')