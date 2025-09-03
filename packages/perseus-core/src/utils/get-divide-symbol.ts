/**
 *  Get the character used for separating decimals.
 */
const getDivideSymbol = (locale: string): string => {
    switch (locale) {
        case "uk":
            return ":";

        default:
            return "/";
    }
};

export default getDivideSymbol;
