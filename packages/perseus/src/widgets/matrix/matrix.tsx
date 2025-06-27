import {getMatrixSize} from "@khanacademy/perseus-core";
import {linterContextDefault} from "@khanacademy/perseus-linter";
import {StyleSheet} from "aphrodite";
import classNames from "classnames";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import SimpleKeypadInput from "../../components/simple-keypad-input";
import TextInput from "../../components/text-input";
import InteractiveUtil from "../../interactive2/interactive-util";
import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/matrix/matrix-ai-utils";

import type {FocusPath, Widget, WidgetExports, WidgetProps} from "../../types";
import type {MatrixPromptJSON} from "../../widget-ai-utils/matrix/matrix-ai-utils";
import type {
    MatrixPublicWidgetOptions,
    PerseusMatrixUserInput,
    PerseusMatrixWidgetOptions,
} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

const {assert} = InteractiveUtil;

// We store two sets of dimensions for the brackets, for our two types of
// inputs, which vary in formatting: (1) the normal inputs rendered on
// desktop and (2) the keypad-based inputs newly rendered for the mobile apps
// and mobile web. These sets of dimensions come from `matrix.css`;
// the keypad-based input's dimensions are provided to the component itself,
// below.
const NORMAL_DIMENSIONS = {
    INPUT_MARGIN: 3,
    INPUT_HEIGHT: 30,
    INPUT_WIDTH: 40,
} as const;

const KEYPAD_INPUT_DIMENSIONS = {
    INPUT_MARGIN: 4,
    INPUT_HEIGHT: 36,
    INPUT_WIDTH: 64,
} as const;

/* Input handling: Maps a (row, column) pair to a unique ref used by React,
 * and extracts (row, column) pairs from input paths, used to allow outsiders
 * to focus, blur, set input values, etc. */
function getInputPath(row: any, column: any): ReadonlyArray<string> {
    return ["" + row, "" + column];
}

const getDefaultPath = function () {
    return getInputPath(0, 0);
};

const getRowFromPath = function (path) {
    // 'path' should be a (row, column) pair
    assert(Array.isArray(path) && path.length === 2);
    return +path[0];
};

const getColumnFromPath = function (path) {
    // 'path' should be a (row, column) pair
    assert(Array.isArray(path) && path.length === 2);
    return +path[1];
};

const getRefForPath = function (path: FocusPath) {
    const row = getRowFromPath(path);
    const column = getColumnFromPath(path);
    return "answer" + row + "," + column;
};

// Assert that the PerseusMatrixWidgetOptions parsed from JSON can be passed
// as props to this component. This ensures that the PerseusMatrixWidgetOptions
// stays in sync with the prop types. The PropsFor<Component> type takes
// defaultProps into account, which is important because
// PerseusMatrixWidgetOptions has optional fields which receive defaults via
// defaultProps.
0 as any as WidgetProps<
    PerseusMatrixWidgetOptions,
    PerseusMatrixUserInput
> satisfies PropsFor<typeof Matrix>;

type Props = WidgetProps<MatrixPublicWidgetOptions, PerseusMatrixUserInput> & {
    // The coordinate location of the cursor position at start. default: [0, 0]
    cursorPosition: ReadonlyArray<number>;
    onChange: (
        nextProps: {
            cursorPosition?: ReadonlyArray<number>;
        },
        cb: () => boolean,
    ) => void;
};

type DefaultProps = {
    matrixBoardSize: Props["matrixBoardSize"];
    prefix: string;
    suffix: string;
    cursorPosition: ReadonlyArray<number>;
    apiOptions: Props["apiOptions"];
    linterContext: Props["linterContext"];
    userInput: PerseusMatrixUserInput;
};

