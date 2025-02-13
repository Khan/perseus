import getPlotterPublicWidgetOptions from "./plotter-util";

import type {PerseusPlotterWidgetOptions} from "../../data-schema";

describe("getPlotterPublicWidgetOptions", () => {
    it("should return the correct public options without any answer data", () => {
        // Arrange
        const options: PerseusPlotterWidgetOptions = {
            labels: ["X Label", "Y Label"],
            categories: [">0", ">6", ">12", ">18"],
            type: "bar",
            maxY: 10,
            scaleY: 10,
            labelInterval: 2,
            snapsPerLine: 2,
            starting: [1, 2, 3, 4],
            correct: [5, 6, 7, 8],
            picUrl: "test.png",
            picSize: 2,
            picBoxHeight: 2,
            plotDimensions: [10, 10],
        };

        // Act
        const publicWidgetOptions = getPlotterPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            labels: ["X Label", "Y Label"],
            categories: [">0", ">6", ">12", ">18"],
            type: "bar",
            maxY: 10,
            scaleY: 10,
            labelInterval: 2,
            snapsPerLine: 2,
            starting: [1, 2, 3, 4],
            picUrl: "test.png",
            picSize: 2,
            picBoxHeight: 2,
            plotDimensions: [10, 10],
        });
    });
});
