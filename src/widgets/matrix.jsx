/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/* global i18n:false */

const classNames = require("classnames");
const React = require("react");
const ReactDOM = require("react-dom");
const _ = require("underscore");

const NumberInput = require("../components/number-input.jsx");
const Renderer = require("../renderer.jsx");
const TextInput = require("../components/text-input.jsx");
const MathOutput = require("../components/math-output.jsx");

const ApiOptions = require("../perseus-api.jsx").Options;
const KhanAnswerTypes = require("../util/answer-types.js");

const assert = require("../interactive2/interactive-util.js").assert;
const stringArrayOfSize = require("../util.js").stringArrayOfSize;


// We store two sets of dimensions for the brackets, because mobile formatting
// is different. These dimensions come from `matrix.less`.
const MOBILE_DIMENSIONS = {
    INPUT_MARGIN: 4,
    INPUT_HEIGHT: 38,
    INPUT_WIDTH: 82,
};

const NORMAL_DIMENSIONS = {
    INPUT_MARGIN: 3,
    INPUT_HEIGHT: 30,
    INPUT_WIDTH: 40,
};

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

const getMatrixSize = function(matrix) {
    const matrixSize = [1, 1];

    // We need to find the widest row and tallest column to get the correct
    // matrix size.
    _(matrix).each((matrixRow, row) => {
        let rowWidth = 0;
        _(matrixRow).each((matrixCol, col) => {
            if (matrixCol != null && matrixCol.toString().length) {
                rowWidth = col + 1;
            }
        });

        // Matrix width:
        matrixSize[1] = Math.max(matrixSize[1], rowWidth);

        // Matrix height:
        if (rowWidth > 0) {
            matrixSize[0] = Math.max(matrixSize[0], row + 1);
        }
    });
    return matrixSize;
};

