var React = require('react');
var ReactDOM = require('react-dom');
var Editor = require("../editor.jsx");
var InfoTip = require("react-components/js/info-tip.jsx");
var Renderer = require("../renderer.jsx");
var Util = require("../util.js");

var Table = React.createClass({
    render: function() {
        var headers = this.props.headers;
        return <table className="perseus-widget-table-of-values non-markdown">
            <thead>
                <tr>{
                    _.map(headers, function(header, i) {
                        return <th key={i}><Renderer content={header} /></th>;
                    })
                }
                </tr>
            </thead>
            <tbody>{
                _(this.props.rows).times(r => {
                    return <tr key={r}>{
                        _(this.props.columns).times((c) => {
                            return <td key={c}>
                                <input
                                    ref={"answer" + r + "," + c}
                                    type="text"
                                    onChange={this.handleChange}
                                />
                            </td>;
                        })
                    }</tr>;
                })
            }
            </tbody>
        </table>;
    },

    toJSON: function() {
        var self = this;
        return _.map(self.props.answers, function(answer, r) {
            return _.map(self.props.headers, function(header, c) {
                return ReactDOM.findDOMNode(self.refs["answer" + r + "," + c]).value;
            });
        });
    },

    handleChange: function() {
        // HACK: We need to know *that* the widget changed, but currently it's
        // not set up in a nice way to tell us *how* it changed
        this.props.onChange({});
    },

    simpleValidate: function(rubric) {
        return Table.validate(this.toJSON(), rubric);
    },

    focus: function() {
        ReactDOM.findDOMNode(this.refs["answer0,0"]).focus();
        return true;
    },

    statics: {
        displayMode: "block"
    }
});

_.extend(Table, {
    validate: function(state, rubric) {
        var filterNonEmpty = function (table) {
            return _.filter(table, function (row) {

                // Check if row has a cell that is nonempty
                return _.some(row, _.identity);
            });
        };
        var solution = filterNonEmpty(rubric.answers);
        var supplied = filterNonEmpty(state);
        var hasEmptyCell = _.some(supplied, function(row) {
            return _.some(row, function(cell) {
                return cell === "";
            });
        });
        if (hasEmptyCell || !supplied.length) {
            return {
                type: "invalid",
                message: null
            };
        }
        if (supplied.length !== solution.length) {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null
            };
        }
        var createValidator = Khan.answerTypes
                                  .number.createValidatorFunctional;
        var message = null;
        var allCorrect = _.every(solution, function (rowSolution) {
            var i;
            for (i = 0; i < supplied.length; i++) {
                var rowSupplied = supplied[i];
                var correct = _.every(rowSupplied, function (cellSupplied, i) {
                    var cellSolution = rowSolution[i];
                    var validator = createValidator(
                            cellSolution, {
                                simplify: true
                            });
                    var result = validator(cellSupplied);
                    if (result.message) {
                        message = result.message;
                    }
                    return result.correct;
                });
                if (correct) {
                    supplied.splice(i, 1);
                    return true;
                }
            }
            return false;
        });
        return {
            type: "points",
            earned: allCorrect ? 1 : 0,
            total: 1,
            message: message
        };
    }
});

