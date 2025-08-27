import PerseusMarkdown from "../perseus-markdown";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {SingleASTNode} from "@khanacademy/simple-markdown";

/**
 * Extracts widget IDs from a PerseusRenderer in the order they appear in the content.
 * Handles deduplication by only including the first occurrence of each widget ID.
 */
export function extractWidgetIds(
    perseusRenderer: PerseusRenderer,
    options?: {inline?: boolean; isJipt?: boolean},
): ReadonlyArray<string> {
    const widgetIds: string[] = [];
    const seenIds = new Set<string>();

    // Get content from the perseus renderer
    const content = perseusRenderer.content;
    const inline = options?.inline ?? false;

    // Parse the markdown content using the same logic as the renderer
    const parseOptions =
        options?.isJipt !== undefined ? {isJipt: options.isJipt} : {};
    const parsedMarkdown = inline
        ? PerseusMarkdown.parseInline(content, parseOptions)
        : PerseusMarkdown.parse(content, parseOptions);

    // Walk the AST and collect widget IDs
    function collectWidgetIds(ast: SingleASTNode | Array<SingleASTNode>): void {
        if (Array.isArray(ast)) {
            ast.forEach(collectWidgetIds);
        } else if (ast?.type === "widget") {
            // Only add if not already seen (deduplication with O(1) lookup)
            if (!seenIds.has(ast.id)) {
                seenIds.add(ast.id);
                widgetIds.push(ast.id);
            }
        } else if (ast?.content) {
            collectWidgetIds(ast.content);
        }
    }

    collectWidgetIds(parsedMarkdown);
    return widgetIds;
}
