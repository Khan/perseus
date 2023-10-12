describe("version", () => {
    beforeEach(() => {
        delete globalThis.__perseus_debug__;
    });

    it("adds the perseus-core version to globalThis", async () => {
        await import("../version");

        expect(globalThis).toHaveProperty("__perseus_debug__");
        expect(globalThis.__perseus_debug__).toMatchInlineSnapshot(`
            {
              "@khanacademy/perseus-core": "__lib_version__",
            }
        `);
    });
});
