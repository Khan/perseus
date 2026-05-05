export type {PerseusAnalyticsEvent, AnalyticsEventHandlerFn} from "./analytics";
/** @hidden */
export type {
    RendererInterface,
    MarkerType,
    InteractiveMarkerType,
    Relationship,
    Alignment,
    RecursiveReadonly,
} from "./types";
export type {KeypadKey} from "./keypad";
/** @hidden */
export type {
    KeypadConfiguration,
    KeypadContextRendererInterface,
} from "./keypad";
export type {ErrorKind} from "./error/errors";
/** @hidden */
export {default as ErrorCodes, type ErrorCode} from "./error-codes";
/** @hidden */
export type {FunctionTypeMappingKeys} from "./utils/grapher-util";
/** @hidden */
export type {Coords} from "./utils/grapher-types";
export type * from "./validation.types";

/** @hidden */
export {default as getMatrixSize} from "./utils/get-matrix-size";
/** @hidden */
export {default as getDecimalSeparator} from "./utils/get-decimal-separator";
/** @hidden */
export {getDivideSymbol} from "./utils/get-divide-symbol";
/** @hidden */
export {getDivideSymbolForTex} from "./utils/get-divide-symbol";
/** @hidden */
export {approximateEqual, approximateDeepEqual} from "./utils/equality";
export {addWidget, getWidgetIdsFromContent} from "./utils/widget-id-utils";
/** @hidden */
export {getWidgetIdsFromContentByType} from "./utils/widget-id-utils";

