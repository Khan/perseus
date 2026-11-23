import {isEmptyTableCell, tableHasRowHeaders} from "@khanacademy/perseus-core";

import {linterWarning} from "../lint";
import Rule from "../rule";

export function emptyColumnHeaderMessage(columns: number[]): string {
    const label =
        columns.length > 1
            ? `Columns ${columns.join(", ")} have`
            : `Column ${columns[0]} has`;
    return `Table has an empty column header:
${label} no header text. Screen reader users hear a column's header as they
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

        // An empty first column header is how authors make the first column
        // into row headers, so it's intentional. Its other headers still
        // need text.
        const firstColumnToCheck = tableHasRowHeaders(table) ? 1 : 0;

        const emptyColumns: number[] = [];
        for (let c = firstColumnToCheck; c < header.length; c++) {
            if (isEmptyTableCell(header[c])) {
                emptyColumns.push(c + 1);
            }
        }

        if (emptyColumns.length > 0) {
            return linterWarning(emptyColumnHeaderMessage(emptyColumns));
        }
    },
});
