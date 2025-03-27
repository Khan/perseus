import type {PassageRefWidget} from "../../data-schema";
import {
    constant,
    number,
    object,
    optional,
    string,
} from "../general-purpose-parsers";
import type {Parser} from "../parser-types";
import {parseWidget} from "./widget";

export const parsePassageRefWidget: Parser<PassageRefWidget> = parseWidget(
    constant("passage-ref"),
    object({
        passageNumber: number,
        referenceNumber: number,
        summaryText: optional(string),
    }),
);
