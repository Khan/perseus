import {sanitizeApiOptions} from "./sanitize-api-options";

import type {PreviewContent} from "./message-types";

/**
 * Sanitizes preview content by removing non-serializable functions and React
 * components from apiOptions before sending via postMessage.
 *
 * NOTE: The article-all case currently sanitizes apiOptions on each section
 * individually because the current type is ArticlePreviewData[] (each section
 * carries its own apiOptions). This will be simplified to a single apiOptions
 * when we restructure the preview data types.
 */
export function sanitizePreviewData(
    /** Preview content to sanitize */
    content: PreviewContent,
): PreviewContent {
    if (
        (content.type === "question" ||
            content.type === "hint" ||
            content.type === "article") &&
        content.data.apiOptions != null
    ) {
        return {
            ...content,
            data: {
                ...content.data,
                apiOptions: sanitizeApiOptions(content.data.apiOptions),
            },
        } as PreviewContent;
    }

    if (content.type === "article-all") {
        return {
            ...content,
            data: content.data.map((section) =>
                section.apiOptions != null
                    ? {
                          ...section,
                          apiOptions: sanitizeApiOptions(section.apiOptions),
                      }
                    : section,
            ),
        } as PreviewContent;
    }

    return content;
}
