// @flow
/**
 * A copy of the ItemRenderer which renders its question renderer and hints
 * renderer normally instead of ReactDOM.render()ing them into elements in the
 * DOM.
 *
 * This allows this component to be used in server-rendering of a perseus
 * exercise.
 */
import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import _ from "underscore";

import AssetContext from "./asset-context.js";
import HintsRenderer from "./hints-renderer.jsx";
import Objective from "./interactive2/objective_.js";
import LoadingContext from "./loading-context.js";
import {ApiOptions} from "./perseus-api.jsx";
import Renderer from "./renderer.jsx";
import Util from "./util.js";

import type {KeypadProps} from "./mixins/provide-keypad.jsx";
import type {
    APIOptions,
    KEScore,
    FocusPath,
    RendererInterface,
} from "./types.js";

const {mapObject} = Objective;

type OwnProps = {|
    ...KeypadProps, // These props are used by the ProvideKeypad mixin.
    apiOptions: APIOptions,
    hintsVisible?: number,
    item: {
        hints: $ReadOnlyArray<Object>,
        question: Object,
        ...
    },
    problemNum?: number,
    reviewMode?: boolean,

    // from KeypadContext
    keypadElement?: ?any,
|};

type HOCProps = {|
    onRendered: (isRendered: boolean) => void,
|};

type Props = {|
    ...OwnProps,
    ...HOCProps,
|};

type DefaultProps = {|
    apiOptions: Props["apiOptions"],
    onRendered: Props["onRendered"],
|};

type State = {|
    questionCompleted: boolean,
    questionHighlightedWidgets: $ReadOnlyArray<any>,
    // Keeps track of whether each asset (SvgImage or TeX) rendered by
    // the questionRenderer has finished loading or rendering.
    assetStatuses: {[assetKey: string]: boolean, ...},
|};

type SerializedState = {|question: $FlowFixMe, hints: $FlowFixMe|};

