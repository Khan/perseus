/* eslint-disable react/sort-comp */
// @flow
import {linterContextDefault} from "@khanacademy/perseus-linter";
import classNames from "classnames";
import * as React from "react";
import _ from "underscore";

import * as Changeable from "../mixins/changeable.jsx";
import {ApiOptions} from "../perseus-api.jsx";
import Renderer from "../renderer.jsx";

import type {PerseusGroupWidgetOptions} from "../perseus-types.js";
import type {
    FocusPath,
    PerseusScore,
    WidgetExports,
    WidgetProps,
} from "../types.js";

type Rubric = PerseusGroupWidgetOptions;
type RenderProps = PerseusGroupWidgetOptions; // exports has no 'transform'
type Props = WidgetProps<RenderProps, Rubric>;
type DefaultProps = {|
    content: Props["content"],
    widgets: Props["widgets"],
    images: Props["images"],
    linterContext: Props["linterContext"],
|};

class Group extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        content: "",
        widgets: {},
        images: {},
        linterContext: linterContextDefault,
    };

    componentDidMount() {
        // TODO(marcia): See comment in render method about our cyclical
        // numbering scheme. We force another render so that we can annotate
        // the group with the correct number.
        this.forceUpdate();
    }

    render(): React.Node {
        const apiOptions = _.extend(
            {},
            ApiOptions.defaults,
            this.props.apiOptions,
            {
                // Api Rewriting to support correct onFocus/onBlur
                // events for the mobile API
                onFocusChange: (newFocus, oldFocus) => {
                    if (oldFocus) {
                        this.props.onBlur(oldFocus);
                    }
                    if (newFocus) {
                        this.props.onFocus(newFocus);
                    }
                },
            },
        );

        // Allow a problem number annotation to be added.
        // This is cyclical and should probably be reconsidered. In order to
        // render the annotation ("Question 3 of 10"), we call findWidgets to
        // figure out our index in the list of all fellow group widgets. On
        // first render, though, we don't exist yet in this list, and so we
        // give ourselves number -1. To combat this, we forceUpdate in
        // componentDidMount so that we can number ourselves properly. But,
        // really we should have a more unidirectional flow. TODO(marcia): fix.
        const number = _.indexOf(this.props.findWidgets("group"), this);
        const problemNumComponent = this.props.apiOptions.groupAnnotator(
            number,
            this.props.widgetId,
        );

        // This is a little strange because the id of the widget that actually
        // changed is going to be lost in favor of the group widget's id. The
        // widgets prop also wasn't actually changed, and this only serves to
        // alert our renderer (our parent) of the fact that some interaction
        // has occurred.
        const onInteractWithWidget = (id) => {
            // eslint-disable-next-line react/no-string-refs
            if (this.refs.renderer) {
                // eslint-disable-next-line react/no-string-refs
                this.change("widgets", this.refs.renderer.props.widgets);
            }
        };

        // eslint-disable-next-line react/no-string-refs
        const score = this.refs.renderer && this.refs.renderer.score();
        const isValid = score && score.type !== "invalid";
        const isInvalid = score && score.type === "invalid";

        // TODO(mdr): Widgets inside this Renderer are not discoverable through
        //     the parent Renderer's `findWidgets` function.
        return (
            <div
                className={classNames({
                    "perseus-group": true,
                    "perseus-group-valid-answer": isValid,
                    "perseus-group-invalid-answer": isInvalid,
                })}
            >
                {problemNumComponent}
                {/**
                 * We're passing a bunch of extra props to Renderer here that it
                 * doesn't need.  We should replace {...this.props} with the individual
                 * props that are needed.
                 * TODO(FEI-4034): Only pass what the Renderer expects.
                 */}
                {/* $FlowFixMe[prop-missing] */}
                {/* $FlowFixMe[incompatible-type] */}
                <Renderer
                    {...this.props}
                    // eslint-disable-next-line react/no-string-refs
                    ref="renderer"
                    apiOptions={apiOptions}
                    findExternalWidgets={this.props.findWidgets}
                    reviewMode={!!this.props.reviewModeRubric}
                    onInteractWithWidget={onInteractWithWidget}
                    linterContext={this.props.linterContext}
                />
                {/* $FlowFixMe[prop-missing] */}
                {this.props.icon && (
                    <div className="group-icon">{this.props.icon}</div>
                )}
            </div>
        );
    }

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    getUserInput: () => $FlowFixMe = () => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.renderer.getUserInput();
    };

    getSerializedState: () => $FlowFixMe = () => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.renderer.getSerializedState();
    };

    restoreSerializedState: ($FlowFixMe, $FlowFixMe) => $FlowFixMe = (
        state,
        callback,
    ) => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.renderer.restoreSerializedState(state, callback);
        // Tell our renderer that we have no props to change
        // (all our changes were in state):
        return null;
    };

    simpleValidate: (Rubric) => PerseusScore = (rubric) => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.renderer.score();
    };

    // Mobile API:
    getInputPaths: () => $ReadOnlyArray<FocusPath> = () => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.renderer.getInputPaths();
    };

    setInputValue: (FocusPath, string, $FlowFixMe) => void = (
        path,
        newValue,
        cb,
    ) => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.renderer.setInputValue(path, newValue, cb);
    };

    focus: () => ?boolean = () => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.renderer.focus();
    };

    focusInputPath: (FocusPath) => void = (path) => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.renderer.focusPath(path);
    };

    blurInputPath: (FocusPath) => void = (path) => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.renderer.blurPath(path);
    };

    showRationalesForCurrentlySelectedChoices: () => void = () => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.renderer.showRationalesForCurrentlySelectedChoices();
    };
}

const traverseChildWidgets = function (
    props: $FlowFixMe,
    traverseRenderer: $FlowFixMe,
): $FlowFixMe {
    return _.extend({}, props, traverseRenderer(props));
};

export default ({
    name: "group",
    displayName: "Group (SAT only)",
    widget: Group,
    traverseChildWidgets: traverseChildWidgets,
    hidden: false,
    isLintable: true,
}: WidgetExports<typeof Group>);
