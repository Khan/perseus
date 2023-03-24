import {action} from "@storybook/addon-actions";
import {withKnobs} from "@storybook/addon-knobs";
import {INITIAL_VIEWPORTS} from "@storybook/addon-viewport";
import * as React from "react";

import Keypad from './index';

export default {
    title: "Full Keypad",
    decorators: [withKnobs],
    parameters: {
        backgrounds: {
            values: [{name: "light background", value: "white", default: true}],
        },
        viewport: {defaultViewport: "iphone6", viewports: INITIAL_VIEWPORTS},
    },
};

export const PreAlgebra = (): React.ReactElement => <Keypad
    onClickKey={action("onClickKey")}
    preAlgebra={true}
    trigonometry={false}
/>;

export const Trigonometry = (): React.ReactElement => <Keypad
    onClickKey={action("onClickKey")}
    preAlgebra={true}
    trigonometry={true}
/>;
