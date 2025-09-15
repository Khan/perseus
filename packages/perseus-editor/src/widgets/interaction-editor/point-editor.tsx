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
    coordX: string;
    coordY: string;
    color: string;
};

type DefaultProps = {
    coordX: Props["coordX"];
    coordY: Props["coordY"];
    color: Props["color"];
};

// Editor for non-interactive points
class PointEditor extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        coordX: "0",
        coordY: "0",
        color: KhanColors.BLACK,
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
                    Coordinate: <TeX>\Large(</TeX>
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
                    <ColorPicker
                        value={this.props.color}
                        onChange={this.change("color")}
                    />
                </div>
            </div>
        );
    }
}

export default PointEditor;
