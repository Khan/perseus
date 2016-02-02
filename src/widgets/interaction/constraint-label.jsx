var React = require("react");
var TeX = require("react-components/tex.jsx");

var ButtonGroup = require("react-components/button-group.jsx");
var Changeable = require("../../mixins/changeable.jsx");
var MathInput = require("../../components/math-input.jsx");
var NumberInput = require("../../components/number-input.jsx");

var ConstraintLabel = React.createClass({
    mixins: [Changeable],

    propTypes: {
        constraint: React.PropTypes.string,
        digits: React.PropTypes.number,
        onChange: React.PropTypes.func.isRequired,
        constraintXMin: React.PropTypes.string,
        constraintXMax: React.PropTypes.string,
        constraintYMin: React.PropTypes.string,
        constraintYMax: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            kind: "text",
            digits: 2,
            constraintXMin: "-10",
            constraintXMax: "10",
            constraintYMin: "-10",
            constraintYMax: "10"
        };
    },

    render: function() {
        return <div>
            <div className="perseus-widget-row">
                Kind: <ButtonGroup value={this.props.kind}
                    allowEmpty={false}
                    buttons={[
                        {value: "text", content: "Text"},
                        {value: "expression", content: "Expression"}]}
                    onChange={this.change("kind")} />
            </div>
            {this.props.kind === "expression" &&
                <div className="perseus-widget-row">
                    Digits: <NumberInput
                        value={this.props.digits}
                        placeholder={2}
                        onChange={this.change("digits")} />
            </div>}
            Set these so label cannot move off the canvas:
            <div className="perseus-widget-row">
                <div className="perseus-widget-row">
                    <TeX>x \in \Large[</TeX> <MathInput
                        buttonSets={[]}
                        buttonsVisible={"never"}
                        value={this.props.constraintXMin}
                        onChange={this.change("constraintXMin")} />
                    <TeX>, </TeX> <MathInput
                        buttonSets={[]}
                        buttonsVisible={"never"}
                        value={this.props.constraintXMax}
                        onChange={this.change("constraintXMax")}
                    /> <TeX>\Large]</TeX>
                </div>
            </div>
            <div className="perseus-widget-row">
                <div className="perseus-widget-row">
                    <TeX>y \in \Large[</TeX> <MathInput
                        buttonSets={[]}
                        buttonsVisible={"never"}
                        value={this.props.constraintYMin}
                        onChange={this.change("constraintYMin")} />
                    <TeX>, </TeX> <MathInput
                        buttonSets={[]}
                        buttonsVisible={"never"}
                        value={this.props.constraintYMax}
                        onChange={this.change("constraintYMax")}
                    /> <TeX>\Large]</TeX>
                </div>
            </div>
        </div>;
    }
});

module.exports = ConstraintLabel;
