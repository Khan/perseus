import {
    array,
    boolean,
    constant,
    object,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

import type {ParsedValue} from "../parser-types";

const matcherOptions = object({
    labels: array(string),
    left: array(string),
    right: array(string),
    orderMatters: boolean,
    padding: boolean,
});

function getDefaultOptions(): ParsedValue<typeof matcherOptions> {
    // NOTE(benchristel): I copied these default values from the ones used
    // in the editor. See parse-perseus-json/README.md for why we want to
    // duplicate the defaults here.
    return {
        left: ["$x$", "$y$", "$z$"],
        right: ["$1$", "$2$", "$3$"],
        labels: ["test", "label"],
        orderMatters: false,
        padding: true,
    };
}

export const parseMatcherWidget = parseWidget(
    constant("matcher"),
    defaulted(matcherOptions, getDefaultOptions),
);
