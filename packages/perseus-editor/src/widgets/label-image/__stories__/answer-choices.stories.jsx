// @flow
import {action} from "@storybook/addon-actions";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import AnswerChoices from "../answer-choices.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Editor/Widgets/Label Image/Answer Choices",
}: Story);

const styles = StyleSheet.create({
    wrapper: {
        // The maximum width of a widget in the editor.
        width: 338,
    },
});

const Wrapper = (props: $FlowFixMe) => {
    return (
        <div className={css(styles.wrapper)}>
            <AnswerChoices
                {...props}
                onChange={(...args) => {
                    action("onChange")(...args);
                    props.onChange(...args);
                }}
            />
        </div>
    );
};

class WithState extends React.Component<
    {||},
    {|choices: $ReadOnlyArray<string>|},
> {
    state = {
        choices: [],
    };

    render(): React.Node {
        const {choices} = this.state;

        return (
            <Wrapper
                choices={choices}
                onChange={(choices) => this.setState({choices})}
            />
        );
    }
}

export const EmptyNonInteractive = (args: StoryArgs): React.Node => {
    const props = {choices: [], onChange: (...args) => {}};
    return <Wrapper {...props} />;
};

export const FilledNonInteractive = (args: StoryArgs): React.Node => {
    const props = {
        choices: [
            "Lamborghini",
            "BMW",
            "Volkswagen",
            "Fiat",
            "Porsche",
            "Ferrari",
        ],
        onChange: (...args) => {},
    };
    return <Wrapper {...props} />;
};

export const Interactive = (args: StoryArgs): React.Node => {
    return <WithState />;
};
