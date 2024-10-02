import Banner from "@khanacademy/wonder-blocks-banner";
import React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import noopValidator from "../__shared__/noop-validator";

import type {PerseusScore, WidgetExports} from "../../types";
import type {EmptyUserInput} from "../../validation.types";

// The props are type `any` on purpose so that this can receive props
// from any deprecated widget
type Props = any;

class DeprecatedStandin extends React.Component<Props> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static validate(): PerseusScore {
        // Since this mean to replace an existing widget the learner
        // WILL earn points for this widget
        return noopValidator(1);
    }

    getUserInput(): EmptyUserInput {
        return {};
    }

    simpleValidate(): PerseusScore {
        return noopValidator(1);
    }

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
