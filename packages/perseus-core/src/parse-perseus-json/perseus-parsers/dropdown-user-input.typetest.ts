import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseDropdownUserInput} from "./dropdown-user-input";
import type {PerseusDropdownUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseDropdownUserInput>;

summon<Parsed>() satisfies PerseusDropdownUserInput;
summon<PerseusDropdownUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusDropdownUserInput>;
