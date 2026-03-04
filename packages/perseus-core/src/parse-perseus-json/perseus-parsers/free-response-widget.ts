import {
    array,
    boolean,
    constant,
    number,
    strictObject,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {FreeResponseWidget} from "../../data-schema";
import type {Parser} from "../parser-types";

export const parseFreeResponseWidget: Parser<FreeResponseWidget> = parseWidget(
    constant("free-response"),
    strictObject({
        allowUnlimitedCharacters: boolean,
        characterLimit: number,
        placeholder: string,
        question: string,
        scoringCriteria: array(
            strictObject({
                text: string,
            }),
        ),
    }),
);
