import {components, Changeable} from "@khanacademy/perseus";
import {pythonProgramLogic} from "@khanacademy/perseus-core";
import * as React from "react";

import type {
    PerseusPythonProgramWidgetOptions,
    PythonProgramDefaultWidgetOptions,
} from "@khanacademy/perseus-core";

const {NumberInput, TextInput} = components;

type Props = Changeable.ChangeableProps & {
    programID: string;
    height: number;
};

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

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding a Python program widget that allows users to write, edit and execute Python code.
 */
class PythonProgramEditor extends React.Component<Props> {
    static widgetName = "python-program" as const;

    static defaultProps: PythonProgramDefaultWidgetOptions =
        pythonProgramLogic.defaultWidgetOptions;

    change: (...args: ReadonlyArray<unknown>) => any = (...args) => {
        // @ts-expect-error - TS2345 - Argument of type 'readonly unknown[]' is not assignable to parameter of type 'any[]'.
        return Changeable.change.apply(this, args);
    };

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
                        onChange={this.change("programID")}
                        placeholder="123"
                    />
                </label>
                <br />
                <label>
                    Height:{" "}
                    <NumberInput
                        value={this.props.height}
                        onChange={this.change("height")}
                        placeholder="400"
                    />
                </label>
            </div>
        );
    }
}

export default PythonProgramEditor;
