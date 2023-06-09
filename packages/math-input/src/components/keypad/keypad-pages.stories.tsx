import {action} from "@storybook/addon-actions";
import {withKnobs} from "@storybook/addon-knobs";
import * as React from "react";

import GeometryInputPage from "./keypad-pages/geometry-page";
import NumbersPage from "./keypad-pages/numbers-page";
import PrealgebraInputPage from "./keypad-pages/operators-page";

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
