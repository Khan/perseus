import blankWidgetLogic from "./widgets/blank";
import categorizerWidgetLogic from "./widgets/categorizer";
import {registerLogics} from "./widgets/core-widget-registry";
import csProgramWidgetLogic from "./widgets/cs-program";
import definitionWidgetLogic from "./widgets/definition";
import deprecatedStandinWidgetLogic from "./widgets/deprecated-standin";
import dropdownWidgetLogic from "./widgets/dropdown";
import explanationWidgetLogic from "./widgets/explanation";
import expressionWidgetLogic from "./widgets/expression";
import fillInTheBlankWidgetLogic from "./widgets/fill-in-the-blank";
import freeResponseWidgetLogic from "./widgets/free-response";
import gradedGroupWidgetLogic from "./widgets/graded-group";
import gradedGroupSetWidgetLogic from "./widgets/graded-group-set";
import grapherWidgetLogic from "./widgets/grapher";
import groupWidgetLogic from "./widgets/group";
import iframeWidgetLogic from "./widgets/iframe";
import imageWidgetLogic from "./widgets/image";
import inputNumberWidgetLogic from "./widgets/input-number";
import interactionWidgetLogic from "./widgets/interaction";
import interactiveGraphWidgetLogic from "./widgets/interactive-graph";
import labelImageWidgetLogic from "./widgets/label-image";
import matcherWidgetLogic from "./widgets/matcher";
import matrixWidgetLogic from "./widgets/matrix";
import measurerWidgetLogic from "./widgets/measurer";
import numberLineWidgetLogic from "./widgets/number-line";
import numericInputWidgetLogic from "./widgets/numeric-input";
import ordererWidgetLogic from "./widgets/orderer";
import phetSimulationWidgetLogic from "./widgets/phet-simulation";
import plotterWidgetLogic from "./widgets/plotter";
import pythonProgramWidgetLogic from "./widgets/python-program";
import radioWidgetLogic from "./widgets/radio";
import sorterWidgetLogic from "./widgets/sorter";
import tableWidgetLogic from "./widgets/table";
import videoWidgetLogic from "./widgets/video";

import type {AnyWidgetLogic} from "./widgets/core-widget-registry";

const allWidgetLogics: ReadonlyArray<AnyWidgetLogic> = [
    blankWidgetLogic,
    categorizerWidgetLogic,
    csProgramWidgetLogic,
    definitionWidgetLogic,
    deprecatedStandinWidgetLogic,
    dropdownWidgetLogic,
    explanationWidgetLogic,
    expressionWidgetLogic,
    fillInTheBlankWidgetLogic,
    freeResponseWidgetLogic,
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
    phetSimulationWidgetLogic,
    plotterWidgetLogic,
    pythonProgramWidgetLogic,
    radioWidgetLogic,
    sorterWidgetLogic,
    tableWidgetLogic,
    videoWidgetLogic,
];

/**
 * Registers every widget logic Perseus ships.
 */
export function initPerseusCore(): void {
    registerLogics(allWidgetLogics);
}
