export type Result<S, F> = Success<S> | Failure<F>;

export type Success<T> = {type: "success"; value: T};
export type Failure<T> = {type: "failure"; details: T};

export function success<T>(value: T): Success<T> {
    return {type: "success", value};
}

export function failure<T>(details: T): Failure<T> {
    return {type: "failure", details};
}

export function all<S, F>(results: Array<Result<S, F>>): Result<S[], F> {
    const successes: S[] = [];
    for (const r of results) {
        if (r.type === "success") {
            successes.push(r.value);
        } else {
            return failure(r.details);
        }
    }
    return success(successes);
}
