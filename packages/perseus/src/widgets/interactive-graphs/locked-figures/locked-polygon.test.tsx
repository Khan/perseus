import {render, screen} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import type {NoneGraphState} from "../types";
import type {LockedPolygonType} from "@khanacademy/perseus-core";
import type {vec} from "mafs";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();
const baseGraphState = {
    type: "none",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    hasBeenInteractedWith: false,
    snapStep: [1, 1],
} satisfies NoneGraphState;

const baseLockedPolygonProps = {
    type: "polygon",
    points: [
        [0, 2],
        [-1, 0],
        [1, 0],
    ],
    color: "grayH",
    showVertices: false,
    showAngles: false,
    fillStyle: "none",
    strokeStyle: "solid",
    weight: "medium",
    labels: [],
} satisfies LockedPolygonType;

// Polygon that looks like a chevron, with a concave vertex on the left,
// drawn from the top left.
const concavePolygonClockwise = [
    [-7, 5],
    [1, 5],
    [6, 0],
    [1, -5],
    [-7, -5],
    [-2, 0], // concave vertex
] satisfies vec.Vector2[];

describe("LockedPolygon", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders the polygon element", () => {
        // Arrange, Act
        const {container} = render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseGraphState}
                lockedFigures={[baseLockedPolygonProps]}
            />,
        );

        // Assert
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const lockedPolygon = container.querySelector(".locked-polygon");
        expect(lockedPolygon).toBeInTheDocument();
    });

    it("does not show angle indicators when showAngles is false", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseGraphState}
                lockedFigures={[
                    {
                        ...baseLockedPolygonProps,
                        points: concavePolygonClockwise,
                        showAngles: false,
                    },
                ]}
            />,
        );

        // Assert
        const angleIndicators = screen.queryAllByText(/°/);
        expect(angleIndicators).toHaveLength(0);
    });

    it("shows correct angles for concave polygons when points are clockwise", () => {
        // Arrange

        // Act - render with angles showing
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseGraphState}
                lockedFigures={[
                    {
                        ...baseLockedPolygonProps,
                        points: concavePolygonClockwise,
                        showAngles: true,
                    },
                ]}
            />,
        );

        const angleIndicators = screen.getAllByText(/°/);

        // Assert
        expect(angleIndicators).toHaveLength(concavePolygonClockwise.length);
        // Checking angles in render order
        expect(angleIndicators[0]).toHaveTextContent("45°");
        expect(angleIndicators[1]).toHaveTextContent("135°");
        expect(angleIndicators[2]).toHaveTextContent("90°");
        expect(angleIndicators[3]).toHaveTextContent("135°");
        expect(angleIndicators[4]).toHaveTextContent("45°");
        // Concave vertex, greater than 180 degrees
        expect(angleIndicators[5]).toHaveTextContent("270°");
    });

    it("should show correct angles for concave polygons when the points are counter-clockwise", () => {
        // Arrange

        // Act - render with angles showing
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseGraphState}
                lockedFigures={[
                    {
                        ...baseLockedPolygonProps,
                        points: [...concavePolygonClockwise].reverse(),
                        showAngles: true,
                    },
                ]}
            />,
        );

        const angleIndicators = screen.getAllByText(/°/);

        // Assert
        expect(angleIndicators).toHaveLength(concavePolygonClockwise.length);
        // Concave vertex, greater than 180 degrees
        expect(angleIndicators[0]).toHaveTextContent("270°");
        expect(angleIndicators[1]).toHaveTextContent("45°");
        expect(angleIndicators[2]).toHaveTextContent("135°");
        expect(angleIndicators[3]).toHaveTextContent("90°");
        expect(angleIndicators[4]).toHaveTextContent("135°");
        expect(angleIndicators[5]).toHaveTextContent("45°");
    });
});
