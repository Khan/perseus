import {plotterPlotTypes} from "../../data-schema";
import {
    constant,
    object,
    string,
    array,
    number,
    optional,
    nullable,
    enumeration,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

export const parsePlotterWidget = parseWidget(
    constant("plotter"),
    object({
        labels: array(string),
        categories: array(string),
        type: enumeration(...plotterPlotTypes),
        maxY: number,
        // The default value for scaleY comes from plotter.tsx.
        // See parse-perseus-json/README.md for why we want to duplicate the
        // defaults here.
        scaleY: defaulted(number, () => 1),
        labelInterval: optional(nullable(number)),
        // The default value for snapsPerLine comes from plotter.tsx.
        // See parse-perseus-json/README.md for why we want to duplicate the
        // defaults here.
        snapsPerLine: defaulted(number, () => 2),
        starting: array(number),
        correct: defaulted(array(number), () => []),
        picUrl: optional(nullable(string)),
        picSize: optional(nullable(number)),
        picBoxHeight: optional(nullable(number)),
        // NOTE(benchristel): I copied the default plotDimensions from
        // plotter.tsx. See the parse-perseus-json/README.md for an explanation
        // of why we want to duplicate the defaults here.
        plotDimensions: defaulted(array(number), () => [380, 300]),
    }),
);
