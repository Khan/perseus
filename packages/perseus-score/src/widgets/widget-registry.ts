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
    // eslint-disable-next-line no-restricted-syntax
    scoreCategorizer as any,
    // eslint-disable-next-line no-restricted-syntax
    validateCategorizer as any,
);
// eslint-disable-next-line no-restricted-syntax
registerWidget("cs-program", scoreCSProgram as any);
// eslint-disable-next-line no-restricted-syntax
registerWidget("deprecated-standin", scoreDeprecatedStandin as any);
// eslint-disable-next-line no-restricted-syntax
registerWidget("dropdown", scoreDropdown as any, validateDropdown as any);
// eslint-disable-next-line no-restricted-syntax
registerWidget("expression", scoreExpression as any, validateExpression as any);
registerWidget(
    "free-response",
    // eslint-disable-next-line no-restricted-syntax
    scoreFreeResponse as any,
    // eslint-disable-next-line no-restricted-syntax
    validateFreeResponse as any,
);
// eslint-disable-next-line no-restricted-syntax
registerWidget("grapher", scoreGrapher as any);
// eslint-disable-next-line no-restricted-syntax
registerWidget("group", scoreGroup as any, validateGroup as any);
// eslint-disable-next-line no-restricted-syntax
registerWidget("iframe", scoreIframe as any);
// eslint-disable-next-line no-restricted-syntax
registerWidget("input-number", scoreInputNumber as any);
// eslint-disable-next-line no-restricted-syntax
registerWidget("interactive-graph", scoreInteractiveGraph as any);
registerWidget(
    "label-image",
    // eslint-disable-next-line no-restricted-syntax
    scoreLabelImage as any,
    // eslint-disable-next-line no-restricted-syntax
    validateLabelImage as any,
);
// eslint-disable-next-line no-restricted-syntax
registerWidget("matcher", scoreMatcher as any);
// eslint-disable-next-line no-restricted-syntax
registerWidget("matrix", scoreMatrix as any, validateMatrix as any);
// eslint-disable-next-line no-restricted-syntax
registerWidget("mock-widget", scoreMockWidget as any, scoreMockWidget as any);
// eslint-disable-next-line no-restricted-syntax
registerWidget("number-line", scoreNumberLine as any);
// eslint-disable-next-line no-restricted-syntax
registerWidget("numeric-input", scoreNumericInput as any);
// eslint-disable-next-line no-restricted-syntax
registerWidget("orderer", scoreOrderer as any, validateOrderer as any);
// eslint-disable-next-line no-restricted-syntax
registerWidget("plotter", scorePlotter as any, validatePlotter as any);
// eslint-disable-next-line no-restricted-syntax
registerWidget("radio", scoreRadio as any, validateRadio as any);
// eslint-disable-next-line no-restricted-syntax
registerWidget("sorter", scoreSorter as any, validateSorter as any);
// eslint-disable-next-line no-restricted-syntax
registerWidget("table", scoreTable as any, validateTable as any);
