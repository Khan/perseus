/**
 * Main entry point
 */

export {default as init} from "./init";

export {ApiOptions} from "./perseus-api";
/** @hidden */
export {ClassNames} from "./perseus-api";

/** @hidden */
export {libVersion} from "./version";
/** @hidden */
export {apiVersion} from "./perseus-version";
/** @hidden */
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
/** @hidden */
export {default as widgets} from "./all-widgets";
export {Expression} from "./widgets/expression";
export {default as InputNumber} from "./widgets/input-number";
export {default as NumericInput} from "./widgets/numeric-input";
export {default as Radio} from "./widgets/radio";
export {default as Categorizer} from "./widgets/categorizer";
/** @hidden */
export {default as InteractiveGraphWidget} from "./widgets/interactive-graphs/interactive-graph";
/** @hidden */
export {default as MatrixWidget} from "./widgets/matrix";
/** @hidden */
export {default as TableWidget} from "./widgets/table";
/** @hidden */
export {default as PlotterWidget} from "./widgets/plotter";
/** @hidden */
export {default as GrapherWidget} from "./widgets/grapher";

// Some utils in grapher/utils and scoring don't need to be used outside of
// `perseus`, so only export the stuff that does need to be exposed
import {
    DEFAULT_GRAPHER_PROPS,
    chooseType,
    defaultPlotProps,
    getEquationString,
    typeToButton,
} from "./widgets/grapher/util";

/** @hidden */
export const GrapherUtil = {
    DEFAULT_GRAPHER_PROPS,
    chooseType,
    defaultPlotProps,
    getEquationString,
    typeToButton,
};

/**
 * Misc
 */

/** @hidden */
export * as components from "./components";
/** @hidden */
export {iconChevronDown, iconTrash} from "./icon-paths";
/** @hidden */
export {bodyXsmallBold} from "./styles/global-styles";
export * as Dependencies from "./dependencies";
/** @hidden */
export {Log} from "./logging/log";
export {default as JiptParagraphs} from "./jipt-paragraphs";
export {default as LoadingContext} from "./loading-context";
export {default as MathRenderingContext} from "./math-rendering-context";
export {default as PerseusMarkdown} from "./perseus-markdown";
/** @hidden */
export {interactiveSizes} from "./styles/constants";
/** @hidden */
export {displaySigFigs} from "./sigfigs";
export {DependenciesContext} from "./dependencies";

// Context for managing i18n
export {
    PerseusI18nContextProvider,
    PerseusI18nContext,
} from "./components/i18n-context";
/** @hidden */
export {usePerseusI18n} from "./components/i18n-context";

/**
 * Util
 */
export {default as Util} from "./util";
/** @hidden */
export {default as KhanColors} from "./util/colors";
/** @hidden */
export {default as preprocessTex} from "./util/tex-preprocess";
export {registerAllWidgetsForTesting} from "./util/register-all-widgets-for-testing";
/** @hidden */
export {
    containerSizeClass,
    getInteractiveBoxFromSizeClass,
} from "./util/sizing-utils";
/** @hidden */
export {mathOnlyParser} from "./widgets/interactive-graphs/utils";
export {
    isWrongAnswerSupported,
    shouldHaveIndividualAnswer,
    getCorrectAnswerForWidgetId,
    getAnswerFromUserInput,
    getImagesWithoutAltData,
} from "./util/extract-perseus-data";
/** @hidden */
export {
    isWidgetIdInContent,
    getValidWidgetIds,
} from "./util/extract-perseus-data";

export {generateTestCategorizerWidget} from "./util/test-utils";
export {
    getWidgetTypeByWidgetId,
    getWidgetSubTypeByWidgetId,
} from "./widget-type-utils";
/** @hidden */
export {
    contentHasWidgetType,
    getWidgetFromWidgetMap,
    getWidgetsFromWidgetMap,
} from "./widget-type-utils";
export {convertWidgetNameToEnum} from "./util/widget-enum-utils";
/** @hidden */
export {
    getAbsoluteValueCoords,
    getCircleCoords,
    getExponentialCoords,
    getLogarithmCoords,
    getLineCoords,
    getLinearSystemCoords,
    getPointCoords,
    getPolygonCoords,
    getSegmentCoords,
    getSinusoidCoords,
    getTangentCoords,
    getQuadraticCoords,
    getAngleCoords,
} from "./widgets/interactive-graphs/reducer/initialize-graph-state";
export {
    default as UserInputManager,
    deriveUserInputFromSerializedState,
} from "./user-input-manager";

