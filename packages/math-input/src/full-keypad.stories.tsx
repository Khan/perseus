import {action} from "@storybook/addon-actions";
import {INITIAL_VIEWPORTS} from "@storybook/addon-viewport";
import * as React from "react";

import Keypad from "./components/keypad";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";
import type {ComponentStory} from "@storybook/react";

const opsPage = "Operators Page";
const numsPage = "Numbers Page";
const geoPage = "Geometry Page";
const fracPage = "Fractions Page";

export default {
    title: "math-input/Full Keypad",
    parameters: {
        backgrounds: {
            values: [{name: "light background", value: "white", default: true}],
        },
        viewport: {defaultViewport: "iphone6", viewports: INITIAL_VIEWPORTS},
    },
    component: Keypad,
    args: {
        advancedRelations: false,
        basicRelations: false,
        divisionKey: false,
        logarithms: false,
        fractionsOnly: false,
        convertDotToTimes: false,
        preAlgebra: false,
        trigonometry: false,
        sendEvent: () => {},
        onAnalyticsEvent: async () => {},
    },
    argTypes: {
        advancedRelations: {
            control: "boolean",
            table: {
                category: opsPage,
            },
        },
        basicRelations: {
            control: "boolean",
            table: {
                category: opsPage,
            },
        },
        divisionKey: {
            control: "boolean",
            table: {
                category: numsPage,
            },
        },
        logarithms: {
            control: "boolean",
            table: {
                category: opsPage,
            },
        },
        fractionsOnly: {
            control: "boolean",
            table: {
                category: fracPage,
            },
        },
        multiplicationDot: {
            control: "boolean",
            table: {
                category: numsPage,
            },
        },
        preAlgebra: {
            control: "boolean",
            table: {
                category: opsPage,
            },
        },
        trigonometry: {
            control: "boolean",
            table: {
                category: geoPage,
            },
        },
    },
};

const Template: ComponentStory<typeof Keypad> = (
    args: PropsFor<typeof Keypad>,
): React.ReactElement => (
    <Keypad
        {...args}
        onClickKey={action("onClickKey")}
        onAnalyticsEvent={async (e) => action("onAnalyticsEvent")(e)}
    />
);

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

export const FractionsOnly = Template.bind({});
FractionsOnly.args = {
    fractionsOnly: true,
};

export const Everything = Template.bind({});
Everything.args = {
    advancedRelations: true,
    basicRelations: true,
    divisionKey: true,
    logarithms: true,
    convertDotToTimes: false,
    preAlgebra: true,
    trigonometry: true,
    expandedView: true,
    showDismiss: true,
    extraKeys: ["a", "b", "c"],
};
