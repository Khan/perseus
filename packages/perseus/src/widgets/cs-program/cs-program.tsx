/**
 * This widget is for embedding Khan Academy CS programs.
 */

import {css, StyleSheet} from "aphrodite";
import * as React from "react";

import {getDependencies} from "../../dependencies";
import * as Changeable from "../../mixins/changeable";
import {articleMaxWidthInPx} from "../../styles/constants";
import Util from "../../util";
import {isFileProtocol} from "../../util/mobile-native-utils";
import {toAbsoluteUrl} from "../../util/url-utils";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/cs-program/cs-program-ai-utils";

import type {ChangeFn, Widget, WidgetExports, WidgetProps} from "../../types";
import type {UnsupportedWidgetPromptJSON} from "../../widget-ai-utils/unsupported-widget";
import type {
    PerseusCSProgramUserInput,
    PerseusCSProgramWidgetOptions,
} from "@khanacademy/perseus-core";

const {updateQueryString} = Util;

type RenderProps = PerseusCSProgramWidgetOptions & PerseusCSProgramUserInput;

type Props = WidgetProps<RenderProps>;

type DefaultProps = {
    showEditor: Props["showEditor"];
    showButtons: Props["showButtons"];
    status: Props["status"];
    // optional message
    message: Props["message"];
};

function getUrlFromProgramID(programID: any) {
    const {InitialRequestUrl} = getDependencies();

    const path =
        "/computer-programming/program/" +
        `${programID}/embedded?embed=yes&author=no`;
    // When loading scratchpads in our native apps, the current URL will exist
    // as a `file://` URL. In this case, we want to reference `ka.org` instead
    // of defaulting to what we get from `toAbsoluteUrl`.
    if (isFileProtocol(InitialRequestUrl.protocol)) {
        return `https://khanacademy.org${path}`;
    }

    return toAbsoluteUrl(path);
}

/* This renders the scratchpad in an iframe and handles validation via
 * window.postMessage */
class CSProgram extends React.Component<Props> implements Widget {
    iframeElement: HTMLIFrameElement | null = null;
    static defaultProps: DefaultProps = {
        showEditor: false,
        showButtons: false,
        status: "incomplete",
        // optional message
        message: null,
    };

    componentDidMount() {
        window.addEventListener("message", this.handleMessageEvent);
    }

    componentWillUnmount() {
        window.removeEventListener("message", this.handleMessageEvent);
    }

    handleMessageEvent: (e: MessageEvent) => void = (e) => {
        // We receive data from the iframe that contains {passed: true/false}
        //  and use that to set the status
        // eslint-disable-next-line no-console
        console.log("e.source", e.source);
        // eslint-disable-next-line no-console
        console.log("contentWindow", this.iframeElement?.contentWindow);

        if (
            !this.iframeElement ||
            e.source !== this.iframeElement.contentWindow
        ) {
            return;
        }

        // It could also contain an optional message
        let data: Record<string, any> = {};

        try {
            data = JSON.parse(e.data);
        } catch (error) {
            throw new Error(
                `Failed to parse JSON data in message event: ${error}`,
            );
        }

        if (data.testsPassed === undefined) {
            return;
        }

        const status = data.testsPassed ? "correct" : "incorrect";
        this.change({
            status: status,
            message: data.message,
        });
    };

    change: ChangeFn = (...args) => {
        return Changeable.change.apply(this, args);
    };

    getUserInput(): PerseusCSProgramUserInput {
        return {
            status: this.props.status,
            message: this.props.message,
        };
    }

    getPromptJSON(): UnsupportedWidgetPromptJSON {
        return _getPromptJSON();
    }

    render(): React.ReactNode {
        if (!this.props.programID) {
            return <div />;
        }

        let styleContainer = false;
        let url = getUrlFromProgramID(this.props.programID);
        let className;
        const style = {
            height: this.props.height,
            width: "100%",
        };

        if (this.props.showEditor) {
            url += "&editor=yes";
            className = "perseus-scratchpad-editor";
        } else {
            url += `&editor=no&width=${articleMaxWidthInPx}`;
            className = "perseus-scratchpad";
            if (this.props.programType !== "webpage") {
                styleContainer = true;
            }
        }

        if (this.props.showButtons) {
            url += "&buttons=yes";
            // Matches templates/scratchpads/embed_script.js
            // Toolbar height is 66, border height is 1 pixel
            style.height += 67;
        } else {
            url += "&buttons=no";
        }

        // Turn array of [{name: "", value: ""}] into object
        if (
            Array.isArray(this.props.settings) &&
            this.props.settings.length > 0
        ) {
            const settings: Record<string, any> = {};
            this.props.settings.forEach((setting) => {
                if (setting.name && setting.value) {
                    settings[setting.name] = setting.value;
                }
            });
            // This becomes available to programs as Program.settings()
            url = updateQueryString(url, "settings", JSON.stringify(settings));
        }

        const sandboxOptions = [
            "allow-popups",
            "allow-same-origin",
            "allow-scripts",
            "allow-top-navigation",
        ].join(" ");

        // We sandbox the iframe so that we allowlist only the functionality
        //  that we need. This makes it a bit safer in case some content
        //  creator "went wild".
        // http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
        return (
            <div
                className={css(
                    styles.widthOverride,
                    styleContainer && styles.container,
                )}
            >
                <iframe
                    ref={(element) => (this.iframeElement = element)}
                    sandbox={sandboxOptions}
                    src={url}
                    style={style}
                    className={className}
                    allowFullScreen={true}
                    title="CS Program"
                />
            </div>
        );
    }
}

const styles = StyleSheet.create({
    // Override the inherited width from the perseus paragraph class
    // 820 is minimum width for 420px editor and 400px canvas
    widthOverride: {
        width: 820,
    },
    container: {
        margin: "auto",
    },
});

export default {
    name: "cs-program",
    displayName: "CS Program",
    widget: CSProgram,
    hidden: true,
} satisfies WidgetExports<typeof CSProgram>;
