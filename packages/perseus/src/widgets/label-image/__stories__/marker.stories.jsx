// @flow
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import Marker from "../marker.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Widgets/Label Image/Marker",
}: Story);

const styles = StyleSheet.create({
    wrapper: {
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

// TODO(jeremy): There are a bunch of props that we have to pass to the Marker
// that are not used by it, but required because we share a props type.

export const Unfilled = (args: StoryArgs): React.Node => {
    const props = {
        answers: ["BMW", "Ferrari"],
        selected: [],
        label: "Automotive",
        x: 50,
        y: 50,
        showSelected: false,
        showPulsate: false,
        onClick: () => {},
        onKeyDown: () => {},
    };
    return <Wrapper {...props} />;
};

export const UnfilledPulsate = (args: StoryArgs): React.Node => {
    const props = {
        answers: ["BMW", "Ferrari"],
        selected: [],
        label: "Automotive",
        x: 50,
        y: 50,
        showSelected: false,
        showPulsate: true,
        onClick: () => {},
        onKeyDown: () => {},
    };
    return <Wrapper {...props} />;
};

export const UnfilledSelected = (args: StoryArgs): React.Node => {
    const props = {
        answers: ["BMW", "Ferrari"],
        selected: [],
        label: "Automotive",
        x: 50,
        y: 50,
        showSelected: true,
        showPulsate: false,
        onClick: () => {},
        onKeyDown: () => {},
    };
    return <Wrapper {...props} />;
};

export const Filled = (args: StoryArgs): React.Node => {
    const props = {
        answers: ["BMW", "Ferrari"],
        selected: ["Fiat"],
        label: "Automotive",
        x: 50,
        y: 50,
        showSelected: false,
        showPulsate: false,
        onClick: () => {},
        onKeyDown: () => {},
    };
    return <Wrapper {...props} />;
};

export const FilledSelected = (args: StoryArgs): React.Node => {
    const props = {
        answers: ["BMW", "Ferrari"],
        selected: ["Fiat"],
        label: "Automotive",
        x: 50,
        y: 50,
        showSelected: true,
        showPulsate: false,
        onClick: () => {},
        onKeyDown: () => {},
    };
    return <Wrapper {...props} />;
};

export const Incorrect = (args: StoryArgs): React.Node => {
    const props = {
        answers: ["BMW", "Ferrari"],
        selected: ["Fiat"],
        label: "Automotive",
        x: 50,
        y: 50,
        showCorrectness: "incorrect",
        showSelected: false,
        showPulsate: false,
        onClick: () => {},
        onKeyDown: () => {},
    };
    return <Wrapper {...props} />;
};

export const IncorrectSelected = (args: StoryArgs): React.Node => {
    const props = {
        answers: ["BMW", "Ferrari"],
        selected: ["Fiat"],
        label: "Automotive",
        x: 50,
        y: 50,
        showCorrectness: "incorrect",
        showSelected: true,
        showPulsate: false,
        onClick: () => {},
        onKeyDown: () => {},
    };
    return <Wrapper {...props} />;
};

export const Correct = (args: StoryArgs): React.Node => {
    const props = {
        answers: ["BMW", "Ferrari"],
        selected: ["BMW", "Ferrari"],
        label: "Automotive",
        x: 50,
        y: 50,
        showCorrectness: "correct",
        showSelected: false,
        showPulsate: false,
        onClick: () => {},
        onKeyDown: () => {},
    };
    return <Wrapper {...props} />;
};

export const CorrectSelected = (args: StoryArgs): React.Node => {
    const props = {
        answers: ["BMW", "Ferrari"],
        selected: ["BMW", "Ferrari"],
        label: "Automotive",
        x: 50,
        y: 50,
        showCorrectness: "correct",
        showSelected: true,
        showPulsate: false,
        onClick: () => {},
        onKeyDown: () => {},
    };
    return <Wrapper {...props} />;
};
