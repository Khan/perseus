import * as React from "react";
import {action} from "storybook/actions";

import NavigationPad from "./navigation-pad";

export default {
    title: "math-input/components/MathInput v2 Navigation Pad",
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

export function basic() {
    return (
        <div style={{padding: 50}}>
            <NavigationPad onClickKey={action("onClickKey")} />
        </div>
    );
}
