export default class SymbolTable {
	private table: any = Object.create(null)
	private pointer: number = 0
	private readonly tableChain: any[] = []
	private readonly pointerChain: number[] = []

	set(name: string) {
		return this.table[name] = this.pointer++
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