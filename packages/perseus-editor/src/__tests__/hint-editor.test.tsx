import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import CombinedHintsEditor from "../hint-editor";

import type {Hint} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const blankHint: Hint = {content: "", widgets: {}, images: {}, replace: false};

describe("CombinedHintsEditor", () => {
    let userEvent: UserEvent;
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
                    {...blankHint, content: "You know this one!"},
                    {...blankHint, content: "Ok, the answer is 3"},
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
                    {...blankHint, content: "You know this one!"},
                    {...blankHint, content: "Ok, the answer is 3"},
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
                    {...blankHint, content: "You know this one!"},
                    {...blankHint, content: "Ok, the answer is 3"},
                ]}
                onChange={onChangeMock}
            />,
        );

        // Act
        await userEvent.click(screen.getAllByText("Remove this hint")[0]);

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            hints: [{...blankHint, content: "Ok, the answer is 3"}],
        });
    });
});
