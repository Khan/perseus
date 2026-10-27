import {parseUserInputMap} from "./user-input-map";

import type {ParseContext} from "../parser-types";

// NOTE: Function wrapper is necessary to avoid circular import issues with user-input-map.ts
// The return type is inferred from parseUserInputMap.
export const parseFillInTheBlankUserInput = (
    rawVal: unknown,
    ctx: ParseContext,
) => parseUserInputMap(rawVal, ctx);
