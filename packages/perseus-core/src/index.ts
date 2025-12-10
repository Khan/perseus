export type {PerseusAnalyticsEvent, AnalyticsEventHandlerFn} from "./analytics";
export type {
    KEScore,
    RendererInterface,
    MarkerType,
    InteractiveMarkerType,
    Relationship,
    Alignment,
    RecursiveReadonly,
} from "./types";
export type {
    KeypadKey,
    KeypadConfiguration,
    KeypadContextRendererInterface,
} from "./keypad";
export type {ErrorKind} from "./error/errors";
export {default as ErrorCodes, type ErrorCode} from "./error-codes";
export type {FunctionTypeMappingKeys} from "./utils/grapher-util";
export type {Coords} from "./utils/grapher-types";
export type * from "./validation.types";

export {default as getMatrixSize} from "./utils/get-matrix-size";
export {default as getDecimalSeparator} from "./utils/get-decimal-separator";
export {getDivideSymbol} from "./utils/get-divide-symbol";
export {getDivideSymbolForTex} from "./utils/get-divide-symbol";
export {approximateEqual, approximateDeepEqual} from "./utils/equality";
export {
    addWidget,
    getWidgetIdsFromContent,
    getWidgetIdsFromContentByType,
} from "./utils/widget-id-utils";

