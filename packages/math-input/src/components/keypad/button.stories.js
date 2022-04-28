import React from "react";
import {action} from "@storybook/addon-actions";
import {withKnobs, select, array} from "@storybook/addon-knobs";

import KeypadButton from "./button";

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
