import { createSymbol } from './util'

export const AWAIT: { RES: any } = { RES: undefined }

export const RETURN: { RES: any } = { RES: undefined }

export const CONTINUE = createSymbol('continue')

export const BREAK = createSymbol('break')

export const SUPER = createSymbol('super')

export const SUPERCALL = createSymbol('supercall') // whether call super

export const NOCTOR = createSymbol('noctor') // not constructor

export const CLSCTOR = createSymbol('clsctor') // class constructor

export const NEWTARGET = createSymbol('newtarget') // new.target

export const PRIVATE = createSymbol('private') // private props

export const NOINIT = createSymbol('noinit')

export const DEADZONE = createSymbol('deadzone')