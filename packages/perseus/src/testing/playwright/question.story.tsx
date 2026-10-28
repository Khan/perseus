import {MathInputI18nContextProvider} from "@khanacademy/math-input";
import {mockStrings as mathInputMockStrings} from "@khanacademy/math-input/strings";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import React from "react";

import AssetContext from "../../asset-context";
import {DependenciesContext} from "../../dependencies";
import * as Perseus from "../../index";
import {mockStrings} from "../../strings";
import UserInputManager from "../../user-input-manager";
import {
    playwrightDependenciesV2,
    playwrightTestDependencies,
} from "../test-dependencies";

import type {APIOptions} from "../../types";
import type {PerseusRenderer} from "@khanacademy/perseus-core";

// This module only ever loads in the Playwright component test gallery
// (config/playwright/gallery), so we can set Perseus up as the module loads.
export default {};
Perseus.init();
Perseus.Dependencies.setDependencies(playwrightTestDependencies);

type Props = {
    question: PerseusRenderer;
    apiOptions?: APIOptions;
    reviewMode?: boolean;
};

/**
 * Renders a Perseus question for a Playwright component test.
 *
 * Don't mount this directly; use `renderQuestion()` from `./render-question`,
 * which also waits for the question to finish rendering. Props must be serializable, since Playwright sends them
 * from the test (in Node) to the browser.
 *
 * The test can't reach into the browser to call methods on the Renderer, so
 * this story records what the test needs to observe in hidden inputs next to
 * the question.
 */
export const Question = ({
    question,
    apiOptions = Object.freeze({}),
    reviewMode = false,
}: Props) => {
    const [isRenderedAndLoaded, setIsRenderedAndLoaded] = React.useState(false);

    // We use the AssetContext to allow rendered components to tell us when
    // they are fully rendered (like KaTeX, for example).
    // onRender is also used to signal that rendering has completed.
    //
    // These are mutated in place, rather than kept in state, because assets
    // register themselves while they are rendering, when we can't set state.
    const [assetStatuses] = React.useState<Record<string, boolean>>({});
    const renderedAtLeastOnce = React.useRef(false);
    const updateIsRenderedAndLoaded = React.useCallback(() => {
        // Deferred so that we never set state while another component is
        // rendering.
        queueMicrotask(() =>
            setIsRenderedAndLoaded(
                renderedAtLeastOnce.current &&
                    Object.values(assetStatuses).every((loaded) => loaded),
            ),
        );
    }, [assetStatuses]);
    const setAssetStatus = React.useCallback(
        (assetKey: string, loaded: boolean) => {
            assetStatuses[assetKey] = loaded;
            updateIsRenderedAndLoaded();
        },
        [assetStatuses, updateIsRenderedAndLoaded],
    );
    const onRender = React.useCallback(() => {
        renderedAtLeastOnce.current = true;
        updateIsRenderedAndLoaded();
    }, [updateIsRenderedAndLoaded]);

    return (
        <div className="framework-perseus">
            <AssetContext.Provider value={{assetStatuses, setAssetStatus}}>
                <RenderStateRoot>
                    <DependenciesContext.Provider
                        value={playwrightDependenciesV2}
                    >
                        <MathInputI18nContextProvider
                            locale="en"
                            strings={mathInputMockStrings}
                        >
                            <Perseus.PerseusI18nContextProvider
                                locale="en"
                                strings={mockStrings}
                            >
                                <UserInputManager
                                    widgets={question.widgets}
                                    problemNum={0}
                                >
                                    {({
                                        userInput,
                                        handleUserInput,
                                        initializeUserInput,
                                    }) => (
                                        <>
                                            <Perseus.Renderer
                                                userInput={userInput}
                                                handleUserInput={
                                                    handleUserInput
                                                }
                                                initializeUserInput={
                                                    initializeUserInput
                                                }
                                                content={question.content}
                                                images={question.images}
                                                widgets={question.widgets}
                                                problemNum={0}
                                                apiOptions={apiOptions}
                                                reviewMode={reviewMode}
                                                onRender={onRender}
                                                strings={mockStrings}
                                            />
                                            <form hidden>
                                                <input
                                                    data-testid="is-rendered-and-loaded"
                                                    readOnly
                                                    value={String(
                                                        isRenderedAndLoaded,
                                                    )}
                                                />
                                                <input
                                                    data-testid="user-input"
                                                    readOnly
                                                    value={JSON.stringify(
                                                        userInput,
                                                    )}
                                                />
                                            </form>
                                        </>
                                    )}
                                </UserInputManager>
                            </Perseus.PerseusI18nContextProvider>
                        </MathInputI18nContextProvider>
                    </DependenciesContext.Provider>
                </RenderStateRoot>
            </AssetContext.Provider>
        </div>
    );
};
