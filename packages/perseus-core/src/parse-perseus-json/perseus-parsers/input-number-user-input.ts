import {looseObject, string} from "../general-purpose-parsers";

export const parseInputNumberUserInput = looseObject({
    currentValue: string,
});
