export interface SvalOptions {
    ecmaVer?: 3 | 5 | 6 | 7 | 8 | 9 | 10 | 2015 | 2016 | 2017 | 2018 | 2019;
    sandBox?: boolean;
    stepLimit?: number;
}
declare class Sval {
    static version: string;
    private options;
    private state;
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
