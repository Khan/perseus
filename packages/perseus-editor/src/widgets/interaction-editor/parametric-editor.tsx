import {components, Dependencies, KhanColors} from "@khanacademy/perseus";
import * as React from "react";

import ColorPicker from "./color-picker";
import DashPicker from "./dash-picker";
import MathquillInput from "./mathquill-input";

import type {PerseusInteractionParametricElementOptions} from "@khanacademy/perseus-core";

const {NumberInput} = components;

interface Props extends PerseusInteractionParametricElementOptions {
    onChange: (options: PerseusInteractionParametricElementOptions) => void;
}

// Editor for parametric plots
class ParametricEditor extends React.Component<Props> {
    static defaultProps: PerseusInteractionParametricElementOptions = {
        x: "cos(t)",
        y: "sin(t)",
        rangeMin: "0",
        rangeMax: "2\\pi",
        color: KhanColors.BLUE,
        strokeDasharray: "",
        strokeWidth: 2,
    };

    handleChange(changes: Partial<PerseusInteractionParametricElementOptions>) {
        this.props.onChange({
            x: this.props.x,
            y: this.props.y,
            rangeMin: this.props.rangeMin,
            rangeMax: this.props.rangeMax,
            color: this.props.color,
            strokeDasharray: this.props.strokeDasharray,
            strokeWidth: this.props.strokeWidth,
            ...changes,
        });
    }

    render(): React.ReactNode {
        const {TeX} = Dependencies.getDependencies();

        return (
            <div className="graph-settings">
                <div className="perseus-widget-row">
                    <TeX>X(t) =</TeX>{" "}
                    <MathquillInput
                        value={this.props.x}
                        onChange={(x) => this.handleChange({x})}
                    />
                </div>
                <div className="perseus-widget-row">
                    <TeX>Y(t) =</TeX>{" "}
                    <MathquillInput
                        value={this.props.y}
                        onChange={(y) => this.handleChange({y})}
                    />
                </div>
                <div className="perseus-widget-row">
                    Range: <TeX>\Large(</TeX>
                    <MathquillInput
                        value={this.props.rangeMin}
                        onChange={(rangeMin) => this.handleChange({rangeMin})}
                    />
                    <TeX>,</TeX>{" "}
                    <MathquillInput
                        value={this.props.rangeMax}
                        onChange={(rangeMax) => this.handleChange({rangeMax})}
                    />
                    <TeX>\Large)</TeX>
                </div>
                <div className="perseus-widget-row">
                    <ColorPicker
                        value={this.props.color}
                        onChange={(color) => this.handleChange({color})}
                    />
                </div>
                <div className="perseus-widget-row">
                    <DashPicker
                        value={this.props.strokeDasharray}
                        onChange={(strokeDasharray) =>
                            this.handleChange({strokeDasharray})
                        }
                    />
                </div>
                <div className="perseus-widget-row">
                    <div className="perseus-widget-left-col">
                        Width:{" "}
                        <NumberInput
                            value={this.props.strokeWidth}
                            placeholder={2}
                            onChange={(strokeWidth) =>
                                this.handleChange({strokeWidth})
                            }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ParametricEditor;
