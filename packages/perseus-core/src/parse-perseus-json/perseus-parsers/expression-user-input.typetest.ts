import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseExpressionUserInput} from "./expression-user-input";
import type {PerseusExpressionUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseExpressionUserInput>;

summon<Parsed>() satisfies PerseusExpressionUserInput;
summon<PerseusExpressionUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusExpressionUserInput>;
