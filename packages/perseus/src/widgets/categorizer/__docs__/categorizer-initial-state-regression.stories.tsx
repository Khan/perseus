import {themeModes} from "../../../../../../.storybook/modes";
import {
    mobileDecorator,
    rtlDecorator,
} from "../../__testutils__/story-decorators";
import {
    categorizerOptions,
    categorizerWithImagesOptions,
    categorizerWithMathOptions,
} from "../categorizer.testdata";

import {categorizerRendererDecorator} from "./categorizer-renderer-decorator";

import type {PerseusCategorizerWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * Visual regression stories for the Categorizer widget.
 *
 * The Categorizer isn't keyboard/interaction accessible, so there are no
 * interaction stories. The "answered", "mobile", and "static" states are
 * produced statically (via the `initialUserInput`/`apiOptions`/`static` story
 * parameters the decorator reads) and live here alongside the initial state.
 */
// NOTE: `categorizerRendererDecorator` is applied per-story (as the first,
// innermost decorator) rather than at the meta level. It renders its own
// content and ignores the story passed to it, so if it were the outermost
// (meta-level) decorator it would discard story-level decorators like
// `rtlDecorator`/`mobileDecorator`. Listing it first inside each story lets
// those wrappers compose around the rendered widget.
const meta: Meta<PerseusCategorizerWidgetOptions> = {
    title: "Widgets/Categorizer/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Categorizer widget that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

// The user's answer replays the options' `values` (the answer key), so the
// "answered" grids stay in sync with the test data.
const answer = {
    "categorizer 1": {values: [...categorizerOptions.values]},
};

export const Default: Story = {
    decorators: [categorizerRendererDecorator],
    args: categorizerOptions,
};

export const WithImages: Story = {
    decorators: [categorizerRendererDecorator],
    args: categorizerWithImagesOptions,
};

export const WithMath: Story = {
    decorators: [categorizerRendererDecorator],
    args: categorizerWithMathOptions,
};

export const Answered: Story = {
    decorators: [categorizerRendererDecorator],
    args: categorizerOptions,
    parameters: {
        initialUserInput: answer,
    },
};

export const AnsweredMobile: Story = {
    decorators: [categorizerRendererDecorator, mobileDecorator],
    args: categorizerOptions,
    parameters: {
        apiOptions: {isMobile: true},
        initialUserInput: answer,
    },
};

export const RightToLeft: Story = {
    decorators: [categorizerRendererDecorator, rtlDecorator],
    args: categorizerOptions,
    parameters: {
        initialUserInput: answer,
    },
};

export const Static: Story = {
    decorators: [categorizerRendererDecorator],
    args: categorizerOptions,
    parameters: {
        static: true,
    },
};
