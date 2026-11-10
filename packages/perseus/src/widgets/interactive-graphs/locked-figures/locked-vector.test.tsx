import {generateIGLockedVector} from "@khanacademy/perseus-core";
import {render} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {getBaseMafsGraphPropsForTests} from "../graph.testutils";
import {MafsGraph} from "../mafs-graph";

import type {NoneGraphState} from "../types";
import type {LockedVectorType} from "@khanacademy/perseus-core";

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

function renderLockedVector(vector: LockedVectorType) {
    const {container} = render(
        <MafsGraph
            {...baseMafsGraphProps}
            state={graphState}
            lockedFigures={[vector]}
        />,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const figure = container.querySelector(".locked-vector");
    if (figure == null) {
        throw new Error("No .locked-vector element was rendered");
    }
    return figure;
}

function lineCoords(figure: Element): number[] {
    // eslint-disable-next-line testing-library/no-node-access
    const lines = figure.querySelectorAll("line");
    expect(lines).toHaveLength(1);
    return ["x1", "y1", "x2", "y2"].map((attr) =>
        Number(lines[0].getAttribute(attr)),
    );
}

describe("LockedVector", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders a line between distinct points", () => {
        // Arrange, Act
        const figure = renderLockedVector(
            generateIGLockedVector({
                points: [
                    [0, 0],
                    [1, 1],
                ],
            }),
        );

        // Assert
        const [x1, y1, x2, y2] = lineCoords(figure);
        expect([x1, y1]).not.toEqual([x2, y2]);
    });

    it("renders a line with finite coordinates given coincident points", () => {
        // Arrange, Act
        const figure = renderLockedVector(
            generateIGLockedVector({
                points: [
                    [2, 2],
                    [2, 2],
                ],
            }),
        );

        // Assert
        expect(lineCoords(figure).every(Number.isFinite)).toBe(true);
    });

    it("logs no NaN-attribute errors given coincident points", () => {
        // Arrange
        const errorSpy = jest
            .spyOn(console, "error")
            .mockImplementation(() => {});

        // Act
        renderLockedVector(
            generateIGLockedVector({
                points: [
                    [2, 2],
                    [2, 2],
                ],
            }),
        );

        // Assert
        expect(errorSpy).not.toHaveBeenCalled();
    });
});
