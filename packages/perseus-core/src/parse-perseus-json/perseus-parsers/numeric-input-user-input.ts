import {object, string} from "../general-purpose-parsers";

export const parseNumericInputUserInput = object({
    currentValue: string,
});
