import {constant, object, string, number} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {Parser} from "../parser-types";
import type {PythonProgramWidget} from "@khanacademy/perseus-core";

export const parsePythonProgramWidget: Parser<PythonProgramWidget> =
    parseWidget(
        constant("python-program"),
        object({
            programID: string,
            height: number,
        }),
    );
