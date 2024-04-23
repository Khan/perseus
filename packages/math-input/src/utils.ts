export const DecimalSeparator = {
    COMMA: ",",
    PERIOD: ".",
} as const;

/**
 *  Get the character used for separating decimals.
 */
export const getDecimalSeparator = (locale: string): string => {
    let separator: string = DecimalSeparator.PERIOD;

    switch (locale) {
        // TODO(somewhatabstract): Remove this when Chrome supports the `ka`
        // locale properly.
        // https://github.com/formatjs/formatjs/issues/1526#issuecomment-559891201
        //
        // Supported locales in Chrome:
        // https://source.chromium.org/chromium/chromium/src/+/master:third_party/icu/scripts/chrome_ui_languages.list
        case "ka":
            separator = ",";
            break;

        default:
            const numberWithDecimalSeparator = 1.1;
            // TODO(FEI-3647): Update to use .formatToParts() once we no longer have to
            // support Safari 12.
            const match = new Intl.NumberFormat(locale)
                .format(numberWithDecimalSeparator)
                // 0x661 is ARABIC-INDIC DIGIT ONE
                // 0x6F1 is EXTENDED ARABIC-INDIC DIGIT ONE
                .match(/[^\d\u0661\u06F1]/);
            separator = match?.[0] ?? ".";
    }

    return separator === "," ? DecimalSeparator.COMMA : DecimalSeparator.PERIOD;
};

const CDOT_ONLY = [
    "az",
    "cs",
    "da",
    "de",
    "hu",
    "hy",
    "kk",
    "ky",
    "lt",
    "lv",
    "nb",
    "sk",
    "sr",
    "sv",
    "uz",
];
const TIMES_ONLY = ["fr", "tr", "pt-pt"];

/**
 * convertDotToTimes (aka `times`) is an option the content creators have to
 * use × (TIMES) rather than · (CDOT) for multiplication (for younger learners).
 * Some locales _only_ use one or the other for all multiplication regardless
 * of age.
 *
 * convertDotToTimesByLocale overrides convertDotToTimes for those locales.
 *
 * @param {boolean} convertDotToTimes - the setting set by content creators
 * @returns {boolean} - true to convert to × (TIMES), false to use · (CDOT)
 */
export function convertDotToTimesByLocale(
    locale: string,
    convertDotToTimes: boolean,
): boolean {
    if (CDOT_ONLY.includes(locale)) {
        return false;
    }

    if (TIMES_ONLY.includes(locale)) {
        return true;
    }

    return convertDotToTimes;
}

/**
 * Use this to avoid running code that should not run in Jest.
 **/
export const inJest =
    typeof process !== "undefined" && !!process?.env?.JEST_WORKER_ID;
// Explicitly checking for undefined because Cypress throws an error
