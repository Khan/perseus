// eslint-disable-next-line import/no-unresolved
import katex from "katex";
// eslint-disable-next-line import/no-unresolved
import katexA11y from "katex/dist/contrib/render-a11y-string";
import * as React from "react";

import type {SerializedHighlightSet} from "./components/highlighting/types";
import type {ILogger} from "./logging/log";
import type {Item} from "./multi-items/item-types";
import type {PerseusWidget} from "./perseus-types";
import type {SizeClass} from "./util/sizing-utils";
import type {Result} from "@khanacademy/wonder-blocks-data";

export type FocusPath = ReadonlyArray<string> | null | undefined;

type State = any;

export interface RendererInterface {
    getSerializedState(): State;
    restoreSerializedState(state: State, callback?: () => void): void;
    scoreInput(): KEScore;
    blur(): void;
    focus(): boolean | null | undefined;
    props: any;
}

export type Dimensions = {
    width?: number;
    height?: number;
};

export type DeviceType = "phone" | "tablet" | "desktop";

// TODO(CP-4839): Create a proper type for Widget
// Is this the same as the Widget type in `renderer.jsx`?
export type Widget = any;
export type WidgetDict = {
    [name: string]: Widget;
};
export type ImageDict = {
    [url: string]: Dimensions;
};

export type PerseusScore =
    | {
          type: "invalid";
          message?: string | null | undefined;
          suppressAlmostThere?: boolean | null | undefined;
      }
    | {
          type: "points";
          earned: number;
          total: number;
          message?: string | null | undefined;
      };

export type KEScore = {
    empty: boolean;
    correct: boolean;
    message?: string | null | undefined;
    suppressAlmostThere?: boolean | null | undefined;
    guess: any;
    state: any;
};

export type Hint = {
    widgets: WidgetDict;
    content: string; // JSON string,
    images: ImageDict;
    replace?: boolean;
};

export type Version = {
    major: number;
    minor: number;
};

export type EditorMode = "edit" | "preview" | "json";

export type ChoiceState = {
    selected: boolean;
    crossedOut: boolean;
    highlighted: boolean;
    rationaleShown: boolean;
    correctnessShown: boolean;
    previouslyAnswered: boolean;
    readOnly: boolean;
};

export type ChangeHandler = (
    arg1: {
        hints?: ReadonlyArray<Hint>;
        replace?: boolean;
        content?: string;
        widgets?: WidgetDict;
        images?: ImageDict;
        // used only in EditorPage
        question?: any;
        answerArea?: any;
        itemDataVersion?: Version;
        // used in MutirenderEditor
        item?: Item;
        editorMode?: EditorMode;
        jsonMode?: boolean;
        // perseus-all-package/widgets/unit.jsx
        value?: any;
        // widgets/radio/widget.jsx
        choiceStates?: ReadonlyArray<ChoiceState>;
        // widgets/numeric-input.jsx
        currentValue?: string;
        // perseus-all-package/widgets/dropdown.jsx
        selected?: number;
        // perseus-all-package/widgets/transformer.jsx
        tools?: ReadonlyArray<any>;
        transformations?: ReadonlyArray<any>;
        highlights?: SerializedHighlightSet;
        // perseus-all-package/widgets/grapher.jsx
        plot?: any;
    },
    callback?: () => unknown | null | undefined,
    silent?: boolean,
) => unknown;

export type ImageUploader = (
    file: string,
    callback: (url: string) => unknown,
) => unknown;

export type WidgetSize = "normal" | "small" | "mini";

export type Path = ReadonlyArray<string>;

type StubTagEditorType = any; // from "./components/stub-tag-editor";

