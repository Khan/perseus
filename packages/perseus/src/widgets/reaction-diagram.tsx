import * as React from "react";

import {PerseusI18nContext} from "../components/i18n-context";

import {Molecule} from "./molecule";

import type {
    PerseusReactionDiagramSeparators,
    PerseusReactionDiagramWidgetOptions,
} from "../perseus-types";
import type {WidgetExports} from "../types";

type SeparatorProps = {
    data: PerseusReactionDiagramSeparators;
    index: number;
};

class Separator extends React.Component<SeparatorProps> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    arrowLength = 100;

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
                    {this.context.strings.rightArrow}
                </canvas>
                <div className="below-text">{this.props.data.bottomText}</div>
            </div>
        );
    }
}

type ReactionDiagramProps = {
    rotationAngle: PerseusReactionDiagramWidgetOptions["rotationAngle"];
    separators: PerseusReactionDiagramWidgetOptions["separators"];
    smiles: PerseusReactionDiagramWidgetOptions["smiles"];
    widgetId: PerseusReactionDiagramWidgetOptions["widgetId"];
};

type DefaultProps = {
    rotationAngle: ReactionDiagramProps["rotationAngle"];
    separators: ReactionDiagramProps["separators"];
    smiles: ReactionDiagramProps["smiles"];
};
class ReactionDiagramWidget extends React.Component<ReactionDiagramProps> {
    static defaultProps: DefaultProps = {
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
                                widgetId={id}
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
