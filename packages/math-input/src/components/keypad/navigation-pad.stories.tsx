import * as React from "react";
import {action} from "storybook/actions";

import NavigationPad from "./navigation-pad";

export default {
    title: "Math Input/Components/MathInput v2 Navigation Pad",
    tags: ["!dev"],

    parameters: {
        backgrounds: {
            options: {
                // We want a slightly darker default bg so that we can
                // see the top of the keypad when it is open
                light_background: {
                    name: "light background",
                    value: "lightgrey",
                    default: true,
                },
            },
        },
    },

    globals: {
        backgrounds: {
            value: "light_background",
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
