import {action} from "@storybook/addon-actions";
import {withKnobs, select, array} from "@storybook/addon-knobs";
import React from "react";

import KeypadButton from "./button.js";

export default {
    title: "Keypad Button",
    decorators: [withKnobs],
    parameters: {
        backgrounds: [
            {name: "dark background", value: "#DBDCDD", default: true},
        ],
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
