/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {makeSafeUrl} from "@khanacademy/perseus-core";
import {
    phetSimulationLogic,
    type PerseusPhetSimulationWidgetOptions,
    type PhetSimulationDefaultWidgetOptions,
} from "@khanacademy/perseus-core";
import {LabeledTextField} from "@khanacademy/wonder-blocks-form";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

type Props = PhetSimulationDefaultWidgetOptions & {
    onChange: (arg1: {
        url?: Props["url"];
        description?: Props["description"];
    }) => void;
};

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding a PhET simulation widget that allows users to interact
 * with physics simulations.
 */
class PhetSimulationEditor extends React.Component<Props> {
    static defaultProps: PhetSimulationDefaultWidgetOptions =
        phetSimulationLogic.defaultWidgetOptions;

    static widgetName = "phet-simulation" as const;

    serialize(): PerseusPhetSimulationWidgetOptions {
        return {
            url: this.props.url,
            description: this.props.description,
        };
    }

    // TODO(LEMS-3643): Remove `getSaveWarnings` once the frontend uses
    // the new linter rules for save warnings.
    getSaveWarnings: () => ReadonlyArray<string> = () => {
        if (
            makeSafeUrl(this.props.url, "en", "https://phet.colorado.edu") ===
            null
        ) {
            return ["Please enter a URL from the PhET domain."];
        }
        return [];
    };

    render(): React.ReactNode {
        return (
            <div>
                <LabeledTextField
                    label={"URL"}
                    value={this.props.url}
                    onChange={(url: string) => this.props.onChange({url})}
                    style={{
                        marginBottom: spacing.large_24,
                    }}
                />
                <LabeledTextField
                    label={"Description"}
                    value={this.props.description}
                    onChange={(description: string) =>
                        this.props.onChange({description})
                    }
                />
            </div>
        );
    }
}

export default PhetSimulationEditor;
