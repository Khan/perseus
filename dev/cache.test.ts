import {cache} from "./cache";

describe("cache", () => {
    it("returns a function that is behaviorally identical to the given one", () => {
        const cachedString = cache(String);
        expect(cachedString(3)).toBe("3");
    });

    it("call the wrapped function only once when given the same arg repeatedly", () => {
        let calls = 0;
        const cachedString = cache((x) => {
            calls++;
            return String(x);
        });

        cachedString(3);
        cachedString(3);

        expect(calls).toBe(1);
    });

    it("does not use the cache when called with different arguments", () => {
        const cachedString = cache(String);
        cachedString(3);
        expect(cachedString(4)).toBe("4");
    });

    it("caches the result of passing undefined", () => {
        let calls = 0;
        const cachedString = cache((x) => {
            calls++;
            return String(x);
        });

        cachedString(undefined);
        cachedString(undefined);

        expect(calls).toBe(1);
    });

    it("caches the result of passing null", () => {
        let calls = 0;
        const cachedString = cache((x) => {
            calls++;
            return String(x);
        });

        cachedString(null);
        cachedString(null);

        expect(calls).toBe(1);
    });
});
