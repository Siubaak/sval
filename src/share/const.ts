import { createSymbol } from './util'

export const BREAK = {}

export const CONTINUE = {}

export const RETURN: { RES: any } = { RES: undefined }

export const SUPER = createSymbol('super')

export const ASYNC = createSymbol('async')

export const NOINIT = createSymbol('noinit')