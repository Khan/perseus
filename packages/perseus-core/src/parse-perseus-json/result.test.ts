import * as Result from "./result";
import {
    assertFailure,
    assertSuccess,
    failure,
    mapFailure,
    success,
} from "./result";

describe("Result.all", () => {
    it("returns success given an empty array", () => {
        expect(Result.all([])).toEqual(Result.success([]));
    });

    it("inverts a single success", () => {
        const successes = [Result.success(42)];
        expect(Result.all(successes)).toEqual(Result.success([42]));
    });

    it("consolidates multiple successes", () => {
        const successes = [Result.success(42), Result.success(3)];
        expect(Result.all(successes)).toEqual(Result.success([42, 3]));
    });

    it("returns a single failure", () => {
        const failures = [Result.failure("uh oh")];
        expect(Result.all(failures)).toEqual(Result.failure("uh oh"));
    });

    it("returns the first of several failures", () => {
        const failures = [Result.failure("oops"), Result.failure("uh oh")];
        expect(Result.all(failures)).toEqual(Result.failure("oops"));
    });

    it("ignores successes if there are failures", () => {
        const failures = [
            Result.success(42),
            Result.failure("uh oh"),
            Result.success(3),
        ];
        expect(Result.all(failures)).toEqual(Result.failure("uh oh"));
    });
});

describe("Result.assertFailure", () => {
    it("doesn't throw given a failure", () => {
        expect(() => assertFailure(failure(42))).not.toThrow();
    });

    it("throws given a success", () => {
        expect(() => assertFailure(success(42))).toThrow(
            "Invariant failed: expected result to be a Failure, but got a Success",
        );
    });

    it("narrows types", () => {
        const result = failure(42) as Result.Result<number, number>;
        // @ts-expect-error - Property 'detail' does not exist on type 'Success'
        expect(result.detail).toBe(42);
        assertFailure(result);
        expect(result.detail).toBe(42);
    });
});

describe("Result.assertSuccess", () => {
    it("doesn't throw given a success", () => {
        expect(() => assertSuccess(success(42))).not.toThrow();
    });

    it("throws given a failure", () => {
        expect(() => assertSuccess(failure(42))).toThrow(
            "Invariant failed: expected result to be a Success, but got a Failure",
        );
    });

    it("narrows types", () => {
        const result = success(42) as Result.Result<number, number>;
        // @ts-expect-error - Property 'value' does not exist on type 'Failure'
        expect(result.value).toBe(42);
        assertSuccess(result);
        expect(result.value).toBe(42);
    });
});

describe("Result.mapFailure", () => {
    const increment = (x: number) => x + 1;

    it("does nothing to a success", () => {
        const result = mapFailure(increment)(success(0));
        expect(result).toEqual(success(0));
    });

    it("transforms a failure's `detail` using the provided function", () => {
        const result = mapFailure(increment)(failure(0));
        expect(result).toEqual(failure(1));
    });
});
