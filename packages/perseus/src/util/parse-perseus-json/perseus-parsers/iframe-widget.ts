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

import {parseWidget} from "./widget";

import type {IFrameWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseIframeWidget: Parser<IFrameWidget> = parseWidget(
    constant("iframe"),
    object({
        url: string,
        settings: array(object({name: string, value: string})),
        width: union(number).or(string).parser,
        height: union(number).or(string).parser,
        allowFullScreen: boolean,
        allowTopNavigation: optional(boolean),
        static: boolean,
    }),
);
