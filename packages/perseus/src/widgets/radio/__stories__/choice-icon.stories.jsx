// @flow
import * as React from "react";

import ChoiceIcon from "../choice-icon/choice-icon.jsx";

type StoryArgs = {|
    pos: number,
    checked: boolean,
    crossedOut: boolean,
    focused: boolean,
    hovered: boolean,
    pressed: boolean,
    correct: boolean,
    showCorrectness: boolean,
    product: "sat" | "library",
    multipleSelect: boolean,
    reviewMode: boolean,
    previouslyAnswered: boolean,
    transparentBackground: boolean,
    primaryProductColor?: string,
|};

const defaultProps = {
    pos: 0,
    checked: false,
    crossedOut: false,
    focused: false,
    hovered: false,
    pressed: false,
    correct: false,
    showCorrectness: false,
    product: "library",
    multipleSelect: false,
    reviewMode: false,
    previouslyAnswered: false,
    transparentBackground: false,
};

const defaultSATProps = {
    ...defaultProps,
    product: "sat",
};

export default {
    title: "Perseus/Widgets/Radio/Choice Icon",
    argTypes: {
        pos: {
            control: {type: "number", min: 0, max: 25, step: 1},
        },
        product: {
            options: ["library", "sat"],
            control: {type: "radio"},
        },
    },
    args: defaultProps,
};

export const Interactive = (args: StoryArgs): React.Node => {
    return <ChoiceIcon {...args} />;
};

export const Default = (args: StoryArgs): React.Node => {
    return (
        <>
            <p>Library</p>
            <ChoiceIcon {...defaultProps} />
            <ChoiceIcon {...defaultProps} multipleSelect={true} />
            <p>SAT</p>
            <ChoiceIcon {...defaultSATProps} />
            <ChoiceIcon {...defaultSATProps} multipleSelect={true} />
        </>
    );
};

export const Focused = (args: StoryArgs): React.Node => {
    return (
        <>
            <p>Library</p>
            <ChoiceIcon {...defaultProps} focused={true} />
            <ChoiceIcon
                {...defaultProps}
                focused={true}
                multipleSelect={true}
            />
            <p>SAT</p>
            <ChoiceIcon {...defaultSATProps} focused={true} />
            <ChoiceIcon
                {...defaultSATProps}
                focused={true}
                multipleSelect={true}
            />
        </>
    );
};

export const Checked = (args: StoryArgs): React.Node => {
    return (
        <>
            <p>Library</p>
            <ChoiceIcon {...defaultProps} checked={true} />
            <ChoiceIcon
                {...defaultProps}
                checked={true}
                multipleSelect={true}
            />
            <p>SAT</p>
            <ChoiceIcon {...defaultSATProps} checked={true} />
            <ChoiceIcon
                {...defaultSATProps}
                checked={true}
                multipleSelect={true}
            />
        </>
    );
};

export const CrossedOut = (args: StoryArgs): React.Node => {
    return (
        <>
            <p>Library</p>
            <ChoiceIcon {...defaultProps} crossedOut={true} />
            <ChoiceIcon
                {...defaultProps}
                crossedOut={true}
                multipleSelect={true}
            />
            <p>SAT</p>
            <ChoiceIcon {...defaultSATProps} crossedOut={true} />
            <ChoiceIcon
                {...defaultSATProps}
                crossedOut={true}
                multipleSelect={true}
            />
        </>
    );
};

export const Correct = (args: StoryArgs): React.Node => {
    return (
        <>
            <p>Library</p>
            <ChoiceIcon
                {...defaultProps}
                checked={true}
                correct={true}
                showCorrectness={true}
                reviewMode={true}
            />
            <ChoiceIcon
                {...defaultProps}
                checked={true}
                correct={true}
                showCorrectness={true}
                reviewMode={true}
                multipleSelect={true}
            />
            <p>SAT</p>
            <ChoiceIcon
                {...defaultSATProps}
                checked={true}
                correct={true}
                showCorrectness={true}
                reviewMode={true}
            />
            <ChoiceIcon
                {...defaultSATProps}
                checked={true}
                correct={true}
                showCorrectness={true}
                reviewMode={true}
                multipleSelect={true}
            />
        </>
    );
};

export const Incorrect = (args: StoryArgs): React.Node => {
    return (
        <>
            <p>Library</p>
            <ChoiceIcon
                {...defaultProps}
                checked={true}
                correct={false}
                showCorrectness={true}
                reviewMode={true}
            />
            <ChoiceIcon
                {...defaultProps}
                checked={true}
                correct={false}
                showCorrectness={true}
                reviewMode={true}
                multipleSelect={true}
            />
            <p>SAT</p>
            <ChoiceIcon
                {...defaultSATProps}
                checked={true}
                correct={false}
                showCorrectness={true}
                reviewMode={true}
            />
            <ChoiceIcon
                {...defaultSATProps}
                checked={true}
                correct={false}
                showCorrectness={true}
                reviewMode={true}
                multipleSelect={true}
            />
        </>
    );
};

export const AllPositions = (args: StoryArgs): React.Node => {
    const allLetters = Array(26).fill();
    return (
        <>
            <p>Library</p>
            {allLetters.map((_, i: number) => (
                <ChoiceIcon {...defaultProps} pos={i} key={"choice" + i} />
            ))}
            <br />
            {allLetters.map((_, i: number) => (
                <ChoiceIcon
                    {...defaultProps}
                    pos={i}
                    multipleSelect={true}
                    key={"choice" + i}
                />
            ))}
            <p>SAT</p>
            {allLetters.map((_, i: number) => (
                <ChoiceIcon {...defaultSATProps} pos={i} key={"choice" + i} />
            ))}
            <br />
            {allLetters.map((_, i: number) => (
                <ChoiceIcon
                    {...defaultSATProps}
                    pos={i}
                    multipleSelect={true}
                    key={"choice" + i}
                />
            ))}
        </>
    );
};
