import {blankRegistration} from "./widgets/blank";
import {categorizerRegistration} from "./widgets/categorizer";
import {csProgramRegistration} from "./widgets/cs-program";
import {definitionRegistration} from "./widgets/definition";
import {deprecatedStandinRegistration} from "./widgets/deprecated-standin";
import {dropdownRegistration} from "./widgets/dropdown";
import {explanationRegistration} from "./widgets/explanation";
import {expressionRegistration} from "./widgets/expression";
import {fillInTheBlankRegistration} from "./widgets/fill-in-the-blank";
import {freeResponseRegistration} from "./widgets/free-response";
import {gradedGroupRegistration} from "./widgets/graded-group";
import {gradedGroupSetRegistration} from "./widgets/graded-group-set";
import {grapherRegistration} from "./widgets/grapher";
import {groupRegistration} from "./widgets/group";
import {iframeRegistration} from "./widgets/iframe";
import {imageRegistration} from "./widgets/image";
import {inputNumberRegistration} from "./widgets/input-number";
import {interactionRegistration} from "./widgets/interaction";
import {interactiveGraphRegistration} from "./widgets/interactive-graphs/interactive-graph";
import {labelImageRegistration} from "./widgets/label-image";
import {matcherRegistration} from "./widgets/matcher";
import {matrixRegistration} from "./widgets/matrix";
import {measurerRegistration} from "./widgets/measurer";
import {numberLineRegistration} from "./widgets/number-line";
import {numericInputRegistration} from "./widgets/numeric-input";
import {ordererRegistration} from "./widgets/orderer";
import {phetSimulationRegistration} from "./widgets/phet-simulation";
import {plotterRegistration} from "./widgets/plotter";
import {pythonProgramRegistration} from "./widgets/python-program";
import {radioRegistration} from "./widgets/radio";
import {sorterRegistration} from "./widgets/sorter";
import {tableRegistration} from "./widgets/table";
import {videoRegistration} from "./widgets/video";

import type {WidgetRegistration} from "./widget-registration";

/**
 * Every production widget's React export paired with its core logic.
 */
const allWidgetRegistrations: ReadonlyArray<WidgetRegistration> = [
    blankRegistration,
    categorizerRegistration,
    csProgramRegistration,
    definitionRegistration,
    deprecatedStandinRegistration,
    dropdownRegistration,
    explanationRegistration,
    expressionRegistration,
    fillInTheBlankRegistration,
    freeResponseRegistration,
    gradedGroupRegistration,
    gradedGroupSetRegistration,
    grapherRegistration,
    groupRegistration,
    iframeRegistration,
    imageRegistration,
    inputNumberRegistration,
    interactionRegistration,
    interactiveGraphRegistration,
    labelImageRegistration,
    matcherRegistration,
    matrixRegistration,
    measurerRegistration,
    numberLineRegistration,
    numericInputRegistration,
    ordererRegistration,
    phetSimulationRegistration,
    plotterRegistration,
    pythonProgramRegistration,
    radioRegistration,
    sorterRegistration,
    tableRegistration,
    videoRegistration,
];

export default allWidgetRegistrations;
