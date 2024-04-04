import {action} from "@storybook/addon-actions";
import * as React from "react";

import {strings} from "../../../../../testing/mock-strings";

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
            <NavigationPad
                locale="en"
                strings={strings}
                onClickKey={action("onClickKey")}
            />
        </div>
    );
}
