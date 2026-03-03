import {constant, looseObject, string, number} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parsePythonProgramWidget = parseWidget(
    constant("python-program"),
    looseObject({
        programID: string,
        height: number,
    }),
);
