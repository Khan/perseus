import {action} from "@storybook/addon-actions";
import {withKnobs} from "@storybook/addon-knobs";
import * as React from "react";

import TrigonometryInputPage from "./geometry-page/trigonometry-page";
import NumericInputPage from "./numbers-page/numeric-input-page";
import PrealgebraInputPage from "./operators-page/operators-page";

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
