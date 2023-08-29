import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import "@testing-library/jest-dom";

import Keys from "../../../data/key-configs";
import {KeypadButton} from "../keypad-button";

describe("<KeypadButton />", () => {
    it("uses the aria label from the key config", () => {
        // Arrange
        render(
            <KeypadButton
                onClickKey={() => {}}
                keyConfig={Keys.LEFT_PAREN}
                coord={[0, 0]}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Left parenthesis"}),
        ).toBeInTheDocument();
    });

    it("handles onClickKey callback with click", () => {
        // Arrange
        // persist event to prevent React from releasing/nullifying before assertion
        const mockClickKeyCallback = jest.fn((_, event) => event.persist());
        render(
            <KeypadButton
                onClickKey={mockClickKeyCallback}
                keyConfig={Keys.LEFT_PAREN}
                coord={[0, 0]}
            />,
        );

        // Act
        userEvent.click(screen.getByRole("button", {name: "Left parenthesis"}));

        // Assert
        expect(mockClickKeyCallback).toHaveBeenCalledWith(
            "LEFT_PAREN",
            expect.objectContaining({
                type: "click",
                detail: 1,
            }),
        );
    });

    it("handles onClickKey callback with keyboard press", () => {
        // Arrange
        // persist event to prevent React from releasing/nullifying before assertion
        const mockClickKeyCallback = jest.fn((_, event) => event.persist());
        render(
            <KeypadButton
                onClickKey={mockClickKeyCallback}
                keyConfig={Keys.RIGHT_PAREN}
                coord={[0, 0]}
            />,
        );

        // Act
        screen.getByRole("button", {name: "Right parenthesis"}).focus();
        userEvent.keyboard("{enter}");

        // Assert
        expect(mockClickKeyCallback).toHaveBeenCalledWith(
            "RIGHT_PAREN",
            // In the browser, "enter" and "space" trigger a click event with detail 0.
            //   However, there is a bug in this version (13.5) of RTL that prevents
            //   "keypress" from being fired, which handles the click event.
            //   https://github.com/testing-library/user-event/blob/5d946d51d643f0ef7e7730fa527b7ca96e330907/src/keyboard/plugins/functional.ts#L99
            //   https://github.com/testing-library/user-event/issues/766
            //   The only event fired is `keyDown`, which is inconsistent with the
            //   browser. If you're reading this and we have upgraded to 14+, please
            //   uncomment the `type` assertion below.
            expect.objectContaining({
                // type: "click",
                detail: 0,
            }),
        );
    });
});
