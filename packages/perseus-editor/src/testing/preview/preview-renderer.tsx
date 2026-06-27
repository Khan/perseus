/* eslint-disable import/no-relative-packages */
import {
    KeypadContext,
    StatefulKeypadContextProvider,
} from "@khanacademy/keypad-context";
import {MobileKeypad} from "@khanacademy/math-input";
import {
    ArticleRenderer,
    Dependencies,
    HintRenderer,
    Renderer,
    UserInputManager,
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
    content: PreviewContent;
    isMobile: boolean;
    hasLintGutter: boolean;
};

function PreviewWithKeypad({
    isMobile,
    hasLintGutter,
    children,
}: {
    isMobile: boolean;
    hasLintGutter: boolean;
    children: ({
        setKeypadActive,
        keypadElement,
        setKeypadElement,
        isMobile,
    }) => React.ReactNode;
}) {
    return (
        <Dependencies.DependenciesContext.Provider
            value={storybookDependenciesV2}
        >
            <StatefulKeypadContextProvider>
                <PreviewKeypadConnection
                    isMobile={isMobile}
                    hasLintGutter={hasLintGutter}
                >
                    {children}
                </PreviewKeypadConnection>
            </StatefulKeypadContextProvider>
        </Dependencies.DependenciesContext.Provider>
    );
}

/**
 * Reads the keypad context and wires it up to the renderer and keypad.
 *
 * This MUST be a separate component rendered *inside*
 * StatefulKeypadContextProvider. If it read the context at the same level as
 * the provider, useContext would resolve to the default (no-op) KeypadContext
 * instead of the stateful one — leaving the keypad's keystrokes disconnected
 * from the widget's input.
 */
function PreviewKeypadConnection({
    isMobile,
    hasLintGutter,
    children,
}: {
    isMobile: boolean;
    hasLintGutter: boolean;
    children: ({
        setKeypadActive,
        keypadElement,
        setKeypadElement,
        isMobile,
    }) => React.ReactNode;
}) {
    const className = isMobile ? "perseus-mobile" : "";
    const keypadCtx = React.useContext(KeypadContext);

    const containerStyle = React.useMemo(
        () => [styles.container, hasLintGutter ? styles.gutter : undefined],
        [hasLintGutter],
    );

    return (
        <View
            className={`framework-perseus ${className}`}
            style={containerStyle}
        >
            {children({...keypadCtx, isMobile})}

            {/* Only mobile previews use the custom keypad (the
                parent sends customKeypad: true for phone/tablet).
                Desktop widgets pop their own keypad, and an inactive
                MobileKeypad still renders a fixed, bordered container
                across the bottom of the preview. */}
            {isMobile && (
                <MobileKeypad
                    onAnalyticsEvent={() => Promise.resolve()}
                    onDismiss={() => keypadCtx.setKeypadActive(false)}
                    onElementMounted={keypadCtx.setKeypadElement}
                />
            )}
        </View>
    );
}

/**
 * Renders the appropriate content based on preview data type
 */
export function PreviewRenderer({content, isMobile, hasLintGutter}: Props) {
    const i18n = usePerseusI18n();

    if (content.type === "question") {
        const {
            question,
            apiOptions,
            linterContext,
            reviewMode,
            legacyPerseusLint,
            problemNum,
        } = content.data;

        return (
            <PreviewWithKeypad
                isMobile={isMobile}
                hasLintGutter={hasLintGutter}
            >
                {({keypadElement, isMobile}) => (
                    <UserInputManager
                        widgets={question.widgets}
                        problemNum={problemNum ?? 0}
                    >
                        {({
                            userInput,
                            handleUserInput,
                            initializeUserInput,
                        }) => (
                            <Renderer
                                strings={i18n.strings}
                                content={question.content}
                                widgets={question.widgets}
                                images={question.images}
                                apiOptions={{...apiOptions, isMobile}}
                                userInput={userInput}
                                handleUserInput={handleUserInput}
                                initializeUserInput={initializeUserInput}
                                keypadElement={keypadElement}
                                reviewMode={reviewMode}
                                legacyPerseusLint={legacyPerseusLint}
                                problemNum={problemNum}
                                linterContext={pushContextStack(
                                    linterContext,
                                    "question",
                                )}
                            />
                        )}
                    </UserInputManager>
                )}
            </PreviewWithKeypad>
        );
    }

    if (content.type === "hint") {
        const {hint, pos, apiOptions, linterContext} = content.data;

        // HintRenderer manages user input itself, forces the custom keypad
        // off, and pushes "hint" onto the lint stack — so it gets an empty
        // initial stack rather than a pre-pushed one.
        return (
            <PreviewWithKeypad
                isMobile={isMobile}
                hasLintGutter={hasLintGutter}
            >
                {({isMobile}) => (
                    <HintRenderer
                        hint={hint}
                        pos={pos}
                        apiOptions={{...apiOptions, isMobile}}
                        linterContext={{...linterContext, stack: []}}
                        dependencies={storybookDependenciesV2}
                    />
                )}
            </PreviewWithKeypad>
        );
    }

    if (content.type === "article-section") {
        const {article, apiOptions, legacyPerseusLint, linterContext} =
            content.data;

        return (
            <PreviewWithKeypad
                isMobile={isMobile}
                hasLintGutter={hasLintGutter}
            >
                {({keypadElement, isMobile}) => (
                    <ArticleRenderer
                        json={article}
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

    if (content.type === "article-all") {
        const {article, apiOptions} = content.data;

        return (
            <PreviewWithKeypad
                isMobile={isMobile}
                hasLintGutter={hasLintGutter}
            >
                {({keypadElement, isMobile}) => (
                    <ArticleRenderer
                        json={[...article]}
                        apiOptions={{...apiOptions, isMobile}}
                        keypadElement={keypadElement}
                        dependencies={storybookDependenciesV2}
                    />
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
