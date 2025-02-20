import {
    array,
    boolean,
    constant,
    number,
    object,
    optional,
    string,
    union,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

import type {IFrameWidget} from "../../data-schema";
import type {Parser} from "../parser-types";

export const parseIframeWidget: Parser<IFrameWidget> = parseWidget(
    constant("iframe"),
    object({
        url: string,
        settings: optional(array(object({name: string, value: string}))),
        width: union(number).or(string).parser,
        height: union(number).or(string).parser,
        allowFullScreen: defaulted(boolean, () => false),
        allowTopNavigation: optional(boolean),
        static: defaulted(boolean, () => false),
    }),
);
