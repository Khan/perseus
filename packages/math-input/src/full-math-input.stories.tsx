import * as React from "react";

import {KeypadAPI} from "./types";

import {KeypadInput, KeypadType, Keypad} from "./index";

export default {
    title: "Full Mobile MathInput",
};

export const Basic = () => {
    const [value, setValue] = React.useState("");
    // Reference to the keypad
    const [keypadElement, setKeypadElement] = React.useState<KeypadAPI>();
    // Whether to use Expression or Fraction keypad
    const [expression, setExpression] = React.useState<boolean>(true);
    // Whether to use v1 or v2 keypad
    const [v2Keypad, setV2Keypad] = React.useState<boolean>(true);

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

            <Keypad
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
