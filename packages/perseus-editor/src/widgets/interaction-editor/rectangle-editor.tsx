import {Dependencies, KhanColors} from "@khanacademy/perseus";
import * as React from "react";

import ColorPicker from "./color-picker";
import MathquillInput from "./mathquill-input";

import type {PerseusInteractionRectangleElementOptions} from "@khanacademy/perseus-core";

interface Props extends PerseusInteractionRectangleElementOptions {
    onChange: (options: PerseusInteractionRectangleElementOptions) => void;
}

// Editor for rectangles
class RectangleEditor extends React.Component<Props> {
    static defaultProps: PerseusInteractionRectangleElementOptions = {
        coordX: "-5",
        coordY: "5",
        width: "2",
        height: "3",
        color: KhanColors.LIGHT_BLUE,
    };

    handleChange(changes: Partial<PerseusInteractionRectangleElementOptions>) {
        this.props.onChange({
            coordX: this.props.coordX,
            coordY: this.props.coordY,
            width: this.props.width,
            height: this.props.height,
            color: this.props.color,
            ...changes,
        });
    }

    render(): React.ReactNode {
        const {TeX} = Dependencies.getDependencies();

        return (
            <div className="graph-settings">
                <div className="perseus-widget-row">
                    Bottom left: <TeX>\Large(</TeX>
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
                    Width:{" "}
                    <MathquillInput
                        value={this.props.width}
                        onChange={(width) => this.handleChange({width})}
                    />
                </div>
                <div className="perseus-widget-row">
                    Height:{" "}
                    <MathquillInput
                        value={this.props.height}
                        onChange={(height) => this.handleChange({height})}
                    />
                </div>
                <div className="perseus-widget-row">
                    <ColorPicker
                        value={this.props.color}
                        lightColors={true}
                        onChange={(color) => this.handleChange({color})}
                    />
                </div>
                <div className="perseus-widget-row">
                    You want a border? Sorry, draw your own.
                </div>
            </div>
        );
    }
}

export default RectangleEditor;
