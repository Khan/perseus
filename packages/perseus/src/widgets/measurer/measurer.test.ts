import * as Dependencies from "../../dependencies";
import {testDependencies} from "../../testing/test-dependencies";
import GraphUtils from "../../util/graph-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {measurerQuestion} from "./measurer.testdata";

jest.mock("../../util/graph-utils", () => ({
    __esModule: true,
    default: {
        createGraphie: jest.fn(),
    },
}));

describe("measurer widget", () => {
    let protractor: jest.Mock;
    let ruler: jest.Mock;

    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        protractor = jest.fn(() => ({remove: jest.fn()}));
        ruler = jest.fn(() => ({remove: jest.fn()}));
        const fakeGraphie = {
            init: jest.fn(),
            addMouseLayer: jest.fn(),
            protractor,
            ruler,
        };
        jest.mocked(GraphUtils.createGraphie).mockReturnValue(
            // `interactive.js` adds `protractor`/`ruler` to the graphie object
            // at runtime, so they're absent from the static `Graphie` type.
            // The mock only needs the methods the widget actually calls.
            // eslint-disable-next-line no-restricted-syntax
            fakeGraphie as unknown as ReturnType<
                typeof GraphUtils.createGraphie
            >,
        );
    });

    it("draws the protractor at the center of the graph when showProtractor is true", () => {
        // Arrange, Act
        // The graph range is [0, box / scale] on each axis (scale is 40), so
        // the center of a 480x480 box is [480 / 40 / 2, 480 / 40 / 2] = [6, 6].
        renderQuestion(
            measurerQuestion({showProtractor: true, box: [480, 480]}),
        );

        // Assert
        expect(protractor).toHaveBeenCalledWith([6, 6]);
    });

    it("does not draw the protractor when showProtractor is false", () => {
        // Arrange, Act
        renderQuestion(measurerQuestion({showProtractor: false}));

        // Assert
        expect(protractor).not.toHaveBeenCalled();
    });

    it("draws the ruler at the center of the graph with the configured options when showRuler is true", () => {
        // Arrange, Act
        renderQuestion(
            measurerQuestion({
                showRuler: true,
                box: [480, 480],
                rulerLabel: "cm",
                rulerTicks: 2,
                rulerPixels: 30,
                rulerLength: 5,
            }),
        );

        // Assert
        expect(ruler).toHaveBeenCalledWith({
            center: [6, 6],
            label: "cm",
            pixelsPerUnit: 30,
            ticksPerUnit: 2,
            units: 5,
        });
    });

    it("does not draw the ruler when showRuler is false", () => {
        // Arrange, Act
        renderQuestion(measurerQuestion({showRuler: false}));

        // Assert
        expect(ruler).not.toHaveBeenCalled();
    });

    it("re-runs graphie setup when a relevant option changes", () => {
        // Arrange
        const {rerender} = renderQuestion(measurerQuestion({showRuler: false}));
        expect(GraphUtils.createGraphie).toHaveBeenCalledTimes(1);

        // Act
        rerender(measurerQuestion({showRuler: true}));

        // Assert
        expect(GraphUtils.createGraphie).toHaveBeenCalledTimes(2);
    });
});
