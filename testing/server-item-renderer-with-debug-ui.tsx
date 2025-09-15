import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import {KeypadContext} from "../packages/keypad-context/src/keypad-context";
import {PerseusI18nContextProvider} from "../packages/perseus/src/components/i18n-context";
import {ServerItemRenderer} from "../packages/perseus/src/server-item-renderer";
import {mockStrings} from "../packages/perseus/src/strings";

import {DebugAccordionUI} from "./debug-accordion-ui";
import {DebugCheckAnswerFooter} from "./debug-check-answer-footer";
import {DebugHeader} from "./debug-header";
import {useItemRenderer} from "./item-renderer-hooks";
import {DEFAULT_LOCALE} from "./locales";
import {storybookDependenciesV2} from "./test-dependencies";
import TestKeypadContextWrapper from "./test-keypad-context-wrapper";

import type {APIOptions} from "../packages/perseus/src/types";
import type {PerseusItem, ShowSolutions} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

type Props = {
    title?: string;
    item: PerseusItem;
    apiOptions?: APIOptions;
    linterContext?: LinterContextProps;
    // Temporary measure testing rendering with answerless data;
    // only exists until all widgets are renderable with answerless data
    startAnswerless?: boolean;
    reviewMode?: boolean;
    showSolutions?: ShowSolutions;
};

/**
 * ServerItemRendererWithDebugUI is a component that renders a Perseus item with debug UI controls
 */
export const ServerItemRendererWithDebugUI = ({
    title = "Widget",
    item,
    apiOptions = Object.freeze({}),
    linterContext,
    reviewMode = false,
    startAnswerless = false,
    showSolutions,
}: Props): React.ReactElement => {
    // Use our custom hook to manage the renderer state
    const {
        ref,
        state,
        options,
        toggleMobile,
        toggleRtl,
        setLocale,
        updateJson,
        handleReset,
        handleSkip,
        handleCheck,
        setShowPopover,
    } = useItemRenderer(
        item,
        apiOptions,
        startAnswerless,
        reviewMode,
        showSolutions,
        DEFAULT_LOCALE,
    );

    return (
        <View>
            <TestKeypadContextWrapper hasFooter={true}>
                <View
                    style={{
                        paddingBottom: "60px",
                    }}
                >
                    {/* Title and mobile toggle */}
                    <DebugHeader
                        title={title}
                        isMobile={state.isMobile}
                        isRtl={state.isRtl}
                        locale={state.locale}
                        onToggleRtl={toggleRtl}
                        onToggleMobile={toggleMobile}
                        onLocaleChange={setLocale}
                    />

                    {/* Item renderer */}
                    <div
                        className={state.isMobile ? "perseus-mobile" : ""}
                        dir={state.isRtl ? "rtl" : "ltr"}
                    >
                        <PerseusI18nContextProvider
                            strings={mockStrings}
                            locale={state.locale}
                        >
                            <KeypadContext.Consumer>
                                {({keypadElement}) => (
                                    <ServerItemRenderer
                                        key={state.key}
                                        ref={ref}
                                        problemNum={0}
                                        score={state.score}
                                        apiOptions={options}
                                        item={state.perseusItem}
                                        dependencies={storybookDependenciesV2}
                                        keypadElement={keypadElement}
                                        linterContext={linterContext}
                                        showSolutions={state.showSolutions}
                                        hintsVisible={state.hintsVisible}
                                        reviewMode={
                                            (state.score &&
                                                state.score?.correct) ||
                                            false
                                        }
                                    />
                                )}
                            </KeypadContext.Consumer>
                        </PerseusI18nContextProvider>
                    </div>

                    {/* Debug accordion UI */}
                    <DebugAccordionUI
                        state={state.score}
                        perseusItem={state.perseusItem}
                        updateJson={updateJson}
                    />
                </View>
            </TestKeypadContextWrapper>

            {/* Footer with action buttons - back outside wrapper */}
            <DebugCheckAnswerFooter
                state={state.score}
                showSolutions={state.showSolutions || "none"}
                popover={{
                    isOpen: state.showPopover,
                    setOpen: setShowPopover,
                }}
                actions={{
                    reset: handleReset,
                    skip: handleSkip,
                    check: handleCheck,
                }}
            />
        </View>
    );
};
