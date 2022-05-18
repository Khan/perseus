// @flow
import {
    linterContextProps,
    linterContextDefault,
} from "@khanacademy/perseus-linter";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import InlineIcon from "../components/inline-icon.jsx";
import {iconOk} from "../icon-paths.js";
import * as Changeable from "../mixins/changeable.jsx";
import {ApiOptions} from "../perseus-api.jsx";
import Renderer from "../renderer.jsx";
import Util from "../util.js";

import type {WidgetExports} from "../types.js";

class Sequence extends React.Component<$FlowFixMe, $FlowFixMe> {
    static propTypes = {
        ...Changeable.propTypes,
        apiOptions: ApiOptions.propTypes,
        json: PropTypes.arrayOf(
            PropTypes.shape({
                content: PropTypes.string,
                images: PropTypes.objectOf(PropTypes.any),
                widgets: PropTypes.objectOf(PropTypes.any),
            }),
        ),
        trackInteraction: PropTypes.func.isRequired,
        linterContext: linterContextProps,
    };

    static defaultProps: $FlowFixMe = {
        json: [
            {
                content: "",
                widgets: {},
                images: {},
            },
        ],
        linterContext: linterContextDefault,
    };

    state: $FlowFixMe = {
        visible: 1,
    };

    shouldComponentUpdate(
        nextProps: $FlowFixMe,
        nextState: $FlowFixMe,
    ): boolean {
        return nextProps !== this.props || nextState !== this.state;
    }

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    _handleInteraction: (string) => void = (groupWidgetId) => {
        const step = parseInt(groupWidgetId.split(" ")[1]);
        if (step === this.state.visible - 1) {
            // eslint-disable-next-line react/no-string-refs
            const widget = this.refs.renderer.getWidgetInstance(
                "group " + step,
            );

            widget.showRationalesForCurrentlySelectedChoices();
            const score = widget.simpleValidate();

            if (score.type === "points" && score.total === score.earned) {
                this.setState({
                    visible: this.state.visible + 1,
                });
                this.props.trackInteraction({
                    visible: this.state.visible + 1,
                });
            }
        }
    };

    render(): React.Node {
        const icon = <InlineIcon {...iconOk} style={{color: "green"}} />;

        const content = _.chain(this.props.json)
            .first(this.state.visible)
            .map((step, i) => `[[${Util.snowman} group ${i}]]`)
            .join("\n\n")
            .value();

        const widgets = {};
        _.each(this.props.json, (step, i) => {
            const widgetId = `group ${i}`;
            widgets[widgetId] = {
                type: "group",
                graded: true,
                version: {major: 0, minor: 0},
                options: _.extend({}, step, {
                    icon: i < this.state.visible - 1 ? icon : null,
                }),
            };
        });

        return (
            <div className="perseus-sequence">
                <Renderer
                    // eslint-disable-next-line react/no-string-refs
                    ref="renderer"
                    content={content}
                    widgets={widgets}
                    onInteractWithWidget={this._handleInteraction}
                    apiOptions={this.props.apiOptions}
                    linterContext={this.props.linterContext}
                />
            </div>
        );
    }
}

const traverseChildWidgets = function (
    props: $FlowFixMe,
    traverseRenderer: $FlowFixMe,
): $FlowFixMe {
    let oldJson = props.json;
    if (!_.isArray(oldJson)) {
        oldJson = [oldJson];
    }
    const json = _.map(oldJson, (rendererOptions) => {
        return traverseRenderer(rendererOptions);
    });

    return _.extend({}, props, {json: json});
};

export default ({
    name: "sequence",
    displayName: "Graded Sequence",
    widget: Sequence,
    traverseChildWidgets: traverseChildWidgets,
    tracking: "all",
    hidden: true,
    isLintable: true,
}: WidgetExports<typeof Sequence>);
