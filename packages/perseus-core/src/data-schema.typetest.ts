import {describe, expect, it} from "tstyche";

import type {
    PerseusBlankWidgetOptions,
    PerseusCategorizerWidgetOptions,
    PerseusCSProgramWidgetOptions,
    PerseusDefinitionWidgetOptions,
    PerseusDropdownWidgetOptions,
    PerseusExplanationWidgetOptions,
    PerseusExpressionWidgetOptions,
    PerseusFillInTheBlankWidgetOptions,
    PerseusFreeResponseWidgetOptions,
    PerseusGradedGroupSetWidgetOptions,
    PerseusGradedGroupWidgetOptions,
    PerseusGrapherWidgetOptions,
    PerseusGroupWidgetOptions,
    PerseusIFrameWidgetOptions,
    PerseusImageWidgetOptions,
    PerseusInputNumberWidgetOptions,
    PerseusInteractionWidgetOptions,
    PerseusInteractiveGraphWidgetOptions,
    PerseusLabelImageWidgetOptions,
    PerseusMatcherWidgetOptions,
    PerseusMatrixWidgetOptions,
    PerseusMeasurerWidgetOptions,
    PerseusNumberLineWidgetOptions,
    PerseusNumericInputWidgetOptions,
    PerseusOrdererWidgetOptions,
    PerseusPhetSimulationWidgetOptions,
    PerseusPlotterWidgetOptions,
    PerseusPythonProgramWidgetOptions,
    PerseusRadioWidgetOptions,
    PerseusSorterWidgetOptions,
    PerseusTableWidgetOptions,
    PerseusVideoWidgetOptions,
    PerseusWidgetOptions,
} from "./data-schema";

describe("PerseusInputNumberWidgetOptions", () => {
    it("is identical to PerseusNumericInputWidgetOptions", () => {
        // This test is needed because the PerseusInputNumberWidgetOptions now
        // get passed to the NumericInput component. We are currently (May
        // 2026) removing the deprecated InputNumber code in favor of using
        // NumericInput everywhere, but we need to keep separate types for
        // InputNumber to support legacy content.
        expect<PerseusInputNumberWidgetOptions>().type.toBe<PerseusNumericInputWidgetOptions>();
    });
});

describe("PerseusWidgetOptions", () => {
    it("includes all widget options", () => {
        expect<PerseusWidgetOptions>().type.toBeAssignableFrom<
            | PerseusBlankWidgetOptions
            | PerseusCategorizerWidgetOptions
            | PerseusCSProgramWidgetOptions
            | PerseusDefinitionWidgetOptions
            | PerseusDropdownWidgetOptions
            | PerseusExplanationWidgetOptions
            | PerseusExpressionWidgetOptions
            | PerseusFillInTheBlankWidgetOptions
            | PerseusFreeResponseWidgetOptions
            | PerseusGradedGroupSetWidgetOptions
            | PerseusGradedGroupWidgetOptions
            | PerseusGrapherWidgetOptions
            | PerseusGroupWidgetOptions
            | PerseusIFrameWidgetOptions
            | PerseusImageWidgetOptions
            | PerseusInputNumberWidgetOptions
            | PerseusInteractionWidgetOptions
            | PerseusInteractiveGraphWidgetOptions
            | PerseusLabelImageWidgetOptions
            | PerseusMatcherWidgetOptions
            | PerseusMatrixWidgetOptions
            | PerseusMeasurerWidgetOptions
            | PerseusNumberLineWidgetOptions
            | PerseusNumericInputWidgetOptions
            | PerseusOrdererWidgetOptions
            | PerseusPhetSimulationWidgetOptions
            | PerseusPlotterWidgetOptions
            | PerseusPythonProgramWidgetOptions
            | PerseusRadioWidgetOptions
            | PerseusSorterWidgetOptions
            | PerseusTableWidgetOptions
            | PerseusVideoWidgetOptions
        >();
    });
});
