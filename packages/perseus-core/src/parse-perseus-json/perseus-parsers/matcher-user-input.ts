import {object, array, string} from "../general-purpose-parsers";

export const parseMatcherUserInput = object({
    left: array(string),
    right: array(string),
});
