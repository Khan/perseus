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
import type {LockedLineType} from "@khanacademy/perseus-core";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();

const graphState = {
    type: "none",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    hasBeenInteractedWith: false,
    snapStep: [1, 1],
} satisfies NoneGraphState;

const distinctPoints: LockedLineType["points"] = [
    generateIGLockedPoint({coord: [0, 0]}),
    generateIGLockedPoint({coord: [1, 1]}),
];

const coincidentPoints: LockedLineType["points"] = [
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
function strokes(figure: Element) {
    return figure.querySelectorAll("line, path");
}

function circles(figure: Element) {
    return figure.querySelectorAll("circle");
}

describe("LockedLine", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it.each([
        {kind: "segment", expectedStrokes: 1},
        {kind: "line", expectedStrokes: 3},
        {kind: "ray", expectedStrokes: 2},
    ] as const)(
        "draws $expectedStrokes stroke(s) for a $kind with distinct points",
        ({kind, expectedStrokes}) => {
            // Arrange, Act
            const figure = renderLockedLine(
                generateIGLockedLine({kind, points: distinctPoints}),
            );

            // Assert
            expect(strokes(figure)).toHaveLength(expectedStrokes);
        },
    );

    it.each(["segment", "line", "ray"] as const)(
        "draws no strokes for a %s with coincident points",
        (kind) => {
            // Arrange, Act
            const figure = renderLockedLine(
                generateIGLockedLine({kind, points: coincidentPoints}),
            );

            // Assert
            expect(strokes(figure)).toHaveLength(0);
        },
    );

    it.each(["segment", "line", "ray"] as const)(
        "logs no console errors for a %s with coincident points",
        (kind) => {
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
        },
    );

    it.each(["segment", "line", "ray"] as const)(
        "draws both endpoints for a %s with coincident points when shown",
        (kind) => {
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
            expect(circles(figure)).toHaveLength(2);
        },
    );
});
