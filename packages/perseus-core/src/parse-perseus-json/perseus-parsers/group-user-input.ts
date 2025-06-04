import {parseUserInputMap} from "./user-input-map";

import type {PerseusGroupUserInput} from "../../validation.types";
import type {Parser} from "../parser-types";

export const parseGroupUserInput: Parser<PerseusGroupUserInput> =
    (rawVal, ctx) => parseUserInputMap(rawVal, ctx);
