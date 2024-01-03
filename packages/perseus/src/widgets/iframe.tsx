/* eslint-disable react/forbid-prop-types, react/sort-comp */
/**
 * This is an iframe widget. It is used for rendering an iframe that
 *  then communicates its state via window.postMessage
 * This is useful for embedding arbitrary visualizations/simulations with
 *  completed conditions, such as the mazes and games in Algorithms.
 * It's particularly well suited for embedding our ProcessingJS programs,
 *  but could also be used for embedding viz's hosted elsewhere.
 */

import $ from "jquery";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import {getDependencies} from "../dependencies";
import * as Changeable from "../mixins/changeable";
import WidgetJsonifyDeprecated from "../mixins/widget-jsonify-deprecated";
import Util from "../util";

import type {WidgetExports} from "../types";

const {updateQueryString} = Util;

/* This renders the iframe and handles validation via window.postMessage */
class Iframe extends React.Component<any> {
    static propTypes = {
        ...Changeable.propTypes,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        url: PropTypes.string,
        settings: PropTypes.array,
        status: PropTypes.oneOf(["incomplete", "incorrect", "correct"]),
        message: PropTypes.string,
        allowFullScreen: PropTypes.bool,
        allowTopNavigation: PropTypes.bool,
    };

    static defaultProps: any = {
        status: "incomplete",
        // optional message
        message: null,
        allowFullScreen: false,
        allowTopNavigation: false,
    };

    getUserInput: () => any = () => {
        return WidgetJsonifyDeprecated.getUserInput.call(this);
    };

    handleMessageEvent: (arg1: any) => void = (e) => {
        // We receive data from the iframe that contains {passed: true/false}
        //  and use that to set the status
        // It could also contain an optional message
        let data: Record<string, any> = {};
        try {
            data = JSON.parse(e.originalEvent.data);
        } catch (err: any) {
            return;
        }

        if (_.isUndefined(data.testsPassed)) {
            return;
        }

        const status = data.testsPassed ? "correct" : "incorrect";
        this.change({
            status: status,
            message: data.message,
        });
    };

    componentDidMount() {
        $(window).on("message", this.handleMessageEvent);
    }

    componentWillUnmount() {
        $(window).off("message", this.handleMessageEvent);
    }

    render(): React.ReactNode {
        const style = {
            width: String(this.props.width),
            height: String(this.props.height),
        } as const;

        const {InitialRequestUrl} = getDependencies();

        // Add "px" to unitless numbers
        Object.entries(style).forEach(([key, value]: [any, any]) => {
            if (!value.endsWith("%") && !value.endsWith("px")) {
                style[key] = value + "px";
            }
        });

        let url = this.props.url;

        // If the URL doesnt start with http, it must be a program ID
        if (url && url.length && url.indexOf("http") !== 0) {
            url =
                "https://www.khanacademy.org/computer-programming/program/" +
                url +
                "/embedded?buttons=no&embed=yes&editor=no&author=no";
            url = updateQueryString(url, "width", this.props.width);
            url = updateQueryString(url, "height", this.props.height);
            // Origin is used by output.js in deciding to send messages
            url = updateQueryString(url, "origin", InitialRequestUrl.origin);
        }

        // Turn array of [{name: "", value: ""}] into object
        if (this.props.settings) {
            const settings: Record<string, any> = {};
            _.each(this.props.settings, function (setting) {
                if (setting.name && setting.value) {
                    settings[setting.name] = setting.value;
                }
            });
            // This becomes available to programs as Program.settings()
            url = updateQueryString(url, "settings", JSON.stringify(settings));
        }

        let sandboxProperties = "allow-same-origin allow-scripts";
        // TODO(scottgrant): This line is an intentional hack to retain the
        // allow-top-navigation sandbox property. Once our LearnStorm articles
        // have this value checked and published, this line should be removed
        // and replaced with the conditional check below that is commented out.
        // We don't want to break LearnStorm badges, so this will be a two-part
        // deploy.
        sandboxProperties += " allow-top-navigation";
        // if (this.props.allowTopNavigation === true) {
        //     sandboxProperties += " allow-top-navigation";
        // }

        // We sandbox the iframe so that we allowlist only the functionality
        //  that we need. This makes it a bit safer in case some content
        //  creator "went wild".
        // http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
        return (
            <iframe
                sandbox={sandboxProperties}
                style={style}
                src={url}
                allowFullScreen={this.props.allowFullScreen}
            />
        );
    }

    change: (...args: ReadonlyArray<unknown>) => any = (...args) => {
        // @ts-expect-error - TS2345 - Argument of type 'readonly unknown[]' is not assignable to parameter of type 'any[]'.
        return Changeable.change.apply(this, args);
    };

    simpleValidate: (arg1: any) => any = (rubric) => {
        // @ts-expect-error - TS2339 - Property 'validate' does not exist on type 'typeof Iframe'.
        return Iframe.validate(this.getUserInput(), rubric);
    };
}

/**
 * This is the widget's grading function
 */
_.extend(Iframe, {
    validate: function (state, rubric) {
        // The iframe can tell us whether it's correct or incorrect,
        //  and pass an optional message
        if (state.status === "correct") {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: state.message || null,
            };
        }
        if (state.status === "incorrect") {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: state.message || null,
            };
        }
        return {
            type: "invalid",
            message: "Keep going, you're not there yet!",
        };
    },
});

export default {
    name: "iframe",
    displayName: "Iframe (deprecated)",
    widget: Iframe,
    // Let's not expose it to all content creators yet
    hidden: true,
} as WidgetExports<typeof Iframe>;