export type APIOptions = Readonly<{
    isArticle?: boolean;
    // This should actually be required since renderer.jsx sets defaults for
    // any missing properties in this object using this.getApiOptions() before
    // passing the prop on to other components.
    // TODO(FEI-3867): Create an APIOptionsInternal with all properties that
    // have a default value being non-optional.
    onInputError?: (
        widgetId: any,
        value: string,
        message?: string | null | undefined,
    ) => unknown;
    onFocusChange?: (
        newFocusPath: FocusPath,
        oldFocusPath: FocusPath,
        // These two parameters are only used in library-exercise.jsx and
        // practice-exercise.jsx and in the mobile app
        // (javascript/perseus-package/perseus-mobile-bridge.js).
        keypadElement?: HTMLElement,
        focusedElement?: HTMLElement,
    ) => unknown;
    GroupMetadataEditor?: React.ComponentType<StubTagEditorType>;
    showAlignmentOptions?: boolean;
    readOnly?: boolean;
    answerableCallback?: (arg1: boolean) => unknown;
    getAnotherHint?: () => unknown;
    interactionCallback?: () => unknown;
    // A function that takes in the relative problem number (starts at
    // 0 and is incremented for each group widget), and the ID of the
    // group widget, then returns a react component that will be added
    // immediately above the renderer in the group widget. If the
    // function returns null, no annotation will be added.
    groupAnnotator?: (
        groupNumber: number,
        widgetId: string,
    ) => React.ReactElement<any> | null | undefined;
    // If imagePlaceholder or widgetPlaceholder are set, perseus will
    // render the placeholder instead of the image or widget node.
    imagePlaceholder?: React.ReactNode;
    widgetPlaceholder?: React.ReactNode;
    // Base React elements that can be used in place of the standard DOM
    // DOM elements. For example, when provided, <Link /> will be used
    // in place of <a />. This allows clients to provide pre-styled
    // components or components with custom behavior.
    baseElements?: {
        // The <Link /> component provided here must adhere to the same
        // interface as React's base <a /> component.
        Link: React.ComponentType<any>;
    };
    // Function that takes dimensions and returns a React component
    // to display while an image is loading
    imagePreloader?: (dimensions: Dimensions) => React.ReactElement;
    // Function that takes an object argument. The object should
    // include type and id, both strings, at least and can optionally
    // include a boolean "correct" value. This is used for keeping
    // track of widget interactions.
    trackInteraction?: () => unknown;
    // A boolean that indicates whether or not a custom keypad is
    // being used.  For mobile web this will be the ProvidedKeypad
    // component.  In this situation we use the MathInput component
    // from the math-input repo instead of the existing perseus math
    // input components.
    customKeypad?: boolean;
    // If this is provided, it is called instead of appending an instance
    // of `math-input`'s keypad to the body. This is used by the native
    // apps so they can have the keypad be defined on the native side.
    // It is called with an function that, when called, blurs the input,
    // and is expected to return an object of the shape
    // keypadElementPropType from math-input/src/prop-types.js.
    nativeKeypadProxy?: () => unknown;
    // Indicates whether or not to use mobile styling.
    isMobile?: boolean;
    // A function, called with a bool indicating whether use of the
    // drawing area (scratchpad) should be allowed/disallowed.
    // Previously handled by `Khan.scratchpad.enable/disable`
    setDrawingAreaAvailable?: (arg1: boolean) => unknown;
    // Whether to use the Draft.js editor or the legacy textarea
    useDraftEditor?: boolean;
    // The color used for the hint progress indicator (eg. 1 / 3)
    hintProgressColor?: string;
    // Whether this Renderer is allowed to auto-scroll the rest of the
    // page. For example, if this is enabled, the most recently used
    // radio widget will attempt to keep the "selected" answer in view
    // after entering review mode.
    //
    // Defaults to `false`.
    canScrollPage?: boolean;
    // Whether or not we are rendering content inside of a modal.
    inModal?: boolean;
    // Whether to enable the cross-out feature on multiple-choice radio
    // widgets. This allows users to note which answers they believe to
    // be incorrect, to find the answer by process of elimination.
    //
    // We plan to roll this out to all call sites eventually, but for
    // now we have this flag, to add it to Generalized Test Prep first.
    crossOutEnabled?: boolean;
    // The value in milliseconds by which the local state of content
    // in a editor is delayed before propagated to a prop. For example,
    // when text is typed in the text area of an Editor component,
    // there will be a delay equal to the value of `editorChangeDelay`
    // before the change is propagated. This is added for better
    // responsiveness of the editor when used in certain contexts such
    // as StructuredItem exercises where constant re-rendering for each
    // keystroke caused text typed in the text area to appear in it
    // only after a good few seconds.
    editorChangeDelay?: number;
}>;

type TeXProps = {
    children: string;
    katexOptions?: any;
    onClick?: () => unknown;
    onRender?: (root?: any) => unknown;
    style?: any;
};

export type DomInsertCheckFn = (
    text: string,
    node: HTMLElement,
    attribute?: string,
    jiptString?: string,
) => string | false;

export type JIPT = {
    useJIPT: boolean;
};

export type JiptLabelStore = {
    addLabel: (label?: any, useMath?: any) => void;
};

export interface JiptRenderer {
    replaceJiptContent: (content: string, paragraphIndex: number) => void;
}

export type JiptTranslationComponents = {
    addComponent: (renderer: JiptRenderer) => number;
    removeComponentAtIndex: (index: number) => void;
};

export type VideoData = {
    __typename: "Video";
    id: string;
    title: string | null | undefined;
    /**
     * Unique identifier on YouTube.
     * If this is a dubbed video, this is always the original English version on
     * YouTube. If the localized version is needed, use translatedYoutubeId.
     * Example: KL6sMOn7ULo
     */
    youtubeId: string | null | undefined;
    contentId: string | null | undefined;
};

interface StaticUrlFn {
    (maybeRelativeUrl: string): string;
    (maybeRelativeUrl?: undefined | null | undefined):
        | undefined
        | null
        | undefined;
}

// A dependency for getting URLs
type InitialRequestUrlInterface = {
    origin: string;
    host: string;
    protocol: string;
};

export type VideoKind = "YOUTUBE_ID" | "READABLE_ID";

