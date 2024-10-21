import {
    array,
    boolean,
    constant,
    object,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {DropdownWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";
import { isFailure } from "../result";

export const parseDropdownWidget: Parser<DropdownWidget> = parseWidget(
    constant("dropdown"),
    object({
        placeholder: defaulted(string, () => ""),
        static: boolean,
        choices: array(
            object({
                content: string,
                correct: boolean,
            }),
        ),
    }),
);

// TODO: move to general-purpose-parsers
function defaulted<T>(parser: Parser<T>, fallback: () => T): Parser<T> {
    return (rawValue, ctx) => {
        if (rawValue === undefined) {
            return ctx.success(fallback())
        }
        return parser(rawValue, ctx);
    }
}
