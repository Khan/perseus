// See the tests for an explanation of why we need this.
const objectConstructorString = Object.prototype.constructor.toString();

export function isObject(x: unknown): x is Record<keyof any, unknown> {
    if (x == null) {
        return false;
    }
    const prototype = Object.getPrototypeOf(x);
    if (prototype == null) {
        return true;
    }
    return String(prototype.constructor) === objectConstructorString;
}
