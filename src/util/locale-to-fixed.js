/* globals icu:false */

// Rounds num to X places, and uses the proper decimal seperator.
// But does *not* insert thousands separators.
module.exports = function localeToFixed(num, places) {
    const localeDecimalSeperator =
        icu.getDecimalFormatSymbols().decimal_separator;
    let localeFixed = num.toFixed(places).replace(".", localeDecimalSeperator);
    if (localeFixed === "-0") {
        localeFixed = "0";
    }
    return localeFixed;
};
