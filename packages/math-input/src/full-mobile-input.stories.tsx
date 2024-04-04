import {action} from "@storybook/addon-actions";
import * as React from "react";

import {
    KeypadInput,
    KeypadType,
    MobileKeypad,
    StatefulKeypadContextProvider,
    KeypadContext,
} from "./index";

export default {
    title: "math-input/Full Mobile MathInput",
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

const Basic = ({keypadElement, setKeypadElement}) => {
    const [value, setValue] = React.useState("");
    // Whether to use Expression or Fraction keypad
    const [expression, setExpression] = React.useState<boolean>(false);
    // Whether to use CDOT or TIMES
    const [times, setTimes] = React.useState<boolean>(true);
    // Whether to use v1 or v2 keypad
    const [v2Keypad, setV2Keypad] = React.useState<boolean>(true);

    const input = React.useRef<KeypadInput>(null);

    const timesLabel = times ? "CDOT" : "TIMES";

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
                    <button onClick={() => setTimes(!times)}>
                        {`Toggle to ` + timesLabel}
                    </button>
                </div>
            </div>

            <KeypadInput
                value={value}
                ref={input}
                keypadElement={keypadElement}
                onChange={(newValue, callback) => {
                    setValue(newValue);
                    callback?.();
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
                onDismiss={() => {}}
                onAnalyticsEvent={async (e) => action("onAnalyticsEvent")(e)}
            />
        </div>
    );
};

export function Wrapped() {
    return (
        <StatefulKeypadContextProvider>
            <KeypadContext.Consumer>
                {({keypadElement, setKeypadElement}) => (
                    <Basic
                        keypadElement={keypadElement}
                        setKeypadElement={setKeypadElement}
                    />
                )}
            </KeypadContext.Consumer>
        </StatefulKeypadContextProvider>
    );
}
