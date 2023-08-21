/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/sort-comp */
import {components, Changeable, EditorJsonify} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

const {InfoTip, NumberInput, PropCheckBox} = components;

const MAX_SIZE = 8;

// styling
const CELL_PADDING = 5;

const TABLE_STYLE = {
    display: "table",
    tableLayout: "fixed",
} as const;

const ROW_STYLE = {
    display: "table-row",
} as const;

const CELL_STYLE = {
    display: "table-cell",
    padding: CELL_PADDING,
} as const;

const BASE_TILE_STYLE = {
    borderRadius: 10,
    cursor: "pointer",
} as const;

const PATTERNS = {
    plus: () => [
        [false, true, false],
        [true, true, true],
        [false, true, false],
    ],
    x: () => [
        [true, false, true],
        [false, true, false],
        [true, false, true],
    ],
    "plus/x": (iter) => {
        return iter % 2 ? PATTERNS.x() : PATTERNS.plus();
    },
} as const;

/**
 * Clamps value to an integer in the range [min, max]
 */
const clampToInt = function (value: number, min: number, max: number) {
    value = Math.floor(value);
    value = Math.max(value, min);
    value = Math.min(value, max);
    return value;
};

// Returns a copy of the tiles, with tiles flipped according to
// whether or not their y, x position satisfies the predicate
const flipTilesPredicate = (
    oldCells: any,
    predicate: (y?: any, x?: any) => boolean,
) => {
    return _.map(oldCells, (row, y) => {
        return _.map(row, (cell, x) => {
            return predicate(y, x) ? !cell : cell;
        });
    });
};

type TileProps = any;

// A single glowy cell
class Tile extends React.Component<TileProps> {
    static propTypes = {
        value: PropTypes.bool.isRequired,
        size: PropTypes.number.isRequired,
    };

    render(): React.ReactNode {
        const color = this.props.value ? "#55dd55" : "#115511";
        const style = _.extend({}, BASE_TILE_STYLE, {
            width: this.props.size,
            height: this.props.size,
            backgroundColor: color,
        });
        return <div style={style} onClick={this._flip} />;
    }

    _flip = () => {
        this.props.onChange(!this.props.value);
    };
}

type TileGridProps = any;

// A grid of glowy cells
class TileGrid extends React.Component<TileGridProps> {
    static propTypes = {
        cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)).isRequired,
        size: PropTypes.number.isRequired,
    };

    render(): React.ReactNode {
        return (
            <div style={TABLE_STYLE} className="no-select">
                {_.map(this.props.cells, (row, y) => {
                    return (
                        <div key={y} style={ROW_STYLE}>
                            {_.map(row, (cell, x) => {
                                return (
                                    <div key={x} style={CELL_STYLE}>
                                        <Tile
                                            value={cell}
                                            size={this.props.size}
                                            onChange={_.partial(
                                                this.props.onChange,
                                                y,
                                                x,
                                            )}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}

type LightsPuzzleEditorProps = any;

// The widget editor
class LightsPuzzleEditor extends React.Component<LightsPuzzleEditorProps> {
    static propTypes = {
        ...Changeable.propTypes,
        startCells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)),
        flipPattern: PropTypes.string.isRequired,
        gradeIncompleteAsWrong: PropTypes.bool.isRequired,
    };

    static widgetName = "lights-puzzle" as const;

    static defaultProps: LightsPuzzleEditorProps = {
        startCells: [
            [false, false, false],
            [false, false, false],
            [false, false, false],
        ],
        flipPattern: "plus",
        gradeIncompleteAsWrong: false,
    };

    _height: () => number = () => {
        return this.props.startCells.length;
    };

    _width: () => number = () => {
        if (this.props.startCells.length !== 0) {
            return this.props.startCells[0].length;
        }
        return 0; // default to 0
    };

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    render(): React.ReactNode {
        return (
            <div>
                <div>
                    Width:
                    <NumberInput
                        value={this._width()}
                        placeholder={5}
                        onChange={this._changeWidth}
                    />
                    {", "}
                    Height:
                    <NumberInput
                        value={this._height()}
                        placeholder={5}
                        onChange={this._changeHeight}
                    />
                </div>
                <div>
                    Flip pattern:
                    <select
                        value={this.props.flipPattern}
                        // @ts-expect-error - TS2322 - Type '(arg1: ChangeEvent<HTMLInputElement>) => void' is not assignable to type 'ChangeEventHandler<HTMLSelectElement>'.
                        onChange={this._handlePatternChange}
                    >
                        {_.map(_.keys(PATTERNS), (pattern, i) => {
                            return (
                                <option value={pattern} key={i}>
                                    {pattern}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    Grade incomplete puzzles as wrong:{" "}
                    <PropCheckBox
                        gradeIncompleteAsWrong={
                            this.props.gradeIncompleteAsWrong
                        }
                        onChange={this.props.onChange}
                    />
                    <InfoTip>
                        By default, incomplete puzzles are graded as empty.
                    </InfoTip>
                </div>
                <div>Starting configuration:</div>
                <div style={{overflowX: "auto"}}>
                    <TileGrid
                        cells={this.props.startCells}
                        size={50}
                        onChange={this._switchTile}
                    />
                </div>
            </div>
        );
    }

    _handlePatternChange: (arg1: React.ChangeEvent<HTMLInputElement>) => void =
        (e) => {
            // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
            this.change("flipPattern", e.target.value);
        };

    _changeWidth: (arg1: number) => void = (newWidth) => {
        newWidth = clampToInt(newWidth, 1, MAX_SIZE);
        this._truncateCells(newWidth, this._height());
    };

    _changeHeight: (arg1: number) => void = (newHeight) => {
        newHeight = clampToInt(newHeight, 1, MAX_SIZE);
        this._truncateCells(this._width(), newHeight);
    };

    _truncateCells: (arg1: number, arg2: number) => void = (
        newWidth,
        newHeight,
    ) => {
        const newCells = _.times(newHeight, (y) => {
            return _.times(newWidth, (x) => {
                // explicitly cast the result to a boolean with !!
                return !!(
                    this.props.startCells[y] && this.props.startCells[y][x]
                );
            });
        });

        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
        this.change({startCells: newCells});
    };

    _switchTile: (arg1: number, arg2: number) => void = (tileY, tileX) => {
        const newCells = flipTilesPredicate(this.props.startCells, (y, x) => {
            return y === tileY && x === tileX;
        });

        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
        this.change({startCells: newCells});
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };
}

export default LightsPuzzleEditor;
