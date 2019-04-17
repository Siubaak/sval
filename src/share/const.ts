import { createSymbol } from './util'

export const AWAIT: { RES: any } = { RES: undefined }

export const RETURN: { RES: any } = { RES: undefined }

export const CONTINUE = createSymbol('continue')

export const BREAK = createSymbol('break')

export const SUPER = createSymbol('super')

export const NOCTOR = createSymbol('noctor') // not constructor

export const NOINIT = createSymbol('noinit')