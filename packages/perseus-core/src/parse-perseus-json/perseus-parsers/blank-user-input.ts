import {defaulted, nullable, object, string} from "../general-purpose-parsers";

export const parseBlankUserInput = object({
    selected: defaulted(nullable(string), () => null),
});
