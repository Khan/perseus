//@flow

import * as React from "react";
import {action} from "@storybook/addon-actions";
import {View} from "@khanacademy/wonder-blocks-core";

import {withKnobs, number} from "@storybook/addon-knobs";

import NumericInputPage from "./numeric-input-page";
import PrealgebraInputPage from "./pre-algebra-page";
import TrigonometryInputPage from "./trigonometry-page";

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
