import {getDecimalSeparator} from "@khanacademy/wonder-blocks-i18n";

export const DecimalSeparator = {
    COMMA: ",",
    PERIOD: ".",
} as const;

// NOTES(kevinb):
// - In order to get the correct decimal separator for the current locale,
//   the locale must bet set using `setLocale(kaLocale)` which can be
//   imported from wonder-blocks-i18n.
// - Some languages/locales use different decimal separators than the ones
//   listed here.  Much of the Arab world uses U+066C.
export const decimalSeparator: string =
    getDecimalSeparator() === ","
        ? DecimalSeparator.COMMA
        : DecimalSeparator.PERIOD;
