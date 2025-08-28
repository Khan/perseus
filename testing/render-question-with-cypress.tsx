import {mount} from "@cypress/react";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import React from "react";

import {MathInputI18nContextProvider} from "../packages/math-input/src/components/i18n-context";
import {mockStrings as mathInputMockStrings} from "../packages/math-input/src/strings";
import AssetContext from "../packages/perseus/src/asset-context";
import {DependenciesContext} from "../packages/perseus/src/dependencies";
import * as Perseus from "../packages/perseus/src/index";
import {mockStrings} from "../packages/perseus/src/strings";
import UserInputManager from "../packages/perseus/src/user-input-manager";

import {cypressDependenciesV2} from "./test-dependencies";

import type {APIOptions} from "../packages/perseus/src/types";
import type {PerseusRenderer} from "@khanacademy/perseus-core";

/**
 * Renders the given question using Cypress. Waits until all assets have been
 * "rendered/loaded" before it returns.
 */
const renderQuestion = (
    question: PerseusRenderer,
    apiOptions: APIOptions = Object.freeze({}),
    reviewMode = false,
): (() => Perseus.Renderer) => {
    let renderer: Perseus.Renderer | null = null;

    let renderedAtLeastOnce = false;
    const onRender = () => {
        renderedAtLeastOnce = true;
    };

    const assetStatuses: {
        [assetKey: string]: boolean;
    } = {};
    const setAssetStatus = (assetKey: string, loaded: boolean) => {
        assetStatuses[assetKey] = loaded;
    };

    const checkIsRenderedAndLoaded = () =>
        renderedAtLeastOnce &&
        Object.keys(assetStatuses).every((key) => assetStatuses[key] === true);

    // We use the AssetContext to allow rendered components to tell us when
    // they are fully rendered (like KaTeX, for example).
    // onRender is also used to signal that rendering has completed.
    mount(
        <div className="framework-perseus">
            <AssetContext.Provider value={{assetStatuses, setAssetStatus}}>
                <RenderStateRoot>
                    <DependenciesContext.Provider value={cypressDependenciesV2}>
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
                                        <Perseus.Renderer
                                            ref={(node) => (renderer = node)}
                                            userInput={userInput}
                                            handleUserInput={handleUserInput}
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
                                    )}
                                </UserInputManager>
                            </Perseus.PerseusI18nContextProvider>
                        </MathInputI18nContextProvider>
                    </DependenciesContext.Provider>
                </RenderStateRoot>
            </AssetContext.Provider>
        </div>,
    );

    // Wait for everything to load (spinner gone!)
    // See svg-image.jsx
    cy.get('span[style*="images/spinner.gif"]').should("not.exist");

    // Wait for all widgets to finish rendering.
    // @ts-expect-error FEI-5003 - TS2339 - Property 'waitUntil' does not exist on type 'cy & CyEventEmitter'
    cy.waitUntil(() => checkIsRenderedAndLoaded(), {
        customMessage: "Wait for rendering to finish",
    });

    // NOTE(jeremy/jared): the "mount" here isn't guaranteed to have
    // run/finished by the time we return, so we return a function that can be
    // called later on when the renderer is actually needed.
    return () => {
        if (!renderer) {
            throw new Error(`No renderer!`);
        }
        return renderer;
    };
};

export default renderQuestion;
