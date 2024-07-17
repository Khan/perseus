import {
    screen,
    render,
    fireEvent,
    within,
    waitFor,
} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import MathQuill from "mathquill";
import React, {useState} from "react";

import {KeypadType} from "../../enums";
import MathInput from "../input/math-input";
import {MobileKeypad} from "../keypad";
import {KeypadContext, StatefulKeypadContextProvider} from "../keypad-context";

import type {KeypadConfiguration} from "../../types";

const MQ = MathQuill.getInterface(3);

const defaultConfiguration: KeypadConfiguration = {
    keypadType: KeypadType.FRACTION,
};

function InputWithContext({keypadConfiguration}) {
    const [value, setValue] = useState<string>("");

    return (
        <KeypadContext.Consumer>
            {({keypadElement}) => {
                return (
                    <MathInput
                        keypadElement={keypadElement as any}
                        value={value}
                        onChange={(nextValue, cb) => {
                            setValue(nextValue);
                            cb();
                        }}
                        onFocus={() => {
                            keypadElement?.configure(
                                keypadConfiguration,
                                () => {
                                    keypadElement?.activate();
                                },
                            );
                        }}
                        onBlur={() => {
                            keypadElement?.dismiss();
                        }}
                    />
                );
            }}
        </KeypadContext.Consumer>
    );
}

function KeypadWithContext() {
    return (
        <KeypadContext.Consumer>
            {({setKeypadElement}) => {
                return (
                    <MobileKeypad
                        onElementMounted={setKeypadElement}
                        onDismiss={() => {}}
                        onAnalyticsEvent={async () => {}}
                    />
                );
            }}
        </KeypadContext.Consumer>
    );
}

function ConnectedMathInput({keypadConfiguration = defaultConfiguration}) {
    return (
        <StatefulKeypadContextProvider>
            <InputWithContext keypadConfiguration={keypadConfiguration} />
            <KeypadWithContext />
        </StatefulKeypadContextProvider>
    );
}

