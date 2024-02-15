import { Options, Node } from 'acorn';
declare namespace Sval {
    interface SvalOptions {
        ecmaVer?: Options['ecmaVersion'];
        sourceType?: Options['sourceType'];
        sandBox?: boolean;
    }
}
declare class Sval {
    static version: string;
    private options;
    private scope;
    exports: Record<string, any>;
    constructor(options?: Sval.SvalOptions);
    import(nameOrModules: string | Record<string, any>, mod?: any): void;
    parse(code: string, parser?: (code: string, options: Sval.SvalOptions) => Node): Node;
    run(code: string | Node): void;
}
export = Sval;
