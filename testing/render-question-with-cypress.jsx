/* eslint-disable static-service/require-fixture */
// @flow
import React from "react";
import {mount} from "@cypress/react";

import * as Perseus from "../perseus-all-package/perseus.js";
import AssetContext from "../perseus-all-package/asset-context.js";

import type {PerseusRenderer} from "../perseus-all-package/perseus-types.js";
import type {APIOptions} from "../perseus-all-package/types.js";

/**
 * Renders the given question using Cypress. Waits until all assets have been
 * "rendered/loaded" before it returns.
 */
const renderQuestion = (
    question: PerseusRenderer,
    apiOptions: APIOptions = Object.freeze({}),
    reviewMode?: boolean = false,
): (() => Perseus.Renderer) => {
    let renderer: Perseus.Renderer | null = null;

    let renderedAtLeastOnce = false;
    const onRender = () => {
        renderedAtLeastOnce = true;
    };

    const assetStatuses: {[assetKey: string]: boolean} = {};
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
                <Perseus.Renderer
                    ref={(node) => (renderer = node)}
                    content={question.content}
                    images={question.images}
                    widgets={question.widgets}
                    problemNum={0}
                    apiOptions={apiOptions}
                    reviewMode={reviewMode}
                    onRender={onRender}
                />
            </AssetContext.Provider>
        </div>,
    );

    // Wait for everything to load (spinner gone!)
    // See svg-image.jsx
    cy.get('span[style*="images/spinner.gif"]').should("not.exist");

    // Wait for all widgets to finish rendering.
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
