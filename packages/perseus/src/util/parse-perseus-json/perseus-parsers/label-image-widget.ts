import {
    array,
    boolean,
    constant,
    number,
    object,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

import type {Parser} from "../parser-types";
import type {LabelImageWidget} from "@khanacademy/perseus-core";

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
        static: defaulted(boolean, () => false),
    }),
);
