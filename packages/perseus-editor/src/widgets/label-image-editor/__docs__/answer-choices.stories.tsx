import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import {action} from "storybook/actions";

import AnswerChoices from "../answer-choices";

import type {AnswerChoicesProps} from "../answer-choices";

type StoryArgs = Record<string, AnswerChoicesProps>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Label Image/Widget Internal Components/Answer Choices",
} as Story;

const styles = StyleSheet.create({
    wrapper: {
        // The maximum width of a widget in the editor.
        width: 338,
    },
});

const Wrapper = (props: AnswerChoicesProps) => {
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
    Record<string, AnswerChoicesProps>,
    {
        choices: ReadonlyArray<string>;
    }
> {
    state = {
        choices: [],
    };

    render(): React.ReactNode {
        const {choices} = this.state;

        return (
            <Wrapper
                choices={choices}
                onChange={(choices) => this.setState({choices})}
                editingDisabled={false}
            />
        );
    }
}

export const EmptyNonInteractive = (args: StoryArgs): React.ReactElement => {
    const props = {
        choices: [],
        onChange: (...args) => {},
        editingDisabled: false,
    } as const;
    return <Wrapper {...props} />;
};

export const FilledNonInteractive = (args: StoryArgs): React.ReactElement => {
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
        editingDisabled: false,
    } as const;
    return <Wrapper {...props} />;
};

export const Interactive = (args: StoryArgs): React.ReactElement => {
    return <WithState />;
};
