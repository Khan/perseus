import Banner from "@khanacademy/wonder-blocks-banner";
import React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import noopValidator from "../__shared__/noop-validator";

import type {Widget, WidgetExports} from "../../types";

// The props are type `any` on purpose so that this can receive props
// from any deprecated widget
type Props = any;

class DeprecatedStandin extends React.Component<Props> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    // this just helps with TS weak typing when a Widget
    // doesn't implement any Widget methods
    isWidget = true as const;

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
    // TODO: things that aren't interactive shouldn't need validators
    scorer: () => noopValidator(1),
} satisfies WidgetExports<typeof DeprecatedStandin>;
