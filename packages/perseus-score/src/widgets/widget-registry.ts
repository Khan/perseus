import {
    Registry,
    type WidgetScorerFunction,
    type WidgetValidatorFunction,
} from "@khanacademy/perseus-core";

import scoreCategorizer from "./categorizer/score-categorizer";
import validateCategorizer from "./categorizer/validate-categorizer";
import scoreCSProgram from "./cs-program/score-cs-program";
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

function setWidget(
    type: string,
    scorer: WidgetScorerFunction,
    validator?: WidgetValidatorFunction,
) {
    widgets.set(type, {scorer, validator});
}

// The built-in widgets are registered on first use, not when this module
// loads: the group widget's scorer and validator import score.ts and
// validate.ts, which import this module. A module that imports the group
// widget first (as its tests do) would otherwise reach these registrations
// before the group widget's exports exist, which throws under native ES
// modules.
let builtInsRegistered = false;
function registerBuiltInWidgets() {
    if (builtInsRegistered) {
        return;
    }
    builtInsRegistered = true;
    setWidget(
        "categorizer",
        // eslint-disable-next-line no-restricted-syntax
        scoreCategorizer as any,
        // eslint-disable-next-line no-restricted-syntax
        validateCategorizer as any,
    );
    // eslint-disable-next-line no-restricted-syntax
    setWidget("cs-program", scoreCSProgram as any);
    // eslint-disable-next-line no-restricted-syntax
    setWidget("dropdown", scoreDropdown as any, validateDropdown as any);
    // eslint-disable-next-line no-restricted-syntax
    setWidget("expression", scoreExpression as any, validateExpression as any);
    setWidget(
        "free-response",
        // eslint-disable-next-line no-restricted-syntax
        scoreFreeResponse as any,
        // eslint-disable-next-line no-restricted-syntax
        validateFreeResponse as any,
    );
    // eslint-disable-next-line no-restricted-syntax
    setWidget("grapher", scoreGrapher as any);
    // eslint-disable-next-line no-restricted-syntax
    setWidget("group", scoreGroup as any, validateGroup as any);
    // eslint-disable-next-line no-restricted-syntax
    setWidget("iframe", scoreIframe as any);
    // eslint-disable-next-line no-restricted-syntax
    setWidget("input-number", scoreInputNumber as any);
    // eslint-disable-next-line no-restricted-syntax
    setWidget("interactive-graph", scoreInteractiveGraph as any);
    setWidget(
        "label-image",
        // eslint-disable-next-line no-restricted-syntax
        scoreLabelImage as any,
        // eslint-disable-next-line no-restricted-syntax
        validateLabelImage as any,
    );
    // eslint-disable-next-line no-restricted-syntax
    setWidget("matcher", scoreMatcher as any);
    // eslint-disable-next-line no-restricted-syntax
    setWidget("matrix", scoreMatrix as any, validateMatrix as any);
    // eslint-disable-next-line no-restricted-syntax
    setWidget("mock-widget", scoreMockWidget as any, scoreMockWidget as any);
    // eslint-disable-next-line no-restricted-syntax
    setWidget("number-line", scoreNumberLine as any);
    // eslint-disable-next-line no-restricted-syntax
    setWidget("numeric-input", scoreNumericInput as any);
    // eslint-disable-next-line no-restricted-syntax
    setWidget("orderer", scoreOrderer as any, validateOrderer as any);
    // eslint-disable-next-line no-restricted-syntax
    setWidget("plotter", scorePlotter as any, validatePlotter as any);
    // eslint-disable-next-line no-restricted-syntax
    setWidget("radio", scoreRadio as any, validateRadio as any);
    // eslint-disable-next-line no-restricted-syntax
    setWidget("sorter", scoreSorter as any, validateSorter as any);
    // eslint-disable-next-line no-restricted-syntax
    setWidget("table", scoreTable as any, validateTable as any);
}

export function registerWidget(
    type: string,
    scorer: WidgetScorerFunction,
    validator?: WidgetValidatorFunction,
) {
    // So that a later lookup doesn't replace this registration with a
    // built-in one.
    registerBuiltInWidgets();
    setWidget(type, scorer, validator);
}

export const getWidgetValidator = (
    type: string,
): WidgetValidatorFunction | null => {
    registerBuiltInWidgets();
    return widgets.get(type)?.validator ?? null;
};

// A widget type with no registered scorer is unscoreable and doesn't count
// towards an item's score.
export const getWidgetScorer = (type: string): WidgetScorerFunction | null => {
    registerBuiltInWidgets();
    return widgets.get(type)?.scorer ?? null;
};
