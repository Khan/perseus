// @flow
import {components, Changeable, EditorJsonify} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";

const {NumberInput, TextInput} = components;

type Props = $FlowFixMe;

class MoleculeWidgetEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
        rotationAngle: PropTypes.number,
        smiles: PropTypes.string,
    };

    static widgetName: "molecule-renderer" = "molecule-renderer";

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    updateMolecule: (string) => void = (newValue) => {
        this.change({smiles: newValue});
    };

    updateRotation: (string) => void = (newValue) => {
        this.change({rotationAngle: newValue});
    };

    serialize: () => $FlowFixMe = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.Node {
        return (
            <div>
                <div>
                    {/* TODO(colin): instead of nbsp hacks, use styles to get
                    the spacing right. */}
                    <label>
                        SMILES:&nbsp;
                        <TextInput
                            onChange={this.updateMolecule}
                            value={this.props.smiles}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Rotation (deg):&nbsp;
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
