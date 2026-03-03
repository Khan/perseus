import {looseObject, string} from "../general-purpose-parsers";

export const parseNumericInputUserInput = looseObject({
    currentValue: string,
});
