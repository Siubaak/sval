import { Modules } from './module';
import { GlobalOptions } from './share/option';
declare class Sval {
    private runOptions;
    private scope;
    constructor(options: GlobalOptions);
    addModules(modules: Modules): void;
    run(input: string): void;
}
export default Sval;
