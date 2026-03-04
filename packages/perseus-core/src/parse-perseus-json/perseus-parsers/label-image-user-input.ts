import {array, strictObject, optional, string} from "../general-purpose-parsers";

export const parseLabelImageUserInput = strictObject({
    markers: array(
        strictObject({
            selected: optional(array(string)),
            label: string,
        }),
    ),
});
