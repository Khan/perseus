import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";

import {BlankComponent} from "./blank";

import type {WidgetExports, WidgetProps, Widget} from "../../types";
import type {
    PerseusBlankWidgetOptions,
    PerseusBlankUserInput,
} from "@khanacademy/perseus-core";

export type BlankProps = WidgetProps<
    PerseusBlankWidgetOptions,
    PerseusBlankUserInput
>;

class BlankWidget extends React.Component<BlankProps> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    // this just helps with TS weak typing when a Widget
    // doesn't implement any Widget methods
    isWidget = true as const;

    getPromptJSON(): any {
        return {};
    }

    render(): React.ReactNode {
        return <BlankComponent {...this.props} />;
    }
}

export default {
    name: "blank",
    displayName: "Blank",
    widget: BlankWidget,
    isLintable: true,
} satisfies WidgetExports<typeof BlankWidget>;
