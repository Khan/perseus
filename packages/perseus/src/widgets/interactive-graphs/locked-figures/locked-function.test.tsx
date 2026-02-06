import {render} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import * as Utils from "./utils";

import type {NoneGraphState} from "../types";
import type {LockedFunctionType} from "@khanacademy/perseus-core";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();
const baseLockedFunctionProps = {
    type: "function",
    color: "grayH",
    strokeStyle: "solid",
    weight: "medium",
    equation: "x/2",
    directionalAxis: "x",
    domain: [-10, 10],
    labels: [],
} satisfies LockedFunctionType;

describe("LockedFunction", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test("calls clampedDomain with the x range correct arguments when in x direction", () => {
        // Arrange
        const clampSpy = jest.spyOn(Utils, "clampDomain");

        // Act
        const graphStateWithRange = {
            type: "none",
            range: [
                [-10, 10],
                [-5, 5],
            ],
            hasBeenInteractedWith: false,
            snapStep: [1, 1],
        } satisfies NoneGraphState;

        const {container} = render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={graphStateWithRange}
                lockedFigures={[
                    {...baseLockedFunctionProps, directionalAxis: "x"},
                ]}
            />,
        );

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const lockedFunction = container.querySelector(
            ".locked-function",
        ) as SVGGElement;

        // Assert
        expect(lockedFunction).toBeInTheDocument();
        expect(clampSpy).toHaveBeenCalledWith(
            baseLockedFunctionProps.domain,
            graphStateWithRange.range[0], // x range
        );
    });

    test("calls clampedDomain with the y range correct arguments when in y direction", () => {
        // Arrange
        const clampSpy = jest.spyOn(Utils, "clampDomain");

        // Act
        const graphStateWithRange = {
            type: "none",
            range: [
                [-5, 5],
                [-10, 10],
            ],
            hasBeenInteractedWith: false,
            snapStep: [1, 1],
        } satisfies NoneGraphState;

        const {container} = render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={graphStateWithRange}
                lockedFigures={[
                    {...baseLockedFunctionProps, directionalAxis: "y"},
                ]}
            />,
        );

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const lockedFunction = container.querySelector(
            ".locked-function",
        ) as SVGGElement;

        // Assert
        expect(lockedFunction).toBeInTheDocument();
        expect(clampSpy).toHaveBeenCalledWith(
            baseLockedFunctionProps.domain,
            graphStateWithRange.range[1], // y range
        );
    });

    test("does not render when the domain is outside the graph bounds", () => {
        // Arrange
        const graphStateWithRange = {
            type: "none",
            range: [
                [-10, 10],
                [-5, 5],
            ],
            hasBeenInteractedWith: false,
            snapStep: [1, 1],
        } satisfies NoneGraphState;

        // Act
        const {container} = render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={graphStateWithRange}
                lockedFigures={[
                    {...baseLockedFunctionProps, domain: [-20, -15]},
                ]}
            />,
        );

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const lockedFunction = container.querySelector(".locked-function");

        // Assert
        expect(lockedFunction).not.toBeInTheDocument();
    });
});
