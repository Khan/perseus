/** @jsx React.DOM */

var React = require('react');
var Changeable = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var NumberInput = require("../components/number-input.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var InfoTip = require("react-components/info-tip");

var MAX_SIZE = 8;

// Styling
var CELL_PADDING = 5;

var TABLE_STYLE = {
    display: "table",
    tableLayout: "fixed"
};

var ROW_STYLE = {
    display: "table-row"
};

var CELL_STYLE = {
    display: "table-cell",
    padding: CELL_PADDING
};

var BASE_TILE_STYLE = {
    width: 50,
    height: 50,
    borderRadius: 10,
    cursor: "pointer"
};

var TILE_STYLES = {
    off: _.extend({}, BASE_TILE_STYLE, {
        backgroundColor: "#115511"
    }),

    on: _.extend({}, BASE_TILE_STYLE, {
        backgroundColor: "#44ff44"
    })
};

/**
 * Clamps value to an integer in the range [min, max]
 */
var clampToInt = function(value, min, max) {
    value = Math.floor(value);
    value = Math.max(value, min);
    value = Math.min(value, max);
    return value;
};

// A single glowy cell
var Tile = React.createClass({
    propTypes: {
        value: React.PropTypes.bool.isRequired
    },

    render: function() {
        var styleName = this.props.value ? 'on' : 'off';
        return <div
            style={TILE_STYLES[styleName]}
            onClick={this._flip} />;
    },

    _flip: function() {
        this.props.onChange(!this.props.value);
    },
});

// A grid of glowy cells
var TileGrid = React.createClass({
    propTypes: {
        cells: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(React.PropTypes.bool)
        ).isRequired
    },

    render: function() {
        return <div style={TABLE_STYLE} className="no-select">
            {_.map(this.props.cells, (row, y) => {
                return <div key={y} style={ROW_STYLE}>
                    {_.map(row, (cell, x) => {
                        return <div key={x} style={CELL_STYLE}>
                            <Tile
                                value={cell}
                                onChange={_.partial(this.props.onChange, y, x)}
                                />
                        </div>;
                    })}
                </div>;
            })}
        </div>;
    },
});

// Returns a copy of the tiles, with tiles flipped according to
// whether or not their y, x position satisfies the predicate
var flipTiles = function(oldCells, predicate) {
    return _.map(oldCells, (row, y) => {
        return _.map(row, (cell, x) => {
            return predicate(y, x) ? !cell : cell;
        });
    });
};

// The lights puzzle widget
var LightsPuzzle = React.createClass({
    mixins: [Changeable, JsonifyProps],

    propTypes: {
        cells: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(React.PropTypes.bool)
        )
    },

    getDefaultProps: function() {
        return {
            cells: [
                [false, false, false],
                [false, false, false],
                [false, false, false]
            ]
        };
    },

    render: function() {
        return <TileGrid
            cells={this.props.cells}
            onChange={this._flipTile} />;
    },

    _flipTile: function(tileY, tileX) {
        var newCells = flipTiles(this.props.cells, (y, x) => {
            var isVerticallyAdjacent =
                    (x === tileX && Math.abs(y - tileY) <= 1);
            var isHorizontallyAdjacent =
                    (y === tileY && Math.abs(x - tileX) <= 1);
            return isVerticallyAdjacent || isHorizontallyAdjacent;
        });

        this.change({cells: newCells});
    },

    simpleValidate: function(rubric) {
        return validate(rubric, this.toJSON());
    },

    statics: {
        displayMode: "block"
    }
});

// The widget editor
var LightsPuzzleEditor = React.createClass({
    mixins: [Changeable, JsonifyProps],

    propTypes: {
        startCells: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(React.PropTypes.bool)
        ),
        gradeIncompleteAsWrong: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            startCells: [
                [false, false, false],
                [false, false, false],
                [false, false, false]
            ],
            gradeIncompleteAsWrong: false
        };
    },

    _height: function() {
        return this.props.startCells.length;
    },

    _width: function() {
        if (this.props.startCells.length !== 0) {
            return this.props.startCells[0].length;
        } else {
            return 0; // default to 0
        }
    },

    render: function() {
        return <div>
            <div>
                Width:
                <NumberInput
                    value={this._width()}
                    placeholder={5}
                    onChange={this._changeWidth} />
                {", "}
                Height:
                <NumberInput
                    value={this._height()}
                    placeholder={5}
                    onChange={this._changeHeight} />
            </div>
            <div>
            Grade incomplete puzzles as wrong:
            {" "}
            <PropCheckBox
                gradeIncompleteAsWrong={this.props.gradeIncompleteAsWrong}
                onChange={this.props.onChange} />
                <InfoTip>
                    By default, incomplete puzzles are graded as empty.
                </InfoTip>
            </div>
            <div>
                Starting configuration:
            </div>
            <div style={{overflowX: "auto"}}>
                <TileGrid
                    cells={this.props.startCells}
                    onChange={this._switchTile} />
            </div>
        </div>;
    },

    _changeWidth: function(newWidth) {
        newWidth = clampToInt(newWidth, 1, MAX_SIZE);
        this._truncateCells(newWidth, this._height());
    },

    _changeHeight: function(newHeight) {
        newHeight = clampToInt(newHeight, 1, MAX_SIZE);
        this._truncateCells(this._width(), newHeight);
    },

    _truncateCells: function(newWidth, newHeight) {
        var newCells = _.times(newHeight, (y) => {
            return _.times(newWidth, (x) => {
                // explicitly cast the result to a boolean with !!
                return !!(this.props.startCells[y] &&
                        this.props.startCells[y][x]);
            });
        });

        this.change({startCells: newCells});
    },

    _switchTile: function(tileY, tileX) {
        var newCells = flipTiles(this.props.startCells, (y, x) => {
            return y === tileY && x === tileX;
        });

        this.change({startCells: newCells});
    }
});

// grading function
var validate = function(rubric, state) {
    var empty = _.all(state.cells, (row, y) => {
        return _.all(row, (cell, x) => {
            return cell === rubric.startCells[y][x];
        });
    });
    if (empty) {
        return {
            type: "invalid",
            message: $._("Click on the tiles to change the lights.")
        };
    }

    var correct = _.all(state.cells, (row) => {
        return _.all(row, (cell) => {
            return cell;
        });
    });

    if (correct) {
        return {
            type: "points",
            earned: 1,
            total: 1,
            message: null
        };
    } else if (rubric.gradeIncompleteAsWrong) {
        return {
            type: "points",
            earned: 0,
            total: 1,
            message: null
        };
    } else {
        return {
            type: "invalid",
            message: $._("You must turn on all of the lights to continue.")
        };
    }
};

// The function run on the editor props to create the widget props
var transformProps = function(editorProps) {
    return {
        cells: editorProps.startCells
    };
};

module.exports = {
    name: "lights-puzzle",
    displayName: "Lights Puzzle",
    hidden: true,
    widget: LightsPuzzle,
    editor: LightsPuzzleEditor,
    transform: transformProps
};
