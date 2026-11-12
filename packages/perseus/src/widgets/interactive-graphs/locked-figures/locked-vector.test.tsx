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

describe("LockedVector", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("logs no errors given coincident points", () => {
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
