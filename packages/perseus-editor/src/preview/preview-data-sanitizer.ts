import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import {sanitizeApiOptions} from "./sanitize-api-options";

import type {PreviewContent} from "./message-types";

/**
 * Sanitizes preview content by removing non-serializable functions and React
 * components from apiOptions before sending via postMessage.
 */
export function sanitizePreviewData(
    /** Preview content to sanitize */
    content: PreviewContent,
): PreviewContent {
    if (content.data.apiOptions == null) {
        return content;
    }

    const sanitizedApiOptions = sanitizeApiOptions(content.data.apiOptions);

    // We switch on `content.type` and rebuild each variant explicitly so the
    // result stays a properly-correlated member of the `PreviewContent`
    // discriminated union — a single `{...content, data: {...}}` spread would
    // widen `type` and `data` independently and no longer be assignable.
    switch (content.type) {
        case "question":
            return {
                type: content.type,
                data: {
                    ...content.data,
                    apiOptions: sanitizedApiOptions,
                },
            };
        case "hint":
            return {
                type: content.type,
                data: {
                    ...content.data,
                    apiOptions: sanitizedApiOptions,
                },
            };
        case "article":
            return {
                type: content.type,
                data: {
                    ...content.data,
                    apiOptions: sanitizedApiOptions,
                },
            };
        case "article-all":
            return {
                type: content.type,
                data: {
                    ...content.data,
                    apiOptions: sanitizedApiOptions,
                },
            };
        default:
            throw new UnreachableCaseError(content);
    }
}
