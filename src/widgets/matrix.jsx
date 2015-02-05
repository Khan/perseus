var React = require('react');
var _ = require("underscore");

var Changeable = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");

var Editor = require("../editor.jsx");
var NumberInput = require("../components/number-input.jsx");
var RangeInput = require("../components/range-input.jsx");
var Renderer = require("../renderer.jsx");
var TextInput = require("../components/text-input.jsx");
var MathOutput = require("../components/math-output.jsx");

var ApiOptions = require("../perseus-api.jsx").Options;

var assert = require("../interactive2/interactive-util.js").assert;
var stringArrayOfSize = require("../util.js").stringArrayOfSize;

// Really large matrices will cause issues with question formatting, so we
// have to cap it at some point.
var MAX_BOARD_SIZE = 6;

// We store two sets of dimensions for the brackets, because mobile formatting
// is different. These dimensions come from `matrix.less`.
var MOBILE_DIMENSIONS = {
    INPUT_MARGIN: 4,
    INPUT_HEIGHT: 38,
    INPUT_WIDTH: 82
};

var NORMAL_DIMENSIONS = {
    INPUT_MARGIN: 3,
    INPUT_HEIGHT: 30,
    INPUT_WIDTH: 40
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
        matrixBoardSize: React.PropTypes.arrayOf(
            React.PropTypes.number
        ).isRequired,
        answers: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(
                React.PropTypes.oneOfType([
                    React.PropTypes.string,
                    React.PropTypes.number
                ])
            )
        ),
        prefix: React.PropTypes.string,
        suffix: React.PropTypes.string,
        cursorPosition: React.PropTypes.arrayOf(
            React.PropTypes.number
        )
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
        var dimensions = this.props.apiOptions.staticRender ?
                MOBILE_DIMENSIONS : NORMAL_DIMENSIONS;
        var { INPUT_MARGIN, INPUT_HEIGHT, INPUT_WIDTH } = dimensions;

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

        var cx = React.addons.classSet;
        var className = cx({
            "perseus-matrix": true,
            "the-matrix": this.state.enterTheMatrix >= 5
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
                                onChange: (value) => {
                                    this.onValueChange(row, col, value);
                                }
                            };

                            var MatrixInput;
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
        return this.refs[inputID].getDOMNode();
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

        var nextPath = null;
        if (e.key === "ArrowUp" && row > 0) {
            nextPath = getRefForPath(getInputPath(row - 1, col));
        } else if (e.key === "ArrowDown" && row + 1 < maxRow) {
            nextPath = getRefForPath(getInputPath(row + 1, col));
        } else if (e.key === "ArrowLeft" && col > 0) {
            nextPath = getRefForPath(getInputPath(row, col - 1));
        } else if (e.key === "ArrowRight" && col + 1 < maxCol) {
            nextPath = getRefForPath(getInputPath(row, col + 1));
        } else if (e.key === "Enter") {
            enterTheMatrix = this.state.enterTheMatrix + 1;
        } else if (e.key === "Escape") {
            enterTheMatrix = 0;
        }

        if (nextPath) {
            this.refs[nextPath].focus();
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
    },

    getUserInput: function() {
        return {
            answers: this.props.answers
        };
    },

    simpleValidate: function(rubric) {
        return Matrix.validate(this.getUserInput(), rubric);
    },

    statics: {
        displayMode: "block"
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

        var createValidator = Khan.answerTypes
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
                message: $._("Make sure you fill in all cells in the matrix.")
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

var MatrixEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        matrixBoardSize: React.PropTypes.arrayOf(
            React.PropTypes.number
        ).isRequired,
        answers: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(
                React.PropTypes.number
            )
        ),
        prefix: React.PropTypes.string,
        suffix: React.PropTypes.string,
        cursorPosition: React.PropTypes.arrayOf(
            React.PropTypes.number
        )
    },

    getDefaultProps: function() {
        return {
            matrixBoardSize: [3, 3],
            answers: [[]],
            prefix: "",
            suffix: "",
            cursorPosition: [0, 0]
        };
    },

    render: function() {
        var matrixProps = _.extend({
            numericInput: true,
            onBlur: () => {},
            onFocus: () => {}
        }, this.props);
        return <div className="perseus-matrix-editor">
            <div className="perseus-widget-row">
                {" "}Max matrix size:{" "}
                <RangeInput
                    value={this.props.matrixBoardSize}
                    onChange={this.onMatrixBoardSizeChange}
                    format={this.props.labelStyle}
                    useArrowKeys={true} />
            </div>
            <div className="perseus-widget-row">
                <Matrix {...matrixProps} />
            </div>
            <div className="perseus-widget-row">
                {" "}Matrix prefix:{" "}
                <Editor
                    ref={"prefix"}
                    content={this.props.prefix}
                    widgetEnabled={false}
                    onChange={(newProps) => {
                        this.change({ prefix: newProps.content });
                    }} />
            </div>
            <div className="perseus-widget-row">
                {" "}Matrix suffix:{" "}
                <Editor
                    ref={"suffix"}
                    content={this.props.suffix}
                    widgetEnabled={false}
                    onChange={(newProps) => {
                        this.change({ suffix: newProps.content });
                    }} />
            </div>
        </div>;
    },

    onMatrixBoardSizeChange: function (range) {
        var matrixSize = getMatrixSize(this.props.answers);
        if (range[0] !== null && range[1] !== null) {
            range = [
                Math.round(Math.min(Math.max(range[0], 1), MAX_BOARD_SIZE)),
                Math.round(Math.min(Math.max(range[1], 1), MAX_BOARD_SIZE))
            ];
            var answers = _(Math.min(range[0], matrixSize[0])).times(row => {
                return _(Math.min(range[1], matrixSize[1])).times(col => {
                    return this.props.answers[row][col];
                });
            });
            this.props.onChange({
                matrixBoardSize: range,
                answers: answers
            });
        }
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

module.exports = {
    name: "matrix",
    displayName: "Matrix",
    widget: Matrix,
    editor: MatrixEditor,
    transform: propTransform
};
