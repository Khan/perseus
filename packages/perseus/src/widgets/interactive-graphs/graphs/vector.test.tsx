import {render, screen} from "@testing-library/react";
import {
    type UserEvent,
    userEvent as userEventLib,
} from "@testing-library/user-event";
import * as React from "react";

import {mockPerseusI18nContext} from "../../../components/i18n-context";
import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {describeVectorGraph, getVectorTipKeyboardConstraint} from "./vector";

import type {InteractiveGraphState} from "../types";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();
const baseVectorState: InteractiveGraphState = {
    type: "vector",
    coords: [
        [-5, 0],
        [5, 0],
    ],
    hasBeenInteractedWith: false,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
};

describe("Vector graph screen reader", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        jest.useFakeTimers();
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("renders the vector graph with an aria label", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseVectorState} />);

        // Act
        const vectorGraph = screen.getByLabelText(
            "A vector on a coordinate plane.",
        );

        // Assert
        expect(vectorGraph).toBeInTheDocument();
        expect(vectorGraph).toHaveAccessibleDescription(
            "The tail is at -5 comma 0 and the tip is at 5 comma 0.",
        );
    });

    it("renders the grab handle with an aria label", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseVectorState} />);

        // Act
        const movableElements = screen.getAllByRole("button");
        // Tab order: grab handle first, then tip point
        const grabHandle = movableElements[0];

        // Assert
        expect(grabHandle).toHaveAttribute(
            "aria-label",
            "Vector from -5 comma 0 to 5 comma 0.",
        );
    });

    it("renders the tip point with an aria label", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseVectorState} />);

        // Act
        const movableElements = screen.getAllByRole("button");
        // Tab order: grab handle first, then tip point
        const tipPoint = movableElements[1];

        // Assert
        expect(tipPoint).toHaveAttribute(
            "aria-label",
            "Tip point at 5 comma 0.",
        );
    });

    it("renders a drag handle on the vector body", async () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseVectorState} />);

        // Act — hover the vector body to make the pill visible
        const vectorBody = screen.getByTestId("movable-vector");
        await userEvent.hover(vectorBody);
        const dragHandle = screen.getByTestId("movable-pill-handle");

        // Assert
        expect(dragHandle).toBeInTheDocument();
        expect(dragHandle).toHaveAttribute("aria-hidden", "true");
    });

    it("reflects updated coordinates in aria labels", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseVectorState,
                    coords: [
                        [1, 2],
                        [4, 6],
                    ],
                }}
            />,
        );

        // Act
        const movableElements = screen.getAllByRole("button");
        const [grabHandle, tipPoint] = movableElements;

        // Assert
        expect(grabHandle).toHaveAttribute(
            "aria-label",
            "Vector from 1 comma 2 to 4 comma 6.",
        );
        expect(tipPoint).toHaveAttribute(
            "aria-label",
            "Tip point at 4 comma 6.",
        );
    });
});

describe("describeVectorGraph", () => {
    it("describes a default vector", () => {
        // Arrange, Act
        const strings = describeVectorGraph(
            baseVectorState,
            mockPerseusI18nContext,
        );

        // Assert
        expect(strings.srVectorGraph).toBe("A vector on a coordinate plane.");
        expect(strings.srVectorPoints).toBe(
            "The tail is at -5 comma 0 and the tip is at 5 comma 0.",
        );
        expect(strings.srVectorTipPoint).toBe("Tip point at 5 comma 0.");
        expect(strings.srVectorGrabHandle).toBe(
            "Vector from -5 comma 0 to 5 comma 0.",
        );
        expect(strings.srVectorInteractiveElement).toBe(
            "Interactive elements: A vector on a coordinate plane. The tail is at -5 comma 0 and the tip is at 5 comma 0.",
        );
    });

    it("describes a vector with updated points", () => {
        // Arrange, Act
        const strings = describeVectorGraph(
            {
                ...baseVectorState,
                coords: [
                    [1, 2],
                    [4, 6],
                ],
            },
            mockPerseusI18nContext,
        );

        // Assert
        expect(strings.srVectorGraph).toBe("A vector on a coordinate plane.");
        expect(strings.srVectorPoints).toBe(
            "The tail is at 1 comma 2 and the tip is at 4 comma 6.",
        );
        expect(strings.srVectorTipPoint).toBe("Tip point at 4 comma 6.");
        expect(strings.srVectorGrabHandle).toBe(
            "Vector from 1 comma 2 to 4 comma 6.",
        );
    });
});

describe("getVectorTipKeyboardConstraint", () => {
    it("returns standard moves when tip does not overlap tail", () => {
        // Arrange
        const tail: [number, number] = [0, 0];
        const tip: [number, number] = [3, 3];
        const snapStep: [number, number] = [1, 1];

        // Act
        const constraint = getVectorTipKeyboardConstraint(tail, tip, snapStep);

        // Assert
        expect(constraint.up).toEqual([3, 4]);
        expect(constraint.down).toEqual([3, 2]);
        expect(constraint.left).toEqual([2, 3]);
        expect(constraint.right).toEqual([4, 3]);
    });

    it("skips past the tail when a move would overlap", () => {
        // Arrange — tip is one step right of tail; moving left would overlap
        const tail: [number, number] = [0, 0];
        const tip: [number, number] = [1, 0];
        const snapStep: [number, number] = [1, 1];

        // Act
        const constraint = getVectorTipKeyboardConstraint(tail, tip, snapStep);

        // Assert — moving left skips past the tail to [-1, 0]
        expect(constraint.left).toEqual([-1, 0]);
    });

    it("skips past the tail when a move would overlap vertically", () => {
        // Arrange — tip is one step above tail; moving down would overlap
        const tail: [number, number] = [0, 0];
        const tip: [number, number] = [0, 1];
        const snapStep: [number, number] = [1, 1];

        // Act
        const constraint = getVectorTipKeyboardConstraint(tail, tip, snapStep);

        // Assert — moving down skips past the tail to [0, -1]
        expect(constraint.down).toEqual([0, -1]);
    });
});
