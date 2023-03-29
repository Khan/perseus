import {components, Changeable, EditorJsonify} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";

const {InfoTip, NumberInput, TextInput} = components;

type Props = any;

class PassageRefEditor extends React.Component<Props> {
    static propTypes: Props = {
        ...Changeable.propTypes,
        passageNumber: PropTypes.number,
        referenceNumber: PropTypes.number,
        summaryText: PropTypes.string,
    };

    static widgetName: 'passage-ref' = "passage-ref";

    static defaultProps: Props = {
        passageNumber: 1,
        referenceNumber: 1,
        summaryText: "",
    };

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactElement {
        return (
            <div>
                <div>
                    <label>
                        {"Passage Number: "}
                        <NumberInput
                            value={this.props.passageNumber}
                            onChange={this.change("passageNumber")}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        {"Reference Number: "}
                        <NumberInput
                            value={this.props.referenceNumber}
                            onChange={this.change("referenceNumber")}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        {"Summary Text: "}
                        <TextInput
                            value={this.props.summaryText}
                            onChange={this.change("summaryText")}
                        />
                        <InfoTip>
                            <p>
                                Short summary of the referenced section. This
                                will be included in parentheses and quotes
                                automatically.
                            </p>
                            <p>Ex: The start ... the end</p>
                        </InfoTip>
                    </label>
                </div>
            </div>
        );
    }
}

export default PassageRefEditor;
