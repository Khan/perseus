// A parsed markdown AST node. This matches `SingleASTNode` from
// @khanacademy/simple-markdown, which perseus-core doesn't depend on.
type MarkdownNode = {
    type: string;
    [key: string]: any;
};

// A table cell is the array of inline nodes parsed from its text.
type TableCell = ReadonlyArray<MarkdownNode>;

function isWhitespaceOnlyTextNode(node: MarkdownNode): boolean {
    return node?.type === "text" && node.content.trim() === "";
}

export function isEmptyTableCell(cell: TableCell): boolean {
    return cell.every(isWhitespaceOnlyTextNode);
}

// A cell is bold when its entire content is `**...**`. Partially bold cells
// (e.g. `**3** cats`) don't count.
export function isBoldTableCell(cell: TableCell): boolean {
    const content = cell.filter((node) => !isWhitespaceOnlyTextNode(node));
    return content.length === 1 && content[0].type === "strong";
}

/**
 * Markdown has no syntax for row headers, so we infer them from two common
 * authoring patterns:
 *
 * 1. The first column header is empty.
 * Or
 * 2. Every body cell in the first column is bold.
 *
 * Tables with a single column are never treated as having row headers, as
 * there would be no data cells for the headers to describe.
 */
export function tableHasRowHeaders(node: MarkdownNode): boolean {
    if (node.header.length < 2) {
        return false;
    }

    if (isEmptyTableCell(node.header[0])) {
        return true;
    }

    return (
        node.cells.length > 0 &&
        node.cells.every(
            (row: TableCell[]) => row[0] != null && isBoldTableCell(row[0]),
        )
    );
}
