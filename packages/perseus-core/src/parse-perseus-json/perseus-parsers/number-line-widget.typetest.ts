import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseNumberLineWidget} from "./number-line-widget";
import type {NumberLineWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseNumberLineWidget>;

summon<Parsed>() satisfies NumberLineWidget;
summon<NumberLineWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<NumberLineWidget>;
