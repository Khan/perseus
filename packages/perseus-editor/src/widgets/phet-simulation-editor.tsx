/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {makeSafeUrl} from "@khanacademy/perseus";
import {LabeledTextField} from "@khanacademy/wonder-blocks-form";
import * as React from "react";

import type {PerseusPhetSimulationWidgetOptions} from "@khanacademy/perseus";

type DefaultProps = {
    url: PerseusPhetSimulationWidgetOptions["url"];
    description: PerseusPhetSimulationWidgetOptions["description"];
};

type Props = DefaultProps & {
    onChange: (arg1: {
        url?: Props["url"];
        description?: Props["description"];
    }) => void;
};

class PhetSimulationEditor extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        url: "",
        description: "",
    };

    static widgetName = "phet-simulation" as const;

    serialize(): PerseusPhetSimulationWidgetOptions {
        return {
            url: this.props.url,
            description: this.props.description,
        };
    }

    getSaveWarnings(): ReadonlyArray<string> {
        if (makeSafeUrl(this.props.url, "en") === null) {
            return ["Please enter a URL from the PhET domain."];
        }
        return [];
    }

    render(): React.ReactNode {
        return (
            <div>
                <LabeledTextField
                    label={"URL"}
                    value={this.props.url}
                    onChange={(url: string) => this.props.onChange({url})}
                />
                <br />
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
