import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseInteractiveGraphUserInput} from "./interactive-graph-user-input";
import type {PerseusInteractiveGraphUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseInteractiveGraphUserInput>;

summon<Parsed>() satisfies PerseusInteractiveGraphUserInput;
summon<PerseusInteractiveGraphUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusInteractiveGraphUserInput>;
