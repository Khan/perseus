import {render, screen} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {getAngleSideConstraint} from "./angle";

import type {InteractiveGraphState} from "../types";
import type {vec} from "mafs";

const baseMafsProps = getBaseMafsGraphPropsForTests();
const baseAngleState: InteractiveGraphState = {
    type: "angle",
    hasBeenInteractedWith: true,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [0.5, 0.5],
    coords: [
        [-1, 1],
        [0, 0],
        [1, 1],
    ],
    allowReflexAngles: true,
    showAngles: true,
};

function closeTo(x: number) {
    return expect.closeTo(x, 6);
}

describe("Angle graph screen reader", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });
    it("renders ARIA label for the interactive elements on an angle graph", () => {
        render(
            <MafsGraph
                {...baseMafsProps}
                state={baseAngleState}
                dispatch={() => {}}
            />,
        );

        const expectedDescription =
            "Interactive elements: An angle formed by 3 points. The vertex is at 0 comma 0. The starting side point is at 1 comma 1. The ending side point is at -1 comma 1.";
        const graphWithDescription = screen.getByText(expectedDescription);

        expect(graphWithDescription).toBeInTheDocument();
    });

    it("renders ARIA label for whole angle graph", () => {
        render(
            <MafsGraph
                {...baseMafsProps}
                state={baseAngleState}
                dispatch={() => {}}
            />,
        );
        const angleGraph = screen.getByLabelText(
            "An angle on a coordinate plane.",
        );
        expect(angleGraph).toHaveAttribute(
            "aria-label",
            "An angle on a coordinate plane.",
        );
    });

    it("render ARIA description for whole angle graph", () => {
        render(
            <MafsGraph
                {...baseMafsProps}
                state={baseAngleState}
                dispatch={() => {}}
            />,
        );

        const angleGraph = screen.getByLabelText(
            "An angle on a coordinate plane.",
        );

        expect(angleGraph).toHaveAccessibleDescription(
            "The angle measure is 270 degrees with a vertex at 0 comma 0, a point on the starting side at 1 comma 1 and a point on the ending side at -1 comma 1.",
        );
    });

    it("renders ARIA labels for each point (angle)", () => {
        /*
         * terminal side coords[0] => [-1, 1]
         * vertex coords[1] => [0, 0]
         * initial side coords[2] => [1, 1]
         */
        const state: InteractiveGraphState = {
            type: "angle",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [-1, 1],
                [0, 0],
                [1, 1],
            ],
        };

        render(
            <MafsGraph {...baseMafsProps} state={state} dispatch={() => {}} />,
        );

        const points = screen.getAllByRole("button");
        // Vertex first
        const [vertex, point1, point2] = points;

        expect(vertex).toHaveAccessibleName(
            "Point 1, vertex at 0 comma 0. Angle 90 degrees.",
        );
        expect(point1).toHaveAccessibleName(
            "Point 2, ending side at -1 comma 1.",
        );
        expect(point2).toHaveAccessibleName(
            "Point 3, starting side at 1 comma 1.",
        );
    });

    it("renders ARIA labels for each point (angle with angle measure)", () => {
        /*
         * terminal side coords[0] => [7, 0]
         * vertex coords[1] => [0, 0]
         * initial side coords[2] => [0, 6]
         */
        const state: InteractiveGraphState = {
            type: "angle",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [7, 0],
                [0, 0],
                [0, 6],
            ],
            showAngles: true,
        };

        render(
            <MafsGraph {...baseMafsProps} state={state} dispatch={() => {}} />,
        );

        const points = screen.getAllByRole("button");
        // Vertex first
        const [vertex, point1, point2] = points;

        expect(vertex).toHaveAccessibleName(
            "Point 1, vertex at 0 comma 0. Angle 90 degrees.",
        );
        expect(point1).toHaveAccessibleName(
            "Point 2, ending side at 7 comma 0.",
        );
        expect(point2).toHaveAccessibleName(
            "Point 3, starting side at 0 comma 6.",
        );
    });
});

describe("getAngleSideConstraint", () => {
    it("prevents vertical movement given a vertical side of an angle", () => {
        const side: vec.Vector2 = [0, 5];
        const vertex: vec.Vector2 = [0, 0];
        const snapDegrees = 45;

        const constraint = getAngleSideConstraint(side, vertex, snapDegrees);

        expect(constraint).toEqual({
            up: side,
            down: side,
            left: [closeTo(-5), 5],
            right: [closeTo(5), 5],
        });
    });

    it("prevents horizontal movement given a horizontal side of an angle", () => {
        const side: vec.Vector2 = [5, 0];
        const vertex: vec.Vector2 = [0, 0];
        const snapDegrees = 45;

        const constraint = getAngleSideConstraint(side, vertex, snapDegrees);

        expect(constraint).toEqual({
            up: [5, closeTo(5)],
            down: [5, closeTo(-5)],
            left: side,
            right: side,
        });
    });

    it("assigns the correct points to 'left' and 'right' when the side is pointing down", () => {
        const side: vec.Vector2 = [0, -5];
        const vertex: vec.Vector2 = [0, 0];
        const snapDegrees = 45;

        const constraint = getAngleSideConstraint(side, vertex, snapDegrees);

        expect(constraint).toEqual({
            up: side,
            down: side,
            left: [closeTo(-5), -5],
            right: [closeTo(5), -5],
        });
    });

    it("assigns the correct points to 'up' and 'down' when the side is pointing left", () => {
        const side: vec.Vector2 = [-5, 0];
        const vertex: vec.Vector2 = [0, 0];
        const snapDegrees = 45;

        const constraint = getAngleSideConstraint(side, vertex, snapDegrees);

        expect(constraint).toEqual({
            up: [-5, closeTo(5)],
            down: [-5, closeTo(-5)],
            left: side,
            right: side,
        });
    });
});
