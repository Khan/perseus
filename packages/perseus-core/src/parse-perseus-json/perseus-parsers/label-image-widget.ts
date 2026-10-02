import {
    array,
    boolean,
    constant,
    enumeration,
    number,
    object,
    optional,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

const parsePreferredPopoverDirection = enumeration(
    "NONE",
    "UP",
    "DOWN",
    "LEFT",
    "RIGHT",
);

export const parseLabelImageWidget = parseWidget(
    constant("label-image"),
    object({
        choices: array(string),
        imageUrl: string,
        imageAlt: string,
        imageHeight: number,
        imageWidth: number,
        markers: array(
            object({
                answers: defaulted(array(string), () => []),
                label: string,
                x: number,
                y: number,
            }),
        ),
        hideChoicesFromInstructions: boolean,
        multipleAnswers: boolean,
        preferredPopoverDirection: optional(parsePreferredPopoverDirection),
    }),
);
