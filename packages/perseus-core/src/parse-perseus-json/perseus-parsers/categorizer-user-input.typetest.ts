import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseCategorizerUserInput} from "./categorizer-user-input";
import type {PerseusCategorizerUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseCategorizerUserInput>;

summon<Parsed>() satisfies PerseusCategorizerUserInput;
summon<PerseusCategorizerUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusCategorizerUserInput>;
