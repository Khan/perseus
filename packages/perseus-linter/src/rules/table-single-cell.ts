import {linterWarning} from "../lint";
import Rule from "../rule";

export const SINGLE_CELL_MESSAGE = `This table has only one cell:
Screen readers announce a table's structure (rows, columns and headers)
before its content, which adds noise when a table holds a single value. Please use
a paragraph or bold text instead.`;

// Returns true when a `table` node has one column and at most one body row,
// so it holds no more than a single value under its header.
function isSingleCellTable(table: any): boolean {
    return table.header.length === 1 && table.cells.length <= 1;
}

export default Rule.makeRule({
    name: "table-single-cell",
    // A titled table's `table` property is also a `table` node, so this
    // matches tables with and without a caption.
    selector: "table",
    lint: function (_state, _content, nodes) {
        if (isSingleCellTable(nodes[0])) {
            return linterWarning(SINGLE_CELL_MESSAGE);
        }
    },
});
