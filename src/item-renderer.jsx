var React = require('react');
var _ = require("underscore");

var AnswerAreaRenderer = require("./answer-area-renderer.jsx");
var ApiOptions = require("./perseus-api.jsx").Options;
var EnabledFeatures = require("./enabled-features.jsx");
var HintsRenderer = require("./hints-renderer.jsx");
var Renderer = require("./renderer.jsx");
var Util = require("./util.js");

var {mapObject} = require("./interactive2/objective_.js");

var ItemRenderer = React.createClass({
    getDefaultProps: function() {
        return {
            initialHintsVisible: 0,

            // TODO(joel) - handle this differently. Pass around nodes or
            // something half reasonable.
            workAreaSelector: "#workarea",
            solutionAreaSelector: "#solutionarea",
            hintsAreaSelector: "#hintsarea",

            enabledFeatures: {},  // a deep default is done in `this.update()`
            apiOptions: {}  // likewise ^
        };
    },

    getInitialState: function() {
        return {
            hintsVisible: this.props.initialHintsVisible,
            questionCompleted: false,
            questionHighlightedWidgets: [],
            answerHighlightedWidgets: []
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            questionHighlightedWidgets: [],
            answerHighlightedWidgets: []
        });
    },

    componentDidMount: function() {
        if (Khan.scratchpad) {
            Khan.scratchpad.enable();
        }
        this._currentFocus = null;
        this.update();
    },

    componentDidUpdate: function() {
        this.update();
    },

    update: function() {
        var enabledFeatures = _.extend(
            {},
            EnabledFeatures.defaults,
            this.props.enabledFeatures
        );

        var apiOptions = _.extend(
            {},
            ApiOptions.defaults,
            this.props.apiOptions,
            {
                onFocusChange: this._handleFocusChange
            }
        );

        // Since the item renderer works by rendering things into three divs
        // that have completely different places in the DOM, we have to do this
        // strangeness instead of relying on React's normal render() method.
        // TODO(alpert): Figure out how to clean this up somehow
        this.questionRenderer = React.render(
                <Renderer
                    problemNum={this.props.problemNum}
                    onInteractWithWidget={this.handleInteractWithWidget}
                    highlightedWidgets={this.state.questionHighlightedWidgets}
                    enabledFeatures={enabledFeatures}
                    apiOptions={apiOptions}
                    questionCompleted={this.state.questionCompleted}
                    savedState={this.props.savedState}
                    {...this.props.item.question}
                />,
                document.querySelector(this.props.workAreaSelector));

        this.answerAreaRenderer = React.render(
                <AnswerAreaRenderer
                    type={this.props.item.answerArea.type}
                    options={this.props.item.answerArea.options}
                    calculator={this.props.item.answerArea.calculator || false}
                    problemNum={this.props.problemNum}
                    onInteractWithWidget={this.handleInteractWithAnswerWidget}
                    highlightedWidgets={this.state.answerHighlightedWidgets}
                    enabledFeatures={enabledFeatures}
                    apiOptions={apiOptions}
                />,
                document.querySelector(this.props.solutionAreaSelector));

        this.hintsRenderer = React.render(
                <HintsRenderer
                    hints={this.props.item.hints}
                    hintsVisible={this.state.hintsVisible}
                    enabledFeatures={enabledFeatures}
                    apiOptions={apiOptions}
                />,
                document.querySelector(this.props.hintsAreaSelector));
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
        // By the time this happens, newFocus cannot be a prefix of
        // prevFocused, since we must have either been called from
        // an onFocusChange within a renderer, which is only called when
        // this is not a prefix, or between the question and answer areas,
        // which can never prefix each other.
        var prevFocus = this._currentFocus;
        this._currentFocus = newFocus;
        if (this.props.apiOptions.onFocusChange != null) {
            this.props.apiOptions.onFocusChange(this._currentFocus, prevFocus);
        }
    },

    _onRendererBlur: function(blurPath) {
        var blurringFocusPath = this._currentFocus;

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
        var maybeAnswerAreaWidget = widgetId.match(/^answer-(.*)$/);

        if (maybeAnswerAreaWidget) {
            var answerAreaWidgetId = maybeAnswerAreaWidget[1];
            this.answerAreaRenderer._setWidgetProps(
                answerAreaWidgetId,
                newProps,
                callback
            );
        } else {
            this.questionRenderer._setWidgetProps(
                widgetId,
                newProps,
                callback
            );
        }
    },

    _handleAPICall: function(functionName, path) {
        // Get arguments to pass to function, including `path`
        var functionArgs = _.rest(arguments);

        // Decide on which caller should handle the API call
        var caller;
        var isAnswerArea = path[0].match(/^answer-(.*)$/);
        if (isAnswerArea) {
            caller = this.answerAreaRenderer;
        } else {
            caller = this.questionRenderer;
        }

        return caller[functionName].apply(caller, functionArgs);
    },

    setInputValue: function(path, newValue, focus) {
        return this._handleAPICall('setInputValue', path, newValue, focus);
    },

    focusPath: function(path) {
        // TODO(charlie): Find a better way to handle blurring between answer-
        // and question-area.
        if (path && path.length > 0) {
            var focusAnswer = path[0].match(/^answer-(.*)$/);
            if (focusAnswer) {
                this.questionRenderer.blur();
            } else {
                this.answerAreaRenderer.blur();
            }
        }

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
        var questionAreaInputPaths = this.questionRenderer.getInputPaths();
        var answerAreaInputPaths = this.answerAreaRenderer.getInputPaths();
        return questionAreaInputPaths.concat(answerAreaInputPaths);
    },

    handleInteractWithWidget: function(widgetId) {
        var withRemoved = _.difference(this.state.questionHighlightedWidgets,
                                       [widgetId]);
        this.setState({
            questionCompleted: false,
            questionHighlightedWidgets: withRemoved
        });
    },

    handleInteractWithAnswerWidget: function(widgetId) {
        var withRemoved = _.difference(this.state.answerHighlightedWidgets,
                                       [widgetId]);
        this.setState({
            answerHighlightedWidgets: withRemoved
        });
    },

    render: function() {
        return <div />;
    },

    focus: function() {
        return this.questionRenderer.focus() ||
                this.answerAreaRenderer.focus();
    },

    componentWillUnmount: function() {
        React.unmountComponentAtNode(
                document.querySelector(this.props.workAreaSelector));
        React.unmountComponentAtNode(
                document.querySelector(this.props.solutionAreaSelector));
        React.unmountComponentAtNode(
                document.querySelector(this.props.hintsAreaSelector));
    },

    showHint: function() {
        if (this.state.hintsVisible < this.getNumHints()) {
            this.setState({
                hintsVisible: this.state.hintsVisible + 1
            });
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
        var qGuessAndScore = this.questionRenderer.guessAndScore();
        var aGuessAndScore = this.answerAreaRenderer.guessAndScore();

        var qGuess = qGuessAndScore[0], qScore = qGuessAndScore[1];
        var aGuess = aGuessAndScore[0], aScore = aGuessAndScore[1];

        var emptyQuestionAreaWidgets = this.questionRenderer.emptyWidgets();
        var emptyAnswerAreaWidgets = this.answerAreaRenderer.emptyWidgets();
        this.setState({
            questionHighlightedWidgets: emptyQuestionAreaWidgets,
            answerHighlightedWidgets: emptyAnswerAreaWidgets
        });

        var guess, score;
        if (qGuess.length === 0) {
            // No widgets in question. For compatability with old guess format,
            // leave it out here completely.
            guess = aGuess;
            score = aScore;
        } else {
            guess = [qGuess, aGuess];
            score = Util.combineScores(qScore, aScore);
        }

        var keScore = Util.keScoreFromPerseusScore(score, guess);
        this.setState({
            questionCompleted: keScore.correct
        });

        return keScore;
    },

    /**
     * Returns an array of all widget IDs in the order they occur in
     * the question content.
     *
     * NOTE: This ignores the answer area.
     */
    getWidgetIds: function() {
        return this.questionRenderer.getWidgetIds();
    },

    /**
     * Returns an object mapping from widget ID to KE-style score.
     * The keys of this object are the values of the array returned
     * from `getWidgetIds`.
     *
     * NOTE: This ignores the answer area.
     */
    scoreWidgets: function() {
        var qScore = this.questionRenderer.scoreWidgets();
        var qGuess = this.questionRenderer.getUserInputForWidgets();
        return mapObject(qScore, (score, id) => {
            return Util.keScoreFromPerseusScore(score, qGuess[id]);
        });
    },

    /**
     * Get a representation of the current state of the item.
     *
     * Note: this ignores the answer area.
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
        var numCallbacks = 2;
        var fireCallback = () => {
            --numCallbacks;
            if (callback && numCallbacks === 0) {
                callback();
            }
        };

        this.questionRenderer.restoreSerializedState(
            state.question, fireCallback);
        this.hintsRenderer.restoreSerializedState(state.hints, fireCallback);
    },
});

module.exports = ItemRenderer;
