import {array} from "../general-purpose-parsers/array";
import {boolean} from "../general-purpose-parsers/boolean";
import {constant} from "../general-purpose-parsers/constant";
import {object} from "../general-purpose-parsers/object";
import {string} from "../general-purpose-parsers/string";

import {parseWidget} from "./widget";

import type {DropdownWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseDropdownWidget: Parser<DropdownWidget> = parseWidget(
    constant("dropdown"),
    object({
        placeholder: string,
        static: boolean,
        choices: array(
            object({
                content: string,
                correct: boolean,
            }),
        ),
    }),
);
