import {record, string} from "../general-purpose-parsers";

import {parseBlankUserInput} from "./blank-user-input";

export const parseFillInTheBlankUserInput = record(string, parseBlankUserInput);
