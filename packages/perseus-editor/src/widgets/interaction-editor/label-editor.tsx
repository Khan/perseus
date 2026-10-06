import {components, Dependencies, KhanColors} from "@khanacademy/perseus";
import * as React from "react";

import ColorPicker from "./color-picker";
import MathquillInput from "./mathquill-input";

import type {PerseusInteractionLabelElementOptions} from "@khanacademy/perseus-core";

const {TextInput} = components;

interface Props extends PerseusInteractionLabelElementOptions {
    onChange: (options: PerseusInteractionLabelElementOptions) => void;
}

// Editor for labels
class LabelEditor extends React.Component<Props> {
    static defaultProps: PerseusInteractionLabelElementOptions = {
        coordX: "0",
        coordY: "0",
        color: KhanColors.BLACK,
        label: "\\phi",
    };

    handleChange(changes: Partial<PerseusInteractionLabelElementOptions>) {
        this.props.onChange({
            label: this.props.label,
            color: this.props.color,
            coordX: this.props.coordX,
            coordY: this.props.coordY,
            ...changes,
        });
    }

    render(): React.ReactNode {
        const {TeX} = Dependencies.getDependencies();

        return (
            <div className="graph-settings">
                <div className="perseus-widget-row">
                    <TextInput
                        value={this.props.label}
                        onChange={(label) => this.handleChange({label})}
                        style={{
                            width: "100%",
                        }}
                    />
                </div>
                <div className="perseus-widget-row">
                    Location: <TeX>\Large(</TeX>
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

export default LabelEditor;
