import {action} from "@storybook/addon-actions";
import {INITIAL_VIEWPORTS} from "@storybook/addon-viewport";
import {ComponentStory} from "@storybook/react";
import * as React from "react";

import Keypad, {Props as KeypadProps} from "./index";

const opsPage = "Operators Page";
const numsPage = "Numbers Page";
const geoPage = "Geometry Page";

export default {
    title: "Full Keypad",
    parameters: {
        backgrounds: {
            values: [{name: "light background", value: "white", default: true}],
        },
        viewport: {defaultViewport: "iphone6", viewports: INITIAL_VIEWPORTS},
    },
    component: Keypad,
    argTypes: {
        advancedRelations: {
            control: "boolean",
            defaultValue: false,
            table: {
                category: opsPage,
            },
        },
        basicRelations: {
            control: "boolean",
            defaultValue: false,
            table: {
                category: opsPage,
            },
        },
        divisionKey: {
            control: "boolean",
            defaultValue: false,
            table: {
                category: numsPage,
            },
        },
        logarithms: {
            control: "boolean",
            defaultValue: false,
            table: {
                category: opsPage,
            },
        },
        multiplicationDot: {
            control: "boolean",
            defaultValue: false,
            table: {
                category: numsPage,
            },
        },
        preAlgebra: {
            control: "boolean",
            defaultValue: false,
            table: {
                category: opsPage,
            },
        },
        trigonometry: {
            control: "boolean",
            defaultValue: false,
            table: {
                category: geoPage,
            },
        },
    },
};

const Template: ComponentStory<typeof Keypad> = (
    args: KeypadProps,
): React.ReactElement => <Keypad {...args} onClickKey={action("onClickKey")} />;

export const Default = Template.bind({});

export const PreAlgebra = Template.bind({});
PreAlgebra.args = {
    preAlgebra: true,
};

export const Trigonometry = Template.bind({});
Trigonometry.args = {
    preAlgebra: true,
    trigonometry: true,
};
