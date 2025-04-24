import {
    array,
    boolean,
    constant,
    object,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parseMatcherWidget = parseWidget(
    constant("matcher"),
    object({
        labels: array(string),
        left: array(string),
        right: array(string),
        orderMatters: boolean,
        padding: boolean,
    }),
);
