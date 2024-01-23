import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import CombinedHintsEditor from "../hint-editor";

describe("CombinedHintsEditor", () => {
    it("should render", () => {
        render(
            <CombinedHintsEditor deviceType="phone" previewURL="about:blank" />,
        );
    });

    it("should confirm before removing a hint", () => {
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
        userEvent.click(screen.getAllByText("Remove this hint")[0]);

        // Assert
        expect(comfirmSpy).toHaveBeenCalled();
    });

    it("should not remove the hint if not confirmed", () => {
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
        userEvent.click(screen.getAllByText("Remove this hint")[0]);

        // Assert
        expect(onChangeMock).not.toHaveBeenCalled();
    });

    it("should remove the hint if confirmed", () => {
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
        userEvent.click(screen.getAllByText("Remove this hint")[0]);

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            hints: [{content: "Ok, the answer is 3", widgets: {}, images: {}}],
        });
    });
});
