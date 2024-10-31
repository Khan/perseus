const numberFormat = new Intl.NumberFormat(
    undefined, // use default locale
    {
        maximumFractionDigits: 3,
        useGrouping: false, // no thousands separators
    },
);

export function srFormatNumber(a: number): string {
    // adding zero here converts negative zero to positive zero.
    return numberFormat.format(0 + a);
}