var TableEditor = React.createClass({
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
            numRawRows: defaultRows,
            numRawColumns: defaultColumns,
            answers: blankAnswers,
            type: "set"
        };
    },

    focus: function() {
        ReactDOM.findDOMNode(this.refs.numberOfColumns).focus();
    },

    render: function() {
        var self = this;
        var rows = this.props.rows;
        var cols = this.props.columns;
        return <div>
            <div>
                <label>
                    {' '}欄數:{' '}
                    <input
                        ref="numberOfColumns"
                        type="text"
                        value={this.props.numRawColumns}
                        onChange={this.onSizeInput}
                    />
                </label>
            </div>
            <div>
                <label>
                    {' '}列數:{' '}
                    <input
                        ref="numberOfRows"
                        type="text"
                        value={this.props.numRawRows}
                        onChange={this.onSizeInput}
                    />
                </label>
            </div>
            <div>
                {' '}答案表格:{' '}
                <ul>
                    <li>
                        <label>
                            <input
                                type="radio"
                                checked="checked"
                                readOnly={true} />
                            設定值
                        </label>
                        <InfoTip>
                            <p>當表格欄數大於 1 的時候，答案表格中的所有欄位都需有值，也就
                                是說，學生在作答時需填完所有的欄位，若有不需填完所有欄位的
                                答案需求時，請再另行增加欄數為 1 的表格進行使用。</p>
                        </InfoTip>
                    </li>
                </ul>
            </div>
            <div>
                <table className="perseus-widget-table-of-values non-markdown">
                    <thead>
                        <tr>{
                            _(cols).times(function(i) {
                                return <th key={i}>
                                    <Editor
                                        ref={"columnHeader" + i}
                                        content={self.props.headers[i]}
                                        widgetEnabled={false}
                                        onChange={
                                            self.onHeaderChange.bind(self, i)
                                        }
                                    />
                                </th>;
                            })
                        }</tr>
                    </thead>
                    <tbody>{
                        _(rows).times(function(r) {
                            return <tr key={r}>{
                                _(cols).times(function(c) {
                                    return <td key={c}>
                                        <input
                                            ref={"answer" + r + "," + c}
                                            type="text"
                                            onChange={self.onAnswerInput}
                                            value={self.props.answers[r][c]}
                                        />
                                    </td>;
                                })
                            }</tr>;
                        })
                    }</tbody>
                </table>
            </div>
        </div>;
    },

    onHeaderChange: function(index, newProps) {
        if (_.has(newProps, "content")) {
            var headers = this.props.headers.slice();
            headers[index] = newProps.content;
            this.props.onChange({headers: headers});
        }
    },

    onSizeInput: function() {
        var numRawRows = ReactDOM.findDOMNode(this.refs.numberOfRows).value;
        var numRawCols = ReactDOM.findDOMNode(this.refs.numberOfColumns).value;
        var rows = +numRawRows || 0;
        var cols = +numRawCols || 0;
        rows = Math.min(Math.max(1, rows), 30);
        cols = Math.min(Math.max(1, cols), 6);
        var oldColumns = this.props.columns;
        var oldRows = this.props.rows;

        var answers = this.props.answers;
        if (oldRows < rows) {
            _(rows - oldRows).times(function() {
                answers.push(Util.stringArrayOfSize(oldColumns));
            });
        }

        var headers = this.props.headers;

        function fixColumnSizing(array) {
            _(cols - oldColumns).times(function() {
                array.push("");
            });
        }

        if (oldColumns < cols) {
            fixColumnSizing(headers);
            _.each(answers, fixColumnSizing);
        }

        this.props.onChange({
            rows: rows,
            columns: cols,
            numRawRows: numRawRows,
            numRawColumns: numRawCols,
            answers: answers,
            headers: headers
        });
    },

    onAnswerInput: function() {
        var self = this;
        var answers = _(self.props.rows).times(function(r) {
            return _(self.props.columns).times(function(c) {
                return ReactDOM.findDOMNode(self.refs["answer" + r + "," + c]).value;
            });
        });
        this.props.onChange({answers: answers});
    },

    toJSON: function() {
        var self = this;
        var answers = this.props.answers.slice(0, this.props.rows);
        answers = _.map(answers, function(row) {
            return row.slice(0, self.props.columns);
        });
        var json = _.pick(this.props, 'rows', 'columns');
        json.answers = answers;
        json.headers = this.props.headers.slice(0, this.props.columns);
        return json;
    }
});

module.exports = {
    name: "table",
    displayName: "Table of values/表格",
    widget: Table,
    editor: TableEditor,
    hidden: false
};
