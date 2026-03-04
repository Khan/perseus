import {array, object, string} from "../general-purpose-parsers";

export const parseOrdererUserInput = object({
    current: array(string),
});
