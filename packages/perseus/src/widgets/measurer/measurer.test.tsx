import MeasurerWidgetExport from "./measurer";

describe("measurer", () => {
    describe("propUpgrades", () => {
        it("can upgrade from v0 to v1", () => {
            const v0props = {
                imageUrl: "url",
                imageTop: 42,
                imageLeft: 42,
                showProtractor: false,
                showRuler: false,
                rulerLabel: "test",
                rulerTicks: 4,
                rulerPixels: 4,
                rulerLength: 4,
                box: [4, 4],
                static: false,
            };

            const result = MeasurerWidgetExport.propUpgrades["1"](v0props);

            expect(result).toEqual({
                image: {
                    url: "url",
                    top: 42,
                    left: 42,
                },
                showProtractor: false,
                showRuler: false,
                rulerLabel: "test",
                rulerTicks: 4,
                rulerPixels: 4,
                rulerLength: 4,
                box: [4, 4],
                static: false,
            });
        });
    });
});