/** @hidden */
export {default as deepClone} from "./utils/deep-clone";
/** @hidden */
export * as GrapherUtil from "./utils/grapher-util";
export {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "./utils/test-utils";
export {itemHasRationales} from "./utils/item-has-rationales";
/** @hidden */
export {itemHasHints} from "./utils/item-has-hints";
/** @hidden */
export {makeSafeUrl} from "./utils/make-safe-url";
export {removeOrphanedWidgetsFromPerseusItem} from "./utils/remove-orphaned-widgets";

export {
    parseAndMigratePerseusItem,
    parseAndMigratePerseusArticle,
} from "./parse-perseus-json";
/** @hidden */
export {
    parseAndMigrateUserInputMap,
    parseAndMigratePerseusRenderer,
    type ParseFailureDetail,
} from "./parse-perseus-json";

export {isSuccess, isFailure} from "./parse-perseus-json/result";
export {
    type Result,
    type Success,
    type Failure,
} from "./parse-perseus-json/result";

/** @hidden */
export {libVersion} from "./version";

export {Errors} from "./error/errors";
export {PerseusError} from "./error/perseus-error";

export * from "./data-schema";

/** @hidden */
export {pluck, mapObject} from "./utils/objective_";

/** @hidden */
export {default as categorizerLogic} from "./widgets/categorizer";
/** @hidden */
export type {CategorizerDefaultWidgetOptions} from "./widgets/categorizer";
/** @hidden */
export {default as csProgramLogic} from "./widgets/cs-program";
/** @hidden */
export type {CSProgramDefaultWidgetOptions} from "./widgets/cs-program";
/** @hidden */
export {default as definitionLogic} from "./widgets/definition";
/** @hidden */
export type {DefinitionDefaultWidgetOptions} from "./widgets/definition";
/** @hidden */
export {default as dropdownLogic} from "./widgets/dropdown";
/** @hidden */
export type {DropdownDefaultWidgetOptions} from "./widgets/dropdown";
/** @hidden */
export {default as explanationLogic} from "./widgets/explanation";
/** @hidden */
export type {ExplanationDefaultWidgetOptions} from "./widgets/explanation";
/** @hidden */
export {default as expressionLogic} from "./widgets/expression";
/** @hidden */
export type {ExpressionDefaultWidgetOptions} from "./widgets/expression";
/** @hidden */
export {default as deriveExtraKeys} from "./widgets/expression/derive-extra-keys";
/** @hidden */
export {default as gradedGroupLogic} from "./widgets/graded-group";
/** @hidden */
export {default as freeResponseLogic} from "./widgets/free-response";
/** @hidden */
export type {FreeResponseDefaultWidgetOptions} from "./widgets/free-response";
/** @hidden */
export type {GradedGroupDefaultWidgetOptions} from "./widgets/graded-group";
/** @hidden */
export {default as gradedGroupSetLogic} from "./widgets/graded-group-set";
/** @hidden */
export type {GradedGroupSetDefaultWidgetOptions} from "./widgets/graded-group-set";
/** @hidden */
export {default as grapherLogic} from "./widgets/grapher";
/** @hidden */
export type {GrapherDefaultWidgetOptions} from "./widgets/grapher";
/** @hidden */
export {default as groupLogic} from "./widgets/group";
/** @hidden */
export type {GroupDefaultWidgetOptions} from "./widgets/group";
/** @hidden */
export {default as iframeLogic} from "./widgets/iframe";
/** @hidden */
export type {IFrameDefaultWidgetOptions} from "./widgets/iframe";
/** @hidden */
export {default as imageLogic} from "./widgets/image";
/** @hidden */
export type {ImageDefaultWidgetOptions} from "./widgets/image";
/** @hidden */
export {default as inputNumberLogic} from "./widgets/input-number";
/** @hidden */
export type {InputNumberDefaultWidgetOptions} from "./widgets/input-number";
/** @hidden */
export {default as interactionLogic} from "./widgets/interaction";
/** @hidden */
export type {InteractionDefaultWidgetOptions} from "./widgets/interaction";
/** @hidden */
export {default as interactiveGraphLogic} from "./widgets/interactive-graph";
/** @hidden */
export type {InteractiveGraphDefaultWidgetOptions} from "./widgets/interactive-graph";
/** @hidden */
export {default as labelImageLogic} from "./widgets/label-image";
/** @hidden */
export type {LabelImageDefaultWidgetOptions} from "./widgets/label-image";
/** @hidden */
export {default as matcherLogic} from "./widgets/matcher";
/** @hidden */
export type {MatcherDefaultWidgetOptions} from "./widgets/matcher";
/** @hidden */
export {default as matrixLogic} from "./widgets/matrix";
/** @hidden */
export type {MatrixDefaultWidgetOptions} from "./widgets/matrix";
/** @hidden */
export {default as measurerLogic} from "./widgets/measurer";
/** @hidden */
export type {MeasurerDefaultWidgetOptions} from "./widgets/measurer";
/** @hidden */
export {default as numberLineLogic} from "./widgets/number-line";
/** @hidden */
export type {NumberLineDefaultWidgetOptions} from "./widgets/number-line";
/** @hidden */
export {default as numericInputLogic} from "./widgets/numeric-input";
/** @hidden */
export type {NumericInputDefaultWidgetOptions} from "./widgets/numeric-input";
/** @hidden */
export {default as ordererLogic} from "./widgets/orderer";
/** @hidden */
export type {OrdererDefaultWidgetOptions} from "./widgets/orderer";
/** @hidden */
export {default as phetSimulationLogic} from "./widgets/phet-simulation";
/** @hidden */
export type {PhetSimulationDefaultWidgetOptions} from "./widgets/phet-simulation";
/** @hidden */
export {default as plotterLogic} from "./widgets/plotter";
/** @hidden */
export type {PlotterDefaultWidgetOptions} from "./widgets/plotter";
/** @hidden */
export {default as pythonProgramLogic} from "./widgets/python-program";
/** @hidden */
export type {PythonProgramDefaultWidgetOptions} from "./widgets/python-program";
/** @hidden */
export {default as radioLogic} from "./widgets/radio";
/** @hidden */
export type {RadioDefaultWidgetOptions} from "./widgets/radio";
/** @hidden */
export {usesNumCorrect} from "./widgets/radio/radio-util";
/** @hidden */
export {default as sorterLogic} from "./widgets/sorter";
/** @hidden */
export type {SorterDefaultWidgetOptions} from "./widgets/sorter";
/** @hidden */
export {default as tableLogic} from "./widgets/table";
/** @hidden */
export type {TableDefaultWidgetOptions} from "./widgets/table";
/** @hidden */
export {default as videoLogic} from "./widgets/video";
/** @hidden */
export type {VideoDefaultWidgetOptions} from "./widgets/video";

/** @hidden */
export {
    applyDefaultsToWidgets,
    applyDefaultsToWidget,
} from "./widgets/apply-defaults";

/** @hidden */
export {default as getDefaultAnswerArea} from "./utils/get-default-answer-area";
/** @hidden */
export {getDefaultFigureForType} from "./utils/get-default-figure-for-type";
export {default as splitPerseusItem} from "./utils/split-perseus-item";
/** @hidden */
export {splitPerseusItemJSON} from "./utils/split-perseus-item";
/** @hidden */
export {default as Registry} from "./utils/registry";

export type * from "./widgets/logic-export.types";

/** @hidden */
export * as CoreWidgetRegistry from "./widgets/core-widget-registry";

/** @hidden */
export {getOrdererPublicWidgetOptions} from "./widgets/orderer/orderer-util";
/** @hidden */
export type {OrdererPublicWidgetOptions} from "./widgets/orderer/orderer-util";
/** @hidden */
export {getCategorizerPublicWidgetOptions} from "./widgets/categorizer/categorizer-util";
/** @hidden */
export type {CategorizerPublicWidgetOptions} from "./widgets/categorizer/categorizer-util";
/** @hidden */
export {getCSProgramPublicWidgetOptions} from "./widgets/cs-program/cs-program-util";
/** @hidden */
export {getExpressionPublicWidgetOptions} from "./widgets/expression/expression-util";
/** @hidden */
export {getFreeResponsePublicWidgetOptions} from "./widgets/free-response/free-response-util";
/** @hidden */
export type {ExpressionPublicWidgetOptions} from "./widgets/expression/expression-util";
/** @hidden */
export {getGrapherPublicWidgetOptions} from "./widgets/grapher/grapher-util";
/** @hidden */
export type {GrapherPublicWidgetOptions} from "./widgets/grapher/grapher-util";
/** @hidden */
export {getGroupPublicWidgetOptions} from "./widgets/group/group-util";
/** @hidden */
export {
    getInteractiveGraphPublicWidgetOptions,
    type InteractiveGraphPublicWidgetOptions,
} from "./widgets/interactive-graph/interactive-graph-util";
/** @hidden */
export {getLabelImagePublicWidgetOptions} from "./widgets/label-image/label-image-util";
/** @hidden */
export {
    getSorterPublicWidgetOptions,
    shuffleSorter,
} from "./widgets/sorter/sorter-util";
/** @hidden */
export type {SorterPublicWidgetOptions} from "./widgets/sorter/sorter-util";
/** @hidden */
export type {LabelImagePublicWidgetOptions} from "./widgets/label-image/label-image-util";
/** @hidden */
export type {LabelImageMarkerPublicData} from "./widgets/label-image/label-image-util";
/** @hidden */
export {getDropdownPublicWidgetOptions} from "./widgets/dropdown/dropdown-util";
/** @hidden */
export type {DropdownPublicWidgetOptions} from "./widgets/dropdown/dropdown-util";
/** @hidden */
export {getNumericInputPublicWidgetOptions} from "./widgets/numeric-input/numeric-input-util";
/** @hidden */
export {getNumberLinePublicWidgetOptions} from "./widgets/number-line/number-line-util";
/** @hidden */
export type {NumberLinePublicWidgetOptions} from "./widgets/number-line/number-line-util";
/** @hidden */
export {getRadioPublicWidgetOptions} from "./widgets/radio/radio-util";
/** @hidden */
export type {RadioPublicWidgetOptions} from "./widgets/radio/radio-util";
/** @hidden */
export {deriveNumCorrect} from "./widgets/radio/derive-num-correct";
/** @hidden */
export {getTablePublicWidgetOptions} from "./widgets/table/table-util";
/** @hidden */
export {getIFramePublicWidgetOptions} from "./widgets/iframe/iframe-util";
/** @hidden */
export {getMatrixPublicWidgetOptions} from "./widgets/matrix/matrix-util";
/** @hidden */
export type {MatrixPublicWidgetOptions} from "./widgets/matrix/matrix-util";
/** @hidden */
export {getPlotterPublicWidgetOptions} from "./widgets/plotter/plotter-util";
/** @hidden */
export type {PlotterPublicWidgetOptions} from "./widgets/plotter/plotter-util";
/** @hidden */
export {
    getMatcherPublicWidgetOptions,
    shuffleMatcher,
} from "./widgets/matcher/matcher-util";
/** @hidden */
export type {MatcherPublicWidgetOptions} from "./widgets/matcher/matcher-util";
/** @hidden */
export {shuffle, seededRNG, random} from "./utils/random-util";
export {default as PerseusFeatureFlags} from "./feature-flags";
/** @hidden */
export {isFeatureOn} from "./feature-flags";

/** @hidden */
export {traverse} from "./traversal";
export {isItemAccessible} from "./accessibility";
/** @hidden */
export {
    isLabeledSVG,
    getRealImageUrl,
    getBaseUrl,
    getSvgUrl,
    getDataUrl,
    getImageSizeModern,
} from "./utils/util.graphie";

// Generators
/** @hidden */
export {
    generateDefinitionOptions,
    generateDefinitionWidget,
} from "./utils/generators/definition-widget-generator";
/** @hidden */
export {
    generateDropdownOptions,
    generateDropdownWidget,
} from "./utils/generators/dropdown-widget-generator";
/** @hidden */
export {
    generateExplanationOptions,
    generateExplanationWidget,
} from "./utils/generators/explanation-widget-generator";
/** @hidden */
export {
    generateExpressionOptions,
    generateExpressionAnswerForm,
    generateExpressionWidget,
} from "./utils/generators/expression-widget-generator";
/** @hidden */
export {
    generateFreeResponseOptions,
    generateFreeResponseWidget,
} from "./utils/generators/free-response-widget-generator";
/** @hidden */
export {
    generateGradedGroupOptions,
    generateGradedGroupWidget,
} from "./utils/generators/graded-group-widget-generator";
/** @hidden */
export {generateGradedGroupSetWidget} from "./utils/generators/graded-group-set-widget-generator";
/** @hidden */
export {
    generateGroupOptions,
    generateGroupWidget,
} from "./utils/generators/group-widget-generator";
/** @hidden */
export {
    generateImageOptions,
    generateImageWidget,
} from "./utils/generators/image-widget-generator";
/** @hidden */
export {
    generateLabelImageOptions,
    generateLabelImageWidget,
} from "./utils/generators/label-image-widget-generator";
export {
    generateInteractiveGraphOptions,
    generateIGAngleGraph,
    generateIGCircleGraph,
    generateIGLinearGraph,
    generateIGLinearSystemGraph,
    generateIGLogarithmGraph,
    generateIGNoneGraph,
    generateIGPointGraph,
    generateIGPolygonGraph,
    generateIGQuadraticGraph,
    generateIGRayGraph,
    generateIGSegmentGraph,
    generateIGSinusoidGraph,
    generateIGTangentGraph,
    generateIGVectorGraph,
    generateIGLockedPoint,
    generateIGLockedLine,
    generateIGLockedVector,
    generateIGLockedEllipse,
    generateIGLockedPolygon,
    generateIGLockedFunction,
    generateIGLockedLabel,
    generateIGExponentialGraph,
    generateIGAbsoluteValueGraph,
    generateInteractiveGraphWidget,
    generateInteractiveGraphQuestion,
} from "./utils/generators/interactive-graph-widget-generator";
export {generateNumericInputWidget} from "./utils/generators/numeric-input-widget-generator";
/** @hidden */
export {
    generateNumericInputOptions,
    generateNumericInputAnswer,
} from "./utils/generators/numeric-input-widget-generator";
export {generateRadioWidget} from "./utils/generators/radio-widget-generator";
/** @hidden */
export {
    generateRadioOptions,
    generateRadioChoice,
    generateSimpleRadioQuestion,
    generateSimpleRadioItem,
} from "./utils/generators/radio-widget-generator";
/** @hidden */
export {generateVideoWidget} from "./utils/generators/video-widget-generator";

export {
    getAnswersFromWidgets,
    injectWidgets,
} from "./utils/extract-perseus-ai-data";
/** @hidden */
export {getPerseusAIData} from "./utils/extract-perseus-ai-data";

import {registerCoreWidgets} from "./widgets/core-widget-registry";

registerCoreWidgets();
