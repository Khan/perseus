import React, {forwardRef, useImperativeHandle, useRef} from "react";
import ReactDOM from "react-dom";
import invariant from "tiny-invariant";

import {usePerseusI18n} from "../../components/i18n-context";
import SimpleKeypadInput from "../../components/simple-keypad-input";
import Renderer from "../../renderer";
import Util from "../../util";

import type {FocusPath, Widget, WidgetExports, WidgetProps} from "../../types";
import type {
    PerseusTableWidgetOptions,
    PerseusTableUserInput,
} from "@khanacademy/perseus-core";

type EditorProps = {
    editableHeaders?: boolean;
    Editor: any;
    onChange: (value: {headers: string[]}) => void;
};

type Props = WidgetProps<PerseusTableWidgetOptions, PerseusTableUserInput> &
    EditorProps;

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

function getRowFromPath(path: FocusPath): number {
    invariant(
        Array.isArray(path) && path.length === 2,
        "path should be a (row, colum) pair",
    );
    return +path[0];
}

function getColumnFromPath(path: FocusPath): number {
    invariant(
        Array.isArray(path) && path.length === 2,
        "path should be a (row, colum) pair",
    );
    return +path[1];
}

function getRefForPath(path: FocusPath): string {
    const row = getRowFromPath(path);
    const column = getColumnFromPath(path);
    return "answer" + row + "," + column;
}

// A cell is either a plain <input> or, on mobile, a SimpleKeypadInput. Both
// answer to focus() and blur().
type Cell = HTMLInputElement | SimpleKeypadInput;

const Table = forwardRef<Widget, Props>(function Table(props, ref) {
    const {strings} = usePerseusI18n();
    const {
        apiOptions,
        headers,
        userInput,
        keypadElement,
        linterContext,
        editableHeaders,
        Editor,
        onChange,
        onFocus,
        onBlur,
        handleUserInput,
        trackInteraction,
    } = props;

    const cellRefs = useRef(new Map<string, Cell>());

    useImperativeHandle(ref, () => ({
        focus: (): boolean => {
            cellRefs.current.get(getRefForPath(getDefaultPath()))?.focus();
            return true;
        },
        focusInputPath: (path: FocusPath): void => {
            cellRefs.current.get(getRefForPath(path))?.focus();
        },
        blurInputPath: (path: FocusPath): void => {
            cellRefs.current.get(getRefForPath(path))?.blur();
        },
        getDOMNodeForPath: (
            path: FocusPath,
        ): ReturnType<typeof ReactDOM.findDOMNode> => {
            const cell = cellRefs.current.get(getRefForPath(path));
            if (cell instanceof HTMLInputElement) {
                return cell;
            }
            // A SimpleKeypadInput isn't a DOM node, so we have to ask React
            // which node it rendered.
            return ReactDOM.findDOMNode(cell ?? null);
        },
        getInputPaths: (): string[][] =>
            userInput.flatMap((rowArr, r) =>
                rowArr.map((_, c) => getInputPath(r, c)),
            ),
        /**
         * @deprecated and likely very broken API
         * [LEMS-3185] do not trust serializedState
         */
        getSerializedState: (): any => {
            const {userInput, editableHeaders, ...rest} = props;
            return {
                ...rest,
                answers: userInput,
            };
        },
    }));

    function handleValueChange(
        row: number,
        column: number,
        eventOrValue: any,
    ): void {
        const answers: PerseusTableUserInput = JSON.parse(
            JSON.stringify(userInput),
        );

        // If this is coming from an "input", the last argument will be an
        // event. If it's coming from a SimpleKeypadInput, it'll be the value.
        answers[row][column] = eventOrValue.target
            ? eventOrValue.target.value
            : eventOrValue;

        handleUserInput(answers);
        trackInteraction();
    }

    // this is for the editing experience
    function handleHeaderChange(index: number, e: any): void {
        const newHeaders = headers.slice();
        newHeaders[index] = e.content;
        onChange({headers: newHeaders});
    }

    let InputComponent;
    let inputStyle;
    const extraInputProps: Record<string, any> = {};
    if (apiOptions.customKeypad) {
        InputComponent = SimpleKeypadInput;
        // NOTE(charlie): This is intended to match the "width: 80px" in
        // input in table.css. Those values should be kept in-sync.
        inputStyle = {width: 80};
        extraInputProps.keypadElement = keypadElement;
    } else {
        InputComponent = "input";
        inputStyle = {};
    }

    return (
        <table className="perseus-widget-table-of-values non-markdown">
            <thead>
                <tr>
                    {headers.map((header, i) => {
                        if (editableHeaders) {
                            return (
                                <th key={i}>
                                    <Editor
                                        apiOptions={apiOptions}
                                        content={header}
                                        widgetEnabled={false}
                                        onChange={(e) =>
                                            handleHeaderChange(i, e)
                                        }
                                    />
                                </th>
                            );
                        }
                        return (
                            <th key={i}>
                                <Renderer
                                    content={header}
                                    linterContext={linterContext}
                                    strings={strings}
                                />
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {userInput.map((rowArr, r) => {
                    return (
                        <tr key={r}>
                            {rowArr.map((answer, c) => {
                                const refKey = getRefForPath(
                                    getInputPath(r, c),
                                );
                                return (
                                    <td key={c}>
                                        <InputComponent
                                            ref={(cell: Cell | null) => {
                                                if (cell) {
                                                    cellRefs.current.set(
                                                        refKey,
                                                        cell,
                                                    );
                                                } else {
                                                    cellRefs.current.delete(
                                                        refKey,
                                                    );
                                                }
                                            }}
                                            type="text"
                                            value={answer}
                                            disabled={apiOptions.readOnly}
                                            onFocus={() =>
                                                onFocus(getInputPath(r, c))
                                            }
                                            onBlur={() =>
                                                onBlur(getInputPath(r, c))
                                            }
                                            onChange={(e) =>
                                                handleValueChange(r, c, e)
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
});

function getStartUserInput(
    options: PerseusTableWidgetOptions,
): PerseusTableUserInput {
    // Remove answers before passing to widget
    const rows = options.rows;
    const columns = options.columns;
    return Util.stringArrayOfSize2D({rows, columns});
}

// TODO(LEMS-3185): remove serializedState
/**
 * @deprecated - do not use in new code.
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusTableUserInput {
    return serializedState.answers;
}

export default {
    name: "table",
    displayName: "Table (deprecated - use markdown table instead)",
    widget: Table,
    hidden: true,
    isLintable: true,
    getStartUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof Table>;
