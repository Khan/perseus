// @flow

// eslint-disable-next-line import/no-unresolved
import typeof katex from "katex";
// eslint-disable-next-line import/no-unresolved
import * as React from "react";

import type {SerializedHighlightSet} from "./components/highlighting/types.js";
import type {ILogger} from "./logging/log.js";
import type {Item} from "./multi-items/item-types.js";
import type {PerseusWidget} from "./perseus-types.js";
import type {SizeClass} from "./util/sizing-utils.js";
import type {Result} from "@khanacademy/wonder-blocks-data";

export type FocusPath = ?$ReadOnlyArray<string>;

type State = $FlowFixMe;

export interface RendererInterface {
    getSerializedState(): State;
    restoreSerializedState(state: State, callback?: () => void): void;
    scoreInput(): KEScore;
    blur(): void;
    focus(): ?boolean;
    props: any;
}

export type Dimensions = {|
    width?: number,
    height?: number,
|};

export type DeviceType = "phone" | "tablet" | "desktop";

// TODO(CP-4839): Create a proper type for Widget
// Is this the same as the Widget type in `renderer.jsx`?
export type Widget = $FlowFixMe;
export type WidgetDict = {[name: string]: Widget, ...};
export type ImageDict = {[url: string]: Dimensions, ...};

export type PerseusScore =
    | {|
          type: "invalid",
          message?: ?string,
          suppressAlmostThere?: ?boolean,
      |}
    | {|
          type: "points",
          earned: number,
          total: number,
          message?: ?string,
      |};

export type KEScore = {|
    empty: boolean,
    correct: boolean,
    message?: ?string,
    suppressAlmostThere?: ?boolean,
    guess: $FlowFixMe,
    state: $FlowFixMe,
|};

export type Hint = {|
    widgets: WidgetDict,
    content: string, // JSON string
    images: ImageDict,
    replace?: boolean,
|};

export type Version = {|
    major: number,
    minor: number,
|};

export type EditorMode = "edit" | "preview" | "json";

export type ChoiceState = {|
    selected: boolean,
    crossedOut: boolean,
    highlighted: boolean,
    rationaleShown: boolean,
    correctnessShown: boolean,
    previouslyAnswered: boolean,
    readOnly: boolean,
|};

export type ChangeHandler = (
    {|
        hints?: $ReadOnlyArray<Hint>,
        replace?: boolean,
        content?: string,
        widgets?: WidgetDict,
        images?: ImageDict,

        // used only in EditorPage
        question?: $FlowFixMe,
        answerArea?: $FlowFixMe,
        itemDataVersion?: Version,

        // used in MutirenderEditor
        item?: Item,
        editorMode?: EditorMode,
        jsonMode?: boolean,

        // perseus-all-package/widgets/unit.jsx
        value?: $FlowFixMe,

        // widgets/radio/widget.jsx
        choiceStates?: $ReadOnlyArray<ChoiceState>,

        // widgets/numeric-input.jsx
        currentValue?: string,

        // perseus-all-package/widgets/dropdown.jsx
        selected?: number,

        // perseus-all-package/widgets/transformer.jsx
        tools?: $ReadOnlyArray<$FlowFixMe>,
        transformations?: $ReadOnlyArray<$FlowFixMe>,

        highlights?: SerializedHighlightSet,

        // perseus-all-package/widgets/grapher.jsx
        plot?: $FlowFixMe,
    |},
    callback?: ?() => mixed,
    silent?: boolean,
) => mixed;

export type ImageUploader = (
    file: string,
    callback: (url: string) => mixed,
) => mixed;

export type WidgetSize = "normal" | "small" | "mini";

export type Path = $ReadOnlyArray<string>;

type StubTagEditorType = $FlowFixMe; // from "./components/stub-tag-editor.jsx";

