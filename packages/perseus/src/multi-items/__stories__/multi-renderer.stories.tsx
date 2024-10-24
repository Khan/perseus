import {View} from "@khanacademy/wonder-blocks-core";
import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {MultiItemRendererWithDebugUI} from "../../../../../testing/multi-item-renderer-with-debug-ui";
import {question1} from "../__testdata__/multi-renderer.testdata";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export const SingleItem = (args: StoryArgs): React.ReactElement => {
    const item = {
        _multi: {
            ...question1._multi,
            blurb: {
                ...question1._multi.blurb,
                content:
                    "This is a short snippet to help you understand the context of the question. We call it the 'blurb'.",
            },
        },
    } as const;
    return (
        <MultiItemRendererWithDebugUI simpleItem={item}>
            {({renderers}) => {
                const {blurb, question, hints} = renderers;
                return (
                    <View>
                        <View style={styles.section}>
                            <HeadingSmall style={styles.heading}>
                                Blurb
                            </HeadingSmall>
                            {blurb}
                        </View>
                        <View style={styles.section}>
                            <HeadingSmall style={styles.heading}>
                                Question
                            </HeadingSmall>
                            {question}
                        </View>
                        <View style={styles.section}>
                            <HeadingSmall style={styles.heading}>
                                Hints
                            </HeadingSmall>
                            <View style={styles.hints}>
                                {
                                    // @ts-expect-error [FEI-5003] - TS2339 - Property 'firstN' does not exist on type 'readonly ReactNode[]'.
                                    hints?.firstN(2)
                                }
                            </View>
                        </View>
                    </View>
                );
            }}
        </MultiItemRendererWithDebugUI>
    );
};

const styles = StyleSheet.create({
    section: {
        backgroundColor: "#F5F5F5",
        padding: "5px",
        borderWidth: "1px",
        marginTop: "5px",
        marginBottom: "5px",
    },
    heading: {
        backgroundColor: "#A9A9A9",
        margin: "-5px",
        padding: "5px",
    },
    hints: {
        marginLeft: "50px",
    },
});

export default {
    title: "Perseus/Renderers/Multi Renderer",
} as Story;
