import {
    generatePlotterOptions,
    generatePlotterWidget,
} from "./plotter-widget-generator";

import type {
    PerseusPlotterWidgetOptions,
    PlotterWidget,
} from "../../data-schema";

describe("generatePlotterOptions", () => {
    it("builds default plotter options", () => {
        // Arrange, Act
        const options: PerseusPlotterWidgetOptions = generatePlotterOptions();

        // Assert
        expect(options.type).toBe("bar");
        expect(options.labels).toEqual(["", ""]);
        expect(options.categories).toEqual([""]);
        expect(options.maxY).toBe(10);
        expect(options.scaleY).toBe(1);
        expect(options.snapsPerLine).toBe(2);
        expect(options.starting).toEqual([1]);
        expect(options.correct).toEqual([1]);
        expect(options.labelInterval).toBe(1);
        expect(options.picUrl).toBeNull();
    });

    it("builds plotter options with all props", () => {
        // Arrange, Act
        const options: PerseusPlotterWidgetOptions = generatePlotterOptions({
            type: "pic",
            labels: ["Season", "Average Temp"],
            categories: ["Spring", "Summer", "Fall", "Winter"],
            starting: [3, 6, 4, 2],
            correct: [3, 6, 4, 2],
            maxY: 12,
            scaleY: 2,
            snapsPerLine: 1,
            labelInterval: 2,
            picUrl: "test.png",
        });

        // Assert
        expect(options.type).toBe("pic");
        expect(options.labels).toEqual(["Season", "Average Temp"]);
        expect(options.categories).toEqual([
            "Spring",
            "Summer",
            "Fall",
            "Winter",
        ]);
        expect(options.starting).toEqual([3, 6, 4, 2]);
        expect(options.correct).toEqual([3, 6, 4, 2]);
        expect(options.maxY).toBe(12);
        expect(options.scaleY).toBe(2);
        expect(options.snapsPerLine).toBe(1);
        expect(options.labelInterval).toBe(2);
        expect(options.picUrl).toBe("test.png");
    });
});

describe("generatePlotterWidget", () => {
    it("builds a default plotter widget", () => {
        // Arrange, Act
        const widget: PlotterWidget = generatePlotterWidget();

        // Assert
        expect(widget.type).toBe("plotter");
        expect(widget.graded).toBe(true);
        expect(widget.static).toBe(false);
        expect(widget.version).toEqual({major: 0, minor: 0});
        expect(widget.alignment).toBe("default");
        expect(widget.options.type).toBe("bar");
        expect(widget.options.maxY).toBe(10);
    });

    it("builds a plotter widget with all props", () => {
        // Arrange, Act
        const widget: PlotterWidget = generatePlotterWidget({
            graded: false,
            version: {major: 1, minor: 2},
            static: true,
            alignment: "block",
            options: {
                type: "histogram",
                labels: ["Score range", "Frequency"],
                categories: ["0-10", "10-20", "20-30"],
                starting: [2, 5, 8],
                correct: [2, 5, 8],
                maxY: 10,
                scaleY: 1,
                snapsPerLine: 1,
                plotDimensions: [380, 300],
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
    });

    it("builds a plotter widget using the options generator", () => {
        // Arrange, Act
        const widget: PlotterWidget = generatePlotterWidget({
            static: true,
            options: generatePlotterOptions({
                type: "line",
                labels: ["Day", "Temperature"],
                categories: ["Mon", "Tue", "Wed"],
                starting: [3, 3, 3],
                correct: [4, 6, 5],
            }),
        });

        // Assert
        expect(widget.static).toBe(true);
        expect(widget.options.type).toBe("line");
        expect(widget.options.categories).toEqual(["Mon", "Tue", "Wed"]);
        expect(widget.options.correct).toEqual([4, 6, 5]);
        // Untouched fields fall back to the generator defaults.
        expect(widget.options.maxY).toBe(10);
        expect(widget.options.snapsPerLine).toBe(2);
    });
});
