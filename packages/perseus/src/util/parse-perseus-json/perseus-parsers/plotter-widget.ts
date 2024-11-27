import {plotterPlotTypes} from "../../../perseus-types";
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

import {parseWidget} from "./widget";

import type {PlotterWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";
import {defaulted} from "../general-purpose-parsers/defaulted";

export const parsePlotterWidget: Parser<PlotterWidget> = parseWidget(
    constant("plotter"),
    object({
        labels: array(string),
        categories: array(string),
        type: enumeration(...plotterPlotTypes),
        maxY: number,
        scaleY: number,
        labelInterval: optional(nullable(number)),
        snapsPerLine: number,
        starting: array(number),
        correct: array(number),
        picUrl: optional(nullable(string)),
        picSize: optional(nullable(number)),
        picBoxHeight: optional(nullable(number)),
        // NOTE(benchristel): I copied the default plotDimensions from
        // plotter.tsx. See the parse-perseus-json/README.md for an explanation
        // of why we want to duplicate the defaults here.
        plotDimensions: defaulted(array(number), () => [380, 300]),
    }),
);
