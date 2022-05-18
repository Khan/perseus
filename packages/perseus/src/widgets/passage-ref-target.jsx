// @flow
import {
    linterContextProps,
    linterContextDefault,
} from "@khanacademy/perseus-linter";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import * as Changeable from "../mixins/changeable.jsx";
import WidgetJsonifyDeprecated from "../mixins/widget-jsonify-deprecated.jsx";
import Renderer from "../renderer.jsx";

import type {WidgetExports} from "../types.js";

class PassageRefTarget extends React.Component<$FlowFixMe> {
    static propTypes = {
        ...Changeable.propTypes,
        content: PropTypes.string,
        linterContext: linterContextProps,
    };

    static defaultProps: $FlowFixMe = {
        content: "",
        linterContext: linterContextDefault,
    };

    static validate(state: $FlowFixMe, rubric: $FlowFixMe): $FlowFixMe {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    }

    getUserInput: () => $FlowFixMe = () => {
        return WidgetJsonifyDeprecated.getUserInput.call(this);
    };

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    simpleValidate: ($FlowFixMe) => $FlowFixMe = (rubric) => {
        return PassageRefTarget.validate(this.getUserInput(), rubric);
    };

    render(): React.Node {
        return (
            // $FlowFixMe[prop-missing]: inline doesn't exist in Renderer's declared props
            <Renderer
                content={this.props.content}
                inline={true}
                apiOptions={this.props.apiOptions}
                linterContext={this.props.linterContext}
            />
        );
    }
}

export default ({
    name: "passage-ref-target",
    displayName: "PassageRefTarget",
    defaultAlignment: "inline",
    widget: PassageRefTarget,
    hidden: true,
    transform: (editorProps: $FlowFixMe): $FlowFixMe => {
        return _.pick(editorProps, "content");
    },
    version: {major: 0, minor: 0},
    isLintable: true,
}: WidgetExports<typeof PassageRefTarget>);
