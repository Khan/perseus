/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React     = require("react");
var _ = require("underscore");

var TeX       = require("react-components/tex.jsx");

var prettyBig = { fontSize: "150%" };
var slightlyBig = { fontSize: "120%" };
var symbStyle = { fontSize: "130%" };

// These are functions because we want to generate a new component for each use
// on the page rather than reusing an instance (which will cause an error).
// Also, it's useful for things which might look different depending on the
// props.

var basic = [
    () => [<span key="plus" style={slightlyBig}>+</span>, "+"],
    () => [<span key="minus" style={prettyBig}>-</span>, "-"],

    // TODO(joel) - display as \cdot when appropriate
    props => {
        if (props.convertDotToTimes) {
            return [
                <TeX key="times" style={prettyBig}>\times</TeX>,
                "\\times"
            ];
        } else {
            return [<TeX key="times" style={prettyBig}>\cdot</TeX>, "\\cdot"];
        }
    },
    () => [
        <TeX key="frac" style={prettyBig}>{"\\frac{□}{□}"}</TeX>,

        // If there's something in the input that can become part of a
        // fraction, typing "/" puts it in the numerator. If not, typing
        // "/" does nothing. In that case, enter a \frac.
        input => {
            var contents = input.latex();
            input.typedText("/");
            if (input.latex() === contents) {
                input.cmd("\\frac");
            }
        }
    ]
];

var buttonSets = {
    basic,

    "basic+div": basic.concat([
        () => [<TeX key="div">\div</TeX>, "\\div"]
    ]),

    trig: [
        () => [<TeX key="sin">\sin</TeX>, "\\sin"],
        () => [<TeX key="cos">\cos</TeX>, "\\cos"],
        () => [<TeX key="tan">\tan</TeX>, "\\tan"],
        () => [<TeX key="theta" style={symbStyle}>\theta</TeX>, "\\theta"],
        () => [<TeX key="pi" style={symbStyle}>\phi</TeX>, "\\phi"]
    ],

    prealgebra: [
        () => [<TeX key="sqrt">{"\\sqrt{x}"}</TeX>, "\\sqrt"],
        // TODO(joel) - how does desmos do this?
        () => [
            <TeX key="nthroot">{"\\sqrt[3]{x}"}</TeX>,
            input => {
                input.typedText("nthroot3");
                input.keystroke("Right");
            }],
        () => [
            <TeX key="pow" style={slightlyBig}>□^a</TeX>,
            input => {
                var contents = input.latex();
                input.typedText("^");

                // If the input hasn't changed (for example, if we're
                // attempting to add an exponent on an empty input or an empty
                // denominator), insert our own "a^b"
                if (input.latex() === contents) {
                    input.typedText("a^b");
                }
            }
        ],
        () => [<TeX key="pi" style={slightlyBig}>\pi</TeX>, "\\pi"],
    ],

    logarithms: [
        () => [<TeX key="log">\log</TeX>, "\\log"],
        () => [<TeX key="ln">\ln</TeX>, "\\ln"],
        () => [
            <TeX key="log_b">\log_b</TeX>,
            input => {
                input.typedText("log_");
                input.keystroke("Right");
                input.typedText("(");
                input.keystroke("Left");
                input.keystroke("Left");
            }],
    ],

    "basic relations": [
        () => [<TeX key="eq">{"="}</TeX>, "="],
        () => [<TeX key="lt">\lt</TeX>, "\\lt"],
        () => [<TeX key="gt">\gt</TeX>, "\\gt"],
    ],

    "advanced relations": [
        () => [<TeX key="neq">\neq</TeX>, "\\neq"],
        () => [<TeX key="leq">\leq</TeX>, "\\leq"],
        () => [<TeX key="geq">\geq</TeX>, "\\geq"],
    ],
};

var buttonSetsType = React.PropTypes.arrayOf(
        React.PropTypes.oneOf(_(buttonSets).keys())
    );

var TexButtons = React.createClass({
    propTypes: {
        sets: buttonSetsType.isRequired,
        onInsert: React.PropTypes.func.isRequired
    },

    render: function() {
        // Always show buttonSets in the same order. Note: Technically it's ok
        // for _.keys() to return the keys in an arbitrary order, but in
        // practice, they will be ordered as listed above.
        var sortedButtonSets = _.sortBy(this.props.sets,
            (setName) => _.keys(buttonSets).indexOf(setName));

        var buttons = _(sortedButtonSets).map(setName => buttonSets[setName]);

        var buttonRows = _(buttons).map(row => row.map(symbGen => {
            // create a (component, thing we should send to mathquill) pair
            var symbol = symbGen(this.props);
            return <button onClick={() => this.props.onInsert(symbol[1])}
                           className="tex-button"
                           key={symbol[0].key}
                           tabIndex={-1}
                           type="button">
                {symbol[0]}
            </button>;
        }));

        var buttonPopup = _(buttonRows).map((row, i) => {
            return <div className="clearfix tex-button-row"
                        key={this.props.sets[i]}>
                {row}
            </div>;
        });

        return <div className={`${this.props.className} preview-measure`}>
            {buttonPopup}
        </div>;
    },

    statics: {
        buttonSets,
        buttonSetsType
    }
});

module.exports = TexButtons;
