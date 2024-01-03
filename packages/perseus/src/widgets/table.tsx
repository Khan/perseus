/* eslint-disable react/sort-comp */
import {keypadElementPropType} from "@khanacademy/math-input";
import {
    linterContextProps,
    linterContextDefault,
} from "@khanacademy/perseus-linter";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import SimpleKeypadInput from "../components/simple-keypad-input";
import InteractiveUtil from "../interactive2/interactive-util";
import {ApiOptions} from "../perseus-api";
import Renderer from "../renderer";
import Util from "../util";
import KhanAnswerTypes from "../util/answer-types";

import type {WidgetExports} from "../types";

const {assert} = InteractiveUtil;

/* Input handling: Maps a (row, column) pair to a unique ref used by React,
 * and extracts (row, column) pairs from input paths, used to allow outsiders
 * to focus, blur, set input values, etc. */
const getInputPath = function (row, column) {
    return ["" + row, "" + column];
};

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

class Table extends React.Component<any> {
    static propTypes = {
        answers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
        editableHeaders: PropTypes.bool,
        // The editor to use when editableHeaders is enabled
        Editor: PropTypes.func,
        headers: PropTypes.arrayOf(PropTypes.string),
        keypadElement: keypadElementPropType,
        trackInteraction: PropTypes.func.isRequired,
        linterContext: linterContextProps,
    };

    static defaultProps: any = (function () {
        const defaultRows = 4;
        const defaultColumns = 1;
        const blankAnswers = _(defaultRows).times(function () {
            return Util.stringArrayOfSize(defaultColumns);
        });
        return {
            apiOptions: ApiOptions.defaults,
            headers: [""],
            editableHeaders: false,
            rows: defaultRows,
            columns: defaultColumns,
            answers: blankAnswers,
            linterContext: linterContextDefault,
        };
    })();

    _getRows: () => number = () => {
        return this.props.answers.length;
    };

    _getColumns: () => number = () => {
        return this.props.answers[0].length;
    };

