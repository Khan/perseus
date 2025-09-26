import Banner from "@khanacademy/wonder-blocks-banner";
import React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";

import type {Widget, WidgetExports} from "../../types";

// There are no required props, but this component can receive props from any
// deprecated widget
type Props = object;

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
} satisfies WidgetExports<typeof DeprecatedStandin>;
