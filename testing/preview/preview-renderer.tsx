/* eslint-disable import/no-relative-packages, import/order */
import * as React from "react";

import {
    KeypadContext,
    StatefulKeypadContextProvider,
} from "@khanacademy/keypad-context";
import {MobileKeypad} from "@khanacademy/math-input";
import {
    ArticleRenderer,
    Dependencies,
    HintRenderer,
    ServerItemRenderer,
} from "@khanacademy/perseus";
import * as PerseusLinter from "@khanacademy/perseus-linter";
import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";

import {lintGutterWidth} from "../../packages/perseus-editor/src/styles/constants";

import type {PreviewContent} from "../../packages/perseus-editor/src/preview/message-types";
import {storybookDependenciesV2} from "../test-dependencies";

type Props = {
    data: PreviewContent;
};

/**
 * Renders the appropriate content based on preview data type
 */
export function PreviewRenderer({data}: Props) {
    const iframe = window.frameElement as HTMLIFrameElement | null;
    const isMobile = iframe?.dataset.mobile === "true";
    const hasLintGutter = iframe?.dataset.lintGutter === "true";

    const className = isMobile ? "perseus-mobile" : "";

    if (data.type === "question") {
        const {
            item,
            apiOptions,
            initialHintsVisible,
            linterContext,
            reviewMode,
            problemNum,
        } = data.data;

        return (
            <Dependencies.DependenciesContext.Provider
                value={storybookDependenciesV2}
            >
                <View
                    className={`framework-perseus ${className}`}
                    style={[
                        styles.container,
                        hasLintGutter ? styles.gutter : undefined,
                    ]}
                >
                    <StatefulKeypadContextProvider>
                        <KeypadContext.Consumer>
                            {({
                                setKeypadActive,
                                keypadElement,
                                setKeypadElement,
                            }) => (
                                <>
                                    <ServerItemRenderer
                                        item={item}
                                        apiOptions={{...apiOptions, isMobile}}
                                        keypadElement={keypadElement}
                                        linterContext={PerseusLinter.pushContextStack(
                                            linterContext,
                                            "item",
                                        )}
                                        hintsVisible={initialHintsVisible}
                                        reviewMode={reviewMode}
                                        problemNum={problemNum}
                                        dependencies={storybookDependenciesV2}
                                    />

                                    <MobileKeypad
                                        onAnalyticsEvent={() =>
                                            Promise.resolve()
                                        }
                                        onDismiss={() => setKeypadActive(false)}
                                        onElementMounted={setKeypadElement}
                                    />
                                </>
                            )}
                        </KeypadContext.Consumer>
                    </StatefulKeypadContextProvider>
                </View>
            </Dependencies.DependenciesContext.Provider>
        );
    }

    if (data.type === "hint") {
        const {hint, apiOptions, linterContext} = data.data;

        return (
            <Dependencies.DependenciesContext.Provider
                value={storybookDependenciesV2}
            >
                <View
                    className={`framework-perseus ${className}`}
                    style={[
                        styles.container,
                        hasLintGutter ? styles.gutter : undefined,
                    ]}
                >
                    <StatefulKeypadContextProvider>
                        <KeypadContext.Consumer>
                            {({
                                setKeypadActive,
                                keypadElement,
                                setKeypadElement,
                            }) => (
                                <>
                                    <HintRenderer
                                        hint={hint}
                                        apiOptions={{...apiOptions, isMobile}}
                                        dependencies={storybookDependenciesV2}
                                        pos={0}
                                        linterContext={PerseusLinter.pushContextStack(
                                            linterContext,
                                            "hint",
                                        )}
                                    />

                                    <MobileKeypad
                                        onAnalyticsEvent={() =>
                                            Promise.resolve()
                                        }
                                        onDismiss={() => setKeypadActive(false)}
                                        onElementMounted={setKeypadElement}
                                    />
                                </>
                            )}
                        </KeypadContext.Consumer>
                    </StatefulKeypadContextProvider>
                </View>
            </Dependencies.DependenciesContext.Provider>
        );
    }

    if (data.type === "article") {
        const {content, widgets, images, apiOptions} = data.data;

        return (
            <Dependencies.DependenciesContext.Provider
                value={storybookDependenciesV2}
            >
                <View
                    className={`framework-perseus ${className}`}
                    style={[
                        styles.container,
                        hasLintGutter ? styles.gutter : undefined,
                    ]}
                >
                    <StatefulKeypadContextProvider>
                        <KeypadContext.Consumer>
                            {({
                                setKeypadActive,
                                keypadElement,
                                setKeypadElement,
                            }) => (
                                <>
                                    <ArticleRenderer
                                        json={{content, widgets, images}}
                                        apiOptions={{...apiOptions, isMobile}}
                                        keypadElement={keypadElement}
                                        linterContext={
                                            PerseusLinter.linterContextDefault
                                        }
                                        dependencies={storybookDependenciesV2}
                                        useNewStyles={false}
                                    />

                                    <MobileKeypad
                                        onAnalyticsEvent={() =>
                                            Promise.resolve()
                                        }
                                        onDismiss={() => setKeypadActive(false)}
                                        onElementMounted={setKeypadElement}
                                    />
                                </>
                            )}
                        </KeypadContext.Consumer>
                    </StatefulKeypadContextProvider>
                </View>
            </Dependencies.DependenciesContext.Provider>
        );
    }

    if (data.type === "article-all") {
        const sections = data.data;

        // For article-all, render multiple sections
        return (
            <Dependencies.DependenciesContext.Provider
                value={storybookDependenciesV2}
            >
                <View
                    className={`framework-perseus ${className}`}
                    style={[
                        styles.container,
                        hasLintGutter ? styles.gutter : undefined,
                        styles.articleAll,
                    ]}
                >
                    <StatefulKeypadContextProvider>
                        <KeypadContext.Consumer>
                            {({
                                setKeypadActive,
                                keypadElement,
                                setKeypadElement,
                            }) => (
                                <>
                                    <ArticleRenderer
                                        json={sections.map((section) => ({
                                            content: section.content,
                                            widgets: section.widgets,
                                            images: section.images,
                                        }))}
                                        apiOptions={{
                                            ...sections[0]?.apiOptions,
                                            isMobile,
                                        }}
                                        keypadElement={keypadElement}
                                        linterContext={
                                            PerseusLinter.linterContextDefault
                                        }
                                        dependencies={storybookDependenciesV2}
                                        useNewStyles={false}
                                    />

                                    <MobileKeypad
                                        onAnalyticsEvent={() =>
                                            Promise.resolve()
                                        }
                                        onDismiss={() => setKeypadActive(false)}
                                        onElementMounted={setKeypadElement}
                                    />
                                </>
                            )}
                        </KeypadContext.Consumer>
                    </StatefulKeypadContextProvider>
                </View>
            </Dependencies.DependenciesContext.Provider>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    container: {
        padding: spacing.xxxSmall_4,
        containerType: "inline-size",
        containerName: "perseus-root",
    },
    gutter: {
        marginRight: lintGutterWidth,
    },
    articleAll: {
        // For article-all type, allow scrolling to see full content
        overflow: "auto",
    },
});
