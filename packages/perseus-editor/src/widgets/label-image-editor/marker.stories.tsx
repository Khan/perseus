import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import {action} from "storybook/actions";

import Marker from "./marker";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type MarkerProps = PropsFor<typeof Marker>;

type WrapperProps = Omit<MarkerProps, "opened" | "onOpenedChange">;

type StoryArgs = Record<string, MarkerProps>;

type Story = {
    title: string;
};

// eslint-disable-next-line no-restricted-syntax
export default {
    title: "Widgets/Label Image/Widget Internal Components/Marker",
} as Story;

const styles = StyleSheet.create({
    wrapper: {
        // Push the component down as the popover that displays the choices
        // doesn't properly pop over everything.
        marginBlockStart: 150,

        position: "relative",

        width: 32,
        height: 32,
    },
});

// `opened` is owned by QuestionMarkers in production so that opening one
// marker closes the rest; the story stands in for that owner.
const Wrapper = (props: WrapperProps) => {
    const [opened, setOpened] = React.useState(false);

    return (
        <div className={css(styles.wrapper)}>
            <Marker
                {...props}
                opened={opened}
                onOpenedChange={(opened) => {
                    action("onOpenedChange")(opened);
                    setOpened(opened);
                }}
            />
        </div>
    );
};

export const Empty = (args: StoryArgs): React.ReactElement => {
    const props: WrapperProps = {
        answers: [],
        choices: [],
        label: "",
        multipleAnswers: true,
        onChange: (...args) => {
            action("onChange")(...args);
        },
        onRemove: (...args) => {
            action("onRemove")(...args);
        },
        x: 50,
        y: 50,
    };
    return <Wrapper {...props} />;
};

export const WithAnswers = (args: StoryArgs): React.ReactElement => {
    const props: WrapperProps = {
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
        multipleAnswers: true,
        onChange: (...args) => {
            action("onChange")(...args);
        },
        onRemove: (...args) => {
            action("onRemove")(...args);
        },
        x: 50,
        y: 50,
    };
    return <Wrapper {...props} />;
};
