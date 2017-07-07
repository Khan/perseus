var React     = require("react");
var TeX       = require("react-components/js/tex.jsx");

var prettyBig = { fontSize: "150%" };
var slightlyBig = { fontSize: "120%" };
var trigStyle = { marginLeft: -4 };
var symbStyle = { fontSize: "130%" };

// These are functions because we want to generate a new component for each use
// on the page rather than reusing an instance (which will cause an error).
// Also, it's useful for things which might look different depending on the
// props.

var basic = [

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
    () => [
        <TeX style={prettyBig}>{"\\frac{□}{□}"}</TeX>,

        // If there's something in the input that can become part of a
        // fraction, typing "/" puts it in the numerator. If not, typing
        // "/" does nothing. In that case, enter a \frac.
        input => {
            var contents = input.latex();
            input.cmd("\\frac");
            }

    ],
    () => [<TeX style={slightlyBig}>{"\\div"}</TeX>, "\\div"],
    () => [<TeX style={slightlyBig} key="eq">{"="}</TeX>, "="],

];

var buttonSets = {

    basic,

    relations:
    [
        // [<TeX>{"="}</TeX>, "\\eq"],
        () => [<TeX>\neq</TeX>, "\\neq"],
        () => [<TeX>\leq</TeX>, "\\leq"],
        () => [<TeX>\geq</TeX>, "\\geq"],
        () => [<TeX>\lt</TeX>, "\\lt"],
        () => [<TeX>\gt</TeX>, "\\gt"],
    ],

    trig:[
        () => [<TeX>\sin</TeX>, "\\sin"],
        () => [<TeX>\cos</TeX>, "\\cos"],
        () => [<TeX>\tan</TeX>, "\\tan"],
        () => [<TeX style={symbStyle}>\theta</TeX>, "\\theta"],
        () => [<TeX style={symbStyle}>\phi</TeX>, "\\phi"]
    ],

    prealgebra:[
        () => [<TeX>{"\\sqrt{x}"}</TeX>, "\\sqrt"],
        () => [
            <TeX style={slightlyBig}>a^□</TeX>,
            input => {
                var contents = input.latex();
                input.keystroke("Up");
                if (input.latex() === contents) {
                    input.typedText("a^b");
                }
            }
        ],
        () => [<TeX style={slightlyBig}>\pi</TeX>, "\\pi"]
    ]

};

//declare buttonSetsType type from buttonSets
var buttonSetsType = React.PropTypes.arrayOf(
        React.PropTypes.oneOf(_(buttonSets).keys())
    );

var TexButtons = React.createClass({
    propTypes: {
        onInsert: React.PropTypes.func.isRequired,
        sets: buttonSetsType.isRequired,
    },

    render: function() {
        // sort this.props.sets component by key_index of buttonSets
        // var sortedButtonSets = _.sortBy(this.props.sets,
        //     (setName) => _.keys(buttonSets).indexOf(setName));

        // make buttonSet(checked) by this.props.sets from buttonSets(template)
        var buttonSet = _(this.props.sets).map(setName => buttonSets[setName]);

        var buttonRows = _(buttonSet).map(row => row.map(symbGen => {
            // create a (component, thing we should send to mathquill) pair
            var symbol = symbGen(this.props);
            return <button onClick={() => this.props.onInsert(symbol[1])}
                           className="tex-button"
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

        return <div className={this.props.className}>
            {buttonPopup}
        </div>;
    },
    statics: {
        buttonSets,
        buttonSetsType
    }
});

module.exports = TexButtons;
