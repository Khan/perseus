import {array, looseObject, string} from "../general-purpose-parsers";

export const parseOrdererUserInput = looseObject({
    current: array(string),
});
