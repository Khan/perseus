import { MoleculeRendererWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseMoleculeRendererWidget } from "./molecule-renderer-widget";

type Parsed = ParsedValue<typeof parseMoleculeRendererWidget>;

summon<Parsed>() satisfies MoleculeRendererWidget;
summon<MoleculeRendererWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<MoleculeRendererWidget>;
