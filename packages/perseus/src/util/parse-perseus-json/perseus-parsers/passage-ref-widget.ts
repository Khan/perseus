import {
    constant,
    object,
    string,
    number,
    optional,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {Parser} from "../parser-types";
import type {PassageRefWidget} from "@khanacademy/perseus-core";

export const parsePassageRefWidget: Parser<PassageRefWidget> = parseWidget(
    constant("passage-ref"),
    object({
        passageNumber: number,
        referenceNumber: number,
        summaryText: optional(string),
    }),
);
