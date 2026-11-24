import {isEmptyTableCell} from "@khanacademy/perseus-core";

import {linterWarning} from "../lint";
import Rule from "../rule";

import {TABLE_HELP_LINK} from "./table-help-link";

// A table cell is the array of inline nodes parsed from its text.
type MarkdownTableCell = ReadonlyArray<{type: string; [key: string]: unknown}>;

// The parts of a parsed markdown table node that this rule reads.
type MarkdownTableNode = {
    type: "table";
    header: ReadonlyArray<MarkdownTableCell>;
};

function isTableNode(node: {type: string}): node is MarkdownTableNode {
    return node.type === "table";
}

export function emptyColumnHeaderMessage(columns: number[]): string {
    const label =
        columns.length > 1
            ? `Columns ${columns.join(", ")} have`
            : `Column ${columns[0]} has`;
    return `${label} no header text. Screen reader users hear a column's header as they
move between its cells, so an empty header leaves them without context for
that data. Add a header, or leave every column header empty if this is a
layout table.`;
}

export default Rule.makeRule({
    name: "table-empty-column-header",
    selector: "table",
    helpLink: TABLE_HELP_LINK,
    lint: function (_state, _content, nodes) {
        const table = nodes[0];

        // We already know that the node will always be a table (due to the selector),
        // but we're adding this type guard to make TypeScript happy without casting.
        if (!isTableNode(table)) {
            return;
        }
        const header = table.header;

        // A table whose column headers are all empty isn't being used as a
        // data table (instead as a layout table), so we don't need to warn authors.
        if (header.every(isEmptyTableCell)) {
            return;
        }

        const emptyColumns: number[] = [];

        // The first column is allowed to be empty, so we start at 1 instead of 0.
        for (let c = 1; c < header.length; c++) {
            if (isEmptyTableCell(header[c])) {
                emptyColumns.push(c + 1);
            }
        }

        if (emptyColumns.length > 0) {
            return linterWarning(emptyColumnHeaderMessage(emptyColumns));
        }
    },
});
