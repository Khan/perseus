// See the tests for an explanation of why we need this.
const objectConstructorString = Object.prototype.constructor.toString();

const functionToString = Function.prototype.toString;

/**
 * Checks whether a value is a plain JS object (e.g. one constructed with `{}`
 * literal syntax or `Object.create(null)`. Returns true given a plain object
 * from another realm.
 *
 * @param x - the value to check for objectiness
 */
export function isPlainObject(x: unknown): x is Record<keyof any, unknown> {
    if (x == null) {
        return false;
    }
    const prototype = Object.getPrototypeOf(x);
    if (prototype == null) {
        return true;
    }
    return (
        typeof prototype.constructor === "function" &&
        functionToString.call(prototype.constructor) === objectConstructorString
    );
}
