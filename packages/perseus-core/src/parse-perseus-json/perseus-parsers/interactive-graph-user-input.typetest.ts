import { PerseusInteractiveGraphUserInput } from "../../validation.types";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseInteractiveGraphUserInput } from "./interactive-graph-user-input";

type Parsed = ParsedValue<typeof parseInteractiveGraphUserInput>;

summon<Parsed>() satisfies PerseusInteractiveGraphUserInput;
summon<PerseusInteractiveGraphUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<PerseusInteractiveGraphUserInput>;
