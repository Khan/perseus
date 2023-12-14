/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {
    linterContextProps,
    linterContextDefault,
} from "@khanacademy/perseus-linter";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import * as Changeable from "../mixins/changeable";
import WidgetJsonifyDeprecated from "../mixins/widget-jsonify-deprecated";
import Renderer from "../renderer";

import type {WidgetExports} from "../types";

class PassageRefTarget extends React.Component<any> {
    static propTypes = {
        ...Changeable.propTypes,
        content: PropTypes.string,
        linterContext: linterContextProps,
    };

    static defaultProps: any = {
        content: "",
        linterContext: linterContextDefault,
    };

    static validate(state: any, rubric: any): any {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    }

    getUserInput: () => any = () => {
        return WidgetJsonifyDeprecated.getUserInput.call(this);
    };

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    simpleValidate: (arg1: any) => any = (rubric) => {
        return PassageRefTarget.validate(this.getUserInput(), rubric);
    };

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
