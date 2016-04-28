/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable react/jsx-closing-bracket-location, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require('react');
const ReactDOM = require("react-dom");
const _ = require("underscore");

const MathOutput = require("../components/math-output.jsx");
const Renderer = require("../renderer.jsx");
const Util = require("../util.js");

const ApiOptions = require("../perseus-api.jsx").Options;
const KhanAnswerTypes = require("../util/answer-types.js");

const assert = require("../interactive2/interactive-util.js").assert;

/* Input handling: Maps a (row, column) pair to a unique ref used by React,
 * and extracts (row, column) pairs from input paths, used to allow outsiders
 * to focus, blur, set input values, etc. */
const getInputPath = function(row, column) {
    return ["" + row, "" + column];
};

const getDefaultPath = function() {
    return getInputPath(0, 0);
};

const getRowFromPath = function(path) {
    // 'path' should be a (row, column) pair
    assert(_.isArray(path) && path.length === 2);
    return +path[0];
};

const getColumnFromPath = function(path) {
    // 'path' should be a (row, column) pair
    assert(_.isArray(path) && path.length === 2);
    return +path[1];
};

const getRefForPath = function(path) {
    const row = getRowFromPath(path);
    const column = getColumnFromPath(path);
    return "answer" + row + "," + column;
};

const Table = React.createClass({
    propTypes: {
        // The editor to use when editableHeaders is enabled
        Editor: React.PropTypes.func,
        answers: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(
                React.PropTypes.string
            )
        ),
        apiOptions: ApiOptions.propTypes,
        editableHeaders: React.PropTypes.bool,
        headers: React.PropTypes.arrayOf(React.PropTypes.string),
        onBlur: React.PropTypes.func,
        onChange: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        trackInteraction: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        const defaultRows = 4;
        const defaultColumns = 1;
        const blankAnswers = _(defaultRows).times(function() {
            return Util.stringArrayOfSize(defaultColumns);
        });
        return {
            answers: blankAnswers,
            apiOptions: ApiOptions.defaults,
            columns: defaultColumns,
            editableHeaders: false,
            headers: [""],
            rows: defaultRows,
        };
    },

    _getRows: function() {
        return this.props.answers.length;
    },

    _getColumns: function() {
        return this.props.answers[0].length;
    },

    render: function() {
        const rows = this._getRows();
        const columns = this._getColumns();
        const headers = this.props.headers;

        let InputComponent;
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
                                <this.props.Editor
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
                                    disabled={this.props.apiOptions.readOnly}
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
        const answers = _.map(this.props.answers, _.clone);
        answers[row][column] = e.target.value;
        this.props.onChange({
            answers: answers,
        });
        this.props.trackInteraction();
    },

    onHeaderChange: function(index, e) {
        const headers = this.props.headers.slice();
        headers[index] = e.content;
        this.props.onChange({
            headers: headers,
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
        const inputID = getRefForPath(path);
        const inputComponent = this.refs[inputID];
        if (this.props.apiOptions.staticRender) {
            inputComponent.focus();
        } else {
            ReactDOM.findDOMNode(inputComponent).focus();
        }
    },

    blurInputPath: function(path) {
        const inputID = getRefForPath(path);
        const inputComponent = this.refs[inputID];
        if (this.props.apiOptions.staticRender) {
            inputComponent.blur();
        } else {
            ReactDOM.findDOMNode(inputComponent).blur();
        }
    },

    getDOMNodeForPath: function(path) {
        const inputID = getRefForPath(path);
        return ReactDOM.findDOMNode(this.refs[inputID]);
    },

    getInputPaths: function() {
        const rows = this._getRows();
        const columns = this._getColumns();
        const inputPaths = [];
        _(rows).times(r => {
            _(columns).times(c => {
                const inputPath = getInputPath(r, c);
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
        const row = getRowFromPath(path);
        const column = getColumnFromPath(path);

        const answers = _.map(this.props.answers, _.clone);
        answers[row][column] = newValue;
        this.props.onChange({
            answers: answers,
        }, cb);
    },
});

_.extend(Table, {
    validate: function(state, rubric) {
        const filterNonEmpty = function(table) {
            return _.filter(table, function(row) {

                // Check if row has a cell that is nonempty
                return _.some(row, _.identity);
            });
        };
        const solution = filterNonEmpty(rubric.answers);
        const supplied = filterNonEmpty(state);
        const hasEmptyCell = _.some(supplied, function(row) {
            return _.some(row, function(cell) {
                return cell === "";
            });
        });
        if (hasEmptyCell || !supplied.length) {
            return {
                type: "invalid",
                message: null,
            };
        }
        if (supplied.length !== solution.length) {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null,
            };
        }
        const createValidator = KhanAnswerTypes
                                  .number.createValidatorFunctional;
        let message = null;
        const allCorrect = _.every(solution, function(rowSolution) {
            let i;
            for (i = 0; i < supplied.length; i++) {
                const rowSupplied = supplied[i];
                const correct = _.every(rowSupplied, function(cellSupplied, i) {
                    const cellSolution = rowSolution[i];
                    const validator = createValidator(
                            cellSolution, {
                                simplify: true,
                            });
                    const result = validator(cellSupplied);
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
            message: message,
        };
    },
});

const propTransform = (editorProps) => {
    // Remove answers before passing to widget
    const rows = editorProps.answers.length;
    const columns = editorProps.answers[0].length;
    const blankAnswers = _(rows).times(function() {
        return Util.stringArrayOfSize(columns);
    });
    return _.extend({}, editorProps, {
        answers: blankAnswers,
    });
};

module.exports = {
    name: "table",
    displayName: "Table of values",
    accessible: true,
    widget: Table,
    transform: propTransform,
};
