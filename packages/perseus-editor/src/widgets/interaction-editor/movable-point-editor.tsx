import {
    components,
    Changeable,
    Dependencies,
    EditorJsonify,
} from "@khanacademy/perseus";
import * as React from "react";

import ConstraintEditor from "./constraint-editor";
import MathquillInput from "./mathquill-input";

type ChangeFn = typeof Changeable.change;

const {NumberInput} = components;
const {getDependencies} = Dependencies;

type Props = Changeable.ChangeableProps & {
    startX: string;
    startY: string;
    constraint: string;
    snap: number;
    constraintFn: string;
    varSubscript: number;
};

type DefaultProps = {
    startX: Props["startX"];
    startY: Props["startY"];
    constraint: Props["constraint"];
    snap: Props["snap"];
    constraintFn: Props["constraintFn"];
};

// Editor for interactive movable points
// TODO(eater): Rethink how constraints are represented
class MovablePointEditor extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        startX: "0",
        startY: "0",
        constraint: "none",
        snap: 0.5,
        constraintFn: "0",
        // @ts-expect-error - TS2561
        constraintXMin: "-10",
        constraintXMax: "10",
        constraintYMin: "-10",
        constraintYMax: "10",
    };

    change: ChangeFn = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        const {TeX} = getDependencies();

        return (
            <div className="graph-settings">
                <div className="perseus-widget-row">
                    Start: <TeX>\Large(</TeX>
                    <MathquillInput
                        value={this.props.startX}
                        onChange={this.change("startX")}
                    />
                    <TeX>,</TeX>{" "}
                    <MathquillInput
                        value={this.props.startY}
                        onChange={this.change("startY")}
                    />
                    <TeX>\Large)</TeX>
                </div>
                <div className="perseus-widget-row">
                    Update <TeX>(x_n, y_n)</TeX> for <TeX>n =</TeX>{" "}
                    <NumberInput
                        value={this.props.varSubscript}
                        placeholder={0}
                        onChange={this.change("varSubscript")}
                    />
                </div>
                <ConstraintEditor {...this.props} />
            </div>
        );
    }
}

export default MovablePointEditor;
