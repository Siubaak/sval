export declare const freeze: {
    <T extends Function>(f: T): T;
    <T extends {
        [idx: string]: U | null | undefined | object;
    }, U extends string | bigint | number | boolean | symbol>(o: T): Readonly<T>;
    <T>(o: T): Readonly<T>;
};
export declare const define: <T>(o: T, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>) => T;
export declare const getDptor: (o: any, p: PropertyKey) => PropertyDescriptor | undefined;
export declare function hasOwn(obj: any, key: string): boolean;
export declare const getOwnNames: (o: any) => string[];
export declare function setProto(obj: any, proto: any): void;
export declare function getProto(obj: any): any;
export declare function getGetter(obj: any, key: string): (() => any) | ((v: any) => void);
export declare function getSetter(obj: any, key: string): (() => any) | ((v: any) => void);
export declare const create: {
    (o: object | null): any;
    (o: object | null, properties: PropertyDescriptorMap & ThisType<any>): any;
};
export declare function inherits(subClass: (...args: any[]) => any, superClass: (...args: any[]) => any): void;
export declare function callSuper(target: any, superClass: (...args: any[]) => any, args?: any[]): any;
export declare function _assign(target: any): any;
export declare const assign: {
    <T extends {}, U>(target: T, source: U): T & U;
    <T extends {}, U, V>(target: T, source1: U, source2: V): T & U & V;
    <T extends {}, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
    (target: object, ...sources: any[]): any;
};
export declare let globalObj: any;
export declare const WINDOW: string;
export declare function createSandBox(): any;
export declare function createSymbol(key: string): string;
export declare function getAsyncIterator(obj: any): any;
