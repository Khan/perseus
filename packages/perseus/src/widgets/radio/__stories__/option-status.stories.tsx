import * as React from "react";

import OptionStatus from "../option-status";

type StoryArgs = {
    checked: boolean;
    correct: boolean;
    previouslyAnswered: boolean;
    reviewMode: boolean;
};

type Story = {
    title: string;
    args: StoryArgs;
};

export default {
    title: "Perseus/Widgets/Radio/Option Status",
    args: {
        checked: false,
        correct: false,
        previouslyAnswered: false,
        reviewMode: true,
    },
} as Story;

export const Interactive = (args: StoryArgs): React.ReactElement => {
    return <OptionStatus {...args} />;
};

export const AllPossibleOutputs = (args: StoryArgs): React.ReactElement => {
    return (
        <>
            <div>
                Checked Correct:
                <OptionStatus
                    checked={true}
                    correct={true}
                    previouslyAnswered={true}
                    reviewMode={true}
                />
            </div>
            <hr />
            <div>
                Checked Not Correct:
                <OptionStatus
                    checked={true}
                    correct={false}
                    previouslyAnswered={true}
                    reviewMode={true}
                />
            </div>
            <hr />
            <div>
                Not Checked Correct:
                <OptionStatus
                    checked={false}
                    correct={true}
                    previouslyAnswered={true}
                    reviewMode={true}
                />
            </div>
            <hr />
            <div>
                Not Checked Not Correct Previously Answered:
                <OptionStatus
                    checked={false}
                    correct={false}
                    previouslyAnswered={true}
                    reviewMode={true}
                />
            </div>
            <hr />
            <div>
                Not Checked Not Correct Not Previously Answered:
                <OptionStatus
                    checked={false}
                    correct={false}
                    previouslyAnswered={false}
                    reviewMode={true}
                />
            </div>
            <hr />
        </>
    );
};
