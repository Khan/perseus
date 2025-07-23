import {ApiOptions} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {action} from "storybook/actions";

import ImageEditor from "../image-editor";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Image/Editor Demo",
    component: ImageEditor,
    tags: ["!dev"],
    parameters: {
        componentSubtitle:
            "An editor for adding an image widget that allows users to display and configure images within content.",
    },
} as Story;

const styles = StyleSheet.create({
    wrapper: {
        // The maximum width of a widget in the editor.
        width: 338,
        margin: 20,
    },
});

const onChangeAction = action("onChange");

const WithState = () => {
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
                style={{fontStyle: "italic", marginBottom: spacing.small_12}}
            >
                <b>Note</b> that this editor has a known-issue where it does not
                calculate the image dimensions initially if they aren&apos;t
                provided. It does update the dimensions when you blur the
                &apos;Image url:&apos; field.
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
};

export const Default = (args: StoryArgs): React.ReactElement => {
    return <WithState />;
};
