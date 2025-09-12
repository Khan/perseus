import {
    Changeable,
    Dependencies,
    EditorJsonify,
    KhanColors,
} from "@khanacademy/perseus";
import * as React from "react";

import ColorPicker from "./color-picker";
import MathquillInput from "./mathquill-input";

const {getDependencies} = Dependencies;

type Props = Changeable.ChangeableProps & {
    color: string;
    coordX: string;
    coordY: string;
    height: string;
    width: string;
};

type DefaultProps = {
    color: Props["color"];
    coordX: Props["coordX"];
    coordY: Props["coordY"];
    height: Props["height"];
    width: Props["width"];
};

// Editor for rectangles
class RectangleEditor extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        coordX: "-5",
        coordY: "5",
        width: "2",
        height: "3",
        color: KhanColors.LIGHT_BLUE,
    };

    change: (arg1: any, arg2?: any, arg3?: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        const {TeX} = getDependencies();

        return (
            <div className="graph-settings">
                <div className="perseus-widget-row">
                    Bottom left: <TeX>\Large(</TeX>
                    <MathquillInput
                        value={this.props.coordX}
                        onChange={this.change("coordX")}
                    />
                    <TeX>,</TeX>{" "}
                    <MathquillInput
                        value={this.props.coordY}
                        onChange={this.change("coordY")}
                    />
                    <TeX>\Large)</TeX>
                </div>
                <div className="perseus-widget-row">
                    Width:{" "}
                    <MathquillInput
                        value={this.props.width}
                        onChange={this.change("width")}
                    />
                </div>
                <div className="perseus-widget-row">
                    Height:{" "}
                    <MathquillInput
                        value={this.props.height}
                        onChange={this.change("height")}
                    />
                </div>
                <div className="perseus-widget-row">
                    <ColorPicker
                        value={this.props.color}
                        lightColors={true}
                        onChange={this.change("color")}
                    />
                </div>
                <div className="perseus-widget-row">
                    You want a border? Sorry, draw your own.
                </div>
            </div>
        );
    }
}

export default RectangleEditor;
