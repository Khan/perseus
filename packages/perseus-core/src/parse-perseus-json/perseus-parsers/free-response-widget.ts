import {
    array,
    boolean,
    constant,
    number,
    looseObject,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {FreeResponseWidget} from "../../data-schema";
import type {Parser} from "../parser-types";

export const parseFreeResponseWidget: Parser<FreeResponseWidget> = parseWidget(
    constant("free-response"),
    looseObject({
        allowUnlimitedCharacters: boolean,
        characterLimit: number,
        placeholder: string,
        question: string,
        scoringCriteria: array(
            looseObject({
                text: string,
            }),
        ),
    }),
);
