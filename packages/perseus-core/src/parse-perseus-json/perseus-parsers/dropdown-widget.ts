import type {DropdownWidget} from "../../data-schema";
import {
    array,
    boolean,
    constant,
    object,
    optional,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";
import type {Parser} from "../parser-types";
import {parseWidget} from "./widget";

export const parseDropdownWidget: Parser<DropdownWidget> = parseWidget(
    constant("dropdown"),
    object({
        placeholder: defaulted(string, () => ""),
        ariaLabel: optional(string),
        visibleLabel: optional(string),
        static: defaulted(boolean, () => false),
        choices: array(
            object({
                content: string,
                correct: boolean,
            }),
        ),
    }),
);
