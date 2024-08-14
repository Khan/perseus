/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/sort-comp */
import {Changeable, EditorJsonify} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabeledTextField} from "@khanacademy/wonder-blocks-form";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import PropTypes from "prop-types";
import * as React from "react";

type Props = {
    onChange: (args: any) => void;
    url: string;
    description: string;
};

type DefaultProps = {
    url: Props["url"];
    description: Props["description"];
};

class PhetSimEditor extends React.Component<Props> {
    static propTypes = {
        onChange: PropTypes.func,
        url: PropTypes.string,
        description: PropTypes.string,
    };
/*
    static defaultProps: DefaultProps = {
        url: "",
        description: "",
    };
 */
    static widgetName = "phet-sim" as const;

    change(...args) {
        this.props.onChange(args);
    }

    render(): React.ReactNode {
        const sandboxProperties = "allow-same-origin allow-scripts";

        return (
            <div>
                <LabeledTextField
                    label="URL"
                    value={this.props.url}
                    onChange={(url: string) => this.change({url})}
                />
                <br />
                <LabeledTextField
                    label="Description"
                    value={this.props.description}
                    onChange={(description: string) => this.change({description})}
                />
                <br />
                <LabelMedium>
                    Preview
                    <View
                        style={{
                            position: "relative",
                            width: "100%",
                            paddingBottom: "100%",
                            height: 0,
                        }}
                    >
                        <iframe
                            sandbox={sandboxProperties}
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                maxWidth: 400,
                                maxHeight: 400,
                            }}
                            src={this.props.url}
                            srcDoc={this.props.description}
                        />
                    </View>
                </LabelMedium>
            </div>
        );
    }

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };
}

export default PhetSimEditor;
