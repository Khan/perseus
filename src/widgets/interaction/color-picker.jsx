/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-undef, no-var, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var ButtonGroup = require("react-components/button-group.jsx");
var React = require("react");

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
