import Banner from "@khanacademy/wonder-blocks-banner";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import React from "react";

import type {PerseusScore, WidgetExports} from "../../types";

// The props are type `any` on purpose so that this can receive props
// from any deprecated widget
type AutoCorrectProps = any;
type Rubric = any;
type UserInput = Empty;

class AutoCorrect extends React.Component<AutoCorrectProps> {
    static validate(userInput: UserInput, rubric: Rubric): PerseusScore {
        // Since this mean to replace an existing widget the learner
        // WILL earn points for this widget
        return {
            type: "points",
            earned: 1,
            total: 1,
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
                    paddingTop: 8,
                    paddingBottom: 8,
                }}
            >
                <Banner
                    text={i18n._(
                        "This part of the question is no-longer available. You will not be graded on this part.",
                    )}
                    kind="warning"
                    layout="full-width"
                />
            </div>
        );
    }
}

export default {
    name: "deprecated-standin",
    displayName: "Deprecated Standin",
    widget: AutoCorrect,
} as WidgetExports<typeof AutoCorrect>;
