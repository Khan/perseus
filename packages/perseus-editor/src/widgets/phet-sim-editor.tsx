/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/sort-comp */
import {EditorJsonify} from "@khanacademy/perseus";
import * as React from "react";

import {LabeledTextField} from "@khanacademy/wonder-blocks-form";

type Props = {
    url: string;
    description: string;
    onChange: (arg1: {
        url?: Props["url"];
        description?: Props["description"];
    }) => void;
};

type DefaultProps = {
    url: Props["url"];
    description: Props["description"];
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

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };
}

export default PhetSimEditor;
