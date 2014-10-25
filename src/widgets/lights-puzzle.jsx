var React = require('react');
var Changeable = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");
var WidgetJsonifyDeprecated = require("../mixins/widget-jsonify-deprecated.jsx");

var NumberInput = require("../components/number-input.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var InfoTip = require("react-components/info-tip.jsx");

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
    borderRadius: 10,
    cursor: "pointer"
};

var MOVE_COUNT_STYLE = {
    padding: CELL_PADDING,
    display: "inline-block"
};

var RESET_BUTTON_STYLE = {
    "float": "right",
    paddingRight: CELL_PADDING
};

var MAIN_TILE_SIZE = 50;

var mapCells = (cells, func) => {
    return _.map(cells, (row, y) => {
        return _.map(row, (value, x) => {
            return func(value, y, x);
        });
    });
};

var genCells = (height, width, func) => {
    return _.times(height, (y) => {
        return _.times(width, (x) => {
            return func(y, x);
        });
    });
};

var PATTERNS = {
    plus: () => [
        [false, true, false],
        [true,  true, true ],
        [false, true, false]
    ],
    x: () => [
        [true,  false, true ],
        [false, true,  false],
        [true,  false, true ]
    ],
    "plus/x": (iter) => {
        return (iter % 2) ? PATTERNS.x() : PATTERNS.plus();
    }
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
        value: React.PropTypes.bool.isRequired,
        size: React.PropTypes.number.isRequired
    },

    render: function() {
        var color = this.props.value ? "#55dd55" : "#115511";
        var style = _.extend({}, BASE_TILE_STYLE, {
            width: this.props.size,
            height: this.props.size,
            backgroundColor: color
        });
        return <div
            style={style}
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
        ).isRequired,
        size: React.PropTypes.number.isRequired
    },

    render: function() {
        return <div style={TABLE_STYLE} className="no-select">
            {_.map(this.props.cells, (row, y) => {
                return <div key={y} style={ROW_STYLE}>
                    {_.map(row, (cell, x) => {
                        return <div key={x} style={CELL_STYLE}>
                            <Tile
                                value={cell}
                                size={this.props.size}
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
var flipTilesPredicate = (oldCells, predicate) => {
    return _.map(oldCells, (row, y) => {
        return _.map(row, (cell, x) => {
            return predicate(y, x) ? !cell : cell;
        });
    });
};

var flipTilesPattern = (oldCells, tileY, tileX, pattern) => {
    return flipTilesPredicate(oldCells, (y, x) => {
        var offsetY = y - tileY;
        var offsetX = x - tileX;
        if (Math.abs(offsetY) <= 1 && Math.abs(offsetX) <= 1) {
            return pattern[offsetY + 1][offsetX + 1];
        } else {
            return false;
        }
    });
};

// The lights puzzle widget
var LightsPuzzle = React.createClass({
    mixins: [Changeable, WidgetJsonifyDeprecated],

    propTypes: {
        cells: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(React.PropTypes.bool)
        ),
        startCells: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(React.PropTypes.bool)
        ),
        flipPattern: React.PropTypes.string.isRequired,
        moveCount: React.PropTypes.number.isRequired
    },

    getDefaultProps: function() {
        return {
            cells: [
                [false, false, false],
                [false, false, false],
                [false, false, false]
            ],
            startCells: [
                [false, false, false],
                [false, false, false],
                [false, false, false]
            ],
            flipPattern: "plus",
            moveCount: 0
        };
    },

    render: function() {
        var width = this._width();
        var tileSize = MAIN_TILE_SIZE;
        var pxWidth = width * (tileSize + 2 * CELL_PADDING);
        return <div>
            <TileGrid
                cells={this.props.cells}
                size={tileSize}
                onChange={this._flipTile} />
            <div style={{width: pxWidth}}>
                <div style={MOVE_COUNT_STYLE}>
                    Moves: {this.props.moveCount}
                </div>
                <div style={RESET_BUTTON_STYLE}>
                <input
                    type="button"
                    value="Reset"
                    onClick={this._reset}
                    className="simple-button" />
                </div>
            </div>
            <div className="clearfix" />
        </div>;
    },

    _width: function() {
        if (this.props.cells.length !== 0) {
            return this.props.cells[0].length;
        } else {
            return 0; // default to 0
        }
    },

    componentDidMount: function() {
        this._initNextPatterns();
    },

    componentDidUpdate: function(prevProps) {
        if (prevProps.flipPattern !== this.props.flipPattern) {
            this._initNextPatterns();
        }
    },

    _initNextPatterns: function() {
        this._currPattern = PATTERNS[this.props.flipPattern](0);
        this._nextPattern = PATTERNS[this.props.flipPattern](1);
        this._patternIndex = 2;
    },

    _shiftPatterns: function() {
        this._currPattern = this._nextPattern;
        this._nextPattern = PATTERNS[this.props.flipPattern](
            this._patternIndex
        );
        this._patternIndex++;
    },

    _flipTile: function(tileY, tileX) {
        var newCells = flipTilesPattern(
            this.props.cells,
            tileY,
            tileX,
            this._currPattern
        );
        this._shiftPatterns();

        this.change({
            cells: newCells,
            moveCount: this.props.moveCount + 1
        });
    },

    _reset: function() {
        this.change({
            cells: this.props.startCells,
            moveCount: 0
        });
    },

    simpleValidate: function(rubric) {
        return validate(rubric, this.getUserInput());
    },

    statics: {
        displayMode: "block"
    }
});

// The widget editor
var LightsPuzzleEditor = React.createClass({
    mixins: [Changeable, EditorJsonify],

    propTypes: {
        startCells: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(React.PropTypes.bool)
        ),
        flipPattern: React.PropTypes.string.isRequired,
        gradeIncompleteAsWrong: React.PropTypes.bool.isRequired
    },

    getDefaultProps: function() {
        return {
            startCells: [
                [false, false, false],
                [false, false, false],
                [false, false, false]
            ],
            flipPattern: "plus",
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
                Flip pattern:
                <select
                        value={this.props.flipPattern}
                        onChange={this._handlePatternChange}>
                    {_.map(_.keys(PATTERNS), (pattern) => {
                        return <option value={pattern}>{pattern}</option>;
                    })}
                </select>
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
                    size={50}
                    onChange={this._switchTile} />
            </div>
        </div>;
    },

    _handlePatternChange: function(e) {
        this.change("flipPattern", e.target.value);
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
        var newCells = flipTilesPredicate(this.props.startCells, (y, x) => {
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
        cells: editorProps.startCells,
        startCells: editorProps.startCells,
        flipPattern: editorProps.flipPattern
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
