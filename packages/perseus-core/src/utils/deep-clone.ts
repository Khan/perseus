// TODO(benchristel): in the future, we may want to make deepClone work for
// Record<string, Cloneable> as well. Currently, it only does arrays.
type Cloneable =
    | null
    | undefined
    | boolean
    | string
    | number
    | Cloneable[]
    | readonly Cloneable[];
function deepClone<T extends Cloneable>(obj: T): T {
    if (Array.isArray(obj)) {
        return obj.map(deepClone) as T;
    }
    return obj;
}

export default deepClone;
