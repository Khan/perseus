/* eslint monorepo/no-internal-import: "off", monorepo/no-relative-import: "off", import/no-relative-packages: "off" */
import {
    useUniqueIdWithMock,
    RenderStateRoot,
    View,
} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import Switch from "@khanacademy/wonder-blocks-switch";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {css, StyleSheet} from "aphrodite";
import * as React from "react";
import {useState} from "react";
import {render} from "react-dom";

import {Renderer} from "../packages/perseus/src";
import {setDependencies} from "../packages/perseus/src/dependencies";
import * as data from "../packages/perseus/src/widgets/__testdata__/interactive-graph.testdata";
import {storybookTestDependencies} from "../testing/test-dependencies";

import type {APIOptions, PerseusRenderer} from "../packages/perseus/src";

import "../packages/perseus/src/styles/perseus-renderer.less";

const questions = [
    data.angleQuestion,
    data.linearSystemQuestion,
    data.circleQuestion,
    data.linearQuestion,
    data.polygonQuestion,
    data.pointQuestion,
    data.rayQuestion,
    data.segmentQuestion,
    data.sinusoidQuestion,
];

const styles = StyleSheet.create({
    page: {
        height: "100vh",
        overflowY: "hidden",
    },

    header: {
        display: "flex",
        alignItems: "center",
        boxShadow: "0 0 10px #0002",
        borderBlockEnd: `1px solid ${color.offBlack32}`,
        background: color.offBlack8,
        padding: Spacing.small_12,
    },

    main: {
        flexGrow: 1,
        overflowY: "scroll",
        paddingBlock: Spacing.xLarge_32,
    },

    cards: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },

    card: {
        float: "left",
        margin: 16,
        width: 460,
        borderRadius: 7,
        border: "1px solid #ccc",
    },
});

setDependencies(storybookTestDependencies);

render(
    <RenderStateRoot>
        <DevUI />
    </RenderStateRoot>,
    document.getElementById("app-root"),
);

function DevUI() {
    const ids = useUniqueIdWithMock();

    const [isMobile, setIsMobile] = useState(false);

    return (
        <View className={css(styles.page)}>
            <header className={css(styles.header)}>
                <Switch
                    id={ids.get("mobile")}
                    checked={isMobile}
                    onChange={setIsMobile}
                />
                <Strut size={Spacing.xSmall_8} />
                <label htmlFor={ids.get("mobile")}>Mobile</label>
            </header>
            <main className={css(styles.main)}>
                <View style={styles.cards}>
                    {questions.map((question, i) => (
                        <QuestionRenderer
                            key={i}
                            question={question}
                            apiOptions={{isMobile}}
                        />
                    ))}
                </View>
            </main>
        </View>
    );
}

type QuestionRendererProps = {
    question: PerseusRenderer;
    apiOptions?: APIOptions;
};

function QuestionRenderer({question, apiOptions = {}}: QuestionRendererProps) {
    return (
        <div className={css(styles.card)}>
            <div style={{padding: 28}} className="framework-perseus">
                <Renderer
                    content={question.content}
                    images={question.images}
                    widgets={question.widgets}
                    problemNum={0}
                    apiOptions={apiOptions}
                />
            </div>
        </div>
    );
}
