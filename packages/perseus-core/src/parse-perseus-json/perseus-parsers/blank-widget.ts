import {
    constant,
    optional,
    enumeration,
    defaultedNonEmptyString,
    object,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

function generateBlankId(): string {
    return `blank-${0}`;
}

export const parseBlankWidget = parseWidget(
    constant("blank"),
    object({
        id: defaultedNonEmptyString(() => generateBlankId()),
        displayType: defaulted(
            enumeration("normal", "superscript", "subscript"),
            () => "normal" as const,
        ),
        correct: optional(string),
    }),
);
