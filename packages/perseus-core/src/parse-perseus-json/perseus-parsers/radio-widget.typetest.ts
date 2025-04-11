import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseRadioWidget} from "./radio-widget";
import type {RadioWidget} from "../../data-schema";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseRadioWidget>;
summon<Parsed>() satisfies RadioWidget;
