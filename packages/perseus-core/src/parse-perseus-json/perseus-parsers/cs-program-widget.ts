import {
    any,
    array,
    boolean,
    constant,
    number,
    strictObject,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

export const parseCSProgramWidget = parseWidget(
    constant("cs-program"),
    strictObject({
        programID: string,
        programType: any,
        settings: array(strictObject({name: string, value: string})),
        showEditor: boolean,
        showButtons: boolean,
        height: number,
        static: defaulted(boolean, () => false),
    }),
);
