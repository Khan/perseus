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

export const parseMeasurerWidget = parseWidget(
    constant("measurer"),
    object({
        // The default value for image comes from measurer.tsx.
        // See parse-perseus-json/README.md for why we want to duplicate the
        // defaults here.
        image: defaulted(parsePerseusImageBackground, () => ({
            url: null,
            top: 0,
            left: 0,
        })),
        showProtractor: boolean,
        showRuler: boolean,
        rulerLabel: string,
        rulerTicks: number,
        rulerPixels: number,
        rulerLength: number,
        box: pair(number, number),
    }),
);
