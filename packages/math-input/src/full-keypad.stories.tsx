import {INITIAL_VIEWPORTS} from "storybook/viewport";

import Keypad from "./components/keypad";

import type {StoryObj} from "@storybook/react-vite";

const opsPage = "Operators Page";
const numsPage = "Numbers Page";
const geoPage = "Geometry Page";
const fracPage = "Fractions Page";

export default {
    title: "Math Input/Full Keypad",
    parameters: {
        backgrounds: {
            values: [{name: "light background", value: "white", default: true}],
        },
        viewport: {defaultViewport: "iphone6", viewports: INITIAL_VIEWPORTS},
        componentSubtitle:
            "A customizable virtual keyboard for mathematical input that provides different key layouts for various math concepts.",
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
    tags: ["autodocs", "!dev"],
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
