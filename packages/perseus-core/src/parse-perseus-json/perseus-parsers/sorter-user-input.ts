import {array, boolean, looseObject, string} from "../general-purpose-parsers";

export const parseSorterUserInput = looseObject({
    options: array(string),
    changed: boolean,
});
