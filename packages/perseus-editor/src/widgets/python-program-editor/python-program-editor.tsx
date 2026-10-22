import {components} from "@khanacademy/perseus";
import {pythonProgramLogic} from "@khanacademy/perseus-core";
import * as React from "react";

import type {WidgetEditorProps} from "../widget-editor-props";
import type {PerseusPythonProgramWidgetOptions} from "@khanacademy/perseus-core";

const {NumberInput, TextInput} = components;

type Props = WidgetEditorProps<PerseusPythonProgramWidgetOptions>;

export function validateOptions(
    height: Props["height"],
    programID: Props["programID"],
): ReadonlyArray<string> {
    const errors: Array<string> = [];

    if (programID === "") {
        errors.push("The program ID is required.");
    }

    if (!Number.isInteger(height) || height < 1) {
        errors.push("The height must be a positive integer.");
    }

    return errors;
}

/**
 * An editor for adding a Python program widget that allows users to write, edit and execute Python code.
 */
class PythonProgramEditor extends React.Component<Props> {
    static defaultProps: PerseusPythonProgramWidgetOptions =
        pythonProgramLogic.defaultWidgetOptions;

    handleChange(changes: Partial<PerseusPythonProgramWidgetOptions>) {
        this.props.onChange({
            programID: this.props.programID,
            height: this.props.height,
            ...changes,
        });
    }

    serialize(): PerseusPythonProgramWidgetOptions {
        return {
            programID: this.props.programID,
            height: this.props.height,
        };
    }

    // TODO(LEMS-3643): Remove `getSaveWarnings` once the frontend uses
    // the new linter rules for save warnings.
    // Remove `validateOptions` since it's already being tested
    // within the linter code.
    getSaveWarnings: () => ReadonlyArray<string> = () => {
        return validateOptions(this.props.height, this.props.programID);
    };

    render(): React.ReactNode {
        return (
            <div>
                <label>
                    User Program ID:{" "}
                    <TextInput
                        value={this.props.programID}
                        onChange={(programID) => this.handleChange({programID})}
                        placeholder="123"
                    />
                </label>
                <br />
                <label>
                    Height:{" "}
                    <NumberInput
                        value={this.props.height}
                        onChange={(height) => this.handleChange({height})}
                        placeholder="400"
                    />
                </label>
            </div>
        );
    }
}

export default PythonProgramEditor;
