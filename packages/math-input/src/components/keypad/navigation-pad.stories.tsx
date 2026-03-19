import * as React from "react";
import {action} from "storybook/actions";

import NavigationPad from "./navigation-pad";

export default {
    title: "Math Input/Components/MathInput v2 Navigation Pad",
    tags: ["!dev"],

    globals: {
        backgrounds: {
            // We want a slightly darker default bg so that we can
            // see the edges of the navigation pad.
            value: "baseSubtle",
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
