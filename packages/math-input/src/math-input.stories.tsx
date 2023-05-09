import * as React from "react";

import {Keypad, KeypadInput, KeypadType} from "./index";

export default {
    title: "Full MathInput",
};

export const Basic = () => {
    const [value, setValue] = React.useState("");
    const [keypadElement, setKeypadElement] = React.useState<any>(null);
    const [keypadType, setKeypadType] = React.useState<KeypadType>(
        KeypadType.FRACTION,
    );

    React.useEffect(() => {
        keypadElement?.configure({
            keypadType: keypadType,
            extraKeys: ["x", "y", "PI", "THETA"],
        });
    }, [keypadElement, keypadType]);

    function handleChangeKeypadType() {
        setKeypadType(
            keypadType === KeypadType.FRACTION
                ? KeypadType.EXPRESSION
                : KeypadType.FRACTION,
        );
    }

    return (
        <div>
            <div style={{padding: "1rem 0"}}>
                <button onClick={handleChangeKeypadType}>
                    {`Use ${
                        keypadType === KeypadType.FRACTION
                            ? "Expression"
                            : "Fraction"
                    } Keypad`}
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
                    if (node && !keypadElement) {
                        setKeypadElement(node);
                    }
                }}
            />
        </div>
    );
};
