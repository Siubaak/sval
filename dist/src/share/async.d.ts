export interface runAsyncOptions {
    res?: any;
    err?: any;
    ret?: any;
    fullRet?: boolean;
}
export declare function runAsync(iterator: IterableIterator<any>, options?: runAsyncOptions): Promise<any>;