type State = {
    enterTheMatrix: number;
};
class Matrix extends React.Component<Props, State> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    // @ts-expect-error - TS2564 - Property 'cursorPosition' has no initializer and is not definitely assigned in the constructor.
    cursorPosition: [number, number];

    static defaultProps: DefaultProps = {
        matrixBoardSize: [3, 3],
        prefix: "",
        suffix: "",
        cursorPosition: [0, 0],
        apiOptions: ApiOptions.defaults,
        linterContext: linterContextDefault,
        userInput: {
            answers: [[]],
        },
    };

    state: State = {
        enterTheMatrix: 0,
    };

    componentDidMount() {
        // Used in the `onBlur` and `onFocus` handlers
        this.cursorPosition = [0, 0];
    }

    getInputPaths: () => ReadonlyArray<ReadonlyArray<string>> = () => {
        const inputPaths: Array<ReadonlyArray<string>> = [];
        const maxRows = this.props.matrixBoardSize[0];
        const maxCols = this.props.matrixBoardSize[1];

        for (let row = 0; row < maxRows; row++) {
            for (let col = 0; col < maxCols; col++) {
                const inputPath = getInputPath(row, col);
                inputPaths.push(inputPath);
            }
        }

        return inputPaths;
    };

    _handleFocus: (arg1: any, arg2: any) => void = (row, col) => {
        this.props.onFocus(getInputPath(row, col));
    };

    _handleBlur: (arg1: any, arg2: any) => void = (row, col) => {
        this.props.onBlur(getInputPath(row, col));
    };

    focus: () => boolean = () => {
        this.focusInputPath(getDefaultPath());
        return true;
    };

    focusInputPath: (arg1: any) => void = (path) => {
        const inputID = getRefForPath(path);
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
        this.refs[inputID].focus();
    };

    blurInputPath: (arg1: any) => void = (path) => {
        if (path.length === 0) {
            path = getDefaultPath();
        }

        const inputID = getRefForPath(path);
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'blur' does not exist on type 'ReactInstance'.
        this.refs[inputID].blur();
    };

    getDOMNodeForPath(path: FocusPath) {
        const inputID = getRefForPath(path);
        // eslint-disable-next-line react/no-string-refs
        return ReactDOM.findDOMNode(this.refs[inputID]);
    }

    setInputValue: (arg1: any, arg2: any, arg3: any) => void = (
        inputPath,
        value,
        callback,
    ) => {
        const row = getRowFromPath(inputPath);
        const col = getColumnFromPath(inputPath);
        this.onValueChange(row, col, value, callback);
    };

    handleKeyDown: (arg1: any, arg2: any, arg3: any) => void = (
        row,
        col,
        e,
    ) => {
        const maxRow = this.props.matrixBoardSize[0];
        const maxCol = this.props.matrixBoardSize[1];
        let enterTheMatrix = null;

        // eslint-disable-next-line react/no-string-refs
        const curInput = this.refs[getRefForPath(getInputPath(row, col))];
        // @ts-expect-error - TS2339 - Property 'getStringValue' does not exist on type 'ReactInstance'.
        const curValueString = curInput.getStringValue();
        // @ts-expect-error - TS2339 - Property 'getSelectionStart' does not exist on type 'ReactInstance'.
        const cursorStartPosition = curInput.getSelectionStart();
        // @ts-expect-error - TS2339 - Property 'getSelectionEnd' does not exist on type 'ReactInstance'.
        const cursorEndPosition = curInput.getSelectionEnd();

        let nextPath = null;
        if (e.key === "ArrowUp" && row > 0) {
            // @ts-expect-error - TS2322 - Type 'readonly string[]' is not assignable to type 'null'.
            nextPath = getInputPath(row - 1, col);
        } else if (e.key === "ArrowDown" && row + 1 < maxRow) {
            // @ts-expect-error - TS2322 - Type 'readonly string[]' is not assignable to type 'null'.
            nextPath = getInputPath(row + 1, col);
        } else if (e.key === "ArrowLeft" && col > 0) {
            if (cursorStartPosition === 0 && cursorEndPosition === 0) {
                // Only go to next input if we're at the *start* of the content
                // @ts-expect-error - TS2322 - Type 'readonly string[]' is not assignable to type 'null'.
                nextPath = getInputPath(row, col - 1);
            }
        } else if (e.key === "ArrowRight" && col + 1 < maxCol) {
            if (cursorStartPosition === curValueString.length) {
                // Only go to next input if we're at the *end* of the content
                // @ts-expect-error - TS2322 - Type 'readonly string[]' is not assignable to type 'null'.
                nextPath = getInputPath(row, col + 1);
            }
        } else if (e.key === "Enter") {
            // @ts-expect-error - TS2322 - Type 'number' is not assignable to type 'null'.
            enterTheMatrix = this.state.enterTheMatrix + 1;
        } else if (e.key === "Escape") {
            // @ts-expect-error - TS2322 - Type '0' is not assignable to type 'null'.
            enterTheMatrix = 0;
        }

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (nextPath) {
            // Prevent the cursor from jumping again inside the next input
            e.preventDefault();

            // Focus the input and move the cursor to the end of it.
            // eslint-disable-next-line react/no-string-refs
            const input = this.refs[getRefForPath(nextPath)];

            // Multiply by 2 to ensure the cursor always ends up at the end;
            // Opera sometimes sees a carriage return as 2 characters.
            // @ts-expect-error - TS2339 - Property 'getStringValue' does not exist on type 'ReactInstance'.
            const inputValString = input.getStringValue();
            const valueLength = inputValString.length * 2;

            // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
            input.focus();
            if (e.key === "ArrowRight") {
                // @ts-expect-error - TS2339 - Property 'setSelectionRange' does not exist on type 'ReactInstance'.
                input.setSelectionRange(0, 0);
            } else {
                // @ts-expect-error - TS2339 - Property 'setSelectionRange' does not exist on type 'ReactInstance'.
                input.setSelectionRange(valueLength, valueLength);
            }
        }

        if (enterTheMatrix != null) {
            this.setState({
                enterTheMatrix: enterTheMatrix,
            });
        }
    };

    onValueChange: (arg1: any, arg2: any, arg3: any, arg4: any) => void = (
        row,
        column,
        value,
        cb,
    ) => {
        const answers = this.props.userInput.answers.map((answer) => [
            ...answer,
        ]);
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!answers[row]) {
            answers[row] = [];
        }
        answers[row][column] = value;
        this.props.handleUserInput(
            {
                answers,
            },
            cb,
        );
        this.props.trackInteraction();
    };

    /**
     * TODO: remove this when everything is pulling from Renderer state
     * @deprecated get user input from Renderer state
     */
    getUserInput(): PerseusMatrixUserInput {
        return this.props.userInput;
    }

    getPromptJSON(): MatrixPromptJSON {
        return _getPromptJSON(this.props, this.getUserInput());
    }

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState/restoreSerializedState
     */
    getSerializedState(): any {
        const {userInput, ...rest} = this.props;
        return {
            ...rest,
            answers: userInput.answers,
        };
    }

    render(): React.ReactNode {
        // Set the input sizes through JS so we can control the size of the
        // brackets. (If we set them in CSS we won't know values until the
        // inputs are rendered.)
        let dimensions;
        if (this.props.apiOptions.customKeypad) {
            dimensions = KEYPAD_INPUT_DIMENSIONS;
        } else {
            dimensions = NORMAL_DIMENSIONS;
        }
        const {INPUT_MARGIN, INPUT_HEIGHT, INPUT_WIDTH} = dimensions;

        const matrixSize = getMatrixSize(this.props.userInput.answers);
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
                            strings={this.context.strings}
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
                        const rowVals = this.props.userInput.answers[row];
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
                                        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
                                    } as const;

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
                                        } as const;

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
                                    } else {
                                        const updatedProps = {
                                            ...inputProps,
                                            style: StyleSheet.create({
                                                // eslint-disable-next-line react-native/no-unused-styles
                                                input: {
                                                    ...inputProps.style,
                                                    display: "inline-block",
                                                    padding: 0,
                                                    backgroundColor: outside
                                                        ? "#f3f3f3"
                                                        : "#fff",
                                                },
                                            }).input,
                                        } as const;

                                        MatrixInput = (
                                            // @ts-expect-error - TS2322 - Type '{ style: CSSProperties; className: "inside" | "outside"; ref: string; value: number | null; disabled: boolean; onFocus: () => void; onBlur: () => void; onKeyDown: (e: any) => void; onChange: (value: any, cb: any) => void; }' is not assignable to type 'Pick<Readonly<Props> & Readonly<{ children?: ReactNode; }>, "children" | "style" | "id" | "className" | "placeholder" | "onFocus" | "onBlur" | "onChange" | "onKeyDown" | "labelText">'.
                                            <TextInput {...updatedProps} />
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
                            strings={this.context.strings}
                        />
                    </div>
                )}
            </div>
        );
    }
}

function getCorrectUserInput(
    options: PerseusMatrixWidgetOptions,
): PerseusMatrixUserInput {
    return {
        answers: options.answers,
    };
}
/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState/restoreSerializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusMatrixUserInput {
    return {answers: serializedState.answers};
}

export default {
    name: "matrix",
    displayName: "Matrix",
    hidden: true,
    widget: Matrix,
    canBeStatic: true,
    isLintable: true,
    getCorrectUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof Matrix>;
