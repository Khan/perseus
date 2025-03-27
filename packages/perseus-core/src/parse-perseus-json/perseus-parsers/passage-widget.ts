import type {PassageWidget} from "../../data-schema";
import {boolean, constant, object, string} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";
import type {Parser} from "../parser-types";
import {parseWidget} from "./widget";

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
