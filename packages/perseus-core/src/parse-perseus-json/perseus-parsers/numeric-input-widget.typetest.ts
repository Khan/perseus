import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseNumericInputWidget} from "./numeric-input-widget";
import type {NumericInputWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseNumericInputWidget>;

summon<Parsed>() satisfies NumericInputWidget;
summon<NumericInputWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<NumericInputWidget>;
