/* eslint-disable import/no-relative-packages */
import {
    KeypadContext,
    StatefulKeypadContextProvider,
} from "@khanacademy/keypad-context";
import {MobileKeypad} from "@khanacademy/math-input";
import {
    ArticleRenderer,
    Dependencies,
    Renderer,
    ServerItemRenderer,
    usePerseusI18n,
} from "@khanacademy/perseus";
import {pushContextStack} from "@khanacademy/perseus-linter";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {lintGutterWidth} from "../../styles/constants";
import {storybookDependenciesV2} from "../test-dependencies";

import type {PreviewContent} from "../../preview/message-types";

type Props = {
    data: PreviewContent;
};

function PreviewWithKeypad({
    children,
}: {
    children: ({
        setKeypadActive,
        keypadElement,
        setKeypadElement,
        isMobile,
    }) => React.ReactNode;
}) {
    const iframe = window.frameElement as HTMLIFrameElement | null;
    const isMobile = iframe?.dataset.mobile === "true";
    const hasLintGutter = iframe?.dataset.lintGutter === "true";

    const className = isMobile ? "perseus-mobile" : "";
    const keypadCtx = React.useContext(KeypadContext);

    const containerStyle = React.useMemo(
        () => [styles.container, hasLintGutter ? styles.gutter : undefined],
        [hasLintGutter],
    );

    return (
        <Dependencies.DependenciesContext.Provider
            value={storybookDependenciesV2}
        >
            <StatefulKeypadContextProvider>
                <View
                    className={`framework-perseus ${className}`}
                    style={containerStyle}
                >
                    {children({...keypadCtx, isMobile})}

                    <MobileKeypad
                        onAnalyticsEvent={() => Promise.resolve()}
                        onDismiss={() => keypadCtx.setKeypadActive(false)}
                        onElementMounted={keypadCtx.setKeypadElement}
                    />
                </View>
            </StatefulKeypadContextProvider>
        </Dependencies.DependenciesContext.Provider>
    );
}

/**
 * Renders the appropriate content based on preview data type
 */
export function PreviewRenderer({data}: Props) {
    const i18n = usePerseusI18n();

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
            <PreviewWithKeypad>
                {({keypadElement, isMobile}) => (
                    <ServerItemRenderer
                        item={item}
                        apiOptions={{...apiOptions, isMobile}}
                        keypadElement={keypadElement}
                        linterContext={pushContextStack(
                            linterContext,
                            "question",
                        )}
                        hintsVisible={initialHintsVisible}
                        reviewMode={reviewMode}
                        problemNum={problemNum}
                        dependencies={storybookDependenciesV2}
                    />
                )}
            </PreviewWithKeypad>
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
            <PreviewWithKeypad>
                {({keypadElement, isMobile}) => (
                    <Renderer
                        strings={i18n.strings}
                        content={content}
                        widgets={hint.widgets}
                        images={hint.images}
                        apiOptions={{...apiOptions, isMobile}}
                        keypadElement={keypadElement}
                        linterContext={pushContextStack(linterContext, "hint")}
                    />
                )}
            </PreviewWithKeypad>
        );
    }

    if (data.type === "article") {
        const {json, apiOptions, legacyPerseusLint, linterContext} = data.data;

        return (
            <PreviewWithKeypad>
                {({keypadElement, isMobile}) => (
                    <ArticleRenderer
                        json={json}
                        apiOptions={{...apiOptions, isMobile}}
                        keypadElement={keypadElement}
                        legacyPerseusLint={legacyPerseusLint}
                        linterContext={pushContextStack(
                            linterContext,
                            "article",
                        )}
                        dependencies={storybookDependenciesV2}
                    />
                )}
            </PreviewWithKeypad>
        );
    }

    if (data.type === "article-all") {
        return (
            <PreviewWithKeypad>
                {({keypadElement, isMobile}) => (
                    <>
                        {data.data.map((article, i) => (
                            <ArticleRenderer
                                key={i}
                                json={article.json}
                                apiOptions={{...article.apiOptions, isMobile}}
                                keypadElement={keypadElement}
                                legacyPerseusLint={article.legacyPerseusLint}
                                linterContext={pushContextStack(
                                    article.linterContext,
                                    "article",
                                )}
                                dependencies={storybookDependenciesV2}
                            />
                        ))}
                    </>
                )}
            </PreviewWithKeypad>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    container: {
        padding: sizing.size_040,
        containerType: "inline-size",
        containerName: "perseus-root",
    },
    gutter: {
        marginRight: lintGutterWidth,
    },
});
