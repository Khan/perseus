import type {ILogger} from "./logging/log";
import type {PerseusStrings} from "./strings";
import type {SizeClass} from "./util/sizing-utils";
import type {WidgetPromptJSON} from "./widget-ai-utils/prompt-types";
import type {KeypadAPI} from "@khanacademy/math-input";
import type {
    getLabelImagePublicWidgetOptions,
    Hint,
    PerseusAnswerArea,
    PerseusGraphType,
    PerseusWidget,
    PerseusWidgetsMap,
    AnalyticsEventHandlerFn,
    Version,
    WidgetOptionsUpgradeMap,
    getOrdererPublicWidgetOptions,
    getCategorizerPublicWidgetOptions,
    getExpressionPublicWidgetOptions,
    getSorterPublicWidgetOptions,
    getDropdownPublicWidgetOptions,
} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";
import type {
    PerseusScore,
    Rubric,
    UserInput,
    UserInputArray,
    UserInputMap,
    ValidationData,
    ValidationResult,
} from "@khanacademy/perseus-score";
import type {Result} from "@khanacademy/wonder-blocks-data";
import type * as React from "react";

export type FocusPath = ReadonlyArray<string> | null | undefined;

export type Dimensions = {
    width?: number;
    height?: number;
};

export type DeviceType = "phone" | "tablet" | "desktop";

/**
 * This is the type returned by a widget's `getSerializedState` function (and
 * provided to the same widget's `restoreSerializedState` function). However,
 * note that in most cases the widgets do _not_ implement these functions.
 * In that case, the `Renderer` just returns the widget's render props as the
 * serialized state.
 */
export type SerializedState = Record<string, any>;

/**
 * The Widget type represents the common API that the Renderer uses to interact
 * with all widgets. All widgets must implement the methods in this API, unless
 * they are marked as optional (?: ...).
 *
 * These methods are called on the widget ref and allow the renderer to
 * communicate with the individual widgets to coordinate actions such as
 * scoring, state serialization/deserialization, and focus management.
 */
export interface Widget {
    /**
     * don't use isWidget; it's just a dummy property to help TypeScript's weak
     * typing to recognize non-interactive widgets as Widgets
     * @deprecated
     */
    isWidget?: true;
    focus?: () =>
        | {
              id: string;
              path: FocusPath;
          }
        | boolean;
    getDOMNodeForPath?: (path: FocusPath) => Element | Text | null;
    deselectIncorrectSelectedChoices?: () => void;

    /**
     * Returns widget state that can be passed back to `restoreSerializedState`
     * to put the widget back into exactly the same state. If the widget does
     * not implement this function, the renderer simply returns all of the
     * widget's props.
     */
    // TODO(jeremy): I think this return value is wrong. The widget
    // getSerializedState should just return _its_ serialized state, not a
    // key/value list of all widget states (i think!)
    getSerializedState?: () => SerializedState; // SUSPECT,
    restoreSerializedState?: (props: any, callback: () => void) => any;

    blurInputPath?: (path: FocusPath) => void;
    focusInputPath?: (path: FocusPath) => void;
    getInputPaths?: () => ReadonlyArray<FocusPath>;
    setInputValue?: (
        path: FocusPath,
        newValue: string,
        // TODO(jeremy): I think this is actually a callback
        focus?: () => unknown,
    ) => void;
    getUserInputMap?: () => UserInputMap | undefined;
    getUserInput?: () => UserInputArray | UserInput | undefined;

    showRationalesForCurrentlySelectedChoices?: (options?: any) => void;
    getPromptJSON?: () => WidgetPromptJSON;
}

export type ImageDict = {
    [url: string]: Dimensions;
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
        widgets?: PerseusWidgetsMap;
        images?: ImageDict;
        // used only in EditorPage
        question?: any;
        answerArea?: PerseusAnswerArea | null;
        itemDataVersion?: Version;
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
        // perseus-all-package/widgets/grapher.jsx
        plot?: any;
        // Interactive Graph callback (see legacy: interactive-graph.tsx)
        graph?: PerseusGraphType;
    },
    callback?: () => void,
    silent?: boolean,
) => unknown;

