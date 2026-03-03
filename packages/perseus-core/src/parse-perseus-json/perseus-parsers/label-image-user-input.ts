import {array, looseObject, optional, string} from "../general-purpose-parsers";

export const parseLabelImageUserInput = looseObject({
    markers: array(
        looseObject({
            selected: optional(array(string)),
            label: string,
        }),
    ),
});
