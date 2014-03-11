/** @jsx React.DOM */

var ValidatedNumberInput = require("../components/validated-number-input.jsx");

/* A minor abstraction on top of NumberInput for ranges
 *
 */
var RangeInput = React.createClass({
    propTypes: {
        value: React.PropTypes.array,
        placeholder: React.PropTypes.array,
        checkValidity: React.PropTypes.func
    },

    render: function() {
        var value = this.props.value;
        var checkValidity = this.props.checkValidity || (() => true);

        return <div className="range-input">
            [
            {this.transferPropsTo(<ValidatedNumberInput
                value={value[0]}
                checkValidity={(val) => checkValidity([val, value[1]])}
                onChange={this.onChange.bind(this, 0)} />)}
            ,
            {this.transferPropsTo(<ValidatedNumberInput
                value={value[1]}
                checkValidity={(val) => checkValidity([value[0], val])}
                onChange={this.onChange.bind(this, 1)} />)}
            ]
        </div>;
    },

    onChange: function(i, newVal) {
        var value = this.props.value;
        if (i === 0) {
            this.props.onChange([newVal, value[1]]);
        } else {
            this.props.onChange([value[0], newVal]);
        }
    }

});

module.exports = RangeInput;
