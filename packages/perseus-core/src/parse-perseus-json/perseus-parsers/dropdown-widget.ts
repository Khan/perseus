import {
    array,
    boolean,
    constant,
    looseObject,
    string,
    optional,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

export const parseDropdownWidget = parseWidget(
    constant("dropdown"),
    looseObject({
        placeholder: defaulted(string, () => ""),
        ariaLabel: optional(string),
        visibleLabel: optional(string),
        static: defaulted(boolean, () => false),
        choices: array(
            looseObject({
                content: string,
                correct: defaulted(boolean, () => false),
            }),
        ),
    }),
);
