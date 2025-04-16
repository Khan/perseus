import { IFrameWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseIframeWidget } from "./iframe-widget";

type Parsed = ParsedValue<typeof parseIframeWidget>;

summon<Parsed>() satisfies IFrameWidget;
summon<IFrameWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<IFrameWidget>;
