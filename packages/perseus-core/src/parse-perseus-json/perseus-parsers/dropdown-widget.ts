import {
    array,
    boolean,
    constant,
    strictObject,
    string,
    optional,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

export const parseDropdownWidget = parseWidget(
    constant("dropdown"),
    strictObject({
        placeholder: defaulted(string, () => ""),
        ariaLabel: optional(string),
        visibleLabel: optional(string),
        static: defaulted(boolean, () => false),
        choices: array(
            strictObject({
                content: string,
                correct: defaulted(boolean, () => false),
            }),
        ),
    }),
);
