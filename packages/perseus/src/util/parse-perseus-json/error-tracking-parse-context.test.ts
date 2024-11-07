import {ErrorTrackingParseContext} from "./error-tracking-parse-context";
import {failure} from "./result";

describe("ErrorTrackingParseContext", () => {
    it("adds its `path` to reported failures", () => {
        const path = ["foo", 1, "bar"];
        const ctx = new ErrorTrackingParseContext(path);

        expect(ctx.failure("a million bucks", 4)).toEqual(
            failure([
                {
                    expected: ["a million bucks"],
                    badValue: 4,
                    path: ["foo", 1, "bar"],
                },
            ]),
        );
    });

    it("spawns a new context for a subtree of the object being parsed", () => {
        const rootCtx = new ErrorTrackingParseContext(["one"]);
        const subCtx = rootCtx.forSubtree("two");
        expect(subCtx.failure("", 99).detail[0].path).toEqual(["one", "two"]);
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
