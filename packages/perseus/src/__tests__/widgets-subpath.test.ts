describe("the ./widgets/* subpath", () => {
    it("shares the widget registry with the package barrel", async () => {
        const widget = await import("@khanacademy/perseus/widgets/radio");
        const registry = await import("@khanacademy/perseus/widgets/registry");
        const barrel = await import("@khanacademy/perseus");

        registry.registerWidgets([widget.radioRegistration]);

        expect(barrel.Widgets.getWidgetExport("radio")).toBe(widget.default);
    });
});
