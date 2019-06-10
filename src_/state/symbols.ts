import { hasOwn } from '../share/util'

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

	set(type: VarType, name: string) {
		if (hasOwn(this.table, name)) {
			throw new SyntaxError(`Identifier '${name}' has already been declared`)
		} else {
			return this.table[name] = { type, pointer: this.pointer++ }
		}
	}

	get(name: string) {
		if (name in this.table) {
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