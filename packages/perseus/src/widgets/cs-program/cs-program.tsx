/**
 * This widget is for embedding Khan Academy CS programs.
 */

import {StyleSheet, css} from "aphrodite";
import $ from "jquery";
import * as React from "react";
import _ from "underscore";

import {getDependencies} from "../../dependencies";
import {articleMaxWidthInPx} from "../../styles/constants";
import Util from "../../util";
import {isFileProtocol} from "../../util/mobile-native-utils";
import {toAbsoluteUrl} from "../../util/url-utils";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/cs-program/cs-program-ai-utils";

import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {UnsupportedWidgetPromptJSON} from "../../widget-ai-utils/unsupported-widget";
import type {
    PerseusCSProgramWidgetOptions,
    PerseusCSProgramUserInput,
} from "@khanacademy/perseus-core";

const {updateQueryString} = Util;

type RenderProps = PerseusCSProgramWidgetOptions;

type Props = WidgetProps<RenderProps, PerseusCSProgramUserInput>;

type DefaultProps = {
    showEditor: Props["showEditor"];
    showButtons: Props["showButtons"];
    userInput: Props["userInput"];
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
    static defaultProps: DefaultProps = {
        showEditor: false,
        showButtons: false,
        userInput: {
            status: "incomplete",
            message: null,
        },
    };

    componentDidMount() {
        $(window).on("message", this.handleMessageEvent);
    }

    componentWillUnmount() {
        $(window).off("message", this.handleMessageEvent);
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

        if (_.isUndefined(data.testsPassed)) {
            return;
        }

        const status = data.testsPassed ? "correct" : "incorrect";
        this.props.handleUserInput({
            status: status,
            message: data.message,
        });
    };

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
        } as const;

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
            // @ts-expect-error - TS2540 - Cannot assign to 'height' because it is a read-only property.
            style.height += 67;
        } else {
            url += "&buttons=no";
        }

        // Turn array of [{name: "", value: ""}] into object
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
            <div className={css(styleContainer && styles.container)}>
                {/* eslint-disable-next-line jsx-a11y/iframe-has-title -- TODO(LEMS-2871): Address a11y error */}
                <iframe
                    sandbox={sandboxOptions}
                    src={url}
                    style={style}
                    className={className}
                    allowFullScreen={true}
                />
            </div>
        );
    }
}

const styles = StyleSheet.create({
    // Note: we used to have a width override here to make sure the widget does
    // not prematurely horizontally scroll in KA Classic when there is room to
    // fully render. The override resulted in some poor rendering in articles
    // in KA Classroom and was removed.
    container: {
        margin: "auto",
    },
});

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusCSProgramUserInput {
    return {status: serializedState.status, message: serializedState.message};
}

function getStartUserInput(): PerseusCSProgramUserInput {
    return {
        status: "incomplete",
        message: null,
    };
}

export default {
    name: "cs-program",
    displayName: "CS Program",
    widget: CSProgram,
    hidden: true,
    getStartUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof CSProgram>;
