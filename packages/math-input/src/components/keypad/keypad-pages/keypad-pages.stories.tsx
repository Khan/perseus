import {action} from "@storybook/addon-actions";
import {withKnobs} from "@storybook/addon-knobs";
import {INITIAL_VIEWPORTS} from "@storybook/addon-viewport";
import * as React from "react";

import GeometryInputPage from "./geometry-page";
import NumbersPage from "./numbers-page";
import PrealgebraInputPage from "./operators-page";

export default {
    title: "math-input/components/Keypad pages",
    decorators: [withKnobs],
    parameters: {
        backgrounds: {
            values: [{name: "light background", value: "white", default: true}],
        },
        viewport: {defaultViewport: "iphone6", viewports: INITIAL_VIEWPORTS},
    },
};

export const NumericInput = (): React.ReactElement => (
    <NumbersPage onClickKey={action("onClickKey")} />
);

export const PreAlgebraInput = (): React.ReactElement => (
    <PrealgebraInputPage
        onClickKey={action("onClickKey")}
        preAlgebra={true}
        logarithms={true}
        basicRelations={true}
        advancedRelations={true}
    />
);

export const TrigonometryInput = (): React.ReactElement => (
    <GeometryInputPage onClickKey={action("onClickKey")} />
);
