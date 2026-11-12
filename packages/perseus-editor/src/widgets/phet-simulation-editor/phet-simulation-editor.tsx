import {
    phetSimulationLogic,
    type PerseusPhetSimulationWidgetOptions,
} from "@khanacademy/perseus-core";
import {LabeledTextField} from "@khanacademy/wonder-blocks-form";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import type {WidgetEditorProps} from "../widget-editor-props";

type Props = WidgetEditorProps<PerseusPhetSimulationWidgetOptions>;

/**
 * An editor for adding a PhET simulation widget that allows users to interact
 * with physics simulations.
 */
class PhetSimulationEditor extends React.Component<Props> {
    static defaultProps: PerseusPhetSimulationWidgetOptions =
        phetSimulationLogic.defaultWidgetOptions;

    handleChange(changes: Partial<PerseusPhetSimulationWidgetOptions>) {
        this.props.onChange({
            url: this.props.url,
            description: this.props.description,
            ...changes,
        });
    }

    render(): React.ReactNode {
        return (
            <div>
                <LabeledTextField
                    label={"URL"}
                    value={this.props.url}
                    onChange={(url: string) => this.handleChange({url})}
                    style={{
                        marginBlockEnd: spacing.large_24,
                    }}
                />
                <LabeledTextField
                    label={"Description"}
                    value={this.props.description}
                    onChange={(description: string) =>
                        this.handleChange({description})
                    }
                />
            </div>
        );
    }
}

export default PhetSimulationEditor;
