var ButtonGroup = require("react-components/button-group.jsx");

var ColorPicker = React.createClass({
    COLORS: [KhanUtil.BLACK, KhanUtil.BLUE, KhanUtil.GREEN, KhanUtil.PINK,
        KhanUtil.PURPLE, KhanUtil.RED, KhanUtil.GRAY],

    LIGHT_COLORS: [KhanUtil.LIGHT_BLUE, KhanUtil.LIGHT_ORANGE,
        KhanUtil.LIGHT_PINK, KhanUtil.LIGHT_GREEN, KhanUtil.LIGHT_PURPLE,
        KhanUtil.LIGHT_RED, "#fff"],

    propTypes: {
        value: React.PropTypes.string,
        lightColors: React.PropTypes.bool,
        onChange: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            value: KhanUtil.BLACK,
            lightColors: false
        };
    },

    render: function() {
        return <ButtonGroup value={this.props.value}
            allowEmpty={false}
            buttons={_.map(this.props.lightColors ? this.LIGHT_COLORS :
                this.COLORS, (color) => {
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
