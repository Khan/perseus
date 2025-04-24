import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseLabelImageWidget} from "./label-image-widget";
import type {LabelImageWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseLabelImageWidget>;

summon<Parsed>() satisfies LabelImageWidget;
summon<LabelImageWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<LabelImageWidget>;
