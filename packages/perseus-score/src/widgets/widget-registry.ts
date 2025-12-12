import {
    Registry,
    type WidgetScorerFunction,
    type WidgetValidatorFunction,
} from "@khanacademy/perseus-core";

import scoreCategorizer from "./categorizer/score-categorizer";
import validateCategorizer from "./categorizer/validate-categorizer";
import scoreCSProgram from "./cs-program/score-cs-program";
import scoreDeprecatedStandin from "./deprecated-standin/score-deprecated-standin";
import scoreDropdown from "./dropdown/score-dropdown";
import validateDropdown from "./dropdown/validate-dropdown";
import scoreExpression from "./expression/score-expression";
import validateExpression from "./expression/validate-expression";
import scoreFreeResponse from "./free-response/score-free-response";
import validateFreeResponse from "./free-response/validate-free-response";
import scoreGrapher from "./grapher/score-grapher";
import scoreGroup from "./group/score-group";
import validateGroup from "./group/validate-group";
import scoreIframe from "./iframe/score-iframe";
import scoreInputNumber from "./input-number/score-input-number";
import scoreInteractiveGraph from "./interactive-graph/score-interactive-graph";
import scoreLabelImage from "./label-image/score-label-image";
import validateLabelImage from "./label-image/validate-label-image";
import scoreMatcher from "./matcher/score-matcher";
import scoreMatrix from "./matrix/score-matrix";
import validateMatrix from "./matrix/validate-matrix";
import scoreMockWidget from "./mock-widget/score-mock-widget";
import scoreNumberLine from "./number-line/score-number-line";
import scoreNumericInput from "./numeric-input/score-numeric-input";
import scoreOrderer from "./orderer/score-orderer";
import validateOrderer from "./orderer/validate-orderer";
import scorePlotter from "./plotter/score-plotter";
import validatePlotter from "./plotter/validate-plotter";
import scoreRadio from "./radio/score-radio";
import validateRadio from "./radio/validate-radio";
import scoreSorter from "./sorter/score-sorter";
import validateSorter from "./sorter/validate-sorter";
import scoreTable from "./table/score-table";
import validateTable from "./table/validate-table";

type ScoringLogic = {
    scorer: WidgetScorerFunction;
    validator?: WidgetValidatorFunction;
};

const widgets = new Registry<ScoringLogic>("Score widget registry");

export function registerWidget(
    type: string,
    scorer: WidgetScorerFunction,
    validator?: WidgetValidatorFunction,
) {
    const logic = {
        scorer,
        validator,
    };
    widgets.set(type, logic);
}

export const getWidgetValidator = (
    type: string,
): WidgetValidatorFunction | null => {
    return widgets.get(type)?.validator ?? null;
};

export const getWidgetScorer = (type: string): WidgetScorerFunction | null => {
    return widgets.get(type)?.scorer ?? null;
};

registerWidget(
    "categorizer",
    scoreCategorizer as any,
    validateCategorizer as any,
);
registerWidget("cs-program", scoreCSProgram as any);
registerWidget("deprecated-standin", scoreDeprecatedStandin as any);
registerWidget("dropdown", scoreDropdown as any, validateDropdown as any);
registerWidget("expression", scoreExpression as any, validateExpression as any);
registerWidget(
    "free-response",
    scoreFreeResponse as any,
    validateFreeResponse as any,
);
registerWidget("grapher", scoreGrapher as any);
registerWidget("group", scoreGroup as any, validateGroup as any);
registerWidget("iframe", scoreIframe as any);
registerWidget("input-number", scoreInputNumber as any);
registerWidget("interactive-graph", scoreInteractiveGraph as any);
registerWidget(
    "label-image",
    scoreLabelImage as any,
    validateLabelImage as any,
);
registerWidget("matcher", scoreMatcher as any);
registerWidget("matrix", scoreMatrix as any, validateMatrix as any);
registerWidget("mock-widget", scoreMockWidget as any, scoreMockWidget as any);
registerWidget("number-line", scoreNumberLine as any);
registerWidget("numeric-input", scoreNumericInput as any);
registerWidget("orderer", scoreOrderer as any, validateOrderer as any);
registerWidget("plotter", scorePlotter as any, validatePlotter as any);
registerWidget("radio", scoreRadio as any, validateRadio as any);
registerWidget("sorter", scoreSorter as any, validateSorter as any);
registerWidget("table", scoreTable as any, validateTable as any);
