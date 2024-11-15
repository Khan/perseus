import {
    array,
    boolean,
    constant,
    number,
    object,
    optional,
    pair,
    string,
} from "../general-purpose-parsers";

import {parsePerseusImageBackground} from "./perseus-image-background";
import {parseWidget} from "./widget";

import type {ImageWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

const pairOfNumbers = pair(number, number);

export const parseImageWidget: Parser<ImageWidget> = parseWidget(
    constant("image"),
    object({
        title: optional(string),
        caption: optional(string),
        alt: optional(string),
        backgroundImage: parsePerseusImageBackground,
        static: optional(boolean),
        labels: optional(
            array(
                object({
                    content: string,
                    alignment: string,
                    coordinates: array(number),
                }),
            ),
        ),
        range: optional(pair(pairOfNumbers, pairOfNumbers)),
        box: optional(pairOfNumbers),
    }),
);
