export function isObject(x: unknown): x is Record<keyof any, unknown> {
    return x != null && Object.getPrototypeOf(x) === Object.prototype;
}
