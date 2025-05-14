import * as fs from "fs";
import {tmpdir} from "os";
import {join} from "path";
import {Worker} from "worker_threads";

import {isPlainObject} from "./is-plain-object";

describe("isPlainObject", () => {
    it("is true for a POJO", () => {
        expect(isPlainObject({})).toBe(true);
    });

    it("is false for an array", () => {
        expect(isPlainObject([])).toBe(false);
    });

    it("is false for a class instance", () => {
        // Even if our class is named Object, it's not the same as the global
        // Object.
        class Object {}
        expect(isPlainObject(new Object())).toBe(false);
    });

    it("is false for null", () => {
        expect(isPlainObject(null)).toBe(false);
    });

    it("is false for a RegExp", () => {
        expect(isPlainObject(/a/)).toBe(false);
    });

    it("is false for a string", () => {
        expect(isPlainObject("")).toBe(false);
    });

    it("is false for undefined", () => {
        expect(isPlainObject(undefined)).toBe(false);
    });

    it("is true for an object without a prototype", () => {
        // This is the same behavior as JQuery's `isPlainObject`
        expect(isPlainObject(Object.create(null))).toBe(true);
    });

    it("is false for an object whose prototype has its own constructor property", () => {
        expect(isPlainObject(Object.create({constructor: null}))).toBe(false);
    });

    it("is false for an object trying to spoof the Object prototype", () => {
        const weirdObject = Object.create({
            constructor: Object.prototype.constructor.toString(),
        });
        expect(isPlainObject(weirdObject)).toBe(false);
    });

    it("is false for an object whose constructor has a bogus toString property", () => {
        function constructor() {}
        constructor.toString = null;
        expect(isPlainObject(Object.create({constructor}))).toBe(false);
    });

    it("is true for a cross-realm POJO", async () => {
        const crossRealmObject: any = await getCrossRealmObject({
            fromWorker: true,
        });
        expect(crossRealmObject.fromWorker).toBe(true);
        expect(isPlainObject(crossRealmObject)).toBe(true);
    });

    it("is false for a cross-realm array", async () => {
        const crossRealmObject: any = await getCrossRealmObject([42]);
        expect(crossRealmObject[0]).toBe(42);
        expect(isPlainObject(crossRealmObject)).toBe(false);
    });
});

async function getCrossRealmObject(value: object): Promise<unknown> {
    // In JS, a "realm" is the environment that contains mutable "global"
    // objects, like `Object` and `Array`. On the web, every browser tab and
    // cross-origin iframe has its own realm. This is for security: you
    // wouldn't want code in a third-party iframe to modify your globals!
    //
    // The fact that "primordial" classes like Object are realm-specific means
    // that plain JS objects constructed in different realms have *different*
    // prototypes and *different* constructors. This leads to surprising
    // behavior when using `instanceof` checks or comparing prototypes /
    // constructors directly with ===. An object from another realm is not an
    // `instanceof` your `Object` class — even if it appears to be a normal
    // `Object` in every other way! Nor does it share a prototype or
    // constructor with your `Object`.
    //
    // This behavior usually isn't desirable. We'd like to have a way of
    // checking if something's an object that works across realms. The usual
    // way of doing it (see JQuery's isPlainObject function) is to call
    // `toString` on the value's constructor. In most (all?) JS runtimes, the
    // result will look like this: `function Object() { [native code] }`.
    // That's both Object-specific and impossible to spoof (due to the
    // `[native code]` part), and is the same no matter which realm the
    // constructor came from.
    //
    // To get a cross-realm object in NodeJS, we can create a worker thread
    // and have it send us an object.

    const tmpDir = fs.mkdtempSync(join(tmpdir(), "isObject-test"));
    const workerScript = `
            const {parentPort} = require("worker_threads");
            parentPort.postMessage(${JSON.stringify(value)});
        `;
    const workerScriptPath = join(tmpDir, "worker.js");
    fs.writeFileSync(workerScriptPath, workerScript, "utf-8");
    const worker = new Worker(workerScriptPath);

    // Act: get the object sent by the worker thread via postMessage
    return await new Promise((resolve, reject) => {
        worker.on("message", resolve);
        worker.on("error", reject);
    });
}
