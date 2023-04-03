import Rule from "../rule";

export default Rule.makeRule({
    name: "table-missing-cells",
    severity: Rule.Severity.WARNING,
    selector: "table",
    lint: function (state, content, nodes, match) {
        const table = nodes[0];
        const headerLength = table.header.length;
        const rowLengths = table.cells.map((r) => r.length);
        for (let r = 0; r < rowLengths.length; r++) {
            if (rowLengths[r] !== headerLength) {
                return `Table rows don't match header:
The table header has ${headerLength} cells, but
Row ${r + 1} has ${rowLengths[r]} cells.`;
            }
        }
    },
}) as Rule;
