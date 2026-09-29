import * as React from "react";

import ExtrasEditor from "../extras-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

import "../styles/perseus-editor.css";

type Props = React.ComponentProps<typeof ExtrasEditor>;

const Wrapper = (props: Props) => {
    const {onChange, ...rest} = props;
    const [extras, setExtras] =
        React.useState<Partial<typeof ExtrasEditor.defaultProps>>(rest);

    return (
        <ExtrasEditor
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
    component: ExtrasEditor,
    render: (args) => <Wrapper {...args} />,
    argTypes: {onChange: {action: "changed"}},
};
export default story;

type Story = StoryObj<typeof ExtrasEditor>;

export const Default: Story = {
    args: {...ExtrasEditor.defaultProps},
};
