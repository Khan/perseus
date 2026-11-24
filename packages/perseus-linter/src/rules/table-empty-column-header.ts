import {isEmptyTableCell} from "@khanacademy/perseus-core";

import {linterWarning} from "../lint";
import Rule from "../rule";

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
    lint: function (_state, _content, nodes) {
        const table: any = nodes[0];
        const header: any[] = table.header;

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