// These exports are to support shared functionality between Perseus and Graphie2000
/** @hidden */
export {parseDataFromJSONP} from "./util/graphie-utils";
export type {
    /** @hidden */
    GraphieData,
    /** @hidden */
    GraphieLabel,
    /** @hidden */
    GraphieRange,
} from "./util/graphie-utils";
/** @hidden */
export {extractWidgetIds} from "./util/extract-widget-ids";

/**
 * Mixins
 */

/** @hidden */
export * as Changeable from "./mixins/changeable";
/** @hidden */
export {default as EditorJsonify} from "./mixins/editor-jsonify";
/** @hidden */
export {excludeDenylistKeys} from "./mixins/widget-prop-denylist";

/**
 * Types
 */
export type {ILogger, LogErrorOptions} from "./logging/log";
export type {ServerItemRenderer as ServerItemRendererComponent} from "./server-item-renderer";
export type {
    APIOptions,
    /** @hidden */
    APIOptionsWithDefaults,
    /** @hidden */
    ChangeHandler,
    /** @hidden */
    DeviceType,
    /** @hidden */
    DomInsertCheckFn,
    /** @hidden */
    EditorMode,
    /** @hidden */
    FocusPath,
    GenerateUrlArgs,
    /** @hidden */
    GraphieLabelElement,
    /** @hidden */
    ImageDict,
    /** @hidden */
    ImageUploader,
    /** @hidden */
    JiptLabelStore,
    /** @hidden */
    JiptRenderer,
    PerseusDependencies,
    PerseusDependenciesV2,
    /** @hidden */
    VideoData,
    /** @hidden */
    VideoKind,
    /** @hidden */
    WidgetExports,
    /** @hidden */
    SharedRendererProps,
} from "./types";
/** @hidden */
export type {ParsedValue} from "./util";
/** @hidden */
export type {Coord} from "./interactive2/types";
export type {
    RendererPromptJSON,
    WidgetPromptJSON,
} from "./widget-ai-utils/prompt-types";
export type {CategorizerPromptJSON} from "./widget-ai-utils/categorizer/categorizer-ai-utils";
export type {DefinitionPromptJSON} from "./widget-ai-utils/definition/definition-ai-utils";
export type {DropdownPromptJSON} from "./widget-ai-utils/dropdown/dropdown-ai-utils";
export type {ExplanationPromptJSON} from "./widget-ai-utils/explanation/explanation-ai-utils";
export type {ExpressionPromptJSON} from "./widget-ai-utils/expression/expression-ai-utils";
export type {GradedGroupPromptJSON} from "./widget-ai-utils/graded-group/graded-group-ai-utils";
export type {GradedGroupSetPromptJSON} from "./widget-ai-utils/graded-group-set/graded-group-set-ai-utils";
export type {GrapherPromptJSON} from "./widget-ai-utils/grapher/grapher-ai-utils";
export type {GroupPromptJSON} from "./widget-ai-utils/group/group-ai-utils";
export type {ImagePromptJSON} from "./widget-ai-utils/image/image-ai-utils";
export type {InputNumberPromptJSON} from "./widget-ai-utils/input-number/input-number-ai-utils";
export type {InteractiveGraphPromptJSON} from "./widget-ai-utils/interactive-graph/interactive-graph-ai-utils";
export type {LabelImagePromptJSON} from "./widget-ai-utils/label-image/label-image-ai-utils";
export type {MatcherPromptJSON} from "./widget-ai-utils/matcher/matcher-ai-utils";
export type {MatrixPromptJSON} from "./widget-ai-utils/matrix/matrix-ai-utils";
export type {NumberLinePromptJSON} from "./widget-ai-utils/number-line/number-line-ai-utils";
export type {NumericInputPromptJSON} from "./widget-ai-utils/numeric-input/prompt-utils";
export type {OrdererPromptJSON} from "./widget-ai-utils/orderer/orderer-ai-utils";
export type {RadioPromptJSON} from "./widget-ai-utils/radio/radio-ai-utils";
export type {SorterPromptJSON} from "./widget-ai-utils/sorter/sorter-ai-utils";
export type {UnsupportedWidgetPromptJSON} from "./widget-ai-utils/unsupported-widget";
