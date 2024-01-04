import * as wbi18n from "@khanacademy/wonder-blocks-i18n";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import "@testing-library/jest-dom";

import keyConfigs from "../../../data/key-configs";
import * as utils from "../../../utils";
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
    const originalDecimalSeparator = utils.decimalSeparator;

    afterEach(() => {
        // @ts-expect-error TS2540 - Cannot assign to 'decimalSeparator' because it is a read-only property.
        // eslint-disable-next-line import/namespace
        utils.decimalSeparator = originalDecimalSeparator;
    });

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

    it("should snapshot unexpanded", () => {
        // Arrange
        // Act
        const {container} = render(
            <Keypad
                onClickKey={() => {}}
                preAlgebra
                trigonometry
                extraKeys={["PI"]}
                onAnalyticsEvent={async () => {}}
                expandedView={false}
            />,
        );

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot expanded", () => {
        // Arrange
        // Act
        const {container} = render(
            <Keypad
                onClickKey={() => {}}
                preAlgebra
                trigonometry
                extraKeys={["PI"]}
                onAnalyticsEvent={async () => {}}
                expandedView={true}
            />,
        );

        // Assert
        expect(container).toMatchSnapshot("first render");
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

    it(`shows the dot symbol when convertDotToTimes is false`, () => {
        // Arrange
        // Act
        render(
            <Keypad
                onClickKey={() => {}}
                convertDotToTimes={false}
                onAnalyticsEvent={async () => {}}
            />,
        );

        // Assert
        expect(screen.getByTestId("CDOT")).toBeInTheDocument();
    });

    it(`shows the times symbol when convertDotToTimes is true`, () => {
        // Arrange
        // Act
        render(
            <Keypad
                onClickKey={() => {}}
                convertDotToTimes={true}
                onAnalyticsEvent={async () => {}}
            />,
        );

        // Assert
        expect(screen.getByTestId("TIMES")).toBeInTheDocument();
    });

    it(`forces CDOT in locales that require it`, () => {
        // Arrange
        jest.spyOn(wbi18n, "getLocale").mockReturnValue("az");

        // Act
        render(
            <Keypad
                onClickKey={() => {}}
                convertDotToTimes={true}
                onAnalyticsEvent={async () => {}}
            />,
        );

        // Assert
        expect(screen.getByTestId("CDOT")).toBeInTheDocument();
        expect(screen.queryByTestId("TIMES")).not.toBeInTheDocument();
    });

    it(`forces TIMES in locales that require it`, () => {
        // Arrange
        jest.spyOn(wbi18n, "getLocale").mockReturnValue("fr");

        // Act
        render(
            <Keypad
                onClickKey={() => {}}
                convertDotToTimes={false}
                onAnalyticsEvent={async () => {}}
            />,
        );

        // Assert
        expect(screen.getByTestId("TIMES")).toBeInTheDocument();
        expect(screen.queryByTestId("CDOT")).not.toBeInTheDocument();
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

    it(`does not show navigation pad with expanded view turned off`, () => {
        // Arrange
        // Act
        render(
            <Keypad
                onClickKey={() => {}}
                preAlgebra
                trigonometry
                extraKeys={["PI"]}
                onAnalyticsEvent={async () => {}}
                expandedView={false}
            />,
        );

        // Assert
        expect(
            screen.queryByRole("button", {name: "Up arrow"}),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByRole("button", {name: "Right arrow"}),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByRole("button", {name: "Down arrow"}),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByRole("button", {name: "Left arrow"}),
        ).not.toBeInTheDocument();
    });

    it(`shows navigation pad in expanded view`, () => {
        // Arrange
        // Act
        render(
            <Keypad
                onClickKey={() => {}}
                preAlgebra
                trigonometry
                extraKeys={["PI"]}
                onAnalyticsEvent={async () => {}}
                expandedView={true}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Up arrow"}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Right arrow"}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Down arrow"}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Left arrow"}),
        ).toBeInTheDocument();
    });

    it(`can show the comma decimal separator`, () => {
        // @ts-expect-error TS2540 - Cannot assign to 'decimalSeparator' because it is a read-only property.
        // eslint-disable-next-line import/namespace
        utils.decimalSeparator = utils.DecimalSeparator.COMMA;

        // Arrange
        // Act
        render(
            <Keypad onClickKey={() => {}} onAnalyticsEvent={async () => {}} />,
        );

        // Assert
        expect(screen.getByTestId("comma-decimal")).toBeInTheDocument();
    });

    it(`can show the period decimal separator`, () => {
        // Arrange
        // Act
        render(
            <Keypad onClickKey={() => {}} onAnalyticsEvent={async () => {}} />,
        );

        // Assert
        expect(screen.getByTestId("period-decimal")).toBeInTheDocument();
    });
});
