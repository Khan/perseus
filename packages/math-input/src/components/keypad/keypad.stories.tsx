import {action} from "@storybook/addon-actions";
import {INITIAL_VIEWPORTS} from "@storybook/addon-viewport";
import * as React from "react";

import Keypad from "./index";

export default {
    title: "Full Keypad",
    parameters: {
        backgrounds: {
            values: [{name: "light background", value: "white", default: true}],
        },
        viewport: {defaultViewport: "iphone6", viewports: INITIAL_VIEWPORTS},
    },
};

export const PreAlgebra = (): React.ReactElement => (
    <Keypad onClickKey={action("onClickKey")} preAlgebra />
);

export const Trigonometry = (): React.ReactElement => (
    <Keypad onClickKey={action("onClickKey")} preAlgebra trigonometry />
);
