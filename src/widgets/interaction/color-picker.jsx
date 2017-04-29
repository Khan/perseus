/* eslint-disable react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */
// @flow

const ButtonGroup = require("react-components/button-group.jsx");
const React = require("react");
const _ = require("underscore");

const {ChangeableProps} = require('../../mixins/changeable.jsx');
const KhanColors = require("../../util/colors.js");

const COLORS = [
    KhanColors.BLACK, KhanColors.BLUE, KhanColors.GREEN,
    KhanColors.PINK, KhanColors.PURPLE, KhanColors.RED, KhanColors.GRAY,
];

const LIGHT_COLORS = [
    KhanColors.LIGHT_BLUE, KhanColors.LIGHT_ORANGE,
    KhanColors.LIGHT_PINK, KhanColors.LIGHT_GREEN, KhanColors.LIGHT_PURPLE,
    KhanColors.LIGHT_RED, "#fff",
];

class ColorPicker extends React.Component {
    static defaultProps = {
        value: KhanColors.BLACK,
        lightColors: false,
    }

    props: ChangeableProps & {
        lightColors?: boolean,
        value?: string,
    }

    render() {
        const colors = this.props.lightColors ? LIGHT_COLORS : COLORS;
        return <ButtonGroup value={this.props.value}
            allowEmpty={false}
            buttons={_.map(colors, (color) => {
                return {
                    value: color,
                    content: <span>
                        <span
                            className="colorpicker-circle"
                            style={{background: color}}
                        />
                        &nbsp;
                    </span>,
                };
            })}
            onChange={this.props.onChange}
        />;
    }
}

module.exports = ColorPicker;
