import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseSorterUserInput} from "./sorter-user-input";
import type {PerseusSorterUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseSorterUserInput>;

summon<Parsed>() satisfies PerseusSorterUserInput;
summon<PerseusSorterUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusSorterUserInput>;
