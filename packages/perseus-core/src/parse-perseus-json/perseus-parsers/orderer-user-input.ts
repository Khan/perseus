import {array, strictObject, string} from "../general-purpose-parsers";

export const parseOrdererUserInput = strictObject({
    current: array(string),
});
