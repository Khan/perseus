import {parseWidget} from "./widget";
import {constant} from "../general-purpose-parsers/constant";
import {object} from "../general-purpose-parsers/object";
import {CSProgramWidget, PerseusCSProgramSetting} from "../../../perseus-types";
import {Parser} from "../parser-types";
import {any} from "../general-purpose-parsers/any";
import {string} from "../general-purpose-parsers/string";
import {array} from "../general-purpose-parsers/array";
import {boolean} from "../general-purpose-parsers/boolean";
import {number} from "../general-purpose-parsers/number";

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
)
