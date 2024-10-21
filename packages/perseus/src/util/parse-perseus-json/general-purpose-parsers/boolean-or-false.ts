import {boolean} from "./boolean";
import {defaulted} from "./defaulted";

import type {Parser} from "../parser-types";

export const booleanOrFalse: Parser<boolean> = defaulted(boolean, () => false);
