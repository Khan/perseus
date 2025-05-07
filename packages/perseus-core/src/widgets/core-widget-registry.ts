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

const widgets = {};

function registerWidget(type: string, logic: WidgetLogic) {
    // TODO(LEMS-3083): Remove eslint suppression
    // eslint-disable-next-line functional/immutable-data
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

/**
 * We use a function here rather than registering widgets
 * at the top-level of the file to avoid circular dependencies.
 * Logic that needs core widget functionality
 * (like a prod or in tests)
 * need to call this function before trying to use that logic.
 */
export function registerCoreWidgets() {
    const widgets = [
        categorizerWidgetLogic,
        csProgramWidgetLogic,
        definitionWidgetLogic,
        dropdownWidgetLogic,
        explanationWidgetLogic,
        expressionWidgetLogic,
        gradedGroupWidgetLogic,
        gradedGroupSetWidgetLogic,
        grapherWidgetLogic,
        groupWidgetLogic,
        iframeWidgetLogic,
        imageWidgetLogic,
        inputNumberWidgetLogic,
        interactionWidgetLogic,
        interactiveGraphWidgetLogic,
        labelImageWidgetLogic,
        matcherWidgetLogic,
        matrixWidgetLogic,
        measurerWidgetLogic,
        numberLineWidgetLogic,
        numericInputWidgetLogic,
        ordererWidgetLogic,
        passageWidgetLogic,
        passageRefWidgetLogic,
        passageRefTargetWidgetLogic,
        phetSimulationWidgetLogic,
        plotterWidgetLogic,
        pythonProgramWidgetLogic,
        radioWidgetLogic,
        sorterWidgetLogic,
        tableWidgetLogic,
        videoWidgetLogic,
    ];

    widgets.forEach((w) => {
        registerWidget(w.name, w);
    });
}