describe("math input integration", () => {
    let userEvent: ReturnType<typeof userEventLib.setup>;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("renders", async () => {
        render(<ConnectedMathInput />);

        expect(
            screen.getByLabelText(
                "Math input box Tap with one or two fingers to open keyboard",
            ),
        ).toBeInTheDocument();
    });

    it("doesn't show the keypad initially", async () => {
        render(<ConnectedMathInput />);

        expect(
            screen.queryByRole("button", {name: "1"}),
        ).not.toBeInTheDocument();
    });

    it("shows the keypad after input touch-interaction", async () => {
        render(<ConnectedMathInput />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        await waitFor(() => {
            expect(screen.getByRole("button", {name: "4"})).toBeVisible();
        });

        expect(screen.getByRole("button", {name: "1"})).toBeVisible();
    });

    it("shows the keypad after input is focused via tab", async () => {
        // Arrange
        render(<ConnectedMathInput />);

        // The textbox role and label is on the wrapper; tabIndex=0 is on first child
        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
            // eslint-disable-next-line testing-library/no-node-access
        ).firstElementChild;

        // Act
        await userEvent.tab();

        // Assert
        expect(input).toHaveFocus();

        await waitFor(() => {
            expect(screen.getByRole("button", {name: "4"})).toBeVisible();
        });

        expect(screen.getByRole("button", {name: "1"})).toBeVisible();
    });

    it("shows the keypad after input click-interaction", async () => {
        render(<ConnectedMathInput />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        await userEvent.click(input);

        await waitFor(() => {
            expect(screen.getByRole("button", {name: "4"})).toBeVisible();
        });

        expect(screen.getByRole("button", {name: "1"})).toBeVisible();
    });

    it("updates input when using keypad", async () => {
        render(<ConnectedMathInput />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        await waitFor(() => {
            expect(screen.getByRole("button", {name: "4"})).toBeVisible();
        });

        await userEvent.click(screen.getByRole("button", {name: "1"}));

        // MathQuill is problematic,
        // this is the only way I know how to test the "input"
        const mathquillInput =
            // eslint-disable-next-line testing-library/no-node-access
            document.getElementsByClassName("mq-root-block")[0] as HTMLElement;
        const span1 = within(mathquillInput).getByText("1");

        expect(span1).toBeVisible();
    });

    it("updates input when pressing many numbers", async () => {
        render(<ConnectedMathInput />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        await waitFor(() => {
            expect(screen.getByRole("button", {name: "4"})).toBeVisible();
        });

        for (const num of [8, 6, 7, 5, 3, 0, 9]) {
            await userEvent.click(screen.getByRole("button", {name: `${num}`}));
        }

        // MathQuill is problematic,
        // this is how to get the value of the input directly from MQ
        const mathquillInstance = MQ(
            // eslint-disable-next-line testing-library/no-node-access
            document.getElementsByClassName(
                "mq-editable-field",
            )[0] as HTMLElement,
        );

        expect(mathquillInstance?.latex()).toBe("8675309");
    });

    it("can handle symbols", async () => {
        render(<ConnectedMathInput />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        await waitFor(() => {
            expect(screen.getByRole("button", {name: "4"})).toBeVisible();
        });

        await userEvent.click(screen.getByRole("button", {name: "4"}));
        await userEvent.click(screen.getByRole("button", {name: "2"}));
        await userEvent.click(screen.getByRole("button", {name: "Percent"}));

        // MathQuill is problematic,
        // this is how to get the value of the input directly from MQ
        const mathquillInstance = MQ(
            // eslint-disable-next-line testing-library/no-node-access
            document.getElementsByClassName(
                "mq-editable-field",
            )[0] as HTMLElement,
        );

        expect(mathquillInstance?.latex()).toBe("42\\%");
    });

    it("handles fractions correctly in expression", async () => {
        const keypadConfiguration = {
            keypadType: KeypadType.EXPRESSION,
        };
        render(
            <ConnectedMathInput keypadConfiguration={keypadConfiguration} />,
        );

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        await waitFor(() => {
            expect(screen.getByRole("button", {name: "4"})).toBeVisible();
        });

        await userEvent.click(screen.getByRole("button", {name: "1"}));
        await userEvent.click(
            screen.getByRole("button", {
                name: "Fraction, excluding the current expression",
            }),
        );
        await userEvent.click(screen.getByRole("button", {name: "4"}));
        await userEvent.click(
            screen.getByRole("button", {
                name: "Navigate right out of the numerator and into the denominator",
            }),
        );
        await userEvent.click(screen.getByRole("button", {name: "2"}));

        // MathQuill is problematic,
        // this is how to get the value of the input directly from MQ
        const mathquillInstance = MQ(
            // eslint-disable-next-line testing-library/no-node-access
            document.getElementsByClassName(
                "mq-editable-field",
            )[0] as HTMLElement,
        );

        expect(mathquillInstance?.latex()).toBe("1\\frac{4}{2}");
    });

    it("handles fractions correctly in fraction", async () => {
        render(<ConnectedMathInput />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        await waitFor(() => {
            expect(screen.getByRole("button", {name: "4"})).toBeVisible();
        });

        await userEvent.click(screen.getByRole("button", {name: "1"}));
        await userEvent.click(
            screen.getByRole("button", {
                name: "Fraction, excluding the current expression",
            }),
        );
        await userEvent.click(screen.getByRole("button", {name: "4"}));
        await userEvent.click(
            screen.getByRole("button", {
                name: "Navigate right out of the numerator and into the denominator",
            }),
        );
        await userEvent.click(screen.getByRole("button", {name: "2"}));

        // MathQuill is problematic,
        // this is how to get the value of the input directly from MQ
        const mathquillInstance = MQ(
            // eslint-disable-next-line testing-library/no-node-access
            document.getElementsByClassName(
                "mq-editable-field",
            )[0] as HTMLElement,
        );

        expect(mathquillInstance?.latex()).toBe("1\\frac{4}{2}");
    });
});
