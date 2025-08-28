import PerseusMarkdown from "../perseus-markdown";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

/**
 * Extracts widget IDs from a PerseusRenderer in the order they appear in the content.
 * Handles deduplication by only including the first occurrence of each widget ID.
 */
export function extractWidgetIds(
    perseusRenderer: PerseusRenderer,
    options?: {inline?: boolean},
): ReadonlyArray<string> {
    const widgetIds: string[] = [];

    // Get content from the perseus renderer
    const content = perseusRenderer.content;
    const inline = options?.inline ?? false;

    // Parse the markdown content using the same logic as the renderer
    const parsedMarkdown = inline
        ? PerseusMarkdown.parseInline(content, options)
        : PerseusMarkdown.parse(content, options);

    PerseusMarkdown.traverseContent(parsedMarkdown, (node) => {
        if (node.type === "widget") {
            if (!widgetIds.includes(node.id)) {
                widgetIds.push(node.id);
            }
        }
    });

    return widgetIds;
}
