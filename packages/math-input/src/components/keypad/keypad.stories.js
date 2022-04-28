//@flow

import * as React from "react";
import {action} from "@storybook/addon-actions";
import {INITIAL_VIEWPORTS} from "@storybook/addon-viewport";

import {View} from "@khanacademy/wonder-blocks-core";

import {withKnobs, number} from "@storybook/addon-knobs";

import Keypad from "./";

export default {
    title: "Full Keypad",
    decorators: [withKnobs],
    parameters: {
        backgrounds: [
            {name: "light background", value: "white", default: true},
        ],
        viewport: {defaultViewport: "iphone6", viewports: INITIAL_VIEWPORTS},
    },
};

export const PreAlgebra = (): React.Node => (
    <Keypad
        onClickKey={action("onClickKey")}
        preAlgebra={true}
        trigonometry={false}
    />
);

export const Trigonometry = (): React.Node => (
    <Keypad
        onClickKey={action("onClickKey")}
        preAlgebra={true}
        trigonometry={true}
    />
);
