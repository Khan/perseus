import {strictObject, string} from "../general-purpose-parsers";

export const parseInputNumberUserInput = strictObject({
    currentValue: string,
});
