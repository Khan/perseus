import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import {Mafs, Polygon} from "mafs";
import React from "react";

import {Dependencies} from "@khanacademy/perseus";

import {testDependencies} from "../../../../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {hasFocusVisible} from "./polygon";

import type {InteractiveGraphState} from "../types";
import type {UserEvent} from "@testing-library/user-event";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();
const baseLimitedPolygonState: InteractiveGraphState = {
    type: "polygon",
    closedPolygon: false,
    coords: [
        [3, -2],
        [0, 4],
        [-3, -2],
    ],
    focusedPointIndex: null,
    hasBeenInteractedWith: false,
    interactionMode: "keyboard",
    numSides: 0,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    showAngles: false,
    showKeyboardInteractionInvitation: false,
    showRemovePointButton: false,
    showSides: false,
    snapStep: [1, 1],
    snapTo: "grid",
};

describe("hasFocusVisible", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("returns true when polygon is focused", async () => {
        const ref = React.createRef<SVGPolygonElement>();
        render(
            <Mafs width={200} height={200}>
                <Polygon
                    points={[
                        [0, 0],
                        [0, 2],
                        [2, 2],
                        [2, 0],
                    ]}
                    svgPolygonProps={{
                        ref,
                        tabIndex: 0,
                    }}
                />
            </Mafs>,
        );
        const polygon = ref.current;
        if (polygon) {
            await userEvent.tab();
            await userEvent.tab();
        }

        expect(polygon).toBeInTheDocument();
        expect(polygon).toHaveFocus();
        expect(hasFocusVisible(polygon)).toBe(true);
    });

    it("returns false when polygon is not focused", async () => {
        const ref = React.createRef<SVGPolygonElement>();
        render(
            <Mafs width={200} height={200}>
                <Polygon
                    points={[
                        [0, 0],
                        [0, 2],
                        [2, 2],
                        [2, 0],
                    ]}
                    svgPolygonProps={{
                        ref,
                        tabIndex: 0,
                    }}
                />
            </Mafs>,
        );
        const polygon = ref.current;
        if (polygon) {
            await userEvent.tab();
        }

        expect(polygon).toBeInTheDocument();
        expect(polygon).not.toHaveFocus();
        expect(hasFocusVisible(polygon)).toBe(false);
    });
});

