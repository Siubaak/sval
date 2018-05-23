export declare const freeze: {
    <T>(a: T[]): ReadonlyArray<T>;
    <T extends Function>(f: T): T;
    <T>(o: T): Readonly<T>;
};
export declare const define: {
    (o: any, p: string, attributes: PropertyDescriptor & ThisType<any>): any;
    (o: any, propertyKey: PropertyKey, attributes: PropertyDescriptor): any;
};
export declare function hasOwn(obj: any, key: string): boolean;
export declare function getOwnNames(obj: any): string[];
export declare const assign: {
    <T, U>(target: T, source: U): T & U;
    <T, U, V>(target: T, source1: U, source2: V): T & U & V;
    <T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
    (target: object, ...sources: any[]): any;
};
export declare function createSandBox(): Window;
export declare const walk: any;
