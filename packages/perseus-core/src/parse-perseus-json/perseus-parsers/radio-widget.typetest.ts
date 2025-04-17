import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseRadioWidget} from "./radio-widget";
import type {RadioWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseRadioWidget>;

summon<Parsed>() satisfies RadioWidget;
summon<RadioWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<RadioWidget>;
