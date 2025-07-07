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

export const parseDropdownWidget = parseWidget(
    constant("dropdown"),
    object({
        placeholder: defaulted(string, () => ""),
        ariaLabel: optional(string),
        visibleLabel: optional(string),
        static: defaulted(boolean, () => false),
        choices: array(
            object({
                content: string,
                correct: defaulted(boolean, () => false),
            }),
        ),
    }),
);
