import "@testing-library/jest-dom";
import {screen, render, fireEvent, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MathQuill from "mathquill";
import React, {useState} from "react";

import MathInput from "../input/math-input";
import KeypadContext from "../keypad-context";
import KeypadSwitch from "../keypad-switch";

import type {KeypadAPI} from "../../types";

const MQ = MathQuill.getInterface(2);

function InputWithContext() {
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
                            keypadElement?.activate();
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
                    <KeypadSwitch
                        onElementMounted={setKeypadElement}
                        onDismiss={() => {}}
                        onAnalyticsEvent={async () => {}}
                        useV2Keypad
                    />
                );
            }}
        </KeypadContext.Consumer>
    );
}

function ConnectedMathInput() {
    const [keypadElement, setKeypadElement] = useState<KeypadAPI | null>();
    const [renderer, setRenderer] = useState<any>(null);
    const [scrollableElement, setScrollableElement] =
        useState<HTMLElement | null>();

    return (
        <KeypadContext.Provider
            value={{
                setKeypadElement,
                keypadElement,
                setRenderer,
                renderer,
                setScrollableElement,
                scrollableElement,
            }}
        >
            <InputWithContext />
            <KeypadWithContext />
        </KeypadContext.Provider>
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

    it("shows the keypad after input interaction", async () => {
        render(<ConnectedMathInput />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        expect(screen.getByRole("button", {name: "1"})).toBeVisible();
    });

    it("updates input when using keypad", () => {
        render(<ConnectedMathInput />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);
        userEvent.click(screen.getByRole("button", {name: "1"}));

        // MathQuill is problematic,
        // this is the only way I know how to test the "input"
        const mathquillInput =
            // eslint-disable-next-line testing-library/no-node-access
            document.getElementsByClassName("mq-root-block")[0] as HTMLElement;
        const span1 = within(mathquillInput).getByText("1");

        expect(span1).toBeVisible();
    });

    it("updates input when pressing many numbers", () => {
        render(<ConnectedMathInput />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        const testNumbers = [8, 6, 7, 5, 3, 0, 9];
        testNumbers.forEach((num) => {
            userEvent.click(screen.getByRole("button", {name: `${num}`}));
        });

        // MathQuill is problematic,
        // this is how to get the value of the input directly from MQ
        const mathquillInstance =
            // eslint-disable-next-line testing-library/no-node-access
            MQ(document.getElementsByClassName("mq-editable-field")[0]);

        expect(mathquillInstance.latex()).toBe("8675309");
    });

    it("can handle symbols", () => {
        render(<ConnectedMathInput />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        userEvent.click(screen.getByRole("button", {name: "4"}));
        userEvent.click(screen.getByRole("button", {name: "2"}));
        userEvent.click(screen.getByRole("button", {name: "Percent"}));

        // MathQuill is problematic,
        // this is how to get the value of the input directly from MQ
        const mathquillInstance =
            // eslint-disable-next-line testing-library/no-node-access
            MQ(document.getElementsByClassName("mq-editable-field")[0]);

        expect(mathquillInstance.latex()).toBe("42\\%");
    });
});