// An object for dependency injection, to allow different clients
// to provide different methods for logging, translation, network
// requests, etc.
export type PerseusDependencies = {
    // JIPT
    JIPT: JIPT;
    graphieMovablesJiptLabels: JiptLabelStore;
    svgImageJiptLabels: JiptLabelStore;
    rendererTranslationComponents: JiptTranslationComponents;
    // KaTeX related dependencies
    getKaTeX: () => Promise<katex>;
    getRenderA11yString: () => Promise<katexA11y>;
    loadMathjax: () => Promise<unknown>;
    logKaTeXError: (
        expression: string,
        error: Error,
    ) => Promise<Response | null | undefined>;
    KatexProvider: React.ComponentType<{
        children: React.ReactNode;
    }>;
    // TODO(kevinb): Update `getKaTeX` to return the version of `katex` that
    // webapp (or mobile) wants perseus to use.
    shouldUseFutureKaTeX: (flag: boolean) => void;
    TeX: React.ComponentType<TeXProps>;
    //misc
    staticUrl: StaticUrlFn;
    InitialRequestUrl: InitialRequestUrlInterface;
    // video widget
    // This is used as a hook to fetch data about a video which is used to
    // add a link to the video transcript.  The return value conforms to
    // the wonder-blocks-data `Result` type which is used by our GraphQL
    // framework.
    useVideo(
        id: string,
        kind: VideoKind,
    ): Result<{
        video: VideoData | null | undefined;
    }>;
    Log: ILogger;
    // RequestInfo
    isDevServer: boolean;
    kaLocale: string;
    isMobile: boolean;
};

export type APIOptionsWithDefaults = Readonly<
    APIOptions & {
        GroupMetadataEditor: NonNullable<APIOptions["GroupMetadataEditor"]>;
        baseElements: NonNullable<APIOptions["baseElements"]>;
        canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
        crossOutEnabled: NonNullable<APIOptions["crossOutEnabled"]>;
        editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
        groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
        inModal: NonNullable<APIOptions["inModal"]>;
        isArticle: NonNullable<APIOptions["isArticle"]>;
        isMobile: NonNullable<APIOptions["isMobile"]>;
        onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
        onInputError: NonNullable<APIOptions["onInputError"]>;
        readOnly: NonNullable<APIOptions["readOnly"]>;
        setDrawingAreaAvailable: NonNullable<
            APIOptions["setDrawingAreaAvailable"]
        >;
        showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
        useDraftEditor: NonNullable<APIOptions["useDraftEditor"]>;
    }
>;

export type LinterContextProps = {
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
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

type WidgetOptions = any;

// A transform that maps the WidgetOptions (sometimes referred to as
// EditorProps) to the props used to render the widget. Often this is an
// identity transform.
// TODO(jeremy): Make this generic so that the WidgetOptions and output type
// become strongly typed.
export type WidgetTransform = (
    arg1: WidgetOptions,
    problemNumber?: number,
) => any;

export type WidgetExports<
    T extends React.ComponentType<any> = React.ComponentType<any>,
> = Readonly<{
    name: string;
    displayName: string;
    // TODO: figure out how to ensure that the component returned supports
    // the `validate` method.
    getWidget?: () => T;
    accessible?: boolean | ((props: any) => boolean);
    hidden?: boolean;
    version?: Version;
    supportedAlignments?: ReadonlyArray<Alignment>;
    defaultAlignment?: Alignment;
    getDefaultAlignment?: () => Alignment;
    isLintable?: boolean;
    transform?: WidgetTransform;
    tracking?: Tracking;
    staticTransform?: WidgetTransform; // this is a function of some sort,
    traverseChildWidgets?: any; // (Props, traverseRenderer) => NewProps,
    propUpgrades?: {
        [key: string]: (arg1: any) => any;
    }; // OldProps => NewProps,
    widget: T;
}>;

export type WidgetInfo = PerseusWidget;

export type FilterCriterion =
    | string
    | ((
          id: string,
          widgetInfo: WidgetInfo,
          widget?: Widget | null | undefined,
      ) => boolean);

// NOTE: Rubric should always be the corresponding widget options type for the component.
export type WidgetProps<RenderProps, Rubric> = RenderProps & {
    // provided by renderer.jsx#getWidgetProps()
    widgetId: string;
    alignment: string | null | undefined;
    // When determining if a widget is static, we verify that the widget is not an
    // exercise question by verifying that it has no problem number.
    static: boolean | null | undefined;
    problemNum: number | null | undefined;
    apiOptions: APIOptionsWithDefaults;
    keypadElement?: any;
    questionCompleted?: boolean;
    onFocus: (blurPath: FocusPath) => void;
    onBlur: (blurPath: FocusPath) => void;
    findWidgets: (arg1: FilterCriterion) => ReadonlyArray<Widget>;
    reviewModeRubric: Rubric;
    onChange: ChangeHandler;
    trackInteraction: (extraData?: any) => void;
    isLastUsedWidget: boolean;
    // provided by widget-container.jsx#render()
    linterContext: LinterContextProps;
    containerSizeClass: SizeClass;
};

// Used to type the `change` method on all widgets.
export type ChangeFn = (
    newPropsOrSinglePropName:
        | string
        | {
              [key: string]: any;
          },
    propValue?: any,
    callback?: () => unknown,
) => any | null | undefined;
