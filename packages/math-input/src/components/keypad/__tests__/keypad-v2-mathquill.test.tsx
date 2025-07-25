import Color from "@khanacademy/wonder-blocks-color";
import {Popover} from "@khanacademy/wonder-blocks-popover";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom";

import keyTranslator from "../../key-handlers/key-translator";
import Keypad from "../index";

import type Key from "../../../data/keys";
import type {AnalyticsEventHandlerFn} from "@khanacademy/perseus-core";

type Props = {
    onChangeMathInput: (mathInputTex: string) => void;
    keypadClosed?: boolean;
    onAnalyticsEvent?: AnalyticsEventHandlerFn;
};

function V2KeypadWithMathquill(props: Props) {
    const mathFieldWrapperRef = React.useRef<HTMLDivElement>(null);
    const mathField = undefined;
    const {keypadClosed, onAnalyticsEvent} = props;
    const [keypadOpen, setKeypadOpen] = React.useState<boolean>(!keypadClosed);

    function handleClickKey(key: Key) {
        if (!mathField) {
            return;
        }

        if (key === "DISMISS") {
            setKeypadOpen(false);
        }

        const mathFieldCallback = keyTranslator[key];
        if (mathFieldCallback) {
            mathFieldCallback(mathField, key);
        }
    }

    return (
        <div style={{maxWidth: "400px", margin: "2em"}}>
            <Popover
                content={
                    <div>
                        <Keypad
                            extraKeys={["a", "b", "c"]}
                            onClickKey={handleClickKey}
                            advancedRelations
                            basicRelations
                            divisionKey
                            logarithms
                            convertDotToTimes
                            preAlgebra
                            trigonometry
                            onAnalyticsEvent={
                                onAnalyticsEvent
                                    ? onAnalyticsEvent
                                    : async () => {}
                            }
                            showDismiss
                        />
                    </div>
                }
                dismissEnabled
                opened={keypadOpen}
            >
                <div
                    style={{
                        width: "100%",
                        marginBottom: "1em",
                        border: `1px solid ${Color.offBlack16}`,
                    }}
                    ref={mathFieldWrapperRef}
                />
            </Popover>
            <button
                aria-label="Keypad toggle"
                onClick={() => setKeypadOpen(!keypadOpen)}
            >
                {keypadOpen ? "close keypad" : "open keypad"}
            </button>
        </div>
    );
}

