import {
    components,
    Changeable,
    Dependencies,
    EditorJsonify,
    KhanColors,
} from "@khanacademy/perseus";
import * as React from "react";

import ArrowPicker from "./arrow-picker";
import ColorPicker from "./color-picker";
import DashPicker from "./dash-picker";
import MathquillInput from "./mathquill-input";

const {NumberInput} = components;
const {getDependencies} = Dependencies;

type Props = Changeable.ChangeableProps & {
    startX: string;
    startY: string;
    endX: string;
    endY: string;
    color: string;
    strokeDasharray: string;
    arrows: string;
    strokeWidth: number;
};

type DefaultProps = {
    startX: Props["startX"];
    startY: Props["startY"];
    endX: Props["endX"];
    endY: Props["endY"];
    color: Props["color"];
    strokeDasharray: Props["strokeDasharray"];
    arrows: Props["arrows"];
    strokeWidth: Props["strokeWidth"];
};

// Editor for non-interactive line segments
class LineEditor extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        startX: "-5",
        startY: "5",
        endX: "5",
        endY: "5",
        color: KhanColors.BLACK,
        strokeDasharray: "",
        arrows: "",
        strokeWidth: 2,
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
                    Start: <TeX>\Large(</TeX>
                    <MathquillInput
                        value={this.props.startX}
                        onChange={this.change("startX")}
                    />
                    <TeX>,</TeX>{" "}
                    <MathquillInput
                        value={this.props.startY}
                        onChange={this.change("startY")}
                    />
                    <TeX>\Large)</TeX>
                </div>
                <div className="perseus-widget-row">
                    End: <TeX>\Large(</TeX>
                    <MathquillInput
                        value={this.props.endX}
                        onChange={this.change("endX")}
                    />
                    <TeX>,</TeX>{" "}
                    <MathquillInput
                        value={this.props.endY}
                        onChange={this.change("endY")}
                    />
                    <TeX>\Large)</TeX>
                </div>
                <div className="perseus-widget-row">
                    <ColorPicker
                        value={this.props.color}
                        onChange={this.change("color")}
                    />
                </div>
                <div className="perseus-widget-row">
                    <DashPicker
                        value={this.props.strokeDasharray}
                        onChange={this.change("strokeDasharray")}
                    />
                    &nbsp; &nbsp;
                    <ArrowPicker
                        value={this.props.arrows}
                        onChange={this.change("arrows")}
                    />
                </div>
                <div className="perseus-widget-row">
                    <div className="perseus-widget-left-col">
                        Width:{" "}
                        <NumberInput
                            value={this.props.strokeWidth}
                            placeholder={2}
                            onChange={this.change("strokeWidth")}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default LineEditor;