/* eslint-disable-next-line react/no-unsafe */
export class ServerItemRenderer
    extends React.Component<Props, State>
    implements RendererInterface
{
    questionRenderer: Renderer;
    hintsRenderer: $FlowFixMe;
    _currentFocus: FocusPath;
    _fullyRendered: boolean;
    blurTimeoutID: ?TimeoutID;

    static defaultProps: DefaultProps = {
        apiOptions: ({}: any), // a deep default is done in `this.update()`
        onRendered: (isRendered: boolean) => {},
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            questionCompleted: false,
            questionHighlightedWidgets: [],
            assetStatuses: {},
        };
        this._fullyRendered = false;
    }

    componentDidMount() {
        this._currentFocus = null;
        this._fullyRendered = false;
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        this.setState({
            questionHighlightedWidgets: [],
        });
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (this.props.apiOptions.answerableCallback) {
            const isAnswerable =
                this.questionRenderer.emptyWidgets().length === 0;
            const {answerableCallback} = this.props.apiOptions;
            if (answerableCallback) {
                answerableCallback(isAnswerable);
            }
        }

        if (!this._fullyRendered) {
            const assetsLoaded = Object.values(this.state.assetStatuses).every(
                Boolean,
            );
            if (assetsLoaded) {
                this._fullyRendered = true;
                this.props.onRendered(true);
            }
        }
    }

    componentWillUnmount() {
        if (this.blurTimeoutID != null) {
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
            // eslint-disable-next-line no-restricted-syntax
            clearTimeout(this.blurTimeoutID);
            this.blurTimeoutID = null;
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

    // Sets the current focus path and element and
    // send an onChangeFocus event back to our parent.
    _setCurrentFocus(newFocus: FocusPath) {
        const {
            apiOptions: {isMobile, onFocusChange},
            keypadElement,
        } = this.props;

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

        if (onFocusChange != null) {
            onFocusChange(
                this._currentFocus,
                prevFocus,
                // $FlowFixMe[incompatible-call]: onFocusChange expects an HTMLElement or nothing
                didFocusInput && keypadElement && keypadElement.getDOMNode(),
                // $FlowFixMe[incompatible-call]: onFocusChange expects an HTMLElement or nothing
                didFocusInput &&
                    // $FlowFixMe[incompatible-call]: onFocusChange expects an HTMLElement or nothing
                    this.questionRenderer.getDOMNodeForPath(newFocus),
            );
        }

        if (keypadElement && isMobile) {
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
        // before blur
        if (!_.isEqual(blurPath, blurringFocusPath)) {
            return;
        }

        // Wait until after any new focus events fire this tick before
        // declaring that nothing is focused.
        // If a different widget was focused, we'll see an onBlur event
        // now, but then an onFocus event on a different element before
        // this callback is executed
        // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
        // eslint-disable-next-line no-restricted-syntax
        this.blurTimeoutID = setTimeout(() => {
            if (_.isEqual(this._currentFocus, blurringFocusPath)) {
                this._setCurrentFocus(null);
            }
        }, 0);
    }

    /**
     * Accepts a question area widgetId, or an answer area widgetId of
     * the form "answer-input-number 1", or the string "answer-area"
     * for the whole answer area (if the answer area is a single widget).
     */
    // eslint-disable-next-line ft-flow/no-weak-types
    _setWidgetProps(widgetId: string, newProps: Props, callback: Function) {
        this.questionRenderer._setWidgetProps(widgetId, newProps, callback);
    }

    setInputValue(path: FocusPath, newValue: any, focus: () => void): void {
        return this.questionRenderer.setInputValue(path, newValue, focus);
    }

    focusPath(path: FocusPath): void {
        return this.questionRenderer.focusPath(path);
    }

    blurPath(path: FocusPath): void {
        return this.questionRenderer.blurPath(path);
    }

    getDOMNodeForPath(path: FocusPath): ?(Element | Text) {
        return this.questionRenderer.getDOMNodeForPath(path);
    }

    getGrammarTypeForPath(path: FocusPath): ?string {
        return this.questionRenderer.getGrammarTypeForPath(path);
    }

    getInputPaths(): $ReadOnlyArray<FocusPath> {
        const questionAreaInputPaths = this.questionRenderer.getInputPaths();
        return questionAreaInputPaths;
    }

    handleInteractWithWidget: (widgetId: string) => void = (widgetId) => {
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

    focus(): ?boolean {
        return this.questionRenderer.focus();
    }

    blur(): void {
        if (this._currentFocus) {
            this.blurPath(this._currentFocus);
        }
    }

    getNumHints(): number {
        return this.props.item.hints.length;
    }

    /**
     * Grades the item.
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
    getWidgetIds(): $ReadOnlyArray<string> {
        return this.questionRenderer.getWidgetIds();
    }

    /**
     * Returns an object mapping from widget ID to KE-style score.
     * The keys of this object are the values of the array returned
     * from `getWidgetIds`.
     */
    scoreWidgets(): {|[string]: KEScore|} {
        const qScore = this.questionRenderer.scoreWidgets();
        const qGuess = this.questionRenderer.getUserInputForWidgets();
        const state = this.questionRenderer.getSerializedState();
        return mapObject(qScore, (score, id) => {
            return Util.keScoreFromPerseusScore(score, qGuess[id], state);
        });
    }

    /**
     * Get a representation of the current state of the item.
     */
    getSerializedState(): SerializedState {
        return {
            question: this.questionRenderer.getSerializedState(),
            hints: this.hintsRenderer.getSerializedState(),
        };
    }

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
        this.hintsRenderer.restoreSerializedState(state.hints, fireCallback);
    }

    showRationalesForCurrentlySelectedChoices() {
        this.questionRenderer.showRationalesForCurrentlySelectedChoices();
    }

    deselectIncorrectSelectedChoices() {
        this.questionRenderer.deselectIncorrectSelectedChoices();
    }

    // This must be pre-bound otherwise SvgImage's shouldComponentUpdate
    // won't behave correctly and we'll get an infinite loop.
    setAssetStatus: (assetKey: string, status: boolean) => void = (
        assetKey,
        status,
    ) => {
        // setState doesn't properly merge objects so we have to do it ourselves
        const assetStatuses = {
            ...this.state.assetStatuses,
            [assetKey]: status,
        };
        this.setState({assetStatuses});
    };

    render(): React.Node {
        const apiOptions = {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
            onFocusChange: this._handleFocusChange,
        };

        const contextValue = {
            assetStatuses: this.state.assetStatuses,
            setAssetStatus: this.setAssetStatus,
        };

        const questionRenderer = (
            <AssetContext.Provider value={contextValue}>
                <Renderer
                    keypadElement={this.props.keypadElement}
                    problemNum={this.props.problemNum}
                    onInteractWithWidget={this.handleInteractWithWidget}
                    highlightedWidgets={this.state.questionHighlightedWidgets}
                    apiOptions={apiOptions}
                    questionCompleted={this.state.questionCompleted}
                    reviewMode={this.props.reviewMode}
                    ref={(elem) => {
                        if (elem != null) {
                            this.questionRenderer = elem;
                        }
                    }}
                    content={this.props.item.question.content}
                    widgets={this.props.item.question.widgets}
                    images={this.props.item.question.images}
                />
            </AssetContext.Provider>
        );

        const hintsRenderer = (
            <HintsRenderer
                hints={this.props.item.hints}
                hintsVisible={this.props.hintsVisible}
                apiOptions={apiOptions}
                ref={(elem) => (this.hintsRenderer = elem)}
            />
        );

        return (
            <div>
                <div>{questionRenderer}</div>
                <div
                    className={
                        // Avoid adding any horizontal padding when applying the
                        // mobile hint styles, which are flush to the left.
                        // NOTE(charlie): We may still want to apply this
                        // padding for desktop exercises.
                        apiOptions.isMobile
                            ? undefined
                            : css(styles.hintsContainer)
                    }
                >
                    {hintsRenderer}
                </div>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    hintsContainer: {
        marginLeft: 50,
    },
});

const ref: React.AbstractComponent<OwnProps, ServerItemRenderer> =
    React.forwardRef((props, ref) => (
        <LoadingContext.Consumer>
            {({onRendered}) => (
                <ServerItemRenderer
                    {...props}
                    onRendered={onRendered}
                    ref={ref}
                />
            )}
        </LoadingContext.Consumer>
    ));
export default ref;
