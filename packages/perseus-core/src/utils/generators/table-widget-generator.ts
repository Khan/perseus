import tableWidgetLogic from "../../widgets/table";

import type {PerseusTableWidgetOptions} from "../../data-schema";

/**
 * `rows`, `columns` and `headers` all describe the shape of `answers`, so
 * we derive them. That way a caller who overrides only `answers` still
 * gets a coherent widget.
 *
 * Each of the three resolves in the same order: the caller's value, then the
 * shape of `answers`, then the widget default.
 */
export function generateTableOptions(
    options?: Partial<PerseusTableWidgetOptions>,
): PerseusTableWidgetOptions {
    const merged = {
        ...tableWidgetLogic.defaultWidgetOptions,
        ...options,
    };

    const columns =
        options?.columns ??
        merged.answers[0]?.length ??
        tableWidgetLogic.defaultWidgetOptions.columns;

    return {
        ...merged,
        rows: options?.rows ?? merged.answers.length,
        columns,
        headers: options?.headers ?? new Array(columns).fill(""),
    };
}
