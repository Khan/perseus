import PerseusMarkdown from "../perseus-markdown";

import type Renderer from "../renderer";

/**
 * Extracts widget IDs from a Perseus Renderer in the order they appear in the content.
 * Handles deduplication by only including the first occurrence of each widget ID.
 */
export function extractWidgetIds(renderer: Renderer): ReadonlyArray<string> {
    const widgetIds: string[] = [];

    // Get content from the renderer's props
    const content = renderer.props.content;
    const inline = renderer.props.inline;

    // Parse the markdown content using the same logic as the renderer
    const parsedMarkdown = inline
        ? PerseusMarkdown.parseInline(content, {
              isJipt: renderer.translationIndex != null,
          })
        : PerseusMarkdown.parse(content, {
              isJipt: renderer.translationIndex != null,
          });

    // Walk the AST and collect widget IDs
    function collectWidgetIds(ast: any): void {
        if (Array.isArray(ast)) {
            ast.forEach(collectWidgetIds);
        } else if (ast?.type === "widget") {
            // Only add if not already present (deduplication)
            if (!widgetIds.includes(ast.id)) {
                widgetIds.push(ast.id);
            }
        } else if (ast?.content) {
            collectWidgetIds(ast.content);
        }
    }

    collectWidgetIds(parsedMarkdown);
    return widgetIds;
}
