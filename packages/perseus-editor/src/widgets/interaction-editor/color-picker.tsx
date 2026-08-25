import {components, KhanColors} from "@khanacademy/perseus";
import * as React from "react";

const {ButtonGroup} = components;

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

interface Props {
    lightColors?: boolean;
    value?: string;
    onChange: (value: string) => void;
}

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
                buttons={colors.map((color) => {
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
