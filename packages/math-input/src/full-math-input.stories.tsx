import {action} from "@storybook/addon-actions";
import * as React from "react";

import type {KeypadAPI} from "./types";

import {KeypadInput, KeypadType, MobileKeypad} from "./index";

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
    },
};

export const Basic = () => {
    const [value, setValue] = React.useState("");
    // Reference to the keypad
    const [keypadElement, setKeypadElement] = React.useState<KeypadAPI>();
    // Whether to use Expression or Fraction keypad
    const [expression, setExpression] = React.useState<boolean>(false);
    // Whether to use CDOT or TIMES
    const [times, setTimes] = React.useState<boolean>(true);
    // Whether to use v1 or v2 keypad
    const [v2Keypad, setV2Keypad] = React.useState<boolean>(true);
    // Whether the keypad is open or not
    const [keypadOpen, setKeypadOpen] = React.useState<boolean>(false);

    const input = React.useRef<any>(null);

    const timesLabel = times ? "CDOT" : "TIMES";

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
                times: times,
            },
            () => {},
        );
    }, [keypadElement, expression, times]);

    return (
        <div style={{padding: "1rem 2rem"}}>
            <div>
                <div>
                    NOTE: To properly test the input interaction, you will need
                    to simulate a device using the dev tools. MathInput requires
                    touch events (not click events).
                </div>
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
                    <button onClick={() => setTimes(!times)}>
                        {`Toggle to ` + timesLabel}
                    </button>
                </div>
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
                onAnalyticsEvent={async (e) => action("onAnalyticsEvent")(e)}
            />
        </div>
    );
};
