interface Lens<T> {
    freeze(): T
    get(path: ReadonlyArray<string | number>): any
    set(path: ReadonlyArray<string | number>, value: any): Lens<any>
}

export function lens<T>(object: T): Lens<T> {
    return {
        freeze() {
            return object;
        },
        get(path) {
            return path.reduce((found, prop) => found[prop], object);
        },
        set(path, value) {
            return lens(set(path, value, object))
        },
    }
}

function set(path: (number | string)[], newValue: any, object: any) {
    if (path.length === 0) {
        return newValue
    }

    const [prop, ...tail] = path
    if (Array.isArray(object)) {
        return object.map((elem, i) => i === prop ? newValue : elem)
    } else {
        return {...object, [prop]: set(tail, newValue, object[prop])}
    }
}

function tail<T>(a: T[]): T[] {
    return a.slice(1)
}
