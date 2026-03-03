import {
    array,
    boolean,
    constant,
    number,
    looseObject,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

export const parseLabelImageWidget = parseWidget(
    constant("label-image"),
    looseObject({
        choices: array(string),
        imageUrl: string,
        imageAlt: string,
        imageHeight: number,
        imageWidth: number,
        markers: array(
            looseObject({
                answers: defaulted(array(string), () => []),
                label: string,
                x: number,
                y: number,
            }),
        ),
        hideChoicesFromInstructions: boolean,
        multipleAnswers: boolean,
        static: defaulted(boolean, () => false),
    }),
);
