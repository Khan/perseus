export function srFormatNumber(a: number, locale: string): string {
    // adding zero here converts negative zero to positive zero.
    return (0 + a).toLocaleString(locale, {
        maximumFractionDigits: 3,
        useGrouping: false, // no thousands separators
    })
}
