/**
 * Main entry point
 */

import version from './version';

export {default as init} from "./init.js";

export {ApiOptions, ClassNames} from "./perseus-api.jsx";

export const apiVersion = version.apiVersion;
export const itemDataVersion = version.itemDataVersion;
export {default as itemVersion} from "./item-version.js";

/**
 * Renderers
 */
export {default as ArticleRenderer} from "./article-renderer.jsx";
export {default as ItemRenderer} from "./item-renderer.jsx";
export {default as ServerItemRenderer} from "./server-item-renderer.jsx";
export {default as HintsRenderer} from "./hints-renderer.jsx";
export {default as HintRenderer} from "./hint-renderer.jsx";
export {default as Renderer} from "./renderer.jsx";

/**
 * Widgets
 */
export * as Widgets from "./widgets.js";
export {default as widgets} from "./all-widgets.js";
export {Expression} from "./widgets/expression.jsx";
export {default as InputNumber} from "./widgets/input-number.jsx";
export {default as NumericInput} from "./widgets/numeric-input.jsx";
export {default as Radio} from "./widgets/radio.jsx";
export {default as BaseRadio} from "./widgets/radio/base-radio.jsx";
export {default as Categorizer} from "./widgets/categorizer.jsx";
export {default as InteractiveGraphWidget} from "./widgets/interactive-graph.jsx";
export {default as TransformerWidget} from "./widgets/transformer.jsx";
export {default as MatrixWidget} from "./widgets/matrix.jsx";
export {default as TableWidget} from "./widgets/table.jsx";
export {default as PlotterWidget} from "./widgets/plotter.jsx";
export {default as GrapherWidget} from "./widgets/grapher.jsx";

export {default as ArrowPicker} from "./widgets/interaction/arrow-picker.jsx";
export {default as ColorPicker} from "./widgets/interaction/color-picker.jsx";
export {default as DashPicker} from "./widgets/interaction/dash-picker.jsx";
export {default as ElementContainer} from "./widgets/interaction/element-container.jsx";
export * as GrapherUtil from "./widgets/grapher/util.jsx";

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
export {default as PerseusMarkdown} from "./perseus-markdown.jsx";
export {traverse} from "./traversal.jsx";
export {isItemRenderableByVersion} from "./renderability.jsx";
export {violatingWidgets} from "./a11y.js";
export {interactiveSizes} from "./styles/constants.js";
export {displaySigFigs} from "./sigfigs.jsx";

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
export * as Changeable from "./mixins/changeable.jsx";
export {default as EditorJsonify} from "./mixins/editor-jsonify.jsx";
export {default as WidgetJsonifyDeprecated} from "./mixins/widget-jsonify-deprecated.jsx";
export {default as WIDGET_PROP_DENYLIST} from "./mixins/widget-prop-denylist.js";

/**
 * Types
 */
export type {PerseusOptions} from "./init.js";
export type {ILogger, LogErrorOptions, ErrorKind} from "./logging/log.js";
export type {ServerItemRenderer as ServerItemRendererComponent} from "./server-item-renderer.jsx";
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
