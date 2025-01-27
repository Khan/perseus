/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {components, Changeable, EditorJsonify} from "@khanacademy/perseus";
import {passageRefLogic} from "@khanacademy/perseus-core";
import PropTypes from "prop-types";
import * as React from "react";

import type {PassageRefDefaultWidgetOptions} from "@khanacademy/perseus-core";

const {InfoTip, NumberInput, TextInput} = components;

type Props = any;

class PassageRefEditor extends React.Component<Props> {
    static propTypes: Props = {
        ...Changeable.propTypes,
        passageNumber: PropTypes.number,
        referenceNumber: PropTypes.number,
        summaryText: PropTypes.string,
    };

    static widgetName = "passage-ref" as const;

    static defaultProps: PassageRefDefaultWidgetOptions =
        passageRefLogic.defaultWidgetOptions;

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        return (
            <div>
                <div>
                    <label>
                        {"Passage Number: "}
                        <NumberInput
                            value={this.props.passageNumber}
                            // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                            onChange={this.change("passageNumber")}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        {"Reference Number: "}
                        <NumberInput
                            value={this.props.referenceNumber}
                            // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                            onChange={this.change("referenceNumber")}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        {"Summary Text: "}
                        <TextInput
                            value={this.props.summaryText}
                            // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
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
