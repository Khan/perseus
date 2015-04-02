/** @jsx React.DOM */

var React = require('react');
var Editor = require("./editor.jsx");
var InfoTip = require("react-components/info-tip");
var Widgets = require("./widgets.js");

var WidgetsInAnswerAreaEditor = ['Image'];

var AnswerAreaEditor = React.createClass({
    getDefaultProps: function() {
        return {
            type: "input-number",
            options: {},
            calculator: false
        };
    },

    render: function() {
        var cls;
        if (this.props.type === "multiple") {
            cls = Editor;
        } else {
            cls = Widgets.getEditor(this.props.type);
        }

        var editor = cls(_.extend({
            ref: "editor",
            placeholder: "This answer area is being deprecated. " +
            "Please use the widgets in the question area for your answer.",
            onChange: (newProps, cb) => {
                var options = _.extend({}, this.props.options, newProps);
                this.props.onChange({options: options}, cb);
            }
        }, this.props.options));

        return <div className="perseus-answer-editor">
            <div className="perseus-answer-options">
            <div>
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
                    <option value="input-number">Text input (number)</option>
                </select>
            </label>
            </div>
            </div>
            <div className={cls !== Editor ? "perseus-answer-widget" : ""}>
                {editor}
            </div>
        </div>;
    },

    toJSON: function(skipValidation) {
        // Could be just _.pick(this.props, "type", "options"); but validation!
        return {
            type: this.props.type,
            options: this.refs.editor.toJSON(skipValidation),
            calculator: this.props.calculator
        };
    }
});

module.exports = AnswerAreaEditor;
