import Banner from "@khanacademy/wonder-blocks-banner";
import React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";

import type {PerseusScore, WidgetExports} from "../../types";

// The props are type `any` on purpose so that this can receive props
// from any deprecated widget
type Props = any;
type Rubric = any;
type UserInput = Empty;

class DeprecatedStandin extends React.Component<Props> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

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
                    text={this.context.strings.deprecatedStandin}
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
