/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {makeSafeUrl} from "@khanacademy/perseus";
import {
    type PerseusPhetSimulationWidgetOptions,
    type PhetSimulationDefaultWidgetOptions,
    phetSimulationLogic,
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

    getSaveWarnings: () => ReadonlyArray<string> = () => {
        if (makeSafeUrl(this.props.url, "en") === null) {
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
