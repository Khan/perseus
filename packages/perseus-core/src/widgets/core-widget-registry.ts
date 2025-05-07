import categorizerWidgetLogic from "./categorizer";
import csProgramWidgetLogic from "./cs-program";
import definitionWidgetLogic from "./definition";
import dropdownWidgetLogic from "./dropdown";
import explanationWidgetLogic from "./explanation";
import expressionWidgetLogic from "./expression";
import gradedGroupWidgetLogic from "./graded-group";
import gradedGroupSetWidgetLogic from "./graded-group-set";
import grapherWidgetLogic from "./grapher";
import groupWidgetLogic from "./group";
import iframeWidgetLogic from "./iframe";
import imageWidgetLogic from "./image";
import inputNumberWidgetLogic from "./input-number";
import interactionWidgetLogic from "./interaction";
import interactiveGraphWidgetLogic from "./interactive-graph";
import labelImageWidgetLogic from "./label-image";
import matcherWidgetLogic from "./matcher";
import matrixWidgetLogic from "./matrix";
import measurerWidgetLogic from "./measurer";
import numberLineWidgetLogic from "./number-line";
import numericInputWidgetLogic from "./numeric-input";
import ordererWidgetLogic from "./orderer";
import passageWidgetLogic from "./passage";
import passageRefWidgetLogic from "./passage-ref";
import passageRefTargetWidgetLogic from "./passage-ref-target";
import phetSimulationWidgetLogic from "./phet-simulation";
import plotterWidgetLogic from "./plotter";
import pythonProgramWidgetLogic from "./python-program";
import radioWidgetLogic from "./radio";
import sorterWidgetLogic from "./sorter";
import tableWidgetLogic from "./table";
import videoWidgetLogic from "./video";

import type {
    PublicWidgetOptionsFunction,
    WidgetLogic,
} from "./logic-export.types";
import type {Alignment} from "../types";
import { PerseusWidgetOptions } from "../data-schema";

const widgets:Record<string, WidgetLogic> = {};

function registerWidget(type: string, logic: WidgetLogic) {
    widgets[type] = logic;
}

export function isWidgetRegistered(type: string) {
    const widgetLogic = widgets[type];
    return !!widgetLogic;
}

export function getCurrentVersion(type: string) {
    const widgetLogic = widgets[type];
    return widgetLogic?.version || {major: 0, minor: 0};
}

// TODO(LEMS-2870): getPublicWidgetOptionsFunction/PublicWidgetOptionsFunction
// need better types
export const getPublicWidgetOptionsFunction = (
    name: string,
): PublicWidgetOptionsFunction => {
    return widgets[name]?.getPublicWidgetOptions ?? ((i: any) => i);
};

export function getWidgetOptionsUpgrades(type: string) {
    const widgetLogic = widgets[type];
    return widgetLogic?.widgetOptionsUpgrades || {};
}

export function getDefaultWidgetOptions(type: string) {
    const widgetLogic = widgets[type];
    return widgetLogic?.defaultWidgetOptions || {};
}

export function isAccessible(type: string, widgetOptions: PerseusWidgetOptions):boolean {
    const widgetLogic = widgets[type];

    if (!widgetLogic) {
        return false;
    }
    const {accessible} = widgetLogic;

    if (accessible == null) {
        return false;
    }

    return typeof accessible === "function"
        ? accessible(widgetOptions)
        : !!accessible;
}
/**
 * Handling for the optional alignments for widgets
 * See widget-container.jsx for details on how alignments are implemented.
 */

/**
 * Returns the list of supported alignments for the given (string) widget
 * type. This is used primarily at editing time to display the choices
 * for the user.
 *
 * Supported alignments are given as an array of strings in the exports of
 * a widget's module.
 */
export const getSupportedAlignments = (
    type: string,
): ReadonlyArray<Alignment> => {
    const widgetLogic = widgets[type];
    if (!widgetLogic?.supportedAlignments?.[0]) {
        // default alignments
        return ["default"];
    }
    return widgetLogic?.supportedAlignments;
};

/**
 * For the given (string) widget type, determine the default alignment for
 * the widget. This is used at rendering time to go from "default" alignment
 * to the actual alignment displayed on the screen.
 *
 * The default alignment is given either as a string (called
 * `defaultAlignment`) or a function (called `getDefaultAlignment`) on
 * the exports of a widget's module.
 */
export const getDefaultAlignment = (type: string): Alignment => {
    const widgetLogic = widgets[type];
    if (!widgetLogic?.defaultAlignment) {
        return "block";
    }
    return widgetLogic.defaultAlignment;
};

registerWidget("categorizer", categorizerWidgetLogic);
registerWidget("cs-program", csProgramWidgetLogic);
registerWidget("definition", definitionWidgetLogic);
registerWidget("dropdown", dropdownWidgetLogic);
registerWidget("explanation", explanationWidgetLogic);
registerWidget("expression", expressionWidgetLogic);
registerWidget("graded-group", gradedGroupWidgetLogic);
registerWidget("graded-group-set", gradedGroupSetWidgetLogic);
registerWidget("grapher", grapherWidgetLogic);
registerWidget("group", groupWidgetLogic);
registerWidget("iframe", iframeWidgetLogic);
registerWidget("image", imageWidgetLogic);
registerWidget("input-number", inputNumberWidgetLogic);
registerWidget("interaction", interactionWidgetLogic);
registerWidget("interactive-graph", interactiveGraphWidgetLogic);
registerWidget("label-image", labelImageWidgetLogic);
registerWidget("matcher", matcherWidgetLogic);
registerWidget("matrix", matrixWidgetLogic);
registerWidget("measurer", measurerWidgetLogic);
registerWidget("number-line", numberLineWidgetLogic);
registerWidget("numeric-input", numericInputWidgetLogic);
registerWidget("orderer", ordererWidgetLogic);
registerWidget("passage", passageWidgetLogic);
registerWidget("passage-ref", passageRefWidgetLogic);
registerWidget("passage-ref-target", passageRefTargetWidgetLogic);
registerWidget("phet-simulation", phetSimulationWidgetLogic);
registerWidget("plotter", plotterWidgetLogic);
registerWidget("python-program", pythonProgramWidgetLogic);
registerWidget("radio", radioWidgetLogic);
registerWidget("sorter", sorterWidgetLogic);
registerWidget("table", tableWidgetLogic);
registerWidget("video", videoWidgetLogic);
