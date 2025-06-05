import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseGroupUserInput} from "./group-user-input";
import type {PerseusGroupUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseGroupUserInput>;

summon<Parsed>() satisfies PerseusGroupUserInput;
summon<PerseusGroupUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusGroupUserInput>;
