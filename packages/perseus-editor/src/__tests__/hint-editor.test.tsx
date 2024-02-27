import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import CombinedHintsEditor from "../hint-editor";

describe("CombinedHintsEditor", () => {
    let userEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("should render", () => {
        render(
            <CombinedHintsEditor deviceType="phone" previewURL="about:blank" />,
        );
    });

    it("should confirm before removing a hint", async () => {
        // Arrange
        const comfirmSpy = jest.spyOn(window, "confirm").mockReturnValue(false);
        render(
            <CombinedHintsEditor
                deviceType="phone"
                previewURL="about:blank"
                hints={[
                    {content: "You know this one!", widgets: {}, images: {}},
                    {content: "Ok, the answer is 3", widgets: {}, images: {}},
                ]}
            />,
        );

        // Act
        await userEvent.click(screen.getAllByText("Remove this hint")[0]);

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
                hints={[
                    {content: "You know this one!", widgets: {}, images: {}},
                    {content: "Ok, the answer is 3", widgets: {}, images: {}},
                ]}
                onChange={onChangeMock}
            />,
        );

        // Act
        await userEvent.click(screen.getAllByText("Remove this hint")[0]);

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
                hints={[
                    {content: "You know this one!", widgets: {}, images: {}},
                    {content: "Ok, the answer is 3", widgets: {}, images: {}},
                ]}
                onChange={onChangeMock}
            />,
        );

        // Act
        await userEvent.click(screen.getAllByText("Remove this hint")[0]);

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            hints: [{content: "Ok, the answer is 3", widgets: {}, images: {}}],
        });
    });
});
