import { MeasurerWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseMeasurerWidget } from "./measurer-widget";

type Parsed = ParsedValue<typeof parseMeasurerWidget>;

summon<Parsed>() satisfies MeasurerWidget;
summon<MeasurerWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<MeasurerWidget>;
