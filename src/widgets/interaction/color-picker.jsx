/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const ButtonGroup = require("react-components/button-group.jsx");
const React = require("react");
const _ = require("underscore");

const KhanColors = require("../../util/colors.js");

const ColorPicker = React.createClass({
    COLORS: [KhanColors.BLACK, KhanColors.BLUE, KhanColors.GREEN,
        KhanColors.PINK, KhanColors.PURPLE, KhanColors.RED, KhanColors.GRAY],

    LIGHT_COLORS: [KhanColors.LIGHT_BLUE, KhanColors.LIGHT_ORANGE,
        KhanColors.LIGHT_PINK, KhanColors.LIGHT_GREEN, KhanColors.LIGHT_PURPLE,
        KhanColors.LIGHT_RED, "#fff"],

    propTypes: {
        value: React.PropTypes.string,
        lightColors: React.PropTypes.bool,
        onChange: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            value: KhanColors.BLACK,
            lightColors: false,
        };
    },

    render: function() {
        const colors = this.props.lightColors ? this.LIGHT_COLORS : this.COLORS;
        return <ButtonGroup value={this.props.value}
            allowEmpty={false}
            buttons={_.map(colors, (color) => {
                return {
                    value: color,
                    content: <span><span
                        className="colorpicker-circle"
                        style={{background: color}}>
                    </span>&nbsp;</span>,
                };
            })}
            onChange={this.props.onChange} />;
    },
});

module.exports = ColorPicker;
