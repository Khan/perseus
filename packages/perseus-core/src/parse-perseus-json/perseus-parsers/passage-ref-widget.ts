import {
    constant,
    object,
    string,
    number,
    optional,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parsePassageRefWidget = parseWidget(
    constant("passage-ref"),
    object({
        passageNumber: number,
        referenceNumber: number,
        summaryText: optional(string),
    }),
);
