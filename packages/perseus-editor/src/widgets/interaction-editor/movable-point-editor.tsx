import {
    components,
    Changeable,
    Dependencies,
    EditorJsonify,
} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import ConstraintEditor from "./constraint-editor";

const {MathInput, NumberInput} = components;
const {getDependencies} = Dependencies;

type MovablePointEditorProps = any;

//
// Editor for interactive movable points
//
// TODO(eater): Factor this out
// TODO(eater): Rethink how constraints are represented
//
class MovablePointEditor extends React.Component<MovablePointEditorProps> {
    static propTypes = {
        ...Changeable.propTypes,
        startX: PropTypes.string,
        startY: PropTypes.string,
        constraint: PropTypes.string,
        snap: PropTypes.number,
        constraintFn: PropTypes.string,
    };

    static defaultProps = {
        startX: "0",
        startY: "0",
        constraint: "none",
        snap: 0.5,
        constraintFn: "0",
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
                    Update <TeX>(x_n, y_n)</TeX> for <TeX>n =</TeX>{" "}
                    <NumberInput
                        value={this.props.varSubscript}
                        placeholder={0}
                        onChange={this.change("varSubscript")}
                    />
                </div>
                {/* @ts-expect-error - TS2769 - No overload matches this call. */}
                <ConstraintEditor {...this.props} />
            </div>
        );
    }
}

export default MovablePointEditor;
