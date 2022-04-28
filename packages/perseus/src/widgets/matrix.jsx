/* eslint-disable react/prop-types */
/* eslint-disable react/sort-comp */
// @flow
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import classNames from "classnames";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import MathOutput from "../components/math-output.jsx";
import NumberInput from "../components/number-input.jsx";
import SimpleKeypadInput from "../components/simple-keypad-input.jsx";
import TextInput from "../components/text-input.jsx";
import {linterContextDefault} from "../gorgon/proptypes.js";
import InteractiveUtil from "../interactive2/interactive-util.js";
import {ApiOptions} from "../perseus-api.jsx";
import Renderer from "../renderer.jsx";
import Util from "../util.js";
import KhanAnswerTypes from "../util/answer-types.js";

// Type imports
import type {PerseusMatrixWidgetOptions} from "../perseus-types";
import type {WidgetExports, WidgetProps} from "../types.js";

const {assert} = InteractiveUtil;
const {stringArrayOfSize} = Util;

// We store three sets of dimensions for the brackets, for our three types of
// inputs, which vary in formatting: (1) the "static" inputs rendered for the
// mobile apps (that are being deprecated), (2) the normal inputs rendered on
// desktop, and (3) the keypad-based inputs newly rendered for the mobile apps
// and mobile web. The first two sets of dimensions come from `matrix.less`;
// the keypad-based input's dimensions are provided to the component itself,
// below.
const STATIC_INPUT_DIMENSIONS = {
    INPUT_MARGIN: 4,
    INPUT_HEIGHT: 38,
    INPUT_WIDTH: 82,
};

