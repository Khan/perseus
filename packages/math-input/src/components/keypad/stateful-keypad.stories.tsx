import {action} from "@storybook/addon-actions";
import * as React from "react";

import StatefulKeypad from "./stateful-keypad";

export default {
    title: "Stateful v2 Keypad",
};

export function Base() {
    return <StatefulKeypad handleClickKey={action("handleClickKey")} />;
}
