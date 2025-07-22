import * as React from "react";
import {action} from "storybook/actions";
import {INITIAL_VIEWPORTS} from "storybook/viewport";

import GeometryInputPage from "./geometry-page";
import NumbersPage from "./numbers-page";
import PrealgebraInputPage from "./operators-page";

export default {
    title: "Math Input/Components/Keypad pages",
    tags: ["autodocs", "!dev"],
    parameters: {
        backgrounds: {
            values: [{name: "light background", value: "white", default: true}],
        },
        viewport: {defaultViewport: "iphone6", viewports: INITIAL_VIEWPORTS},
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
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
