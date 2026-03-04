import {
    constant,
    strictObject,
    string,
    number,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parsePythonProgramWidget = parseWidget(
    constant("python-program"),
    strictObject({
        programID: string,
        height: number,
    }),
);
