import {
    constant,
    object,
    string,
    array,
    number,
    nullable,
    enumeration,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

const plotterPlotTypes = enumeration(
    "bar",
    "line",
    "pic",
    "histogram",
    "dotplot",
);

export const parsePlotterWidget = parseWidget(
    constant("plotter"),
    object({
        labels: array(string),
        categories: array(string),
        type: plotterPlotTypes,
        maxY: number,
        // The default value for scaleY comes from widgets/plotter/index.ts.
        // See parse-perseus-json/README.md for why we want to duplicate the
        // defaults here.
        scaleY: defaulted(number, () => 1),
        // The default value for labelInterval comes from widgets/plotter/index.ts.
        // See parse-perseus-json/README.md for why we want to duplicate the
        // defaults here.
        labelInterval: defaulted(number, () => 1),
        // The default value for snapsPerLine comes from widgets/plotter/index.ts.
        // See parse-perseus-json/README.md for why we want to duplicate the
        // defaults here.
        snapsPerLine: defaulted(number, () => 2),
        starting: array(number),
        // The default value for correct comes from widgets/plotter/index.ts.
        // See parse-perseus-json/README.md for why we want to duplicate the
        // defaults here.
        correct: defaulted(array(number), () => [1]),
        picUrl: defaulted(nullable(string), () => null),
        // The default value for picSize comes from widgets/plotter/index.ts.
        // See parse-perseus-json/README.md for why we want to duplicate the
        // defaults here.
        picSize: defaulted(number, () => 30),
        // The default value for picBoxHeight comes from widgets/plotter/index.ts.
        // See parse-perseus-json/README.md for why we want to duplicate the
        // defaults here.
        picBoxHeight: defaulted(number, () => 36),
        // NOTE(benchristel): I copied the default plotDimensions from
        // plotter.tsx. See the parse-perseus-json/README.md for an explanation
        // of why we want to duplicate the defaults here.
        plotDimensions: defaulted(array(number), () => [380, 300]),
    }),
);
