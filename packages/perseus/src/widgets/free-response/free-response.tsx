/**
 * This widget is used for freeform text input. It is configured with a question
 * as an option and renders the question text along with a text input area where
 * the user can type any text as their answer. The initial use case for this widget
 * is "short answer" type questions.
 */

import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {PerseusFreeResponseWidgetOptions} from "@khanacademy/perseus-core";
import type {PerseusFreeResponseUserInput} from "@khanacademy/perseus-score";

type RenderProps = Pick<PerseusFreeResponseWidgetOptions, "question">;
type Props = WidgetProps<RenderProps>;

type State = {
    currentValue: string;
};

// TODO(agoforth): Create a custom validator for the widget that will cause
//   renderer.emptyWidgets() to work when there is no user input.

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

    getUserInput(): PerseusFreeResponseUserInput {
        return {
            currentValue: this.state.currentValue,
        };
    }

    render(): React.ReactNode {
        return (
            <View>
                <label className={css(styles.labelAndTextarea)}>
                    {this.props.question}
                    <textarea
                        value={this.state.currentValue}
                        onChange={this.handleChange}
                    />
                </label>
            </View>
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

const styles = StyleSheet.create({
    labelAndTextarea: {
        display: "flex",
        flexDirection: "column",
        gap: spacing.xSmall_8,
    },
});
