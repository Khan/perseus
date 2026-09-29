describe("the perseus-core barrel", () => {
    it("registers no widget logic when imported", () => {
        jest.resetModules();

        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const barrel = require("@khanacademy/perseus-core");

        expect(() =>
            barrel.CoreWidgetRegistry.isWidgetRegistered("radio"),
        ).toThrow("Core widget registry accessed before initialization!");
    });
});
