import {themeModes} from "../../../../../../.storybook/modes";

import {numberLineRendererDecorator} from "./number-line-renderer-decorator";

import type {PerseusNumberLineWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusNumberLineWidgetOptions> = {
    title: "Widgets/Number Line/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Number Line widget that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

// Verifies the default interactive state: highlighted tick marks at both
// endpoints (labelRange defaults to range endpoints), interactive point
// in instructive color.
export const Default: Story = {
    decorators: [numberLineRendererDecorator],
    args: {} satisfies Partial<PerseusNumberLineWidgetOptions>,
};

// Verifies the static (display-only) state where the point is shown in
// instructive color and cannot be moved.
export const StaticPoint: Story = {
    decorators: [numberLineRendererDecorator],
    args: {
        static: true,
    } satisfies Partial<PerseusNumberLineWidgetOptions>,
};

// Verifies the inequality state with a closed dot (≥ or ≤ relation):
// the arrow line and filled dot both render in instructive color.
export const InequalityClosedDot: Story = {
    decorators: [numberLineRendererDecorator],
    args: {
        isInequality: true,
        range: [-5, 5],
        divisionRange: [1, 12],
        snapDivisions: 1,
        tickStep: 1,
        correctRel: "ge",
        correctX: 0,
    } satisfies Partial<PerseusNumberLineWidgetOptions>,
};

// Verifies the open-dot inequality state (> or < relation): the dot
// renders hollow with background fill and instructive-color stroke.
// numDivisions is 10 because range width (10) / tickStep (1) = 10.
export const InequalityOpenDot: Story = {
    decorators: [numberLineRendererDecorator],
    args: {
        isInequality: true,
        range: [-5, 5],
        divisionRange: [1, 12],
        snapDivisions: 1,
        tickStep: 1,
        correctRel: "gt",
        correctX: 0,
    } satisfies Partial<PerseusNumberLineWidgetOptions>,
    parameters: {
        initialUserInput: {
            "number-line 1": {
                rel: "gt",
                numDivisions: 10,
                numLinePosition: -5,
            },
        },
    },
};

// Verifies the mobile layout: narrower 288px canvas and mobileDotStyle
// stroke in instructive color.
export const Mobile: Story = {
    decorators: [numberLineRendererDecorator],
    args: {} satisfies Partial<PerseusNumberLineWidgetOptions>,
    parameters: {
        apiOptions: {isMobile: true},
    },
};

// Verifies the mobile inequality layout with a closed dot: the mobileDotStyle
// stroke and the inequality ray both render in instructive color on the
// narrower mobile canvas.
export const MobileInequalityClosedDot: Story = {
    decorators: [numberLineRendererDecorator],
    args: {
        isInequality: true,
        range: [-5, 5],
        divisionRange: [1, 12],
        snapDivisions: 1,
        tickStep: 1,
        correctRel: "ge",
        correctX: 0,
    } satisfies Partial<PerseusNumberLineWidgetOptions>,
    parameters: {
        apiOptions: {isMobile: true},
    },
};

// Verifies the mobile inequality layout with an open dot: the hollow dot
// (background fill, zero fill-opacity) plus the mobileDotStyle stroke and
// inequality ray in instructive color on the mobile canvas.
export const MobileInequalityOpenDot: Story = {
    decorators: [numberLineRendererDecorator],
    args: {
        isInequality: true,
        range: [-5, 5],
        divisionRange: [1, 12],
        snapDivisions: 1,
        tickStep: 1,
        correctRel: "gt",
        correctX: 0,
    } satisfies Partial<PerseusNumberLineWidgetOptions>,
    parameters: {
        apiOptions: {isMobile: true},
        initialUserInput: {
            "number-line 1": {
                rel: "gt",
                numDivisions: 10,
                numLinePosition: -5,
            },
        },
    },
};
