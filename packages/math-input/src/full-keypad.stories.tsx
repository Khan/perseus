import {action} from "@storybook/addon-actions";
import {INITIAL_VIEWPORTS} from "@storybook/addon-viewport";

import Keypad from "./components/keypad";

import type {StoryObj} from "@storybook/react";

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
        onClickKey: action("onClickKey"),
        onAnalyticsEvent: async (e) => action("onAnalyticsEvent")(e),
    },
    argTypes: {
        advancedRelations: {
            table: {
                category: opsPage,
            },
        },
        basicRelations: {
            table: {
                category: opsPage,
            },
        },
        divisionKey: {
            table: {
                category: numsPage,
            },
        },
        logarithms: {
            table: {
                category: opsPage,
            },
        },
        fractionsOnly: {
            table: {
                category: fracPage,
            },
        },
        multiplicationDot: {
            table: {
                category: numsPage,
            },
        },
        preAlgebra: {
            table: {
                category: opsPage,
            },
        },
        trigonometry: {
            table: {
                category: geoPage,
            },
        },
        sendEvent: {table: {disable: true}},
        onClickKey: {table: {disable: true}},
        onAnalyticsEvent: {table: {disable: true}},
    },
};

type Story = StoryObj<typeof Keypad>;

export const Default: Story = {};

export const PreAlgebra: Story = {
    args: {
        preAlgebra: true,
    },
};

export const Trigonometry: Story = {
    args: {
        preAlgebra: true,
        trigonometry: true,
    },
};

export const FractionsOnly: Story = {
    args: {
        fractionsOnly: true,
    },
};

export const Everything: Story = {
    args: {
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
    },
};

export const EverythingMinusNavigationPad: Story = {
    args: {
        advancedRelations: true,
        basicRelations: true,
        divisionKey: true,
        logarithms: true,
        convertDotToTimes: false,
        preAlgebra: true,
        trigonometry: true,
        expandedView: false,
        showDismiss: true,
        extraKeys: ["a", "b", "c"],
    },
};
