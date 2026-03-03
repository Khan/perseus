import {looseObject, string} from "../general-purpose-parsers";

export const parseFreeResponseUserInput = looseObject({
    currentValue: string,
});
