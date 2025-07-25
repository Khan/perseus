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
export {default as Radio} from "./widgets/radio";
export {default as BaseRadio} from "./widgets/radio/base-radio";
export {default as Categorizer} from "./widgets/categorizer";
export {default as InteractiveGraphWidget} from "./widgets/interactive-graph";
export {default as PlotterWidget} from "./widgets/plotter";
export {default as GrapherWidget} from "./widgets/grapher";

export {default as ArrowPicker} from "./widgets/interaction/arrow-picker";
export {default as ColorPicker} from "./widgets/interaction/color-picker";
export {default as DashPicker} from "./widgets/interaction/dash-picker";
export {default as ElementContainer} from "./widgets/interaction/element-container";
export * as GrapherUtil from "./widgets/grapher/util";

/**
 * Misc
 */
export * as components from "./components";
export * as constants from "./components/constants";
// TODO(FEI-4504): Replace globalStyles with wonder-blocks where possible
export * as globalStyles from "./styles/global-styles";
// TODO(FEI-4504): Replace globalStyles with wonder-blocks where possible
export * as globalConstants from "./styles/global-constants";
export * as icons from "./icon-paths";
export * as Dependencies from "./dependencies";
export {Errors, Log} from "./logging/log";
export {PerseusError} from "./perseus-error";
export {default as JiptParagraphs} from "./jipt-paragraphs";
export {default as KhanMath} from "./util/math";
export {default as LoadingContext} from "./loading-context";
export {default as mediaQueries} from "./styles/media-queries";
export {default as PerseusMarkdown} from "./perseus-markdown";
export {
    PerseusExpressionAnswerFormConsidered,
    plotterPlotTypes,
    ItemExtras,
} from "./perseus-types";
export {traverse} from "./traversal";
export {isItemRenderableByVersion} from "./renderability";
export {violatingWidgets} from "./a11y";
export {interactiveSizes} from "./styles/constants";
export {displaySigFigs} from "./sigfigs";

/**
 * Util
 */
export {default as Util} from "./util";
export {default as KhanColors} from "./util/colors";
export {default as preprocessTex} from "./util/katex-preprocess";
export {registerAllWidgetsForTesting} from "./util/register-all-widgets-for-testing";
export * as SizingUtils from "./util/sizing-utils";

/**
 * Mixins
 */
export * as Changeable from "./mixins/changeable";
export {default as EditorJsonify} from "./mixins/editor-jsonify";
export {default as WidgetJsonifyDeprecated} from "./mixins/widget-jsonify-deprecated";
export {default as WIDGET_PROP_DENYLIST} from "./mixins/widget-prop-denylist";

/**
 * Types
 */
export type {PerseusOptions} from "./init";
export type {ILogger, LogErrorOptions, ErrorKind} from "./logging/log";
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
    Hint,
    ImageDict,
    ImageUploader,
    JiptLabelStore,
    JiptRenderer,
    PerseusDependencies,
    PerseusScore,
    Version,
    VideoData,
    VideoKind,
    WidgetDict,
    WidgetExports,
    WidgetInfo,
} from "./types";
export type {ParsedValue} from "./util";
export type {
    InputNumberWidget,
    MathFormat,
    PerseusAnswerArea,
    PerseusExpressionWidgetOptions,
    PerseusImageBackground,
    PerseusInteractiveGraphWidgetOptions,
    PerseusItem,
    PerseusPlotterWidgetOptions,
    PerseusRadioWidgetOptions,
    PerseusRenderer,
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
