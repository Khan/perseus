/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/sort-comp */
import {LabeledTextField} from "@khanacademy/wonder-blocks-form";
import * as React from "react";

import type {PerseusPhetSimWidgetOptions} from "@khanacademy/perseus/src/perseus-types";

type DefaultProps = {
    url: PerseusPhetSimWidgetOptions["url"];
    description: PerseusPhetSimWidgetOptions["description"];
};

type Props = DefaultProps & {
    onChange: (arg1: {
        url?: Props["url"];
        description?: Props["description"];
    }) => void;
};

class PhetSimEditor extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        url: "",
        description: "",
    };

    static widgetName = "phet-sim" as const;

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

    serialize(): PerseusPhetSimWidgetOptions {
        return {
            url: this.props.url,
            description: this.props.description,
        };
    }
}

export default PhetSimEditor;
