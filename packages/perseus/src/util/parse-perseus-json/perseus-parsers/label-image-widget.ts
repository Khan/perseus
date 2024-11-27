import {
    array,
    boolean,
    constant,
    number,
    object,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {LabelImageWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseLabelImageWidget: Parser<LabelImageWidget> = parseWidget(
    constant("label-image"),
    object({
        choices: array(string),
        imageUrl: string,
        imageAlt: string,
        imageHeight: number,
        imageWidth: number,
        markers: array(
            object({
                answers: array(string),
                label: string,
                x: number,
                y: number,
            }),
        ),
        hideChoicesFromInstructions: boolean,
        multipleAnswers: boolean,
        static: boolean,
    }),
);
