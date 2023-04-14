import {action} from "@storybook/addon-actions";
import {withKnobs} from "@storybook/addon-knobs";
import * as React from "react";

import KeypadButton from "./button";

export default {
    title: "Keypad Button",
    decorators: [withKnobs],
    parameters: {
        backgrounds: {
            values: [
                {name: "dark background", value: "#DBDCDD", default: true},
            ],
        },
    },
};

export const Button = () => (
    <div
        style={{
            width: 58,
        }}
    >
        <KeypadButton onPress={action("pressed")}>
            <p>1</p>
        </KeypadButton>
    </div>
);
