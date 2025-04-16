import { PerseusNumericInputUserInput } from "../../validation.types";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseNumericInputUserInput } from "./numeric-input-user-input";

type Parsed = ParsedValue<typeof parseNumericInputUserInput>;

summon<Parsed>() satisfies PerseusNumericInputUserInput;
summon<PerseusNumericInputUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<PerseusNumericInputUserInput>;
