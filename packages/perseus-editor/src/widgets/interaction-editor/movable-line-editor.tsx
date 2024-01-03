import {
    components,
    Changeable,
    Dependencies,
    EditorJsonify,
} from "@khanacademy/perseus";
import * as React from "react";
import _ from "underscore";

import ConstraintEditor from "./constraint-editor";

const {MathInput, NumberInput} = components;
const {getDependencies} = Dependencies;

type Props = Changeable.ChangeableProps & {
    startX: string;
    startY: string;
    endX: string;
    endY: string;
    constraint: string;
    snap: number;
    constraintFn: string;
    startSubscript: number;
    endSubscript: number;
};

type DefaultProps = {
    startX: Props["startX"];
    startY: Props["startY"];
    endX: Props["endX"];
    endY: Props["endY"];
    constraint: Props["constraint"];
    snap: Props["snap"];
    constraintFn: Props["constraintFn"];
};

//
// Editor for interactive movable line segments
//
// TODO(eater): Factor this out
// TODO(eater): Rethink how constraints are represented
//
class MovableLineEditor extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        startX: "-5",
        startY: "5",
        endX: "5",
        endY: "5",
        constraint: "none",
        snap: 0.5,
        constraintFn: "0",
        // @ts-expect-error - TS2561
        constraintXMin: "-10",
        constraintXMax: "10",
        constraintYMin: "-10",
        constraintYMax: "10",
    };

    change = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        const {TeX} = getDependencies();
        const analyticsStub = {onAnalyticsEvent: () => Promise.resolve()};

        return (
            <div className="graph-settings">
                Initial position:
                <div className="perseus-widget-row">
                    Start: <TeX>\Large(</TeX>
                    <MathInput
                        buttonsVisible="never"
                        value={this.props.startX}
                        onChange={this.change("startX")}
                        analytics={analyticsStub}
                    />
                    <TeX>,</TeX>{" "}
                    <MathInput
                        buttonsVisible="never"
                        value={this.props.startY}
                        onChange={this.change("startY")}
                        analytics={analyticsStub}
                    />
                    <TeX>\Large)</TeX>
                </div>
                <div className="perseus-widget-row">
                    End: <TeX>\Large(</TeX>
                    <MathInput
                        buttonsVisible="never"
                        value={this.props.endX}
                        onChange={this.change("endX")}
                        analytics={analyticsStub}
                    />
                    <TeX>,</TeX>{" "}
                    <MathInput
                        buttonsVisible="never"
                        value={this.props.endY}
                        onChange={this.change("endY")}
                        analytics={analyticsStub}
                    />
                    <TeX>\Large)</TeX>
                </div>
                <div className="perseus-widget-row">
                    Start updates <TeX>(x_n, y_n)</TeX> for <TeX>n =</TeX>
                    <NumberInput
                        value={this.props.startSubscript}
                        placeholder={0}
                        onChange={this.change("startSubscript")}
                    />
                </div>
                <div className="perseus-widget-row">
                    End updates <TeX>(x_m, y_m)</TeX> for <TeX>m =</TeX>
                    <NumberInput
                        value={this.props.endSubscript}
                        placeholder={0}
                        onChange={this.change("endSubscript")}
                    />
                </div>
                <div className="perseus-widget-row">
                    All constraints are applied to the start point.
                </div>
                <ConstraintEditor {...this.props} />
            </div>
        );
    }
}

export default MovableLineEditor;
