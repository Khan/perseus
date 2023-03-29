import * as React from "react";
import _ from "underscore";

import ButtonGroup from "../../components/button-group";
import KhanColors from "../../util/colors";

import type {ChangeableProps} from "../../mixins/changeable";

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

type Props = {
    lightColors?: boolean;
    value?: string;
} & ChangeableProps;

class ColorPicker extends React.Component<Props> {
    static defaultProps: {
        lightColors: boolean;
        value: any;
    } = {
        value: KhanColors.BLACK,
        lightColors: false,
    };

    render(): React.ReactNode {
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
