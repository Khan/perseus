import type {PerseusTableWidgetOptions} from "../../data-schema";

export type TablePublicWidgetOptions = Pick<
    PerseusTableWidgetOptions,
    "headers" | "rows" | "columns"
>;

export function getTablePublicWidgetOptions(
    options: PerseusTableWidgetOptions,
): TablePublicWidgetOptions {
    const {answers, ...publicOptions} = options;
    return publicOptions;
}
