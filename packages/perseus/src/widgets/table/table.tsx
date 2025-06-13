import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as React from "react";
import ReactDOM from "react-dom";

import {PerseusI18nContext} from "../../components/i18n-context";
import SimpleKeypadInput from "../../components/simple-keypad-input";
import InteractiveUtil from "../../interactive2/interactive-util";
import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import Util from "../../util";

import type {ChangeableProps} from "../../mixins/changeable";
import type {FocusPath, Widget, WidgetExports, WidgetProps} from "../../types";
import type {
    PerseusTableWidgetOptions,
    PerseusTableUserInput,
} from "@khanacademy/perseus-core";

const {assert} = InteractiveUtil;

type EditorProps = {
    editableHeaders: boolean;
    Editor: any;
};

type RenderProps = PerseusTableWidgetOptions & EditorProps;

type Props = WidgetProps<PerseusTableWidgetOptions, PerseusTableUserInput> &
    ChangeableProps &
    EditorProps;

type DefaultProps = {
    apiOptions: Props["apiOptions"];
    headers: Props["headers"];
    editableHeaders: Props["editableHeaders"];
    rows: Props["rows"];
    columns: Props["columns"];
    answers: Props["answers"];
    linterContext: Props["linterContext"];
};

// A version of FocusPath that's specific to Table
type Path = [row: string, column: string];

/* Input handling: Maps a (row, column) pair to a unique ref used by React,
 * and extracts (row, column) pairs from input paths, used to allow outsiders
 * to focus, blur, set input values, etc. */
function getInputPath(row: number, column: number): Path {
    return ["" + row, "" + column];
}

function getDefaultPath(): Path {
    return getInputPath(0, 0);
}

function getRowFromPath(path: Path): number {
    // 'path' should be a (row, column) pair
    assert(Array.isArray(path) && path.length === 2);
    return +path[0];
}

function getColumnFromPath(path: Path): number {
    // 'path' should be a (row, column) pair
    assert(Array.isArray(path) && path.length === 2);
    return +path[1];
}

function getRefForPath(path: Path): string {
    const row = getRowFromPath(path);
    const column = getColumnFromPath(path);
    return "answer" + row + "," + column;
}

