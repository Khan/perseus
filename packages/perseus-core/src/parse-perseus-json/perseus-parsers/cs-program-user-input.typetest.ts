import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseCSProgramUserInput} from "./cs-program-user-input";
import type {PerseusCSProgramUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseCSProgramUserInput>;

summon<Parsed>() satisfies PerseusCSProgramUserInput;
summon<PerseusCSProgramUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusCSProgramUserInput>;
