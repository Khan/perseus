import {components, MatrixWidget} from "@khanacademy/perseus";
import {getMatrixSize, matrixLogic} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import Editor from "../../editor";
import EditorJsonify from "../../mixins/editor-jsonify";

import type {WidgetEditorRefHandle} from "../types";
import type {APIOptionsWithDefaults} from "@khanacademy/perseus";
import type {PerseusMatrixWidgetOptions} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

const {RangeInput} = components;
const Matrix = MatrixWidget.widget;

// Really large matrices will cause issues with question formatting, so we
// have to cap it at some point.
const MAX_BOARD_SIZE = 6;

interface Props extends PerseusMatrixWidgetOptions {
    apiOptions: APIOptionsWithDefaults;
    onChange: (options: PerseusMatrixWidgetOptions) => void;
}

class MatrixEditor
    extends React.Component<Props>
    implements WidgetEditorRefHandle
{
    static defaultProps: PerseusMatrixWidgetOptions =
        matrixLogic.defaultWidgetOptions;

    handleChange(changes: Partial<PerseusMatrixWidgetOptions>) {
        if (this.props.apiOptions.editingDisabled) {
            return;
        }
        this.props.onChange({
            prefix: this.props.prefix,
            suffix: this.props.suffix,
            answers: this.props.answers,
            matrixBoardSize: this.props.matrixBoardSize,
            ...changes,
        });
    }

    onMatrixBoardSizeChange: (arg1: [number, number]) => void = (range) => {
        const matrixSize = getMatrixSize(this.props.answers);
        if (range[0] !== null && range[1] !== null) {
            range = [
                Math.round(Math.min(Math.max(range[0], 1), MAX_BOARD_SIZE)),
                Math.round(Math.min(Math.max(range[1], 1), MAX_BOARD_SIZE)),
            ];
            const answers = _(Math.min(range[0], matrixSize[0])).times(
                (row) => {
                    return _(Math.min(range[1], matrixSize[1])).times((col) => {
                        return this.props.answers[row][col];
                    });
                },
            );
            this.handleChange({
                matrixBoardSize: range,
                answers: answers,
            });
        }
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        const {matrixBoardSize, prefix, suffix, answers} = this.props;
        const matrixProps: Partial<PropsFor<typeof Matrix>> = {
            onBlur: () => {},
            onFocus: () => {},
            trackInteraction: () => {},
            // The widget renders learner input, which is string[][], while the
            // editor stores the correct answers as number[][]. We show the
            // answers in the preview, so they have to be stringified.
            userInput: {
                answers: answers.map((row) => row.map(stringifyCell)),
            },
            handleUserInput: (userInput) => {
                this.handleChange({
                    answers: userInput.answers.map((row) =>
                        row.map(parseFloat),
                    ),
                });
            },
            ...this.props,
            options: {
                matrixBoardSize,
                prefix,
                suffix,
            },
        };

        return (
            <div className="perseus-matrix-editor">
                <div className="perseus-widget-row">
                    {" "}
                    Max matrix size:{" "}
                    <RangeInput
                        value={this.props.matrixBoardSize}
                        onChange={this.onMatrixBoardSizeChange}
                        useArrowKeys={true}
                    />
                </div>
                <div className="perseus-widget-row">
                    {/* eslint-disable-next-line no-restricted-syntax */}
                    <Matrix {...(matrixProps as PropsFor<typeof Matrix>)} />
                </div>
                <div className="perseus-widget-row">
                    {" "}
                    Matrix prefix:{" "}
                    <Editor
                        ref="prefix"
                        apiOptions={this.props.apiOptions}
                        content={this.props.prefix}
                        widgetEnabled={false}
                        onChange={(newProps) => {
                            this.handleChange({prefix: newProps.content});
                        }}
                    />
                </div>
                <div className="perseus-widget-row">
                    {" "}
                    Matrix suffix:{" "}
                    <Editor
                        ref="suffix"
                        apiOptions={this.props.apiOptions}
                        content={this.props.suffix}
                        widgetEnabled={false}
                        onChange={(newProps) => {
                            this.handleChange({suffix: newProps.content});
                        }}
                    />
                </div>
            </div>
        );
    }
}

function stringifyCell(value: number | null | undefined): string {
    // Empty cells (from a sparse row like `[, , 5]`), Infinity, and NaN all
    // get converted to null when Perseus data is JSON-stringified. These
    // values need to stay empty cells rather than becoming the text "null".
    // `Number.isFinite()` is false for null, undefined, NaN, and Infinity, so
    // it covers all the cases.
    if (Number.isFinite(value)) {
        return String(value);
    }
    return "";
}

export default MatrixEditor;
