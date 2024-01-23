import Banner from "@khanacademy/wonder-blocks-banner";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import React from "react";

import type {PerseusScore, WidgetExports} from "../../types";

// The props are type `any` on purpose so that this can receive props
// from any deprecated widget
type Props = any;
type Rubric = any;
type UserInput = Empty;

class DeprecatedStandin extends React.Component<Props> {
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
        return DeprecatedStandin.validate(this.getUserInput(), rubric);
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
                        "Sorry, this part of the question is no longer available. 😅 Don't worry, you won't be graded on this part. Keep going!",
                    )}
                    kind="info"
                    layout="full-width"
                />
            </div>
        );
    }
}

export default {
    name: "deprecated-standin",
    displayName: "Deprecated Standin",
    widget: DeprecatedStandin,
    hidden: true,
} as WidgetExports<typeof DeprecatedStandin>;
