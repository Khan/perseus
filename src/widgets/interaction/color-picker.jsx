/** @jsx React.DOM */

var ButtonGroup = require("react-components/button-group.jsx");

var ColorPicker = React.createClass({
    COLORS: [KhanUtil.BLACK, KhanUtil.BLUE, KhanUtil.GREEN, KhanUtil.PINK,
        KhanUtil.PURPLE, KhanUtil.RED, KhanUtil.GRAY],

    propTypes: {
        value: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            value: KhanUtil.BLACK
        };
    },

    render: function() {
        return <ButtonGroup value={this.props.value}
            allowEmpty={false}
            buttons={_.map(this.COLORS, (color) => {
                    return {
                        value: color,
                        content: <span><span
                            className="colorpicker-circle"
                            style={{background: color}}>
                        </span>&nbsp;</span>
                    };
                })}
            onChange={this.props.onChange} />;
    }
});

module.exports = ColorPicker;
