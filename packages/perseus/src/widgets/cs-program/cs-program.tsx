/**
 * This widget is for embedding Khan Academy CS programs.
 */

import {StyleSheet, css} from "aphrodite";
import $ from "jquery";
import * as React from "react";
import _ from "underscore";

import {getDependencies} from "../../dependencies";
import * as Changeable from "../../mixins/changeable";
import {articleMaxWidthInPx} from "../../styles/constants";
import Util from "../../util";
import {isFileProtocol} from "../../util/mobile-native-utils";
import {toAbsoluteUrl} from "../../util/url-utils";

import {csProgramValidator} from "./cs-program-validator";

import type {PerseusCSProgramWidgetOptions} from "../../perseus-types";
import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {
    PerseusCSProgramRubric,
    PerseusCSProgramUserInput,
} from "../../validation.types";

const {updateQueryString} = Util;

type RenderProps = PerseusCSProgramWidgetOptions & PerseusCSProgramUserInput;

type Props = WidgetProps<RenderProps, PerseusCSProgramRubric>;

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
    static defaultProps: DefaultProps = {
        showEditor: false,
        showButtons: false,
        status: "incomplete",
        // optional message
        message: null,
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

    change: (...args: ReadonlyArray<unknown>) => any = (...args) => {
        // @ts-expect-error - TS2345 - Argument of type 'readonly unknown[]' is not assignable to parameter of type 'any[]'.
        return Changeable.change.apply(this, args);
    };

    getUserInput(): PerseusCSProgramUserInput {
        return {
            status: this.props.status,
            message: this.props.message,
        };
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
            <div
                className={css(
                    styles.widthOverride,
                    styleContainer && styles.container,
                )}
            >
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
    supportedAlignments: ["block", "full-width"],
    widget: CSProgram,
    hidden: true,
    validator: csProgramValidator,
} satisfies WidgetExports<typeof CSProgram>;