export type ImageUploader = (
    file: File,
    callback: (url: string) => unknown,
) => unknown;

export type Path = ReadonlyArray<string>;

type StubTagEditorType = any; // from "./components/stub-tag-editor";

type TrackInteractionArgs = {
    // The widget type that this interaction originates from
    type: string;
    // The widget id that this interaction originates from
    id: string;

    correct?: boolean;

    // Tracking args are all optional here because we don't know which
    // widgets originated the call, and thus can't know what extra
    // arguments will be included!
} & Partial<TrackingGradedGroupExtraArguments> &
    Partial<TrackingSequenceExtraArguments>;

export const MafsGraphTypeFlags = [
    /** Enables the `angle` interactive-graph type.  */
    "angle",
    /** Enables the `segment` interactive-graph type.  */
    "segment",
    /** Enables the `linear` interactive-graph type.  */
    "linear",
    /** Enables the `linear-system` interactive-graph type.  */
    "linear-system",
    /** Enables the `ray` interactive-graph type.  */
    "ray",
    /** Enables the `polygon` interactive-graph type a fixed number of sides. */
    "polygon",
    /** Enable the `unlimited-polygon` interactive graph type for an unlimited number of sides */
    "unlimited-polygon",
    /** Enables the `circle` interactive-graph type.  */
    "circle",
    /** Enables the `quadratic` interactive-graph type.  */
    "quadratic",
    /** Enables the `sinusoid` interactive-graph type.  */
    "sinusoid",
    /** Enables the `point` interactive-graph type with a fixed number of points. */
    "point",
    /** Enable the `unlimited-point` interactive graph type */
    "unlimited-point",
    /** Enable the `none` interactive graph type for content editors */
    "none",
] as const;

/**
 * APIOptions provides different ways to customize the behaviour of Perseus.
 *
 * @see {@link APIOptionsWithDefaults}
 */
