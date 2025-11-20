import {sanitizeApiOptions} from "./sanitize-api-options";

import type {PreviewContent} from "./message-types";

/**
 * Sanitizes preview content by removing non-serializable functions and React
 * components from apiOptions before sending via postMessage.
 */
export function sanitizePreviewData(
    /** Preview content to sanitize */
    data: PreviewContent,
): PreviewContent {
    if (
        (data.type === "question" ||
            data.type === "hint" ||
            data.type === "article") &&
        data.data.apiOptions != null
    ) {
        return {
            ...data,
            data: {
                ...data.data,
                apiOptions: sanitizeApiOptions(data.data.apiOptions),
            },
        } as PreviewContent;
    }

    if (data.type === "article-all") {
        return {
            ...data,
            data: data.data.map((section) => ({
                ...section,
                apiOptions: sanitizeApiOptions(section.apiOptions),
            })),
        } as PreviewContent;
    }

    return data;
}