const NORMAL_DIMENSIONS = {
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
function getInputPath(row: any, column: any): $ReadOnlyArray<string> {
    return ["" + row, "" + column];
}

const getDefaultPath = function () {
    return getInputPath(0, 0);
};

const getRowFromPath = function (path) {
    // 'path' should be a (row, column) pair
    assert(_.isArray(path) && path.length === 2);
    return +path[0];
};

const getColumnFromPath = function (path) {
    // 'path' should be a (row, column) pair
    assert(_.isArray(path) && path.length === 2);
    return +path[1];
};

const getRefForPath = function (path) {
    const row = getRowFromPath(path);
    const column = getColumnFromPath(path);
    return "answer" + row + "," + column;
};

const getMatrixSize = function (matrix) {
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

type Rubric = PerseusMatrixWidgetOptions;

type ExternalProps = WidgetProps<PerseusMatrixWidgetOptions, Rubric>;

type Props = {|
    ...ExternalProps,
    onChange: (
        {|
            cursorPosition?: $ReadOnlyArray<number>,
            answers?: $ReadOnlyArray<$ReadOnlyArray<number | string>>,
        |},
        () => boolean,
    ) => void,
    numericInput?: boolean,
|};

type DefaultProps = {|
    matrixBoardSize: Props["matrixBoardSize"],
    answers: Props["answers"],
    prefix: Props["prefix"],
    suffix: Props["suffix"],
    cursorPosition: Props["cursorPosition"],
    apiOptions: Props["apiOptions"],
    linterContext: Props["linterContext"],
|};

type State = {|
    enterTheMatrix: number,
|};
class Matrix extends React.Component<Props, State> {
    cursorPosition: [number, number];

    static defaultProps: DefaultProps = {
        matrixBoardSize: [3, 3],
        answers: [[]],
        prefix: "",
        suffix: "",
        cursorPosition: [0, 0],
        apiOptions: ApiOptions.defaults,
        linterContext: linterContextDefault,
    };

    state: State = {
        enterTheMatrix: 0,
    };

    componentDidMount() {
        // Used in the `onBlur` and `onFocus` handlers
        this.cursorPosition = [0, 0];
    }

    render(): React.Node {
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
        const {INPUT_MARGIN, INPUT_HEIGHT, INPUT_WIDTH} = dimensions;

        const matrixSize = getMatrixSize(this.props.answers);
        const maxRows = this.props.matrixBoardSize[0];
        const maxCols = this.props.matrixBoardSize[1];
        const cursorRow = this.props.cursorPosition[0];
        const cursorCol = this.props.cursorPosition[1];

        const highlightedRow = Math.max(cursorRow, matrixSize[0] - 1);
        const highlightedCol = Math.max(cursorCol, matrixSize[1] - 1);
        const bracketHeight =
            (highlightedRow + 1) * (INPUT_HEIGHT + 2 * INPUT_MARGIN);
        const bracketOffset =
            (highlightedCol + 1) * (INPUT_WIDTH + 2 * INPUT_MARGIN);

        const className = classNames({
            "perseus-matrix": true,
            "static-mode": this.props.static,
            "the-matrix": this.state.enterTheMatrix >= 5,
        });

        return (
            <div className={className}>
                {this.props.prefix && (
                    <div className="matrix-prefix">
                        <Renderer
                            content={this.props.prefix}
                            linterContext={this.props.linterContext}
                        />
                    </div>
                )}
                <div className="matrix-input">
                    <div
                        className="matrix-bracket bracket-left"
                        style={{
                            height: bracketHeight,
                        }}
                    />
                    <div
                        className="matrix-bracket bracket-right"
                        style={{
                            height: bracketHeight,
                            left: bracketOffset,
                        }}
                    />
                    {_(maxRows).times((row) => {
                        const rowVals = this.props.answers[row];
                        return (
                            <div className="matrix-row" key={row}>
                                {_(maxCols).times((col) => {
                                    const outside =
                                        row > highlightedRow ||
                                        col > highlightedCol;
                                    const inputProps = {
                                        className: outside
                                            ? "outside"
                                            : "inside",
                                        ref: getRefForPath(
                                            getInputPath(row, col),
                                        ),
                                        value: rowVals ? rowVals[col] : null,
                                        style: {
                                            height: INPUT_HEIGHT,
                                            width: INPUT_WIDTH,
                                            margin: INPUT_MARGIN,
                                        },
                                        disabled:
                                            this.props.apiOptions.readOnly,
                                        onFocus: () => {
                                            // We store this locally so that we can use
                                            // the new information in the `onBlur`
                                            // handler, which happens before the props
                                            // change has time to propagate.
                                            // TODO(emily): Try to fix `MathOutput` so
                                            // it correctly sends blur events before
                                            // focus events.
                                            this.cursorPosition = [row, col];
                                            this.props.onChange(
                                                {
                                                    cursorPosition: [row, col],
                                                },
                                                () => {
                                                    // This isn't a user interaction, so
                                                    // return false to signal that the
                                                    // matrix shouldn't be focused
                                                    return false;
                                                },
                                            );
                                            this._handleFocus(row, col);
                                        },
                                        onBlur: () => {
                                            if (
                                                row ===
                                                    this.cursorPosition[0] &&
                                                col === this.cursorPosition[1]
                                            ) {
                                                this.props.onChange(
                                                    {
                                                        cursorPosition: [0, 0],
                                                    },
                                                    () => {
                                                        // This isn't a user interaction,
                                                        // so return false to signal that
                                                        // the matrix shouldn't be focused
                                                        return false;
                                                    },
                                                );
                                            }
                                            this._handleBlur(row, col);
                                        },
                                        onKeyDown: (e) => {
                                            this.handleKeyDown(row, col, e);
                                        },
                                        onChange: (value, cb) => {
                                            this.onValueChange(
                                                row,
                                                col,
                                                value,
                                                cb,
                                            );
                                        },
                                    };

                                    let MatrixInput;
                                    if (this.props.apiOptions.customKeypad) {
                                        const style = {
                                            margin: INPUT_MARGIN,
                                            minWidth: INPUT_WIDTH,
                                            minHeight: INPUT_HEIGHT,
                                            // Ensure that any borders are included in
                                            // the provided width.
                                            boxSizing: "border-box",
                                            backgroundColor: outside
                                                ? "#f3f3f3"
                                                : "#fff",
                                        };

                                        MatrixInput = (
                                            <SimpleKeypadInput
                                                {...inputProps}
                                                style={style}
                                                scrollable={true}
                                                keypadElement={
                                                    this.props.keypadElement
                                                }
                                            />
                                        );
                                    } else if (
                                        this.props.apiOptions.staticRender
                                    ) {
                                        MatrixInput = (
                                            <MathOutput {...inputProps} />
                                        );
                                    } else if (this.props.numericInput) {
                                        MatrixInput = (
                                            <NumberInput {...inputProps} />
                                        );
                                    } else {
                                        MatrixInput = (
                                            <TextInput {...inputProps} />
                                        );
                                    }
                                    return (
                                        <span
                                            key={col}
                                            className="matrix-input-field"
                                        >
                                            {MatrixInput}
                                        </span>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
                {this.props.suffix && (
                    <div className="matrix-suffix">
                        <Renderer
                            content={this.props.suffix}
                            linterContext={this.props.linterContext}
                        />
                    </div>
                )}
            </div>
        );
    }

    getInputPaths: () => $ReadOnlyArray<$ReadOnlyArray<string>> = () => {
        const inputPaths = [];
        const maxRows = this.props.matrixBoardSize[0];
        const maxCols = this.props.matrixBoardSize[1];

        _(maxRows).times((row) => {
            _(maxCols).times((col) => {
                const inputPath = getInputPath(row, col);
                inputPaths.push(inputPath);
            });
        });

        return inputPaths;
    };

    getGrammarTypeForPath: ($FlowFixMe) => string = (inputPath) => {
        return "number";
    };

    _handleFocus: ($FlowFixMe, $FlowFixMe) => void = (row, col) => {
        this.props.onFocus(getInputPath(row, col));
    };

    _handleBlur: ($FlowFixMe, $FlowFixMe) => void = (row, col) => {
        this.props.onBlur(getInputPath(row, col));
    };

    focus: () => boolean = () => {
        this.focusInputPath(getDefaultPath());
        return true;
    };

    focusInputPath: ($FlowFixMe) => void = (path) => {
        const inputID = getRefForPath(path);
        // eslint-disable-next-line react/no-string-refs
        this.refs[inputID].focus();
    };

    blurInputPath: ($FlowFixMe) => void = (path) => {
        if (path.length === 0) {
            path = getDefaultPath();
        }

        const inputID = getRefForPath(path);
        // eslint-disable-next-line react/no-string-refs
        this.refs[inputID].blur();
    };

    getDOMNodeForPath: ($FlowFixMe) => ?(Element | Text) = (inputPath) => {
        const inputID = getRefForPath(inputPath);
        // eslint-disable-next-line react/no-string-refs
        return ReactDOM.findDOMNode(this.refs[inputID]);
    };

    setInputValue: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => void = (
        inputPath,
        value,
        callback,
    ) => {
        const row = getRowFromPath(inputPath);
        const col = getColumnFromPath(inputPath);
        this.onValueChange(row, col, value, callback);
    };

    handleKeyDown: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => void = (
        row,
        col,
        e,
    ) => {
        const maxRow = this.props.matrixBoardSize[0];
        const maxCol = this.props.matrixBoardSize[1];
        let enterTheMatrix = null;

        // eslint-disable-next-line react/no-string-refs
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
            // eslint-disable-next-line react/no-string-refs
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
    };

    onValueChange: ($FlowFixMe, $FlowFixMe, $FlowFixMe, $FlowFixMe) => void = (
        row,
        column,
        value,
        cb,
    ) => {
        const answers = _.map(this.props.answers, _.clone);
        if (!answers[row]) {
            answers[row] = [];
        }
        answers[row][column] = value;
        this.props.onChange(
            {
                answers: answers,
            },
            cb,
        );
        this.props.trackInteraction();
    };

    getUserInput: () => $FlowFixMe = () => {
        return {
            answers: this.props.answers,
        };
    };

    simpleValidate: ($FlowFixMe) => $FlowFixMe = (rubric) => {
        // $FlowFixMe[prop-missing]
        return Matrix.validate(this.getUserInput(), rubric);
    };
}

_.extend(Matrix, {
    validate: function (state, rubric) {
        const solution = rubric.answers;
        const supplied = state.answers;
        const solutionSize = getMatrixSize(solution);
        const suppliedSize = getMatrixSize(supplied);

        const incorrectSize =
            solutionSize[0] !== suppliedSize[0] ||
            solutionSize[1] !== suppliedSize[1];

        const createValidator =
            KhanAnswerTypes.number.createValidatorFunctional;
        let message = null;
        let hasEmptyCell = false;
        let incorrect = false;
        _(suppliedSize[0]).times((row) => {
            _(suppliedSize[1]).times((col) => {
                if (
                    supplied[row][col] == null ||
                    supplied[row][col].toString().length === 0
                ) {
                    hasEmptyCell = true;
                }
                if (!incorrectSize) {
                    const validator = createValidator(solution[row][col], {
                        simplify: true,
                    });
                    const result = validator(supplied[row][col]);
                    if (result.message) {
                        message = result.message;
                    }
                    if (!result.correct) {
                        incorrect = true;
                    }
                }
            });
        });

        if (hasEmptyCell) {
            return {
                type: "invalid",
                message: i18n._(
                    "Make sure you fill in all cells in the matrix.",
                ),
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

const propTransform: ($FlowFixMe) => $FlowFixMe = (editorProps) => {
    // Remove answers before passing to widget
    const blankAnswers = _(editorProps.matrixBoardSize[0]).times(function () {
        return stringArrayOfSize(editorProps.matrixBoardSize[1]);
    });
    editorProps = _.pick(editorProps, "matrixBoardSize", "prefix", "suffix");
    return _.extend(editorProps, {
        answers: blankAnswers,
    });
};

const staticTransform: ($FlowFixMe) => $FlowFixMe = (editorProps) => {
    const widgetProps = _.pick(
        editorProps,
        "matrixBoardSize",
        "prefix",
        "suffix",
    );
    // We convert matrix cells from numbers to string to match the expected
    // input into the rendered widget.
    widgetProps.answers = _.map(editorProps.answers, (row) => {
        // Replace null values with empty string
        return _.map(row, (cell) => (cell != null ? String(cell) : ""));
    });
    return widgetProps;
};

export default ({
    name: "matrix",
    displayName: "Matrix",
    widget: Matrix,
    transform: propTransform,
    staticTransform: staticTransform,
    isLintable: true,
}: WidgetExports<typeof Matrix>);
