import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseGrapherUserInput} from "./grapher-user-input";
import type {PerseusGrapherUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseGrapherUserInput>;

summon<Parsed>() satisfies PerseusGrapherUserInput;
summon<PerseusGrapherUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusGrapherUserInput>;
