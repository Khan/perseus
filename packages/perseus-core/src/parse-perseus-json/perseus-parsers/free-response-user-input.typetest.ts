import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseFreeResponseUserInput} from "./free-response-user-input";
import type {PerseusFreeResponseUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseFreeResponseUserInput>;

summon<Parsed>() satisfies PerseusFreeResponseUserInput;
summon<PerseusFreeResponseUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusFreeResponseUserInput>;