const Matrix = React.createClass({
    propTypes: {
        answers: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(
                React.PropTypes.oneOfType([
                    React.PropTypes.string,
                    React.PropTypes.number,
                ])
            )
        ),
        apiOptions: ApiOptions.propTypes,
        cursorPosition: React.PropTypes.arrayOf(
            React.PropTypes.number
        ),
        matrixBoardSize: React.PropTypes.arrayOf(
            React.PropTypes.number
        ).isRequired,
        numericInput: React.PropTypes.bool,
        onBlur: React.PropTypes.func,
        onChange: React.PropTypes.func.isRequired,
        onFocus: React.PropTypes.func,
        prefix: React.PropTypes.string,
        static: React.PropTypes.bool,
        suffix: React.PropTypes.string,
        trackInteraction: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            matrixBoardSize: [3, 3],
            answers: [[]],
            prefix: "",
            suffix: "",
            cursorPosition: [0, 0],
            apiOptions: ApiOptions.defaults,
        };
    },

    getInitialState: function() {
        return {
            enterTheMatrix: 0,
        };
    },

    componentDidMount: function() {
        // Used in the `onBlur` and `onFocus` handlers
        this.cursorPosition = [0, 0];
    },

    render: function() {
        // Set the input sizes through JS so we can control the size of the
        // brackets. (If we set them in CSS we won't know values until the
        // inputs are rendered.)
        const dimensions = this.props.apiOptions.staticRender ?
                MOBILE_DIMENSIONS : NORMAL_DIMENSIONS;
        const { INPUT_MARGIN, INPUT_HEIGHT, INPUT_WIDTH } = dimensions;

        const matrixSize = getMatrixSize(this.props.answers);
        const maxRows = this.props.matrixBoardSize[0];
        const maxCols = this.props.matrixBoardSize[1];
        const cursorRow = this.props.cursorPosition[0];
        const cursorCol = this.props.cursorPosition[1];

        const highlightedRow = Math.max(cursorRow, matrixSize[0] - 1);
        const highlightedCol = Math.max(cursorCol, matrixSize[1] - 1);
        const bracketHeight = (highlightedRow + 1) *
                (INPUT_HEIGHT + 2 * INPUT_MARGIN);
        const bracketOffset = (highlightedCol + 1) *
                (INPUT_WIDTH + 2 * INPUT_MARGIN);

        const className = classNames({
            "perseus-matrix": true,
            "static-mode": this.props.static,
            "the-matrix": this.state.enterTheMatrix >= 5,
        });

        return <div className={className}>
            {this.props.prefix && <div className="matrix-prefix">
                <Renderer content={this.props.prefix} />
            </div>}
            <div className="matrix-input">
                <div
                    className={"matrix-bracket bracket-left"}
                    style={{
                        height: bracketHeight,
                    }}>
                </div>
                <div
                    className={"matrix-bracket bracket-right"}
                    style={{
                        height: bracketHeight,
                        left: bracketOffset,
                    }}>
                </div>
                {_(maxRows).times(row => {
                    const rowVals = this.props.answers[row];
                    return <div className="matrix-row" key={row}>
                        {_(maxCols).times((col) => {
                            const outside = row > highlightedRow ||
                                    col > highlightedCol;
                            const inputProps = {
                                className: outside ? "outside" : "inside",
                                ref: getRefForPath(getInputPath(row, col)),
                                value: rowVals ? rowVals[col] : null,
                                style: {
                                    height: INPUT_HEIGHT,
                                    width: INPUT_WIDTH,
                                    margin: INPUT_MARGIN,
                                },
                                disabled: this.props.apiOptions.readOnly,
                                onFocus: () => {
                                    // We store this locally so that we can use
                                    // the new information in the `onBlur`
                                    // handler, which happens before the props
                                    // change has time to propagate.
                                    // TODO(emily): Try to fix `MathOutput` so
                                    // it correctly sends blur events before
                                    // focus events.
                                    this.cursorPosition = [row, col];
                                    this.props.onChange({
                                        cursorPosition: [row, col],
                                    }, () => {
                                        // This isn't a user interaction, so
                                        // return false to signal that the
                                        // matrix shouldn't be focused
                                        return false;
                                    });
                                    this._handleFocus(row, col);
                                },
                                onBlur: () => {
                                    if (row === this.cursorPosition[0] &&
                                        col === this.cursorPosition[1]) {
                                        this.props.onChange({
                                            cursorPosition: [0, 0],
                                        }, () => {
                                            // This isn't a user interaction,
                                            // so return false to signal that
                                            // the matrix shouldn't be focused
                                            return false;
                                        });
                                    }
                                    this._handleBlur(row, col);
                                },
                                onKeyDown: (e) => {
                                    this.handleKeyDown(row, col, e);
                                },
                                onChange: (value) => {
                                    this.onValueChange(row, col, value);
                                },
                            };

                            let MatrixInput;
                            if (this.props.apiOptions.staticRender) {
                                MatrixInput = <MathOutput {...inputProps} />;
                            } else if (this.props.numericInput) {
                                MatrixInput = <NumberInput {...inputProps} />;
                            } else {
                                MatrixInput = <TextInput {...inputProps} />;
                            }
                            return <span
                                        key={col}
                                        className="matrix-input-field">
                                {MatrixInput}
                            </span>;
                        })}
                    </div>;
                })}
            </div>
            {this.props.suffix && <div className="matrix-suffix">
                <Renderer content={this.props.suffix} />
            </div>}
        </div>;
    },

    getInputPaths: function() {
        const inputPaths = [];
        const maxRows = this.props.matrixBoardSize[0];
        const maxCols = this.props.matrixBoardSize[1];

        _(maxRows).times(row => {
            _(maxCols).times(col => {
                const inputPath = getInputPath(row, col);
                inputPaths.push(inputPath);
            });
        });

        return inputPaths;
    },

    getGrammarTypeForPath: function(inputPath) {
        return "number";
    },

    _handleFocus: function(row, col) {
        this.props.onFocus(getInputPath(row, col));
    },

    _handleBlur: function(row, col) {
        this.props.onBlur(getInputPath(row, col));
    },

    focus: function() {
        this.focusInputPath(getDefaultPath());
        return true;
    },

    focusInputPath: function(path) {
        const inputID = getRefForPath(path);
        this.refs[inputID].focus();
    },

    blurInputPath: function(path) {
        if (path.length === 0) {
            path = getDefaultPath();
        }

        const inputID = getRefForPath(path);
        this.refs[inputID].blur();
    },

    getDOMNodeForPath: function(inputPath) {
        const inputID = getRefForPath(inputPath);
        return ReactDOM.findDOMNode(this.refs[inputID]);
    },

    setInputValue: function(inputPath, value, callback) {
        const row = getRowFromPath(inputPath);
        const col = getColumnFromPath(inputPath);
        this.onValueChange(row, col, value, callback);
    },

    handleKeyDown: function(row, col, e) {
        const maxRow = this.props.matrixBoardSize[0];
        const maxCol = this.props.matrixBoardSize[1];
        let enterTheMatrix = null;

        const curInput = this.refs[getRefForPath(getInputPath(row, col))];
        const curValueString = curInput.getStringValue();
        const cursorStartPosition = curInput.getSelectionStart();
        const cursorEndPosition = curInput.getSelectionEnd();

        let nextPath = null;
        if (e.key === "ArrowUp" && row > 0) {
            nextPath = getInputPath(row - 1, col);
        } else if (e.key === "ArrowDown" && row + 1 < maxRow) {
            nextPath = getInputPath(row + 1, col);
        } else if (e.key === "ArrowLeft" && col > 0) {
            if (cursorStartPosition === 0 && cursorEndPosition === 0) {
                // Only go to next input if we're at the *start* of the content
                nextPath = getInputPath(row, col - 1);
            }
        } else if (e.key === "ArrowRight" && col + 1 < maxCol) {
            if (cursorStartPosition === curValueString.length) {
                // Only go to next input if we're at the *end* of the content
                nextPath = getInputPath(row, col + 1);
            }
        } else if (e.key === "Enter") {
            enterTheMatrix = this.state.enterTheMatrix + 1;
        } else if (e.key === "Escape") {
            enterTheMatrix = 0;
        }

        if (nextPath) {
            // Prevent the cursor from jumping again inside the next input
            e.preventDefault();

            // Focus the input and move the cursor to the end of it.
            const input = this.refs[getRefForPath(nextPath)];

            // Multiply by 2 to ensure the cursor always ends up at the end;
            // Opera sometimes sees a carriage return as 2 characters.
            const inputValString = input.getStringValue();
            const valueLength = inputValString.length * 2;

            input.focus();
            if (e.key === "ArrowRight") {
                input.setSelectionRange(0, 0);
            } else {
                input.setSelectionRange(valueLength, valueLength);
            }
        }

        if (enterTheMatrix != null) {
            this.setState({
                enterTheMatrix: enterTheMatrix,
            });
        }
    },

    onValueChange: function(row, column, value, cb) {
        const answers = _.map(this.props.answers, _.clone);
        if (!answers[row]) {
            answers[row] = [];
        }
        answers[row][column] = value;
        this.props.onChange({
            answers: answers,
        }, cb);
        this.props.trackInteraction();
    },

    getUserInput: function() {
        return {
            answers: this.props.answers,
        };
    },

    simpleValidate: function(rubric) {
        return Matrix.validate(this.getUserInput(), rubric);
    },
});

