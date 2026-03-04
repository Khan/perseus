import {strictObject, string} from "../general-purpose-parsers";

export const parseNumericInputUserInput = strictObject({
    currentValue: string,
});
