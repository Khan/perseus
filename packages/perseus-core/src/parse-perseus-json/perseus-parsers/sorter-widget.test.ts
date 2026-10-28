import {
    generateSorterOptions,
    generateSorterWidget,
    // Tests are fine to import, main files aren't
    // eslint-disable-next-line import/no-restricted-paths
} from "../../utils/generators/sorter-widget-generator";
import {parse} from "../parse";
import {failure, success} from "../result";

import {parseSorterWidget} from "./sorter-widget";

describe("parseSorterWidget", () => {
    describe("legend", () => {
        it("does not add a legend to content without one", () => {
            // Arrange
            const widget = generateSorterWidget();

            // Act
            const result = parse(widget, parseSorterWidget);

            // Assert
            expect(result).toStrictEqual(success(widget));
        });

        it("keeps every legend field", () => {
            // Arrange
            const widget = generateSorterWidget({
                options: generateSorterOptions({
                    legend: {
                        startCap: "arrow",
                        endCap: "bar",
                        startLabel: "Lowest",
                        endLabel: "Highest",
                        ariaLabel: "Interest rates from lowest to highest",
                        position: "above",
                    },
                }),
            });

            // Act
            const result = parse(widget, parseSorterWidget);

            // Assert
            expect(result).toStrictEqual(success(widget));
        });

        it("rejects an unknown cap style", () => {
            // Arrange
            const widget = {
                ...generateSorterWidget(),
                options: {
                    ...generateSorterOptions(),
                    legend: {
                        startCap: "circle",
                        endCap: "bar",
                        startLabel: "Lowest",
                        endLabel: "Highest",
                        ariaLabel: "Interest rates from lowest to highest",
                        position: "above",
                    },
                },
            };

            // Act
            const result = parse(widget, parseSorterWidget);

            // Assert
            expect(result).toEqual(
                failure(
                    'At (root).options.legend.startCap -- expected "arrow", "bar", or "none", but got "circle"',
                ),
            );
        });
    });
});
