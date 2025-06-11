import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseLabelImageUserInput} from "./label-image-user-input";
import type {PerseusLabelImageUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseLabelImageUserInput>;

summon<Parsed>() satisfies PerseusLabelImageUserInput;
summon<PerseusLabelImageUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusLabelImageUserInput>;
