/* eslint-disable static-service/require-fixture */
// @flow

import * as React from "react";
import _ from "underscore";

import ButtonGroup from "../../../perseus-all-package/components/button-group.jsx";
import KhanColors from "../../../perseus-all-package/util/colors.js";

import type {ChangeableProps} from "../../../perseus-all-package/mixins/changeable.jsx";

const COLORS = [
    KhanColors.BLACK,
    KhanColors.BLUE,
    KhanColors.GREEN,
    KhanColors.PINK,
    KhanColors.PURPLE,
    KhanColors.RED,
    KhanColors.GRAY,
];

const LIGHT_COLORS = [
    KhanColors.LIGHT_BLUE,
    KhanColors.LIGHT_ORANGE,
    KhanColors.LIGHT_PINK,
    KhanColors.LIGHT_GREEN,
    KhanColors.LIGHT_PURPLE,
    KhanColors.LIGHT_RED,
    "#fff",
];

type Props = {|
    lightColors?: boolean,
    value?: string,
    ...ChangeableProps,
|};

class ColorPicker extends React.Component<Props> {
    static defaultProps: {|lightColors: boolean, value: any|} = {
        value: KhanColors.BLACK,
        lightColors: false,
    };

    render(): React.Node {
        const colors = this.props.lightColors ? LIGHT_COLORS : COLORS;
        return (
            <ButtonGroup
                value={this.props.value}
                allowEmpty={false}
                buttons={_.map(colors, (color) => {
                    return {
                        value: color,
                        content: (
                            <span>
                                <span
                                    className="colorpicker-circle"
                                    style={{background: color}}
                                />
                                &nbsp;
                            </span>
                        ),
                    };
                })}
                onChange={this.props.onChange}
            />
        );
    }
}

export default ColorPicker;
