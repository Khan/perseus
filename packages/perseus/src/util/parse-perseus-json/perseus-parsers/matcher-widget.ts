import {
    array,
    boolean,
    constant,
    object,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {Parser} from "../parser-types";
import type {MatcherWidget} from "@khanacademy/perseus-core";

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
