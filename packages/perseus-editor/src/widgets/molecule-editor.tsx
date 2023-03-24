import {components, Changeable, EditorJsonify} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";

const {NumberInput, TextInput} = components;

type Props = any;

class MoleculeWidgetEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
        rotationAngle: PropTypes.number,
        smiles: PropTypes.string,
    };

    static widgetName: 'molecule-renderer' = "molecule-renderer";

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    updateMolecule: (arg1: string) => void = (newValue) => {
// @ts-expect-error [FEI-5003] - TS2554 - Expected 3 arguments, but got 1.
        this.change({smiles: newValue});
    };

    updateRotation: (arg1: string) => void = (newValue) => {
// @ts-expect-error [FEI-5003] - TS2554 - Expected 3 arguments, but got 1.
        this.change({rotationAngle: newValue});
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactElement {
        return (
            <div>
                <div>
                    {/* TODO(colin): instead of nbsp hacks, use styles to get
                    the spacing right. */}
                    <label>
                        SMILES:&nbsp;
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'TextInput' cannot be used as a JSX component. */}
                        <TextInput
                            onChange={this.updateMolecule}
                            value={this.props.smiles}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Rotation (deg):&nbsp;
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'NumberInput' cannot be used as a JSX component. */}
                        <NumberInput
                            onChange={this.updateRotation}
                            value={this.props.rotationAngle}
                        />
                    </label>
                </div>
            </div>
        );
    }
}

export default MoleculeWidgetEditor;
