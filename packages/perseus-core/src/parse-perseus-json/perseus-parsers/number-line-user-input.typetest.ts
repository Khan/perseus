import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseNumberLineUserInput} from "./number-line-user-input";
import type {PerseusNumberLineUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseNumberLineUserInput>;

summon<Parsed>() satisfies PerseusNumberLineUserInput;
summon<PerseusNumberLineUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusNumberLineUserInput>;
