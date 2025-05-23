import {array, boolean, object, string} from "../general-purpose-parsers";

export const parseSorterUserInput = object({
    options: array(string),
    changed: boolean,
});
