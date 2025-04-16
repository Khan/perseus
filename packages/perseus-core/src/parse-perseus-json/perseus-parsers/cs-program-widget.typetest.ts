import { CSProgramWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseCSProgramWidget } from "./cs-program-widget";

type Parsed = ParsedValue<typeof parseCSProgramWidget>;

summon<Parsed>() satisfies CSProgramWidget;
summon<CSProgramWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<CSProgramWidget>;
