/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import {action} from "storybook/actions";

import RadioEditor from "../radio/editor";

import type {APIOptions} from "@khanacademy/perseus";
import type {PerseusRadioWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

type StoryArgs = StoryObj<RadioEditor>;

type Story = Meta<RadioEditor>;

export default {
    title: "Widgets/Radio/Editor Demo",
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "An editor for adding a radio widget that allows users to select a single option from multiple choices.",
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
} as Story;

const styles = StyleSheet.create({
    wrapper: {
        // The maximum width of a widget in the editor.
        width: 338,
    },
});

class WithState extends React.Component<Empty, PerseusRadioWidgetOptions> {
    apiOptions: APIOptions = Object.freeze({});

    render(): React.ReactNode {
        return (
            <div className={css(styles.wrapper)}>
                <RadioEditor
                    {...this.state}
                    apiOptions={this.apiOptions}
                    onChange={(props) => {
                        action("onChange")(props);
                    }}
                    static={false}
                />
            </div>
        );
    }
}

export const Default = (args: StoryArgs): React.ReactElement => {
    return <WithState />;
};
