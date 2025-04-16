import { PerseusAnswerArea } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parsePerseusAnswerArea } from "./perseus-answer-area";

type Parsed = ParsedValue<typeof parsePerseusAnswerArea>;

summon<Parsed>() satisfies PerseusAnswerArea;
summon<PerseusAnswerArea>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<PerseusAnswerArea>;
