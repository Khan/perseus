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
        plotDimensions: array(number),
    }),
);
