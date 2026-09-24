import {components, Dependencies} from "@khanacademy/perseus";
import * as React from "react";

import ConstraintEditor from "./constraint-editor";
import MathquillInput from "./mathquill-input";

import type {PerseusInteractionMovablePointElementOptions} from "@khanacademy/perseus-core";

const {NumberInput} = components;

interface Props extends PerseusInteractionMovablePointElementOptions {
    onChange: (options: PerseusInteractionMovablePointElementOptions) => void;
}

// Editor for interactive movable points
class MovablePointEditor extends React.Component<Props> {
    static defaultProps: PerseusInteractionMovablePointElementOptions = {
        startX: "0",
        startY: "0",
        constraint: "none",
        snap: 0.5,
        constraintFn: "0",
        constraintXMin: "-10",
        constraintXMax: "10",
        constraintYMin: "-10",
        constraintYMax: "10",
        varSubscript: 0,
    };

    handleChange(
        options: Partial<PerseusInteractionMovablePointElementOptions>,
    ) {
        this.props.onChange({
            startX: this.props.startX,
            startY: this.props.startY,
            constraint: this.props.constraint,
            snap: this.props.snap,
            constraintFn: this.props.constraintFn,
            constraintXMin: this.props.constraintXMin,
            constraintXMax: this.props.constraintXMax,
            constraintYMin: this.props.constraintYMin,
            constraintYMax: this.props.constraintYMax,
            varSubscript: this.props.varSubscript,
            ...options,
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
                    Update <TeX>(x_n, y_n)</TeX> for <TeX>n =</TeX>{" "}
                    <NumberInput
                        value={this.props.varSubscript}
                        placeholder={0}
                        onChange={(varSubscript) =>
                            this.handleChange({varSubscript})
                        }
                    />
                </div>
                <ConstraintEditor
                    {...this.props}
                    onChange={(constraint) => this.handleChange(constraint)}
                />
            </div>
        );
    }
}

export default MovablePointEditor;
