import {multipleAvailableTypesQuestion} from "../grapher.testdata";

import {grapherRendererDecorator} from "./grapher-renderer-decorator";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<{question: PerseusRenderer}> = {
    title: "Widgets/Grapher/Visual Regression Tests/Dark Mode",
    tags: ["!autodocs", "!manifest"],
    // syl-dark is not in themeModes, so it never reaches Chromatic through the
    // usual modes matrix. Pinning the theme global gets the whole mechanism —
    // body attribute, ThemeSwitcher, and its context — onto syl-dark.
    globals: {theme: "syl-dark"},
    parameters: {
        docs: {
            description: {
                component: "Regression tests for grapher in SYL dark mode.",
            },
        },
        // delay: Raphael creates its SVG paper in a detached div before DOM
        // insertion, causing a timing race that can clip the initial ellipse.
        // 300ms lets Raphael settle before Chromatic captures the snapshot.
        chromatic: {disableSnapshot: false, delay: 300},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const DesktopFunctionTypeSelector: Story = {
    decorators: [grapherRendererDecorator],
    args: {question: multipleAvailableTypesQuestion},
};
