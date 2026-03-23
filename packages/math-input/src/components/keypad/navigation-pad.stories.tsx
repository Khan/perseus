import * as React from "react";
import {action} from "storybook/actions";

import NavigationPad from "./navigation-pad";

export default {
    title: "Math Input/Components/MathInput v2 Navigation Pad",
    tags: ["!dev"],
    args: {
        onClickKey: action("onClickKey"),
    },
    tags: ["!dev"],

export function basic() {
    return (
        <div style={{padding: 50}}>
            <NavigationPad onClickKey={action("onClickKey")} />
        </div>
    );
}
