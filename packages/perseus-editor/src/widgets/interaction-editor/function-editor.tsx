import {components, Dependencies, KhanColors} from "@khanacademy/perseus";
import * as React from "react";

import ColorPicker from "./color-picker";
import DashPicker from "./dash-picker";
import MathquillInput from "./mathquill-input";

import type {PerseusInteractionFunctionElementOptions} from "@khanacademy/perseus-core";

const {NumberInput} = components;

interface Props extends PerseusInteractionFunctionElementOptions {
    onChange: (options: PerseusInteractionFunctionElementOptions) => void;
}

// Editor for function plots
class FunctionEditor extends React.Component<Props> {
    static defaultProps: PerseusInteractionFunctionElementOptions = {
        value: "x",
        funcName: "f",
        rangeMin: "-10",
        rangeMax: "10",
        color: KhanColors.BLUE,
        strokeDasharray: "",
        strokeWidth: 2,
    };

    handleChange(changes: Partial<PerseusInteractionFunctionElementOptions>) {
        this.props.onChange({
            value: this.props.value,
            funcName: this.props.funcName,
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
                    <TeX>{this.props.funcName + "(x)="}</TeX>{" "}
                    <MathquillInput
                        value={this.props.value}
                        onChange={(value) => this.handleChange({value})}
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

export default FunctionEditor;
