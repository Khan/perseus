import {components, Changeable, EditorJsonify} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";

const {NumberInput, TextInput} = components;

type Props = any;

class ReactionDiagramWidgetEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
        rotationAngle: PropTypes.arrayOf(PropTypes.number),
        // eslint-disable-next-line react/forbid-prop-types
        separators: PropTypes.arrayOf(PropTypes.object),
        smiles: PropTypes.arrayOf(PropTypes.string),
    };

    static widgetName = "reaction-diagram" as const;

    static defaultProps: Props = {
        smiles: ["", ""],
        rotationAngle: [0, 0],
        separators: [{type: "right", topText: "", bottomText: ""}],
    };

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    updateMolecule: (arg1: number) => (arg1: string) => void = (idx) => {
        return function (newValue: string) {
            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            const newSmiles = [...this.props.smiles];
            newSmiles[idx] = newValue;
            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            this.change({smiles: newSmiles});
        }.bind(this);
    };

    updateRotation: (arg1: number) => (arg1: any) => void = (idx) => {
        return function (newValue) {
            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            const newRot = [...this.props.rotationAngle];
            newRot[idx] = newValue;
            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            this.change({rotationAngle: newRot});
        }.bind(this);
    };

    updateSeparators: (arg1: number, arg2: string) => (arg1: string) => void = (
        idx,
        propName,
    ) => {
        return (newValue: string) => {
            const newSep = this.props.separators.map((sep) => {
                return {...sep};
            });
            newSep[idx][propName] = newValue;
            // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
            this.change({separators: newSep});
        };
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        // TODO(colin): use styling instead of &nbsp hacks.
        return (
            <div>
                <div>
                    <label>
                        LHS SMILES:&nbsp;
                        <TextInput
                            onChange={this.updateMolecule(0)}
                            value={this.props.smiles[0]}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        LHS Rotation (deg):&nbsp;
                        <NumberInput
                            onChange={this.updateRotation(0)}
                            value={this.props.rotationAngle[0]}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        RHS SMILES:&nbsp;
                        <TextInput
                            onChange={this.updateMolecule(1)}
                            value={this.props.smiles[1]}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        RHS Rotation (deg):&nbsp;
                        <NumberInput
                            onChange={this.updateRotation(1)}
                            value={this.props.rotationAngle[1]}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Top of arrow text:&nbsp;
                        <TextInput
                            onChange={this.updateSeparators(0, "topText")}
                            value={this.props.separators[0].topText}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Bottom of arrow text:&nbsp;
                        <TextInput
                            onChange={this.updateSeparators(0, "bottomText")}
                            value={this.props.separators[0].bottomText}
                        />
                    </label>
                </div>
            </div>
        );
    }
}

export default ReactionDiagramWidgetEditor;
