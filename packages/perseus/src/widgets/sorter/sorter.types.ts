import type {PerseusSorterWidgetOptions} from "../../perseus-types";

export type Rubric = PerseusSorterWidgetOptions;

export type UserInput = {
    options: PerseusSorterWidgetOptions["correct"];
    changed: boolean;
};
