/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import * as Changeable from "../../mixins/changeable";
import Renderer from "../../renderer";
import noopValidator from "../__shared__/noop-validator";

import type {PerseusPassageRefTargetWidgetOptions} from "../../perseus-types";
import type {APIOptions, WidgetExports} from "../../types";
import type {PerseusPassageRefTargetUserInput} from "../../validation.types";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

type Props = Changeable.ChangeableProps & {
    apiOptions: APIOptions;
    content: PerseusPassageRefTargetWidgetOptions["content"];
    linterContext: LinterContextProps;
};

type DefaultProps = {
    content: Props["content"];
    linterContext: Props["linterContext"];
};
class PassageRefTarget extends React.Component<Props> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        content: "",
        linterContext: linterContextDefault,
    };

    // TODO (LEMS-2396): remove validation logic from widgets that don't validate
    static validate() {
        return noopValidator();
    }

    // TODO passage-ref-target isn't interactive; remove
    getUserInput(): PerseusPassageRefTargetUserInput {
        return null;
    }

    // TODO passage-ref-target isn't interactive; remove
    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    // TODO (LEMS-2396): remove validation logic from widgets that don't validate
    simpleValidate() {
        return noopValidator();
    }

    render(): React.ReactNode {
        return (
            <Renderer
                content={this.props.content}
                // This was already here before inline was recently added (#873)
                // It was for a different use case a long time ago:
                // https://phabricator.khanacademy.org/D12113
                // Commenting out to prevent unanticipated side effects
                // inline={true}
                apiOptions={this.props.apiOptions}
                linterContext={this.props.linterContext}
                strings={this.context.strings}
            />
        );
    }
}

export default {
    name: "passage-ref-target",
    displayName: "PassageRefTarget",
    defaultAlignment: "inline",
    widget: PassageRefTarget,
    hidden: true,
    transform: (editorProps: any): any => {
        return _.pick(editorProps, "content");
    },
    version: {major: 0, minor: 0},
    isLintable: true,
} as WidgetExports<typeof PassageRefTarget>;
