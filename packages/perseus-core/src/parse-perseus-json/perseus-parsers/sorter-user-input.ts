import {array, boolean, strictObject, string} from "../general-purpose-parsers";

export const parseSorterUserInput = strictObject({
    options: array(string),
    changed: boolean,
});
