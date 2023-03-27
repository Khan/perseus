/**
 * Main entry point
 */

import version from "./version";

export {default as init} from "./init.js";

export {ApiOptions, ClassNames} from "./perseus-api";

export const apiVersion = version.apiVersion;
export const itemDataVersion = version.itemDataVersion;
export {default as itemVersion} from "./item-version.js";

/**
 * Renderers
 */
export {default as ArticleRenderer} from "./article-renderer";
export {default as ItemRenderer} from "./item-renderer";
export {default as ServerItemRenderer} from "./server-item-renderer";
export {default as HintsRenderer} from "./hints-renderer";
export {default as HintRenderer} from "./hint-renderer";
export {default as Renderer} from "./renderer";

/**
 * Widgets
 */
export * as Widgets from "./widgets.js";
export {default as widgets} from "./all-widgets.js";
export {Expression} from "./widgets/expression";
export {default as InputNumber} from "./widgets/input-number";
export {default as NumericInput} from "./widgets/numeric-input";
export {default as Radio} from "./widgets/radio";
export {default as BaseRadio} from "./widgets/radio/base-radio";
export {default as Categorizer} from "./widgets/categorizer";
export {default as InteractiveGraphWidget} from "./widgets/interactive-graph";
export {default as TransformerWidget} from "./widgets/transformer";
export {default as MatrixWidget} from "./widgets/matrix";
export {default as TableWidget} from "./widgets/table";
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
export * as components from "./components.js";
export * as constants from "./components/constants.js";
// TODO(FEI-4504): Replace globalStyles with wonder-blocks where possible
export * as globalStyles from "./styles/global-styles.js";
// TODO(FEI-4504): Replace globalStyles with wonder-blocks where possible
export * as globalConstants from "./styles/global-constants.js";
export * as icons from "./icon-paths.js";
export * as Dependencies from "./dependencies.js";
export {Errors, Log} from "./logging/log.js";
export {PerseusError} from "./perseus-error.js";
export {default as JiptParagraphs} from "./jipt-paragraphs.js";
export {default as KeypadContext} from "./keypad-context.js";
export {default as KhanMath} from "./util/math.js";
export {default as LoadingContext} from "./loading-context.js";
export {default as mediaQueries} from "./styles/media-queries.js";
export {default as PerseusMarkdown} from "./perseus-markdown";
export {traverse} from "./traversal";
export {isItemRenderableByVersion} from "./renderability";
export {violatingWidgets} from "./a11y.js";
export {interactiveSizes} from "./styles/constants.js";
export {displaySigFigs} from "./sigfigs";

/**
 * Util
 */
export {default as Util} from "./util.js";
export {default as KhanColors} from "./util/colors.js";
export {default as preprocessTex} from "./util/katex-preprocess.js";
export {registerAllWidgetsForTesting} from "./util/register-all-widgets-for-testing.js";
export * as SizingUtils from "./util/sizing-utils.js";

/**
 * Mixins
 */
export * as Changeable from "./mixins/changeable";
export {default as EditorJsonify} from "./mixins/editor-jsonify";
export {default as WidgetJsonifyDeprecated} from "./mixins/widget-jsonify-deprecated";
export {default as WIDGET_PROP_DENYLIST} from "./mixins/widget-prop-denylist.js";

/**
 * Types
 */
export type {PerseusOptions} from "./init.js";
export type {ILogger, LogErrorOptions, ErrorKind} from "./logging/log.js";
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
    KEScore,
    LinterContextProps,
    PerseusDependencies,
    PerseusScore,
    RendererInterface,
    Version,
    VideoData,
    VideoKind,
    WidgetDict,
    WidgetExports,
    WidgetInfo,
} from "./types.js";
export type {ParsedValue} from "./util.js";
export type {
    MathFormat,
    InputNumberWidget,
    PerseusRadioWidgetOptions,
    PerseusRenderer,
} from "./perseus-types.js";
export type {Coord} from "./interactive2/types.js";
export type {MarkerType} from "./widgets/label-image/types.js";

/**
 * Multi-items
 */
export {default as MultiItems} from "./multi-items.js";
export {buildEmptyItemTreeForShape, itemToTree} from "./multi-items/items.js";
export {default as shapes} from "./multi-items/shapes.js";
export {buildMapper} from "./multi-items/trees.js";

export type {
    ContentNode,
    HintNode,
    Item,
    ItemTree,
    ItemObjectNode,
    ItemArrayNode,
    TagsNode,
} from "./multi-items/item-types.js";
export type {
    Shape,
    ArrayShape,
    ObjectShape,
    ContentShape,
    HintShape,
    TagsShape,
} from "./multi-items/shape-types.js";
export type {Path} from "./multi-items/trees.js";
