import {render, screen} from "@testing-library/react";
import * as React from "react";

import keyConfigs from "../../../data/key-configs";
import {CursorContext} from "../../input/cursor-contexts";
import Keypad from "../index";

const contextToKeyAria = {
    [CursorContext.IN_PARENS]: keyConfigs.JUMP_OUT_PARENTHESES.ariaLabel,
    [CursorContext.IN_SUPER_SCRIPT]: keyConfigs.JUMP_OUT_EXPONENT.ariaLabel,
    [CursorContext.IN_SUB_SCRIPT]: keyConfigs.JUMP_OUT_BASE.ariaLabel,
    [CursorContext.IN_NUMERATOR]: keyConfigs.JUMP_OUT_NUMERATOR.ariaLabel,
    [CursorContext.IN_DENOMINATOR]: keyConfigs.JUMP_OUT_DENOMINATOR.ariaLabel,
    [CursorContext.BEFORE_FRACTION]: keyConfigs.JUMP_INTO_NUMERATOR.ariaLabel,
};

describe("keypad", () => {
    describe("shows navigation buttons", () => {
        Object.entries(contextToKeyAria).forEach(([context, ariaLabel]) => {
            it(`shows button for ${context}`, () => {
                // Arrange
                // Act
                render(
                    <Keypad
                        onClickKey={() => {}}
                        cursorContext={context as CursorContext}
                        sendEvent={async () => {
                            /* TODO: verify correct analytics event sent */
                        }}
                    />,
                );

                // Assert
                expect(
                    screen.getByRole("button", {
                        name: ariaLabel,
                    }),
                );
            });
        });
    });
});
