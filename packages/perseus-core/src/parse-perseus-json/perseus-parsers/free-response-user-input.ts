import {strictObject, string} from "../general-purpose-parsers";

export const parseFreeResponseUserInput = strictObject({
    currentValue: string,
});
