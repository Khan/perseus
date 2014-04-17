/** @jsx React.DOM */

var AnswerAreaEditor = require("./answer-area-editor.jsx");
var Editor = require("./editor.jsx");

var ItemEditor = React.createClass({
    propTypes: {
        imageUploader: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            onChange: () => {},
            question: {},
            answerArea: {}
        };
    },

    // Notify the parent that the question or answer area has been updated.
    updateProps: function(newProps, cb) {
        var props = _(this.props).pick("question", "answerArea");
        this.props.onChange(_(props).extend(newProps), cb);
    },

    render: function() {
        return <div className="perseus-editor-table">
            <div className="perseus-editor-row perseus-question-container">
                <div className="perseus-editor-left-cell">
                    <div className="pod-title">Question</div>
                    {Editor(_.extend({
                        ref: "questionEditor",
                        placeholder: "Type your question here...",
                        className: "perseus-question-editor",
                        imageUploader: this.props.imageUploader,
                        onChange: function(newProps, cb) {
                            var question = _.extend({},
                                    this.props.question, newProps);
                            this.updateProps({question: question}, cb);
                        }.bind(this)
                    }, this.props.question))}
                </div>

                <div className="perseus-editor-right-cell">
                    <div id="problemarea">
                        <div id="workarea" className="workarea" />
                        <div id="hintsarea"
                             className="hintsarea"
                             style={{display: "none"}} />
                    </div>
                </div>
            </div>

            <div className="perseus-editor-row perseus-answer-container">
                <div className="perseus-editor-left-cell">
                    <div className="pod-title">Answer</div>
                    {AnswerAreaEditor(_.extend({
                        ref: "answerAreaEditor",
                        onChange: function(newProps, cb) {
                            var answerArea = _.extend({},
                                    this.props.answerArea, newProps);
                            this.updateProps({answerArea: answerArea}, cb);
                        }.bind(this)
                    }, this.props.answerArea))}
                </div>

                <div className="perseus-editor-right-cell">
                    <div id="answer_area">
                        <span id="examples-show" style={{display: "none"}}>
                            {' '}Acceptable formats{' '}
                        </span>
                        <div id="solutionarea" className="solutionarea" />
                        <div className="answer-buttons">
                            <input
                                type="button"
                                className="simple-button green"
                                onClick={this.props.onCheckAnswer}
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

module.exports = ItemEditor;
