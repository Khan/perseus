import "@testing-library/jest-dom";
import {
    screen,
    render,
    fireEvent,
    within,
    waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, {useState} from "react";

import {KeypadType} from "../../enums";
import MathInput from "../input/math-input";
import {MobileKeypad} from "../keypad";
import {KeypadContext, StatefulKeypadContextProvider} from "../keypad-context";

import type {KeypadConfiguration} from "../../types";

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
    it("renders", () => {
        render(<ConnectedMathInput />);

        expect(
            screen.getByLabelText(
                "Math input box Tap with one or two fingers to open keyboard",
            ),
        ).toBeInTheDocument();
    });

    it("doesn't show the keypad initially", () => {
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

    it("shows the keypad after input click-interaction", async () => {
        render(<ConnectedMathInput />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        userEvent.click(input);

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

        userEvent.click(screen.getByRole("button", {name: "1"}));

        // MathQuill is problematic,
        // this is the only way I know how to test the "input"
        const mathquillInput =
            // eslint-disable-next-line testing-library/no-node-access
            document.getElementsByClassName("mq-root-block")[0] as HTMLElement;
        const span1 = within(mathquillInput).getByText("1");

        expect(span1).toBeVisible();
    });
});
