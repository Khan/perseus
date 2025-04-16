import { DefinitionWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseDefinitionWidget } from "./definition-widget";

type Parsed = ParsedValue<typeof parseDefinitionWidget>;

summon<Parsed>() satisfies DefinitionWidget;
summon<DefinitionWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<DefinitionWidget>;
