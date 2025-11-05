/* eslint-disable import/no-relative-packages, import/order */
import * as React from "react";

import {
    KeypadContext,
    StatefulKeypadContextProvider,
} from "@khanacademy/keypad-context";
import {MobileKeypad} from "@khanacademy/math-input";
import {
    Dependencies,
    Renderer,
    ServerItemRenderer,
    usePerseusI18n,
} from "@khanacademy/perseus";
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
    const i18n = usePerseusI18n();
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

        console.log("Linter Context:", JSON.stringify(linterContext, null, 2));

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
                                        linterContext={linterContext}
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
        const {hint, bold, apiOptions, linterContext} = data.data;

        // Apply bold styling if needed
        const content =
            bold && !/\*\*/.test(hint.content)
                ? `**${hint.content}**`
                : hint.content;

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
                                    <Renderer
                                        strings={i18n.strings}
                                        content={content}
                                        widgets={hint.widgets}
                                        images={hint.images}
                                        apiOptions={{...apiOptions, isMobile}}
                                        keypadElement={keypadElement}
                                        linterContext={linterContext}
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

    // TODO: Implement article rendering when needed
    if (data.type === "article" || data.type === "article-all") {
        return (
            <View style={styles.container}>
                <div>Article preview not yet implemented</div>
            </View>
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
});
