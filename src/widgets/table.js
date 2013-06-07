/** @jsx React.DOM */
(function(Perseus) {

function stringArrayOfSize(size) {
    var array = [];
    _(size).times(function() {
        array.push("");
    });
    return array;
}

var Table = React.createClass({
    render: function() {
        var headers = this.props.headers;
        console.log('rendering table');
        return <table>
            <thead>
                <tr>{
                    headers.map(function(header) {
                        return <th>{header}</th>;
                    })
                }
                </tr>
            </thead>
            <tbody>{
                _(this.props.rows).times(function(r) {
                    return <tr>{
                        headers.map(function(c) {
                            return <td>
                                <input
                                    type="text"
                                />
                            </td>;
                        })
                    }</tr>;
                })
            }
            </tbody>
        </table>;
    },
});

var TableEditor = React.createClass({
    getInitialState: function() {
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
            answers: blankAnswers,
        };
    },

    render: function() {
        return <div>
            <div>
                <label>
                    Number of columns:
                    <input
                        ref="numberOfColumns"
                        type="text"
                        value={this.state.columns}
                        onKeyUp={this.sizeKeyUp}
                    />
                </label>
            </div>
            <div>
                <label>
                    Number of rows:
                    <input
                        ref="numberOfRows"
                        type="text"
                        value={this.state.rows}
                        onKeyUp={this.sizeKeyUp}
                    />
                </label>
            </div>
            <div>
                Table of answer type:
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
                <table>
                    <thead>
                        <tr>{
                            this.state.headers.map(function(header, i) {
                                return <th>
                                    <input
                                        ref={"columnHeader" + i}
                                        type="text"
                                        value={header}
                                        onKeyUp={this.headerKeyUp}
                                    />
                                </th>;
                            }, this)
                        }</tr>
                    </thead>
                    <tbody>{
                        this.state.answers.map(function(answerRow, r) {
                            return <tr>{
                                answerRow.map(function(answer, c) {
                                    return <td>
                                        <input
                                            ref={"answer" + r + "," + c}
                                            type="text"
                                            onKeyUp={this.answerKeyUp}
                                            value={answer}
                                        />
                                    </td>;
                                }, this)
                            }</tr>;
                        }, this)
                    }</tbody>
                </table>
            </div>
        </div>;
    },

    updateState: function (update) {
        this.setState(update);
        this.props.onChange();
    },

    headerKeyUp: React.autoBind(function() {
        var headers = this.state.headers.map(function (header, i) {
            return this.refs["columnHeader" + i].getDOMNode().value;
        }, this);
        this.updateState({headers: headers});
    }),

    sizeKeyUp: React.autoBind(function() {
        var rows = this.refs.numberOfRows.getDOMNode().value;
        var cols = this.refs.numberOfColumns.getDOMNode().value;
        var oldColumns = this.state.columns;

        var answers = this.state.answers;
        if (this.state.rows < rows) {
            _(rows - answers.length).times(function() {
                answers.push(stringArrayOfSize(oldColumns));
            });
        } else {
            answers.length = rows;
        }

        var headers = this.state.headers;

        function fixColumnSizing(array) {
            if (oldColumns < cols) {
                _(cols - oldColumns).times(function() {
                    array.push("");
                });
            } else {
                array.length = cols;
            }
        }

        fixColumnSizing(headers);
        _.each(answers, fixColumnSizing);

        this.updateState({
            rows: rows,
            columns: cols,
            answers: answers,
            headers: headers
        });
    }),

    answerKeyUp: React.autoBind(function() {
        var self = this;
        var answers = this.state.answers.map(function(answerRow, r) {
            return answerRow.map(function(answer, c) {
                return this.refs["answer" + r + "," + c].getDOMNode().value;
            }, this);
        }, this);
        this.updateState({answers: answers});
    }),

    toJSON: function() {
        return _.pick(this.state, 'rows', 'columns', 'headers', 'answers');
    },
});

Perseus.Widgets.register("table", Table);
Perseus.Widgets.register("table-editor", TableEditor);

})(Perseus);
