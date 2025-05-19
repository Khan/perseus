import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseInputNumberWidget} from "./input-number-widget";
import type {InputNumberWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseInputNumberWidget>;

summon<Parsed>() satisfies InputNumberWidget;
summon<InputNumberWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<InputNumberWidget>;
