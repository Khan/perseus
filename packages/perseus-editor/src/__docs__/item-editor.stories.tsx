/* eslint-disable react/prop-types */
import * as React from "react";

import ItemExtrasEditor from "../item-extras-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

import "../styles/perseus-editor.css";

type Props = React.ComponentProps<typeof ItemExtrasEditor>;

const Wrapper = (props: Props) => {
    const {onChange, ...rest} = props;
    const [extras, setExtras] =
        React.useState<Partial<typeof ItemExtrasEditor.defaultProps>>(rest);

    return (
        <ItemExtrasEditor
            {...extras}
            onChange={(e) => {
                onChange?.(e); // to register action in storybook
                setExtras((prevExtras) => ({...prevExtras, ...e}));
            }}
            editingDisabled={false}
        />
    );
};

const story: Meta<Props> = {
    title: "Editors/Item Extras Editor",
    component: ItemExtrasEditor,
    render: (args) => <Wrapper {...args} />,
    argTypes: {onChange: {action: "changed"}},
};
export default story;

type Story = StoryObj<typeof ItemExtrasEditor>;

export const Default: Story = {
    args: {...ItemExtrasEditor.defaultProps},
};
