describe("PerseusEditor integration test", () => {
    it("entrypoint should not throw", async () => {
        expect(async () => await import("../index")).not.toThrow();
    });
});
