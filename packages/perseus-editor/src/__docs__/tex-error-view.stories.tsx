import TexErrorView from "../tex-error-view";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof TexErrorView> = {
    component: TexErrorView,
    title: "Editors/TexErrorView",
};

export default meta;
type Story = StoryObj<typeof TexErrorView>;

export const Primary: Story = {
    args: {
        errorList: [
            {
                math: "\\x^2",
                message: "TeX parse error: Undefined control sequence: \\x",
            },
            {
                math: "\\y^2",
                message: "TeX parse error: Undefined control sequence: \\y",
            },
        ],
    },
};
