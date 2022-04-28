// @flow

const {DecimalSeparators} = require("./consts");

// We expect `window.icu` to be exposed by the parent. When in doubt, we fall
// back to a period. We can only depend on a subset of what localeplanet
// provides, however -- the things in `icu-slim.js` (there's a copy in ../lib/
// for reference).
let decimalSeparator: string;
if (
    typeof window !== "undefined" &&
    window.icu &&
    window.icu.getDecimalFormatSymbols().decimal_separator === ","
) {
    decimalSeparator = DecimalSeparators.COMMA;
} else {
    decimalSeparator = DecimalSeparators.PERIOD;
}

module.exports = {
    decimalSeparator,
};