    render(): React.ReactNode {
        const rows = this._getRows();
        const columns = this._getColumns();
        const headers = this.props.headers;

        let InputComponent;
        let inputStyle;
        const extraInputProps: Record<string, any> = {};
        if (this.props.apiOptions.customKeypad) {
            InputComponent = SimpleKeypadInput;
            // NOTE(charlie): This is intended to match the "width: 80px" in
            // input in table.less. Those values should be kept in-sync.
            inputStyle = {width: 80};
            extraInputProps.keypadElement = this.props.keypadElement;
        } else {
            InputComponent = "input";
            inputStyle = {};
        }

        return (
            <table className="perseus-widget-table-of-values non-markdown">
                <thead>
                    <tr>
                        {_.map(headers, (header, i) => {
                            if (this.props.editableHeaders) {
                                return (
                                    <th key={i}>
                                        <this.props.Editor
                                            ref={"columnHeader" + i}
                                            apiOptions={this.props.apiOptions}
                                            content={header}
                                            widgetEnabled={false}
                                            onChange={_.partial(
                                                this.onHeaderChange,
                                                i,
                                            )}
                                        />
                                    </th>
                                );
                            }
                            return (
                                <th key={i}>
                                    <Renderer
                                        content={header}
                                        linterContext={this.props.linterContext}
                                    />
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {_(rows).times((r) => {
                        return (
                            <tr key={r}>
                                {_(columns).times((c) => {
                                    return (
                                        <td key={c}>
                                            <InputComponent
                                                ref={getRefForPath(
                                                    getInputPath(r, c),
                                                )}
                                                type="text"
                                                value={this.props.answers[r][c]}
                                                disabled={
                                                    this.props.apiOptions
                                                        .readOnly
                                                }
                                                onFocus={_.partial(
                                                    this._handleFocus,
                                                    getInputPath(r, c),
                                                )}
                                                onBlur={_.partial(
                                                    this._handleBlur,
                                                    getInputPath(r, c),
                                                )}
                                                onChange={_.partial(
                                                    this.onValueChange,
                                                    r,
                                                    c,
                                                )}
                                                style={inputStyle}
                                                {...extraInputProps}
                                            />
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }

    getUserInput: () => any = () => {
        return _.map(this.props.answers, _.clone);
    };

    onValueChange: (arg1: any, arg2: any, arg3: any) => void = (
        row,
        column,
        eventOrValue,
    ) => {
        const answers = _.map(this.props.answers, _.clone);

        // If this is coming from an "input", the last argument will be an
        // event. If it's coming from a SimpleKeypadInput, it'll be the value.
        // @ts-expect-error - TS2571 - Object is of type 'unknown'.
        answers[row][column] = eventOrValue.target
            ? eventOrValue.target.value
            : eventOrValue;

        this.props.onChange({
            answers: answers,
        });
        this.props.trackInteraction();
    };

    onHeaderChange: (arg1: number, arg2: any) => void = (index, e) => {
        const headers = this.props.headers.slice();
        headers[index] = e.content;
        this.props.onChange({
            headers: headers,
        });
    };

    simpleValidate: (arg1: any) => any = (rubric) => {
        // @ts-expect-error - TS2339 - Property 'validate' does not exist on type 'typeof Table'.
        return Table.validate(this.getUserInput(), rubric);
    };

    _handleFocus: (arg1: any) => void = (inputPath) => {
        this.props.onFocus(inputPath);
    };

    _handleBlur: (arg1: any) => void = (inputPath) => {
        this.props.onBlur(inputPath);
    };

    focus: () => boolean = () => {
        this.focusInputPath(getDefaultPath());
        return true;
    };

    focusInputPath: (arg1: any) => void = (path) => {
        const inputID = getRefForPath(path);
        // eslint-disable-next-line react/no-string-refs
        const inputComponent = this.refs[inputID];
        if (this.props.apiOptions.customKeypad) {
            // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
            inputComponent.focus();
        } else {
            // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'focus' does not exist on type 'Element | Text'.
            ReactDOM.findDOMNode(inputComponent).focus();
        }
    };

    blurInputPath: (arg1: any) => void = (path) => {
        const inputID = getRefForPath(path);
        // eslint-disable-next-line react/no-string-refs
        const inputComponent = this.refs[inputID];
        if (this.props.apiOptions.customKeypad) {
            // @ts-expect-error - TS2339 - Property 'blur' does not exist on type 'ReactInstance'.
            inputComponent.blur();
        } else {
            // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'blur' does not exist on type 'Element | Text'.
            ReactDOM.findDOMNode(inputComponent).blur();
        }
    };

    getDOMNodeForPath: (arg1: any) => Text | Element | null | undefined = (
        path,
    ) => {
        const inputID = getRefForPath(path);
        // eslint-disable-next-line react/no-string-refs
        return ReactDOM.findDOMNode(this.refs[inputID]);
    };

    getInputPaths: () => ReadonlyArray<ReadonlyArray<string>> = () => {
        const rows = this._getRows();
        const columns = this._getColumns();
        const inputPaths: Array<Array<string>> = [];
        _(rows).times((r) => {
            _(columns).times((c) => {
                const inputPath = getInputPath(r, c);
                inputPaths.push(inputPath);
            });
        });
        return inputPaths;
    };

    getGrammarTypeForPath: (arg1: any) => string = (inputPath) => {
        return "number";
    };

    setInputValue: (arg1: any, arg2: any, arg3: any) => void = (
        path,
        newValue,
        cb,
    ) => {
        // Extract row, column information
        const row = getRowFromPath(path);
        const column = getColumnFromPath(path);

        const answers = _.map(this.props.answers, _.clone);
        // @ts-expect-error - TS2571 - Object is of type 'unknown'.
        answers[row][column] = newValue;
        this.props.onChange(
            {
                answers: answers,
            },
            cb,
        );
    };
}

_.extend(Table, {
    validate: function (state, rubric) {
        const filterNonEmpty = function (table: any) {
            return _.filter(table, function (row) {
                // Check if row has a cell that is nonempty
                return _.some(row, _.identity);
            });
        };
        const solution = filterNonEmpty(rubric.answers);
        const supplied = filterNonEmpty(state);
        const hasEmptyCell = _.some(supplied, function (row) {
            return _.some(row, function (cell) {
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
        const createValidator =
            KhanAnswerTypes.number.createValidatorFunctional;
        let message = null;
        const allCorrect = _.every(solution, function (rowSolution) {
            let i;
            for (i = 0; i < supplied.length; i++) {
                const rowSupplied = supplied[i];
                const correct = _.every(
                    rowSupplied,
                    function (cellSupplied, i) {
                        const cellSolution = rowSolution[i];
                        const validator = createValidator(cellSolution, {
                            simplify: true,
                        });
                        const result = validator(cellSupplied);
                        if (result.message) {
                            // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'null'.
                            message = result.message;
                        }
                        return result.correct;
                    },
                );
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

const propTransform: (arg1: any) => any = (editorProps) => {
    // Remove answers before passing to widget
    const rows = editorProps.answers.length;
    const columns = editorProps.answers[0].length;
    const blankAnswers = _(rows).times(function () {
        return Util.stringArrayOfSize(columns);
    });
    return _.extend({}, editorProps, {
        answers: blankAnswers,
    });
};

export default {
    name: "table",
    displayName: "Table (deprecated - use markdown table instead)",
    accessible: true,
    widget: Table,
    transform: propTransform,
    hidden: true,
    isLintable: true,
} as WidgetExports<typeof Table>;
