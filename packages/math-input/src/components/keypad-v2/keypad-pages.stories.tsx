import {action} from "@storybook/addon-actions";
import {withKnobs} from "@storybook/addon-knobs";
import * as React from "react";

import GeometryInputPage from "./geometry-page";
import NumbersPage from "./numbers-page";
import PrealgebraInputPage from "./operators-page";

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
    <NumbersPage onClickKey={action("onClickKey")} />
);

export const PreAlgebraInput = (): React.ReactElement => (
    <PrealgebraInputPage onClickKey={action("onClickKey")} />
);

export const TrigonometryInput = (): React.ReactElement => (
    <GeometryInputPage onClickKey={action("onClickKey")} />
);
