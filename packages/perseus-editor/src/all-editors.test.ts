import allEditors from "./all-editors";

describe("All editors", () => {
    it("should export react components with a widgetName property", () => {
        for (const editor of allEditors) {
            expect(typeof editor.widgetName === "string").toBeTruthy();
        }
    });
});
