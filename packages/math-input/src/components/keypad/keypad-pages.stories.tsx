import {action} from "@storybook/addon-actions";
import {withKnobs} from "@storybook/addon-knobs";
import * as React from "react";

import NumericInputPage from "./numeric-input-page";
import PrealgebraInputPage from "./pre-algebra-page";
import TrigonometryInputPage from "./trigonometry-page";

export default {
    title: "Keypad pages",
    decorators: [withKnobs],
    parameters: {
        backgrounds: {
            values: [{name: "light background", value: "white", default: true}],
        },
        viewport: {defaultViewport: "iphone6"},
    },
};

export const NumericInput = (): React.ReactElement => (
    <NumericInputPage onClickKey={action("onClickKey")} />
);

export const PreAlgebraInput = (): React.ReactElement => (
    <PrealgebraInputPage onClickKey={action("onClickKey")} />
);

export const TrigonometryInput = (): React.ReactElement => (
    <TrigonometryInputPage onClickKey={action("onClickKey")} />
);
