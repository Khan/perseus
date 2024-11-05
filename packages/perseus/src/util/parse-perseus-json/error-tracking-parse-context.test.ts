import {ErrorTrackingParseContext} from "./error-tracking-parse-context";

describe("ErrorTrackingParseContext", () => {
    it("adds its `path` to reported failures", () => {
        const ctx = new ErrorTrackingParseContext(["foo", 1, "bar"]);

        expect(ctx.failure("a million bucks", 4)).toEqual({
            type: "failure",
            detail: [
                {
                    expected: ["a million bucks"],
                    badValue: 4,
                    path: ["foo", 1, "bar"],
                },
            ],
        });
    });

    it("spawns a new context for a subtree of the object being parsed", () => {
        const rootCtx = new ErrorTrackingParseContext([]);
        const subCtx = rootCtx.forSubtree("blah");
        expect(subCtx.failure("", 99).detail[0].path).toEqual(["blah"]);
    });

    it("is not modified by spawning a subcontext", () => {
        const rootCtx = new ErrorTrackingParseContext(["original", "path"]);
        rootCtx.forSubtree("changed");
        expect(rootCtx.failure("", 99).detail[0].path).toEqual([
            "original",
            "path",
        ]);
    });
});
