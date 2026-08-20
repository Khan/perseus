/**
 * This widget is for embedding Khan Academy CS programs.
 */

import {StyleSheet, css} from "aphrodite";
import React, {forwardRef, useEffect, useImperativeHandle} from "react";

import {usePerseusI18n} from "../../components/i18n-context";
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

type Props = WidgetProps<
    PerseusCSProgramWidgetOptions,
    PerseusCSProgramUserInput
>;

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
const CSProgram = forwardRef<Widget, Props>(function CSProgram(props, ref) {
    const {strings, locale} = usePerseusI18n();

    const {
        programID,
        programType,
        height,
        settings,
        showEditor = false,
        showButtons = false,
    } = props.options;

    // We receive data from the iframe that contains
    // {testsPassed: true/false} and use that to set the status. It could
    // also contain an optional message.
    useEffect(() => {
        const handleMessageEvent = (e: MessageEvent) => {
            let data: Record<string, any> = {};
            try {
                data = JSON.parse(e.data);
            } catch {
                return;
            }

            if (data.testsPassed === undefined) {
                return;
            }

            const status = data.testsPassed ? "correct" : "incorrect";
            props.handleUserInput({
                status: status,
                message: data.message,
            });
        };

        window.addEventListener("message", handleMessageEvent);
        return () => {
            window.removeEventListener("message", handleMessageEvent);
        };
    }, [props]);

    useImperativeHandle(ref, () => ({
        getPromptJSON: (): UnsupportedWidgetPromptJSON => {
            return _getPromptJSON();
        },

        /**
         * @deprecated and likely very broken API
         * [LEMS-3185] do not trust serializedState
         */
        getSerializedState: (): any => {
            const {userInput, alignment, options, ...rest} = props;
            return {
                ...options,
                ...rest,
                programType: options.programType || null,
            };
        },
    }));

    if (!programID) {
        return <div />;
    }

    let styleContainer = false;
    let url = getUrlFromProgramID(programID);
    let className;

    if (showEditor) {
        url += "&editor=yes";
        className = "perseus-scratchpad-editor";
    } else {
        url += `&editor=no&width=${articleMaxWidthInPx}`;
        className = "perseus-scratchpad";
        if (programType !== "webpage") {
            styleContainer = true;
        }
    }

    if (showButtons) {
        url += "&buttons=yes";
    } else {
        url += "&buttons=no";
    }

    // Turn array of [{name: "", value: ""}] into object
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (settings) {
        const settingsObject: Record<string, any> = {};
        settings.forEach((setting) => {
            if (setting.name && setting.value) {
                settingsObject[setting.name] = setting.value;
            }
        });
        // This becomes available to programs as Program.settings()
        url = updateQueryString(
            url,
            "settings",
            JSON.stringify(settingsObject),
        );
    }

    if (locale) {
        url = updateQueryString(url, "lang", locale);
    }

    // Matches templates/scratchpads/embed_script.js: when the execute buttons
    // are shown, the toolbar adds 66px of height and the border adds 1px.
    const style = {
        height: showButtons ? height + 67 : height,
        width: "100%",
    } as const;

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
            <iframe
                title={strings.computerScienceProgram}
                sandbox={sandboxOptions}
                src={url}
                style={style}
                className={className}
                allowFullScreen={true}
            />
        </div>
    );
});

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
