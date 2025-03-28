import {
    array,
    boolean,
    constant,
    number,
    object,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {FreeResponseWidget} from "../../data-schema";
import type {Parser} from "../parser-types";

export const parseFreeResponseWidget: Parser<FreeResponseWidget> = parseWidget(
    constant("free-response"),
    object({
        allowUnlimitedCharacters: boolean,
        characterLimit: number,
        placeholder: string,
        question: string,
        scoringCriteria: array(
            object({
                text: string,
            }),
        ),
    }),
);
