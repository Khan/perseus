import {constant, object, string, number} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {PythonProgramWidget} from "../../data-schema";
import type {Parser} from "../parser-types";

export const parsePythonProgramWidget: Parser<PythonProgramWidget> =
    parseWidget(
        constant("python-program"),
        object({
            programID: string,
            height: number,
        }),
    );
