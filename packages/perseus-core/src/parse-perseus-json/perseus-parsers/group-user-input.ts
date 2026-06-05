import {parseUserInputMap} from "./user-input-map";

// TODO(LEMS-4224): don't import from outside of the parser
// eslint-disable-next-line import/no-restricted-paths
import type {PerseusGroupUserInput} from "../../validation.types";
import type {Parser} from "../parser-types";

// NOTE(TB): Function wrapper is necessary to avoid circular import issues with user-input-map.ts
export const parseGroupUserInput: Parser<PerseusGroupUserInput> = (
    rawVal,
    ctx,
) => parseUserInputMap(rawVal, ctx);
