import {
    array,
    boolean,
    constant,
    object,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {MatcherWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseMatcherWidget: Parser<MatcherWidget> = parseWidget(
    constant("matcher"),
    object({
        labels: array(string),
        left: array(string),
        right: array(string),
        orderMatters: boolean,
        padding: boolean,
    }),
);
