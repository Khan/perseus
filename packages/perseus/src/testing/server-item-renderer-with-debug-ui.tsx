import {KeypadContext} from "@khanacademy/keypad-context";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import {ServerItemRenderer} from "../server-item-renderer";
import {isCorrect} from "../util/scoring";

import {DebugAccordionUI} from "./debug-accordion-ui";
import {DebugCheckAnswerFooter} from "./debug-check-answer-footer";
import {useItemRenderer} from "./item-renderer-hooks";
import {StorybookViewOptionsContext} from "./storybook-view-options-context";
import {storybookDependenciesV2} from "./test-dependencies";
import TestKeypadContextWrapper from "./test-keypad-context-wrapper";
import {useStorybookApiOptions} from "./use-storybook-api-options";

import type {APIOptions} from "../types";
import type {
    PerseusItem,
    ShowSolutions,
    UserInputMap,
} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

type Props = {
    item: PerseusItem;
    apiOptions?: APIOptions;
    linterContext?: LinterContextProps;
    reviewMode?: boolean;
    showSolutions?: ShowSolutions;
    initialUserInput?: UserInputMap;
};

/**
 * ServerItemRendererWithDebugUI is a component that renders a Perseus item with debug UI controls
 */
export const ServerItemRendererWithDebugUI = ({
    item,
    apiOptions = Object.freeze({}),
    linterContext,
    reviewMode = false,
    showSolutions,
    initialUserInput,
}: Props): React.ReactElement => {
    const mergedApiOptions = useStorybookApiOptions(apiOptions);
    const {isMobile: mobileOverride, isRtl} = React.useContext(
        StorybookViewOptionsContext,
    );

    // The toolbar's "story default" leaves per-story apiOptions in charge so
    // that mobile stories stay mobile.
    const isMobile = mobileOverride ?? mergedApiOptions.isMobile ?? false;

    const viewApiOptions = React.useMemo(
        () => ({...mergedApiOptions, isMobile}),
        [mergedApiOptions, isMobile],
    );

    // Use our custom hook to manage the renderer state
    const {
        ref,
        state,
        options,
        updateJson,
        handleReset,
        handleSkip,
        handleCheck,
        setShowPopover,
    } = useItemRenderer(item, viewApiOptions, reviewMode, showSolutions);

    return (
        <View>
            <TestKeypadContextWrapper hasFooter={true}>
                <View
                    style={{
                        paddingBlockEnd: "60px",
                    }}
                >
                    {/* Item renderer */}
                    <div
                        className={isMobile ? "perseus-mobile" : ""}
                        dir={isRtl ? "rtl" : "ltr"}
                    >
                        <KeypadContext.Consumer>
                            {({keypadElement}) => (
                                <ServerItemRenderer
                                    key={state.key}
                                    ref={ref}
                                    problemNum={0}
                                    apiOptions={options}
                                    item={state.perseusItem}
                                    dependencies={storybookDependenciesV2}
                                    keypadElement={keypadElement}
                                    linterContext={linterContext}
                                    showSolutions={state.showSolutions}
                                    initialUserInput={initialUserInput}
                                    hintsVisible={state.hintsVisible}
                                    reviewMode={
                                        state.score != null &&
                                        isCorrect(state.score)
                                    }
                                />
                            )}
                        </KeypadContext.Consumer>
                    </div>

                    {/* Debug accordion UI */}
                    <DebugAccordionUI
                        score={state.score}
                        userInput={state.userInput}
                        perseusItem={state.perseusItem}
                        updateJson={updateJson}
                    />
                </View>
            </TestKeypadContextWrapper>

            {/* Footer with action buttons - back outside wrapper */}
            <DebugCheckAnswerFooter
                score={state.score}
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
