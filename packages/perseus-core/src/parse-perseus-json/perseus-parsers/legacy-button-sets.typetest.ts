import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseLegacyButtonSet} from "./legacy-button-sets";
import type {LegacyButtonSets} from "../../data-schema";
import type {ParsedValue} from "../parser-types";

type ParsedButtonSet = ParsedValue<typeof parseLegacyButtonSet>;

// Test: LegacyButtonSets is mutually assignable with the result type of
// parseButtonSets(). This ensures that we keep the parser up to date with any
// new enum values added to the data schema.
summon<ParsedButtonSet>() satisfies LegacyButtonSets[number];
summon<LegacyButtonSets[number]>() satisfies ParsedButtonSet;
