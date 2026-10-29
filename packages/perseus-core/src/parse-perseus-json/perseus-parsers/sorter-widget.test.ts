import {
    generateSorterOptions,
    generateSorterWidget,
    // Tests are fine to import, main files aren't
    // eslint-disable-next-line import/no-restricted-paths
} from "../../utils/generators/sorter-widget-generator";
import {parse} from "../parse";
import {assertSuccess, failure} from "../result";

import {parseSorterWidget} from "./sorter-widget";

// Tests are fine to import, main files aren't
// eslint-disable-next-line import/no-restricted-paths
import type {SorterLegend} from "../../data-schema";

describe("parseSorterWidget", () => {
    describe("legend", () => {
        it("does not add a legend to content without one", () => {
            // Arrange
            const widget = generateSorterWidget({
                options: generateSorterOptions({legend: undefined}),
            });

            // Act
            const result = parse(widget, parseSorterWidget);

            // Assert
            assertSuccess(result);
            expect(result.value.options.legend).toBeUndefined();
        });

        it("keeps every legend field", () => {
            // Arrange
            const legend: SorterLegend = {
                startCap: "arrow",
                endCap: "bar",
                startLabel: "Lowest",
                endLabel: "Highest",
                ariaLabel: "Interest rates from lowest to highest",
                position: "above",
            };
            const widget = generateSorterWidget({
                options: generateSorterOptions({legend}),
            });

            // Act
            const result = parse(widget, parseSorterWidget);

            // Assert
            assertSuccess(result);
            expect(result.value.options.legend).toEqual(legend);
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

    describe("variant", () => {
        it("defaults the variant to scale for content without one", () => {
            // Arrange
            const widget = {
                ...generateSorterWidget(),
                options: {
                    correct: ["Car loan", "Student loan", "Credit card"],
                    layout: "horizontal",
                    padding: true,
                },
            };

            // Act
            const result = parse(widget, parseSorterWidget);

            // Assert
            assertSuccess(result);
            expect(result.value.options.variant).toBe("scale");
        });

        it("keeps the variant", () => {
            // Arrange
            const widget = generateSorterWidget({
                options: generateSorterOptions({variant: "timeline"}),
            });

            // Act
            const result = parse(widget, parseSorterWidget);

            // Assert
            assertSuccess(result);
            expect(result.value.options.variant).toBe("timeline");
        });
    });
});
