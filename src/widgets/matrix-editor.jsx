/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require("react");
const _ = require("underscore");

const Changeable = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const Editor = require("../editor.jsx");
const RangeInput = require("../components/range-input.jsx");

const Matrix = require("./matrix.jsx").widget;

// Really large matrices will cause issues with question formatting, so we
// have to cap it at some point.
const MAX_BOARD_SIZE = 6;

const getMatrixSize = function(matrix) {
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

const MatrixEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        answers: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(
                React.PropTypes.number
            )
        ),
        cursorPosition: React.PropTypes.arrayOf(
            React.PropTypes.number
        ),
        labelStyle: React.PropTypes.string,
        matrixBoardSize: React.PropTypes.arrayOf(
            React.PropTypes.number
        ).isRequired,
        onChange: React.PropTypes.func.isRequired,
        prefix: React.PropTypes.string,
        suffix: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            answers: [[]],
            cursorPosition: [0, 0],
            matrixBoardSize: [3, 3],
            prefix: "",
            suffix: "",
        };
    },

    render: function() {
        const matrixProps = _.extend({
            numericInput: true,
            onBlur: () => {},
            onFocus: () => {},
            trackInteraction: () => {},
        }, this.props);
        return <div className="perseus-matrix-editor">
            <div className="perseus-widget-row">
                {" "}Max matrix size:{" "}
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
                {" "}Matrix prefix:{" "}
                <Editor
                    ref={"prefix"}
                    content={this.props.prefix}
                    widgetEnabled={false}
                    onChange={(newProps) => {
                        this.change({ prefix: newProps.content });
                    }}
                />
            </div>
            <div className="perseus-widget-row">
                {" "}Matrix suffix:{" "}
                <Editor
                    ref={"suffix"}
                    content={this.props.suffix}
                    widgetEnabled={false}
                    onChange={(newProps) => {
                        this.change({ suffix: newProps.content });
                    }}
                />
            </div>
        </div>;
    },

    onMatrixBoardSizeChange: function(range) {
        const matrixSize = getMatrixSize(this.props.answers);
        if (range[0] !== null && range[1] !== null) {
            range = [
                Math.round(Math.min(Math.max(range[0], 1), MAX_BOARD_SIZE)),
                Math.round(Math.min(Math.max(range[1], 1), MAX_BOARD_SIZE)),
            ];
            const answers = _(Math.min(range[0], matrixSize[0])).times(row => {
                return _(Math.min(range[1], matrixSize[1])).times(col => {
                    return this.props.answers[row][col];
                });
            });
            this.props.onChange({
                matrixBoardSize: range,
                answers: answers,
            });
        }
    },
});

module.exports = MatrixEditor;