export type APIOptions = $ReadOnly<{|
    isArticle?: boolean,

    satStyling?: boolean,
    // This should actually be required since renderer.jsx sets defaults for
    // any missing properties in this object using this.getApiOptions() before
    // passing the prop on to other components.
    // TODO(FEI-3867): Create an APIOptionsInternal with all properties that
    // have a default value being non-optional.
    onInputError?: (widgetId?: any, value: string, message: ?string) => mixed,
    onFocusChange?: (
        newFocusPath: FocusPath,
        oldFocusPath: FocusPath,
        // These two parameters are only used in library-exercise.jsx and
        // practice-exercise.jsx and in the mobile app
        // (javascript/perseus-package/perseus-mobile-bridge.js).
        keypadElement?: HTMLElement,
        focusedElement?: HTMLElement,
    ) => mixed,
    staticRender?: boolean,
    GroupMetadataEditor?: React.ComponentType<StubTagEditorType>,
    showAlignmentOptions?: boolean,
    readOnly?: boolean,

    answerableCallback?: (boolean) => mixed,
    getAnotherHint?: () => mixed,
    interactionCallback?: () => mixed,

    // A function that takes in the relative problem number (starts at
    // 0 and is incremented for each group widget), and the ID of the
    // group widget, then returns a react component that will be added
    // immediately above the renderer in the group widget. If the
    // function returns null, no annotation will be added.
    groupAnnotator?: (
        groupNumber: number,
        widgetId: string,
    ) => ?React.Element<any>,

    // If imagePlaceholder or widgetPlaceholder are set, perseus will
    // render the placeholder instead of the image or widget node.
    imagePlaceholder?: React.Node,
    widgetPlaceholder?: React.Node,

    // Base React elements that can be used in place of the standard DOM
    // DOM elements. For example, when provided, <Link /> will be used
    // in place of <a />. This allows clients to provide pre-styled
    // components or components with custom behavior.
    baseElements?: {|
        // The <Link /> component provided here must adhere to the same
        // interface as React's base <a /> component.
        Link: React.ComponentType<any>,
    |},

    // Function that takes dimensions and returns a React component
    // to display while an image is loading
    imagePreloader?: (dimensions: Dimensions) => React.Node,

    // Function that takes an object argument. The object should
    // include type and id, both strings, at least and can optionally
    // include a boolean "correct" value. This is used for keeping
    // track of widget interactions.
    trackInteraction?: () => mixed,

    // A boolean that indicates whether or not a custom keypad is
    // being used.  For mobile web this will be the ProvidedKeypad
    // component.  In this situation we use the MathInput component
    // from the math-input repo instead of the existing perseus math
    // input components.
    // TODO(charlie): Make this mutually exclusive with `staticRender`.
    // Internally, we defer to `customKeypad` over `staticRender`, but
    // they should really be represented as an enum or some other data
    // structure that forbids them both being enabled at once.
    customKeypad?: boolean,

    // If this is provided, it is called instead of appending an instance
    // of `math-input`'s keypad to the body. This is used by the native
    // apps so they can have the keypad be defined on the native side.
    // It is called with an function that, when called, blurs the input,
    // and is expected to return an object of the shape
    // keypadElementPropType from math-input/src/prop-types.js.
    nativeKeypadProxy?: () => mixed,

    // Indicates whether or not to use mobile styling.
    isMobile?: boolean,

    // A function, called with a bool indicating whether use of the
    // drawing area (scratchpad) should be allowed/disallowed.
    // Previously handled by `Khan.scratchpad.enable/disable`
    setDrawingAreaAvailable?: (boolean) => mixed,

    // Whether to use the Draft.js editor or the legacy textarea
    useDraftEditor?: boolean,

    // Styling options that control the visual behavior of Perseus
    // items.
    // TODO(mdr): If we adopt this pattern, we'll need to think about
    //     how to make individual `styling` options be optional, and
    //     how to set their default values without overwriting provided
    //     values. For now, though, you must either specify all fields
    //     of `styling`, or omit the `styling` option entirely.
    styling?: {|
        // TODO(Nicole): Remove this after landing wonderblock-ifying
        // the radio widget
        primaryProductColor?: string,
    |},

    // The color used for the hint progress indicator (eg. 1 / 3)
    hintProgressColor?: string,

    // Whether this Renderer is allowed to auto-scroll the rest of the
    // page. For example, if this is enabled, the most recently used
    // radio widget will attempt to keep the "selected" answer in view
    // after entering review mode.
    //
    // Defaults to `false`.
    canScrollPage?: boolean,

    // Whether or not we are rendering content inside of a modal.
    inModal?: boolean,

    // Whether to enable the cross-out feature on multiple-choice radio
    // widgets. This allows users to note which answers they believe to
    // be incorrect, to find the answer by process of elimination.
    //
    // We plan to roll this out to all call sites eventually, but for
    // now we have this flag, to add it to Generalized Test Prep first.
    crossOutEnabled?: boolean,

    // The value in milliseconds by which the local state of content
    // in a editor is delayed before propagated to a prop. For example,
    // when text is typed in the text area of an Editor component,
    // there will be a delay equal to the value of `editorChangeDelay`
    // before the change is propagated. This is added for better
    // responsiveness of the editor when used in certain contexts such
    // as StructuredItem exercises where constant re-rendering for each
    // keystroke caused text typed in the text area to appear in it
    // only after a good few seconds.
    editorChangeDelay?: number,
|}>;

