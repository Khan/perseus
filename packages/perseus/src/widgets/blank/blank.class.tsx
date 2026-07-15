import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";

import type {WidgetExports, WidgetProps, Widget} from "../../types";
import type {PerseusBlankWidgetOptions} from "@khanacademy/perseus-core";

type ExternalProps = WidgetProps<
    PerseusBlankWidgetOptions,
    PerseusBlankUserInput
>;

export type BlankWidgetProps = ExternalProps & {
    id: string;
    displayType: NonNullable<ExternalProps["displayType"]>;
};

type DefaultProps = Pick<BlankWidgetProps, "displayType">;

class BlankWidget extends React.Component<BlankWidgetProps> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        displayType: "normal",
    };

    // this just helps with TS weak typing when a Widget
    // doesn't implement any Widget methods
    isWidget = true as const;

    getPromptJSON(): any {
        return {};
    }

    render(): React.ReactNode {
        return <ImageComponent {...this.props} />;
    }
}

export default {
    name: "blank",
    displayName: "Blank",
    widget: BlankWidget,
    isLintable: true,
} satisfies WidgetExports<typeof BlankWidget>;
