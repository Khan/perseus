import {any} from "../general-purpose-parsers/any";
import {array} from "../general-purpose-parsers/array";
import {boolean} from "../general-purpose-parsers/boolean";
import {constant} from "../general-purpose-parsers/constant";
import {number} from "../general-purpose-parsers/number";
import {object} from "../general-purpose-parsers/object";
import {string} from "../general-purpose-parsers/string";

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
