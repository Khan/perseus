import {
    any,
    array,
    boolean,
    constant,
    number,
    object,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {CSProgramWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseCSProgramWidget: Parser<CSProgramWidget> = parseWidget(
    constant("cs-program"),
    object({
        programID: string,
        programType: any,
        settings: array(object({name: string, value: string})),
        showEditor: boolean,
        showButtons: boolean,
        width: number,
        height: number,
        static: boolean,
    }),
);
