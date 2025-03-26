import type {PerseusTableWidgetOptions} from "../../data-schema";

type TablePublicWidgetOptions = Pick<
    PerseusTableWidgetOptions,
    "headers" | "rows" | "columns"
>;

export default function getTablePublicWidgetOptions(
    options: PerseusTableWidgetOptions,
): TablePublicWidgetOptions {
    const {answers: _, ...publicOptions} = options;
    return publicOptions;
}
