import {
    boolean,
    constant,
    number,
    object,
    pair,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parsePerseusImageBackground} from "./perseus-image-background";
import {parseWidget} from "./widget";

import type {Parser} from "../parser-types";
import type {MeasurerWidget} from "@khanacademy/perseus-core";

export const parseMeasurerWidget: Parser<MeasurerWidget> = parseWidget(
    constant("measurer"),
    object({
        image: parsePerseusImageBackground,
        showProtractor: boolean,
        showRuler: boolean,
        rulerLabel: string,
        rulerTicks: number,
        rulerPixels: number,
        rulerLength: number,
        box: pair(number, number),
        // TODO(benchristel): static is not used. Remove it?
        static: defaulted(boolean, () => false),
    }),
);
