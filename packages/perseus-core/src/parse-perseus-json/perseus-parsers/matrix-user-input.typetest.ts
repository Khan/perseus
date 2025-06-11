import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseMatrixUserInput} from "./matrix-user-input";
import type {PerseusMatrixUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseMatrixUserInput>;

summon<Parsed>() satisfies PerseusMatrixUserInput;
summon<PerseusMatrixUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusMatrixUserInput>;