class Table extends React.Component<Props> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;
    headerRefs: Record<string, any> = {};
    answerRefs: Record<string, any> = {};

    static defaultProps: DefaultProps = (function () {
        const defaultRows = 4;
        const defaultColumns = 1;
        const blankAnswers = Util.stringArrayOfSize2D({
            rows: defaultRows,
            columns: defaultColumns,
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

    _getRows(): number {
        return this.props.answers.length;
    }

    _getColumns(): number {
        return this.props.answers[0].length;
    }

    _getAnswersClone(): PerseusTableUserInput {
        return JSON.parse(
            JSON.stringify(this.props.answers),
        ) as PerseusTableUserInput;
    }

    getUserInput(): PerseusTableUserInput {
        return this._getAnswersClone();
    }

    onValueChange(row: number, column: number, eventOrValue: any): void {
        const answers = this._getAnswersClone();

        // If this is coming from an "input", the last argument will be an
        // event. If it's coming from a SimpleKeypadInput, it'll be the value.
        answers[row][column] = eventOrValue.target
            ? eventOrValue.target.value
            : eventOrValue;

        this.props.onChange({
            answers: answers,
        });
        this.props.trackInteraction();
    }

    onHeaderChange(index: number, e: any): void {
        const headers = this.props.headers.slice();
        headers[index] = e.content;
        this.props.onChange({
            headers: headers,
        });
    }

    _handleFocus(inputPath: any): void {
        this.props.onFocus(inputPath);
    }

    _handleBlur(inputPath: any): void {
        this.props.onBlur(inputPath);
    }

    focus(): boolean {
        this.focusInputPath(getDefaultPath());
        return true;
    }

    focusInputPath(path: FocusPath): void {
        const inputID = getRefForPath(path as Path);
        const inputComponent = this.answerRefs[inputID];
        if (this.props.apiOptions.customKeypad) {
            inputComponent.focus();
        } else {
            // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'focus' does not exist on type 'Element | Text'.
            ReactDOM.findDOMNode(inputComponent).focus();
        }
    }

    blurInputPath(path: FocusPath): void {
        const inputID = getRefForPath(path as Path);
        const inputComponent = this.answerRefs[inputID];
        if (this.props.apiOptions.customKeypad) {
            inputComponent.blur();
        } else {
            // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'blur' does not exist on type 'Element | Text'.
            ReactDOM.findDOMNode(inputComponent).blur();
        }
    }

    getDOMNodeForPath(
        path: FocusPath,
    ): ReturnType<typeof ReactDOM.findDOMNode> {
        const inputID = getRefForPath(path as Path);
        const inputRef = this.answerRefs[inputID];
        return ReactDOM.findDOMNode(inputRef);
    }

    getInputPaths(): string[][] {
        const rows = this._getRows();
        const columns = this._getColumns();
        const inputPaths: Array<Array<string>> = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                const inputPath = getInputPath(r, c);
                inputPaths.push(inputPath);
            }
        }
        return inputPaths;
    }

    setInputValue(path: FocusPath, newValue: string, cb: any): void {
        // Extract row, column information
        const typedPath = path as Path;
        const row = getRowFromPath(typedPath);
        const column = getColumnFromPath(typedPath);

        const answers = this._getAnswersClone();
        answers[row][column] = newValue;
        this.props.onChange(
            {
                answers: answers,
            },
            cb,
        );
    }

    render(): React.ReactNode {
        const headers = this.props.headers;

        let InputComponent;
        let inputStyle;
        const extraInputProps: Record<string, any> = {};
        if (this.props.apiOptions.customKeypad) {
            InputComponent = SimpleKeypadInput;
            // NOTE(charlie): This is intended to match the "width: 80px" in
            // input in table.css. Those values should be kept in-sync.
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
                        {headers.map((header, i) => {
                            if (this.props.editableHeaders) {
                                return (
                                    <th key={i}>
                                        <this.props.Editor
                                            ref={(ref) => {
                                                this.headerRefs[
                                                    "columnHeader" + i
                                                ] = ref;
                                            }}
                                            apiOptions={this.props.apiOptions}
                                            content={header}
                                            widgetEnabled={false}
                                            onChange={(e) =>
                                                this.onHeaderChange(i, e)
                                            }
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
                    {this.props.answers.map((rowArr, r) => {
                        return (
                            <tr key={r}>
                                {rowArr.map((answer, c) => {
                                    return (
                                        <td key={c}>
                                            <InputComponent
                                                ref={(ref) => {
                                                    this.answerRefs[
                                                        getRefForPath(
                                                            getInputPath(r, c),
                                                        )
                                                    ] = ref;
                                                }}
                                                type="text"
                                                value={answer}
                                                disabled={
                                                    this.props.apiOptions
                                                        .readOnly
                                                }
                                                onFocus={() =>
                                                    this._handleFocus(
                                                        getInputPath(r, c),
                                                    )
                                                }
                                                onBlur={() =>
                                                    this._handleBlur(
                                                        getInputPath(r, c),
                                                    )
                                                }
                                                onChange={(e) =>
                                                    this.onValueChange(r, c, e)
                                                }
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

function propTransform(options: Props): RenderProps {
    // Remove answers before passing to widget
    const rows = options.rows;
    const columns = options.columns;
    const blankAnswers = Util.stringArrayOfSize2D({rows, columns});
    return {
        ...options,
        answers: blankAnswers,
    };
}

export default {
    name: "table",
    displayName: "Table (deprecated - use markdown table instead)",
    widget: Table,
    transform: propTransform,
    hidden: true,
    isLintable: true,
} satisfies WidgetExports<typeof Table>;
