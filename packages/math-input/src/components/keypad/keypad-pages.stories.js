//@flow

import {View} from "@khanacademy/wonder-blocks-core";
import {action} from "@storybook/addon-actions";
import {withKnobs, number} from "@storybook/addon-knobs";
import * as React from "react";

import NumericInputPage from "./numeric-input-page.js";
import PrealgebraInputPage from "./pre-algebra-page.js";
import TrigonometryInputPage from "./trigonometry-page.js";

export default {
    title: "Keypad pages",
    decorators: [withKnobs],
    parameters: {
        backgrounds: [
            {name: "light background", value: "white", default: true},
        ],
        viewport: {defaultViewport: "iphone6"},
    },
};

export const NumericInput = (): React.Node => (
    <NumericInputPage onClickKey={action("onClickKey")} />
);

export const PreAlgebraInput = (): React.Node => (
    <PrealgebraInputPage onClickKey={action("onClickKey")} />
);

export const TrigonometryInput = (): React.Node => (
    <TrigonometryInputPage onClickKey={action("onClickKey")} />
);
