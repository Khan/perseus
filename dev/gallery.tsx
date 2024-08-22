/* eslint monorepo/no-internal-import: "off", monorepo/no-relative-import: "off", import/no-relative-packages: "off" */
import Button from "@khanacademy/wonder-blocks-button";
import {useUniqueIdWithMock, View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, MultiSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import SearchField from "@khanacademy/wonder-blocks-search-field";
import Switch from "@khanacademy/wonder-blocks-switch";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {css, StyleSheet} from "aphrodite";
import * as React from "react";
import {useEffect, useMemo, useState} from "react";

import {Renderer} from "../packages/perseus/src";
import {mockStrings} from "../packages/perseus/src/strings";
import {MafsGraphTypeFlags} from "../packages/perseus/src/types";
import * as grapher from "../packages/perseus/src/widgets/__testdata__/grapher.testdata";
import * as interactiveGraph from "../packages/perseus/src/widgets/__testdata__/interactive-graph.testdata";
import * as numberLine from "../packages/perseus/src/widgets/__testdata__/number-line.testdata";

import {Header} from "./header";

import type {APIOptions, PerseusRenderer} from "../packages/perseus/src";

import "../packages/perseus/src/styles/perseus-renderer.less";

const questions: [PerseusRenderer, number][] = pairWithIndices([
    interactiveGraph.segmentQuestion,
    interactiveGraph.pointQuestion,
    interactiveGraph.finitePointQuestion,
    interactiveGraph.angleQuestion,
    interactiveGraph.linearSystemQuestion,
    interactiveGraph.circleQuestion,
    interactiveGraph.linearQuestion,
    interactiveGraph.polygonQuestion,
    interactiveGraph.polygonWithAnglesQuestion,
    interactiveGraph.polygonWithAnglesAndManySidesQuestion,
    interactiveGraph.polygonWithAnglesAndFourSidesQuestion,
    interactiveGraph.polygonWithFourSidesSnappingQuestion,
    interactiveGraph.polygonWithAnglesAndAnglesSnapToQuestion,
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
]);

const styles = StyleSheet.create({
    page: {
        height: "100vh",
        overflowY: "hidden",
    },

    main: {
        flexGrow: 1,
        overflowY: "scroll",
        paddingBlock: spacing.xLarge_32,
    },

    headerItem: {
        flexDirection: "row",
        alignItems: "center",
        flexBasis: "max-content",
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
});

function capitalize(key: string): string {
    return key
        .split("-")
        .map(
            (word) =>
                `${word.slice(0, 1).toLocaleUpperCase()}${word.slice(1).toLocaleLowerCase()}`,
        )
        .join(" ");
}

export function Gallery() {
    const ids = useUniqueIdWithMock();
    const params = useMemo(
        () => new URLSearchParams(window.location.search),
        [],
    );

    const [isMobile, setIsMobile] = useState(params.get("mobile") === "true");
    const [showTooltips, setShowTooltips] = useState(
        params.get("tooltips") === "true",
    );
    const [mafsFlags, setMafsFlags] = useState<Array<string>>(
        params
            .get("flags")
            ?.split(",")
            // We filter through the MafsFlags array to ensure we don't retain
            // flags from the query string that don't actually exist anymore.
            .filter((flag) => MafsGraphTypeFlags.includes(flag as any)) || [],
    );
    const [search, setSearch] = useState<string>(params.get("search") || "");

    useEffect(() => {
        const url = new URL(window.location.href);
        if (isMobile) {
            url.searchParams.set("mobile", "true");
        } else {
            url.searchParams.delete("mobile");
        }
        if (showTooltips) {
            url.searchParams.set("tooltips", "true");
        } else {
            url.searchParams.delete("tooltips");
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
    }, [isMobile, showTooltips, mafsFlags, params, search]);

    const mafsFlagsObject = mafsFlags.reduce((acc, flag) => {
        acc[flag] = true;
        return acc;
    }, {});

    const mobileId = ids.get("mobile");
    const tooltipId = ids.get("tooltip");
    const flagsId = ids.get("flags");
    const searchId = ids.get("search");

    const insertShowTooltips = ([question, i]): [PerseusRenderer, number] => {
        Object.keys(question.widgets).forEach((widgetName) => {
            if (question.widgets[widgetName].type === "interactive-graph") {
                question.widgets[widgetName].options.showTooltips =
                    showTooltips;
            }
        });
        return [question, i];
    };

    return (
        <View className={css(styles.page)}>
            <Header>
                <View style={styles.headerItem}>
                    <nav>
                        <a href="#flipbook">Flipbook</a>
                    </nav>
                </View>
                <View style={styles.headerItem}>
                    <SearchField
                        id={searchId}
                        value={search}
                        onChange={setSearch}
                    />
                    <Strut size={spacing.xSmall_8} />
                    <label htmlFor={searchId}>Search Types</label>
                </View>
                <View style={styles.headerItem}>
                    <MultiSelect
                        id={flagsId}
                        onChange={setMafsFlags}
                        selectedValues={mafsFlags}
                    >
                        {MafsGraphTypeFlags.map((flag) => (
                            <OptionItem
                                key={flag}
                                value={flag}
                                label={capitalize(flag)}
                            />
                        ))}
                    </MultiSelect>
                    <Strut size={spacing.xSmall_8} />
                    <label htmlFor={flagsId}>Mafs Flags</label>
                </View>
                <View style={styles.headerItem}>
                    <Switch
                        id={tooltipId}
                        checked={showTooltips}
                        onChange={setShowTooltips}
                    />
                    <Strut size={spacing.xSmall_8} />
                    <label htmlFor={tooltipId}>Show Tooltips</label>
                </View>
                <View style={styles.headerItem}>
                    <Switch
                        id={mobileId}
                        checked={isMobile}
                        onChange={setIsMobile}
                    />
                    <Strut size={spacing.xSmall_8} />
                    <label htmlFor={mobileId}>Mobile</label>
                </View>
            </Header>
            <main className={css(styles.main)}>
                <View
                    style={styles.cards}
                    className={isMobile ? "perseus-mobile" : ""}
                >
                    {questions
                        .filter(([question]: [PerseusRenderer, number]) =>
                            search
                                ? graphTypeContainsText(question, search)
                                : true,
                        )
                        .map(insertShowTooltips)
                        .map(([question, i]) => (
                            <QuestionRenderer
                                key={`${i}${showTooltips ? "-with-tooltips" : ""}`}
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
                    strings={mockStrings}
                />
            </div>
            <Button
                onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(question));
                }}
                size="small"
                kind="tertiary"
            >
                Copy question
            </Button>
        </div>
    );
}

const graphTypeContainsText = (
    question: PerseusRenderer,
    search: string,
): boolean => {
    const widgetKey = Object.keys(question.widgets)[0];
    const widget = question.widgets[widgetKey];
    switch (widget.type) {
        case "grapher":
            if (
                widget.options.availableTypes.some((type: string) =>
                    type.includes(search),
                )
            ) {
                return true;
            }
            return false;
        case "interactive-graph":
            if (widget.options.graph.type.includes(search)) {
                return true;
            }
            return false;
        case "number-line":
            return widget.type.includes(search);
        default:
            return false;
    }
};

function pairWithIndices<T>(a: T[]): [T, number][] {
    return a.map((elem, index) => [elem, index]);
}
