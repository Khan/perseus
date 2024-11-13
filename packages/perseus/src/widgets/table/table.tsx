import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import SimpleKeypadInput from "../../components/simple-keypad-input";
import InteractiveUtil from "../../interactive2/interactive-util";
import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import Util from "../../util";

import scoreTable from "./score-table";

import type {ChangeableProps} from "../../mixins/changeable";
import type {PerseusTableWidgetOptions} from "../../perseus-types";
import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {
    PerseusTableRubric,
    PerseusTableUserInput,
} from "../../validation.types";

const {assert} = InteractiveUtil;

type RenderProps = PerseusTableWidgetOptions & {
    editableHeaders: boolean;
    Editor: any;
};

type Props = ChangeableProps & WidgetProps<RenderProps, PerseusTableRubric>;

type DefaultProps = {
    apiOptions: Props["apiOptions"];
    headers: Props["headers"];
    editableHeaders: Props["editableHeaders"];
    rows: Props["rows"];
    columns: Props["columns"];
    answers: Props["answers"];
    linterContext: Props["linterContext"];
};

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

class Table extends React.Component<Props> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = (function () {
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

    getUserInput(): PerseusTableUserInput {
        return _.map(this.props.answers, _.clone) as PerseusTableUserInput;
    }

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

    getDOMNodeForPath(path) {
        const inputID = getRefForPath(path);
        // eslint-disable-next-line react/no-string-refs
        return ReactDOM.findDOMNode(this.refs[inputID]);
    }

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
                                        strings={this.context.strings}
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
}

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
    scorer: scoreTable,
} satisfies WidgetExports<typeof Table>;
