/** @jsx React.DOM */
(function(Perseus) {

var Editor = Perseus.Editor;

function stringArrayOfSize(size) {
    var array = [];
    _(size).times(function() {
        array.push("");
    });
    return array;
}

var Table = React.createClass({
    render: function() {
        console.log('render table');
        var headers = this.props.headers;
        return <table className="perseus-widget-table-of-values">
            <thead>
                <tr>{
                    headers.map(function(header) {
                        return <th>{Perseus.Renderer({content: header})}</th>;
                    })
                }
                </tr>
            </thead>
            <tbody>{
                _(this.props.rows).times(function(r) {
                    return <tr>{
                        _(this.props.columns).times(function(c) {
                            return <td>
                                <input
                                    ref={"answer" + r + "," + c}
                                    type="text"
                                />
                            </td>;
                        })
                    }</tr>;
                }.bind(this))
            }
            </tbody>
        </table>;
    },

    toJSON: function() {
        var self = this;
        return _.map(self.props.answers, function(answer, r) {
            return _.map(self.props.headers, function(header, c) {
                return self.refs["answer" + r + "," + c].getDOMNode().value;
            });
        });
    },

    simpleValidate: function(rubric) {
        return Table.validate(this.toJSON(), rubric);
    }
});

_.extend(Table, {
    purifyAnswers: function(table) {
        var filled = _.filter(table, function (row) {

            // Check if row has a cell that is nonempty
            return _.some(row, _.identity);
        });
        var nums = _.map(filled, function(row) {
            return _.map(row, Number);
        });
        return nums.sort(function (aRow, bRow) {
            var i = 0;
            while (i < aRow.length && aRow[i] === bRow[i]) {
                i += 1;
            }
            if (i === aRow.length) {
                return 0;
            } else {
                return aRow[i] < bRow[i] ? -1 : 1;
            }
        });
    },

    validate: function(state, rubric) {
        var supplied = Table.purifyAnswers(state);
        var solution = Table.purifyAnswers(rubric.answers);
        if (! supplied.length) {
            return {
                type: "invalid",
                message: null
            };
        } else {
            var correct = _.isEqual(supplied, solution);

            return {
                type: "points",
                earned: correct ? 1 : 0,
                total: 1,
                message: null
            };
        }
    }
});

var TableEditor = React.createClass({
    getDefaultProps: function() {
        var defaultRows = 4;
        var defaultColumns = 1;
        var blankAnswers = [];
        _(defaultRows).times(function() {
            blankAnswers.push(stringArrayOfSize(defaultColumns));
        });
        return {
            headers: [""],
            rows: defaultRows,
            columns: defaultColumns,
            rawRows: defaultRows,
            rawColumns: defaultColumns,
            answers: blankAnswers,
            type: "set"
        };
    },

    focus: function() {
        this.refs.numberOfColumns.getDOMNode().focus();
    },

    render: function() {
        return <div>
            <div>
                <label>
                    Number of columns:
                    <input
                        ref="numberOfColumns"
                        type="text"
                        value={this.props.rawColumns}
                        onInput={this.onSizeInput}
                    />
                </label>
            </div>
            <div>
                <label>
                    Number of rows:
                    <input
                        ref="numberOfRows"
                        type="text"
                        value={this.props.rawRows}
                        onInput={this.onSizeInput}
                    />
                </label>
            </div>
            <div>
                Table of answers type:
                <ul>
                    <li>
                        <label>
                            <input
                                type="radio"
                                checked="checked"
                            />
                            Set of values (complete)
                        </label>
                    </li>
                </ul>
            </div>
            <div>
                <table className="perseus-widget-table-of-values">
                    <thead>
                        <tr>{
                            this.loopColumns(function(i) {
                                return <th>
                                    <Editor
                                        ref={"columnHeader" + i}
                                        content={this.props.headers[i]}
                                        widgetEnabled={false}
                                        onChange={
                                            this.onHeaderChange.bind(this, i)
                                        }
                                    />
                                </th>;
                            })
                        }</tr>
                    </thead>
                    <tbody>{
                        this.loopRows(function(r) {
                            return <tr>{
                                this.loopColumns(function(c) {
                                    return <td>
                                        <input
                                            ref={"answer" + r + "," + c}
                                            type="text"
                                            onInput={this.onAnswerInput}
                                            value={this.props.answers[r][c]}
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

    onHeaderChange: React.autoBind(function(index, newProps) {
        if (_.has(newProps, "content")) {
            var headers = this.props.headers.slice();
            headers[index] = newProps.content;
            this.props.onChange({headers: headers});
        }
    }),

    onSizeInput: React.autoBind(function() {
        var rawRows = this.refs.numberOfRows.getDOMNode().value;
        var rawCols = this.refs.numberOfColumns.getDOMNode().value;
        var rows = +rawRows || 0;
        var cols = +rawCols || 0;
        if (rows < 1) {
            rows = 1;
        }
        if (rows > 30) {
            rows = 30;
        }
        if (cols < 1) {
            cols = 1;
        }
        if (cols > 6) {
            cols = 6;
        }
        var oldColumns = this.props.columns;
        var oldRows = this.props.rows;

        var answers = this.props.answers;
        if (oldRows < rows) {
            _(rows - oldRows).times(function() {
                answers.push(stringArrayOfSize(oldColumns));
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
            rawRows: rawRows,
            rawColumns: rawCols,
            answers: answers,
            headers: headers
        });
    }),

    loopRows: function(callback) {
        var self = this;
        var ret = [];
        _(this.props.rows).times(function (r) {
            ret.push(callback.call(self, r));
        });
        return ret;
    },

    loopColumns: function(callback) {
        var self = this;
        var ret = [];
        _(this.props.columns).times(function (c) {
            ret.push(callback.call(self, c));
        });
        return ret;
    },

    onAnswerInput: React.autoBind(function() {
        var self = this;
        var answers = this.loopRows(function(r) {
            return this.loopColumns(function(c) {
                return this.refs["answer" + r + "," + c].getDOMNode().value;
            });
        });
        this.props.onChange({answers: answers});
    }),

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

Perseus.Widgets.register("table", Table);
Perseus.Widgets.register("table-editor", TableEditor);

})(Perseus);
