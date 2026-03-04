import {strictObject, array, string} from "../general-purpose-parsers";

export const parseMatcherUserInput = strictObject({
    left: array(string),
    right: array(string),
});
