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

export const parseCSProgramWidget = parseWidget(
    constant("cs-program"),
    object({
        programID: string,
        programType: any,
        settings: array(object({name: string, value: string})),
        showEditor: boolean,
        showButtons: boolean,
        height: number,
    }),
    // CS Program is only used in articles and doesn't get scored, so
    // it doesn't ever need to be disabled.
    {supportsStatic: false},
);
