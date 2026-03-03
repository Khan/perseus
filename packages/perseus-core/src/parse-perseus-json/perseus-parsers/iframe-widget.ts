import {
    array,
    boolean,
    constant,
    number,
    looseObject,
    optional,
    string,
    union,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

export const parseIframeWidget = parseWidget(
    constant("iframe"),
    looseObject({
        url: string,
        settings: optional(array(looseObject({name: string, value: string}))),
        width: union(number).or(string).parser,
        height: union(number).or(string).parser,
        allowFullScreen: defaulted(boolean, () => false),
        allowTopNavigation: optional(boolean),
        static: defaulted(boolean, () => false),
    }),
);
