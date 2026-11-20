import {components, Dependencies, KhanColors} from "@khanacademy/perseus";
import * as React from "react";

import ArrowPicker from "./arrow-picker";
import ColorPicker from "./color-picker";
import DashPicker from "./dash-picker";
import MathquillInput from "./mathquill-input";

import type {PerseusInteractionLineElementOptions} from "@khanacademy/perseus-core";

const {NumberInput} = components;

interface Props extends PerseusInteractionLineElementOptions {
    onChange: (options: PerseusInteractionLineElementOptions) => void;
}

// Editor for non-interactive line segments
class LineEditor extends React.Component<Props> {
    static defaultProps: PerseusInteractionLineElementOptions = {
        startX: "-5",
        startY: "5",
        endX: "5",
        endY: "5",
        color: KhanColors.BLACK,
        strokeDasharray: "",
        arrows: "",
        strokeWidth: 2,
    };

    handleChange(changes: Partial<PerseusInteractionLineElementOptions>) {
        this.props.onChange({
            startX: this.props.startX,
            startY: this.props.startY,
            endX: this.props.endX,
            endY: this.props.endY,
            color: this.props.color,
            strokeDasharray: this.props.strokeDasharray,
            arrows: this.props.arrows,
            strokeWidth: this.props.strokeWidth,
            ...changes,
        });
    }

    render(): React.ReactNode {
        const {TeX} = Dependencies.getDependencies();

        return (
            <div className="graph-settings">
                <div className="perseus-widget-row">
                    Start: <TeX>\Large(</TeX>
                    <MathquillInput
                        value={this.props.startX}
                        onChange={(startX) => this.handleChange({startX})}
                    />
                    <TeX>,</TeX>{" "}
                    <MathquillInput
                        value={this.props.startY}
                        onChange={(startY) => this.handleChange({startY})}
                    />
                    <TeX>\Large)</TeX>
                </div>
                <div className="perseus-widget-row">
                    End: <TeX>\Large(</TeX>
                    <MathquillInput
                        value={this.props.endX}
                        onChange={(endX) => this.handleChange({endX})}
                    />
                    <TeX>,</TeX>{" "}
                    <MathquillInput
                        value={this.props.endY}
                        onChange={(endY) => this.handleChange({endY})}
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
                    &nbsp; &nbsp;
                    <ArrowPicker
                        value={this.props.arrows}
                        onChange={(arrows) => this.handleChange({arrows})}
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

export default LineEditor;
