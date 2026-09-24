import {components, Dependencies} from "@khanacademy/perseus";
import * as React from "react";

import ConstraintEditor from "./constraint-editor";
import MathquillInput from "./mathquill-input";

import type {PerseusInteractionMovableLineElementOptions} from "@khanacademy/perseus-core";

const {NumberInput} = components;

interface Props extends PerseusInteractionMovableLineElementOptions {
    onChange: (options: PerseusInteractionMovableLineElementOptions) => void;
}

// Editor for interactive movable line segments
class MovableLineEditor extends React.Component<Props> {
    static defaultProps: PerseusInteractionMovableLineElementOptions = {
        startX: "-5",
        startY: "5",
        endX: "5",
        endY: "5",
        constraint: "none",
        snap: 0.5,
        constraintFn: "0",
        constraintXMin: "-10",
        constraintXMax: "10",
        constraintYMin: "-10",
        constraintYMax: "10",
        startSubscript: 0,
        endSubscript: 0,
    };

    handleChange(
        changes: Partial<PerseusInteractionMovableLineElementOptions>,
    ) {
        this.props.onChange({
            startX: this.props.startX,
            startY: this.props.startY,
            endX: this.props.endX,
            endY: this.props.endY,
            constraint: this.props.constraint,
            snap: this.props.snap,
            constraintFn: this.props.constraintFn,
            constraintXMin: this.props.constraintXMin,
            constraintXMax: this.props.constraintXMax,
            constraintYMin: this.props.constraintYMin,
            constraintYMax: this.props.constraintYMax,
            startSubscript: this.props.startSubscript,
            endSubscript: this.props.endSubscript,
            ...changes,
        });
    }

    render(): React.ReactNode {
        const {TeX} = Dependencies.getDependencies();

        return (
            <div className="graph-settings">
                Initial position:
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
                    Start updates <TeX>(x_n, y_n)</TeX> for <TeX>n =</TeX>
                    <NumberInput
                        value={this.props.startSubscript}
                        placeholder={0}
                        onChange={(startSubscript) =>
                            this.handleChange({startSubscript})
                        }
                    />
                </div>
                <div className="perseus-widget-row">
                    End updates <TeX>(x_m, y_m)</TeX> for <TeX>m =</TeX>
                    <NumberInput
                        value={this.props.endSubscript}
                        placeholder={0}
                        onChange={(endSubscript) =>
                            this.handleChange({endSubscript})
                        }
                    />
                </div>
                <div className="perseus-widget-row">
                    All constraints are applied to the start point.
                </div>
                <ConstraintEditor
                    {...this.props}
                    onChange={(constraint) => this.handleChange(constraint)}
                />
            </div>
        );
    }
}

export default MovableLineEditor;
