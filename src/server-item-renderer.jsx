/**
 * A copy of the ItemRenderer which renders its question renderer and hints
 * renderer normally instead of ReactDOM.render()ing them into elements in the
 * DOM.
 *
 * This allows this component to be used in server-rendering of a perseus
 * exercise.
 */
const React = require('react');
const ReactDOM = require("react-dom");
const _ = require("underscore");
const {StyleSheet, css} = require("aphrodite");

const ApiOptions = require("./perseus-api.jsx").Options;
const HintsRenderer = require("./hints-renderer.jsx");
const ProvideKeypad = require("./mixins/provide-keypad.jsx");
const Renderer = require("./renderer.jsx");
const Util = require("./util.js");

const {mapObject} = require("./interactive2/objective_.js");

const RP = React.PropTypes;

const ItemRenderer = React.createClass({
    propTypes: {
        apiOptions: RP.any,
        hintsVisible: RP.number,
        item: RP.shape({
            answerArea: RP.shape({
                calculator: RP.bool,
                chi2Table: RP.bool,
                periodicTable: RP.bool,
                tTable: RP.bool,
                zTable: RP.bool,
            }),
            hints: RP.arrayOf(RP.object),
            question: RP.object,
        }).isRequired,
        problemNum: RP.number,
        savedState: RP.any,
    },

    mixins: [ProvideKeypad],

    getDefaultProps: function() {
        return {
            apiOptions: {},  // a deep default is done in `this.update()`
        };
    },

    getInitialState: function() {
        return {
            questionCompleted: false,
            questionHighlightedWidgets: [],
        };
    },

    componentDidMount: function() {
        this._currentFocus = null;
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            questionHighlightedWidgets: [],
        });
    },

    componentDidUpdate: function() {
        if (this.props.apiOptions.answerableCallback) {
            const isAnswerable =
            this.questionRenderer.emptyWidgets().length === 0;
            this.props.apiOptions.answerableCallback(isAnswerable);
        }
    },

    _handleFocusChange: function(newFocus, oldFocus) {
        if (newFocus != null) {
            this._setCurrentFocus(newFocus);
        } else {
            this._onRendererBlur(oldFocus);
        }
    },

    // Sets the current focus path and element and
    // send an onChangeFocus event back to our parent.
    _setCurrentFocus: function(newFocus) {
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
        const didFocusInput = this._currentFocus &&
            inputPaths.some(inputPath => {
                return Util.inputPathsEqual(inputPath, this._currentFocus);
            });

        if (this.props.apiOptions.onFocusChange != null) {
            this.props.apiOptions.onFocusChange(
                this._currentFocus,
                prevFocus,
                didFocusInput && keypadElement &&
                    ReactDOM.findDOMNode(keypadElement)
            );
        }

        if (keypadElement) {
            if (didFocusInput) {
                keypadElement.activate();
            } else {
                keypadElement.dismiss();
            }
        }
    },

    _onRendererBlur: function(blurPath) {
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
        _.defer(() => {
            if (_.isEqual(this._currentFocus, blurringFocusPath)) {
                this._setCurrentFocus(null);
            }
        });
    },

    /**
     * Accepts a question area widgetId, or an answer area widgetId of
     * the form "answer-input-number 1", or the string "answer-area"
     * for the whole answer area (if the answer area is a single widget).
     */
    _setWidgetProps: function(widgetId, newProps, callback) {
        this.questionRenderer._setWidgetProps(
            widgetId,
            newProps,
            callback
        );
    },

    _handleAPICall: function(functionName, path) {
        // Get arguments to pass to function, including `path`
        const functionArgs = _.rest(arguments);
        const caller = this.questionRenderer;

        return caller[functionName](...functionArgs);
    },

    setInputValue: function(path, newValue, focus) {
        return this._handleAPICall('setInputValue', path, newValue, focus);
    },

    focusPath: function(path) {
        return this._handleAPICall('focusPath', path);
    },

    blurPath: function(path) {
        return this._handleAPICall('blurPath', path);
    },

    getDOMNodeForPath: function(path) {
        return this._handleAPICall('getDOMNodeForPath', path);
    },

    getGrammarTypeForPath: function(path) {
        return this._handleAPICall('getGrammarTypeForPath', path);
    },

    getInputPaths: function() {
        const questionAreaInputPaths = this.questionRenderer.getInputPaths();
        return questionAreaInputPaths;
    },

    handleInteractWithWidget: function(widgetId) {
        const withRemoved = _.difference(this.state.questionHighlightedWidgets,
                                       [widgetId]);
        this.setState({
            questionCompleted: false,
            questionHighlightedWidgets: withRemoved,
        });

        if (this.props.apiOptions.interactionCallback) {
            this.props.apiOptions.interactionCallback();
        }
    },

    focus: function() {
        return this.questionRenderer.focus();
    },

    blur: function() {
        if (this._currentFocus) {
            this.blurPath(this._currentFocus);
        }
    },

    getNumHints: function() {
        return this.props.item.hints.length;
    },

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
    scoreInput: function() {
        const guessAndScore = this.questionRenderer.guessAndScore();
        const guess = guessAndScore[0];
        const score = guessAndScore[1];

        // Continue to include an empty guess for the now defunct answer area.
        // TODO(alex): Check whether we rely on the format here for
        //             analyzing ProblemLogs. If not, remove this layer.
        const maxCompatGuess = [guess, []];

        const keScore = Util.keScoreFromPerseusScore(score, maxCompatGuess);

        const emptyQuestionAreaWidgets = this.questionRenderer.emptyWidgets();

        this.setState({
            questionCompleted: keScore.correct,
            questionHighlightedWidgets: emptyQuestionAreaWidgets,
        });

        return keScore;
    },

    /**
     * Returns an array of all widget IDs in the order they occur in
     * the question content.
     */
    getWidgetIds: function() {
        return this.questionRenderer.getWidgetIds();
    },

    /**
     * Returns an object mapping from widget ID to KE-style score.
     * The keys of this object are the values of the array returned
     * from `getWidgetIds`.
     */
    scoreWidgets: function() {
        const qScore = this.questionRenderer.scoreWidgets();
        const qGuess = this.questionRenderer.getUserInputForWidgets();
        return mapObject(qScore, (score, id) => {
            return Util.keScoreFromPerseusScore(score, qGuess[id]);
        });
    },

    /**
     * Get a representation of the current state of the item.
     */
    getSerializedState: function() {
        return {
            question: this.questionRenderer.getSerializedState(),
            hints: this.hintsRenderer.getSerializedState(),
        };
    },

    restoreSerializedState: function(state, callback) {
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
            state.question, fireCallback);
        this.hintsRenderer.restoreSerializedState(state.hints, fireCallback);
    },

    render: function() {
        const apiOptions = {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
            onFocusChange: this._handleFocusChange,
        };

        const questionRenderer = <Renderer
            keypadElement={this.keypadElement()}
            problemNum={this.props.problemNum}
            onInteractWithWidget={this.handleInteractWithWidget}
            highlightedWidgets={this.state.questionHighlightedWidgets}
            apiOptions={apiOptions}
            questionCompleted={this.state.questionCompleted}
            savedState={this.props.savedState}
            ref={elem => this.questionRenderer = elem}
            {...this.props.item.question}
        />;

        const hintsRenderer = <HintsRenderer
            hints={this.props.item.hints}
            hintsVisible={this.props.hintsVisible}
            apiOptions={apiOptions}
            ref={elem => this.hintsRenderer = elem}
        />;

        return <div>
            <div>
                {questionRenderer}
            </div>
            <div
                className={
                    // Avoid adding any horizontal padding when applying the
                    // mobile hint styles, which are flush to the left.
                    // NOTE(charlie): We may still want to apply this padding
                    // for desktop exercises.
                    !apiOptions.isMobile && css(styles.hintsContainer)
                }
            >
                {hintsRenderer}
            </div>
        </div>;
    },
});

const styles = StyleSheet.create({
    hintsContainer: {
        marginLeft: 50,
    },
});

module.exports = ItemRenderer;
