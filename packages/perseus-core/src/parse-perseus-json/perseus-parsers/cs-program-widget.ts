import {
    any,
    array,
    boolean,
    constant,
    number,
    looseObject,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

export const parseCSProgramWidget = parseWidget(
    constant("cs-program"),
    looseObject({
        programID: string,
        programType: any,
        settings: array(looseObject({name: string, value: string})),
        showEditor: boolean,
        showButtons: boolean,
        height: number,
        static: defaulted(boolean, () => false),
    }),
);
