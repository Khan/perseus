import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseOrdererUserInput} from "./orderer-user-input";
import type {PerseusOrdererUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseOrdererUserInput>;

summon<Parsed>() satisfies PerseusOrdererUserInput;
summon<PerseusOrdererUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusOrdererUserInput>;
