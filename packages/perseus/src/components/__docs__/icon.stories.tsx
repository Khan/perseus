import * as IconPaths from "../../icon-paths";
import IconComponent from "../icon";

import type {StoryObj, Meta} from "@storybook/react-vite";

type Story = StoryObj<typeof IconComponent>;

const meta: Meta = {
    title: "Components/Icon",
    component: IconComponent,
    args: {
        color: "#808",
        size: 25,
        title: "This is a label that screen readers will use, for example",
    },
    argTypes: {
        size: {
            control: "range",
        },
        icon: {
            options: Object.getOwnPropertyNames(IconPaths),
            mapping: IconPaths,
            defaultValue: "iconChevronDown",
            control: "select",
        },
    },
};
export default meta;

export const Icon: Story = {
    args: {
        style: {display: "block"},
        icon: IconPaths.iconCheck,
    },
};
