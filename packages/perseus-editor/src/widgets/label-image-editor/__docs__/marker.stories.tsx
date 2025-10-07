import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import {action} from "storybook/actions";

import Marker from "../marker";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Label Image/Widget Internal Components/Marker",
} as Story;

const styles = StyleSheet.create({
    wrapper: {
        // Push the component down as the popover that displays the choices
        // doesn't properly pop over everything.
        marginTop: 150,

        position: "relative",

        width: 32,
        height: 32,
    },
});

const Wrapper = (props) => (
    <div className={css(styles.wrapper)}>
        <Marker {...props} />
    </div>
);

export const Empty = (args: StoryArgs): React.ReactElement => {
    const props = {
        answers: [],
        choices: [],
        label: "",
        onChange: (...args) => {
            action("onChange")(...args);
        },
        onRemove: (...args) => {
            action("onRemove")(...args);
        },
        x: 50,
        y: 50,
    } as const;
    return <Wrapper {...props} />;
};

export const WithAnswers = (args: StoryArgs): React.ReactElement => {
    const props = {
        answers: ["BMW", "Ferrari"],
        choices: [
            "Lamborghini",
            "BMW",
            "Volkswagen",
            "Fiat",
            "Porsche",
            "Ferrari",
        ],
        label: "Automotive",
        onChange: (...args) => {
            action("onChange")(...args);
        },
        onRemove: (...args) => {
            action("onRemove")(...args);
        },
        x: 50,
        y: 50,
    } as const;
    return <Wrapper {...props} />;
};
