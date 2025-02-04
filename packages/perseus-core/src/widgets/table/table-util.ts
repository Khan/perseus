import type {PerseusTableWidgetOptions} from "@khanacademy/perseus-core";

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