describe("Polygon screen reader", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test("Has description of interactive elements on graph", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseLimitedPolygonState}
            />,
        );

        // Act
        const mafsGraph = screen.getByText(
            "Interactive elements: A polygon with 3 points. Point 1 at 3 comma -2. Point 2 at 0 comma 4. Point 3 at -3 comma -2.",
        );

        // Assert
        expect(mafsGraph).toBeInTheDocument();
    });

    test("Has overall graph label and description", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseLimitedPolygonState}
            />,
        );

        // Act
        const polygonGraph = screen.getByLabelText(
            "A polygon on a coordinate plane.",
        );

        // Assert
        expect(polygonGraph).toBeInTheDocument();
        expect(polygonGraph).toHaveAccessibleDescription(
            "The polygon has 3 points. Point 1 at 3 comma -2. Point 2 at 0 comma 4. Point 3 at -3 comma -2.",
        );
    });

    test.each`
        markings   | expectedDescription
        ${"axes"}  | ${"A polygon on a coordinate plane."}
        ${"graph"} | ${"A polygon on a coordinate plane."}
        ${"grid"}  | ${"A polygon."}
        ${"none"}  | ${"A polygon."}
    `(
        "Uses overall graph label based on graph markings $markings",
        ({markings, expectedDescription}) => {
            // Arrange
            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={baseLimitedPolygonState}
                    markings={markings}
                />,
            );

            // Act
            const polygonGraph = screen.getByLabelText(expectedDescription);

            // Assert
            expect(polygonGraph).toBeInTheDocument();
        },
    );

    test.each`
        markings   | expectedLabel
        ${"axes"}  | ${" Point 1 at 3 comma -2. Point 2 at 0 comma 4. Point 3 at -3 comma -2."}
        ${"graph"} | ${" Point 1 at 3 comma -2. Point 2 at 0 comma 4. Point 3 at -3 comma -2."}
        ${"grid"}  | ${""}
        ${"none"}  | ${""}
    `(
        "Uses movable polygon label based on graph markings $markings",
        ({markings, expectedLabel}) => {
            // Arrange
            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={baseLimitedPolygonState}
                    markings={markings}
                />,
            );

            // Act
            const movablePolygon = screen.getAllByRole("button")[0];
            const concatenatedLabel = `A polygon with 3 points.${expectedLabel}`;

            // Assert
            expect(movablePolygon).toHaveAccessibleName(concatenatedLabel);
        },
    );

    test("Interactive elements have expected descriptions (approx angles, approx and exact sides)", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseLimitedPolygonState}
            />,
        );

        // Act
        const interactiveElements = screen.getAllByRole("button");
        const [polygon, point1, point2, point3] = interactiveElements;

        // Assert
        expect(polygon).toHaveAccessibleName(
            "A polygon with 3 points. Point 1 at 3 comma -2. Point 2 at 0 comma 4. Point 3 at -3 comma -2.",
        );
        expect(point1).toHaveAccessibleName("Point 1 at 3 comma -2.");
        expect(point1).toHaveAccessibleDescription(
            "Angle approximately equal to 63.4 degrees. A line segment, length equal to 6 units, connects to point 3. A line segment, length approximately equal to 6.7 units, connects to point 2.",
        );
        expect(point2).toHaveAccessibleName("Point 2 at 0 comma 4.");
        expect(point2).toHaveAccessibleDescription(
            "Angle approximately equal to 53.1 degrees. A line segment, length approximately equal to 6.7 units, connects to point 1. A line segment, length approximately equal to 6.7 units, connects to point 3.",
        );
        expect(point3).toHaveAccessibleName("Point 3 at -3 comma -2.");
        expect(point3).toHaveAccessibleDescription(
            "Angle approximately equal to 63.4 degrees. A line segment, length approximately equal to 6.7 units, connects to point 2. A line segment, length equal to 6 units, connects to point 1.",
        );
    });

    test("Interactive elements have expected descriptions (exact angles, approx and exact sides)", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseLimitedPolygonState,
                    // Rectangle
                    coords: [
                        [-5, 5.5],
                        [5, 5.5],
                        [5, -5],
                        [-5, -5],
                    ],
                }}
            />,
        );

        // Act
        const interactiveElements = screen.getAllByRole("button");
        const [polygon, point1, point2, point3, point4] = interactiveElements;

        // Assert
        expect(polygon).toHaveAccessibleName(
            "A polygon with 4 points. Point 1 at -5 comma 5.5. Point 2 at 5 comma 5.5. Point 3 at 5 comma -5. Point 4 at -5 comma -5.",
        );
        expect(point1).toHaveAccessibleName("Point 1 at -5 comma 5.5.");
        expect(point1).toHaveAccessibleDescription(
            "Angle equal to 90 degrees. A line segment, length approximately equal to 10.5 units, connects to point 4. A line segment, length equal to 10 units, connects to point 2.",
        );
        expect(point2).toHaveAccessibleName("Point 2 at 5 comma 5.5.");
        expect(point2).toHaveAccessibleDescription(
            "Angle equal to 90 degrees. A line segment, length equal to 10 units, connects to point 1. A line segment, length approximately equal to 10.5 units, connects to point 3.",
        );
        expect(point3).toHaveAccessibleName("Point 3 at 5 comma -5.");
        expect(point3).toHaveAccessibleDescription(
            "Angle equal to 90 degrees. A line segment, length approximately equal to 10.5 units, connects to point 2. A line segment, length equal to 10 units, connects to point 4.",
        );
        expect(point4).toHaveAccessibleName("Point 4 at -5 comma -5.");
        expect(point4).toHaveAccessibleDescription(
            "Angle equal to 90 degrees. A line segment, length equal to 10 units, connects to point 3. A line segment, length approximately equal to 10.5 units, connects to point 1.",
        );
    });

    test.each`
        elementName  | index
        ${"polygon"} | ${0}
        ${"point1"}  | ${1}
        ${"point2"}  | ${2}
        ${"point3"}  | ${3}
    `(
        "Should update the aria-live when $elementName is moved",
        async ({index}) => {
            // Arrange
            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={baseLimitedPolygonState}
                />,
            );
            const interactiveElements = screen.getAllByRole("button");
            const [polygon, point1, point2, point3] = interactiveElements;
            const movingElement = interactiveElements[index];

            // Act - Move the element
            movingElement.focus();
            await userEvent.keyboard("{ArrowRight}");

            const expectedAriaLive = ["off", "off", "off", "off"];
            expectedAriaLive[index] = "polite";

            // Assert
            expect(polygon).toHaveAttribute("aria-live", expectedAriaLive[0]);
            expect(point1).toHaveAttribute("aria-live", expectedAriaLive[1]);
            expect(point2).toHaveAttribute("aria-live", expectedAriaLive[2]);
            expect(point3).toHaveAttribute("aria-live", expectedAriaLive[3]);
        },
    );
});
