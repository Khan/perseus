/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, max-len, no-undef, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp, space-before-function-paren */
/* To fix, remove an entry above, run ka-lint, and fix errors. */


var classNames = require("classnames");
var React = require("react");
var ReactDOM = require("react-dom");
var _ = require("underscore");

var NumberInput = require("../components/number-input.jsx");
var Renderer = require("../renderer.jsx");
var TextInput = require("../components/text-input.jsx");
var MathOutput = require("../components/math-output.jsx");
const SimpleKeypadInput = require("../components/simple-keypad-input.jsx");

var ApiOptions = require("../perseus-api.jsx").Options;
const KhanAnswerTypes = require("../util/answer-types.js");
const { keypadElementPropType } = require("../../math-input").propTypes;

var assert = require("../interactive2/interactive-util.js").assert;
var stringArrayOfSize = require("../util.js").stringArrayOfSize;


// We store three sets of dimensions for the brackets, for our three types of
// inputs, which vary in formatting: (1) the "static" inputs rendered for the
// mobile apps (that are being deprecated), (2) the normal inputs rendered on
// desktop, and (3) the keypad-based inputs newly rendered for the mobile apps
// and mobile web. The first two sets of dimensions come from `matrix.less`;
// the keypad-based input's dimensions are provided to the component itself,
// below.
var STATIC_INPUT_DIMENSIONS = {
    INPUT_MARGIN: 4,
    INPUT_HEIGHT: 38,
    INPUT_WIDTH: 82,
};

var NORMAL_DIMENSIONS = {
    INPUT_MARGIN: 3,
    INPUT_HEIGHT: 30,
    INPUT_WIDTH: 40,
};

const KEYPAD_INPUT_DIMENSIONS = {
    INPUT_MARGIN: 4,
    INPUT_HEIGHT: 36,
    INPUT_WIDTH: 64,
};

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

