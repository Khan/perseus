import {array, object, optional, string} from "../general-purpose-parsers";

export const parseBlankUserInput = object({
    markers: array(
        object({
            selected: optional(string),
        }),
    ),
});
