import {parseUserInputMap} from "./user-input-map";

// TODO(LEMS-4224): don't import from outside of the parser
// eslint-disable-next-line import/no-restricted-paths
import type {PerseusFillInTheBlankUserInput} from "../../validation.types";
import type {Parser} from "../parser-types";

// NOTE: Function wrapper is necessary to avoid circular import issues with user-input-map.ts
export const parseFillInTheBlankUserInput: Parser<
    PerseusFillInTheBlankUserInput
> = (rawVal, ctx) => parseUserInputMap(rawVal, ctx);
