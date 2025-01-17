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
