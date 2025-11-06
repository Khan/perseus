/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import type {APIOptions} from "@khanacademy/perseus";

/**
 * Removes non-serializable functions and React components from APIOptions
 * before sending via postMessage.
 *
 * All function callbacks and React components are removed as they cannot be
 * cloned by the structured clone algorithm used by postMessage.
 *
 * Serializable options (booleans, strings, numbers) are preserved.
 */
export function sanitizeApiOptions(
    apiOptions: APIOptions,
): Partial<APIOptions> {
    const {
        onFocusChange: _,
        answerableCallback: __,
        getAnotherHint: ___,
        interactionCallback: ____,
        imagePreloader: _____,
        trackInteraction: ______,
        setDrawingAreaAvailable: ________,
        baseElements: _________,
        nativeKeypadProxy: __________,
        // Remove React nodes (placeholders)
        imagePlaceholder: ___________,
        widgetPlaceholder: ____________,
        ...serializableOptions
    } = apiOptions;

    return serializableOptions;
}
