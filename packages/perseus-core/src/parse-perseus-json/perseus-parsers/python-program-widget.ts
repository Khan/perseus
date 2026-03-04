import {constant, object, string, number} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parsePythonProgramWidget = parseWidget(
    constant("python-program"),
    object({
        programID: string,
        height: number,
    }),
);
