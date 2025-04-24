import {summon} from "../general-purpose-parsers/test-helpers";

import type {parsePerseusAnswerArea} from "./perseus-answer-area";
import type {PerseusAnswerArea} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parsePerseusAnswerArea>;

summon<Parsed>() satisfies PerseusAnswerArea;
summon<PerseusAnswerArea>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusAnswerArea>;
