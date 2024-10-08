import * as Result from "./result";

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
