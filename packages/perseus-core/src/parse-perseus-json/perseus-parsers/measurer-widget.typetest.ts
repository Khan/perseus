import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseMeasurerWidget} from "./measurer-widget";
import type {MeasurerWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseMeasurerWidget>;

summon<Parsed>() satisfies MeasurerWidget;
summon<MeasurerWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<MeasurerWidget>;
