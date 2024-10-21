import {
    array,
    boolean,
    constant,
    defaulted,
    object,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {DropdownWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseDropdownWidget: Parser<DropdownWidget> = parseWidget(
    constant("dropdown"),
    object({
        placeholder: defaulted(string, () => ""),
        static: defaulted(boolean, () => false),
        choices: array(
            object({
                content: string,
                correct: boolean,
            }),
        ),
    }),
);
