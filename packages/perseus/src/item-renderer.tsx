/* eslint-disable react/no-unsafe */
import * as PerseusLinter from "@khanacademy/perseus-linter";
import $ from "jquery";
import * as React from "react";
import * as ReactDOM from "react-dom";
import _ from "underscore";

import HintsRenderer from "./hints-renderer";
import Objective from "./interactive2/objective_";
import ProvideKeypad from "./mixins/provide-keypad";
import {ApiOptions} from "./perseus-api";
import Renderer from "./renderer";
import Util from "./util";
import reactRender from "./util/react-render";

import type {KeypadProps} from "./mixins/provide-keypad";
import type {PerseusItem} from "./perseus-types";
import type {APIOptions, FocusPath, LinterContextProps} from "./types";
import type {KEScore} from "@khanacademy/perseus-core";

const {mapObject} = Objective;

type Props = // These props are used by the ProvideKeypad mixin.
    KeypadProps & {
        // defaults are set in `this.update()` so as to adhere to
        // `ApiOptions.PropTypes`, though the API options that are passed in
        // can be in any degree of completeness
        apiOptions: APIOptions;
        // Whether this component should control hiding/showing peripheral
        // item-related components (for list, see item.answerArea below).
        // TODO(alex): Generalize this to an 'expectsToBeInTemplate' prop
        controlPeripherals?: boolean;
        workAreaSelector: string;
        hintsAreaSelector: string;
        initialHintsVisible?: number;
        item: PerseusItem | any /* any for _multi items */;
        onShowCalculator?: () => unknown;
        onShowChi2Table?: () => unknown;
        onShowPeriodicTable?: () => unknown;
        onShowTTable?: () => unknown;
        onShowZTable?: () => unknown;
        problemNum: number;
        reviewMode: boolean;
        // TODO(kevinb): make this more precise
        savedState: any;
        linterContext: LinterContextProps;
        legacyPerseusLint?: ReadonlyArray<string>;
    };

type DefaultProps = {
    apiOptions: Props["apiOptions"];
    controlPeripherals: Props["controlPeripherals"];
    hintsAreaSelector: Props["hintsAreaSelector"];
    initialHintsVisible: Props["initialHintsVisible"];
    linterContext: Props["linterContext"];
    reviewMode: Props["reviewMode"];
    workAreaSelector: Props["workAreaSelector"];
};

type State = {
    keypadElement: HTMLElement | null | undefined; // from ProvideKeypad.getInitialState,
    hintsVisible: number;
    questionCompleted: boolean;
    questionHighlightedWidgets: ReadonlyArray<string>; // of WidgetIDs
};

type SerializedState = {
    hints: any;
    question: {
        [id: string]: any;
    };
};

class ItemRenderer extends React.Component<Props, State> {
    // @ts-expect-error [FEI-5003] - TS2564 - Property 'questionRenderer' has no initializer and is not definitely assigned in the constructor.
    questionRenderer: Renderer;
    hintsRenderer: React.ElementRef<typeof HintsRenderer> | null | undefined;
    _currentFocus: FocusPath;

