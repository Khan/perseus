import invariant from "tiny-invariant";

export type Result<S, F> = Success<S> | Failure<F>;

export type Success<T> = {type: "success"; value: T};
export type Failure<T> = {type: "failure"; detail: T};

export function success<T>(value: T): Success<T> {
    return {type: "success", value};
}

export function failure<T>(detail: T): Failure<T> {
    return {type: "failure", detail};
}

export function isFailure<S, F>(result: Result<S, F>): result is Failure<F> {
    return result.type === "failure";
}

export function isSuccess<S, F>(result: Result<S, F>): result is Success<S> {
    return result.type === "success";
}

export function assertFailure<S, F>(
    result: Result<S, F>,
): asserts result is Failure<F> {
    invariant(
        isFailure(result),
        "expected result to be a Failure, but got a Success",
    );
}

export function assertSuccess<S, F>(
    result: Result<S, F>,
): asserts result is Success<S> {
    invariant(
        isSuccess(result),
        "expected result to be a Success, but got a Failure",
    );
}

/**
 * @returns a function that transforms the `detail` value of any Failure result
 * passed to it, and leaves Success results unchanged. `mapFailure` is curried
 * for easy composition with Array.map(), mu-lambda's pipe(), etc.
 * @param f the function to apply to Failure `detail`s.
 */
export function mapFailure<S, DetailIn, DetailOut>(
    f: (detail: DetailIn) => DetailOut,
): (result: Result<S, DetailIn>) => Result<S, DetailOut> {
    return (result) => {
        if (isFailure(result)) {
            return failure(f(result.detail));
        }
        return result;
    };
}

// Result's `all` function is similar to Promise.all: given an array of
// results, it returns success if all succeeded, and failure if any failed.
export function all<S, F>(
    results: Array<Result<S, F>>,
    combineFailureDetails: (a: F, b: F) => F = (a) => a,
): Result<S[], F> {
    const values: S[] = [];
    const failureDetails: F[] = [];
    for (const result of results) {
        if (result.type === "success") {
            // TODO(LEMS-3083): Remove eslint suppression
            // eslint-disable-next-line functional/immutable-data
            values.push(result.value);
        } else {
            // TODO(LEMS-3083): Remove eslint suppression
            // eslint-disable-next-line functional/immutable-data
            failureDetails.push(result.detail);
        }
    }

    if (failureDetails.length > 0) {
        return failure(failureDetails.reduce(combineFailureDetails));
    }
    return success(values);
}
