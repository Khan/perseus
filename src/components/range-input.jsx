const React = require('react');
const NumberInput = require("../components/number-input.jsx");

const truth = () => true;

/* A minor abstraction on top of NumberInput for ranges
 *
 */
const RangeInput = React.createClass({
    propTypes: {
        checkValidity: React.PropTypes.func,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ])),
        value: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    },

    getDefaultProps: function() {
        return {
            placeholder: [null, null],
        };
    },

    onChange: function(i, newVal) {
        const value = this.props.value;
        if (i === 0) {
            this.props.onChange([newVal, value[1]]);
        } else {
            this.props.onChange([value[0], newVal]);
        }
    },

    render: function() {
        const value = this.props.value;
        const checkValidity = this.props.checkValidity || truth;

        return <div className="range-input">
            <NumberInput
                {...this.props}
                value={value[0]}
                checkValidity={val => checkValidity([val, value[1]])}
                onChange={this.onChange.bind(this, 0)}
                placeholder={this.props.placeholder[0]}
            />
            <NumberInput
                {...this.props}
                value={value[1]}
                checkValidity={val => checkValidity([value[0], val])}
                onChange={this.onChange.bind(this, 1)}
                placeholder={this.props.placeholder[1]}
            />
        </div>;
    },
});

module.exports = RangeInput;