var getMatrixSize = function(matrix) {
    var matrixSize = [1, 1];

    // We need to find the widest row and tallest column to get the correct
    // matrix size.
    _(matrix).each((matrixRow, row) => {
        var rowWidth = 0;
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

var Matrix = React.createClass({
    propTypes: {
        answers: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(
                React.PropTypes.oneOfType([
                    React.PropTypes.string,
                    React.PropTypes.number
                ])
            )
        ),
        apiOptions: ApiOptions.propTypes,
        cursorPosition: React.PropTypes.arrayOf(
            React.PropTypes.number
        ),
        keypadElement: keypadElementPropType,
        matrixBoardSize: React.PropTypes.arrayOf(
            React.PropTypes.number
        ).isRequired,
        prefix: React.PropTypes.string,
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
            apiOptions: ApiOptions.defaults
        };
    },

    getInitialState: function() {
        return {
            enterTheMatrix: 0
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
        let dimensions;
        if (this.props.apiOptions.customKeypad) {
            dimensions = KEYPAD_INPUT_DIMENSIONS;
        } else if (this.props.apiOptions.staticRender) {
            dimensions = STATIC_INPUT_DIMENSIONS;
        } else {
            dimensions = NORMAL_DIMENSIONS;
        }
        const { INPUT_MARGIN, INPUT_HEIGHT, INPUT_WIDTH } = dimensions;

        var matrixSize = getMatrixSize(this.props.answers);
        var maxRows = this.props.matrixBoardSize[0];
        var maxCols = this.props.matrixBoardSize[1];
        var cursorRow = this.props.cursorPosition[0];
        var cursorCol = this.props.cursorPosition[1];

        var highlightedRow = Math.max(cursorRow, matrixSize[0] - 1);
        var highlightedCol = Math.max(cursorCol, matrixSize[1] - 1);
        var bracketHeight = (highlightedRow + 1) *
                (INPUT_HEIGHT + 2 * INPUT_MARGIN);
        var bracketOffset = (highlightedCol + 1) *
                (INPUT_WIDTH + 2 * INPUT_MARGIN);

        var className = classNames({
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
                        height: bracketHeight
                    }}>
                </div>
                <div
                    className={"matrix-bracket bracket-right"}
                    style={{
                        height: bracketHeight,
                        left: bracketOffset
                    }}>
                </div>
                {_(maxRows).times(row => {
                    var rowVals = this.props.answers[row];
                    return <div className="matrix-row" key={row}>
                        {_(maxCols).times((col) => {
                            var outside = row > highlightedRow ||
                                    col > highlightedCol;
                            var inputProps = {
                                className: outside ? "outside" : "inside",
                                ref: getRefForPath(getInputPath(row, col)),
                                value: rowVals ? rowVals[col] : null,
                                style: {
                                    height: INPUT_HEIGHT,
                                    width: INPUT_WIDTH,
                                    margin: INPUT_MARGIN
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
                                        cursorPosition: [row, col]
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
                                            cursorPosition: [0, 0]
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
                                onChange: (value, cb) => {
                                    this.onValueChange(row, col, value, cb);
                                }
                            };

                            let MatrixInput;
                            if (this.props.apiOptions.customKeypad) {
                                const style = {
                                    margin: INPUT_MARGIN,
                                    minWidth: INPUT_WIDTH,
                                    minHeight: INPUT_HEIGHT,
                                    // Ensure that any borders are included in
                                    // the provided width.
                                    boxSizing: 'border-box',
                                    backgroundColor: outside ? '#f3f3f3' :
                                                               '#fff'
                                };

                                MatrixInput = <SimpleKeypadInput
                                    {...inputProps}
                                    style={style}
                                    scrollable={true}
                                    keypadElement={this.props.keypadElement}
                                />;
                            } else if (this.props.apiOptions.staticRender) {
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
        var inputPaths = [];
        var maxRows = this.props.matrixBoardSize[0];
        var maxCols = this.props.matrixBoardSize[1];

        _(maxRows).times(row => {
            _(maxCols).times(col => {
                var inputPath = getInputPath(row, col);
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
        var inputID = getRefForPath(path);
        this.refs[inputID].focus();
    },

    blurInputPath: function(path) {
        if (path.length === 0) {
            path = getDefaultPath();
        }

        var inputID = getRefForPath(path);
        this.refs[inputID].blur();
    },

    getDOMNodeForPath: function(inputPath) {
        var inputID = getRefForPath(inputPath);
        return ReactDOM.findDOMNode(this.refs[inputID]);
    },

    setInputValue: function(inputPath, value, callback) {
        var row = getRowFromPath(inputPath);
        var col = getColumnFromPath(inputPath);
        this.onValueChange(row, col, value, callback);
    },

    handleKeyDown: function (row, col, e) {
        var maxRow = this.props.matrixBoardSize[0];
        var maxCol = this.props.matrixBoardSize[1];
        var enterTheMatrix = null;

        var curInput = this.refs[getRefForPath(getInputPath(row, col))];
        var curValueString = curInput.getStringValue();
        var cursorStartPosition = curInput.getSelectionStart();
        var cursorEndPosition = curInput.getSelectionEnd();

        var nextPath = null;
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
            var input = this.refs[getRefForPath(nextPath)];

            // Multiply by 2 to ensure the cursor always ends up at the end;
            // Opera sometimes sees a carriage return as 2 characters.
            var inputValString = input.getStringValue();
            var valueLength = inputValString.length * 2;

            input.focus();
            if (e.key === "ArrowRight") {
                input.setSelectionRange(0, 0);
            } else {
                input.setSelectionRange(valueLength, valueLength);
            }
        }

        if (enterTheMatrix != null) {
            this.setState({
                enterTheMatrix: enterTheMatrix
            });
        }
    },

    onValueChange: function(row, column, value, cb) {
        var answers = _.map(this.props.answers, _.clone);
        if (!answers[row]) {
            answers[row] = [];
        }
        answers[row][column] = value;
        this.props.onChange({
            answers: answers
        }, cb);
        this.props.trackInteraction();
    },

    getUserInput: function() {
        return {
            answers: this.props.answers
        };
    },

    simpleValidate: function(rubric) {
        return Matrix.validate(this.getUserInput(), rubric);
    }
});

_.extend(Matrix, {
    validate: function(state, rubric) {
        var solution = rubric.answers;
        var supplied = state.answers;
        var solutionSize = getMatrixSize(solution);
        var suppliedSize = getMatrixSize(supplied);

        var incorrectSize = solutionSize[0] !== suppliedSize[0] ||
                solutionSize[1] !== suppliedSize[1];

        var createValidator = KhanAnswerTypes
                                  .number.createValidatorFunctional;
        var message = null;
        var hasEmptyCell = false;
        var incorrect = false;
        _(suppliedSize[0]).times((row) => {
            _(suppliedSize[1]).times((col) => {
                if (supplied[row][col] == null ||
                        supplied[row][col].toString().length === 0) {
                    hasEmptyCell = true;
                }
                var validator = createValidator(
                        solution[row][col],
                        { simplify: true }
                    );
                var result = validator(supplied[row][col]);
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
                message: i18n._("Make sure you fill in all cells in the matrix.")
            };
        }

        if (incorrectSize) {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null
            };
        }

        return {
            type: "points",
            earned: incorrect ? 0 : 1,
            total: 1,
            message: message
        };
    }
});

var propTransform = (editorProps) => {
    // Remove answers before passing to widget
    var blankAnswers = _(editorProps.matrixBoardSize[0]).times(function() {
        return stringArrayOfSize(editorProps.matrixBoardSize[1]);
    });
    editorProps = _.pick(editorProps, "matrixBoardSize", "prefix", "suffix");
    return _.extend(editorProps, {
        answers: blankAnswers
    });
};

var staticTransform = (editorProps) => {
    var widgetProps = _.pick(editorProps,
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
