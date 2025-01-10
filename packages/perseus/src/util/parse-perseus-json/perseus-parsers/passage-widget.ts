import {constant, object, string, boolean} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

import type {Parser} from "../parser-types";
import type {PassageWidget} from "@khanacademy/perseus-core";

export const parsePassageWidget: Parser<PassageWidget> = parseWidget(
    constant("passage"),
    object({
        footnotes: defaulted(string, () => ""),
        passageText: string,
        passageTitle: defaulted(string, () => ""),
        showLineNumbers: boolean,
        static: defaulted(boolean, () => false),
    }),
);
