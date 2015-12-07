/* eslint-disable react/prop-types, react/sort-comp */
var _ = require("underscore");
var ApiOptions = require("./perseus-api.jsx").Options;
var classNames = require("classnames");
var Editor = require("./editor.jsx");
var InfoTip = require("react-components/info-tip.js");
var React = require('react');
var Widgets = require("./widgets.js");

var AnswerTypeSelector = React.createClass({
    render: function() {
        return <div>
            <label>
                Answer type:{' '}
                <select
                    value={this.props.type}
                    onChange={(e) => this.props.onChange(e.target.value)}
                >
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
            </InfoTip>
        </div>;
    },
});

var AnswerAreaEditor = React.createClass({
    getDefaultProps: function() {
        return {
            type: "multiple",
            options: {},
            calculator: false,
            periodicTable: false,
            zTable: false,
            tTable: false,
            chi2Table: false,
            apiOptions: ApiOptions.defaults,
        };
    },

    getInitialState: function() {
        return {
            // We don't want people to use the answer area at all, so if it
            // doesn't have any content we prevent users from adding any.
            showEditor: !!this.props.options.content,

            // If it does have content, it should use the "multiple" aka Custom
            // Format answer type. So unless they are already using something
            // else, don't give them the option to switch.
            showTypeSelector: this.props.type !== "multiple",
        };
    },

    render: function() {
        var Ed;
        if (this.props.type === "multiple") {
            Ed = Editor;
        } else {
            Ed = Widgets.getEditor(this.props.type);
        }

        var className = classNames({
            'perseus-answer-widget': this.props.type !== 'multiple',
            'perseus-answer-none': !(this.state.showEditor ||
                this.state.showTypeSelector ||
                this.props.apiOptions.enableOldAnswerTypes),
        });

        var editor = <div className={className}>
            <Ed
                ref="editor"
                placeholder={"This answer area is deprecated. Please " +
                "use the widgets in the question area for your answer."}
                apiOptions={this.props.apiOptions}
                onChange={(newProps, cb) => {
                    var options = _.extend({},
                                           this.props.options,
                                           newProps);
                    this.props.onChange({options: options}, cb);
                }}
                {...this.props.options}
            />
        </div>;

        return <div className="perseus-answer-editor">
            <div className="perseus-answer-options">
            <div><label>
                Show calculator:{' '}
                <input
                    type="checkbox" checked={this.props.calculator}
                    onChange={e => {
                        this.props.onChange({calculator: e.target.checked});
                    }}
                />
            </label>
            <InfoTip>
                <p>Use the calculator when completing difficult calculations is
                NOT the intent of the question. DON’T use the calculator when
                testing the student’s ability to complete different types of
                computations.</p>
            </InfoTip>
            </div>

            <div><label>
                Show periodic table:{' '}
                <input
                    type="checkbox" checked={this.props.periodicTable}
                    onChange={e => {
                        this.props.onChange({periodicTable: e.target.checked});
                    }}
                />
            </label>
            <InfoTip>
                <p>This provides the student with the ability to view a
                periodic table of the elements, e.g., for answering chemistry
                questions.</p>
            </InfoTip>
            </div>

            <div><label>
                Show z table (statistics):{' '}
                <input
                    type="checkbox" checked={this.props.zTable}
                    onChange={e => {
                        this.props.onChange({zTable: e.target.checked});
                    }}
                />
            </label>
            <InfoTip>
                <p>This provides the student with the ability to view a
                table of critical values for the z distribution, e.g.
                for answering statistics questions.</p>
            </InfoTip>
            </div>

            <div><label>
                Show t table (statistics):{' '}
                <input
                    type="checkbox" checked={this.props.tTable}
                    onChange={e => {
                        this.props.onChange({tTable: e.target.checked});
                    }}
                />
            </label>
            <InfoTip>
                <p>This provides the student with the ability to view a
                table of critical values for the Student's t distribution,
                e.g. for answering statistics questions.</p>
            </InfoTip>
            </div>

            <div><label>
                Show chi-squared table (statistics):{' '}
                <input
                    type="checkbox" checked={this.props.chi2Table}
                    onChange={e => {
                        this.props.onChange({chi2Table: e.target.checked});
                    }}
                />
            </label>
            <InfoTip>
                <p>This provides the student with the ability to view a
                table of critical values for the chi-squared distribution,
                e.g. for answering statistics questions.</p>
            </InfoTip>
            </div>

            {(this.state.showTypeSelector ||
                    this.props.apiOptions.enableOldAnswerTypes) &&
                <AnswerTypeSelector
                    type={this.props.type}
                    onChange={(newValue) => {
                        this.props.onChange({
                            type: newValue,
                            options: {},
                        }, () => {
                            this.refs.editor.focus();
                        });
                    }}
                />
            }

            </div>

            {editor}
        </div>;
    },

    getSaveWarnings: function() {
        var issuesFunc = this.refs.editor.getSaveWarnings;
        var issues = issuesFunc ? issuesFunc() : [];

        return _.map(issues, (issue) => (`Answer area: ${issue}`));
    },

    serialize: function(options) {
        // could be _.pick(this.props, "type", "options", "calculator", etc);
        return {
            type: this.props.type,
            options: this.refs.editor.serialize(options),
            calculator: this.props.calculator,
            periodicTable: this.props.periodicTable,
            zTable: this.props.zTable,
            tTable: this.props.tTable,
            chi2Table: this.props.chi2Table,
        };
    },
});

module.exports = AnswerAreaEditor;
