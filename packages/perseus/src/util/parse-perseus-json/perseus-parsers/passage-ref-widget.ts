import {constant, object, string, number} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {PassageRefWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parsePassageRefWidget: Parser<PassageRefWidget> = parseWidget(
    constant("passage-ref"),
    object({
        passageNumber: number,
        referenceNumber: number,
        summaryText: string,
    }),
);
