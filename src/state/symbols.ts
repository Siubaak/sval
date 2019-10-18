import { hasOwn } from '../share/utils'

type VarType = 'var' | 'let' | 'const'

interface VarSymbol {
	type: VarType
	pointer: number
}

interface SymbolMap {
	[name: string]: VarSymbol
}

export default class SymbolTable {
	private table: SymbolMap = Object.create(null)
	private pointer: number = 0
	private readonly tableChain: SymbolMap[] = []
	private readonly pointerChain: number[] = []

	readonly globalVarName: { [pointer: number]: string } = {}

	type: VarType = null
	hoist: boolean = false

	set(name: string, type: VarType = this.type): VarSymbol {
		if (this.hoist) {
			// just hoisting variable
			if (hasOwn(this.table, name)) {
				const variable = this.table[name]
				// allow multiple declarations of var
				if (variable.type !== 'var' || type !== 'var') {
					throw new SyntaxError(`Identifier '${name}' has already been declared`)
				}
			} else if (type === 'var') {
				const pointer = this.pointer++
				// if hoisting var, directly allocate a new pointer
				this.table[name] = { type: type, pointer }
				// save names for all top scope var declaration
				if (!this.tableChain.length) {
					this.globalVarName[pointer] = name
				}
			} else {
				this.table[name] = null
			}
		} else if (type === 'var' && this.table[name]) {
			// has allocated for var when hoisting, just return
			return this.table[name]
		} else { // type === 'const' || type === 'let'
			// real declaration, allocate a new pointer for const and let
			return this.table[name] = { type: type, pointer: this.pointer++ }
		}
	}

	get(name: string) {
		if (this.table[name]) {
			return this.table[name]
		} else {
			throw new ReferenceError(`${name} is not defined`)
		}
	}

	pushScope() {
		this.tableChain.push(this.table)
		this.pointerChain.push(this.pointer)
		this.table = Object.create(this.table)
	}

	popScope() {
		this.table = this.tableChain.pop()
		this.pointer = this.pointerChain.pop()
	}
}