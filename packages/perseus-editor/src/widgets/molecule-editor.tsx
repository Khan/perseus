import {components, Changeable, EditorJsonify} from "@khanacademy/perseus";
import * as React from "react";

import type {PerseusMoleculeRendererWidgetOptions} from "@khanacademy/perseus-core";

const {NumberInput, TextInput} = components;

type Props = {
    rotationAngle?: number;
    smiles?: string;
    onChange: (partial: Partial<PerseusMoleculeRendererWidgetOptions>) => void;
};

class MoleculeWidgetEditor extends React.Component<Props> {
    static widgetName = "molecule-renderer" as const;

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    updateMolecule: (arg1: string) => void = (newValue) => {
        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
        this.change({smiles: newValue});
    };

    updateRotation: (newValue: number | null) => void = (newValue) => {
        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
        this.change({rotationAngle: newValue});
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        return (
            <div>
                <div>
                    {/* HACK(colin): nbsp for spacing instead of CSS */}
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
