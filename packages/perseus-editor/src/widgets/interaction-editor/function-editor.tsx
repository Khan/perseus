import {
    components,
    Changeable,
    Dependencies,
    EditorJsonify,
    KhanColors,
} from "@khanacademy/perseus";
import * as React from "react";

import ColorPicker from "./color-picker";
import DashPicker from "./dash-picker";
import MathquillInput from "./mathquill-input";

const {NumberInput} = components;
const {getDependencies} = Dependencies;

type Props = Changeable.ChangeableProps & {
    value: string;
    rangeMin: string;
    rangeMax: string;
    color: string;
    strokeDasharray: string;
    strokeWidth: number;
};

type DefaultProps = {
    value: Props["value"];
    rangeMin: Props["rangeMin"];
    rangeMax: Props["rangeMax"];
    color: Props["color"];
    strokeDasharray: Props["strokeDasharray"];
    strokeWidth: Props["strokeWidth"];
};

// Editor for function plots
class FunctionEditor extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        value: "x",
        rangeMin: "-10",
        rangeMax: "10",
        color: KhanColors.BLUE,
        strokeDasharray: "",
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
                    {/* @ts-expect-error - TS2339 - Property 'funcName' does not exist on type props. */}
                    <TeX>{this.props.funcName + "(x)="}</TeX>{" "}
                    <MathquillInput
                        value={this.props.value}
                        onChange={this.change("value")}
                    />
                </div>
                <div className="perseus-widget-row">
                    Range: <TeX>\Large(</TeX>
                    <MathquillInput
                        value={this.props.rangeMin}
                        onChange={this.change("rangeMin")}
                    />
                    <TeX>,</TeX>{" "}
                    <MathquillInput
                        value={this.props.rangeMax}
                        onChange={this.change("rangeMax")}
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

export default FunctionEditor;