export {default as deepClone} from "./utils/deep-clone";
export * as GrapherUtil from "./utils/grapher-util";
export {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "./utils/test-utils";
export {itemHasRationales} from "./utils/item-has-rationales";
export {itemHasHints} from "./utils/item-has-hints";
export {makeSafeUrl} from "./utils/make-safe-url";

export {
    parsePerseusItem,
    parseAndMigratePerseusItem,
    parseAndMigratePerseusArticle,
    parseAndMigrateUserInputMap,
    type ParseFailureDetail,
} from "./parse-perseus-json";

export {
    isSuccess,
    isFailure,
    type Result,
    type Success,
    type Failure,
} from "./parse-perseus-json/result";

export {libVersion} from "./version";

export {Errors} from "./error/errors";
export {PerseusError} from "./error/perseus-error";

export * from "./data-schema";

export {pluck, mapObject} from "./utils/objective_";

export {default as categorizerLogic} from "./widgets/categorizer";
export type {CategorizerDefaultWidgetOptions} from "./widgets/categorizer";
export {default as csProgramLogic} from "./widgets/cs-program";
export type {CSProgramDefaultWidgetOptions} from "./widgets/cs-program";
export {default as definitionLogic} from "./widgets/definition";
export type {DefinitionDefaultWidgetOptions} from "./widgets/definition";
export {default as dropdownLogic} from "./widgets/dropdown";
export type {DropdownDefaultWidgetOptions} from "./widgets/dropdown";
export {default as explanationLogic} from "./widgets/explanation";
export type {ExplanationDefaultWidgetOptions} from "./widgets/explanation";
export {default as expressionLogic} from "./widgets/expression";
export type {ExpressionDefaultWidgetOptions} from "./widgets/expression";
export {default as deriveExtraKeys} from "./widgets/expression/derive-extra-keys";
export {default as gradedGroupLogic} from "./widgets/graded-group";
export {default as freeResponseLogic} from "./widgets/free-response";
export type {FreeResponseDefaultWidgetOptions} from "./widgets/free-response";
export type {GradedGroupDefaultWidgetOptions} from "./widgets/graded-group";
export {default as gradedGroupSetLogic} from "./widgets/graded-group-set";
export type {GradedGroupSetDefaultWidgetOptions} from "./widgets/graded-group-set";
export {default as grapherLogic} from "./widgets/grapher";
export type {GrapherDefaultWidgetOptions} from "./widgets/grapher";
export {default as groupLogic} from "./widgets/group";
export type {GroupDefaultWidgetOptions} from "./widgets/group";
export {default as iframeLogic} from "./widgets/iframe";
export type {IFrameDefaultWidgetOptions} from "./widgets/iframe";
export {default as imageLogic} from "./widgets/image";
export type {ImageDefaultWidgetOptions} from "./widgets/image";
export {default as inputNumberLogic} from "./widgets/input-number";
export type {InputNumberDefaultWidgetOptions} from "./widgets/input-number";
export {default as interactionLogic} from "./widgets/interaction";
export type {InteractionDefaultWidgetOptions} from "./widgets/interaction";
export {default as interactiveGraphLogic} from "./widgets/interactive-graph";
export type {InteractiveGraphDefaultWidgetOptions} from "./widgets/interactive-graph";
export {default as labelImageLogic} from "./widgets/label-image";
export type {LabelImageDefaultWidgetOptions} from "./widgets/label-image";
export {default as matcherLogic} from "./widgets/matcher";
export type {MatcherDefaultWidgetOptions} from "./widgets/matcher";
export {default as matrixLogic} from "./widgets/matrix";
export type {MatrixDefaultWidgetOptions} from "./widgets/matrix";
export {default as measurerLogic} from "./widgets/measurer";
export type {MeasurerDefaultWidgetOptions} from "./widgets/measurer";
export {default as numberLineLogic} from "./widgets/number-line";
export type {NumberLineDefaultWidgetOptions} from "./widgets/number-line";
export {default as numericInputLogic} from "./widgets/numeric-input";
export type {NumericInputDefaultWidgetOptions} from "./widgets/numeric-input";
export {default as ordererLogic} from "./widgets/orderer";
export type {OrdererDefaultWidgetOptions} from "./widgets/orderer";
export {default as passageLogic} from "./widgets/passage";
export type {PassageDefaultWidgetOptions} from "./widgets/passage";
export {default as passageRefLogic} from "./widgets/passage-ref";
export type {PassageRefDefaultWidgetOptions} from "./widgets/passage-ref";
export {default as passageRefTargetLogic} from "./widgets/passage-ref-target";
export type {PassageRefTargetDefaultWidgetOptions} from "./widgets/passage-ref-target";
export {default as phetSimulationLogic} from "./widgets/phet-simulation";
export type {PhetSimulationDefaultWidgetOptions} from "./widgets/phet-simulation";
export {default as plotterLogic} from "./widgets/plotter";
export type {PlotterDefaultWidgetOptions} from "./widgets/plotter";
export {default as pythonProgramLogic} from "./widgets/python-program";
export type {PythonProgramDefaultWidgetOptions} from "./widgets/python-program";
export {default as radioLogic} from "./widgets/radio";
export type {RadioDefaultWidgetOptions} from "./widgets/radio";
export {usesNumCorrect} from "./widgets/radio/radio-util";
export {default as sorterLogic} from "./widgets/sorter";
export type {SorterDefaultWidgetOptions} from "./widgets/sorter";
export {default as tableLogic} from "./widgets/table";
export type {TableDefaultWidgetOptions} from "./widgets/table";
export {default as videoLogic} from "./widgets/video";
export type {VideoDefaultWidgetOptions} from "./widgets/video";

export {
    applyDefaultsToWidgets,
    applyDefaultsToWidget,
} from "./widgets/apply-defaults";

export {default as getDefaultAnswerArea} from "./utils/get-default-answer-area";
export {getDefaultFigureForType} from "./utils/get-default-figure-for-type";
export {
    default as splitPerseusItem,
    splitPerseusItemJSON,
} from "./utils/split-perseus-item";
export {default as Registry} from "./utils/registry";

export type * from "./widgets/logic-export.types";

export * as CoreWidgetRegistry from "./widgets/core-widget-registry";

export {default as getOrdererPublicWidgetOptions} from "./widgets/orderer/orderer-util";
export type {OrdererPublicWidgetOptions} from "./widgets/orderer/orderer-util";
export {default as getCategorizerPublicWidgetOptions} from "./widgets/categorizer/categorizer-util";
export type {CategorizerPublicWidgetOptions} from "./widgets/categorizer/categorizer-util";
export {default as getCSProgramPublicWidgetOptions} from "./widgets/cs-program/cs-program-util";
export {default as getExpressionPublicWidgetOptions} from "./widgets/expression/expression-util";
export {default as getFreeResponsePublicWidgetOptions} from "./widgets/free-response/free-response-util";
export type {ExpressionPublicWidgetOptions} from "./widgets/expression/expression-util";
export {default as getGrapherPublicWidgetOptions} from "./widgets/grapher/grapher-util";
export type {GrapherPublicWidgetOptions} from "./widgets/grapher/grapher-util";
export {default as getGroupPublicWidgetOptions} from "./widgets/group/group-util";
export {
    default as getInteractiveGraphPublicWidgetOptions,
    type InteractiveGraphPublicWidgetOptions,
} from "./widgets/interactive-graph/interactive-graph-util";
export {default as getLabelImagePublicWidgetOptions} from "./widgets/label-image/label-image-util";
export {
    default as getSorterPublicWidgetOptions,
    shuffleSorter,
} from "./widgets/sorter/sorter-util";
export type {SorterPublicWidgetOptions} from "./widgets/sorter/sorter-util";
export type {LabelImagePublicWidgetOptions} from "./widgets/label-image/label-image-util";
export type {LabelImageMarkerPublicData} from "./widgets/label-image/label-image-util";
export {default as getDropdownPublicWidgetOptions} from "./widgets/dropdown/dropdown-util";
export type {DropdownPublicWidgetOptions} from "./widgets/dropdown/dropdown-util";
export {default as getNumericInputPublicWidgetOptions} from "./widgets/numeric-input/numeric-input-util";
export {default as getNumberLinePublicWidgetOptions} from "./widgets/number-line/number-line-util";
export type {NumberLinePublicWidgetOptions} from "./widgets/number-line/number-line-util";
export {default as getRadioPublicWidgetOptions} from "./widgets/radio/radio-util";
export type {RadioPublicWidgetOptions} from "./widgets/radio/radio-util";
export {deriveNumCorrect} from "./widgets/radio/derive-num-correct";
export {default as getTablePublicWidgetOptions} from "./widgets/table/table-util";
export {default as getIFramePublicWidgetOptions} from "./widgets/iframe/iframe-util";
export {default as getMatrixPublicWidgetOptions} from "./widgets/matrix/matrix-util";
export type {MatrixPublicWidgetOptions} from "./widgets/matrix/matrix-util";
export {default as getPlotterPublicWidgetOptions} from "./widgets/plotter/plotter-util";
export type {PlotterPublicWidgetOptions} from "./widgets/plotter/plotter-util";
export {
    default as getMatcherPublicWidgetOptions,
    shuffleMatcher,
} from "./widgets/matcher/matcher-util";
export type {MatcherPublicWidgetOptions} from "./widgets/matcher/matcher-util";
export {shuffle, seededRNG, random} from "./utils/random-util";
export {default as PerseusFeatureFlags, isFeatureOn} from "./feature-flags";

export {traverse} from "./traversal";
export {isItemAccessible, violatingWidgets} from "./accessibility";
export {
    isLabeledSVG,
    getRealImageUrl,
    getBaseUrl,
    getSvgUrl,
    getDataUrl,
    getImageSizeModern,
} from "./utils/util.graphie";

// Generators
export {
    generateDefinitionOptions,
    generateDefinitionWidget,
} from "./utils/generators/definition-widget-generator";
export {
    generateDropdownOptions,
    generateDropdownWidget,
} from "./utils/generators/dropdown-widget-generator";
export {
    generateExplanationOptions,
    generateExplanationWidget,
} from "./utils/generators/explanation-widget-generator";
export {
    generateExpressionOptions,
    generateExpressionAnswerForm,
    generateExpressionWidget,
} from "./utils/generators/expression-widget-generator";
export {
    generateFreeResponseOptions,
    generateFreeResponseWidget,
} from "./utils/generators/free-response-widget-generator";
export {
    generateImageOptions,
    generateImageWidget,
} from "./utils/generators/image-widget-generator";
export {
    generateNumericInputOptions,
    generateNumericInputAnswer,
    generateNumericInputWidget,
} from "./utils/generators/numeric-input-widget-generator";
export {
    generateRadioOptions,
    generateRadioWidget,
} from "./utils/generators/radio-widget-generator";
export {generateVideoWidget} from "./utils/generators/video-widget-generator";

export {
    getAnswersFromWidgets,
    injectWidgets,
    getPerseusAIData,
} from "./utils/extract-perseus-ai-data";

import {registerCoreWidgets} from "./widgets/core-widget-registry";

registerCoreWidgets();
