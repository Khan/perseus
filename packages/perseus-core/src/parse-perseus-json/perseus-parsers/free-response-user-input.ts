import {object, string} from "../general-purpose-parsers";

export const parseFreeResponseUserInput = object({
    currentValue: string,
});
