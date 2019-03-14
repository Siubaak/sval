export interface SvalOptions {
    ecmaVer?: 3 | 5 | 6 | 7 | 8 | 2015 | 2016 | 2017;
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
    run(code: string): void;
}
export default Sval;
