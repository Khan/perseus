import {ApiOptions} from "@khanacademy/perseus";
import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {action} from "storybook/actions";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import ImageEditor from "../image-editor/image-editor";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const PROD_EDITOR_WIDTH = 330;

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/Image/Editor Demo",
    component: ImageEditor,
    tags: ["!dev"],
    argTypes: {
        labels: {
            control: false,
            description: "Deprecated",
        },
        box: {
            control: false,
            description: "Set automatically",
        },
        range: {
            control: false,
            description: "Deprecated",
        },
    },
};
export default meta;

const onChangeAction = action("onChange");

type Story = StoryObj<typeof ImageEditor>;

export const Default: Story = {
    args: {},
};

export const WithState: Story = {
    render: function Render() {
        const widgetRef = React.useRef<ImageEditor>(null);
        const [state, setState] = React.useState<
            Partial<PropsFor<typeof ImageEditor>>
        >({
            backgroundImage: {
                url: "https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",
            },
        });

        return (
            <View style={styles.wrapper}>
                <LabelSmall
                    style={{
                        fontStyle: "italic",
                        marginBottom: spacing.small_12,
                    }}
                >
                    <b>Note</b> that this editor has a known-issue where it does
                    not calculate the image dimensions initially if they
                    aren&apos;t provided. It does update the dimensions when you
                    blur the &apos;Image url:&apos; field.
                </LabelSmall>
                <ImageEditor
                    {...state}
                    apiOptions={ApiOptions.defaults}
                    onChange={(props) => {
                        onChangeAction(props);

                        setState({
                            ...widgetRef.current?.serialize(),
                            ...props,
                        });
                    }}
                    ref={widgetRef}
                />
            </View>
        );
    },
};

export const WithinEditorPage = (): React.ReactElement => (
    <div style={{width: PROD_EDITOR_WIDTH}}>
        <EditorPageWithStorybookPreview
            question={generateTestPerseusRenderer({
                content: "[[☃ image 1]]",
                widgets: {
                    "image 1": generateImageWidget({
                        options: generateImageOptions({
                            backgroundImage: {
                                url: "https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",
                            },
                        }),
                    }),
                },
            })}
        />
    </div>
);

const styles = StyleSheet.create({
    wrapper: {
        // The maximum width of a widget in the editor.
        width: PROD_EDITOR_WIDTH,
        margin: 20,
    },
});
