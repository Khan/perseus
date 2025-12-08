/* eslint-disable max-lines */
/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/no-unsafe */
import {
    Errors,
    PerseusError,
    applyDefaultsToWidgets,
    getDefaultAnswerArea,
    mapObject,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import * as PerseusLinter from "@khanacademy/perseus-linter";
import {
    emptyWidgetsFunctional,
    flattenScores,
    scoreWidgetsFunctional,
} from "@khanacademy/perseus-score";
import classNames from "classnames";
import $ from "jquery";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import AssetContext from "./asset-context";
import {PerseusI18nContext} from "./components/i18n-context";
import SvgImage from "./components/svg-image";
import TeX from "./components/tex";
import Zoomable from "./components/zoomable";
import ZoomableTeX from "./components/zoomable-tex";
import {DefinitionProvider} from "./definition-context";
import {getDependencies} from "./dependencies";
import ErrorBoundary from "./error-boundary";
import InteractionTracker from "./interaction-tracker";
import JiptParagraphs from "./jipt-paragraphs";
import {Log} from "./logging/log";
import {excludeDenylistKeys} from "./mixins/widget-prop-denylist";
import {ClassNames as ApiClassNames, ApiOptions} from "./perseus-api";
import PerseusMarkdown from "./perseus-markdown";
import QuestionParagraph from "./question-paragraph";
import TranslationLinter from "./translation-linter";
import Util from "./util";
import preprocessTex from "./util/tex-preprocess";
import WidgetContainer from "./widget-container";
import * as Widgets from "./widgets";

import type {DependenciesContext} from "./dependencies";
import type {PerseusStrings} from "./strings";
import type {
    APIOptions,
    APIOptionsWithDefaults,
    FilterCriterion,
    FocusPath,
    Widget,
    WidgetProps,
} from "./types";
import type {
    HandleUserInputCallback,
    InitializeUserInputCallback,
} from "./user-input-manager";
import type {
    GetPromptJSONInterface,
    RendererPromptJSON,
} from "./widget-ai-utils/prompt-types";
import type {KeypadAPI} from "@khanacademy/math-input";
import type {
    PerseusRenderer,
    PerseusWidget,
    PerseusWidgetOptions,
    PerseusWidgetsMap,
    ShowSolutions,
    PerseusScore,
    UserInputMap,
    UserInput,
    UserInputArray,
    PerseusItem,
} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

import "./styles/perseus-renderer.css";

const rContainsNonWhitespace = /\S/;
const rImageURL = /(web\+graphie|https):\/\/[^\s]*/;

const noopOnRender = () => {};

const makeContainerId = (id: string) => "container:" + id;

// Check if one focus path / id path is a prefix of another
// The focus path null will never be a prefix of any non-null
// path, since it represents no focus.
// Otherwise, prefix is calculated by whether every array
// element in the prefix is present in the same position in the
// wholeArray path.
const isIdPathPrefix = function (
    prefixArray: FocusPath,
    wholeArray: FocusPath,
) {
    if (prefixArray === null || wholeArray === null) {
        return prefixArray === wholeArray;
    }

    // @ts-expect-error - TS2345 - Argument of type 'readonly string[] | undefined' is not assignable to parameter of type 'Collection<any>'.
    return _.every(prefixArray, (elem: string, i: number) => {
        if (wholeArray != null) {
            return _.isEqual(elem, wholeArray[i]);
        }
    });
};

type WidgetState = {
    isMobile?: boolean;
    inTable?: boolean;
    key?: number;
    paragraphIndex?: number;
    foundFullWidth?: boolean;
    baseElements?: any;
};

type Props = Partial<React.ContextType<typeof DependenciesContext>> & {
    userInput?: UserInputMap;
    handleUserInput?: HandleUserInputCallback;
    initializeUserInput?: InitializeUserInputCallback;
    apiOptions?: APIOptions;
    alwaysUpdate?: boolean;
    findExternalWidgets: any;
    images: PerseusRenderer["images"];
    keypadElement?: KeypadAPI | null;
    onInteractWithWidget: (id: string) => void;
    onRender: (node?: any) => void;
    problemNum?: number;
    reviewMode?: boolean | null | undefined;
    highlightEmptyWidgets?: boolean;
    /**
     * If set to "all", all rationales or solutions will be shown. If set to
     * "selected", soltions will only be shown for selected choices. If set to
     * "none", solutions will not be shown-- equivalent to `undefined`.
     */
    showSolutions?: ShowSolutions;
    content: PerseusRenderer["content"];

    /**
     * If linterContext.highlightLint is true, then content will be passed to
     * the linter and any warnings will be highlighted in the rendered output.
     */
    linterContext: LinterContextProps;
    legacyPerseusLint?: ReadonlyArray<string>;
    widgets: PerseusRenderer["widgets"];
    /**
     *  Skip adding paragraph class
     */
    inline?: boolean;
    strings: PerseusStrings;
};

type State = {
    translationLintErrors: ReadonlyArray<string>;
    widgetInfo: Readonly<PerseusWidgetsMap>;
    jiptContent: any;
};

type FullLinterContext = LinterContextProps & {
    content: string;
    widgets: {
        [id: string]: any;
    };
    // This is inexact because LinterContextProps is inexact
};

type DefaultProps = Required<
    Pick<
        Props,
        | "alwaysUpdate"
        | "content"
        | "findExternalWidgets"
        | "images"
        | "linterContext"
        | "onInteractWithWidget"
        | "onRender"
        | "showSolutions"
        | "reviewMode"
        | "widgets"
    >
>;

/**
 * We want to be able to reset the question state when we go
 * from one question to another question. However it's kind of tricky:
 * 1. Content could be the same
 * 2. Problem number could be the same
 * 3. We don't want to reset when going from answerless to answerful data
 * So compare the prev props to the next props, but use
 * answerless for both for the comparison
 */
export type DifferentQuestionPartialProps = Pick<
    Props,
    "content" | "widgets" | "problemNum"
>;
export function isDifferentQuestion(
    propsA: DifferentQuestionPartialProps,
    propsB: DifferentQuestionPartialProps,
): boolean {
    function makeItem(props: DifferentQuestionPartialProps): PerseusItem {
        return splitPerseusItem({
            question: {
                content: props.content,
                widgets: props.widgets,
                images: {},
            },
            hints: [],
            answerArea: getDefaultAnswerArea(),
        });
    }

    return (
        propsA.problemNum !== propsB.problemNum ||
        !_.isEqual(makeItem(propsA), makeItem(propsB))
    );
}

class Renderer
    extends React.Component<Props, State>
    implements GetPromptJSONInterface
{
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    _currentFocus: FocusPath | null | undefined;
    // @ts-expect-error - TS2564 - Property '_foundTextNodes' has no initializer and is not definitely assigned in the constructor.
    _foundTextNodes: boolean;
    // @ts-expect-error - TS2564 - Property '_interactionTrackers' has no initializer and is not definitely assigned in the constructor.
    _interactionTrackers: {
        [id: string]: InteractionTracker<any>;
    };
    // @ts-expect-error - TS2564 - Property '_isMounted' has no initializer and is not definitely assigned in the constructor.
    _isMounted: boolean;
    // @ts-expect-error - TS2564 - Property '_isTwoColumn' has no initializer and is not definitely assigned in the constructor.
    _isTwoColumn: boolean;

    // The i18n linter.
    _translationLinter: TranslationLinter;

    _widgetContainers: Map<string, WidgetContainer> = new Map();

    // @ts-expect-error - TS2564 - Property 'translationIndex' has no initializer and is not definitely assigned in the constructor.
    translationIndex: number;
    // @ts-expect-error - TS2564 - Property 'widgetIds' has no initializer and is not definitely assigned in the constructor.
    widgetIds: Array<string>;

    static defaultProps: DefaultProps = {
        content: "",
        widgets: {},
        images: {},
        showSolutions: "none",
        // onRender may be called multiple times per render, for example
        // if there are multiple images or TeX pieces within `content`.
        // It is a good idea to debounce any functions passed here.
        onRender: noopOnRender,
        onInteractWithWidget: function () {},
        findExternalWidgets: () => [],
        alwaysUpdate: false,
        reviewMode: false,
        linterContext: PerseusLinter.linterContextDefault,
    };

    constructor(props: Props) {
        super(props);
        this._translationLinter = new TranslationLinter();

        this.state = {
            jiptContent: null,

            // TranslationLinter is async and currently does not contain a
            // location. This is a list of error strings TranslationLinter
            // detected on its last run.
            translationLintErrors: [],

            ...this._getInitialWidgetState(props),
        };
    }

    componentDidMount() {
        this._isMounted = true;

        // figure out why we're passing an empty object
        // @ts-expect-error - TS2345 - Argument of type '{}' is not assignable to parameter of type 'Props'.
        this.handleRender({});
        this._currentFocus = null;

        this.props.initializeUserInput?.(
            this.props.widgets,
            this.props.problemNum ?? 0,
        );

        if (this.props.linterContext.highlightLint) {
            // Get i18n lint errors asynchronously. If there are lint errors,
            // this component will be rerendered.
            this._translationLinter.runLinter(
                this.props.content,
                this.handletranslationLintErrors,
            );
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        if (isDifferentQuestion(this.props, nextProps)) {
            this.props.initializeUserInput?.(
                nextProps.widgets,
                nextProps.problemNum ?? 0,
            );
            this.setState(this._getInitialWidgetState(nextProps));
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State): any | boolean {
        // QUESTION(jeremy): Shouldn't we look at `nextProps` here? Otherwise
        // we're always looking "one render behind".
        if (this.props.alwaysUpdate) {
            // TOTAL hacks so that findWidgets doesn't break
            // when one widget updates without the other.
            // See passage-refs inside radios, which was why
            // this was introduced.
            // I'm sorry!
            // TODO(aria): cry
            //
            // HACK(djf): I've also set this alwaysUpdate property from
            // async-renderer.jsx in the manticore-package. I'm doing this
            // to work around an infinite loop of some sort that started
            // happening in manticore after the React 16 update. After
            // clicking around in the manticore exercise editor (for example)
            // the UI would freeze up, and the debugger would show that
            // we were always deep in a recursion on the propsChanged line
            // below. There is some kind of timing issue causing some kind
            // of infinite loop, but by avoiding the time-consuming deep
            // equal comparisons on our props (which are often huge) I can
            // no longer reproduce the bug.
            // TODO(djf): Remove this comment
            // https://khanacademy.atlassian.net/browse/CP-834 is resolved.
            return true;
        }
        const stateChanged = !_.isEqual(this.state, nextState);
        const propsChanged = !_.isEqual(this.props, nextProps);
        return propsChanged || stateChanged;
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        this.handleRender(prevProps);

        if (this.props.linterContext.highlightLint) {
            // Get i18n lint errors asynchronously. If lint errors have changed
            // since the last run, this component will be rerendered.
            this._translationLinter.runLinter(
                this.props.content,
                this.handletranslationLintErrors,
            );
        }
    }

    componentWillUnmount() {
        // Clean out the list of widgetIds when unmounting, as this list is
        // meant to be consistent with the refs controlled by the renderer, and
        // refs are also cleared out during unmounting.
        // (This may not be totally necessary, but mobile clients have been
        // seeing JS errors due to an inconsistency between the list of
        // widgetIds and the child refs of the renderer.
        // See: https://phabricator.khanacademy.org/D32420.)
        this.widgetIds = [];

        if (this.translationIndex != null) {
            // NOTE(jeremy): Since the translationIndex is simply the array
            // index of each renderer, we can't remove Renderers from this
            // list, rather, we simply null out the entry (which means that
            // this array's growth is unbounded until a page reload).
            getDependencies().rendererTranslationComponents.removeComponentAtIndex(
                this.translationIndex,
            );
        }

        this._isMounted = false;
    }

    getApiOptions: () => APIOptionsWithDefaults = () => {
        return {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
        };
    };

    _getInitialWidgetState: (props: Props) => {
        widgetInfo: State["widgetInfo"];
    } = (props: Props) => {
        const allWidgetInfo = applyDefaultsToWidgets(props.widgets);
        return {
            widgetInfo: allWidgetInfo,
        };
    };

    // This is only used in _getWidgetInfo as a fallback if widgetId
    // doesn't exist in this.state.widgetInfo.  It doesn't get run as
    // part of the happy path.
    // TODO(LP-10713): Refactor how we handle widgetIds that don't exist
    // in this.state.widgetInfo.
    _getDefaultWidgetInfo: (widgetId: string) => any = (widgetId: string) => {
        const widgetIdParts = Util.rTypeFromWidgetId.exec(widgetId);
        if (widgetIdParts == null) {
            // We should probably return null here since there's no
            // widget with the given id.
            // NOTE(jeremy): Further, the widgetId we were given does not even
            // look like a widget ID (ie. `widget-type \d+`). I can't figure
            // out how to trigger this line of code though.
            /* c8 ignore next line */
            return {};
        }
        return {
            type: widgetIdParts[1],
            graded: true,
            options: {},
        };
    };

    _getWidgetInfo: (widgetId: string) => PerseusWidget = (
        widgetId: string,
    ): PerseusWidget => {
        return (
            this.state.widgetInfo[widgetId] ||
            this._getDefaultWidgetInfo(widgetId)
        );
    };

    renderWidget: (
        impliedType: string,
        id: string,
        state: WidgetState,
    ) => null | React.ReactNode = (
        impliedType: string,
        id: string,
        state: WidgetState,
    ) => {
        const widgetInfo = this.state.widgetInfo[id];

        if (widgetInfo && widgetInfo.alignment === "full-width") {
            state.foundFullWidth = true;
        }

        if (widgetInfo) {
            const type = (widgetInfo && widgetInfo.type) || impliedType;

            let shouldHighlight = false;
            if (this.props.highlightEmptyWidgets && this.props.userInput) {
                const emptyWidgetIds = emptyWidgetsFunctional(
                    this.state.widgetInfo,
                    this.widgetIds,
                    this.props.userInput,
                    this.context.locale,
                );
                shouldHighlight = emptyWidgetIds.includes(id);
            }

            // By this point we should have no duplicates, which are
            // filtered out in this.render(), so we shouldn't have to
            // worry about using this widget key and ref:
            return (
                <WidgetContainer
                    key={makeContainerId(id)}
                    id={id}
                    ref={(node) => {
                        const containerId = makeContainerId(id);
                        if (node != null) {
                            this._widgetContainers.set(containerId, node);
                        } else {
                            this._widgetContainers.delete(containerId);
                        }
                    }}
                    type={type}
                    widgetProps={this.getWidgetProps(id)}
                    shouldHighlight={shouldHighlight}
                    linterContext={PerseusLinter.pushContextStack(
                        this.props.linterContext,
                        "widget",
                    )}
                />
            );
        }
        return null;
    };

    _getWidgetIndexById(id: string) {
        const widgetIndex = this.widgetIds.indexOf(id);
        if (widgetIndex < 0) {
            Log.error(
                "Unable to get widget index in _getWidgetIndexById",
                Errors.Internal,
                {
                    loggedMetadata: {
                        widgets: JSON.stringify(this.props.widgets),
                        widgetId: JSON.stringify(id),
                    },
                },
            );
            return 0;
        }
        return widgetIndex;
    }

    getWidgetProps(
        widgetId: string,
    ): WidgetProps<any, any, PerseusWidgetOptions> {
        const apiOptions = this.getApiOptions();
        const widgetProps = this.props.widgets[widgetId].options;

        // The widget needs access to its "scoring data" at all times when in review
        // mode (which is really just part of its widget info).
        const widgetInfo = this.state.widgetInfo[widgetId];

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!this._interactionTrackers) {
            this._interactionTrackers = {};
        }

        let interactionTracker = this._interactionTrackers[widgetId];
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!interactionTracker) {
            interactionTracker = this._interactionTrackers[widgetId] =
                new InteractionTracker(
                    apiOptions.trackInteraction,
                    widgetInfo && widgetInfo.type,
                    widgetId,
                    Widgets.getTracking(widgetInfo && widgetInfo.type),
                );
        }

        return {
            ...widgetProps,
            userInput: this.props.userInput?.[widgetId],
            widgetId: widgetId,
            widgetIndex: this._getWidgetIndexById(widgetId),
            alignment: widgetInfo && widgetInfo.alignment,
            static: widgetInfo?.static,
            problemNum: this.props.problemNum,
            apiOptions: this.getApiOptions(),
            keypadElement: this.props.keypadElement,
            showSolutions: this.props.showSolutions,
            onFocus: _.partial(this._onWidgetFocus, widgetId),
            onBlur: _.partial(this._onWidgetBlur, widgetId),
            findWidgets: this.findWidgets,
            reviewMode: this.props.reviewMode,
            handleUserInput: (newUserInput: UserInput) => {
                // Calculate widgetsEmpty using the updated user input
                const updatedUserInput = {
                    ...this.props.userInput,
                    [widgetId]: newUserInput,
                };
                const emptyWidgetIds = emptyWidgetsFunctional(
                    this.state.widgetInfo,
                    this.widgetIds,
                    updatedUserInput,
                    this.context.locale,
                );
                const widgetsEmpty = emptyWidgetIds.length > 0;
                this.props.handleUserInput?.(
                    widgetId,
                    newUserInput,
                    widgetsEmpty,
                );
                this.props.onInteractWithWidget(widgetId);
            },
            trackInteraction: interactionTracker.track,
        };
    }

    /**
     * Serializes the questions state so it can be recovered.
     *
     * If an instance of widgetProps is passed in, it generates the serialized
     * state from that instead of the current widget props.
     */
    // TODO(LEMS-3185): remove serializedState
    /**
     * @deprecated - do not use in new code.
     */
    getSerializedState(): Record<string, any> {
        return mapObject(this.props.widgets, (widgetData, widgetId) => {
            const widget = this.getWidgetInstance(widgetId);
            if (widget && widget.getSerializedState) {
                return excludeDenylistKeys(widget.getSerializedState());
            }
            return widgetData.options;
        });
    }

    /**
     * Allows inter-widget communication.
     *
     * This function yields this Renderer's own internal widgets, and it's used
     * in two places.
     *
     * First, we expose our own internal widgets to each other by giving them
     * a `findWidgets` function that, in turn, calls this function.
     *
     * Second, we expose our own internal widgets to this Renderer's parent,
     * by allowing it to call this function directly. That way, it can hook us
     * up to other Renderers on the page, by writing a `findExternalWidgets`
     * prop that calls each other Renderer's `findInternalWidgets` function.
     *
     * Takes a `filterCriterion` on which widgets to return.
     * `filterCriterion` can be one of:
     *  * A string widget id
     *  * A string widget type
     *  * a function from (id, widgetInfo, widgetComponent) to true or false
     *
     * Returns an array of the matching widget components.
     *
     * If you need to do logic with more than the components, it is possible
     * to do such logic inside the filter, rather than on the result array.
     *
     * See the passage-ref widget for an example.
     *
     * "Remember: abilities are not inherently good or evil, it's how you use
     * them." ~ Kyle Katarn
     * Please use this one with caution.
     */
    findInternalWidgets: (
        filterCriterion: FilterCriterion,
    ) => ReadonlyArray<Widget | null | undefined> = (
        filterCriterion: FilterCriterion,
    ) => {
        let filterFunc;
        // Convenience filters:
        // "interactive-graph 3" will give you [[interactive-graph 3]]
        // "interactive-graph" will give you all interactive-graphs
        if (typeof filterCriterion === "string") {
            if (filterCriterion.indexOf(" ") !== -1) {
                const widgetId = filterCriterion;
                filterFunc = (
                    id: string,
                    widgetInfo: PerseusWidget,
                    widget?: Widget | null,
                ) => id === widgetId;
            } else {
                const widgetType = filterCriterion;
                filterFunc = (
                    id: string,
                    widgetInfo: PerseusWidget,
                    widget?: Widget | null,
                ) => {
                    return widgetInfo.type === widgetType;
                };
            }
        } else {
            filterFunc = filterCriterion;
        }

        const results: ReadonlyArray<Widget | null | undefined> = this.widgetIds
            .filter((id: string) => {
                const widgetInfo = this._getWidgetInfo(id);
                const widget = this.getWidgetInstance(id);
                return filterFunc(id, widgetInfo, widget);
            })
            .map(this.getWidgetInstance);

        return results;
    };

    /**
     * Allows inter-widget communication.
     *
     * Includes both widgets internal to this Renderer, and external widgets
     * exposed by the `findExternalWidgets` prop.
     *
     * See `findInteralWidgets` for more information.
     */
    findWidgets: (filterCriterion: FilterCriterion) => any = (
        filterCriterion: FilterCriterion,
    ) => {
        return [
            ...this.findInternalWidgets(filterCriterion),
            ...this.props.findExternalWidgets(filterCriterion),
        ];
    };

    getWidgetInstance: (id: string) => Widget | null | undefined = (id) => {
        const ref = this._widgetContainers.get(makeContainerId(id));
        if (!ref) {
            return null;
        }
        return ref.getWidget();
    };

    _onWidgetFocus: (id: string, focusPath?: ReadonlyArray<string>) => void = (
        id: string,
        focusPath: ReadonlyArray<string> = [],
    ) => {
        if (!_.isArray(focusPath)) {
            throw new PerseusError(
                "widget props.onFocus focusPath must be an Array, " +
                    "but was" +
                    JSON.stringify(focusPath),
                Errors.Internal,
            );
        }
        this._setCurrentFocus([id].concat(focusPath));
    };

    _onWidgetBlur: (id: string, blurPath: FocusPath) => void = (
        id: string,
        blurPath: FocusPath,
    ) => {
        const blurringFocusPath = this._currentFocus;

        // Failsafe: abort if ID is different, because focus probably happened
        // before blur
        // @ts-expect-error - TS2769 - No overload matches this call.
        const fullPath = [id].concat(blurPath);
        if (!_.isEqual(fullPath, blurringFocusPath)) {
            return;
        }

        // Wait until after any new focus events fire this tick before
        // declaring that nothing is focused.
        // If a different widget was focused, we'll see an onBlur event
        // now, but then an onFocus event on a different element before
        // this callback is executed
        _.defer(() => {
            if (_.isEqual(this._currentFocus, blurringFocusPath)) {
                this._setCurrentFocus(null);
            }
        });
    };

    getContent: (props: Props, state: State) => any = (
        props: Props,
        state: State,
    ) => {
        return state.jiptContent || props.content;
    };

    shouldRenderJiptPlaceholder: (props: Props, state: State) => boolean = (
        props: Props,
        state: State,
    ): boolean => {
        // TODO(aria): Pass this in via khan/frontend as an apiOption
        return (
            getDependencies().JIPT.useJIPT &&
            state.jiptContent == null &&
            props.content.indexOf("crwdns") !== -1
        );
    };

    replaceJiptContent: (content: string, paragraphIndex: number) => void = (
        content: string,
        paragraphIndex: number,
    ) => {
        if (paragraphIndex == null) {
            // we're not translating paragraph-wise; replace the whole content
            // (we could also theoretically check for apiOptions.isArticle
            // here, which is what causes paragraphIndex to not be null)
            this.setState({
                jiptContent: content,
            });
        } else {
            // This is the same regex we use in perseus/translate.py to find
            // code blocks. We use it to count entire code blocks as
            // paragraphs.
            const codeFenceRegex =
                /^\s*(`{3,}|~{3,})\s*(\S+)?\s*\n([\s\S]+?)\s*\1\s*$/;

            if (codeFenceRegex.test(content)) {
                // If a paragraph is a code block, we're going to treat it as a
                // single paragraph even if it has double-newlines in it, so
                // skip the next two checks.
            } else if (/\S\n\s*\n\S/.test(content)) {
                // Our "render the exact same QuestionParagraphs each time"
                // strategy will fail if we allow translating a paragraph
                // to more than one paragraph. This hack renders as a single
                // paragraph and lets the translator know to not use \n\n,
                // hopefully. We can't wait for linting because we can't
                // safely render the node.
                // TODO(aria): Check for the max number of backticks or tildes
                // in the content, and just render a red code block of the
                // content here instead?
                content =
                    "$\\large{\\red{\\text{Please translate each " +
                    "paragraph to a single paragraph.}}}$";
            } else if (/^\s*$/.test(content)) {
                // We similarly can't have an all-whitespace paragraph, or
                // we will parse it as the closing of the previous paragraph
                content =
                    "$\\large{\\red{\\text{Translated paragraph is " +
                    "currently empty}}}$";
            }
            // Split the paragraphs; we have to use getContent() in case
            // nothing has been translated yet (in which case we just have
            // this.props.content)
            const allContent = this.getContent(this.props, this.state);
            const paragraphs = JiptParagraphs.parseToArray(allContent);
            paragraphs[paragraphIndex] = content;
            this.setState({
                jiptContent: JiptParagraphs.joinFromArray(paragraphs),
            });
        }
    };

    // wrap top-level elements in a QuestionParagraph, mostly
    // for appropriate spacing and other css
    // @ts-expect-error - TS2322 - Type '(ast: any, state: WidgetState) => never[] | JSX.Element' is not assignable to type '(ast: any, state: WidgetState) => ReactElement<any, string | JSXElementConstructor<any>>'.
    outputMarkdown: (ast: any, state: WidgetState) => React.ReactElement = (
        ast: any,
        state: WidgetState,
    ) => {
        if (_.isArray(ast)) {
            // This is duplicated from simple-markdown
            // TODO(aria): Don't duplicate this logic
            const oldKey = state.key;
            const result = [];

            // map nestedOutput over the ast, except group any text
            // nodes together into a single string output.
            // NOTE(aria): These are never strings--always QuestionParagraphs
            // TODO(aria): We probably don't need this string logic here.
            let lastWasString = false;
            for (let i = 0; i < ast.length; i++) {
                state.key = i;
                state.paragraphIndex = i;
                const nodeOut = this.outputMarkdown(ast[i], state);
                const isString = typeof nodeOut === "string";
                // NOTE(jeremy): As far as I can tell, this if is _never_
                // reached. As noted above, these are always QuestionParagraphs
                // now.
                /* c8 ignore if */
                if (typeof nodeOut === "string" && lastWasString) {
                    // @ts-expect-error - TS2322 - Type 'number' is not assignable to type 'never'.
                    result[result.length - 1] += nodeOut;
                } else {
                    // @ts-expect-error - TS2345 - Argument of type 'ReactElement<any, string | JSXElementConstructor<any>>' is not assignable to parameter of type 'never'.
                    result.push(nodeOut);
                }
                lastWasString = isString;
            }

            state.key = oldKey;
            return result;
        }
        // !!! WARNING: Mutative hacks! mutates `this._foundTextNodes`:
        // because I wrote a bad interface to simple-markdown.js' `output`
        this._foundTextNodes = false;
        state.foundFullWidth = false;
        const output = this.outputNested(ast, state);

        // In Jipt-land, we need to render the exact same outer
        // QuestionParagraph nodes always. This means the number of
        // paragraphs needs to stay the same, and we can't modify
        // the classnames on the QuestionParagraphs or we'll destroy
        // the crowdin classnames. So we just only use the
        // 'paragraph' classname from the QuestionParagraph.
        // If this becomes a problem it would be easy to fix by wrapping
        // the nodes in an extra layer (hopefully only for jipt) that
        // handles the jipt classnames, and let this layer handle the
        // dynamic classnames.
        // We can't render the classes the first time and leave them
        // the same because we don't know at the time of the first
        // render whether they are full-bleed or centered, since they
        // only contain crowdin IDs like `crwdns:972384209:0...`
        let className;
        if (this.translationIndex != null) {
            className = null;
        } else {
            className = classNames({
                "perseus-paragraph-centered": !this._foundTextNodes,
                // There is only one node being rendered,
                // and it's a full-width widget.
                "perseus-paragraph-full-width":
                    state.foundFullWidth && ast.content.length === 1,
            });
        }

        return (
            <QuestionParagraph
                key={state.key}
                className={className}
                translationIndex={this.translationIndex}
                paragraphIndex={state.paragraphIndex}
                inline={this.props.inline}
            >
                <ErrorBoundary>{output}</ErrorBoundary>
            </QuestionParagraph>
        );
    };

    // output non-top-level nodes or arrays
    outputNested: (ast: any, state: WidgetState) => React.ReactElement = (
        ast: any,
        state: WidgetState,
    ) => {
        if (_.isArray(ast)) {
            // This is duplicated from simple-markdown
            // TODO(aria): Don't duplicate this logic
            const oldKey = state.key;
            const result: Array<string | React.ReactNode> = [];

            // map nestedOutput over the ast, except group any text
            // nodes together into a single string output.
            let lastWasString = false;
            for (let i = 0; i < ast.length; i++) {
                state.key = i;
                const nodeOut = this.outputNested(ast[i], state);
                const isString = typeof nodeOut === "string";
                if (typeof nodeOut === "string" && lastWasString) {
                    /**
                     * We know that last was string, but TypeScript can't see this
                     * refinement.
                     */
                    result[result.length - 1] += nodeOut;
                } else {
                    result.push(nodeOut);
                }
                lastWasString = isString;
            }

            state.key = oldKey;
            return result;
        }
        return this.outputNode(ast, this.outputNested, state);
    };

    // output individual AST nodes [not arrays]
    outputNode: (
        node: any,
        nestedOutput: any,
        state: WidgetState,
    ) =>
        | any
        | null
        | React.ReactElement<React.ComponentProps<"div">>
        | React.ReactElement<React.ComponentProps<"span">>
        | React.ReactNode = (
        node: any,
        nestedOutput: any,
        state: WidgetState,
    ) => {
        const apiOptions = this.getApiOptions();
        const imagePlaceholder = apiOptions.imagePlaceholder;

        if (node.type === "widget") {
            const widgetPlaceholder = apiOptions.widgetPlaceholder;

            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (widgetPlaceholder) {
                return widgetPlaceholder;
            }
            // Widgets can contain text nodes, so we don't center them with
            // markdown magic here.
            // Instead, we center them with css magic in styles.css
            // /cry(aria)
            this._foundTextNodes = true;

            if (this.widgetIds.includes(node.id)) {
                // We don't want to render a duplicate widget key/ref,
                // as this causes problems with react (for obvious
                // reasons). Instead we just notify the
                // hopefully-content-creator that they need to change the
                // widget id.
                return (
                    <span key={state.key} className="renderer-widget-error">
                        {[
                            "Widget [[",
                            "☃",
                            " ",
                            node.id,
                            "]] already exists.",
                        ].join("")}
                    </span>
                );
            }
            this.widgetIds.push(node.id);
            return this.renderWidget(node.widgetType, node.id, state);
        }
        if (node.type === "blockMath") {
            // We render math here instead of in perseus-markdown.jsx
            // because we need to pass it our onRender callback.
            const content = preprocessTex(node.content);

            const innerStyle = {
                // HACK(benkomalo): we only want horizontal scrolling, but
                // overflowX: 'auto' causes a vertical scrolling scrollbar
                // as well, despite the parent and child elements having
                // the exact same height. Force it to not scroll by
                // applying overflowY: 'hidden'
                overflowX: "auto",
                overflowY: "hidden",

                // HACK(kevinb): overflowY: 'hidden' inadvertently clips the
                // top and bottom of some fractions.  We add padding to the
                // top and bottom to avoid the clipping and then correct for
                // the padding by adding equal but opposite margins.
                paddingTop: 10,
                paddingBottom: 10,
                marginTop: -10,
                marginBottom: -10,
            } as const;

            if (apiOptions.isMobile) {
                // The style for the body of articles and exercises on mobile is
                // to have a 16px margin.  When a user taps to zoom math we'd
                // like the math to extend all the way to the edge of the page/
                // To achieve this affect we nest the Zoomable component in two
                // nested divs. The outer div has a negative margin to
                // counteract the margin on main perseus container.  The inner
                // div adds the margin back as padding so that when the math is
                // scaled out it's inset from the edge of the page.  When the
                // TeX component is full size it will extend to the edge of the
                // page if it's larger than the page.
                //
                // TODO(kevinb) automatically determine the margin size
                const margin = 16;
                const outerStyle = {
                    marginLeft: -margin,
                    marginRight: -margin,
                } as const;
                const horizontalPadding = {
                    paddingLeft: margin,
                    paddingRight: margin,
                } as const;

                const mobileInnerStyle = {
                    ...innerStyle,
                    ...styles.mobileZoomableParentFix,
                } as const;

                return (
                    <div
                        key={state.key}
                        className="perseus-block-math"
                        style={outerStyle}
                    >
                        <ErrorBoundary>
                            <div
                                className="perseus-block-math-inner"
                                style={{
                                    ...mobileInnerStyle,
                                    ...horizontalPadding,
                                }}
                            >
                                <ZoomableTeX>{content}</ZoomableTeX>
                            </div>
                        </ErrorBoundary>
                    </div>
                );
            }
            return (
                <div key={state.key} className="perseus-block-math">
                    <ErrorBoundary>
                        <div
                            className="perseus-block-math-inner"
                            style={innerStyle}
                        >
                            <AssetContext.Consumer>
                                {({setAssetStatus}) => (
                                    <TeX setAssetStatus={setAssetStatus}>
                                        {content}
                                    </TeX>
                                )}
                            </AssetContext.Consumer>
                        </div>
                    </ErrorBoundary>
                </div>
            );
        }
        if (node.type === "math") {
            const tex = node.content;

            // We render math here instead of in perseus-markdown.jsx
            // because we need to pass it our onRender callback.
            return (
                <span
                    key={state.key}
                    style={{
                        // If math is directly next to text, don't let it
                        // wrap to the next line
                        whiteSpace: "nowrap",
                    }}
                >
                    <ErrorBoundary>
                        {/* We add extra empty spans around the math to make it not
                        wrap (I don't know why this works, but it does) */}
                        <span />
                        <AssetContext.Consumer>
                            {({setAssetStatus}) => (
                                <TeX
                                    onRender={this.props.onRender}
                                    setAssetStatus={setAssetStatus}
                                >
                                    {tex}
                                </TeX>
                            )}
                        </AssetContext.Consumer>
                        <span />
                    </ErrorBoundary>
                </span>
            );
        }
        if (node.type === "image") {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (imagePlaceholder) {
                return imagePlaceholder;
            }

            // We need to add width and height to images from our
            // props.images mapping.

            // We do a _.has check here to avoid weird things like
            // 'toString' or '__proto__' as a url.
            const extraAttrs = _.has(this.props.images, node.target)
                ? this.props.images[node.target]
                : null;

            // The width of a table column is determined by the widest table
            // cell within that column, but responsive images constrain
            // themselves to the width of their parent containers. Thus,
            // responsive images don't do very well within tables. To avoid
            // haphazard sizing, simply make images within tables unresponsive.
            // TODO(alex): Make tables themselves responsive.
            const responsive = !state.inTable;
            return (
                <ErrorBoundary key={state.key}>
                    <AssetContext.Consumer>
                        {({setAssetStatus}) => (
                            <SvgImage
                                allowZoom={true}
                                setAssetStatus={setAssetStatus}
                                // @ts-expect-error - TS2322 - Type 'string | null | undefined' is not assignable to type 'string | undefined'.
                                src={PerseusMarkdown.sanitizeUrl(node.target)}
                                alt={node.alt}
                                title={node.title}
                                responsive={responsive}
                                onUpdate={this.props.onRender}
                                zoomToFullSizeOnMobile={
                                    apiOptions.isMobile && apiOptions.isArticle
                                }
                                {...extraAttrs}
                            />
                        )}
                    </AssetContext.Consumer>
                </ErrorBoundary>
            );
        }
        if (node.type === "columns") {
            // Note that we have two columns. This is so we can put
            // a className on the outer renderer content for SAT.
            // TODO(aria): See if there is a better way we can do
            // things like this
            this._isTwoColumn = true;
            // but then render normally:
            return (
                <ErrorBoundary key={state.key}>
                    {PerseusMarkdown.ruleOutput(node, nestedOutput, state)}
                </ErrorBoundary>
            );
        }
        if (node.type === "text") {
            if (rContainsNonWhitespace.test(node.content)) {
                this._foundTextNodes = true;
            }

            // Used by the translator portal to replace image URLs with
            // placeholders, see preprocessWidgets in manticore-utils.js
            // for more details.
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (imagePlaceholder && rImageURL.test(node.content)) {
                return imagePlaceholder;
            }
            return node.content;
        }
        if (node.type === "table" || node.type === "titledTable") {
            const output = PerseusMarkdown.ruleOutput(node, nestedOutput, {
                ...state,
                isMobile: apiOptions.isMobile,
                inTable: true,
            });

            if (!apiOptions.isMobile) {
                return output;
            }

            const margin = 16;
            const outerStyle = {
                marginLeft: -margin,
                marginRight: -margin,
            } as const;
            const innerStyle = {
                paddingLeft: 0,
                paddingRight: 0,
            } as const;
            const mobileInnerStyle = {
                ...innerStyle,
                ...styles.mobileZoomableParentFix,
            } as const;

            const wrappedOutput = (
                <div style={{...mobileInnerStyle, overflowX: "auto"}}>
                    <ErrorBoundary>
                        <Zoomable animateHeight={true}>{output}</Zoomable>
                    </ErrorBoundary>
                </div>
            );

            // TODO(benkomalo): how should we deal with tappable items inside
            // of tables?
            return <div style={outerStyle}>{wrappedOutput}</div>;
        }
        // If it's a "normal" or "simple" markdown node, just
        // output it using its output rule.
        return (
            <ErrorBoundary key={state.key}>
                {PerseusMarkdown.ruleOutput(node, nestedOutput, state)}
            </ErrorBoundary>
        );
    };

    handleRender: (prevProps: Props) => void = (prevProps: Props) => {
        const onRender = this.props.onRender;
        const oldOnRender = prevProps.onRender;

        // In the common case of no callback specified, avoid this work.
        if (onRender !== noopOnRender || oldOnRender !== noopOnRender) {
            // @ts-expect-error - TS2769 - No overload matches this call. | TS2339 - Property 'find' does not exist on type 'JQueryStatic'.
            const $images = $(ReactDOM.findDOMNode(this)).find("img");

            // Fire callback on image load...
            if (oldOnRender !== noopOnRender) {
                $images.off("load", oldOnRender);
            }

            if (onRender !== noopOnRender) {
                $images.on("load", onRender);
            }
        }

        // ...as well as right now (non-image, non-TeX or image from cache)
        onRender();
    };

    // Sets the current focus path
    // If the new focus path is not a prefix of the old focus path,
    // we send an onChangeFocus event back to our parent.
    _setCurrentFocus: (path: FocusPath) => void = (path: FocusPath) => {
        const apiOptions = this.getApiOptions();

        // We don't do this when the new path is a prefix because
        // that prefix is already focused (we're just in a more specific
        // area of it). This makes it safe to call _setCurrentFocus
        // whenever a widget is interacted with--we won't wipe out
        // our focus state if we are already focused on a subpart
        // of that widget (i.e. a transformation NumberInput inside
        // of a transformer widget).
        if (!isIdPathPrefix(path, this._currentFocus)) {
            const prevFocus = this._currentFocus;

            if (prevFocus) {
                this.blurPath(prevFocus);
            }

            this._currentFocus = path;
            apiOptions.onFocusChange(this._currentFocus, prevFocus);
        }
    };

    focus: () => boolean | null | undefined = () => {
        let id;
        let focusResult;
        for (let i = 0; i < this.widgetIds.length; i++) {
            const widgetId = this.widgetIds[i];
            const widget = this.getWidgetInstance(widgetId);
            const widgetFocusResult = widget?.focus?.();
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (widgetFocusResult) {
                id = widgetId;
                focusResult = widgetFocusResult;
                break;
            }
        }

        if (id) {
            // reconstruct a {path, element} focus object
            let path;
            if (typeof focusResult === "object") {
                // TODO(jeremy): I am 99% sure this path is no longer possible.
                // In D10274, focus management sometimes returned an object
                // with a `path` and `element` key. But later in D11387 and
                // D13664 things have been changed and seemingly removed the
                // object return value.
                // The result of focus was a {path, id} object itself
                path = [id].concat(focusResult.path || []);
                Log.error(
                    "Renderer received a focus result of type 'object' " +
                        "instead of the expected type 'boolean'",
                    Errors.Internal,
                    {
                        loggedMetadata: {
                            focusResult: JSON.stringify(focusResult),
                        },
                    },
                );
            } else {
                // The result of focus was true or the like; just
                // construct a root focus object
                path = [id];
            }

            this._setCurrentFocus(path);
            return true;
        }
    };

    getDOMNodeForPath: (path: FocusPath) => Element | Text | null | undefined =
        (path: FocusPath) => {
            // @ts-expect-error - TS2345 - Argument of type 'FocusPath' is not assignable to parameter of type 'List<any>'.
            const widgetId = _.first(path);
            // @ts-expect-error - TS2345 - Argument of type 'FocusPath' is not assignable to parameter of type 'List<any>'.
            const interWidgetPath = _.rest(path);

            // Widget handles parsing of the interWidgetPath. If the path is empty
            // beyond the widgetID, as a special case we just return the widget's
            // DOM node.
            const widget = this.getWidgetInstance(widgetId);
            if (widget?.getDOMNodeForPath) {
                return widget.getDOMNodeForPath(interWidgetPath);
            }
            if (interWidgetPath.length === 0) {
                // @ts-expect-error - TS2345 - Argument of type 'Widget | null | undefined' is not assignable to parameter of type 'ReactInstance | null | undefined'.
                return ReactDOM.findDOMNode(widget);
            }
        };

    getInputPaths: () => ReadonlyArray<FocusPath> = () => {
        const inputPaths: Array<FocusPath> = [];
        this.widgetIds.forEach((widgetId: string) => {
            const widget = this.getWidgetInstance(widgetId);
            if (widget && widget.getInputPaths) {
                // Grab all input paths and add widgetID to the front
                const widgetInputPaths = widget.getInputPaths();
                // Prefix paths with their widgetID and add to collective
                // list of paths.
                // @ts-expect-error - TS2345 - Argument of type '(inputPath: string) => void' is not assignable to parameter of type 'CollectionIterator<FocusPath, void, readonly FocusPath[]>'.
                widgetInputPaths.forEach((inputPath: string) => {
                    const relativeInputPath = [widgetId].concat(inputPath);
                    inputPaths.push(relativeInputPath);
                });
            }
        });

        return inputPaths;
    };

    focusPath: (path: FocusPath) => void = (path: FocusPath) => {
        // No need to focus if it's already focused
        if (_.isEqual(this._currentFocus, path)) {
            return;
        }
        if (this._currentFocus) {
            // Unfocus old path, if exists
            this.blurPath(this._currentFocus);
        }

        // @ts-expect-error - TS2345 - Argument of type 'FocusPath' is not assignable to parameter of type 'List<any>'.
        const widgetId = _.first(path);
        // @ts-expect-error - TS2345 - Argument of type 'FocusPath' is not assignable to parameter of type 'List<any>'.
        const interWidgetPath = _.rest(path);

        // Widget handles parsing of the interWidgetPath
        const focusWidget = this.getWidgetInstance(widgetId);
        focusWidget?.focusInputPath?.(interWidgetPath);
    };

    blurPath: (path: FocusPath) => void = (path: FocusPath) => {
        // No need to blur if it's not focused
        if (!_.isEqual(this._currentFocus, path)) {
            return;
        }

        // @ts-expect-error - TS2345 - Argument of type 'FocusPath' is not assignable to parameter of type 'List<any>'.
        const widgetId = _.first(path);
        // @ts-expect-error - TS2345 - Argument of type 'FocusPath' is not assignable to parameter of type 'List<any>'.
        const interWidgetPath = _.rest(path);
        const widget = this.getWidgetInstance(widgetId);
        // We might be in the editor and blurring a widget that no
        // longer exists, so only blur if we actually found the widget
        if (widget) {
            const blurWidget = this.getWidgetInstance(widgetId);
            // Widget handles parsing of the interWidgetPath
            blurWidget?.blurInputPath?.(interWidgetPath);
        }
    };

    blur: () => void = () => {
        if (this._currentFocus) {
            this.blurPath(this._currentFocus);
        }
    };

    /**
     * Serializes widget state. Seems to be used only by editors though.
     *
     * @deprecated and likely a very broken API
     * [LEMS-3185] do not trust serializedState
     */
    serialize: () => Record<any, any> = () => {
        const state: Record<string, any> = {};
        _.each(
            this.state.widgetInfo,
            function (info, id) {
                // eslint-disable-next-line @typescript-eslint/no-invalid-this
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                // eslint-disable-next-line @typescript-eslint/no-invalid-this
                const widget = this.getWidgetInstance(id);
                const s = widget.serialize();
                if (!_.isEmpty(s)) {
                    state[id] = s;
                }
            },
            this,
        );
        return state;
    };

    /**
     * Returns an array of widget ids that are empty (meaning widgets where the
     * learner has not interacted with the widget yet or has not filled in all
     * fields).  For example, the `interactive-graph` widget is considered
     * empty if the graph is in the starting state.
     */
    emptyWidgets(): ReadonlyArray<string> {
        if (!this.props.userInput) {
            throw new Error(
                `emptyWidgets called without providing userInput to Renderer`,
            );
        }

        return emptyWidgetsFunctional(
            this.state.widgetInfo,
            this.widgetIds,
            this.props.userInput,
            this.context.locale,
        );
    }

    handleStateUpdate(id: string, cb: () => boolean, silent?: boolean) {
        // Wait until all components have rendered. In React 16 setState
        // callback fires immediately after this componentDidUpdate, and
        // there is no guarantee that parent/siblings components have
        // finished rendering.
        // TODO(jeff, CP-3128): Use Wonder Blocks Timing API
        // eslint-disable-next-line no-restricted-syntax
        setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            const cbResult = cb && cb();
            if (!silent) {
                this.props.onInteractWithWidget(id);
            }
            if (cbResult !== false) {
                // TODO(jack): For some reason, some widgets don't always
                // end up in refs here, which is repro-able if you make an
                // [[ orderer 1 ]] and copy-paste this, then change it to
                // be an [[ orderer 2 ]]. The resulting Renderer ends up
                // with an "orderer 2" ref but not an "orderer 1" ref.
                // @_@??
                // TODO(jack): Figure out why this is happening and fix it
                // As far as I can tell, this is only an issue in the
                // editor-page, so doing this shouldn't break clients
                // hopefully
                this._setCurrentFocus([id]);
            }
        }, 0);
    }

    /**
     * Returns an array of the widget `.getUserInput()` results
     *
     * TODO: can we remove this?
     * @deprecated use getUserInputMap
     */
    getUserInput(): UserInputArray {
        const userInput = this.props.userInput;
        if (!userInput) {
            throw new Error(
                `getUserInput called without providing userInput to Renderer`,
            );
        }

        return this.widgetIds.map((id: string) => {
            return userInput[id];
        });
    }

    /**
     * Returns an object of the widget `.getUserInput()` results
     */
    getUserInputMap(): UserInputMap {
        const userInput = this.props.userInput;
        if (!userInput) {
            throw new Error(
                `getUserInputMap called without providing userInput to Renderer`,
            );
        }
        return userInput;
    }

    /**
     * Returns an array of all widget IDs in the order they occur in
     * the content.
     */
    getWidgetIds: () => ReadonlyArray<string> = () => {
        return this.widgetIds;
    };

    /**
     * Returns a JSON representation of the content and widgets
     * that can be passed to an LLM for prompt context.
     */
    getPromptJSON(): RendererPromptJSON {
        const {content} = this.props;
        const widgetJSON = {};

        this.widgetIds.forEach((id) => {
            const widget = this.getWidgetInstance(id);

            widgetJSON[id] = widget?.getPromptJSON?.() || {};
        });

        return {
            content,
            widgets: widgetJSON,
        };
    }

    /**
     * Scores the content.
     *
     * @deprecated use scorePerseusItem
     */
    score(): PerseusScore {
        if (!this.props.userInput) {
            throw new Error(
                `score called without providing userInput to Renderer`,
            );
        }

        const scores = scoreWidgetsFunctional(
            this.state.widgetInfo,
            this.widgetIds,
            this.props.userInput,
            this.context.locale,
        );
        const combinedScore = flattenScores(scores);
        return combinedScore;
    }

    // TranslationLinter callback
    handletranslationLintErrors: (lintErrors: ReadonlyArray<string>) => void = (
        lintErrors: ReadonlyArray<string>,
    ) => {
        if (!this._isMounted) {
            return;
        }

        this.setState({
            translationLintErrors: lintErrors,
        });
    };

    render(): React.ReactNode {
        const apiOptions = this.getApiOptions();

        const content = this.getContent(this.props, this.state);
        // `this.widgetIds` is appended to in `this.outputMarkdown`:
        this.widgetIds = [];

        if (this.shouldRenderJiptPlaceholder(this.props, this.state)) {
            // Crowdin's JIPT (Just in place translation) uses a fake language
            // with language tag "en-pt" where the value of the translations
            // look like: {crwdns2657085:0}{crwdne2657085:0} where it keeps the
            // {crowdinId:ngettext variant}. We detect whether the current
            // content matches this, so we can take over rendering of
            // the perseus content as the translators interact with jipt.
            // We search for only part of the tag that crowdin uses to guard
            // against them changing the format on us. The full tag it looks
            // for can be found in https://cdn.crowdin.net/jipt/jipt.js
            // globalPhrase var.

            // If we haven't already added this component to the registry do so
            // now. showHints() may cause this component to be rerendered
            // before jipt has a chance to replace its contents, so this check
            // will keep us from adding the component to the registry a second
            // time.
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (!this.translationIndex) {
                this.translationIndex =
                    getDependencies().rendererTranslationComponents.addComponent(
                        this,
                    );
            }

            // For articles, we add jipt data to individual paragraphs. For
            // exercises, we add it to the renderer and let translators
            // translate the entire thing. For the article equivalent of
            // this if block, search this file for where we render a
            // QuestionParagraph, and see the `isJipt:` parameter sent to
            // PerseusMarkdown.parse()
            if (!apiOptions.isArticle) {
                // We now need to output this tag, as jipt looks for it to be
                // able to replace it with a translation that it runs an ajax
                // call to get.  We add a data attribute with the index to the
                // Persues.TranslationComponent registry so that when jipt
                // calls its before_dom_insert we can lookup this component by
                // this attribute and render the text with markdown.
                return (
                    <DefinitionProvider>
                        <div
                            data-perseus-component-index={this.translationIndex}
                        >
                            {content}
                        </div>
                    </DefinitionProvider>
                );
            }
        }

        // Hacks:
        // We use mutable state here to figure out whether the output
        // had two columns.
        // It is updated to true by `this.outputMarkdown` if a
        // column break is found
        // TODO(aria): We now have a state variable threaded through
        // simple-markdown output. We should mutate it instead of
        // state on this component to do this in a less hacky way.
        this._isTwoColumn = false;

        // Parse the string of markdown to a parse tree
        const parsedMarkdown = this.props.inline
            ? PerseusMarkdown.parseInline(content, {
                  // Recognize crowdin IDs while translating articles
                  // (This should never be hit by exercises, though if you
                  // decide you want to add a check that this is an article,
                  // go for it.)
                  isJipt: this.translationIndex != null,
              })
            : PerseusMarkdown.parse(content, {
                  isJipt: this.translationIndex != null,
              });

        // Optionally apply the linter to the parse tree
        if (this.props.linterContext.highlightLint) {
            // If highlightLint is true and lint is detected, this call
            // will modify the parse tree by adding lint nodes that will
            // serve to highlight the lint when rendered
            const fullLinterContext: FullLinterContext = {
                content: this.props.content,
                widgets: this.props.widgets,
                ...this.props.linterContext,
            };

            PerseusLinter.runLinter(parsedMarkdown, fullLinterContext, true);

            // Apply the lint errors from the last TranslationLinter run.
            // TODO(joshuan): Support overlapping dots.
            this._translationLinter.applyLintErrors(parsedMarkdown, [
                ...this.state.translationLintErrors,
                ...(this.props.legacyPerseusLint || []),
            ]);
        }

        // Render the linted markdown parse tree with React components
        const markdownContents = this.outputMarkdown(parsedMarkdown, {
            baseElements: apiOptions.baseElements,
        });

        const className = classNames({
            [ApiClassNames.RENDERER]: true,
            [ApiClassNames.RESPONSIVE_RENDERER]: true,
            [ApiClassNames.TWO_COLUMN_RENDERER]: this._isTwoColumn,
        });

        return (
            <DefinitionProvider>
                <div className={className}>{markdownContents}</div>
            </DefinitionProvider>
        );
    }
}

const styles = {
    mobileZoomableParentFix: {
        // NOTE(abdul): There is an issue where transform animations will
        // cause the Zoomable component to disappear when running on the
        // native app on iPad (iOS 13). I found some answers online that recommend
        // transforming the parent in 3D space. Doing this forces hardware
        // acceleration, which causes the process to run on the GPU. It's not
        // clear to me why this fixes the issue, but it's suggested online
        // to people dealing with similar disappearance and flickering issues.
        transform: "translate3d(0,0,0)",
    },
} as const;

export default Renderer;
