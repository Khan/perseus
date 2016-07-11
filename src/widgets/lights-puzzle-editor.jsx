/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable array-bracket-spacing, comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require("react");
const _ = require("underscore");

const Changeable = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const NumberInput = require("../components/number-input.jsx");
const PropCheckBox = require("../components/prop-check-box.jsx");
const InfoTip = require("../components/info-tip.jsx");

const MAX_SIZE = 8;

// styling
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

// Returns a copy of the tiles, with tiles flipped according to
// whether or not their y, x position satisfies the predicate
var flipTilesPredicate = (oldCells, predicate) => {
    return _.map(oldCells, (row, y) => {
        return _.map(row, (cell, x) => {
            return predicate(y, x) ? !cell : cell;
        });
    });
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

// The widget editor
const LightsPuzzleEditor = React.createClass({
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
                    {_.map(_.keys(PATTERNS), (pattern, i) => {
                        return <option value={pattern} key={i}>
                            {pattern}
                        </option>;
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

module.exports = LightsPuzzleEditor;
