import {
    constant,
    optional,
    enumeration,
    object,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

export const parseBlankWidget = parseWidget(
    constant("blank"),
    object({
        displayType: defaulted(
            enumeration("normal", "superscript", "subscript"),
            () => "normal" as const,
        ),
        correct: optional(string),
    }),
);
