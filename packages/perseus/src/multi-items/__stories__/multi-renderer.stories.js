// @flow

import {View} from "@khanacademy/wonder-blocks-core";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {MultiItemRendererWithDebugUI} from "../../../perseus-testing/multi-item-renderer-with-debug-ui.jsx";
import {question1} from "../__testdata__/multi-renderer_testdata.js";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export const SingleItem = (args: StoryArgs): React.Node => {
    const item = {
        _multi: {
            // $FlowFixMe[not-an-object]
            ...question1._multi,
            blurb: {
                // $FlowFixMe[not-an-object]
                // $FlowFixMe[prop-missing]
                ...question1._multi.blurb,
                content:
                    "This is a short snippet to help you understand the context of the question. We call it the 'blurb'.",
            },
        },
    };
    return (
        <MultiItemRendererWithDebugUI simpleItem={item}>
            {({renderers}) => {
                const {blurb, question, hints} = renderers;
                return (
                    <View>
                        <View style={styles.section}>
                            <HeadingSmall style={styles.heading}>
                                {i18n.doNotTranslate("Blurb")}
                            </HeadingSmall>
                            {blurb}
                        </View>
                        <View style={styles.section}>
                            <HeadingSmall style={styles.heading}>
                                {i18n.doNotTranslate("Question")}
                            </HeadingSmall>
                            {question}
                        </View>
                        <View style={styles.section}>
                            <HeadingSmall style={styles.heading}>
                                {i18n.doNotTranslate("Hints")}
                            </HeadingSmall>
                            <View style={styles.hints}>
                                {
                                    // $FlowFixMe[prop-missing]
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

export default ({
    title: "Perseus/Renderers/Multi Renderer",
}: Story);
