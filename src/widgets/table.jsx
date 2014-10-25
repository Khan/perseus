var React = require('react');
var _ = require("underscore");

var Editor = require("../editor.jsx");
var InfoTip = require("react-components/info-tip.jsx");
var MathOutput = require("../components/math-output.jsx");
var NumberInput  = require("../components/number-input.jsx");
var Renderer = require("../renderer.jsx");
var Util = require("../util.js");

var ApiOptions = require("../perseus-api.jsx").Options;

var assert = require("../interactive2/interactive-util.js").assert;

/* Input handling: Maps a (row, column) pair to a unique ref used by React,
 * and extracts (row, column) pairs from input paths, used to allow outsiders
 * to focus, blur, set input values, etc. */
var getInputPath = function(row, column) {
    return ["" + row, "" + column];
};

var getDefaultPath = function() {
    return getInputPath(0, 0);
};

var getRowFromPath = function(path) {
    // 'path' should be a (row, column) pair
    assert(_.isArray(path) && path.length === 2);
    return +path[0];
};

var getColumnFromPath = function(path) {
    // 'path' should be a (row, column) pair
    assert(_.isArray(path) && path.length === 2);
    return +path[1];
};

var getRefForPath = function(path) {
    var row = getRowFromPath(path);
    var column = getColumnFromPath(path);
    return "answer" + row + "," + column;
};

var Table = React.createClass({
    propTypes: {
        editableHeaders: React.PropTypes.bool,
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
            apiOptions: ApiOptions.defaults,
            headers: [""],
            editableHeaders: false,
            rows: defaultRows,
            columns: defaultColumns,
            answers: blankAnswers,
        };
    },

    _getRows: function() {
        return this.props.answers.length;
    },

    _getColumns: function() {
        return this.props.answers[0].length;
    },

    render: function() {
        var rows = this._getRows();
        var columns = this._getColumns();
        var headers = this.props.headers;

        var InputComponent;
        if (this.props.apiOptions.staticRender) {
            InputComponent = MathOutput;
        } else {
            InputComponent = "input";
        }

        return <table className="perseus-widget-table-of-values non-markdown">
            <thead>
                <tr>{
                    _.map(headers, (header, i) => {
                        if (this.props.editableHeaders) {
                            return <th key={i}>
                                <Editor
                                    ref={"columnHeader" + i}
                                    content={header}
                                    widgetEnabled={false}
                                    onChange={
                                        _.partial(this.onHeaderChange, i)
                                    }
                                />
                            </th>;
                        } else {
                            return <th key={i}>
                                <Renderer content={header} />
                            </th>;
                        }
                    })
                }
                </tr>
            </thead>
            <tbody>{
                _(rows).times(r => {
                    return <tr key={r}>{
                        _(columns).times((c) => {
                            return <td key={c}>
                                <InputComponent
                                    ref={getRefForPath(getInputPath(r, c))}
                                    type="text"
                                    value={this.props.answers[r][c]}
                                    onFocus={_.partial(
                                        this._handleFocus, getInputPath(r, c)
                                    )}
                                    onBlur={_.partial(
                                        this._handleBlur, getInputPath(r, c)
                                    )}
                                    onChange={
                                        _.partial(this.onValueChange, r, c)
                                    } />
                            </td>;
                        })
                    }</tr>;
                })
            }
            </tbody>
        </table>;
    },

    getUserInput: function() {
        return _.map(this.props.answers, _.clone);
    },

    onValueChange: function(row, column, e) {
        var answers = _.map(this.props.answers, _.clone);
        answers[row][column] = e.target.value;
        this.props.onChange({
            answers: answers
        });
    },

    onHeaderChange: function(index, e) {
        var headers = this.props.headers.slice();
        headers[index] = e.content;
        this.props.onChange({
            headers: headers
        });
    },

    simpleValidate: function(rubric) {
        return Table.validate(this.getUserInput(), rubric);
    },

    _handleFocus: function(inputPath) {
        this.props.onFocus(inputPath);
    },

    _handleBlur: function(inputPath) {
        this.props.onBlur(inputPath);
    },

    focus: function() {
        this.focusInputPath(getDefaultPath());
        return true;
    },

    focusInputPath: function(path) {
        var inputID = getRefForPath(path);
        var inputComponent = this.refs[inputID];
        if (this.props.apiOptions.staticRender) {
            inputComponent.focus();
        } else {
            inputComponent.getDOMNode().focus();
        }
    },

    blurInputPath: function(path) {
        var inputID = getRefForPath(path);
        var inputComponent = this.refs[inputID];
        if (this.props.apiOptions.staticRender) {
            inputComponent.blur();
        } else {
            inputComponent.getDOMNode().blur();
        }
    },

    getDOMNodeForPath: function(path) {
        var inputID = getRefForPath(path);
        return this.refs[inputID].getDOMNode();
    },

    getInputPaths: function() {
        var rows = this._getRows();
        var columns = this._getColumns();
        var inputPaths = [];
        _(rows).times(r => {
            _(columns).times(c => {
                var inputPath = getInputPath(r, c);
                inputPaths.push(inputPath);
            });
        });
        return inputPaths;
    },

    getGrammarTypeForPath: function(inputPath) {
        return "number";
    },

    setInputValue: function(path, newValue, cb) {
        // Extract row, column information
        var row = getRowFromPath(path);
        var column = getColumnFromPath(path);

        var answers = _.map(this.props.answers, _.clone);
        answers[row][column] = newValue;
        this.props.onChange({
            answers: answers
        }, cb);
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
        this.refs.numberOfColumns.getDOMNode().focus();
    },

    render: function() {
        var rows = this.props.rows;
        var cols = this.props.columns;

        var tableProps = _.pick(this.props, "headers", "answers", "onChange");
        _.extend(tableProps, {
            editableHeaders: true
        });

        return <div>
            <div className="perseus-widget-row">
                <NumberInput
                    label="Number of columns:"
                    ref="numberOfColumns"
                    value={this.props.columns}
                    onChange={(val) => {
                        if (val) {
                            this.onSizeInput(this.props.rows, val);
                        }
                    }}
                    useArrowKeys={true} />
            </div>
            <div className="perseus-widget-row">
                <NumberInput
                    label="Number of rows:"
                    ref="numberOfRows"
                    value={this.props.rows}
                    onChange={(val) => {
                        if (val) {
                            this.onSizeInput(val, this.props.columns);
                        }
                    }}
                    useArrowKeys={true} />
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

var propTransform = (editorProps) => {
    // Remove answers before passing to widget
    var rows = editorProps.answers.length;
    var columns = editorProps.answers[0].length;
    var blankAnswers = _(rows).times(function() {
        return Util.stringArrayOfSize(columns);
    });
    return _.extend({}, editorProps, {
        answers: blankAnswers
    });
};

module.exports = {
    name: "table",
    displayName: "Table of values",
    widget: Table,
    editor: TableEditor,
    transform: propTransform
};
