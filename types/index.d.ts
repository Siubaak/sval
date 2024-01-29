import { ecmaVersion, Node } from 'acorn';
export interface SvalOptions {
    ecmaVer?: ecmaVersion;
    sandBox?: boolean;
}
declare class Sval {
    static version: string;
    private options;
    private scope;
    exports: {
        [name: string]: any;
    };
    constructor(options?: SvalOptions);
    import(nameOrModules: string | {
        [name: string]: any;
    }, mod?: any): void;
    parse(code: string, parser?: (code: string, options: SvalOptions) => Node): Node;
    run(code: string | Node): void;
}
export default Sval;
