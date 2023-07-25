import * as React from "react";

import MobileKeypad from "./components/keypad/mobile-keypad";

import {KeypadInput, KeypadType, LegacyKeypad} from "./index";

export default {
    title: "Full Mobile MathInput",
};

export const Basic = () => {
    const [value, setValue] = React.useState("");
    // Reference to the keypad
    const [keypadElement, setKeypadElement] = React.useState<any>(null);
    // Whether to use Expression or Fraction keypad
    const [expression, setExpression] = React.useState<boolean>(true);
    // Whether to use v1 or v2 keypad
    const [legacyKeypad, setLegacyKeypad] = React.useState<boolean>(false);

    React.useEffect(() => {
        keypadElement?.configure({
            keypadType: expression
                ? KeypadType.EXPRESSION
                : KeypadType.FRACTION,
            extraKeys: expression ? ["x", "y", "PI", "THETA"] : [],
        });
    }, [keypadElement, expression]);

    return (
        <div>
            <div style={{padding: "1rem 0"}}>
                <button onClick={() => setExpression(!expression)}>
                    {`Use ${expression ? "Fraction" : "Expression"} Keypad`}
                </button>
                <button onClick={() => setLegacyKeypad(!legacyKeypad)}>
                    {`Use ${legacyKeypad ? "New" : "Legacy"} Keypad`}
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

            {legacyKeypad ? (
                <LegacyKeypad
                    onElementMounted={(node) => {
                        if (node) {
                            setKeypadElement(node);
                        }
                    }}
                />
            ) : (
                <MobileKeypad
                    onElementMounted={(node) => {
                        if (node) {
                            setKeypadElement(node);
                        }
                    }}
                />
            )}
        </div>
    );
};
