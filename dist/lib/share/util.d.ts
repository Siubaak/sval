export declare const freeze: {
    <T>(a: T[]): ReadonlyArray<T>;
    <T extends Function>(f: T): T;
    <T>(o: T): Readonly<T>;
};
export declare const define: (o: any, p: string | number | symbol, attributes: PropertyDescriptor & ThisType<any>) => any;
export declare const getDptor: (o: any, p: string | number | symbol) => PropertyDescriptor;
export declare function hasOwn(obj: any, key: symbol | string): boolean;
export declare function getOwnNames(obj: any): string[];
export declare function getProto(obj: any): any;
export declare function getGetter(obj: any, key: string): (() => any) | ((v: any) => void);
export declare function getSetter(obj: any, key: string): (() => any) | ((v: any) => void);
export declare function inherits(subClass: (...args: any[]) => any, superClass: (...args: any[]) => any): void;
export declare const assign: {
    <T, U>(target: T, source: U): T & U;
    <T, U, V>(target: T, source1: U, source2: V): T & U & V;
    <T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
    (target: object, ...sources: any[]): any;
};
export declare function createSandBox(): Window;
export declare function createSymbol(key: string): string | symbol;
export declare function runGenerator(generator: (...args: any[]) => IterableIterator<any>, ...args: any[]): any;
export declare function runAsync(generator: (...args: any[]) => IterableIterator<any>, ...args: any[]): Promise<any>;
