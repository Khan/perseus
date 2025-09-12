import {
    components,
    Changeable,
    Dependencies,
    EditorJsonify,
    KhanColors,
} from "@khanacademy/perseus";
import * as React from "react";

import ColorPicker from "./color-picker";
import MathquillInput from "./mathquill-input";

const {TextInput} = components;
const {getDependencies} = Dependencies;

type Props = Changeable.ChangeableProps & {
    color: string;
    coordX: string;
    coordY: string;
    label: string;
};

type DefaultProps = {
    color: Props["color"];
    coordX: Props["coordX"];
    coordY: Props["coordY"];
    label: Props["label"];
};

// Editor for labels
// TODO(eater): Add text direction
class LabelEditor extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        coordX: "0",
        coordY: "0",
        color: KhanColors.BLACK,
        label: "\\phi",
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
                    <TextInput
                        value={this.props.label}
                        onChange={this.change("label")}
                        style={{
                            width: "100%",
                        }}
                    />
                </div>
                <div className="perseus-widget-row">
                    Location: <TeX>\Large(</TeX>
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

export default LabelEditor;
