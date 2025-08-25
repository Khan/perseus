import PerseusMarkdown from "../perseus-markdown";

/**
 * Extracts widget IDs from Perseus markdown content in the order they appear.
 * Handles deduplication by only including the first occurrence of each widget ID.
 */
export function extractWidgetIds(
    content: string,
    options?: { inline?: boolean; isJipt?: boolean }
): ReadonlyArray<string> {
    const widgetIds: string[] = [];

    // Parse the markdown content
    const parsedMarkdown = options?.inline
        ? PerseusMarkdown.parseInline(content, {
              isJipt: options?.isJipt ?? false,
          })
        : PerseusMarkdown.parse(content, {
              isJipt: options?.isJipt ?? false,
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