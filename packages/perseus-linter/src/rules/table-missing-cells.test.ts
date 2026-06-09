import {expectWarning, expectPass} from "../__tests__/test-utils";

import tableMissingCellsRule from "./table-missing-cells";

describe("table-missing-cells", () => {
    it.each([
        "|col1|col2|col3|\n|----|----|----|\n|col1|col2|col3|\n|cell1|cell2|",
        "|col1|col2|col3|\n|----|----|----|\n|col1|col2|\n|cell1|cell2|",
        "|col1|col2|\n|----|----|\n|cell1|cell2|\n|cell1|cell2|cell3|",
        "|col1|\n|----|----|\n|col1|\n|cell1|cell2|",
        "|col1|col2|\n|----|----|\n|col1|\n|cell1|cell2|",
    ])("tableMissingCellsRule warns with: %s", (str: string) => {
        expectWarning(tableMissingCellsRule, str);
    });
    it.each([
        "|col1|col2|\n|----|----|\n|cell1|cell2|\n|cell1|cell2|",
        "|cell1|\n|----|\n|cell2|\n|cell3|",
    ])("tableMissingCellsRule passes with: %s", (str: string) => {
        expectPass(tableMissingCellsRule, str);
    });
});
