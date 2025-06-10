import {array, object, optional, string} from "../general-purpose-parsers";

export const parseLabelImageUserInput = object({
    markers: array(
        object({
            selected: optional(array(string)),
            label: string,
        }),
    ),
});
