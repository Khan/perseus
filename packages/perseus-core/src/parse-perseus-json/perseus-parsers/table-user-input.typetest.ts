import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseTableUserInput} from "./table-user-input";
import type {PerseusTableUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseTableUserInput>;

summon<Parsed>() satisfies PerseusTableUserInput;
summon<PerseusTableUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusTableUserInput>;
