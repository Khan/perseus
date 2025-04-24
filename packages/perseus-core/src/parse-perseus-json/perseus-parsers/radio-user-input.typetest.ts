import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseRadioUserInput} from "./radio-user-input";
import type {PerseusRadioUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseRadioUserInput>;

summon<Parsed>() satisfies PerseusRadioUserInput;
summon<PerseusRadioUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusRadioUserInput>;
