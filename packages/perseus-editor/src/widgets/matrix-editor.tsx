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

import type {APIOptionsWithDefaults} from "@khanacademy/perseus";
import type {
    MatrixDefaultWidgetOptions,
    PerseusMatrixUserInput,
} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

const {RangeInput} = components;
const Matrix = MatrixWidget.widget;

// Really large matrices will cause issues with question formatting, so we
// have to cap it at some point.
const MAX_BOARD_SIZE = 6;

type Props = MatrixDefaultWidgetOptions & {
    apiOptions: APIOptionsWithDefaults;
} & Changeable.ChangeableProps;

class MatrixEditor extends React.Component<Props> {
    static widgetName = "matrix" as const;

    static defaultProps: MatrixDefaultWidgetOptions =
        matrixLogic.defaultWidgetOptions;

    change: (arg1: any, arg2?: any, arg3?: any) => any = (...args) => {
        if (this.props.apiOptions.editingDisabled) {
            return;
        }
        return Changeable.change.apply(this, args);
    };

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
            this.props.onChange({
                matrixBoardSize: range,
                answers: answers,
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
            // The widget's user input is string[][] (what a learner types),
            // while the editor's `answers` option is number[][]. We feed the
            // correct answers in as user input to render the preview, so this
            // mismatch is intentional and pre-existing.
            userInput: {
                // eslint-disable-next-line no-restricted-syntax -- the two types are genuinely incompatible; a cast is the only way to preserve the existing runtime behavior.
                answers: this.props
                    .answers as unknown as PerseusMatrixUserInput["answers"],
            },
            handleUserInput: (userInput) => {
                this.change({answers: userInput.answers});
            },
            ...this.props,
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
