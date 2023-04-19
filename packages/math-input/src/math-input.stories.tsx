import * as React from "react";

import {Keypad, KeypadInput, KeypadTypes} from "./index";

export default {
    title: "Full MathInput",
};

export const Basic = () => {
    const [value, setValue] = React.useState("");
    const [keypadElement, setKeypadElement] = React.useState(null);
    const [keypadType, setKeypadType] = React.useState<
        keyof typeof KeypadTypes
    >(KeypadTypes.FRACTION);

    React.useEffect(() => {
        keypadElement?.configure({
            keypadType: keypadType,
            extraKeys: ["x", "y", "PI", "THETA"],
        });
    }, [keypadElement, keypadType]);

    function handleChangeKeypadType() {
        setKeypadType(
            keypadType === KeypadTypes.FRACTION
                ? KeypadTypes.EXPRESSION
                : KeypadTypes.FRACTION,
        );
    }

    return (
        <div>
            <div style={{padding: "1rem 0"}}>
                <button onClick={handleChangeKeypadType}>
                    {`Use ${
                        keypadType === KeypadTypes.FRACTION
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
