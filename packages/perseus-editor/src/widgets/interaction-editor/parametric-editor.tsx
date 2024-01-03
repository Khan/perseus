import {
    components,
    Changeable,
    Dependencies,
    EditorJsonify,
    KhanColors,
    ColorPicker,
    DashPicker,
} from "@khanacademy/perseus";
import * as React from "react";
import _ from "underscore";

const {MathInput, NumberInput} = components;
const {getDependencies} = Dependencies;

type Props = Changeable.ChangeableProps & {
    x: string;
    y: string;
    rangeMin: string;
    rangeMax: string;
    color: string;
    strokeDasharray: string;
    strokeWidth: number;
};

type DefaultProps = {
    x: Props["x"];
    y: Props["y"];
    rangeMin: Props["rangeMin"];
    rangeMax: Props["rangeMax"];
    color: Props["color"];
    strokeDasharray: Props["strokeDasharray"];
    strokeWidth: Props["strokeWidth"];
};

//
// Editor for parametric plots
//
// TODO(eater): Factor this out
//
class ParametricEditor extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        x: "cos(t)",
        y: "sin(t)",
        rangeMin: "0",
        rangeMax: "2\\pi",
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
        const analyticsStub = {onAnalyticsEvent: () => Promise.resolve()};

        return (
            <div className="graph-settings">
                <div className="perseus-widget-row">
                    <TeX>X(t) =</TeX>{" "}
                    <MathInput
                        buttonsVisible="never"
                        value={this.props.x}
                        onChange={this.change("x")}
                        analytics={analyticsStub}
                    />
                </div>
                <div className="perseus-widget-row">
                    <TeX>Y(t) =</TeX>{" "}
                    <MathInput
                        buttonsVisible="never"
                        value={this.props.y}
                        onChange={this.change("y")}
                        analytics={analyticsStub}
                    />
                </div>
                <div className="perseus-widget-row">
                    Range: <TeX>\Large(</TeX>
                    <MathInput
                        buttonsVisible="never"
                        value={this.props.rangeMin}
                        onChange={this.change("rangeMin")}
                        analytics={analyticsStub}
                    />
                    <TeX>,</TeX>{" "}
                    <MathInput
                        buttonsVisible="never"
                        value={this.props.rangeMax}
                        onChange={this.change("rangeMax")}
                        analytics={analyticsStub}
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

export default ParametricEditor;
