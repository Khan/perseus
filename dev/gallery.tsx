/* eslint monorepo/no-internal-import: "off", monorepo/no-relative-import: "off", import/no-relative-packages: "off" */
import {useUniqueIdWithMock, View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, MultiSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import SearchField from "@khanacademy/wonder-blocks-search-field";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import Switch from "@khanacademy/wonder-blocks-switch";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {css, StyleSheet} from "aphrodite";
import * as React from "react";
import {useEffect, useMemo, useState} from "react";

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
    const params = useMemo(
        () => new URLSearchParams(window.location.search),
        [],
    );

    const [isMobile, setIsMobile] = useState(params.get("mobile") === "true");
    const [mafsFlags, setMafsFlags] = useState<Array<string>>(
        params.get("flags")?.split(",") || [],
    );
    const [search, setSearch] = useState<string>(params.get("search") || "");

    useEffect(() => {
        const url = new URL(window.location.href);
        if (isMobile) {
            url.searchParams.set("mobile", "true");
        } else {
            url.searchParams.delete("mobile");
        }
        if (mafsFlags.length === 0) {
            url.searchParams.delete("flags");
        } else {
            url.searchParams.set("flags", mafsFlags.join(","));
        }
        if (!search) {
            url.searchParams.delete("search");
        } else {
            url.searchParams.set("search", search);
        }
        window.history.replaceState({}, "", url.toString());
    }, [isMobile, mafsFlags, params, search]);

    const mafsFlagsObject = mafsFlags.reduce((acc, flag) => {
        acc[flag] = true;
        return acc;
    }, {});

    const switchId = ids.get("mobile");
    const flagsId = ids.get("flags");
    const searchId = ids.get("search");

    return (
        <View className={css(styles.page)}>
            <header className={css(styles.header)}>
                <Switch
                    id={switchId}
                    checked={isMobile}
                    onChange={setIsMobile}
                />
                <Strut size={Spacing.xSmall_8} />
                <label htmlFor={switchId}>Mobile</label>
                <Strut size={Spacing.medium_16} />
                <MultiSelect
                    id={flagsId}
                    onChange={setMafsFlags}
                    selectedValues={mafsFlags}
                >
                    <OptionItem value="segment" label="Segment" />
                    <OptionItem value="linear" label="Linear" />
                    <OptionItem value="linear-system" label="Linear System" />
                    <OptionItem value="point" label="Point" />
                    <OptionItem value="ray" label="Ray" />
                </MultiSelect>
                <Strut size={Spacing.xSmall_8} />
                <label htmlFor={flagsId}>Mafs Flags</label>
                <Strut size={Spacing.medium_16} />
                <SearchField
                    id={searchId}
                    value={search}
                    onChange={setSearch}
                />
                <Strut size={Spacing.xSmall_8} />
                <label htmlFor={searchId}>Search Types</label>
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
                    {questions
                        .filter((question) => {
                            if (!search) {
                                return true;
                            }
                            const widgetKey = Object.keys(question.widgets)[0];
                            const widget = question.widgets[widgetKey];
                            switch (widget.type) {
                                case "grapher":
                                    if (
                                        widget.options.availableTypes.some(
                                            (type: string) =>
                                                type.includes(search),
                                        )
                                    ) {
                                        return true;
                                    }
                                    break;
                                case "interactive-graph":
                                    if (
                                        widget.options.graph.type.includes(
                                            search,
                                        )
                                    ) {
                                        return true;
                                    }
                                    break;
                                case "number-line":
                                    return widget.type.includes(search);
                                default:
                                    return false;
                            }
                        })
                        .map((question, i) => (
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