export type APIOptions = Readonly<{
    isArticle?: boolean;
    onFocusChange?: (
        newFocusPath: FocusPath,
        oldFocusPath: FocusPath,
        keypadHeight?: number,
        focusedElement?: HTMLElement,
    ) => unknown;
    GroupMetadataEditor?: React.ComponentType<StubTagEditorType>;
    showAlignmentOptions?: boolean;
    /**
     * A boolean that indicates whether the associated problem has been
     * answered correctly and should no longer be interactive.
     */
    readOnly?: boolean;
    answerableCallback?: (arg1: boolean) => unknown;
    getAnotherHint?: () => unknown;
    interactionCallback?: (widgetData: {[widgetId: string]: any}) => void;
    /**
     * A function that takes in the relative problem number (starts at
     * 0 and is incremented for each group widget), and the ID of the
     * group widget, then returns a react component that will be added
     * immediately above the renderer in the group widget. If the
     * function returns null, no annotation will be added.
     */
    groupAnnotator?: (groupNumber: number, widgetId: string) => React.ReactNode;
    /**
     * If imagePlaceholder is set, Perseus will render the placeholder instead
     * of the image node.
     */
    imagePlaceholder?: React.ReactNode;
    /**
     * If widgetPlaceholder is set, Perseus will render the placeholder instead
     * of the widget node.
     */
    widgetPlaceholder?: React.ReactNode;
    /**
     * Base React elements that can be used in place of the standard DOM
     * DOM elements. For example, when provided, <Link /> will be used
     * in place of <a />. This allows clients to provide pre-styled
     * components or components with custom behavior.
     */
    baseElements?: {
        /**
         * The <Link /> component provided here must adhere to the same
         * interface as React's base <a /> component.
         */
        Link: React.ComponentType<any>;
    };
    /**
     * Function that takes dimensions and returns a React component
     * to display while an image is loading.
     */
    imagePreloader?: (dimensions: Dimensions) => React.ReactNode;
    /**
     * A function that is called when the user has interacted with a widget. It
     * also includes any extra parameters that the originating widget provided.
     * This is used for keeping track of widget interactions.
     */
    trackInteraction?: (args: TrackInteractionArgs) => void;
    /**
     * A boolean that indicates whether or not a custom keypad is
     * being used.  For mobile web this will be the ProvidedKeypad
     * component.  In this situation we use the MathInput component
     * from the math-input repo instead of the existing perseus math
     * input components.
     */
    customKeypad?: boolean;
    /**
     * If this is provided, it is called instead of appending an instance
     * of `math-input`'s keypad to the body. This is used by the native
     * apps so they can have the keypad be defined on the native side.
     * It is called with an function that, when called, blurs the input,
     * and is expected to return an object of the shape
     * keypadElementPropType from math-input/src/prop-types.js.
     */
    nativeKeypadProxy?: (blur: () => void) => KeypadAPI;
    /** Indicates whether or not to use mobile styling. */
    isMobile?: boolean;
    /** A function, called with a bool indicating whether use of the
     * drawing area (scratchpad) should be allowed/disallowed.
     *
     * Previously handled by `Khan.scratchpad.enable/disable`
     */
    setDrawingAreaAvailable?: (arg1: boolean) => unknown;
    /** The color used for the hint progress indicator (eg. 1 / 3) */
    hintProgressColor?: string;
    /**
     * Whether this Renderer is allowed to auto-scroll the rest of the
     * page. For example, if this is enabled, the most recently used
     * radio widget will attempt to keep the "selected" answer in view
     * after entering review mode.
     *
     * Defaults to `false`.
     */
    canScrollPage?: boolean;
    /**
     * Whether to enable the cross-out feature on multiple-choice radio
     * widgets. This allows users to note which answers they believe to
     * be incorrect, to find the answer by process of elimination.
     *
     * We plan to roll this out to all call sites eventually, but for
     * now we have this flag, to add it to Generalized Test Prep first.
     */
    crossOutEnabled?: boolean;
    /**
     * The value in milliseconds by which the local state of content
     * in a editor is delayed before propagated to a prop. For example,
     * when text is typed in the text area of an Editor component,
     * there will be a delay equal to the value of `editorChangeDelay`
     * before the change is propagated. This is added for better
     * responsiveness of the editor when used in certain contexts such
     * as StructuredItem exercises where constant re-rendering for each
     * keystroke caused text typed in the text area to appear in it
     * only after a good few seconds.
     */
    editorChangeDelay?: number;
    /** Feature flags that can be passed from consuming application. */
    flags?: {
        /**
         * Flags related to the interactive-graph Mafs migration.
         *
         * Add values to the relevant array to create new flags.
         */
        mafs?: false | {[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean};
    };
    /**
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>;

type TeXProps = {
    children: string;
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
    (
        maybeRelativeUrl?: undefined | null | undefined,
    ): undefined | null | undefined;
}

// A dependency for getting URLs
type InitialRequestUrlInterface = {
    origin: string;
    host: string;
    protocol: string;
};

export type VideoKind = "YOUTUBE_ID" | "READABLE_ID";

/**
 * An object for dependency injection, to allow different clients
 * to provide different methods for logging, translation, network
 * requests, etc.
 *
 * NOTE: You should avoid adding new dependencies here as this type was added
 * as a quick fix to get around the fact that some of the dependencies Perseus
 * needs are used in places where neither `APIOptions` nor a React Context
 * could be used. Aim to shrink the footprint of PerseusDependencies and try to
 * use alternative methods where possible.
 */
export type PerseusDependencies = {
    // JIPT
    JIPT: JIPT;
    graphieMovablesJiptLabels: JiptLabelStore;
    svgImageJiptLabels: JiptLabelStore;
    rendererTranslationComponents: JiptTranslationComponents;

    TeX: React.ComponentType<TeXProps>;

    //misc
    staticUrl: StaticUrlFn;
    InitialRequestUrl: InitialRequestUrlInterface;

    Log: ILogger;

    // RequestInfo
    isDevServer: boolean;
    kaLocale: string;
};

/**
 * The modern iteration of Perseus Depedndencies. These dependencies are
 * provided to Perseus through its entrypoints (for example:
 * ServerItemRenderer) and then attached to the DependenciesContext so they are
 * available anywhere down the React render tree.
 *
 * Prefer using this type over `PerseusDependencies` when possible.
 */
export interface PerseusDependenciesV2 {
    analytics: {onAnalyticsEvent: AnalyticsEventHandlerFn};

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
}

/**
 * APIOptionsWithDefaults represents the type that is provided to all widgets.
 * The Renderer fills in these defaults when providing APIOptions to any
 * widget.
 */
export type APIOptionsWithDefaults = Readonly<
    APIOptions & {
        GroupMetadataEditor: NonNullable<APIOptions["GroupMetadataEditor"]>;
        baseElements: NonNullable<APIOptions["baseElements"]>;
        canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
        crossOutEnabled: NonNullable<APIOptions["crossOutEnabled"]>;
        editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
        groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
        isArticle: NonNullable<APIOptions["isArticle"]>;
        isMobile: NonNullable<APIOptions["isMobile"]>;
        onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
        readOnly: NonNullable<APIOptions["readOnly"]>;
        setDrawingAreaAvailable: NonNullable<
            APIOptions["setDrawingAreaAvailable"]
        >;
        showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
    }
>;

export type Tracking =
    // Track interactions once
    | ""
    // Track all interactions
    | "all";

// See graded-group widget
export type TrackingGradedGroupExtraArguments = {
    status: "correct" | "incorrect" | "invalid";
};

// See sequence widget
type TrackingSequenceExtraArguments = {
    visible: number;
};

export type Alignment =
    | "default"
    | "block"
    | "inline-block"
    | "inline"
    | "float-left"
    | "float-right"
    | "full-width";

type WidgetOptions = any;

/**
 * A transform that maps the WidgetOptions (sometimes referred to as
 * EditorProps) to the props used to render the widget. Often this is an
 * identity transform.
 */
// TODO(jeremy): Make this generic so that the WidgetOptions and output type
// become strongly typed.
export type WidgetTransform = (
    arg1: WidgetOptions,
    strings: PerseusStrings,
    problemNumber?: number,
) => any;

export type WidgetValidatorFunction = (
    userInput: UserInput,
    validationData: ValidationData,
    strings: PerseusStrings,
    locale: string,
) => ValidationResult;

export type WidgetScorerFunction = (
    // The user data needed to score
    userInput: UserInput,
    // The scoring criteria to score against
    rubric: Rubric,
    // Strings, for error messages in invalid widgets
    string?: PerseusStrings,
    // Locale, for math evaluation
    // (1,000.00 === 1.000,00 in some countries)
    locale?: string,
) => PerseusScore;

/**
 * A union type of all the functions that provide public widget options.
 */
export type PublicWidgetOptionsFunction =
    | typeof getDropdownPublicWidgetOptions
    | typeof getCategorizerPublicWidgetOptions
    | typeof getOrdererPublicWidgetOptions
    | typeof getExpressionPublicWidgetOptions
    | typeof getLabelImagePublicWidgetOptions
    | typeof getSorterPublicWidgetOptions;

export type WidgetExports<
    T extends React.ComponentType<any> & Widget = React.ComponentType<any>,
> = Readonly<{
    name: string;
    displayName: string;

    // Widgets should provide _one_ of these two properties only!
    // TODO: figure out how to ensure that the component returned supports
    // the `validate` method.
    getWidget?: () => T;
    widget: T;

    accessible?: boolean | ((props: any) => boolean);
    /** Supresses widget from showing up in the dropdown in the content editor */
    hidden?: boolean;
    /**
     * The widget version. Any time the _major_ version changes, the widget
     * should provide a new entry in the propUpgrades map to migrate from the
     * older version to the current (new) version. Minor version changes must
     * be backwards compatible with previous minor versions widget options.
     *
     * This key defaults to `{major: 0, minor: 0}` if not provided.
     */
    version?: Version;
    supportedAlignments?: ReadonlyArray<Alignment>;
    defaultAlignment?: Alignment;
    getDefaultAlignment?: () => Alignment;
    isLintable?: boolean;
    tracking?: Tracking;

    traverseChildWidgets?: any; // (Props, traverseRenderer) => NewProps,

    /**
     * Transforms the widget options to the props used to render the widget.
     */
    transform?: WidgetTransform;
    /**
     * Transforms the widget options to the props used to render the widget for
     * static renders.
     */
    staticTransform?: WidgetTransform; // this is a function of some sort,

    /**
     * Validates the learner's guess to check if it's sufficient for scoring.
     * Typically, this is basically an "emptiness" check, but for some widgets
     * such as `interactive-graph` it is a check that the learner has made any
     * edits (ie. the widget is not in it's origin state).
     */
    validator?: WidgetValidatorFunction;

    /**
     * A function that scores user input (the guess) for the widget.
     */
    scorer?: WidgetScorerFunction;

    /**
     * A function that provides a public version of the widget options that can
     * be shared with the client.
     */
    getPublicWidgetOptions?: PublicWidgetOptionsFunction;

    getOneCorrectAnswerFromRubric?: (
        rubric: Rubric,
    ) => string | null | undefined;

    /**
     * A map of major version numbers (as a string, eg "1") to a function that
     * migrates from the _previous_ major version.
     *
     * Example:
     * ```
     * propUpgrades: {'1': (options) => ({...options})}
     * ```
     *
     * This configuration would migrate options from major version 0 to 1.
     */
    propUpgrades?: WidgetOptionsUpgradeMap;
}>;

export type FilterCriterion =
    | string
    | ((
          id: string,
          widgetInfo: PerseusWidget,
          widget?: Widget | null | undefined,
      ) => boolean);

/**
 * The full set of props provided to all widgets when they are rendered. The
 * `RenderProps` generic argument are the widget-specific props that originate
 * from the stored PerseusItem. Note that they may not match the serialized
 * widget options exactly as they are the result of running the options through
 * any `propUpgrades` the widget defines as well as its `transform` or
 * `staticTransform` functions (depending on the options `static` flag).
 */
// NOTE: Rubric should always be the corresponding widget options type for the component.
// TODO: in fact, is it really the rubric? WidgetOptions is what we use to configure the widget
// (which is what this seems to be for)
// and Rubric is what we use to score the widgets (which not all widgets need validation)
export type WidgetProps<
    RenderProps,
    Rubric = Empty,
    // Defines the arguments that can be passed to the `trackInteraction`
    // function from APIOptions for this widget.
    TrackingExtraArgs = Empty,
> = RenderProps & {
    // provided by renderer.jsx#getWidgetProps()
    widgetId: string;
    alignment: string | null | undefined;
    static: boolean | null | undefined;
    problemNum: number | null | undefined;
    apiOptions: APIOptionsWithDefaults;
    keypadElement?: any;
    /**
     * questionCompleted is used to signal that a learner has attempted
     * the exercise. This is used when widgets want to show things like
     * rationale or partial correctness.
     */
    questionCompleted?: boolean;
    onFocus: (blurPath: FocusPath) => void;
    onBlur: (blurPath: FocusPath) => void;
    findWidgets: (criterion: FilterCriterion) => ReadonlyArray<Widget>;
    reviewModeRubric?: Rubric | null | undefined;
    reviewMode: boolean;
    onChange: ChangeHandler;
    // This is slightly different from the `trackInteraction` function in
    // APIOptions. This provides the widget an easy way to notify the renderer
    // of an interaction. The Renderer then enriches the data provided with the
    // widget's id and type before calling APIOptions.trackInteraction.
    trackInteraction: (extraData?: TrackingExtraArgs) => void;
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

export type SharedRendererProps = {
    apiOptions: APIOptions;
    linterContext: LinterContextProps;
};
