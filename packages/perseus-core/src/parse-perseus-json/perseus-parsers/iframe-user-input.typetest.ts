import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseIFrameUserInput} from "./iframe-user-input";
import type {PerseusIFrameUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseIFrameUserInput>;

summon<Parsed>() satisfies PerseusIFrameUserInput;
summon<PerseusIFrameUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusIFrameUserInput>;
