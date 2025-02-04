export function srFormatNumber(
    a: number,
    locale: string,
    maximumFractionDigits?: number,
): string {
    // adding zero here converts negative zero to positive zero.
    return (0 + a).toLocaleString(locale, {
        maximumFractionDigits: maximumFractionDigits ?? 3,
        useGrouping: false, // no thousands separators
    });
}
