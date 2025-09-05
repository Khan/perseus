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

const pairOfNumbers = pair(number, number);

export const parseImageWidget = parseWidget(
    constant("image"),
    object({
        title: optional(string),
        caption: optional(string),
        alt: optional(string),
        longDescription: optional(string),
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
