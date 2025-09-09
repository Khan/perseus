/**
 * This widget is for embedding Khan Academy Python programs.
 */
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {toAbsoluteUrl} from "../../util/url-utils";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/python-program/python-ai-utils";

import type {APIOptions, Widget, WidgetExports} from "../../types";
import type {UnsupportedWidgetPromptJSON} from "../../widget-ai-utils/unsupported-widget";

function getUrlFromProgramID(programID: any) {
    const path = `/python-program/${programID}/embedded`;

    return toAbsoluteUrl(path);
}

type Props = {
    programID: string;
    height: number;
    apiOptions: APIOptions;
};

type DefaultProps = {
    height: Props["height"];
};

/**
 * This renders the program in an iframe.
 */
class PythonProgram extends React.Component<Props> implements Widget {
    static defaultProps: DefaultProps = {
        height: 400,
    };

    getPromptJSON(): UnsupportedWidgetPromptJSON {
        return _getPromptJSON();
    }

    render(): React.ReactNode {
        let url = getUrlFromProgramID(this.props.programID);
        url =
            this.props.apiOptions.generateUrl?.({
                url,
                widget: "python-program",
            }) ?? url;

        const iframeStyle = {
            height: this.props.height,
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
            <View style={styles.container}>
                {/* eslint-disable-next-line jsx-a11y/iframe-has-title -- TODO(LEMS-2871): Address a11y error */}
                <iframe
                    sandbox={sandboxOptions}
                    src={url}
                    style={iframeStyle}
                    allowFullScreen={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: "auto",
        width: "100%",
    },
});

export default {
    name: "python-program",
    displayName: "Python Program",
    widget: PythonProgram,
} satisfies WidgetExports<typeof PythonProgram>;
