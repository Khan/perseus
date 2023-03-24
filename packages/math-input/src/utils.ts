import {getDecimalSeparator} from "@khanacademy/wonder-blocks-i18n";

import {DecimalSeparators} from './consts';

// NOTES(kevinb):
// - In order to get the correct decimal separator for the current locale,
//   the locale must bet set using `setLocale(kaLocale)` which can be
//   imported from wonder-blocks-i18n.
// - Some languages/locales use different decimal separators than the ones
//   listed here.  Much of the Arab world uses U+066C.
export const decimalSeparator: string =
    getDecimalSeparator() === ","
        ? DecimalSeparators.COMMA
        : DecimalSeparators.PERIOD;
