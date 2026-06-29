import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../testing/test-dependencies";

import ShowPointLabelsToggle from "./show-point-labels-toggle";

import type {UserEvent} from "@testing-library/user-event";

describe("ShowPointLabelsToggle", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("disables the toggle when pointLabels is undefined", () => {
        // Arrange, Act
        render(
            <ShowPointLabelsToggle
                showPointLabels={false}
                pointLabels={undefined}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(screen.getByLabelText("Show point labels")).toHaveAttribute(
            "aria-disabled",
            "true",
        );
    });

    it("disables the toggle when every pointLabels entry is empty", () => {
        // Arrange, Act
        render(
            <ShowPointLabelsToggle
                showPointLabels={false}
                pointLabels={["", ""]}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(screen.getByLabelText("Show point labels")).toHaveAttribute(
            "aria-disabled",
            "true",
        );
    });

    it("enables the toggle when at least one pointLabels entry is non-empty", () => {
        // Arrange, Act
        render(
            <ShowPointLabelsToggle
                showPointLabels={false}
                pointLabels={["A", ""]}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(screen.getByLabelText("Show point labels")).not.toHaveAttribute(
            "aria-disabled",
            "true",
        );
    });

    it("enables the toggle when every pointLabels entry is non-empty", () => {
        // Arrange, Act
        render(
            <ShowPointLabelsToggle
                showPointLabels={false}
                pointLabels={["A", "B"]}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(screen.getByLabelText("Show point labels")).not.toHaveAttribute(
            "aria-disabled",
            "true",
        );
    });

    it("renders the toggle as checked when showPointLabels is true", () => {
        // Arrange, Act
        render(
            <ShowPointLabelsToggle
                showPointLabels={true}
                pointLabels={["A", "B"]}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(screen.getByLabelText("Show point labels")).toBeChecked();
    });

    it("calls onChange when the author toggles it on", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ShowPointLabelsToggle
                showPointLabels={false}
                pointLabels={["A", "B"]}
                onChange={onChangeMock}
            />,
        );

        // Act
        await userEvent.click(screen.getByLabelText("Show point labels"));

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith(true);
    });
});
