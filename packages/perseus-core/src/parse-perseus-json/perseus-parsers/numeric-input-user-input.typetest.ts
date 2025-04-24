import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseNumericInputUserInput} from "./numeric-input-user-input";
import type {PerseusNumericInputUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseNumericInputUserInput>;

summon<Parsed>() satisfies PerseusNumericInputUserInput;
summon<PerseusNumericInputUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusNumericInputUserInput>;
