import {record, string} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parsePerseusImageDetail} from "./perseus-image-detail";

import type {PerseusImageDetail} from "../../data-schema";
import type {Parser} from "../parser-types";

export const parseImages: Parser<{[key: string]: PerseusImageDetail}> =
    defaulted(record(string, parsePerseusImageDetail), () => ({}));
