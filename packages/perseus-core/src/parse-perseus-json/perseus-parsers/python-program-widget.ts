import type {PythonProgramWidget} from "../../data-schema";
import {constant, number, object, string} from "../general-purpose-parsers";
import type {Parser} from "../parser-types";
import {parseWidget} from "./widget";

export const parsePythonProgramWidget: Parser<PythonProgramWidget> =
    parseWidget(
        constant("python-program"),
        object({
            programID: string,
            height: number,
        }),
    );
