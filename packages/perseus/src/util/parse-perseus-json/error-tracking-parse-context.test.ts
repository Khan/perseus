import {ErrorTrackingParseContext} from "./error-tracking-parse-context";

describe("ErrorTrackingParseContext", () => {
    it("adds its `path` to reported failures", () => {
        const ctx = new ErrorTrackingParseContext(["foo", 1, "bar"])

        expect(ctx.failure("oops", 4)).toEqual({
            type: "failure",
            detail: {
                message: "oops",
                badValue: 4,
                path: ["foo", 1, "bar"]
            },
        })
    })

    it("spawns a new context for a subtree of the object being parsed", () => {
        const rootCtx = new ErrorTrackingParseContext([])
        const subCtx = rootCtx.forSubtree("blah")
        expect(subCtx.failure("", 99).detail.path).toEqual(["blah"])
    })

    it("is not modified by spawning a subcontext", () => {
        const rootCtx = new ErrorTrackingParseContext(["original", "path"])
        rootCtx.forSubtree("changed")
        expect(rootCtx.failure("", 99).detail.path).toEqual(["original", "path"])
    })
})
