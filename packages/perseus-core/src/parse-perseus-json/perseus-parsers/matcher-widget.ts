import type {MatcherWidget} from "../../data-schema";
import {
    array,
    boolean,
    constant,
    object,
    string,
} from "../general-purpose-parsers";
import type {Parser} from "../parser-types";
import {parseWidget} from "./widget";

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
