import * as React from "react";

import ChoiceIcon from "../choice-icon/choice-icon";

type StoryArgs = {
    pos: number;
    checked: boolean;
    focused: boolean;
    hovered: boolean;
    pressed: boolean;
    correct: boolean;
    showCorrectness: boolean;
    multipleSelect: boolean;
    reviewMode: boolean;
    previouslyAnswered: boolean;
};

const defaultProps = {
    pos: 0,
    checked: false,
    focused: false,
    hovered: false,
    pressed: false,
    correct: false,
    showCorrectness: false,
    multipleSelect: false,
    reviewMode: false,
    previouslyAnswered: false,
} as const;

export default {
    title: "Widgets/Radio/Widget Internal Components/Choice Icon",
    argTypes: {
        pos: {
            control: {type: "number", min: 0, max: 25, step: 1},
        },
    },
    args: defaultProps,
    tags: ["!dev"],
};

const Panel = (props: {children: React.ReactNode}): React.ReactElement => {
    return <div style={{padding: "10px"}}>{props.children}</div>;
};

export const Interactive = (args: StoryArgs): React.ReactElement => {
    return (
        <Panel>
            <ChoiceIcon {...args} />
        </Panel>
    );
};

export const Default = (args: StoryArgs): React.ReactElement => {
    return (
        <Panel>
            <ChoiceIcon {...defaultProps} />
            <ChoiceIcon {...defaultProps} multipleSelect={true} />
        </Panel>
    );
};

export const Focused = (args: StoryArgs): React.ReactElement => {
    return (
        <Panel>
            <ChoiceIcon {...defaultProps} focused={true} />
            <ChoiceIcon
                {...defaultProps}
                focused={true}
                multipleSelect={true}
            />
        </Panel>
    );
};

export const Checked = (args: StoryArgs): React.ReactElement => {
    return (
        <Panel>
            <ChoiceIcon {...defaultProps} checked={true} />
            <ChoiceIcon
                {...defaultProps}
                checked={true}
                multipleSelect={true}
            />
        </Panel>
    );
};

export const Correct = (args: StoryArgs): React.ReactElement => {
    return (
        <Panel>
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
        </Panel>
    );
};

export const Incorrect = (args: StoryArgs): React.ReactElement => {
    return (
        <Panel>
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
        </Panel>
    );
};

export const AllPositions = (args: StoryArgs): React.ReactElement => {
    // @ts-expect-error [FEI-5003] - TS2554 - Expected 1-3 arguments, but got 0.
    const allLetters = Array(26).fill();
    return (
        <Panel>
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
        </Panel>
    );
};