describe("Keypad v2 with MathQuill", () => {
    it("can write the Pythagorean theorem (simple)", () => {
        // Arrange
        const mockMathInputCallback = jest.fn();
        render(
            <V2KeypadWithMathquill onChangeMathInput={mockMathInputCallback} />,
        );

        // Act

        // a^2
        userEvent.click(screen.getByRole("tab", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "a"}));
        userEvent.click(screen.getByRole("tab", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Square"}));

        // +
        userEvent.click(screen.getByRole("tab", {name: "Numbers"}));
        userEvent.click(screen.getByRole("button", {name: "Plus"}));

        // b^2 =
        userEvent.click(screen.getByRole("tab", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "b"}));
        userEvent.click(screen.getByRole("tab", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Square"}));
        userEvent.click(screen.getByRole("button", {name: "Equals sign"}));

        // c^2
        userEvent.click(screen.getByRole("tab", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "c"}));
        userEvent.click(screen.getByRole("tab", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Square"}));

        // Assert
        expect(mockMathInputCallback).toHaveBeenLastCalledWith("a^2+b^2=c^2");
    });

    it("can write the Pythagorean theorem (complex)", () => {
        // Arrange
        const mockMathInputCallback = jest.fn();
        render(
            <V2KeypadWithMathquill onChangeMathInput={mockMathInputCallback} />,
        );

        // Act

        // c = /Square root
        userEvent.click(screen.getByRole("tab", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "c"}));
        userEvent.click(screen.getByRole("tab", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Equals sign"}));
        userEvent.click(screen.getByRole("button", {name: "Square root"}));

        // a^2
        userEvent.click(screen.getByRole("tab", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "a"}));
        userEvent.click(screen.getByRole("tab", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Square"}));

        // +
        userEvent.click(screen.getByRole("tab", {name: "Numbers"}));
        userEvent.click(screen.getByRole("button", {name: "Plus"}));

        // b^2
        userEvent.click(screen.getByRole("tab", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "b"}));
        userEvent.click(screen.getByRole("tab", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Square"}));

        // Assert
        expect(mockMathInputCallback).toHaveBeenLastCalledWith(
            "c=\\sqrt{a^2+b^2}",
        );
    });

    it("writes the Pythagorean theorem using typing/clicking together", () => {
        // Arrange
        const mockMathInputCallback = jest.fn();
        render(
            <V2KeypadWithMathquill onChangeMathInput={mockMathInputCallback} />,
        );

        // Act

        // Argument is empty because mathquill generates textarea w/o label
        userEvent.type(screen.getByRole("textbox"), "a");
        userEvent.click(screen.getByRole("tab", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Square"}));

        userEvent.type(screen.getByRole("textbox"), "+");

        // b^2
        userEvent.click(screen.getByRole("tab", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "b"}));
        userEvent.click(screen.getByRole("tab", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Square"}));
        userEvent.type(screen.getByRole("textbox"), "=c^2");

        // Assert
        expect(mockMathInputCallback).toHaveBeenLastCalledWith("a^2+b^2=c^2");
    });

    it("deletes from the input using the backspace button", () => {
        // Arrange
        const mockMathInputCallback = jest.fn();
        render(
            <V2KeypadWithMathquill onChangeMathInput={mockMathInputCallback} />,
        );

        // Act

        // a^2
        userEvent.click(screen.getByRole("tab", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "a"}));
        userEvent.click(screen.getByRole("tab", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Square"}));

        // +
        userEvent.click(screen.getByRole("tab", {name: "Numbers"}));
        userEvent.click(screen.getByRole("button", {name: "Plus"}));

        // b^2
        userEvent.click(screen.getByRole("tab", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "b"}));
        userEvent.click(screen.getByRole("tab", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Square"}));

        // =c^2
        userEvent.click(screen.getByRole("button", {name: "Equals sign"}));
        userEvent.click(screen.getByRole("tab", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "c"}));
        userEvent.click(screen.getByRole("tab", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Square"}));

        // Assert
        // make sure the formula was typed correctly
        expect(mockMathInputCallback).toHaveBeenLastCalledWith("a^2+b^2=c^2");

        userEvent.click(screen.getByRole("tab", {name: "Numbers"}));
        // delete: need 14 backspaces in MathQuill to delete `a^2+b^2=c^2`
        for (let i = 0; i < 14; i++) {
            userEvent.click(screen.getByRole("button", {name: "Delete"}));
        }

        expect(mockMathInputCallback).toHaveBeenLastCalledWith("");
    });

    // Keypad event tests
    it("fires the keypad open event on open", () => {
        // Arrange
        const mockAnalyticsEventHandler = jest.fn();
        render(
            <V2KeypadWithMathquill
                onChangeMathInput={() => {}}
                keypadClosed={true}
                onAnalyticsEvent={mockAnalyticsEventHandler}
            />,
        );

        // Act
        userEvent.click(screen.getByRole("button", {name: "Keypad toggle"}));

        // Assert
        expect(mockAnalyticsEventHandler).toHaveBeenLastCalledWith({
            type: "math-input:keypad-opened",
            payload: {virtualKeypadVersion: "MATH_INPUT_KEYPAD_V2"},
        });
    });

    // Keypad event tests
    it("fires the keypad open event on close", () => {
        // Arrange
        const mockAnalyticsEventHandler = jest.fn();
        render(
            <V2KeypadWithMathquill
                onChangeMathInput={() => {}}
                onAnalyticsEvent={mockAnalyticsEventHandler}
            />,
        );

        // Act
        userEvent.click(screen.getByRole("button", {name: "Keypad toggle"}));

        // Assert
        expect(mockAnalyticsEventHandler).toHaveBeenLastCalledWith({
            type: "math-input:keypad-closed",
            payload: {virtualKeypadVersion: "MATH_INPUT_KEYPAD_V2"},
        });
    });
});
