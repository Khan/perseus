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
 *  Get the character used for dividing numbers.
 */
export const getDivideSymbol = (locale: string): string => {
    // If the locale uses a colon for division, return a colon
    if (localesThatUseColon.includes(locale)) {
        return ":";
    }

    // Default to using a forward slash
    return "/";
};

export const getDivideSymbolForTex = (locale: string): string => {
    const divideSymbol = getDivideSymbol(locale);

    // If the locale uses the forward slash, return the appropriate TeX command
    return divideSymbol === "/" ? "\\div" : divideSymbol;
};
