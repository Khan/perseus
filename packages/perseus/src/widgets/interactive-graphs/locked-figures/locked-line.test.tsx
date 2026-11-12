import {
    generateIGLockedLine,
    generateIGLockedPoint,
} from "@khanacademy/perseus-core";
import {render} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {getBaseMafsGraphPropsForTests} from "../graph.testutils";
import {MafsGraph} from "../mafs-graph";

import type {NoneGraphState} from "../types";
import type {LockedLineType, LockedPointType} from "@khanacademy/perseus-core";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();

const graphState: NoneGraphState = {
    type: "none",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    hasBeenInteractedWith: false,
    snapStep: [1, 1],
};

const distinctPoints: [LockedPointType, LockedPointType] = [
    generateIGLockedPoint({coord: [0, 0]}),
    generateIGLockedPoint({coord: [1, 1]}),
];

const coincidentPoints: [LockedPointType, LockedPointType] = [
    generateIGLockedPoint({coord: [2, 2]}),
    generateIGLockedPoint({coord: [2, 2]}),
];

function renderLockedLine(line: LockedLineType) {
    const {container} = render(
        <MafsGraph
            {...baseMafsGraphProps}
            state={graphState}
            lockedFigures={[line]}
        />,
    );
    const selector = line.kind === "ray" ? ".locked-ray" : ".locked-line";
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const figure = container.querySelector(selector);
    if (figure == null) {
        throw new Error(`No ${selector} element was rendered`);
    }
    return figure;
}

// Lines are drawn as <line> elements and arrowheads as <path> elements.
function queryStrokes(figure: Element) {
    return figure.querySelectorAll("line, path");
}

function queryCircles(figure: Element) {
    return figure.querySelectorAll("circle");
}

describe.each(["segment", "line", "ray"] as const)(
    "LockedLine with kind %s",
    (kind) => {
        beforeEach(() => {
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
        });

        it("draws strokes given distinct points", () => {
            // Arrange, Act
            const figure = renderLockedLine(
                generateIGLockedLine({kind, points: distinctPoints}),
            );

            // Assert
            expect(queryStrokes(figure)).not.toHaveLength(0);
        });

        it("draws no strokes given coincident points", () => {
            // Arrange, Act
            const figure = renderLockedLine(
                generateIGLockedLine({kind, points: coincidentPoints}),
            );

            // Assert
            expect(queryStrokes(figure)).toHaveLength(0);
        });

        it("logs no console errors given coincident points", () => {
            // Arrange
            const errorSpy = jest
                .spyOn(console, "error")
                .mockImplementation(() => {});

            // Act
            renderLockedLine(
                generateIGLockedLine({kind, points: coincidentPoints}),
            );

            // Assert
            expect(errorSpy).not.toHaveBeenCalled();
        });

        it("draws both endpoints given coincident points when showPoint1 and showPoint2 are true", () => {
            // Arrange, Act
            const figure = renderLockedLine(
                generateIGLockedLine({
                    kind,
                    points: coincidentPoints,
                    showPoint1: true,
                    showPoint2: true,
                }),
            );

            // Assert
            expect(queryCircles(figure)).toHaveLength(2);
        });
    },
);
