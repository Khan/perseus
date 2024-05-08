import {View} from "@khanacademy/wonder-blocks-core";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import {action} from "@storybook/addon-actions";
import * as React from "react";

import {EditorWithLayout} from "..";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import type {Meta, StoryObj} from "@storybook/react";

type Story = StoryObj<typeof EditorWithLayout>;

const meta: Meta<typeof EditorWithLayout> = {
    title: "PerseusEditor/EditorWithLayout",
    component: EditorWithLayout,
};

function Section(
    props: React.PropsWithChildren<{title: string; style?: StyleType}>,
) {
    return (
        <View
            style={{
                borderWidth: "1px",
                borderRadius: spacing.xxxSmall_4,
                ...props.style,
            }}
        >
            <HeadingSmall
                style={{
                    backgroundColor: color.darkBlue,
                    color: color.offWhite,
                    padding: spacing.xxSmall_6,
                    marginBottom: spacing.xxSmall_6,
                }}
            >
                {props.title}
            </HeadingSmall>
            <View style={{padding: spacing.xxxSmall_4}}>{props.children}</View>
        </View>
    );
}

export const Default: Story = {
    render(props, context) {
        return (
            <EditorWithLayout {...props}>
                {(items) => <View>{items.jsonModeEditor}</View>}
            </EditorWithLayout>
        );
    },
};

export const Controlled: Story = {
    args: {
        onChange: action("onChange"),
    },
    render(props, context) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [state, setState] = React.useState(props);

        return (
            <EditorWithLayout
                {...state}
                onChange={(updatedProps) =>
                    setState({...state, ...updatedProps})
                }
            >
                {(items) => (
                    <View style={{gap: spacing.xSmall_8}}>
                        <Section title="JSON Mode Editor">
                            {items.jsonModeEditor}
                        </Section>

                        <Section
                            title="JSON Editor"
                            style={{width: 50, height: 300}}
                        >
                            <items.JsonEditor style={{height: 100}} />
                        </Section>

                        <Section title="Heads-up Display (HUD)">
                            {items.hudElement}
                        </Section>
                    </View>
                )}
            </EditorWithLayout>
        );
    },
};

export default meta;
