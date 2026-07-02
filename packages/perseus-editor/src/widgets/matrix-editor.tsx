import {
    components,
    Changeable,
    EditorJsonify,
    MatrixWidget,
} from "@khanacademy/perseus";
import {getMatrixSize, matrixLogic} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import Editor from "../editor";

import type {APIOptions} from "@khanacademy/perseus";
import type {
    MatrixDefaultWidgetOptions,
    MathFormat,
    PerseusMatrixWidgetOptions,
} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

const {RangeInput} = components;
const Matrix = MatrixWidget.widget;

// Really large matrices will cause issues with question formatting, so we
// have to cap it at some point.
const MAX_BOARD_SIZE = 6;

type Props = {
    matrixBoardSize: ReadonlyArray<number>;
    answers: Array<Array<number>>;
    prefix: string;
    suffix: string;
    cursorPosition: ReadonlyArray<number>;
    apiOptions?: APIOptions;
    labelStyle?: string;
    onChange: (partial: Partial<PerseusMatrixWidgetOptions>) => void;
};

class MatrixEditor extends React.Component<Props> {
    static widgetName = "matrix" as const;

    static defaultProps: MatrixDefaultWidgetOptions =
        matrixLogic.defaultWidgetOptions;

    change: (arg1: any, arg2?: any, arg3?: any) => any = (...args) => {
        if (this.props.apiOptions?.editingDisabled) {
            return;
        }
        return Changeable.change.apply(this, args);
    };

    onMatrixBoardSizeChange: (arg1: [number, number]) => void = (range) => {
        const answers = this.props.answers ?? [];
        const matrixSize = getMatrixSize(answers);
        if (range[0] !== null && range[1] !== null) {
            range = [
                Math.round(Math.min(Math.max(range[0], 1), MAX_BOARD_SIZE)),
                Math.round(Math.min(Math.max(range[1], 1), MAX_BOARD_SIZE)),
            ];
            const newAnswers = _(Math.min(range[0], matrixSize[0])).times(
                (row) => {
                    return _(Math.min(range[1], matrixSize[1])).times((col) => {
                        return answers[row][col];
                    });
                },
            );
            this.props.onChange({
                matrixBoardSize: range,
                answers: newAnswers,
            });
        }
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        const matrixProps: Partial<PropsFor<typeof Matrix>> = {
            onBlur: () => {},
            onFocus: () => {},
            trackInteraction: () => {},
            userInput: {answers: (this.props.answers ?? []) as any}, // eslint-disable-line no-restricted-syntax
            handleUserInput: (userInput) => {
                this.change({answers: userInput.answers});
            },
            ...(this.props as any), // eslint-disable-line no-restricted-syntax
        };

        return (
            <div className="perseus-matrix-editor">
                <div className="perseus-widget-row">
                    {" "}
                    Max matrix size:{" "}
                    <RangeInput
                        value={this.props.matrixBoardSize}
                        onChange={this.onMatrixBoardSizeChange}
                        // eslint-disable-next-line no-restricted-syntax
                        format={this.props.labelStyle as MathFormat | undefined}
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
                        // eslint-disable-next-line react/no-string-refs
                        ref="prefix"
                        apiOptions={this.props.apiOptions}
                        content={this.props.prefix}
                        widgetEnabled={false}
                        onChange={(newProps) => {
                            this.change({prefix: newProps.content});
                        }}
                    />
                </div>
                <div className="perseus-widget-row">
                    {" "}
                    Matrix suffix:{" "}
                    <Editor
                        // eslint-disable-next-line react/no-string-refs
                        ref="suffix"
                        apiOptions={this.props.apiOptions}
                        content={this.props.suffix}
                        widgetEnabled={false}
                        onChange={(newProps) => {
                            this.change({suffix: newProps.content});
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default MatrixEditor;
