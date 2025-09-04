/**
 * This is an iframe widget. It is used for rendering an iframe that
 *  then communicates its state via window.postMessage
 * This is useful for embedding arbitrary visualizations/simulations with
 *  completed conditions, such as the mazes and games in Algorithms.
 * It's particularly well suited for embedding our ProcessingJS programs,
 *  but could also be used for embedding viz's hosted elsewhere.
 */

import $ from "jquery";
import * as React from "react";

import {getDependencies} from "../../dependencies";
import Util from "../../util";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/iframe/iframe-ai-utils";

import type {WidgetExports, WidgetProps, Widget} from "../../types";
import type {UnsupportedWidgetPromptJSON} from "../../widget-ai-utils/unsupported-widget";
import type {
    PerseusIFrameUserInput,
    PerseusIFrameWidgetOptions,
} from "@khanacademy/perseus-core";

const {updateQueryString} = Util;

type Props = WidgetProps<PerseusIFrameWidgetOptions, PerseusIFrameUserInput>;

type DefaultProps = {
    allowFullScreen: Props["allowFullScreen"];
    allowTopNavigation: Props["allowTopNavigation"];
    userInput: Props["userInput"];
};

/* This renders the iframe and handles validation via window.postMessage */
class Iframe extends React.Component<Props> implements Widget {
    static defaultProps: DefaultProps = {
        allowFullScreen: false,
        allowTopNavigation: false,
        userInput: {
            status: "incomplete",
            // optional message
            message: null,
        },
    };

    componentDidMount() {
        $(window).on("message", this.handleMessageEvent);
    }

    componentWillUnmount() {
        $(window).off("message", this.handleMessageEvent);
    }

    getPromptJSON(): UnsupportedWidgetPromptJSON {
        return _getPromptJSON();
    }

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState
     */
    getSerializedState(): any {
        const {userInput: _, alignment: __, ...rest} = this.props;
        return rest;
    }

    handleMessageEvent: (arg1: any) => void = (e) => {
        // We receive data from the iframe that contains {passed: true/false}
        //  and use that to set the status
        // It could also contain an optional message
        let data: Record<string, any> = {};
        try {
            data = JSON.parse(e.originalEvent.data);
        } catch {
            return;
        }

        if (data.testsPassed === undefined) {
            return;
        }

        const status = data.testsPassed ? "correct" : "incorrect";
        this.props.handleUserInput({
            status: status,
            message: data.message,
        });
    };

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
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (url && url.length && url.indexOf("http") !== 0) {
            url =
                "https://www.khanacademy.org/computer-programming/program/" +
                url +
                "/embedded?buttons=no&embed=yes&editor=no&author=no";
            url = updateQueryString(url, "width", `${this.props.width}`);
            url = updateQueryString(url, "height", `${this.props.height}`);
            // Origin is used by output.js in deciding to send messages
            url = updateQueryString(url, "origin", InitialRequestUrl.origin);
        }

        // Turn array of [{name: "", value: ""}] into object
        if (this.props.settings) {
            const settings: Record<string, any> = {};
            this.props.settings.forEach((setting) => {
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
            // eslint-disable-next-line jsx-a11y/iframe-has-title -- TODO(LEMS-2871): Address a11y error
            <iframe
                sandbox={sandboxProperties}
                style={style}
                src={url}
                allowFullScreen={this.props.allowFullScreen}
            />
        );
    }
}

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusIFrameUserInput {
    return {status: serializedState.status, message: serializedState.message};
}

function getStartUserInput(): PerseusIFrameUserInput {
    return {
        status: "incomplete",
        message: null,
    };
}

export default {
    name: "iframe",
    displayName: "Iframe (deprecated)",
    widget: Iframe,
    // Let's not expose it to all content creators yet
    hidden: true,
    getStartUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof Iframe>;
