/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require('react');
const ReactDOM = require("react-dom");
const _ = require("underscore");

const Util = require("../util.js");

const InfoTip = require("../components/info-tip.jsx");
const NumberInput  = require("../components/number-input.jsx");
const Editor = require("../editor.jsx");

const Table = require("./table.jsx").widget;

const TableEditor = React.createClass({
    propTypes: {
        rows: React.PropTypes.number,
        columns: React.PropTypes.number,
        headers: React.PropTypes.arrayOf(React.PropTypes.string),
        answers: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(
                React.PropTypes.string
            )
        )
    },

    getDefaultProps: function() {
        var defaultRows = 4;
        var defaultColumns = 1;
        var blankAnswers = _(defaultRows).times(function() {
            return Util.stringArrayOfSize(defaultColumns);
        });
        return {
            headers: [""],
            rows: defaultRows,
            columns: defaultColumns,
            answers: blankAnswers
        };
    },

    focus: function() {
        ReactDOM.findDOMNode(this.refs.numberOfColumns).focus();
    },

    render: function() {
        var tableProps = _.pick(
            this.props,
            "headers", "answers", "onChange", "apiOptions");
        _.extend(tableProps, {
            editableHeaders: true,
            Editor,
            onFocus: () => {},
            onBlur: () => {},
            trackInteraction: () => {},
        });

        return <div>
            <div className="perseus-widget-row">
                <label>
                    Number of columns:
                    {" "}
                    <NumberInput
                        ref="numberOfColumns"
                        value={this.props.columns}
                        onChange={(val) => {
                            if (val) {
                                this.onSizeInput(this.props.rows, val);
                            }
                        }}
                        useArrowKeys={true} />
                </label>
            </div>
            <div className="perseus-widget-row">
                <label>
                    Number of rows:
                    {" "}
                    <NumberInput
                        ref="numberOfRows"
                        value={this.props.rows}
                        onChange={(val) => {
                            if (val) {
                                this.onSizeInput(val, this.props.columns);
                            }
                        }}
                        useArrowKeys={true} />
                </label>
            </div>
            <div>
                {' '}Table of answers:{' '}
                <InfoTip>
                    <p>The student has to fill out all cells in the
                    table.  For partially filled tables create a table
                    using the template, and insert text input boxes
                    as desired.</p>
                </InfoTip>
            </div>
            <div>
                <Table {...tableProps} />
            </div>
        </div>;
    },

    onSizeInput: function(numRawRows, numRawColumns) {
        var rows = +numRawRows || 0;
        var columns = +numRawColumns || 0;
        rows = Math.min(Math.max(1, rows), 30);
        columns = Math.min(Math.max(1, columns), 6);
        var oldColumns = this.props.columns;
        var oldRows = this.props.rows;

        var answers = this.props.answers;
        // Truncate if necessary; else, append
        if (rows <= oldRows) {
            answers.length = rows;
        } else {
            _(rows - oldRows).times(function() {
                answers.push(Util.stringArrayOfSize(oldColumns));
            });
        }

        function fixColumnSizing(array) {
            // Truncate if necessary; else, append
            if (columns <= oldColumns) {
                array.length = columns;
            } else {
                _(columns - oldColumns).times(function() {
                    array.push("");
                });
            }
        }

        var headers = this.props.headers;
        fixColumnSizing(headers);
        _.each(answers, fixColumnSizing);

        this.props.onChange({
            rows: rows,
            columns: columns,
            answers: answers,
            headers: headers
        });
    },

    serialize: function() {
        var json = _.pick(this.props, "headers", "rows", "columns");

        return _.extend({}, json, {
            answers: _.map(this.props.answers, _.clone)
        });
    }
});

module.exports = TableEditor;
