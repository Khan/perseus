import {
    array,
    boolean,
    constant,
    object,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {DropdownWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseDropdownWidget: Parser<DropdownWidget> = parseWidget(
    constant("dropdown"),
    object({
        placeholder: string,
        static: boolean,
        choices: array(
            object({
                content: string,
                correct: boolean,
            }),
        ),
    }),
);
