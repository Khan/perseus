import {View} from "@khanacademy/wonder-blocks-core";
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
    <View
        style={{
            backgroundColor: "#DBDCDD",
            padding: 20,
            width: 58 + 20 * 2,
        }}
    >
        <KeypadButton style={{width: 58}} onPress={action("pressed")}>
            <p>1</p>
        </KeypadButton>
    </View>
);
