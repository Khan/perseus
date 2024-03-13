/* eslint monorepo/no-internal-import: "off", monorepo/no-relative-import: "off", import/no-relative-packages: "off" */
import {useUniqueIdWithMock, View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, MultiSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import Switch from "@khanacademy/wonder-blocks-switch";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {css, StyleSheet} from "aphrodite";
import * as React from "react";
import {useState} from "react";

import {Renderer} from "../packages/perseus/src";
import * as grapher from "../packages/perseus/src/widgets/__testdata__/grapher.testdata";
import * as interactiveGraph from "../packages/perseus/src/widgets/__testdata__/interactive-graph.testdata";
import * as numberLine from "../packages/perseus/src/widgets/__testdata__/number-line.testdata";

import type {APIOptions, PerseusRenderer} from "../packages/perseus/src";

import "../packages/perseus/src/styles/perseus-renderer.less";

const questions = [
    interactiveGraph.segmentQuestion,
    interactiveGraph.pointQuestion,
    interactiveGraph.angleQuestion,
    interactiveGraph.linearSystemQuestion,
    interactiveGraph.circleQuestion,
    interactiveGraph.linearQuestion,
    interactiveGraph.polygonQuestion,
    interactiveGraph.rayQuestion,
    interactiveGraph.sinusoidQuestion,
    grapher.absoluteValueQuestion,
    grapher.exponentialQuestion,
    grapher.linearQuestion,
    grapher.logarithmQuestion,
    grapher.multipleAvailableTypesQuestion,
    grapher.quadraticQuestion,
    grapher.sinusoidQuestion,
    numberLine.question1,
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

export function Gallery() {
    const ids = useUniqueIdWithMock();

    const [isMobile, setIsMobile] = useState(false);
    const [mafsFlags, setMafsFlags] = useState<Array<string>>([]);

    const mafsFlagsObject = mafsFlags.reduce((acc, flag) => {
        acc[flag] = true;
        return acc;
    }, {});

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
                <Strut size={Spacing.medium_16} />
                <MultiSelect onChange={setMafsFlags} selectedValues={mafsFlags}>
                    <OptionItem value="segment" label="Segment" />
                    <OptionItem value="linear" label="Linear" />
                    <OptionItem value="point" label="Point" />
                </MultiSelect>
                <Strut size={Spacing.medium_16} />
                <nav>
                    <a href="#flipbook">Flipbook</a>
                </nav>
            </header>
            <main className={css(styles.main)}>
                <View
                    style={styles.cards}
                    className={isMobile ? "perseus-mobile" : ""}
                >
                    {questions.map((question, i) => (
                        <QuestionRenderer
                            key={i}
                            question={question}
                            apiOptions={{
                                isMobile,
                                flags: {mafs: mafsFlagsObject},
                            }}
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
