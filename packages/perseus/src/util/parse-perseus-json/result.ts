export type Result<S, F> = Success<S> | Failure<F>;

export type Success<T> = {type: "success"; value: T};
export type Failure<T> = {type: "failure"; detail: T};

export function success<T>(value: T): Success<T> {
    return {type: "success", value};
}

export function failure<T>(detail: T): Failure<T> {
    return {type: "failure", detail};
}

// Result's `all` function is similar to Promise.all: given an array of
// results, it returns success if all succeeded, and failure if any failed.
export function all<S, F>(results: Array<Result<S, F>>): Result<S[], F> {
    const successes: S[] = [];
    for (const result of results) {
        if (result.type === "success") {
            successes.push(result.value);
        } else {
            return failure(result.detail);
        }
    }
    return success(successes);
}
