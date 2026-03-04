import {
    array,
    boolean,
    constant,
    number,
    strictObject,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

export const parseLabelImageWidget = parseWidget(
    constant("label-image"),
    strictObject({
        choices: array(string),
        imageUrl: string,
        imageAlt: string,
        imageHeight: number,
        imageWidth: number,
        markers: array(
            strictObject({
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
