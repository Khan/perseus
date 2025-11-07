/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";

import type {APIOptions, WidgetExports, Widget} from "../../types";
import type {PerseusPassageRefTargetWidgetOptions} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";
import RendererWithAPIOptions from "../../renderer-with-api-options";

type Props = {
    apiOptions: APIOptions;
    content: PerseusPassageRefTargetWidgetOptions["content"];
    linterContext: LinterContextProps;
};

type DefaultProps = {
    content: Props["content"];
    linterContext: Props["linterContext"];
};

class PassageRefTarget extends React.Component<Props> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        content: "",
        linterContext: linterContextDefault,
    };

    // this just helps with TS weak typing when a Widget
    // doesn't implement any Widget methods
    isWidget = true as const;

    render(): React.ReactNode {
        return (
            <RendererWithAPIOptions
                content={this.props.content}
                // This was already here before inline was recently added (#873)
                // It was for a different use case a long time ago:
                // https://phabricator.khanacademy.org/D12113
                // Commenting out to prevent unanticipated side effects
                // inline={true}
                linterContext={this.props.linterContext}
                strings={this.context.strings}
            />
        );
    }
}

export default {
    name: "passage-ref-target",
    displayName: "PassageRefTarget",
    widget: PassageRefTarget,
    hidden: true,
    isLintable: true,
} satisfies WidgetExports<typeof PassageRefTarget>;
