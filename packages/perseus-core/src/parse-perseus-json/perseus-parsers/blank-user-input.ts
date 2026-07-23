import {object, optional, string} from "../general-purpose-parsers";

export const parseBlankUserInput = object({
    selected: optional(string),
});
