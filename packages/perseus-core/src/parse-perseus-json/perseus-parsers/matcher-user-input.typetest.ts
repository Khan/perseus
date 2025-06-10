import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseMatcherUserInput} from "./matcher-user-input";
import type {PerseusMatcherUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseMatcherUserInput>;

summon<Parsed>() satisfies PerseusMatcherUserInput;
summon<PerseusMatcherUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusMatcherUserInput>;
