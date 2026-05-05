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

    return {
        ...content,
        data: {
            ...content.data,
            apiOptions: sanitizeApiOptions(content.data.apiOptions),
        },
    } as PreviewContent;
}
