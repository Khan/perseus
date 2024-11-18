/**
 * Filters the given table (modelled as a 2D array) to remove any rows that are
 * completely empty.
 *
 * @returns A new table with only non-empty rows.
 */
export const filterNonEmpty = function (
    table: ReadonlyArray<ReadonlyArray<string>>,
) {
    return table.filter(function (row) {
        // Return only rows that are non-empty.
        return row.some((cell) => cell);
    });
};
