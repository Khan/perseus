/**
 * Main entry point
 */

export {default as widgets} from "./all-widgets";
/**
 * Renderers
 */
export {default as ArticleRenderer} from "./article-renderer";
export {default as HintRenderer} from "./hint-renderer";
export {default as HintsRenderer} from "./hints-renderer";
export {default as init} from "./init";
export {default as itemVersion} from "./item-version";
export {ApiOptions, ClassNames} from "./perseus-api";
export {apiVersion, itemDataVersion} from "./perseus-version";
export {default as Renderer} from "./renderer";
export {default as ServerItemRenderer} from "./server-item-renderer";
export {libVersion} from "./version";
/**
 * Widgets
 */
export * as Widgets from "./widgets";
export {default as Categorizer} from "./widgets/categorizer";
export {Expression} from "./widgets/expression";
export {default as GrapherWidget} from "./widgets/grapher";
export {default as InputNumber} from "./widgets/input-number";
export {default as InteractiveGraphWidget} from "./widgets/interactive-graph";
export {default as MatrixWidget} from "./widgets/matrix";
export {default as NumericInput} from "./widgets/numeric-input";
export {default as PlotterWidget} from "./widgets/plotter";
export {default as Radio} from "./widgets/radio";
export {default as BaseRadio} from "./widgets/radio/base-radio";
export {default as TableWidget} from "./widgets/table";

// Some utils in grapher/utils and scoring don't need to be used outside of
// `perseus`, so only export the stuff that does need to be exposed
import {keScoreFromPerseusScore} from "./util/scoring";
import {
    chooseType,
    DEFAULT_GRAPHER_PROPS,
    defaultPlotProps,
    getEquationString,
    typeToButton,
} from "./widgets/grapher/util";

export const GrapherUtil = {
    DEFAULT_GRAPHER_PROPS,
    chooseType,
    defaultPlotProps,
    getEquationString,
    typeToButton,
};

export const ScoringUtil = {
    keScoreFromPerseusScore,
};

export type {
    /**
     * @deprecated - import this function from perseus-core instead
     */
    Failure,
    /**
     * @deprecated - import this function from perseus-core instead
     */
    Result,
    /**
     * @deprecated - import this function from perseus-core instead
     */
    Success,
} from "@khanacademy/perseus-core";
export {
    /**
     * @deprecated - import this function from perseus-core instead
     */
    isFailure,
    /**
     * @deprecated - import this function from perseus-core instead
     */
    isSuccess,
    /**
     * @deprecated - import this function from perseus-core instead
     */
    parseAndMigratePerseusArticle,
    /**
     * @deprecated - import this function from perseus-core instead
     */
    parseAndMigratePerseusItem,
    /**
     * @deprecated - import this function from perseus-core instead
     */
    parsePerseusItem,
} from "@khanacademy/perseus-core";
export {violatingWidgets} from "./a11y";
/**
 * Misc
 */
export * as components from "./components";
// Context for managing i18n
export {
    PerseusI18nContext,
    PerseusI18nContextProvider,
    usePerseusI18n,
} from "./components/i18n-context";
export * as Dependencies from "./dependencies";
export {iconChevronDown, iconTrash} from "./icon-paths";
export type {Coord} from "./interactive2/types";
export {default as JiptParagraphs} from "./jipt-paragraphs";
export {default as LoadingContext} from "./loading-context";
/**
 * Types
 */
export type {ILogger, LogErrorOptions} from "./logging/log";
export {Log} from "./logging/log";
/**
 * Mixins
 */
export * as Changeable from "./mixins/changeable";
export {default as EditorJsonify} from "./mixins/editor-jsonify";
export {default as WIDGET_PROP_DENYLIST} from "./mixins/widget-prop-denylist";
export {default as PerseusMarkdown} from "./perseus-markdown";
export {isItemRenderableByVersion} from "./renderability";
export type {ServerItemRenderer as ServerItemRendererComponent} from "./server-item-renderer";
export {displaySigFigs} from "./sigfigs";
export {interactiveSizes} from "./styles/constants";
export {bodyXsmallBold} from "./styles/global-styles";
export {default as mediaQueries} from "./styles/media-queries";
export {traverse} from "./traversal";
export type {
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
    PerseusDependenciesV2,
    SharedRendererProps,
    VideoData,
    VideoKind,
    WidgetExports,
} from "./types";
export type {ParsedValue} from "./util";
/**
 * Util
 */
export {default as Util} from "./util";
export {default as KhanColors} from "./util/colors";
export {
    getAnswerFromUserInput,
    getAnswersFromWidgets,
    getCorrectAnswerForWidgetId,
    getImagesWithoutAltData,
    getValidWidgetIds,
    injectWidgets,
    isWidgetIdInContent,
    isWrongAnswerSupported,
    shouldHaveIndividualAnswer,
} from "./util/extract-perseus-data";
export type {
    GraphieData,
    GraphieLabel,
    GraphieRange,
} from "./util/graphie-utils";
// These exports are to support shared functionality between Perseus and Graphie2000
export {parseDataFromJSONP} from "./util/graphie-utils";
export {registerAllWidgetsForTesting} from "./util/register-all-widgets-for-testing";
export {
    containerSizeClass,
    getInteractiveBoxFromSizeClass,
} from "./util/sizing-utils";
export {
    generateTestCategorizerWidget,
    generateTestExpressionWidget,
    generateTestInteractiveGraphWidget,
    generateTestNumericInputWidget,
    generateTestPerseusItem,
    generateTestRadioWidget,
    genericPerseusItemData,
} from "./util/test-utils";
export {default as preprocessTex} from "./util/tex-preprocess";
export {convertWidgetNameToEnum} from "./util/widget-enum-utils";
export type {
    RendererPromptJSON,
    WidgetPromptJSON,
} from "./widget-ai-utils/prompt-types";
export {
    contentHasWidgetType,
    getWidgetFromWidgetMap,
    getWidgetSubTypeByWidgetId,
    getWidgetsFromWidgetMap,
    getWidgetsMapFromItemData,
    getWidgetTypeByWidgetId,
} from "./widget-type-utils";
export {
    getAngleCoords,
    getCircleCoords,
    getLinearSystemCoords,
    getLineCoords,
    getPointCoords,
    getPolygonCoords,
    getQuadraticCoords,
    getSegmentCoords,
    getSinusoidCoords,
} from "./widgets/interactive-graphs/reducer/initialize-graph-state";
export {mathOnlyParser} from "./widgets/interactive-graphs/utils";
export {makeSafeUrl} from "./widgets/phet-simulation";
