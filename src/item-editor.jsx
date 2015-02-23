var React = require('react');
var _ = require("underscore");

var AnswerAreaEditor = require("./answer-area-editor.jsx");
var Editor = require("./editor.jsx");
var ApiOptions = require("./perseus-api.jsx").Options;
var ITEM_DATA_VERSION = require("./version.json").itemDataVersion;
var Util = require("./util.js");

var ItemEditor = React.createClass({
    propTypes: {
        imageUploader: React.PropTypes.func,
        wasAnswered: React.PropTypes.bool,
        gradeMessage: React.PropTypes.string,
        apiOptions: ApiOptions.propTypes,
    },

    getDefaultProps: function() {
        return {
            onChange: () => {},
            question: {},
            answerArea: {},
            apiOptions: ApiOptions.defaults,
        };
    },

    // Notify the parent that the question or answer area has been updated.
    updateProps: function(newProps, cb, silent) {
        var props = _(this.props).pick("question", "answerArea");

        this.props.onChange(_(props).extend(newProps), cb, silent);
    },

    render: function() {
        return <div className="perseus-editor-table">
            <div className="perseus-editor-row perseus-question-container">
                <div className="perseus-editor-left-cell">
                    <div className="pod-title">Question</div>
                    <Editor
                        ref="questionEditor"
                        placeholder="Type your question here..."
                        className="perseus-question-editor"
                        imageUploader={this.props.imageUploader}
                        onChange={this.handleEditorChange}
                        apiOptions={this.props.apiOptions}
                        showWordCount={true}
                        searchString={this.props.searchString}
                        searchIndex={this.props.searchIndex}
                        {...this.props.question} />
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
                    <AnswerAreaEditor
                        ref="answerAreaEditor"
                        onChange={this.handleAnswerAreaChange}
                        apiOptions={this.props.apiOptions}
                        {...this.props.answerArea} />
                </div>

                <div className="perseus-editor-right-cell">
                    <div id="answer_area">
                        <div id="solutionarea" className="solutionarea" />
                        <div className="answer-buttons">
                            <input
                                type="button"
                                className="simple-button green"
                                onClick={this.props.onCheckAnswer}
                                value="Check Answer" />
                            {this.props.wasAnswered &&
                                <img src="/images/face-smiley.png"
                                    className="smiley" />}
                            {this.props.gradeMessage &&
                                <span>{this.props.gradeMessage}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    },

    handleEditorChange: function(newProps, cb, silent) {
        var question = _.extend({}, this.props.question, newProps);
        this.updateProps({ question }, cb, silent);
    },

    handleAnswerAreaChange: function(newProps, cb, silent) {
        var answerArea = _.extend({}, this.props.answerArea, newProps);
        this.updateProps({ answerArea }, cb, silent);
    },

    getSaveWarnings: function() {
        var issues1 = this.refs.questionEditor.getSaveWarnings();
        var issues2 = this.refs.answerAreaEditor.getSaveWarnings();
        return issues1.concat(issues2);
    },

    serialize: function(options) {
        return {
            question: this.refs.questionEditor.serialize(options),
            answerArea: this.refs.answerAreaEditor.serialize(options),
            itemDataVersion: ITEM_DATA_VERSION
        };
    },

    focus: function() {
        this.questionEditor.focus();
    }
});

module.exports = ItemEditor;
