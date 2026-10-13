import {Dependencies, KhanColors} from "@khanacademy/perseus";
import * as React from "react";

import ColorPicker from "./color-picker";
import MathquillInput from "./mathquill-input";

import type {PerseusInteractionPointElementOptions} from "@khanacademy/perseus-core";

interface Props extends PerseusInteractionPointElementOptions {
    onChange: (options: PerseusInteractionPointElementOptions) => void;
}

// Editor for non-interactive points
class PointEditor extends React.Component<Props> {
    static defaultProps: PerseusInteractionPointElementOptions = {
        coordX: "0",
        coordY: "0",
        color: KhanColors.BLACK,
    };

    handleChange(changes: Partial<PerseusInteractionPointElementOptions>) {
        this.props.onChange({
            coordX: this.props.coordX,
            coordY: this.props.coordY,
            color: this.props.color,
            ...changes,
        });
    }

    render(): React.ReactNode {
        const {TeX} = Dependencies.getDependencies();

        return (
            <div className="graph-settings">
                <div className="perseus-widget-row">
                    Coordinate: <TeX>\Large(</TeX>
                    <MathquillInput
                        value={this.props.coordX}
                        onChange={(coordX) => this.handleChange({coordX})}
                    />
                    <TeX>,</TeX>{" "}
                    <MathquillInput
                        value={this.props.coordY}
                        onChange={(coordY) => this.handleChange({coordY})}
                    />
                    <TeX>\Large)</TeX>
                </div>
                <div className="perseus-widget-row">
                    <ColorPicker
                        value={this.props.color}
                        onChange={(color) => this.handleChange({color})}
                    />
                </div>
            </div>
        );
    }
}

export default PointEditor;
