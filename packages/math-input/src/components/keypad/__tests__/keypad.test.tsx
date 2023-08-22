import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import "@testing-library/jest-dom";

import keyConfigs from "../../../data/key-configs";
import {CursorContext} from "../../input/cursor-contexts";
import Keypad from "../index";

import tabs from "./test-data-tabs";

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
                        cursorContext={
                            context as typeof CursorContext[keyof typeof CursorContext]
                        }
                        onAnalyticsEvent={async () => {
                            /* TODO: verify correct analytics event sent */
                        }}
                    />,
                );

                // Assert
                expect(
                    screen.getByRole("button", {
                        name: ariaLabel,
                    }),
                ).toBeInTheDocument();
            });
        });
    });

    it(`shows optional dismiss button`, () => {
        // Arrange
        // Act
        render(
            <Keypad
                onClickKey={() => {}}
                onAnalyticsEvent={async () => {}}
                showDismiss
            />,
        );

        // Assert
        expect(
            screen.getByRole("tab", {
                name: "Dismiss",
            }),
        ).toBeInTheDocument();
    });

    it(`hides optional dismiss button`, () => {
        // Arrange
        // Act
        render(
            <Keypad onClickKey={() => {}} onAnalyticsEvent={async () => {}} />,
        );

        // Assert
        expect(
            screen.queryByRole("tab", {
                name: "Dismiss",
            }),
        ).not.toBeInTheDocument();
    });

    it(`hides the tabs if providing the Fraction Keypad`, () => {
        // Arrange
        // Act
        render(
            <Keypad
                onClickKey={() => {}}
                fractionsOnly={true}
                onAnalyticsEvent={async () => {}}
            />,
        );

        // Assert
        expect(screen.queryByRole("tab")).not.toBeInTheDocument();
    });

    it(`clicking tab triggers callback`, () => {
        // Arrange
        const onClickKey = jest.fn();

        // Act
        render(
            <Keypad
                onClickKey={onClickKey}
                preAlgebra
                trigonometry
                extraKeys={["PI"]}
                onAnalyticsEvent={async () => {}}
            />,
        );

        for (const tabData of tabs) {
            const tab = screen.getByLabelText(tabData.name);
            expect(tab).toBeInTheDocument();
            userEvent.click(tab);
            const key = screen.getByLabelText(tabData.label);
            expect(key).toBeInTheDocument();
            userEvent.click(key);
        }

        // Assert
        expect(onClickKey).toHaveBeenCalledTimes(tabs.length);
    });
});
