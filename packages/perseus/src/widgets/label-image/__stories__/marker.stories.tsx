import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import Marker from '../marker';

type StoryArgs = Record<any, any>;

type Story = {
    title: string
};

export default {
    title: "Perseus/Widgets/Label Image/Marker",
} as Story;

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

export const Unfilled: React.FC<StoryArgs> = (args): React.ReactElement => {
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
    } as const;
    return <Wrapper {...props} />;
};

export const UnfilledPulsate: React.FC<StoryArgs> = (args): React.ReactElement => {
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
    } as const;
    return <Wrapper {...props} />;
};

export const UnfilledSelected: React.FC<StoryArgs> = (args): React.ReactElement => {
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
    } as const;
    return <Wrapper {...props} />;
};

export const Filled: React.FC<StoryArgs> = (args): React.ReactElement => {
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
    } as const;
    return <Wrapper {...props} />;
};

export const FilledSelected: React.FC<StoryArgs> = (args): React.ReactElement => {
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
    } as const;
    return <Wrapper {...props} />;
};

export const Incorrect: React.FC<StoryArgs> = (args): React.ReactElement => {
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
    } as const;
    return <Wrapper {...props} />;
};

export const IncorrectSelected: React.FC<StoryArgs> = (args): React.ReactElement => {
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
    } as const;
    return <Wrapper {...props} />;
};

export const Correct: React.FC<StoryArgs> = (args): React.ReactElement => {
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
    } as const;
    return <Wrapper {...props} />;
};

export const CorrectSelected: React.FC<StoryArgs> = (args): React.ReactElement => {
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
    } as const;
    return <Wrapper {...props} />;
};
