var React = require('react');
var Editor = require("./editor.jsx");
var InfoTip = require("react-components/info-tip.jsx");
var Widgets = require("./widgets.js");

var AnswerAreaEditor = React.createClass({
    getDefaultProps: function() {
        return {
            type: "input-number",
            options: {},
            calculator: false
        };
    },

    render: function() {
        var Ed;
        if (this.props.type === "multiple") {
            Ed = Editor;
        } else {
            Ed = Widgets.getEditor(this.props.type);
        }

        var editor = <Ed
            ref="editor"
            placeholder={"This answer area is being deprecated. " +
            "Please use the widgets in the question area for your answer."}
            onChange={(newProps, cb) => {
                var options = _.extend({}, this.props.options, newProps);
                this.props.onChange({options: options}, cb);
            }}
            {...this.props.options} />;

        return <div className="perseus-answer-editor">
            <div className="perseus-answer-options">
            <div><label>
                {' '}Show calculator:{' '}
                <input type="checkbox" checked={this.props.calculator}
                    onChange={e => {
                        this.props.onChange({calculator: e.target.checked});
                    }} />
            </label>
            <InfoTip>
                <p>Use the calculator when completing difficult calculations is
                NOT the intent of the question. DON’T use the calculator when
                testing the student’s ability to complete different types of
                computations.</p>
            </InfoTip>
            </div>
            <div><label>
                {' '}Answer type:{' '}
                <select value={this.props.type}
                        onChange={e => {
                            this.props.onChange({
                                type: e.target.value,
                                options: {}
                            }, () => {
                                this.refs.editor.focus();
                            });
                        }}>
                    <option value="radio">Multiple choice</option>
                    <option value="table">Table of values</option>
                    <option value="input-number">Text input (number)</option>
                    <option value="expression">Expression / Equation</option>
                    <option value="multiple">Custom format</option>
                </select>
            </label>
            <InfoTip>
                <p>Use the custom format if the question is in the question
                area, and tell the students how to complete the problem.</p>
            </InfoTip></div>
            </div>
            <div className={Ed !== Editor ? "perseus-answer-widget" : ""}>
                {editor}
            </div>
        </div>;
    },

    getSaveWarnings: function() {
        var issuesFunc = this.refs.editor.getSaveWarnings();
        return issuesFunc ? issuesFunc() : [];
    },

    serialize: function() {
        // could be _.pick(this.props, "type", "options", "calculator");
        return {
            type: this.props.type,
            options: this.refs.editor.serialize(),
            calculator: this.props.calculator
        };
    }
});

module.exports = AnswerAreaEditor;
