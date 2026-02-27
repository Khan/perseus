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
            const parts = new Intl.NumberFormat(locale).formatToParts(1.1);
            const decimalPart = parts.find((part) => part.type === "decimal");
            return decimalPart?.value ?? ".";
    }
};

export default getDecimalSeparator;
