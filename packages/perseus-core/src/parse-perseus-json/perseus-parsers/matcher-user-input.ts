import {looseObject, array, string} from "../general-purpose-parsers";

export const parseMatcherUserInput = looseObject({
    left: array(string),
    right: array(string),
});
