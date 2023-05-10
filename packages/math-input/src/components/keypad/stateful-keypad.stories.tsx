import {action} from "@storybook/addon-actions";
import * as React from "react";

import StatefulKeypad from "./stateful-keypad";

export default {
    title: "Stateful v2 Keypad",
};

export function Base() {
    return (
        <StatefulKeypad
            handleClickKey={(key) => {
                // eslint-disable-next-line no-console
                console.log(key);
                action("handleClickKey");
            }}
            trigonometry
            preAlgebra
            logarithms
            basicRelations
            advancedRelations
            multiplicationDot
            divisionKey
            showKeypad
        />
    );
}