    static defaultProps: DefaultProps = {
        apiOptions: ApiOptions.defaults, // defaults are set in `this.update()`
        controlPeripherals: true,
        hintsAreaSelector: "#hintsarea",
        initialHintsVisible: 0,
        workAreaSelector: "#workarea",
        reviewMode: false,
        linterContext: PerseusLinter.linterContextDefault,
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            // NOTE: This value is used in provide-keypad.jsx which contains a
            // "mixin" that this file calls methods on.
            ...ProvideKeypad.getInitialState.call(this),
            hintsVisible: props.initialHintsVisible || 0,
            questionCompleted: false,
            questionHighlightedWidgets: [],
        };
    }

    componentDidMount() {
        ProvideKeypad.componentDidMount.call(this);
        if (
            this.props.controlPeripherals &&
            this.props.apiOptions.setDrawingAreaAvailable
        ) {
            this.props.apiOptions.setDrawingAreaAvailable(true);
        }
        this._currentFocus = null;
        this.update();
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        this.setState({
            questionHighlightedWidgets: [],
        });
    }

    componentDidUpdate() {
        this.update();
    }

    componentWillUnmount() {
        ProvideKeypad.componentWillUnmount.call(this);
        const workArea = document.querySelector(this.props.workAreaSelector);
        if (workArea != null) {
            ReactDOM.unmountComponentAtNode(workArea);
        }
        const hintsArea = document.querySelector(this.props.hintsAreaSelector);
        if (hintsArea != null) {
            ReactDOM.unmountComponentAtNode(hintsArea);
        }

        if (this.props.controlPeripherals) {
            const answerArea = this.props.item.answerArea || {};
            if (answerArea.calculator) {
                $("#calculator").hide();
            }
            if (answerArea.periodicTable) {
                $(".periodic-table-info-box").hide();
            }
            if (answerArea.zTable) {
                $(".z-table-info-box").hide();
            }
            if (answerArea.tTable) {
                $(".t-table-info-box").hide();
            }
            if (answerArea.chi2Table) {
                $(".chi2-table-info-box").hide();
            }
        }
    }

    keypadElement(): any {
        return ProvideKeypad.keypadElement.call(this);
    }

    update() {
        const apiOptions = {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
            onFocusChange: this._handleFocusChange,
        } as const;

        const workArea = document.querySelector(this.props.workAreaSelector);
        const hintsArea = document.querySelector(this.props.hintsAreaSelector);
        if (!workArea || !hintsArea) {
            return;
        }

        // Since the item renderer works by rendering things into three divs
        // that have completely different places in the DOM, we have to do this
        // strangeness instead of relying on React's normal render() method.
        // TODO(alpert): Figure out how to clean this up somehow
        reactRender(
            <Renderer
                ref={(node) => {
                    if (!node) {
                        return;
                    }
                    this.questionRenderer = node;

                    // NOTE(jeremy): Why don't we just pass this into the
                    // renderer as a prop?
                    const {answerableCallback} = apiOptions;
                    if (answerableCallback) {
                        const isAnswerable =
                            this.questionRenderer.emptyWidgets().length === 0;
                        answerableCallback(isAnswerable);
                    }
                }}
                keypadElement={this.keypadElement()}
                problemNum={this.props.problemNum}
                onInteractWithWidget={this.handleInteractWithWidget}
                highlightedWidgets={this.state.questionHighlightedWidgets}
                apiOptions={apiOptions}
                questionCompleted={this.state.questionCompleted}
                reviewMode={this.props.reviewMode}
                savedState={this.props.savedState}
                linterContext={PerseusLinter.pushContextStack(
                    this.props.linterContext,
                    "question",
                )}
                {...this.props.item.question}
                legacyPerseusLint={this.props.legacyPerseusLint}
            />,
            // @ts-expect-error [FEI-5003] - TS2345 - Argument of type 'Element' is not assignable to parameter of type 'HTMLElement'.
            workArea,
        );

        reactRender(
            <HintsRenderer
                ref={(node) => (this.hintsRenderer = node)}
                hints={this.props.item.hints}
                hintsVisible={this.state.hintsVisible}
                // @ts-expect-error [FEI-5003] - TS2769 - No overload matches this call.
                apiOptions={apiOptions}
                linterContext={PerseusLinter.pushContextStack(
                    this.props.linterContext,
                    "hints",
                )}
            />,
            // @ts-expect-error [FEI-5003] - TS2345 - Argument of type 'Element' is not assignable to parameter of type 'HTMLElement'.
            hintsArea,
        );

        const answerArea = this.props.item.answerArea || {};
        if (this.props.controlPeripherals) {
            $("#calculator").toggle(answerArea.calculator || false);
            $(".periodic-table-info-box").toggle(
                answerArea.periodicTable || false,
            );
            $(".z-table-info-box").toggle(answerArea.zTable || false);
            $(".t-table-info-box").toggle(answerArea.tTable || false);
            $(".chi2-table-info-box").toggle(answerArea.chi2Table || false);
        } else {
            if (answerArea.calculator) {
                this.props.onShowCalculator && this.props.onShowCalculator();
            }
            if (answerArea.periodicTable) {
                this.props.onShowPeriodicTable &&
                    this.props.onShowPeriodicTable();
            }
            if (answerArea.zTable) {
                this.props.onShowZTable && this.props.onShowZTable();
            }
            if (answerArea.tTable) {
                this.props.onShowTTable && this.props.onShowTTable();
            }
            if (answerArea.chi2Table) {
                this.props.onShowChi2Table && this.props.onShowChi2Table();
            }
        }
    }

    _handleFocusChange: (newFocus: FocusPath, oldFocus: FocusPath) => void = (
        newFocus: FocusPath,
        oldFocus: FocusPath,
    ) => {
        if (newFocus != null) {
            this._setCurrentFocus(newFocus);
        } else {
            this._onRendererBlur(oldFocus);
        }
    };

    // Sets the current focus path and element and send an onChangeFocus event
    // back to our parent.
    _setCurrentFocus(newFocus: FocusPath) {
        const keypadElement = this.keypadElement();
        // By the time this happens, newFocus cannot be a prefix of
        // prevFocused, since we must have either been called from
        // an onFocusChange within a renderer, which is only called when
        // this is not a prefix, or between the question and answer areas,
        // which can never prefix each other.
        const prevFocus = this._currentFocus;
        this._currentFocus = newFocus;

        // Determine whether the newly focused path represents an input.
        const inputPaths = this.getInputPaths();
        const didFocusInput =
            this._currentFocus &&
            inputPaths.some((inputPath) => {
                return Util.inputPathsEqual(inputPath, this._currentFocus);
            });

        if (this.props.apiOptions.onFocusChange != null) {
            this.props.apiOptions.onFocusChange(
                this._currentFocus,
                prevFocus,
                didFocusInput && keypadElement && keypadElement.getDOMNode(),
            );
        }

        if (keypadElement) {
            if (didFocusInput) {
                keypadElement.activate();
            } else {
                keypadElement.dismiss();
            }
        }
    }

    _onRendererBlur(blurPath: FocusPath) {
        const blurringFocusPath = this._currentFocus;

        // Failsafe: abort if ID is different, because focus probably happened
        // before blur.
        if (!Util.inputPathsEqual(blurPath, blurringFocusPath)) {
            return;
        }

        // Wait until after any new focus events fire this tick before
        // declaring that nothing is focused, since if there were a focus change
        // across Renderers (e.g., from the HintsRenderer to the
        // QuestionRenderer), we could receive the blur before the focus.
        // TODO(jeff, CP-3128): Use Wonder Blocks Timing API
        // eslint-disable-next-line no-restricted-syntax
        setTimeout(() => {
            if (Util.inputPathsEqual(this._currentFocus, blurringFocusPath)) {
                this._setCurrentFocus(null);
            }
        });
    }

    /**
     * Accepts a question area widgetId, or an answer area widgetId of
     * the form "answer-input-number 1", or the string "answer-area"
     * for the whole answer area (if the answer area is a single widget).
     */
    _setWidgetProps(widgetId: string, newProps: any, callback: any) {
        this.questionRenderer._setWidgetProps(widgetId, newProps, callback);
    }

    /**
     * Sets the input value into the widget found at `path`. The `focus`
     * function provided is called when all affected widgets have been
     * re-rendered with the new value.
     */
    setInputValue(path: FocusPath, newValue: string, focus: () => void): void {
        return this.questionRenderer.setInputValue(path, newValue, focus);
    }

    focusPath(path: FocusPath): void {
        return this.questionRenderer.focusPath(path);
    }

    blurPath(path: FocusPath): void {
        return this.questionRenderer.blurPath(path);
    }

    getDOMNodeForPath(path: FocusPath): Element | Text | null | undefined {
        return this.questionRenderer.getDOMNodeForPath(path);
    }

    getGrammarTypeForPath(path: FocusPath): string | null | undefined {
        return this.questionRenderer.getGrammarTypeForPath(path);
    }

    getInputPaths(): ReadonlyArray<FocusPath> {
        const questionAreaInputPaths = this.questionRenderer.getInputPaths();
        return questionAreaInputPaths;
    }

    // NOTE: this must remain as an arrow function because we pass it Renderer
    handleInteractWithWidget: (widgetId: string) => void = (
        widgetId: string,
    ) => {
        const withRemoved = _.difference(
            this.state.questionHighlightedWidgets,
            [widgetId],
        );
        this.setState({
            questionCompleted: false,
            questionHighlightedWidgets: withRemoved,
        });

        if (this.props.apiOptions.interactionCallback) {
            this.props.apiOptions.interactionCallback();
        }
    };

    focus(): boolean | null | undefined {
        return this.questionRenderer.focus();
    }

    blur() {
        if (this._currentFocus) {
            this.blurPath(this._currentFocus);
        }
    }

    showHint() {
        if (this.state.hintsVisible < this.getNumHints()) {
            this.setState({
                hintsVisible: this.state.hintsVisible + 1,
            });
        }
    }

    getNumHints(): number {
        return this.props.item.hints.length;
    }

    /**
     * Grades the item.
     *
     * Returns a KE-style score of {
     *     empty: bool,
     *     correct: bool,
     *     message: string|null,
     *     guess: Array
     * }
     */
    scoreInput(): KEScore {
        const guessAndScore = this.questionRenderer.guessAndScore();
        const guess = guessAndScore[0];
        const score = guessAndScore[1];

        // Continue to include an empty guess for the now defunct answer area.
        // TODO(alex): Check whether we rely on the format here for
        //             analyzing ProblemLogs. If not, remove this layer.
        const maxCompatGuess = [guess, []];

        const keScore = Util.keScoreFromPerseusScore(
            score,
            maxCompatGuess,
            this.questionRenderer.getSerializedState(),
        );

        const emptyQuestionAreaWidgets = this.questionRenderer.emptyWidgets();

        this.setState({
            questionCompleted: keScore.correct,
            questionHighlightedWidgets: emptyQuestionAreaWidgets,
        });

        return keScore;
    }

    /**
     * Returns an array of all widget IDs in the order they occur in
     * the question content.
     */
    getWidgetIds(): ReadonlyArray<string> {
        return this.questionRenderer.getWidgetIds();
    }

    /**
     * Returns an object mapping from widget ID to KE-style score.
     * The keys of this object are the values of the array returned
     * from `getWidgetIds`.
     */
    scoreWidgets(): {
        [id: string]: KEScore;
    } {
        const qScore = this.questionRenderer.scoreWidgets();
        const qGuess = this.questionRenderer.getUserInputForWidgets();
        const state = this.questionRenderer.getSerializedState();
        // @ts-expect-error [FEI-5003] - TS2322 - Type 'Partial<Record<string, KEScore>>' is not assignable to type '{ [id: string]: KEScore; }'. | TS2345 - Argument of type '{ [widgetId: string]: PerseusScore; }' is not assignable to parameter of type 'Partial<Record<string, { type: "invalid"; message?: string | null | undefined; suppressAlmostThere?: boolean | null | undefined; }>>'.
        return mapObject(qScore, (score, id) => {
            return Util.keScoreFromPerseusScore(score, qGuess[id], state[id]);
        });
    }

    /**
     * Get a representation of the current state of the item.
     */
    getSerializedState(): SerializedState {
        return {
            question: this.questionRenderer.getSerializedState(),
            hints: this.hintsRenderer?.getSerializedState(),
        };
    }

    // TODO(kevinb): make the type for this state better
    restoreSerializedState(state: SerializedState, callback?: () => void) {
        // We need to wait for both the question renderer and the hints
        // renderer to finish restoring their states.
        let numCallbacks = 2;
        const fireCallback = () => {
            --numCallbacks;
            if (callback && numCallbacks === 0) {
                callback();
            }
        };

        this.questionRenderer.restoreSerializedState(
            state.question,
            fireCallback,
        );
        this.hintsRenderer?.restoreSerializedState(state.hints, fireCallback);
    }

    showRationalesForCurrentlySelectedChoices() {
        this.questionRenderer.showRationalesForCurrentlySelectedChoices();
    }

    deselectIncorrectSelectedChoices() {
        this.questionRenderer.deselectIncorrectSelectedChoices();
    }

    render(): React.ReactNode {
        return <div />;
    }
}

export default ItemRenderer;
