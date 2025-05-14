import scoreNoop from "../util/score-noop";

import scoreCategorizer from "./categorizer/score-categorizer";
import validateCategorizer from "./categorizer/validate-categorizer";
import scoreCSProgram from "./cs-program/score-cs-program";
import scoreDropdown from "./dropdown/score-dropdown";
import validateDropdown from "./dropdown/validate-dropdown";
import scoreExpression from "./expression/score-expression";
import validateExpression from "./expression/validate-expression";
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
import validateNumberLine from "./number-line/validate-number-line";
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

import type {
    WidgetScorerFunction,
    WidgetValidatorFunction,
} from "@khanacademy/perseus-core";

const widgets = {};

export function registerWidget(
    type: string,
    scorer: WidgetScorerFunction,
    validator?: WidgetValidatorFunction,
) {
    widgets[type] = {
        scorer,
        validator,
    };
}

export const getWidgetValidator = (
    name: string,
): WidgetValidatorFunction | null => {
    return widgets[name]?.validator ?? null;
};

export const getWidgetScorer = (name: string): WidgetScorerFunction | null => {
    return widgets[name]?.scorer ?? null;
};

registerWidget(
    "categorizer",
    scoreCategorizer as any,
    validateCategorizer as any,
);
registerWidget("cs-program", scoreCSProgram as any);
registerWidget("dropdown", scoreDropdown as any, validateDropdown as any);
registerWidget("expression", scoreExpression as any, validateExpression as any);
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
registerWidget(
    "number-line",
    scoreNumberLine as any,
    validateNumberLine as any,
);
registerWidget("numeric-input", scoreNumericInput as any);
registerWidget("orderer", scoreOrderer as any, validateOrderer as any);
registerWidget("plotter", scorePlotter as any, validatePlotter as any);
registerWidget("radio", scoreRadio as any, validateRadio as any);
registerWidget("sorter", scoreSorter as any, validateSorter as any);
registerWidget("table", scoreTable as any, validateTable as any);

registerWidget("deprecated-standin", () => scoreNoop(1) as any);
registerWidget("measurer", () => scoreNoop(1) as any);

registerWidget("definition", scoreNoop as any);
registerWidget("explanation", scoreNoop as any);
registerWidget("image", scoreNoop as any);
registerWidget("interaction", scoreNoop as any);
registerWidget("molecule", scoreNoop as any);
registerWidget("passage", scoreNoop as any);
registerWidget("passage-ref", scoreNoop as any);
registerWidget("passage-ref-target", scoreNoop as any);
registerWidget("video", scoreNoop as any);
