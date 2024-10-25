/**
 * Main entry point
 */

export {default as init} from "./init";

export {ApiOptions, ClassNames} from "./perseus-api";

export {libVersion} from "./version";
export {apiVersion, itemDataVersion} from "./perseus-version";
export {default as itemVersion} from "./item-version";

/**
 * Renderers
 */
export {default as ArticleRenderer} from "./article-renderer";
export {default as ServerItemRenderer} from "./server-item-renderer";
export {default as HintsRenderer} from "./hints-renderer";
export {default as HintRenderer} from "./hint-renderer";
export {default as Renderer} from "./renderer";

/**
 * Widgets
 */
export * as Widgets from "./widgets";
export {default as widgets} from "./all-widgets";
export {Expression} from "./widgets/expression";
export {default as InputNumber} from "./widgets/input-number";
export {default as NumericInput} from "./widgets/numeric-input";
export {default as Radio} from "./widgets/radio";
export {default as BaseRadio} from "./widgets/radio/base-radio";
export {default as Categorizer} from "./widgets/categorizer";
export {default as InteractiveGraphWidget} from "./widgets/interactive-graph";
export {default as MatrixWidget} from "./widgets/matrix";
export {default as TableWidget} from "./widgets/table";
export {default as PlotterWidget} from "./widgets/plotter";
export {default as GrapherWidget} from "./widgets/grapher";

export * as GrapherUtil from "./widgets/grapher/util";

/**
 * Misc
 */
export * as components from "./components";
export * as constants from "./components/constants";
// TODO(FEI-4504): Replace globalStyles with wonder-blocks where possible
export * as globalStyles from "./styles/global-styles";
export * as icons from "./icon-paths";
export * as Dependencies from "./dependencies";
export {Log} from "./logging/log";
export {default as JiptParagraphs} from "./jipt-paragraphs";
export {default as KhanMath} from "./util/math";
export {default as LoadingContext} from "./loading-context";
export {default as mediaQueries} from "./styles/media-queries";
export {default as PerseusMarkdown} from "./perseus-markdown";
export {
    PerseusExpressionAnswerFormConsidered,
    plotterPlotTypes,
    ItemExtras,
    lockedFigureColors,
    lockedFigureFillStyles,
} from "./perseus-types";
export {traverse} from "./traversal";
export {isItemRenderableByVersion} from "./renderability";
export {violatingWidgets} from "./a11y";
export {interactiveSizes} from "./styles/constants";
export {displaySigFigs} from "./sigfigs";

// Context for managing i18n
export {
    PerseusI18nContextProvider,
    PerseusI18nContext,
    usePerseusI18n,
} from "./components/i18n-context";

/**
 * Util
 */
export {default as Util} from "./util";
export {default as KhanColors} from "./util/colors";
export {default as preprocessTex} from "./util/tex-preprocess";
export {registerAllWidgetsForTesting} from "./util/register-all-widgets-for-testing";
export * as SizingUtils from "./util/sizing-utils";
export {
    getAnswersFromWidgets,
    injectWidgets,
    isWrongAnswerSupported,
    shouldHaveIndividualAnswer,
    isWidgetIdInContent,
    getValidWidgetIds,
    getCorrectAnswerForWidgetId,
    getAnswerFromUserInput,
    getImagesWithoutAltData,
} from "./util/extract-perseus-data";
export {parsePerseusItem} from "./util/parse-perseus-json";
export {
    generateTestPerseusItem,
    genericPerseusItemData,
    generateTestRadioWidget,
    generateTestInteractiveGraphWidget,
    generateTestCategorizerWidget,
    generateTestExpressionWidget,
    generateTestNumericInputWidget,
} from "./util/test-utils";
export {
    getWidgetTypeByWidgetId,
    contentHasWidgetType,
    getWidgetIdsFromContent,
    getWidgetIdsFromContentByType,
    getWidgetsMapFromItemData,
    getWidgetFromWidgetMap,
    getWidgetsFromWidgetMap,
} from "./widget-type-utils";
export {convertWidgetNameToEnum} from "./util/widget-enum-utils";
export {addWidget, QUESTION_WIDGETS} from "./util/snowman-utils";
export {
    getCircleCoords,
    getLineCoords,
    getLinearSystemCoords,
    getPointCoords,
    getPolygonCoords,
    getSegmentCoords,
    getSinusoidCoords,
    getQuadraticCoords,
    getAngleCoords,
} from "./widgets/interactive-graphs/reducer/initialize-graph-state";
// This export is to support necessary functionality in the perseus-editor package.
// It should be removed if widgets and editors become colocated.
export {getClockwiseAngle} from "./widgets/interactive-graphs/math";

