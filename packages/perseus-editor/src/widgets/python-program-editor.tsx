/**
 * This editor is for embedding Khan Academy Python programs.
 */
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
        // TODO(LEMS-3083): Remove eslint suppression
        // eslint-disable-next-line functional/immutable-data
        errors.push("The program ID is required.");
    }

    if (!Number.isInteger(height) || height < 1) {
        // TODO(LEMS-3083): Remove eslint suppression
        // eslint-disable-next-line functional/immutable-data
        errors.push("The height must be a positive integer.");
    }

    return errors;
}

/**
 * This is the main editor for this widget, to specify all the options.
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
