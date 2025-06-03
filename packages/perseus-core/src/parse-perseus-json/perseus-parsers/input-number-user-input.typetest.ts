import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseInputNumberUserInput} from "./input-number-user-input";
import type {PerseusInputNumberUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseInputNumberUserInput>;

summon<Parsed>() satisfies PerseusInputNumberUserInput;
summon<PerseusInputNumberUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusInputNumberUserInput>;
