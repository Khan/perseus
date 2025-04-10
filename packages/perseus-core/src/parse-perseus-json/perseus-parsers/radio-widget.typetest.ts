import type { ParsedValue } from "../parser-types";
import type { parseRadioWidget } from "./radio-widget";
import type {RadioWidget} from "../../data-schema";
import { summon } from "../general-purpose-parsers/test-helpers";

type Parsed = ParsedValue<typeof parseRadioWidget>
summon<Parsed>() satisfies RadioWidget
