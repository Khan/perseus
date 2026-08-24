import tableWidgetLogic from "../../widgets/table";

import type {PerseusTableWidgetOptions} from "../../data-schema";

export function generateTableOptions(
    options?: Partial<PerseusTableWidgetOptions>,
): PerseusTableWidgetOptions {
    const merged = {
        ...tableWidgetLogic.defaultWidgetOptions,
        ...options,
    };

    // `rows`, `columns` and `headers` all describe the shape of `answers`, so
    // we derive them. That way a caller who overrides only `answers` still
    // gets a coherent widget.
    const columns = merged.answers[0]?.length ?? merged.columns;

    return {
        ...merged,
        rows: options?.rows ?? merged.answers.length,
        columns: options?.columns ?? columns,
        headers: options?.headers ?? new Array(columns).fill(""),
    };
}
