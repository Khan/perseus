const localesThatUseColon = [
    "az",
    "bg",
    "cs",
    "da",
    "de",
    "hu",
    "hy",
    "id",
    "it",
    "ky",
    "lt",
    "lv",
    "nb",
    "nl",
    "pl",
    "pt-pt",
    "ro",
    "sv",
    "uk",
    "vi",
    "ro",
    "ru",
];

/**
 *  Get the character used for dividing numbers depending on the locale.
 */
export const getDivideSymbol = (locale: string): string => {
    // If the locale uses a colon for division, return a colon
    if (localesThatUseColon.includes(locale)) {
        return ":";
    }

    // Default to using a forward slash
    return "/";
};

/**
 * Get the TeX command used for dividing numbers depending on the locale.
 */
export const getDivideSymbolForTex = (locale: string): string => {
    const divideSymbol = getDivideSymbol(locale);

    // If the locale uses the forward slash, return the TeX command for ÷
    return divideSymbol === "/" ? "\\div" : divideSymbol;
};
