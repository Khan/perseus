import {
    array,
    boolean,
    constant,
    defaulted,
    number,
    object,
    pair,
    string,
} from "../general-purpose-parsers";

import {parsePerseusImageBackground} from "./perseus-image-background";
import {parseWidget} from "./widget";

const pairOfNumbers = pair(number, number);

export const parseImageWidget = parseWidget(
    constant("image"),
    object({
        title: defaulted(string, () => ""),
        caption: defaulted(string, () => ""),
        alt: defaulted(string, () => ""),
        longDescription: defaulted(string, () => ""),
        decorative: defaulted(boolean, () => false),
        backgroundImage: parsePerseusImageBackground,
        scale: defaulted(number, () => 1),
        labels: defaulted(
            array(
                object({
                    content: string,
                    alignment: string,
                    coordinates: array(number),
                }),
            ),
            () => [],
        ),
        range: defaulted(
            pair(pairOfNumbers, pairOfNumbers),
            (): [[number, number], [number, number]] => [
                [0, 10],
                [0, 10],
            ],
        ),
        box: defaulted(pairOfNumbers, (): [number, number] => [400, 400]),
    }),
);
