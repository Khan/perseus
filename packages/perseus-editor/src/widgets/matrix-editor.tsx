/* eslint-disable react/sort-comp */
import {
    components,
    Changeable,
    EditorJsonify,
    MatrixWidget,
} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import Editor from "../editor";

const {RangeInput} = components;
const Matrix = MatrixWidget.widget;

// Really large matrices will cause issues with question formatting, so we
// have to cap it at some point.
const MAX_BOARD_SIZE = 6;

const getMatrixSize = function (matrix: any) {
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

type Props = any;

class MatrixEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
        matrixBoardSize: PropTypes.arrayOf(PropTypes.number).isRequired,
        answers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
        prefix: PropTypes.string,
        suffix: PropTypes.string,
        cursorPosition: PropTypes.arrayOf(PropTypes.number),
    };

    static widgetName = "matrix" as const;

    static defaultProps: Props = {
        matrixBoardSize: [3, 3],
        answers: [[]],
        prefix: "",
        suffix: "",
        cursorPosition: [0, 0],
    };

    render(): React.ReactNode {
        const matrixProps = _.extend(
            {
                numericInput: true,
                onBlur: () => {},
                onFocus: () => {},
                trackInteraction: () => {},
            },
            this.props,
        );
        return (
            <div className="perseus-matrix-editor">
                <div className="perseus-widget-row">
                    {" "}
                    Max matrix size:{" "}
                    <RangeInput
                        value={this.props.matrixBoardSize}
                        onChange={this.onMatrixBoardSizeChange}
                        format={this.props.labelStyle}
                        useArrowKeys={true}
                    />
                </div>
                <div className="perseus-widget-row">
                    <Matrix {...matrixProps} />
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
                            // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
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
                            // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                            this.change({suffix: newProps.content});
                        }}
                    />
                </div>
            </div>
        );
    }

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
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
}

export default MatrixEditor;
