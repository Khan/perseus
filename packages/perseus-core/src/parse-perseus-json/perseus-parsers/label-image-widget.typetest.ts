import { LabelImageWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseLabelImageWidget } from "./label-image-widget";

type Parsed = ParsedValue<typeof parseLabelImageWidget>;

summon<Parsed>() satisfies LabelImageWidget;
summon<LabelImageWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<LabelImageWidget>;
