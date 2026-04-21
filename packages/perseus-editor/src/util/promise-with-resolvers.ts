import invariant from "tiny-invariant";

export function promiseWithResolvers<T>(): {promise: Promise<T>, resolve: (value: T) => void, reject: (error: unknown) => void} {
    let resolve: ((value: T) => void) | undefined = undefined;
    let reject: ((error: unknown) => void) | undefined = undefined;
    const promise = new Promise<T>((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    })
    invariant(resolve, "Promise constructor callback was not called synchronously or did not receive resolve function");
    invariant(reject, "Promise constructor callback was not called synchronously or did not receive reject function");
    return {promise, resolve, reject}
}
