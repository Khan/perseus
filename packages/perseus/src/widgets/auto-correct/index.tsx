import React from "react";

import type {PerseusScore, WidgetExports} from "../../types";

// The props are type `any` on purpose so that this can receive props
// from any deprecated widget
type AutoCorrectProps = any;
type Rubric = any;
type UserInput = Empty;

class AutoCorrect extends React.Component<AutoCorrectProps> {
    static validate(userInput: UserInput, rubric: Rubric): PerseusScore {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    }

    getUserInput: () => UserInput = () => {
        return {};
    };

    simpleValidate: (arg1: Rubric) => PerseusScore = (rubric) => {
        return AutoCorrect.validate(this.getUserInput(), rubric);
    };

    render() {
        return (
            <div
                style={{
                    backgroundColor: "gray",
                    border: "1px solid red",
                }}
            >
                <h1>Gone</h1>
                <p>The widget you are trying to reach is no longer available</p>
            </div>
        );
    }
}

export default {
    name: "auto-correct",
    displayName: "Auto Program",
    widget: AutoCorrect,
} as WidgetExports<typeof AutoCorrect>;