_.extend(Matrix, {
    validate: function(state, rubric) {
        const solution = rubric.answers;
        const supplied = state.answers;
        const solutionSize = getMatrixSize(solution);
        const suppliedSize = getMatrixSize(supplied);

        const incorrectSize = solutionSize[0] !== suppliedSize[0] ||
                solutionSize[1] !== suppliedSize[1];

        const createValidator = KhanAnswerTypes
                                  .number.createValidatorFunctional;
        let message = null;
        let hasEmptyCell = false;
        let incorrect = false;
        _(suppliedSize[0]).times((row) => {
            _(suppliedSize[1]).times((col) => {
                if (supplied[row][col] == null ||
                        supplied[row][col].toString().length === 0) {
                    hasEmptyCell = true;
                }
                const validator = createValidator(
                        solution[row][col],
                        { simplify: true }
                    );
                const result = validator(supplied[row][col]);
                if (result.message) {
                    message = result.message;
                }
                if (!result.correct) {
                    incorrect = true;
                }
            });
        });

        if (hasEmptyCell) {
            return {
                type: "invalid",
                message: i18n._(
                    "Make sure you fill in all cells in the matrix."),
            };
        }

        if (incorrectSize) {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null,
            };
        }

        return {
            type: "points",
            earned: incorrect ? 0 : 1,
            total: 1,
            message: message,
        };
    },
});

const propTransform = (editorProps) => {
    // Remove answers before passing to widget
    const blankAnswers = _(editorProps.matrixBoardSize[0]).times(function() {
        return stringArrayOfSize(editorProps.matrixBoardSize[1]);
    });
    editorProps = _.pick(editorProps, "matrixBoardSize", "prefix", "suffix");
    return _.extend(editorProps, {
        answers: blankAnswers,
    });
};

const staticTransform = (editorProps) => {
    const widgetProps = _.pick(editorProps,
        "matrixBoardSize", "prefix", "suffix");
    // We convert matrix cells from numbers to string to match the expected
    // input into the rendered widget.
    widgetProps.answers = _.map(editorProps.answers,
        (row) => {
            // Replace null values with empty string
            return _.map(row, (cell) => cell != null ? String(cell) : "");
        }
    );
    return widgetProps;
};

module.exports = {
    name: "matrix",
    displayName: "Matrix",
    widget: Matrix,
    transform: propTransform,
    staticTransform: staticTransform,
};
