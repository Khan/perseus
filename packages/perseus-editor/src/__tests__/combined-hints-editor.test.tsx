import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import CombinedHintsEditor from "../combined-hints-editor";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors.testutils";

import type {UserEvent} from "@testing-library/user-event";

describe("CombinedHintsEditor", () => {
    beforeAll(() => {
        registerAllWidgetsAndEditorsForTesting();
    });

    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("numbers each hint title by its position", () => {
        // Arrange, Act
        render(
            <CombinedHintsEditor
                deviceType="phone"
                previewURL="about:blank"
                highlightLint={false}
                hints={[
                    {content: "First", widgets: {}, images: {}},
                    {content: "Second", widgets: {}, images: {}},
                    {content: "Third", widgets: {}, images: {}},
                ]}
            />,
        );

        // Assert
        const titles = screen.getAllByText(/^Hint \d$/);
        expect(titles.map((title) => title.textContent)).toEqual([
            "Hint 1",
            "Hint 2",
            "Hint 3",
        ]);
    });

    it("includes the hint number in each hint's button labels", () => {
        // Arrange, Act
        render(
            <CombinedHintsEditor
                deviceType="phone"
                previewURL="about:blank"
                highlightLint={false}
                hints={[
                    {content: "First", widgets: {}, images: {}},
                    {content: "Second", widgets: {}, images: {}},
                ]}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Move hint 2 up"}),
        ).toBeVisible();
        expect(
            screen.getByRole("button", {name: "Move hint 2 down"}),
        ).toBeVisible();
        expect(
            screen.getByRole("button", {name: "Remove hint 2"}),
        ).toBeVisible();
    });

    it("should confirm before removing a hint", async () => {
        // Arrange
        const comfirmSpy = jest.spyOn(window, "confirm").mockReturnValue(false);
        render(
            <CombinedHintsEditor
                deviceType="phone"
                previewURL="about:blank"
                highlightLint={false}
                hints={[
                    {content: "You know this one!", widgets: {}, images: {}},
                    {content: "Ok, the answer is 3", widgets: {}, images: {}},
                ]}
            />,
        );

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Remove hint 1"}),
        );

        // Assert
        expect(comfirmSpy).toHaveBeenCalled();
    });

    it("should not remove the hint if not confirmed", async () => {
        // Arrange
        jest.spyOn(window, "confirm").mockReturnValue(false);
        const onChangeMock = jest.fn();
        render(
            <CombinedHintsEditor
                deviceType="phone"
                previewURL="about:blank"
                highlightLint={false}
                hints={[
                    {content: "You know this one!", widgets: {}, images: {}},
                    {content: "Ok, the answer is 3", widgets: {}, images: {}},
                ]}
                onChange={onChangeMock}
            />,
        );

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Remove hint 1"}),
        );

        // Assert
        expect(onChangeMock).not.toHaveBeenCalled();
    });

    it("should remove the hint if confirmed", async () => {
        // Arrange
        jest.spyOn(window, "confirm").mockReturnValue(true);
        const onChangeMock = jest.fn();
        render(
            <CombinedHintsEditor
                deviceType="phone"
                previewURL="about:blank"
                highlightLint={false}
                hints={[
                    {content: "You know this one!", widgets: {}, images: {}},
                    {content: "Ok, the answer is 3", widgets: {}, images: {}},
                ]}
                onChange={onChangeMock}
            />,
        );

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Remove hint 1"}),
        );

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            hints: [{content: "Ok, the answer is 3", widgets: {}, images: {}}],
        });
    });

    it("should disable all editor components when editingDisabled is set", () => {
        render(
            <CombinedHintsEditor
                deviceType="phone"
                previewURL="about:blank"
                apiOptions={{editingDisabled: true}}
                highlightLint={false}
                hints={[
                    {content: "You know this one!", widgets: {}, images: {}},
                ]}
            />,
        );

        const removeButton = screen.getByRole("button", {
            name: "Remove hint 1",
        });
        const addButton = screen.getByRole("button", {name: "Add a hint"});

        expect(removeButton).toHaveAttribute("aria-disabled", "true");
        expect(addButton).toHaveAttribute("aria-disabled", "true");
    });
});
