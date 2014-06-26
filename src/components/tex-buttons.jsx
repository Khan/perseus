/** @jsx React.DOM */

var React     = require("react");
var RCSS      = require("rcss");
var TeX       = require("react-components/tex");
var clone     = React.addons.cloneWithProps;

var prettyBig = { fontSize: "150%" };
var slightlyBig = { fontSize: "120%" };
var trigStyle = { marginLeft: -4 };
var symbStyle = { fontSize: "130%" };

// These are functions because we want to generate a new component for each use
// on the page rather than reusing an instance (which will cause an error).
// Also, it's useful for things which might look different depending on the
// props.
var buttons = [

    // basics
    [
        () => [<span style={slightlyBig}>+</span>, "+"],
        () => [<span style={prettyBig}>-</span>, "-"],

        // TODO(joel) - display as \cdot when appropriate
        props => {
            if (props.convertDotToTimes) {
                return [<TeX style={prettyBig}>\times</TeX>, "\\times"];
            } else {
                return [<TeX style={prettyBig}>\cdot</TeX>, "\\cdot"];
            }
        },
        () => [<TeX style={prettyBig}>{"\\frac{□}{□}"}</TeX>, "\\frac"]
    ],

    // relations
    [
        // [<TeX>{"="}</TeX>, "\\eq"],
        () => [<TeX>\neq</TeX>, "\\neq"],
        () => [<TeX>\leq</TeX>, "\\leq"],
        () => [<TeX>\geq</TeX>, "\\geq"],
        () => [<TeX>\lt</TeX>, "\\lt"],
        () => [<TeX>\gt</TeX>, "\\gt"],
    ],

    // trig
    [
        () => [<TeX>\sin</TeX>, "\\sin"],
        () => [<TeX>\cos</TeX>, "\\cos"],
        () => [<TeX>\tan</TeX>, "\\tan"],
        () => [<TeX style={symbStyle}>\theta</TeX>, "\\theta"],
        () => [<TeX style={symbStyle}>\phi</TeX>, "\\phi"]
    ],

    // prealgebra
    [
        () => [<TeX>{"\\sqrt{x}"}</TeX>, "\\sqrt"],
        // TODO(joel) - how does desmos do this?
        // ["\\sqrt[3]{x}", "\\sqrt[3]{x}"],
        () => [<TeX style={slightlyBig}>□^a</TeX>, "^a"],
        () => [<TeX style={slightlyBig}>\pi</TeX>, "\\pi"]
    ]

];

// Math domain color
var borderColor = "#1c758a";

var buttonStyle = {
    display: "block",
    "float": "left",
    width: "35px",
    height: "35px",
    margin: "2px",
    border: `1px solid ${borderColor}`,
    backgroundColor: "white",
    borderRadius: "5px",

    ":hover": {
        cursor: "pointer",
        backgroundColor: "#f0f0f0"
    },

    ":focus": {
        border: `2px solid ${borderColor}`,
        outline: "none"
    }
};

var buttonRowStyle = {
    margin: "5px 0"
};

RCSS.createClass(buttonStyle);
RCSS.createClass(buttonRowStyle);

var TexButtons = React.createClass({
    propTypes: {
        onInsert: React.PropTypes.func.isRequired
    },
    render: function() {
        var buttonRows = _(buttons).map(row => row.map(symbGen => {
            // create a (component, thing we should send to mathquill) pair
            var symbol = symbGen(this.props);
            return <button onClick={() => this.props.onInsert(symbol[1])}
                           className={buttonStyle.className}
                           tabIndex={-1}>
                {symbol[0]}
            </button>;
        }));

        var buttonPopup = _(buttonRows).map((row, i) => {
            var style = {};
            if (i > 0 && i < buttonRows.length-1) {
                style = { margin: "5px 0" };
            }

            return <div className="clearfix" style={style}>
                {row}
            </div>;
        });

        return <div className={this.props.className}>
            {buttonPopup}
        </div>;
    }
});

module.exports = TexButtons;
