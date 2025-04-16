import { CategorizerWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseCategorizerWidget } from "./categorizer-widget";

type Parsed = ParsedValue<typeof parseCategorizerWidget>;

summon<Parsed>() satisfies CategorizerWidget;
summon<CategorizerWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<CategorizerWidget>;
