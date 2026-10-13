import {components, Dependencies} from "@khanacademy/perseus";
import * as React from "react";

import MathquillInput from "./mathquill-input";

const {ButtonGroup, NumberInput} = components;

interface ConstraintOptions {
    constraint: string;
    constraintFn: string;
    constraintXMax: string;
    constraintXMin: string;
    constraintYMax: string;
    constraintYMin: string;
    snap: number;
}

interface Props extends ConstraintOptions {
    onChange: (options: ConstraintOptions) => void;
}

class ConstraintEditor extends React.Component<Props> {
    static defaultProps: ConstraintOptions = {
        constraint: "none",
        snap: 0.5,
        constraintFn: "0",
        constraintXMin: "-10",
        constraintXMax: "10",
        constraintYMin: "-10",
        constraintYMax: "10",
    };

    handleChange(changes: Partial<ConstraintOptions>) {
        this.props.onChange({
            constraint: this.props.constraint,
            constraintFn: this.props.constraintFn,
            constraintXMax: this.props.constraintXMax,
            constraintXMin: this.props.constraintXMin,
            constraintYMax: this.props.constraintYMax,
            constraintYMin: this.props.constraintYMin,
            snap: this.props.snap,
            ...changes,
        });
    }

    render(): React.ReactNode {
        const {TeX} = Dependencies.getDependencies();

        return (
            <div>
                <div className="perseus-widget-row">
                    Constraint:{" "}
                    <ButtonGroup
                        value={this.props.constraint}
                        buttons={[
                            {value: "none", content: "None"},
                            {value: "snap", content: "Snap"},
                            {value: "x", content: "x="},
                            {value: "y", content: "y="},
                        ]}
                        onChange={(constraint) =>
                            this.handleChange({constraint})
                        }
                    />
                </div>
                {this.props.constraint === "snap" && (
                    <div className="perseus-widget-row">
                        Snap:{" "}
                        <NumberInput
                            value={this.props.snap}
                            placeholder={0}
                            onChange={(snap) => this.handleChange({snap})}
                        />
                    </div>
                )}
                {this.props.constraint === "x" && (
                    <div className="graph-settings">
                        <div className="perseus-widget-row">
                            <TeX>x=</TeX>{" "}
                            <MathquillInput
                                value={this.props.constraintFn}
                                onChange={(constraintFn) =>
                                    this.handleChange({constraintFn})
                                }
                            />
                        </div>
                    </div>
                )}
                {this.props.constraint === "y" && (
                    <div className="graph-settings">
                        <div className="perseus-widget-row">
                            <TeX>y=</TeX>{" "}
                            <MathquillInput
                                value={this.props.constraintFn}
                                onChange={(constraintFn) =>
                                    this.handleChange({constraintFn})
                                }
                            />
                        </div>
                    </div>
                )}
                Ensure these are set so nothing can be dragged off the canvas:
                <div className="perseus-widget-row">
                    <div className="perseus-widget-row">
                        <TeX>x \in \Large[</TeX>{" "}
                        <MathquillInput
                            value={this.props.constraintXMin}
                            onChange={(constraintXMin) =>
                                this.handleChange({constraintXMin})
                            }
                        />
                        <TeX>, </TeX>{" "}
                        <MathquillInput
                            value={this.props.constraintXMax}
                            onChange={(constraintXMax) =>
                                this.handleChange({constraintXMax})
                            }
                        />{" "}
                        <TeX>\Large]</TeX>
                    </div>
                </div>
                <div className="perseus-widget-row">
                    <div className="perseus-widget-row">
                        <TeX>y \in \Large[</TeX>{" "}
                        <MathquillInput
                            value={this.props.constraintYMin}
                            onChange={(constraintYMin) =>
                                this.handleChange({constraintYMin})
                            }
                        />
                        <TeX>, </TeX>{" "}
                        <MathquillInput
                            value={this.props.constraintYMax}
                            onChange={(constraintYMax) =>
                                this.handleChange({constraintYMax})
                            }
                        />{" "}
                        <TeX>\Large]</TeX>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConstraintEditor;
