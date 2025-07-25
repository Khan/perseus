import {css, StyleSheet} from "aphrodite";
import * as React from "react";
import {action} from "storybook/actions";

import {
    multiChoiceQuestion,
    question,
} from "../../../../perseus/src/widgets/radio/__tests__/radio.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import RadioEditor from "../radio/editor";

import type {APIOptions} from "@khanacademy/perseus";
import type {PerseusRadioWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

registerAllWidgetsAndEditorsForTesting(); // SIDE_EFFECTY!!!! :cry:

type StoryArgs = StoryObj<RadioEditor>;

type Story = Meta<RadioEditor>;

export default {
    title: "Widgets/Radio/Editor Demo",
    // tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "An editor for adding a radio widget that allows users to select a single option from multiple choices.",
            },
        },
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

export const SingleChoice = (): React.ReactElement => (
    <div className={css(styles.wrapper)}>
        <EditorPageWithStorybookPreview question={question} />
    </div>
);

export const MultiChoice = (): React.ReactElement => (
    <div className={css(styles.wrapper)}>
        <EditorPageWithStorybookPreview question={multiChoiceQuestion} />
    </div>
);
