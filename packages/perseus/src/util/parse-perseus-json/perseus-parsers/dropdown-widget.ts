import {
    array,
    boolean,
    constant,
    object,
    string,
    optional,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

import type {DropdownWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseDropdownWidget: Parser<DropdownWidget> = parseWidget(
    constant("dropdown"),
    object({
        placeholder: defaulted(string, () => ""),
        ariaLabel: optional(string),
        visibleLabel: optional(string),
        static: defaulted(boolean, () => false),
        choices: array(
            object({
                content: string,
                correct: boolean,
            }),
        ),
    }),
);
