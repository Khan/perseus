import {nullable, object, string} from "../general-purpose-parsers";

export const parseBlankUserInput = object({
    selected: nullable(string),
});
