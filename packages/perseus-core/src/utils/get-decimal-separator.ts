/**
 *  Get the character used for separating decimals.
 */
const getDecimalSeparator = (locale: string): string => {
    switch (locale) {
        // TODO(somewhatabstract): Remove this when Chrome supports the `ka`
        // locale properly.
        // https://github.com/formatjs/formatjs/issues/1526#issuecomment-559891201
        //
        // Supported locales in Chrome:
        // https://source.chromium.org/chromium/chromium/src/+/master:third_party/icu/scripts/chrome_ui_languages.list
        case "ka":
            return ",";

        default:
            const numberWithDecimalSeparator = 1.1;
            // TODO(FEI-3647): Update to use .formatToParts() since we no
            // longer have to support Safari 12.
            const match = new Intl.NumberFormat(locale)
                .format(numberWithDecimalSeparator)
                // 0x661 is ARABIC-INDIC DIGIT ONE
                // 0x6F1 is EXTENDED ARABIC-INDIC DIGIT ONE
                // 0x967 is DEVANAGARI DIGIT ONE
                // 0x9e7 is BENGALI/BANGLA DIGIT ONE
                .match(/[^\d\u0661\u06F1\u0967\u09e7]/);
            return match?.[0] ?? ".";
    }
};

export default getDecimalSeparator;
