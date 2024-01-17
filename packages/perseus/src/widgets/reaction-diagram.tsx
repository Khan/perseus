import * as i18n from "@khanacademy/wonder-blocks-i18n";
import PropTypes from "prop-types";
import * as React from "react";

import {Molecule} from "./molecule";

import type {WidgetExports} from "../types";

class Separator extends React.Component<any> {
    arrowLength = 100;

    static propTypes = {
        // TODO(colin): figure out and add shape.
        data: PropTypes.any,
        index: PropTypes.number,
    };

    componentDidMount() {
        this.drawArrow();
    }

    componentDidUpdate() {
        this.drawArrow();
    }

    drawArrow = () => {
        // eslint-disable-next-line react/no-string-refs
        const canvas = this.refs["arrowCanvas" + this.props.index];
        // @ts-expect-error - TS2339 - Property 'getContext' does not exist on type 'ReactInstance'.
        const ctx = canvas.getContext("2d");
        // @ts-expect-error - TS2339 - Property 'width' does not exist on type 'ReactInstance'. | TS2339 - Property 'height' does not exist on type 'ReactInstance'.
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const path = new Path2D();
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        const offset = 5;
        // @ts-expect-error - TS2339 - Property 'height' does not exist on type 'ReactInstance'.
        path.moveTo(offset, canvas.height / 2);
        // @ts-expect-error - TS2339 - Property 'width' does not exist on type 'ReactInstance'. | TS2339 - Property 'height' does not exist on type 'ReactInstance'.
        path.lineTo(canvas.width - offset, canvas.height / 2);
        // @ts-expect-error - TS2339 - Property 'width' does not exist on type 'ReactInstance'. | TS2339 - Property 'height' does not exist on type 'ReactInstance'.
        path.moveTo(canvas.width - 2 * offset, canvas.height / 2 - offset);
        // @ts-expect-error - TS2339 - Property 'width' does not exist on type 'ReactInstance'. | TS2339 - Property 'height' does not exist on type 'ReactInstance'.
        path.lineTo(canvas.width - offset, canvas.height / 2);
        // @ts-expect-error - TS2339 - Property 'width' does not exist on type 'ReactInstance'. | TS2339 - Property 'height' does not exist on type 'ReactInstance'.
        path.moveTo(canvas.width - 2 * offset, canvas.height / 2 + offset);
        // @ts-expect-error - TS2339 - Property 'width' does not exist on type 'ReactInstance'. | TS2339 - Property 'height' does not exist on type 'ReactInstance'.
        path.lineTo(canvas.width - offset, canvas.height / 2);
        ctx.stroke(path);
    };

    render(): React.ReactNode {
        return (
            <div className="arrow-container">
                <div className="above-text">{this.props.data.topText}</div>
                <canvas
                    height="30"
                    id={"arrowCanvas" + this.props.index}
                    ref={"arrowCanvas" + this.props.index}
                    width={this.arrowLength}
                >
                    {i18n._("Reaction arrow pointing to the right.")}
                </canvas>
                <div className="below-text">{this.props.data.bottomText}</div>
            </div>
        );
    }
}

class ReactionDiagramWidget extends React.Component<any> {
    static propTypes = {
        // TODO(colin): at the moment, these must be arrays of two elements;
        // we're limited to a single reaction step.  At some point, add support
        // for more steps in the reaction.
        rotationAngle: PropTypes.arrayOf(PropTypes.number),
        // eslint-disable-next-line react/forbid-prop-types
        separators: PropTypes.arrayOf(PropTypes.object),
        smiles: PropTypes.arrayOf(PropTypes.string),
        widgetId: PropTypes.string,
    };

    static defaultProps: any = {
        smiles: [],
        rotationAngle: [],
        separators: [],
    };

    simpleValidate: (arg1: any) => any = () => {
        return {type: "points", earned: 0, total: 0, message: null};
    };

    getUserInput: () => any = () => {
        return [];
    };

    validate: (arg1: any, arg2: any) => any = (state, rubric) => {
        // TODO(colin): this appears to be part of the perseus interface.
        // Figure out if there's a more appropriate value to return.
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    };

    focus: () => boolean = () => {
        return true;
    };

    render(): React.ReactNode {
        return (
            // eslint-disable-next-line react/no-string-refs
            <div className="reaction" ref="reaction">
                {this.props.smiles.map((s, i) => {
                    const id = this.props.widgetId + "-" + i;
                    return (
                        <div key={id} className="molecule-container">
                            <Molecule
                                id={id}
                                rotationAngle={this.props.rotationAngle[i]}
                                smiles={s}
                            />
                            {i === this.props.smiles.length - 1 ? null : (
                                <Separator
                                    data={this.props.separators[i]}
                                    index={i}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default {
    name: "reaction-diagram",
    displayName: "Chemical reaction diagram (deprecated)",
    hidden: true,
    widget: ReactionDiagramWidget,
} as WidgetExports<typeof ReactionDiagramWidget>;
