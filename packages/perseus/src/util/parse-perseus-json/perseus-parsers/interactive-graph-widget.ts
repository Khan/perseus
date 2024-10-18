import {constant} from "../general-purpose-parsers/constant";
import {Parser} from "../parser-types";
import {InteractiveGraphWidget} from "../../../perseus-types";
import {parseWidget} from "./widget";
import {object} from "../general-purpose-parsers/object";
import {pair} from "../general-purpose-parsers/pair";
import {number} from "../general-purpose-parsers/number";
import {optional} from "../general-purpose-parsers/optional";
import {parsePerseusImageBackground} from "./perseus-image-background";
import {enumeration} from "../general-purpose-parsers/enumeration";
import {array} from "../general-purpose-parsers/array";
import {string} from "../general-purpose-parsers/string";
import {boolean} from "../general-purpose-parsers/boolean";
import {any} from "../general-purpose-parsers/any";

// Used to represent 2-D points and ranges
const pairOfNumbers = pair(number, number)

export const parseInteractiveGraphWidget: Parser<InteractiveGraphWidget> = parseWidget(
    constant("interactive-graph"),
    object({
        step: pairOfNumbers,
        gridStep: pairOfNumbers,
        snapStep: pairOfNumbers,
        backgroundImage: optional(parsePerseusImageBackground),
        markings: enumeration(["graph", "grid", "none"] as const),
        labels: array(string),
        showProtractor: boolean,
        showRuler: optional(boolean),
        showTooltips: optional(boolean),
        rulerLabel: optional(string),
        rulerTicks: optional(number),
        range: pair(pairOfNumbers, pairOfNumbers),
        graph: any, // TODO PerseusGraphType
        correct: any, // TODO PerseusGraphType
        // TODO: default lockedFigures to empty array
        lockedFigures: optional(array(any)), // TODO LockedFigure
        fullGraphLabel: optional(string),
        fullGraphAriaDescription: optional(string),
    })
)