export {makeSafeUrl} from "./widgets/phet-simulation";

/**
 * Mixins
 */
export * as Changeable from "./mixins/changeable";
export {default as EditorJsonify} from "./mixins/editor-jsonify";
export {default as WIDGET_PROP_DENYLIST} from "./mixins/widget-prop-denylist";

/**
 * Types
 */
export type {PerseusOptions} from "./init";
export type {ILogger, LogErrorOptions} from "./logging/log";
export type {ServerItemRenderer as ServerItemRendererComponent} from "./server-item-renderer";
export type {
    Alignment,
    APIOptions,
    APIOptionsWithDefaults,
    ChangeHandler,
    DeviceType,
    DomInsertCheckFn,
    EditorMode,
    FocusPath,
    ImageDict,
    ImageUploader,
    JiptLabelStore,
    JiptRenderer,
    PerseusDependencies,
    PerseusScore,
    Version,
    VideoData,
    VideoKind,
    WidgetExports,
    SharedRendererProps,
} from "./types";
export type {ParsedValue} from "./util";
export type {
    Hint,
    LegacyButtonSets,
    LockedFigure,
    LockedFigureColor,
    LockedFigureFillType,
    LockedFigureType,
    LockedPointType,
    LockedLineType,
    LockedVectorType,
    LockedEllipseType,
    LockedPolygonType,
    LockedFunctionType,
    LockedLabelType,
    LockedLineStyle,
    PerseusGraphType,
    PerseusAnswerArea,
    PerseusExpressionWidgetOptions,
    // Utility types
    Range,
    Size,
    CollinearTuple,
    MathFormat,
    InputNumberWidget, // TODO(jeremy): remove?
    // Widget configuration types
    PerseusImageBackground,
    PerseusInputNumberWidgetOptions,
    PerseusInteractiveGraphWidgetOptions,
    PerseusItem,
    PerseusPhetSimulationWidgetOptions,
    PerseusPlotterWidgetOptions,
    PerseusPythonProgramWidgetOptions,
    PerseusRadioWidgetOptions,
    PerseusExampleWidgetOptions,
    PerseusSimpleMarkdownTesterWidgetOptions,
    PerseusRenderer,
    PerseusWidget,
    PerseusWidgetsMap,
    MultiItem,
} from "./perseus-types";
export type {Coord} from "./interactive2/types";
export type {MarkerType} from "./widgets/label-image/types";

/**
 * Multi-items
 */
export {default as MultiItems} from "./multi-items";
export {buildEmptyItemTreeForShape, itemToTree} from "./multi-items/items";
export {default as shapes} from "./multi-items/shapes";
export {buildMapper} from "./multi-items/trees";

export type {
    ContentNode,
    HintNode,
    Item,
    ItemTree,
    ItemObjectNode,
    ItemArrayNode,
    TagsNode,
} from "./multi-items/item-types";
export type {
    Shape,
    ArrayShape,
    ObjectShape,
    ContentShape,
    HintShape,
    TagsShape,
} from "./multi-items/shape-types";
export type {Path} from "./multi-items/trees";
