import {constant, object, string, number} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parsePythonProgramWidget = parseWidget(
    constant("python-program"),
    object({
        programID: string,
        height: number,
    }),
    // The embedded program is never scored, so `static` has no answer to
    // reveal. (Unlike `cs-program`, this widget reports no user input back.)
    {supportsStatic: false},
);
