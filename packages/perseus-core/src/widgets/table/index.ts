import type {PerseusTableWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type TableDefaultWidgetOptions = Pick<
    PerseusTableWidgetOptions,
    "headers" | "rows" | "columns" | "answers"
>;

const defaultRows = 4;
const defaultColumns = 1;

// initialize a 2D array
// (defaultRows x defaultColumns) of empty strings
const answers = new Array(defaultRows)
    .fill(0)
    .map(() => new Array(defaultColumns).fill(""));

const defaultWidgetOptions: TableDefaultWidgetOptions = {
    headers: [""],
    rows: defaultRows,
    columns: defaultColumns,
    answers: answers,
};

const tableWidgetLogic: WidgetLogic = {
    name: "table",
    defaultWidgetOptions,
};

export default tableWidgetLogic;
