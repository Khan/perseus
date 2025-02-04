import type {PerseusTableWidgetOptions} from "@khanacademy/perseus-core";

type TableWidgetPublicOptions = Pick<
    PerseusTableWidgetOptions,
    "headers" | "rows" | "columns"
>;

export default function getTablePublicWidgetOptions(
    options: PerseusTableWidgetOptions,
): TableWidgetPublicOptions {
    const {answers: _, ...publicOptions} = options;
    return publicOptions;
}
