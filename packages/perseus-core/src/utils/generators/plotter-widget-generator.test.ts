import {
    generatePlotterOptions,
    generatePlotterWidget,
} from "./plotter-widget-generator";

import type {
    PerseusPlotterWidgetOptions,
    PlotterWidget,
} from "../../data-schema";

describe("generatePlotterOptions", () => {
    it("overrides defaults with the provided options", () => {
        // Arrange, Act
        const options: PerseusPlotterWidgetOptions = generatePlotterOptions({
            type: "pic",
            categories: ["Spring", "Summer", "Fall", "Winter"],
            maxY: 12,
            picUrl: "test.png",
        });

        // Assert
        expect(options.type).toBe("pic");
        expect(options.categories).toEqual([
            "Spring",
            "Summer",
            "Fall",
            "Winter",
        ]);
        expect(options.maxY).toBe(12);
        expect(options.picUrl).toBe("test.png");
    });
});

describe("generatePlotterWidget", () => {
    it("overrides defaults with the provided properties", () => {
        // Arrange, Act
        const widget: PlotterWidget = generatePlotterWidget({
            graded: false,
            version: {major: 1, minor: 2},
            static: true,
            alignment: "block",
            options: {
                type: "histogram",
                labels: ["Score range", "Frequency"],
                labelInterval: 1,
                categories: ["0-10", "10-20", "20-30"],
                starting: [2, 5, 8],
                correct: [2, 5, 8],
                maxY: 10,
                scaleY: 1,
                snapsPerLine: 1,
                plotDimensions: [380, 300],
                picUrl: "the url",
                picSize: 3,
                picBoxHeight: 4,
            },
        });

        // Assert
        expect(widget.graded).toBe(false);
        expect(widget.version).toEqual({major: 1, minor: 2});
        expect(widget.static).toBe(true);
        expect(widget.alignment).toBe("block");
        expect(widget.options.type).toBe("histogram");
        expect(widget.options.categories).toEqual(["0-10", "10-20", "20-30"]);
        expect(widget.options.starting).toEqual([2, 5, 8]);
        expect(widget.options.picUrl).toBe("the url");
        expect(widget.options.picSize).toBe(3);
        expect(widget.options.picBoxHeight).toBe(4);
        expect(widget.options.labelInterval).toBe(1);
    });

    it("accepts options built with the options generator", () => {
        // Arrange, Act
        const widget: PlotterWidget = generatePlotterWidget({
            options: generatePlotterOptions({
                type: "line",
                categories: ["Mon", "Tue", "Wed"],
                correct: [4, 6, 5],
            }),
        });

        // Assert
        expect(widget.options.type).toBe("line");
        expect(widget.options.categories).toEqual(["Mon", "Tue", "Wed"]);
        expect(widget.options.correct).toEqual([4, 6, 5]);
    });
});