type TeXProps = {|
    children: string,
    katexOptions?: any,
    onClick?: () => mixed,
    onRender?: (root: any) => mixed,
    style?: any,
|};

export type DomInsertCheckFn = (
    text: string,
    node: HTMLElement,
    attribute?: string,
    jiptString?: string,
) => string | false;

export type JIPT = {|
    useJIPT: boolean,
|};

export type JiptLabelStore = {|
    addLabel: (label: any, useMath: any) => void,
|};

export interface JiptRenderer {
    replaceJiptContent: (content: string, paragraphIndex: number) => void;
}

export type JiptTranslationComponents = {|
    addComponent: (renderer: JiptRenderer) => number,
    removeComponentAtIndex: (index: number) => void,
|};

export type VideoData = {|
    __typename: "Video",
    id: string,
    title: ?string,
    /**
     * Unique identifier on YouTube.
     * If this is a dubbed video, this is always the original English version on
     * YouTube. If the localized version is needed, use translatedYoutubeId.
     * Example: KL6sMOn7ULo
     */
    youtubeId: ?string,
    contentId: ?string,
|};

interface StaticUrlFn {
    (maybeRelativeUrl: string): string;
    (maybeRelativeUrl: ?void): ?void;
}

// A dependency for getting URLs
type InitialRequestUrlInterface = {|
    origin: string,
    host: string,
    protocol: string,
|};

export type VideoKind = "YOUTUBE_ID" | "READABLE_ID";

// An object for dependency injection, to allow different clients
// to provide different methods for logging, translation, network
// requests, etc.
export type PerseusDependencies = {|
    // JIPT
    JIPT: JIPT,
    graphieMovablesJiptLabels: JiptLabelStore,
    svgImageJiptLabels: JiptLabelStore,
    rendererTranslationComponents: JiptTranslationComponents,

    // KaTeX related dependencies
    getKaTeX: () => Promise<katex>,
    // loadMathjax is deprecated. Perseus doesn't call it.
    loadMathjax?: () => Promise<mixed>,
    logKaTeXError: (expression: string, error: Error) => Promise<?Response>,
    // shouldUseFutureKaTeX is deprecated. Perseus doesn't call it.
    shouldUseFutureKaTeX?: (flag: boolean) => void,
    TeX: React.ComponentType<TeXProps>,

    //misc
    staticUrl: StaticUrlFn,

    InitialRequestUrl: InitialRequestUrlInterface,

    // video widget
    // This is used as a hook to fetch data about a video which is used to
    // add a link to the video transcript.  The return value conforms to
    // the wonder-blocks-data `Result` type which is used by our GraphQL
    // framework.
    useVideo(
        id: string,
        kind: VideoKind,
    ): Result<{|
        video: ?VideoData,
    |}>,

    Log: ILogger,

    // RequestInfo
    isDevServer: boolean,
    kaLocale: string,
    isMobile: boolean,
|};

