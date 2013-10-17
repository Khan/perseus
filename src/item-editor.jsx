/** @jsx React.DOM */
(function(Perseus) {

var Editor = Perseus.Editor;

var AnswerAreaEditor = Perseus.AnswerAreaEditor;

var ItemEditor = Perseus.ItemEditor = React.createClass({
    defaultState: {
        question: {},
        answerArea: {}
    },

    getDefaultProps: function() {
        return {
            onChange: function() {}
        };
    },

    getInitialState: function() {
        var props = _.pick(this.props, _.keys(this.defaultState));
        return _.defaults(props, this.defaultState);
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState(_.pick(nextProps, _.keys(this.defaultState)));
    },

    componentDidUpdate: function(prevProps, prevState, rootNode) {
        if (!_.isEqual(prevState, this.state)) {
            this.props.onChange();
        }
    },

    componentDidMount: function() {
        this.props.onChange();
    },

    render: function() {
        return <div className="perseus-editor-table">
            <div className="perseus-editor-row perseus-question-container">
                <div className="perseus-editor-left-cell">
                    {Editor(_.extend({
                        ref: "questionEditor",
                        className: "perseus-question-editor",
                        onChange: function(newProps, cb) {
                            var question = _.extend({}, 
                                    this.state.question, newProps);
                            this.setState({question: question}, cb);
                        }.bind(this)
                    }, this.state.question))}
                </div>

                <div className="perseus-editor-right-cell">
                    <div id="problemarea">
                        <div id="workarea"></div>
                        <div id="hintsarea" style={{display: "none"}} />
                    </div>
                </div>
            </div>

            <div className="perseus-editor-row perseus-answer-container">
                <div className="perseus-editor-left-cell">
                    {AnswerAreaEditor(_.extend({
                        ref: "answerAreaEditor",
                        onChange: function(newProps, cb) {
                            var answerArea = _.extend({},
                                    this.state.answerArea, newProps);
                            this.setState({answerArea: answerArea}, cb);
                        }.bind(this)
                    }, this.state.answerArea))}
                </div>

                <div className="perseus-editor-right-cell">
                    <div id="answer_area">
                        <span id="examples-show" style={{display: "none"}}>
                            Acceptable formats
                        </span>
                        <div id="solutionarea"></div>
                        <div className="answer-buttons">
                            <input
                                type="button"
                                className="simple-button disabled green"
                                value="Check Answer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    },

    toJSON: function(skipValidation) {
        return {
            question: this.refs.questionEditor.toJSON(skipValidation),
            answerArea: this.refs.answerAreaEditor.toJSON(skipValidation)
        };
    },

    focus: function() {
        this.questionEditor.focus();
    }
});

})(Perseus);
