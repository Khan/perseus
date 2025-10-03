import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import {action} from "storybook/actions";

import AnswerChoices from "../answer-choices";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Label Image/Answer Choices",
} as Story;

const styles = StyleSheet.create({
    wrapper: {
        // The maximum width of a widget in the editor.
        width: 338,
    },
});

const Wrapper = (props: any) => {
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
    Record<any, any>,
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
            />
        );
    }
}

export const EmptyNonInteractive = (args: StoryArgs): React.ReactElement => {
    const props = {choices: [], onChange: (...args) => {}} as const;
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
    } as const;
    return <Wrapper {...props} />;
};

export const Interactive = (args: StoryArgs): React.ReactElement => {
    return <WithState />;
};