export type APIOptionsWithDefaults = $ReadOnly<{|
    ...APIOptions,
    GroupMetadataEditor: $NonMaybeType<APIOptions["GroupMetadataEditor"]>,
    baseElements: $NonMaybeType<APIOptions["baseElements"]>,
    canScrollPage: $NonMaybeType<APIOptions["canScrollPage"]>,
    crossOutEnabled: $NonMaybeType<APIOptions["crossOutEnabled"]>,
    editorChangeDelay: $NonMaybeType<APIOptions["editorChangeDelay"]>,
    groupAnnotator: $NonMaybeType<APIOptions["groupAnnotator"]>,
    inModal: $NonMaybeType<APIOptions["inModal"]>,
    isArticle: $NonMaybeType<APIOptions["isArticle"]>,
    isMobile: $NonMaybeType<APIOptions["isMobile"]>,
    onFocusChange: $NonMaybeType<APIOptions["onFocusChange"]>,
    onInputError: $NonMaybeType<APIOptions["onInputError"]>,
    readOnly: $NonMaybeType<APIOptions["readOnly"]>,
    satStyling: $NonMaybeType<APIOptions["satStyling"]>,
    setDrawingAreaAvailable: $NonMaybeType<
        APIOptions["setDrawingAreaAvailable"],
    >,
    showAlignmentOptions: $NonMaybeType<APIOptions["showAlignmentOptions"]>,
    staticRender: $NonMaybeType<APIOptions["staticRender"]>,
    styling: $NonMaybeType<APIOptions["styling"]>,
    useDraftEditor: $NonMaybeType<APIOptions["useDraftEditor"]>,
|}>;

export type LinterContextProps = {
    contentType: string,
    highlightLint: boolean,
    paths: $ReadOnlyArray<string>,
    stack: $ReadOnlyArray<string>,
    // additional properties can be added to the context by widgets
    ...
};

export type Tracking = "" | "all";
export type Alignment =
    | "default"
    | "block"
    | "inline-block"
    | "inline"
    | "float-left"
    | "float-right"
    | "full-width";

type WidgetOptions = $FlowFixMe;

// A transform that maps the WidgetOptions (sometimes referred to as
// EditorProps) to the props used to render the widget. Often this is an
// identity transform.
// TODO(jeremy): Make this generic so that the WidgetOptions and output type
// become strongly typed.
export type WidgetTransform = (
    WidgetOptions,
    problemNumber?: number,
) => $FlowFixMe;

export type WidgetExports<
    T: React.ComponentType<any> = React.ComponentType<any>,
> = $ReadOnly<{|
    name: string,
    displayName: string,
    // TODO: figure out how to ensure that the component returned supports
    // the `validate` method.
    getWidget?: () => T,
    accessible?: boolean | ((props: $FlowFixMe) => boolean),
    hidden?: boolean,
    version?: Version,
    supportedAlignments?: $ReadOnlyArray<Alignment>,
    defaultAlignment?: Alignment,
    getDefaultAlignment?: () => Alignment,
    isLintable?: boolean,
    transform?: WidgetTransform,
    tracking?: Tracking,
    staticTransform?: WidgetTransform, // this is a function of some sort
    traverseChildWidgets?: $FlowFixMe, // (Props, traverseRenderer) => NewProps
    propUpgrades?: {|[string]: ($FlowFixMe) => $FlowFixMe|}, // OldProps => NewProps
    widget: T,
|}>;

export type WidgetInfo = PerseusWidget;

export type FilterCriterion =
    | string
    | ((id: string, widgetInfo: WidgetInfo, widget: ?Widget) => boolean);

// NOTE: Rubric should always be the corresponding widget options type for the component.
export type WidgetProps<RenderProps, Rubric> = {|
    ...RenderProps,

    // provided by renderer.jsx#getWidgetProps()
    widgetId: string,
    alignment: ?string,
    // When determining if a widget is static, we verify that the widget is not an
    // exercise question by verifying that it has no problem number.
    static: ?boolean,
    problemNum: ?number,
    apiOptions: APIOptionsWithDefaults,
    keypadElement?: $FlowFixMe,
    questionCompleted?: boolean,
    onFocus: (blurPath: FocusPath) => void,
    onBlur: (blurPath: FocusPath) => void,
    findWidgets: (FilterCriterion) => $ReadOnlyArray<Widget>,
    reviewModeRubric: Rubric,
    onChange: ChangeHandler,
    trackInteraction: (extraData?: any) => void,
    isLastUsedWidget: boolean,

    // provided by widget-container.jsx#render()
    linterContext: LinterContextProps,
    containerSizeClass: SizeClass,
|};

// Used to type the `change` method on all widgets.
export type ChangeFn = (
    newPropsOrSinglePropName: string | {|[string]: any|},
    propValue: any,
    callback?: () => mixed,
) => ?$FlowFixMe;
