import {
    constant,
    object,
    string,
    number,
    optional,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {PassageRefWidget} from "../../data-schema";
import type {Parser} from "../parser-types";

export const parsePassageRefWidget: Parser<PassageRefWidget> = parseWidget(
    constant("passage-ref"),
    object({
        passageNumber: number,
        referenceNumber: number,
        summaryText: optional(string),
    }),
);
