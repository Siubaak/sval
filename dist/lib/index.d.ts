export interface SvalOptions {
    ecmaVer?: 3 | 5 | 6 | 7 | 8 | 2015 | 2016 | 2017;
    sandBox?: boolean;
}
declare class Sval {
    private options;
    private scope;
    constructor(options?: SvalOptions);
    addModules(modules: {
        [name: string]: any;
    }): void;
    run(input: string): void;
}
export default Sval;
