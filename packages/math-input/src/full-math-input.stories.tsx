import {INITIAL_VIEWPORTS} from "@storybook/addon-viewport";
import * as React from "react";
import {KeypadInput, KeypadType, MobileKeypad} from "./index";
import type {KeypadAPI} from "./types";

export default {
    title: "Full Mobile MathInput",
    parameters: {
        backgrounds: {
            default: "light background",
            values: [
                // We want a slightly darker default bg so that we can
                // see the top of the keypad when it is open
                {name: "light background", value: "lightgrey", default: true},
            ],
        },
        viewport: {defaultViewport: "iphone6", viewports: INITIAL_VIEWPORTS},
    },
};

export const Basic = () => {
    const [value, setValue] = React.useState("");
    // Reference to the keypad
    const [keypadElement, setKeypadElement] = React.useState<KeypadAPI>();
    // Whether to use Expression or Fraction keypad
    const [expression, setExpression] = React.useState<boolean>(false);
    // Whether to use v1 or v2 keypad
    const [v2Keypad, setV2Keypad] = React.useState<boolean>(true);
    // Whether the keypad is open or not
    const [keypadOpen, setKeypadOpen] = React.useState<boolean>(false);

    const toggleKeypad = () => {
        if (keypadOpen) {
            keypadElement?.dismiss();
        } else {
            keypadElement?.activate();
        }
        setKeypadOpen(!keypadOpen);
    };

    React.useEffect(() => {
        keypadElement?.configure(
            {
                keypadType: expression
                    ? KeypadType.EXPRESSION
                    : KeypadType.FRACTION,
                extraKeys: expression ? ["x", "y", "PI", "THETA"] : [],
            },
            () => {},
        );
    }, [keypadElement, expression]);

    return (
        <div>
            <div style={{padding: "1rem 0"}}>
                <button onClick={() => setExpression(!expression)}>
                    {`Use ${expression ? "Fraction" : "Expression"} Keypad`}
                </button>
                <button onClick={() => setV2Keypad(!v2Keypad)}>
                    {`Use ${v2Keypad ? "Legacy" : "New"} Keypad`}
                </button>
                <button onClick={() => toggleKeypad()}>
                    {`Toggle Keypad`}
                </button>
            </div>

            <KeypadInput
                value={value}
                keypadElement={keypadElement}
                onChange={(newValue, callback) => {
                    setValue(newValue);
                    callback();
                }}
                onFocus={() => {
                    keypadElement?.activate();
                }}
                onBlur={() => {
                    keypadElement?.dismiss();
                }}
            />

            <MobileKeypad
                onElementMounted={(node) => {
                    if (node) {
                        setKeypadElement(node);
                    }
                }}
                useV2Keypad={v2Keypad}
            />
        </div>
    );
};
