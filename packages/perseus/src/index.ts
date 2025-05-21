/**
 * Main entry point
 */

export {default as init} from "./init";

export {ApiOptions, ClassNames} from "./perseus-api";

export {libVersion} from "./version";
export {apiVersion} from "./perseus-version";
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

// Some utils in grapher/utils and scoring don't need to be used outside of
// `perseus`, so only export the stuff that does need to be exposed
import {keScoreFromPerseusScore} from "./util/scoring";
import {
    DEFAULT_GRAPHER_PROPS,
    chooseType,
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

/**
 * Misc
 */
export * as components from "./components";
export {iconChevronDown, iconTrash} from "./icon-paths";
export {bodyXsmallBold} from "./styles/global-styles";
export * as Dependencies from "./dependencies";
export {Log} from "./logging/log";
export {default as JiptParagraphs} from "./jipt-paragraphs";
export {default as LoadingContext} from "./loading-context";
export {default as PerseusMarkdown} from "./perseus-markdown";
export {isItemRenderableByVersion} from "./renderability";
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
export {
    containerSizeClass,
    getInteractiveBoxFromSizeClass,
} from "./util/sizing-utils";
export {mathOnlyParser} from "./widgets/interactive-graphs/utils";
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
export {
    /**
     * @deprecated - import this function from perseus-core instead
     */
    parsePerseusItem,
    /**
     * @deprecated - import this function from perseus-core instead
     */
    parseAndMigratePerseusItem,
    /**
     * @deprecated - import this function from perseus-core instead
     */
    parseAndMigratePerseusArticle,
    /**
     * @deprecated - import this function from perseus-core instead
     */
    isSuccess,
    /**
     * @deprecated - import this function from perseus-core instead
     */
    isFailure,
} from "@khanacademy/perseus-core";

export {
    generateTestRadioWidget,
    generateTestInteractiveGraphWidget,
    generateTestCategorizerWidget,
    generateTestExpressionWidget,
    generateTestNumericInputWidget,
} from "./util/test-utils";
export {
    getWidgetTypeByWidgetId,
    getWidgetSubTypeByWidgetId,
    contentHasWidgetType,
    getWidgetsMapFromItemData,
    getWidgetFromWidgetMap,
    getWidgetsFromWidgetMap,
} from "./widget-type-utils";
export {convertWidgetNameToEnum} from "./util/widget-enum-utils";
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

export {makeSafeUrl} from "./widgets/phet-simulation";

// These exports are to support shared functionality between Perseus and Graphie2000
export {parseDataFromJSONP} from "./util/graphie-utils";
export type {
    GraphieData,
    GraphieLabel,
    GraphieRange,
} from "./util/graphie-utils";

/**
 * Mixins
 */
export * as Changeable from "./mixins/changeable";
export {default as EditorJsonify} from "./mixins/editor-jsonify";
export {default as WIDGET_PROP_DENYLIST} from "./mixins/widget-prop-denylist";

/**
 * Types
 */
export type {ILogger, LogErrorOptions} from "./logging/log";
export type {ServerItemRenderer as ServerItemRendererComponent} from "./server-item-renderer";
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
    VideoData,
    VideoKind,
    WidgetExports,
    SharedRendererProps,
} from "./types";
export type {ParsedValue} from "./util";
export type {
    /**
     * @deprecated - import this function from perseus-core instead
     */
    Result,
    /**
     * @deprecated - import this function from perseus-core instead
     */
    Success,
    /**
     * @deprecated - import this function from perseus-core instead
     */
    Failure,
} from "@khanacademy/perseus-core";
export type {Coord} from "./interactive2/types";
export type {
    RendererPromptJSON,
    WidgetPromptJSON,
} from "./widget-ai-utils/prompt-types";
