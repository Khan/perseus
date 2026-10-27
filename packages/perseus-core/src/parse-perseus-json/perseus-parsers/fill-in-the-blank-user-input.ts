import {parseUserInputMap} from "./user-input-map";

// NOTE: Function wrapper is necessary to avoid circular import issues with user-input-map.ts
export const parseFillInTheBlankUserInput: typeof parseUserInputMap = (
    rawVal,
    ctx,
) => parseUserInputMap(rawVal, ctx);
