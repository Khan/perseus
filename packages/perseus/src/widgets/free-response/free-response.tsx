/**
 * This widget is used for freeform text input. It is configured with a question
 * as an option and renders the question text along with a text input area where
 * the user can type any text as their answer. The initial use case for this widget
 * is "short answer" type questions.
 */

import {View, Id} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {PerseusFreeResponseWidgetOptions} from "@khanacademy/perseus-core";
import type {UserInput} from "@khanacademy/perseus-score";

type RenderProps = PerseusFreeResponseWidgetOptions;
type Props = WidgetProps<RenderProps, PerseusFreeResponseWidgetOptions>;

type State = {
    currentValue: string;
};

export class FreeResponse
    extends React.Component<Props, State>
    implements Widget
{
    state: State = {
        currentValue: "",
    };

    handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({currentValue: event.target.value});
    };

    getUserInput(): UserInput {
        return {
            currentValue: this.state.currentValue,
        };
    }

    render(): React.ReactNode {
        return (
            <Id>
                {(id) => {
                    return (
                        <View>
                            <label htmlFor={id}>{this.props.question}</label>
                            <textarea
                                id={id}
                                value={this.state.currentValue}
                                onChange={this.handleChange}
                            />
                        </View>
                    );
                }}
            </Id>
        );
    }
}

export default {
    name: "free-response",
    accessible: true,
    displayName: "Free Response",
    widget: FreeResponse,
    // Hides widget from content creators until full release
    hidden: true,
} as WidgetExports<typeof FreeResponse>;
