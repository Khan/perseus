import { ExplanationWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseExplanationWidget } from "./explanation-widget";

type Parsed = ParsedValue<typeof parseExplanationWidget>;

summon<Parsed>() satisfies ExplanationWidget;
summon<ExplanationWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<ExplanationWidget>;
